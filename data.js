// Cities we're launching with. Adding a new city means adding one object
// here — the [city]/[occasion] page template handles the rest.
//
// `accent` / `accentText` give each city its own identity color (like
// Spotify tinting each playlist card differently) so cities are
// distinguishable at a glance instead of every card looking identical.
// `accent` is for backgrounds/borders (mid-saturation), `accentText` is a
// lighter tint of the same hue with enough contrast to use as text on the
// dark wine background.
export const CITIES = [
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    lat: 30.2672,
    lng: -97.7431,
    blurb: "Breakfast tacos, food truck parks, and patios with string lights.",
    accent: "#C1553A",
    accentText: "#E8977F",
  },
  {
    slug: "denver",
    name: "Denver",
    state: "CO",
    lat: 39.7392,
    lng: -104.9903,
    blurb: "Serious coffee, mountain-view patios, and brunch that runs on mimosas.",
    accent: "#3E6B8A",
    accentText: "#8FC1DB",
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    lat: 36.1627,
    lng: -86.7816,
    blurb: "Hot chicken, honky-tonk nights, and biscuits worth the wait.",
    accent: "#C97C2C",
    accentText: "#F0B463",
  },
];

// Each occasion maps to real OpenStreetMap tags used to build the Overpass
// query, plus a search radius and copy for the page itself.
//
// `cityNotes` is a short, honest line of local color per city — general,
// widely-known character of that city's food scene, never a specific venue
// claim (since the actual pick is random and live).
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
    cityNotes: {
      austin:
        "Austin's brunch scene leans casual — breakfast tacos, patio seating, and lines that start before 10am on weekends.",
      denver:
        "Denver's brunch culture runs on mimosas and altitude — expect bottomless drink specials and plenty of outdoor seating while the weather holds.",
      nashville:
        "Nashville brunch usually means biscuits, some version of hot chicken, and a wait if you're anywhere near Five Points or 12 South.",
    },
    faqLongTail: (city) => ({
      q: `What's the best brunch in ${city} with a view?`,
      a: `SpinPlate doesn't tag venues for "view" specifically — OpenStreetMap doesn't reliably track that. What we can filter on is outdoor seating, which is often the closest honest proxy. Toggle it on if a patio matters more than a specific skyline.`,
    }),
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
    cityNotes: {
      austin:
        "Austin's date-night spots skew low-key — think string lights on a patio rather than white tablecloths.",
      denver:
        "Denver pairs a lot of its date-night restaurants with mountain views or rooftop patios, especially around RiNo and LoHi.",
      nashville:
        "Nashville does date night two ways: quiet neighborhood spot, or dinner before a show downtown — both are easy to find here.",
    },
    faqLongTail: (city) => ({
      q: `What's a good romantic date night spot in ${city}?`,
      a: `"Romantic" isn't something OpenStreetMap tags, so we can't filter for it directly. What tends to get closest is a quieter spot with outdoor seating — toggle that filter and set a tighter distance for something walkable and low-key.`,
    }),
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
    cityNotes: {
      austin:
        "Austin has one of the more saturated independent coffee scenes in Texas — East Austin alone has a dozen worth trying.",
      denver:
        "Denver's coffee culture is serious about sourcing, and a lot of shops double as informal coworking spots.",
      nashville:
        "Nashville's coffee shops are scattered through Germantown, East Nashville, and the Gulch, often inside converted buildings.",
    },
    faqLongTail: (city) => ({
      q: `What's a good coffee shop in ${city} for working?`,
      a: `We don't have a reliable "has wifi" or "laptop-friendly" tag to filter on — OSM coverage for that is spotty. Outdoor seating is the one proxy we do have, so it's worth toggling if you want options beyond a counter and two stools.`,
    }),
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
    cityNotes: {
      austin:
        "Austin basically helped popularize the modern food truck park — trailers here range from tacos to Detroit-style pizza.",
      denver:
        "Denver's food truck scene clusters around breweries and outdoor markets, especially in the warmer months.",
      nashville:
        "Nashville's food trucks show up heaviest around events and breweries, though mapping coverage varies more here than for sit-down spots.",
    },
    faqLongTail: (city) => ({
      q: `Are there food trucks near me in ${city} open late?`,
      a: `Depends entirely on how well the truck's hours are mapped on OpenStreetMap — a lot of trucks don't list hours at all. Turn on "open now" to filter out the ones marked closed, but treat anything marked "unknown" as worth a quick call first.`,
    }),
  },
];

// Standard FAQs that apply to every occasion — parameterized by city and
// occasion name. Kept honest about what the tool can and can't actually
// tell you, since there's no ratings/reviews data behind any of this.
function getStandardFaqs(city, occasion) {
  return [
    {
      q: `How does SpinPlate pick a ${occasion.name.toLowerCase()} spot in ${city.name}?`,
      a: `It pulls real, currently-mapped ${occasion.name.toLowerCase()} spots from OpenStreetMap within your chosen distance, filters by whatever you've toggled, then picks one at random — with a slight nudge toward listings that have more complete data (like a cuisine tag set). No ratings or reviews factor in, because OSM doesn't reliably have them.`,
    },
    {
      q: `Is the ${occasion.name.toLowerCase()} spot open right now?`,
      a: `If you turn on "open now," SpinPlate only shows spots whose mapped hours say they're currently open. Some venues don't have hours mapped at all — those are marked "unknown" and left in the pool rather than assumed closed, since a wrong guess would unfairly filter out a real option.`,
    },
    {
      q: `Can I set a specific distance for ${occasion.name.toLowerCase()} in ${city.name}?`,
      a: `Yes — the distance filter on this page lets you narrow to 1km, 3km, or open it up to 5km+ from ${city.name}'s center point.`,
    },
    {
      q: `Does SpinPlate show ratings for ${city.name} ${occasion.name.toLowerCase()} spots?`,
      a: `No, on purpose. OpenStreetMap doesn't carry reliable rating data, and we'd rather leave it out than make something up. If you want reviews before you go, that's what your maps app is for.`,
    },
  ];
}

export function getFaqs(city, occasion) {
  return [...getStandardFaqs(city, occasion), occasion.faqLongTail(city.name)];
}

// Converts a hex color like "#C1553A" into an rgba() string with the given
// alpha, for tinted backgrounds/borders derived from a city's accent color.
export function withAlpha(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
