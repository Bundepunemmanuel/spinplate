// Queries OpenStreetMap's Overpass API directly from the browser.
// No API key, no signup, no billing — this is the whole reason we picked
// it. Public mirrors listed as fallbacks since the free servers can be
// flaky or rate-limit under load.
const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
  "https://overpass.openstreetmap.ru/api/interpreter",
];

// Per-endpoint client-side timeout. The [timeout:25] in the query only
// tells the *server* when to give up — it doesn't stop the browser from
// waiting indefinitely for a reply. Free mirrors can hang far longer than
// that under load, so we abort and move to the next mirror ourselves
// rather than let the user stare at a blank screen for a minute+.
const ENDPOINT_TIMEOUT_MS = 9000;

function buildQuery({ lat, lng, radiusMeters, osmTags }) {
  const clauses = osmTags
    .map(
      (t) => `  node["${t.key}"="${t.value}"](around:${radiusMeters},${lat},${lng});`
    )
    .join("\n");

  return `[out:json][timeout:25];
(
${clauses}
);
out body;`;
}

async function tryEndpoint(url, query, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "data=" + encodeURIComponent(query),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`Overpass endpoint failed: ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// Tries each public mirror in order until one responds successfully.
// `onAttempt(index, url)` fires right before each try, so the UI can show
// "trying another source" instead of sitting on one silent loading state.
async function queryOverpass(query, { onAttempt } = {}) {
  let lastError;
  for (let i = 0; i < ENDPOINTS.length; i++) {
    const url = ENDPOINTS[i];
    if (onAttempt) onAttempt(i, url);
    try {
      return await tryEndpoint(url, query, ENDPOINT_TIMEOUT_MS);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError || new Error("All Overpass endpoints failed");
}

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

// Normalizes raw OSM elements into clean venue objects. Skips anything
// without a name — an unnamed node isn't useful for a "surprise me" pick.
function normalizeVenues(elements, originLat, originLng) {
  return elements
    .filter((el) => el.tags && el.tags.name)
    .map((el) => {
      const tags = el.tags;
      const addrParts = [
        tags["addr:housenumber"],
        tags["addr:street"],
      ].filter(Boolean);

      return {
        id: el.id,
        name: tags.name,
        lat: el.lat,
        lng: el.lon,
        address: addrParts.length ? addrParts.join(" ") : null,
        cuisine: tags.cuisine || null,
        openingHours: tags.opening_hours || null,
        outdoorSeating: tags.outdoor_seating === "yes",
        wheelchair: tags.wheelchair === "yes",
        distanceKm: haversineKm(originLat, originLng, el.lat, el.lon),
        rawTags: tags,
      };
    });
}

export async function fetchVenues({ lat, lng, radiusMeters, osmTags, onAttempt }) {
  const query = buildQuery({ lat, lng, radiusMeters, osmTags });
  const data = await queryOverpass(query, { onAttempt });
  return normalizeVenues(data.elements || [], lat, lng);
}
