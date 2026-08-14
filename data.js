// Cities we're launching with. Adding a new city means adding one object
// here — the [city]/[occasion] page template handles the rest.
export const CITIES = [
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    lat: 30.2672,
    lng: -97.7431,
  },
  {
    slug: "denver",
    name: "Denver",
    state: "CO",
    lat: 39.7392,
    lng: -104.9903,
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    lat: 36.1627,
    lng: -86.7816,
  },
];

// Each occasion maps to real OpenStreetMap tags used to build the Overpass
// query, plus a search radius and copy for the page itself.
export const OCCASIONS = [
  {
    slug: "brunch",
    name: "Brunch",
    tagline: "Late mornings, good coffee, and something worth waiting for.",
    radiusMeters: 4000,
    osmTags: [
      { key: "amenity", value: "cafe" },
      { key: "amenity", value: "restaurant" },
    ],
    cuisineHints: ["breakfast", "brunch", "american", "pancake", "bakery"],
    intro:
      "Brunch spots in {city} worth the wait — pulled from real, open map data, not a stale 'best of' list from three years ago.",
  },
  {
    slug: "date-night",
    name: "Date Night",
    tagline: "Somewhere you haven't both already been ten times.",
    radiusMeters: 5000,
    osmTags: [{ key: "amenity", value: "restaurant" }],
    cuisineHints: [],
    intro:
      "Skip the scrolling. Set your filters, spin, and let {city} surprise you with somewhere new for date night.",
  },
  {
    slug: "coffee",
    name: "Coffee",
    tagline: "A real cup, not just the nearest chain.",
    radiusMeters: 3000,
    osmTags: [
      { key: "amenity", value: "cafe" },
      { key: "shop", value: "coffee" },
    ],
    cuisineHints: ["coffee_shop"],
    intro:
      "Independent coffee spots around {city} — spin for one instead of defaulting to whichever chain is closest.",
  },
  {
    slug: "food-trucks",
    name: "Food Trucks",
    tagline: "Quick, good, and usually cash-friendly.",
    radiusMeters: 4000,
    osmTags: [{ key: "amenity", value: "fast_food" }],
    cuisineHints: [],
    intro:
      "Food trucks and quick counters around {city}. Coverage here depends on how well each truck is mapped — always worth a quick call ahead.",
  },
];

export function getCityBySlug(slug) {
  return CITIES.find((c) => c.slug === slug);
}

export function getOccasionBySlug(slug) {
  return OCCASIONS.find((o) => o.slug === slug);
}

export function getAllCityOccasionPaths() {
  const paths = [];
  CITIES.forEach((city) => {
    OCCASIONS.forEach((occasion) => {
      paths.push({ city: city.slug, occasion: occasion.slug });
    });
  });
  return paths;
}
