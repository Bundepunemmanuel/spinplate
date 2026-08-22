// Queries Geoapify's Places API — same underlying OpenStreetMap data as
// before, but served through Geoapify's own reliable infrastructure
// instead of free public Overpass mirrors (which is what was causing
// 2-minute hangs and failed fetches). Free tier: 3,000 requests/day, no
// credit card required. Category keys are verified against
// https://apidocs.geoapify.com/docs/places/#categories — not guessed.
//
// Works both client-side (SpinWidget, browser) and server-side (build-time
// area stats in getStaticProps) since it's just a plain fetch() call.
const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
const BASE_URL = "https://api.geoapify.com/v2/places";
const TIMEOUT_MS = 9000;

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildUrl({ lat, lng, radiusMeters, categories, limit }) {
  const params = new URLSearchParams({
    categories: categories.join(","),
    filter: `circle:${lng},${lat},${radiusMeters}`, // Geoapify wants lon,lat order — easy to get backwards
    limit: String(limit || 100),
    apiKey: API_KEY,
  });
  return `${BASE_URL}?${params.toString()}`;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Geoapify request failed: ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Normalizes a raw Geoapify GeoJSON feature into the flat venue shape the
// rest of the app expects (spin.js / reasoning.js / VenueCard.js are
// unchanged from the Overpass version — same field names).
function normalizeFeature(feature) {
  const p = feature.properties || {};
  if (!p.name) return null; // an unnamed listing isn't useful for a "surprise me" pick

  const lat = feature.geometry?.coordinates?.[1];
  const lng = feature.geometry?.coordinates?.[0];

  return {
    id: p.place_id,
    name: p.name,
    lat,
    lng,
    address: p.address_line2 || p.formatted || null,
    cuisine: p.catering?.cuisine || null,
    openingHours: p.opening_hours || null,
    outdoorSeating: p.outdoor_seating === true || p.catering?.outdoor_seating === true,
    wheelchair: p.wheelchair === "yes" || p.wheelchair === true,
    categories: p.categories || [],
    rawProperties: p,
  };
}

export async function fetchVenues({ lat, lng, radiusMeters, categories, limit }) {
  if (!API_KEY) {
    throw new Error(
      "Missing Geoapify API key — set NEXT_PUBLIC_GEOAPIFY_API_KEY in your environment."
    );
  }
  const url = buildUrl({ lat, lng, radiusMeters, categories, limit });
  const data = await fetchWithTimeout(url, TIMEOUT_MS);
  const venues = (data.features || [])
    .map(normalizeFeature)
    .filter(Boolean)
    .map((v) => ({ ...v, distanceKm: haversineKm(lat, lng, v.lat, v.lng) }));
  return venues;
}

// Build-time-only helper: computes honest aggregate stats for a city's
// content section, used instead of hand-written "local color" for the 47
// non-flagship cities (see getCityNote / getStaticProps in
// pages/[city]/[occasion].js). Every number here is real — nothing invented.
// Fails soft: returns null on any error so a page never fails to build
// just because a stats call hiccuped.
export async function fetchAreaStats({ lat, lng, radiusMeters, categories }) {
  try {
    const venues = await fetchVenues({ lat, lng, radiusMeters, categories, limit: 100 });
    if (!venues.length) return null;

    const withOutdoor = venues.filter((v) => v.outdoorSeating).length;
    const cuisineCounts = {};
    venues.forEach((v) => {
      if (!v.cuisine) return;
      v.cuisine.split(";").forEach((c) => {
        const clean = c.trim().replace(/_/g, " ");
        if (!clean) return;
        cuisineCounts[clean] = (cuisineCounts[clean] || 0) + 1;
      });
    });
    const topCuisines = Object.entries(cuisineCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([name]) => name);

    return {
      count: venues.length,
      outdoorPct: Math.round((withOutdoor / venues.length) * 100),
      topCuisines,
    };
  } catch {
    return null;
  }
}

// Turns real Geoapify stats into a sentence — this replaces hand-written
// "local color" for the 47 non-flagship cities. Every number here is real
// and traceable to the actual fetch; nothing is invented. Template choice
// is deterministic (hashed from city+occasion) so the same page reads the
// same way across rebuilds, not randomly different each deploy.
function hashString(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const STAT_TEMPLATES = [
  ({ count, label, radiusKm, city }) =>
    `${count} spot${count === 1 ? "" : "s"} for ${label} ${count === 1 ? "is" : "are"} currently mapped within ${radiusKm}km of downtown ${city}.`,
  ({ count, label, radiusKm, city }) =>
    `${city} has ${count} mapped spot${count === 1 ? "" : "s"} for ${label} within ${radiusKm}km.`,
  ({ count, label, radiusKm, city }) =>
    `Within ${radiusKm}km of ${city}, there ${count === 1 ? "is" : "are"} ${count} spot${count === 1 ? "" : "s"} mapped for ${label}.`,
];

export function buildStatSentence(city, occasion, stats) {
  const label = occasion.name.toLowerCase();
  const radiusKm = occasion.radiusMeters / 1000;

  if (!stats || stats.count === 0) {
    return `SpinPlate pulls live ${label} listings from OpenStreetMap around ${city.name} — spin to see what's actually mapped nearby.`;
  }

  const templateIndex = hashString(`${city.slug}:${occasion.slug}`) % STAT_TEMPLATES.length;
  let sentence = STAT_TEMPLATES[templateIndex]({
    count: stats.count,
    label,
    radiusKm,
    city: city.name,
  });

  if (stats.outdoorPct > 0) {
    sentence += ` About ${stats.outdoorPct}% list outdoor seating.`;
  }
  if (stats.topCuisines.length) {
    sentence += ` The most common cuisine${stats.topCuisines.length > 1 ? "s" : ""} mapped ${
      stats.topCuisines.length > 1 ? "are" : "is"
    } ${stats.topCuisines.join(" and ")}.`;
  }

  return sentence;
}
