// ============================================================
// SpinPlate data model
// 50 US states, one flagship city per state, 13 occasion/vertical
// categories. Backed by Geoapify Places API (OSM data via a
// reliable paid-free-tier pipe instead of public Overpass mirrors).
// ============================================================

export const STATE_NAMES = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

// One flagship city per state. `flagship: true` cities (Austin, Denver,
// Nashville) get hand-written local-color content — cultural claims we
// actually know to be true. Every other city gets honest, data-driven
// content generated at build time from real Geoapify numbers, never
// invented prose (see [city]/[occasion].js getStaticProps).
export const CITIES = [
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    lat: 30.2672,
    lng: -97.7431,
    timezone: "America/Chicago",
    blurb: "Breakfast tacos, food truck parks, and patios with string lights.",
    accent: "#C1553A",
    accentText: "#E8977F",
    flagship: true,
  },
  {
    slug: "denver",
    name: "Denver",
    state: "CO",
    lat: 39.7392,
    lng: -104.9903,
    timezone: "America/Denver",
    blurb: "Serious coffee, mountain-view patios, and brunch that runs on mimosas.",
    accent: "#3E6B8A",
    accentText: "#8FC1DB",
    flagship: true,
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    lat: 36.1627,
    lng: -86.7816,
    timezone: "America/Chicago",
    blurb: "Hot chicken, honky-tonk nights, and biscuits worth the wait.",
    accent: "#C97C2C",
    accentText: "#F0B463",
    flagship: true,
  },
  {
    slug: "birmingham",
    name: "Birmingham",
    state: "AL",
    lat: 33.5207,
    lng: -86.8025,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Alabama.",
    accent: "#9f5738",
    accentText: "#de9a7c",
    flagship: false,
  },
  {
    slug: "anchorage",
    name: "Anchorage",
    state: "AK",
    lat: 61.2181,
    lng: -149.9003,
    timezone: "America/Anchorage",
    blurb: "Real, live-mapped spots across Alaska.",
    accent: "#389f75",
    accentText: "#7cdeb6",
    flagship: false,
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    lat: 33.4484,
    lng: -112.074,
    timezone: "America/Phoenix",
    blurb: "Real, live-mapped spots across Arizona.",
    accent: "#93389f",
    accentText: "#d37cde",
    flagship: false,
  },
  {
    slug: "little-rock",
    name: "Little Rock",
    state: "AR",
    lat: 34.7465,
    lng: -92.2896,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Arkansas.",
    accent: "#8c9f38",
    accentText: "#cdde7c",
    flagship: false,
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "CA",
    lat: 34.0522,
    lng: -118.2437,
    timezone: "America/Los_Angeles",
    blurb: "Real, live-mapped spots across California.",
    accent: "#386e9f",
    accentText: "#7cb1de",
    flagship: false,
  },
  {
    slug: "hartford",
    name: "Hartford",
    state: "CT",
    lat: 41.7658,
    lng: -72.6734,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Connecticut.",
    accent: "#9f3850",
    accentText: "#de7c94",
    flagship: false,
  },
  {
    slug: "wilmington",
    name: "Wilmington",
    state: "DE",
    lat: 39.7447,
    lng: -75.5484,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Delaware.",
    accent: "#389f3d",
    accentText: "#7cde81",
    flagship: false,
  },
  {
    slug: "miami",
    name: "Miami",
    state: "FL",
    lat: 25.7617,
    lng: -80.1918,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Florida.",
    accent: "#5b389f",
    accentText: "#9e7cde",
    flagship: false,
  },
  {
    slug: "atlanta",
    name: "Atlanta",
    state: "GA",
    lat: 33.749,
    lng: -84.388,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Georgia.",
    accent: "#9f7938",
    accentText: "#debb7c",
    flagship: false,
  },
  {
    slug: "honolulu",
    name: "Honolulu",
    state: "HI",
    lat: 21.3069,
    lng: -157.8583,
    timezone: "Pacific/Honolulu",
    blurb: "Real, live-mapped spots across Hawaii.",
    accent: "#389f97",
    accentText: "#7cded7",
    flagship: false,
  },
  {
    slug: "boise",
    name: "Boise",
    state: "ID",
    lat: 43.615,
    lng: -116.2023,
    timezone: "America/Boise",
    blurb: "Real, live-mapped spots across Idaho.",
    accent: "#9f3888",
    accentText: "#de7cc9",
    flagship: false,
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    lat: 41.8781,
    lng: -87.6298,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Illinois.",
    accent: "#6a9f38",
    accentText: "#acde7c",
    flagship: false,
  },
  {
    slug: "indianapolis",
    name: "Indianapolis",
    state: "IN",
    lat: 39.7684,
    lng: -86.1581,
    timezone: "America/Indiana/Indianapolis",
    blurb: "Real, live-mapped spots across Indiana.",
    accent: "#384c9f",
    accentText: "#7c90de",
    flagship: false,
  },
  {
    slug: "des-moines",
    name: "Des Moines",
    state: "IA",
    lat: 41.5868,
    lng: -93.625,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Iowa.",
    accent: "#9f4138",
    accentText: "#de867c",
    flagship: false,
  },
  {
    slug: "wichita",
    name: "Wichita",
    state: "KS",
    lat: 37.6872,
    lng: -97.3301,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Kansas.",
    accent: "#389f5f",
    accentText: "#7cdea2",
    flagship: false,
  },
  {
    slug: "louisville",
    name: "Louisville",
    state: "KY",
    lat: 38.2527,
    lng: -85.7585,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Kentucky.",
    accent: "#7d389f",
    accentText: "#bf7cde",
    flagship: false,
  },
  {
    slug: "new-orleans",
    name: "New Orleans",
    state: "LA",
    lat: 29.9511,
    lng: -90.0715,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Louisiana.",
    accent: "#9f9b38",
    accentText: "#dedb7c",
    flagship: false,
  },
  {
    slug: "portland-me",
    name: "Portland",
    state: "ME",
    lat: 43.6591,
    lng: -70.2568,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Maine.",
    accent: "#38849f",
    accentText: "#7cc5de",
    flagship: false,
  },
  {
    slug: "baltimore",
    name: "Baltimore",
    state: "MD",
    lat: 39.2904,
    lng: -76.6122,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Maryland.",
    accent: "#9f3866",
    accentText: "#de7ca8",
    flagship: false,
  },
  {
    slug: "boston",
    name: "Boston",
    state: "MA",
    lat: 42.3601,
    lng: -71.0589,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Massachusetts.",
    accent: "#489f38",
    accentText: "#8cde7c",
    flagship: false,
  },
  {
    slug: "detroit",
    name: "Detroit",
    state: "MI",
    lat: 42.3314,
    lng: -83.0458,
    timezone: "America/Detroit",
    blurb: "Real, live-mapped spots across Michigan.",
    accent: "#46389f",
    accentText: "#8a7cde",
    flagship: false,
  },
  {
    slug: "minneapolis",
    name: "Minneapolis",
    state: "MN",
    lat: 44.9778,
    lng: -93.265,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Minnesota.",
    accent: "#9f6438",
    accentText: "#dea67c",
    flagship: false,
  },
  {
    slug: "jackson",
    name: "Jackson",
    state: "MS",
    lat: 32.2988,
    lng: -90.1848,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Mississippi.",
    accent: "#389f82",
    accentText: "#7cdec3",
    flagship: false,
  },
  {
    slug: "kansas-city",
    name: "Kansas City",
    state: "MO",
    lat: 39.0997,
    lng: -94.5786,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Missouri.",
    accent: "#9f389d",
    accentText: "#de7cdd",
    flagship: false,
  },
  {
    slug: "billings",
    name: "Billings",
    state: "MT",
    lat: 45.7833,
    lng: -108.5007,
    timezone: "America/Denver",
    blurb: "Real, live-mapped spots across Montana.",
    accent: "#7f9f38",
    accentText: "#c1de7c",
    flagship: false,
  },
  {
    slug: "omaha",
    name: "Omaha",
    state: "NE",
    lat: 41.2565,
    lng: -95.9345,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Nebraska.",
    accent: "#38619f",
    accentText: "#7ca4de",
    flagship: false,
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "NV",
    lat: 36.1699,
    lng: -115.1398,
    timezone: "America/Los_Angeles",
    blurb: "Real, live-mapped spots across Nevada.",
    accent: "#9f3843",
    accentText: "#de7c88",
    flagship: false,
  },
  {
    slug: "manchester",
    name: "Manchester",
    state: "NH",
    lat: 42.9956,
    lng: -71.4548,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across New Hampshire.",
    accent: "#389f4a",
    accentText: "#7cde8e",
    flagship: false,
  },
  {
    slug: "newark",
    name: "Newark",
    state: "NJ",
    lat: 40.7357,
    lng: -74.1724,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across New Jersey.",
    accent: "#68389f",
    accentText: "#ab7cde",
    flagship: false,
  },
  {
    slug: "albuquerque",
    name: "Albuquerque",
    state: "NM",
    lat: 35.0844,
    lng: -106.6504,
    timezone: "America/Denver",
    blurb: "Real, live-mapped spots across New Mexico.",
    accent: "#9f8638",
    accentText: "#dec77c",
    flagship: false,
  },
  {
    slug: "new-york",
    name: "New York",
    state: "NY",
    lat: 40.7128,
    lng: -74.006,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across New York.",
    accent: "#38999f",
    accentText: "#7cd9de",
    flagship: false,
  },
  {
    slug: "charlotte",
    name: "Charlotte",
    state: "NC",
    lat: 35.2271,
    lng: -80.8431,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across North Carolina.",
    accent: "#9f387b",
    accentText: "#de7cbc",
    flagship: false,
  },
  {
    slug: "fargo",
    name: "Fargo",
    state: "ND",
    lat: 46.8772,
    lng: -96.7898,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across North Dakota.",
    accent: "#5d9f38",
    accentText: "#a0de7c",
    flagship: false,
  },
  {
    slug: "columbus",
    name: "Columbus",
    state: "OH",
    lat: 39.9612,
    lng: -82.9988,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Ohio.",
    accent: "#383f9f",
    accentText: "#7c83de",
    flagship: false,
  },
  {
    slug: "oklahoma-city",
    name: "Oklahoma City",
    state: "OK",
    lat: 35.4676,
    lng: -97.5164,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Oklahoma.",
    accent: "#9f4e38",
    accentText: "#de927c",
    flagship: false,
  },
  {
    slug: "portland-or",
    name: "Portland",
    state: "OR",
    lat: 45.5152,
    lng: -122.6784,
    timezone: "America/Los_Angeles",
    blurb: "Real, live-mapped spots across Oregon.",
    accent: "#389f6c",
    accentText: "#7cdeaf",
    flagship: false,
  },
  {
    slug: "philadelphia",
    name: "Philadelphia",
    state: "PA",
    lat: 39.9526,
    lng: -75.1652,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Pennsylvania.",
    accent: "#8a389f",
    accentText: "#cb7cde",
    flagship: false,
  },
  {
    slug: "providence",
    name: "Providence",
    state: "RI",
    lat: 41.824,
    lng: -71.4128,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Rhode Island.",
    accent: "#959f38",
    accentText: "#d5de7c",
    flagship: false,
  },
  {
    slug: "charleston-sc",
    name: "Charleston",
    state: "SC",
    lat: 32.7765,
    lng: -79.9311,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across South Carolina.",
    accent: "#38779f",
    accentText: "#7cb8de",
    flagship: false,
  },
  {
    slug: "sioux-falls",
    name: "Sioux Falls",
    state: "SD",
    lat: 43.5446,
    lng: -96.7311,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across South Dakota.",
    accent: "#9f3859",
    accentText: "#de7c9c",
    flagship: false,
  },
  {
    slug: "salt-lake-city",
    name: "Salt Lake City",
    state: "UT",
    lat: 40.7608,
    lng: -111.891,
    timezone: "America/Denver",
    blurb: "Real, live-mapped spots across Utah.",
    accent: "#3b9f38",
    accentText: "#7fde7c",
    flagship: false,
  },
  {
    slug: "burlington",
    name: "Burlington",
    state: "VT",
    lat: 44.4759,
    lng: -73.2121,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Vermont.",
    accent: "#53389f",
    accentText: "#967cde",
    flagship: false,
  },
  {
    slug: "richmond",
    name: "Richmond",
    state: "VA",
    lat: 37.5407,
    lng: -77.436,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across Virginia.",
    accent: "#9f7138",
    accentText: "#deb37c",
    flagship: false,
  },
  {
    slug: "seattle",
    name: "Seattle",
    state: "WA",
    lat: 47.6062,
    lng: -122.3321,
    timezone: "America/Los_Angeles",
    blurb: "Real, live-mapped spots across Washington.",
    accent: "#389f8f",
    accentText: "#7cdecf",
    flagship: false,
  },
  {
    slug: "charleston-wv",
    name: "Charleston",
    state: "WV",
    lat: 38.3498,
    lng: -81.6326,
    timezone: "America/New_York",
    blurb: "Real, live-mapped spots across West Virginia.",
    accent: "#9f3890",
    accentText: "#de7cd1",
    flagship: false,
  },
  {
    slug: "milwaukee",
    name: "Milwaukee",
    state: "WI",
    lat: 43.0389,
    lng: -87.9065,
    timezone: "America/Chicago",
    blurb: "Real, live-mapped spots across Wisconsin.",
    accent: "#729f38",
    accentText: "#b4de7c",
    flagship: false,
  },
  {
    slug: "cheyenne",
    name: "Cheyenne",
    state: "WY",
    lat: 41.14,
    lng: -104.8202,
    timezone: "America/Denver",
    blurb: "Real, live-mapped spots across Wyoming.",
    accent: "#38549f",
    accentText: "#7c98de",
    flagship: false,
  },
];

// Occasions (time/reason-based) and verticals (venue-type based) live in
// the same flat array on purpose — cross-multiplying occasion x vertical
// would produce near-duplicate pages (e.g. "Bars for Happy Hour") that
// read as thin/duplicate content to search engines.
//
// `categories` are real Geoapify Places API category keys, verified
// against https://apidocs.geoapify.com/docs/places/#categories —
// not guessed. `extraFilter` flags occasions that need special client-side
// filtering logic beyond distance/open-now (see spin.js).
export const OCCASIONS = [
  {
    slug: "brunch",
    name: "Brunch",
    tagline: "Late mornings, good coffee, and something worth waiting for.",
    radiusMeters: 4000,
    categories: ["catering.restaurant", "catering.cafe"],
    extraFilter: null,
  },
  {
    slug: "date-night",
    name: "Date Night",
    tagline: "Somewhere you haven't both already been ten times.",
    radiusMeters: 5000,
    categories: ["catering.restaurant"],
    extraFilter: null,
  },
  {
    slug: "coffee",
    name: "Coffee",
    tagline: "A real cup, not just the nearest chain.",
    radiusMeters: 3000,
    categories: ["catering.cafe", "catering.cafe.coffee_shop"],
    extraFilter: null,
  },
  {
    slug: "food-trucks",
    name: "Food Trucks",
    tagline: "Quick, good, and usually cash-friendly.",
    radiusMeters: 4000,
    categories: ["catering.fast_food"],
    extraFilter: null,
  },
  {
    slug: "happy-hour",
    name: "Happy Hour",
    tagline: "That window between work and the rest of the night.",
    radiusMeters: 3000,
    categories: ["catering.bar", "catering.pub"],
    extraFilter: null,
  },
  {
    slug: "lunch",
    name: "Lunch",
    tagline: "Something fast, real, and not another desk sandwich.",
    radiusMeters: 2000,
    categories: ["catering.restaurant", "catering.fast_food"],
    extraFilter: null,
  },
  {
    slug: "late-night",
    name: "Late Night",
    tagline: "For whenever the kitchen everyone else has closed.",
    radiusMeters: 4000,
    categories: ["catering.bar", "catering.fast_food", "catering.pub"],
    extraFilter: "lateNight",
  },
  {
    slug: "family-dinner",
    name: "Family Dinner",
    tagline: "Everyone agrees, or at least nobody complains twice.",
    radiusMeters: 5000,
    categories: ["catering.restaurant"],
    extraFilter: null,
  },
  {
    slug: "patio-outdoor",
    name: "Patio & Outdoor",
    tagline: "Good weather doesn't come with a guarantee it'll last.",
    radiusMeters: 4000,
    categories: ["catering.restaurant", "catering.cafe", "catering.bar"],
    extraFilter: "outdoorOnly",
  },
  {
    slug: "bars",
    name: "Bars",
    tagline: "No cover charge, no guest list, just a spin.",
    radiusMeters: 3000,
    categories: ["catering.bar", "catering.pub", "catering.biergarten"],
    extraFilter: null,
  },
  {
    slug: "dessert-ice-cream",
    name: "Dessert & Ice Cream",
    tagline: "You've earned it, or you haven't, doesn't matter.",
    radiusMeters: 3000,
    categories: ["catering.cafe.ice_cream", "catering.cafe.dessert"],
    extraFilter: null,
  },
  {
    slug: "bakeries",
    name: "Bakeries",
    tagline: "Something that was baked this morning, not shipped in.",
    radiusMeters: 3000,
    categories: ["commercial.food_and_drink.bakery"],
    extraFilter: null,
  },
  {
    slug: "breweries",
    name: "Breweries",
    tagline: "A real taproom, not just a bar with a brewery logo on it.",
    radiusMeters: 5000,
    categories: ["catering.taproom"],
    extraFilter: null,
  },
];

// Hand-written local color — flagship cities (Austin/Denver/Nashville)
// only, 13 occasions each = 39 notes. Never auto-generated for the other
// 47 cities: writing "local color" for a city we don't actually know well
// would mean fabricating it, which is the thing this project explicitly
// avoids. Non-flagship cities get a live-data stat sentence instead
// (built at build time from real Geoapify numbers — see getStaticProps).
const CITY_NOTES = {
  "brunch": {
    austin: "Austin's brunch scene leans casual \u2014 breakfast tacos, patio seating, and lines that start before 10am on weekends.",
    denver: "Denver's brunch culture runs on mimosas and altitude \u2014 expect bottomless drink specials and plenty of outdoor seating while the weather holds.",
    nashville: "Nashville brunch usually means biscuits, some version of hot chicken, and a wait if you're anywhere near Five Points or 12 South.",
  },
  "date-night": {
    austin: "Austin's date-night spots skew low-key \u2014 think string lights on a patio rather than white tablecloths.",
    denver: "Denver pairs a lot of its date-night restaurants with mountain views or rooftop patios, especially around RiNo and LoHi.",
    nashville: "Nashville does date night two ways: quiet neighborhood spot, or dinner before a show downtown \u2014 both are easy to find here.",
  },
  "coffee": {
    austin: "Austin has one of the more saturated independent coffee scenes in Texas \u2014 East Austin alone has a dozen worth trying.",
    denver: "Denver's coffee culture is serious about sourcing, and a lot of shops double as informal coworking spots.",
    nashville: "Nashville's coffee shops are scattered through Germantown, East Nashville, and the Gulch, often inside converted buildings.",
  },
  "food-trucks": {
    austin: "Austin basically helped popularize the modern food truck park \u2014 trailers here range from tacos to Detroit-style pizza.",
    denver: "Denver's food truck scene clusters around breweries and outdoor markets, especially in the warmer months.",
    nashville: "Nashville's food trucks show up heaviest around events and breweries, though mapping coverage varies more here than for sit-down spots.",
  },
  "happy-hour": {
    austin: "Austin's happy hours tend to run long on weekdays, especially around Rainey Street and South Congress, where patios fill up right after work.",
    denver: "Denver happy hour culture leans toward craft beer specials over cocktails \u2014 a lot of breweries treat their taproom hours as an unofficial happy hour.",
    nashville: "Nashville happy hour often overlaps with live music start times downtown, so expect crowds to build fast after 5pm near Broadway.",
  },
  "lunch": {
    austin: "Austin lunch spots skew fast and casual on weekdays \u2014 food trucks and taquerias handle a lot of the midday crowd downtown.",
    denver: "Denver's lunch scene downtown leans toward quick-service spots near the business district, with more sit-down options once you're outside the core.",
    nashville: "Nashville lunch downtown often means grabbing something quick between tourist stops on Broadway, with quieter sit-down options a few blocks out.",
  },
  "late-night": {
    austin: "Austin's late-night scene is real \u2014 this is a city that keeps kitchens open past midnight on weekends, especially near the entertainment district.",
    denver: "Denver's late-night options thin out faster than you'd expect on weeknights \u2014 weekends near downtown and RiNo are a safer bet.",
    nashville: "Nashville stays open late around Broadway thanks to the honky-tonks, though options fade quickly the further you get from downtown.",
  },
  "family-dinner": {
    austin: "Austin has a lot of casual, patio-heavy restaurants that work fine for families \u2014 just don't expect much in the way of formal kids' menus.",
    denver: "Denver's family dinner spots often lean brewery-adjacent, since a lot of breweries here are explicitly family-friendly before a certain hour.",
    nashville: "Nashville family dinner options are heavy on Southern comfort food \u2014 filling, casual, and generally easy with kids.",
  },
  "patio-outdoor": {
    austin: "Patio culture basically defines Austin dining \u2014 string lights, outdoor bars, and warm evenings most of the year.",
    denver: "Denver's patio season runs hard whenever the weather cooperates, and a lot of restaurants here are built around rooftop or mountain-facing seating.",
    nashville: "Nashville patios cluster around East Nashville and 12 South, often attached to a bar as much as a kitchen.",
  },
  "bars": {
    austin: "Austin's bar scene splits pretty cleanly between the loud energy of Sixth Street and the quieter dive bars scattered through East Austin.",
    denver: "Denver has one of the highest breweries-per-capita counts in the country, so \"bar\" here often really means \"taproom.\"",
    nashville: "Nashville bars mean honky-tonks on Broadway if you want live music, or quieter neighborhood spots if you don't.",
  },
  "dessert-ice-cream": {
    austin: "Austin's dessert scene leans toward paletas and Texas-size ice cream scoops \u2014 perfect for the heat most of the year.",
    denver: "Denver's dessert spots often double as coffee shops, so don't be surprised if the best ice cream stop is also a cafe.",
    nashville: "Nashville has a real soft-serve and biscuit-dessert culture \u2014 worth trying something region-specific over a standard cone.",
  },
  "bakeries": {
    austin: "Austin bakeries range from Texas-German kolache shops to modern sourdough spots \u2014 a wider range than you'd expect.",
    denver: "Denver's bakery scene has grown fast alongside its coffee culture, with a lot of overlap between the two.",
    nashville: "Nashville bakeries lean hard into biscuits and Southern baking traditions, alongside a newer wave of specialty sourdough shops.",
  },
  "breweries": {
    austin: "Austin's brewery scene is spread out \u2014 expect a short drive between taprooms rather than a walkable cluster.",
    denver: "Denver is arguably the best brewery city in the country per capita \u2014 taprooms are everywhere, especially in RiNo.",
    nashville: "Nashville's brewery scene is newer and smaller than its honky-tonk reputation suggests, concentrated mostly around Wedgewood-Houston.",
  },
};

// Hand-written long-tail FAQ, flagship cities only — same honesty rule
// as CITY_NOTES above.
const FLAGSHIP_FAQ = {
  "brunch": {
    austin: { q: "What's the best brunch in Austin with a view?", a: "SpinPlate doesn't tag venues for \"view\" specifically \u2014 OpenStreetMap doesn't reliably track that. What we can filter on is outdoor seating, which is often the closest honest proxy. Toggle it on if a patio matters more than a specific skyline." },
    denver: { q: "What's the best brunch in Denver with a view?", a: "SpinPlate doesn't tag venues for \"view\" specifically \u2014 OpenStreetMap doesn't reliably track that. What we can filter on is outdoor seating, which is often the closest honest proxy. Toggle it on if a mountain-facing patio matters more than a specific view." },
    nashville: { q: "What's the best brunch in Nashville with a view?", a: "SpinPlate doesn't tag venues for \"view\" specifically \u2014 OpenStreetMap doesn't reliably track that. What we can filter on is outdoor seating, which is often the closest honest proxy. Toggle it on if a patio matters more than a specific skyline." },
  },
  "date-night": {
    austin: { q: "What's a good romantic date night spot in Austin?", a: "\"Romantic\" isn't something OpenStreetMap tags, so we can't filter for it directly. What tends to get closest is a quieter spot with outdoor seating \u2014 toggle that filter and set a tighter distance for something walkable and low-key." },
    denver: { q: "What's a good romantic date night spot in Denver?", a: "\"Romantic\" isn't something OpenStreetMap tags, so we can't filter for it directly. What tends to get closest is a quieter spot with outdoor seating \u2014 toggle that filter and set a tighter distance for something walkable and low-key." },
    nashville: { q: "What's a good romantic date night spot in Nashville?", a: "\"Romantic\" isn't something OpenStreetMap tags, so we can't filter for it directly. What tends to get closest is a quieter spot with outdoor seating \u2014 toggle that filter and set a tighter distance for something walkable and low-key." },
  },
  "coffee": {
    austin: { q: "What's a good coffee shop in Austin for working?", a: "We don't have a reliable \"has wifi\" or \"laptop-friendly\" tag to filter on \u2014 OSM/Geoapify coverage for that is spotty. Outdoor seating is the one proxy we do have, so it's worth toggling if you want options beyond a counter and two stools." },
    denver: { q: "What's a good coffee shop in Denver for working?", a: "We don't have a reliable \"has wifi\" or \"laptop-friendly\" tag to filter on \u2014 coverage for that is spotty. Outdoor seating is the one proxy we do have, so it's worth toggling if you want options beyond a counter and two stools." },
    nashville: { q: "What's a good coffee shop in Nashville for working?", a: "We don't have a reliable \"has wifi\" or \"laptop-friendly\" tag to filter on \u2014 coverage for that is spotty. Outdoor seating is the one proxy we do have, so it's worth toggling if you want options beyond a counter and two stools." },
  },
  "food-trucks": {
    austin: { q: "Are there food trucks near me in Austin open late?", a: "Depends entirely on how well the truck's hours are mapped \u2014 a lot of trucks don't list hours at all. Turn on \"open now\" to filter out the ones marked closed, but treat anything marked \"unknown\" as worth a quick call first." },
    denver: { q: "Are there food trucks near me in Denver open late?", a: "Depends entirely on how well the truck's hours are mapped \u2014 a lot of trucks don't list hours at all. Turn on \"open now\" to filter out the ones marked closed, but treat anything marked \"unknown\" as worth a quick call first." },
    nashville: { q: "Are there food trucks near me in Nashville open late?", a: "Depends entirely on how well the truck's hours are mapped \u2014 a lot of trucks don't list hours at all. Turn on \"open now\" to filter out the ones marked closed, but treat anything marked \"unknown\" as worth a quick call first." },
  },
  "happy-hour": {
    austin: { q: "What's the best happy hour in Austin?", a: "SpinPlate doesn't track drink specials or pricing \u2014 that's not in the map data. What it can tell you is which bars near Rainey Street or South Congress are actually open right now; the pricing part is still on you to check." },
    denver: { q: "What's the best happy hour in Denver?", a: "SpinPlate doesn't track drink specials or pricing \u2014 that's not in the map data. Since a lot of Denver's happy hour culture happens in taprooms rather than bars, it's worth toggling into the Breweries category too if a bar search comes up thin." },
    nashville: { q: "What's the best happy hour in Nashville?", a: "SpinPlate doesn't track drink specials or pricing \u2014 that's not in the map data. Near Broadway, \"open now\" matters more than usual since crowds build fast right after 5pm." },
  },
  "lunch": {
    austin: { q: "Where's a quick lunch spot in Austin?", a: "Set the distance to 1km and turn on open-now \u2014 Austin's fastest lunch options downtown are food trucks, which this occasion pulls in alongside sit-down spots." },
    denver: { q: "Where's a quick lunch spot in Denver?", a: "Set the distance to 1km and turn on open-now. Downtown Denver's lunch crowd moves fast on weekdays, so anywhere marked \"unknown\" hours is worth a quick call first." },
    nashville: { q: "Where's a quick lunch spot in Nashville?", a: "Set the distance to 1km and turn on open-now. Near Broadway, lunch spots get busy fast with the tourist crowd \u2014 a block or two off the main strip usually means a shorter wait." },
  },
  "late-night": {
    austin: { q: "What's open late in Austin?", a: "Toggle \"stays open late\" \u2014 Austin genuinely has more mapped late-night options than most cities on this list, especially near the entertainment district downtown." },
    denver: { q: "What's open late in Denver?", a: "Toggle \"stays open late.\" Denver thins out faster on weeknights than you'd expect \u2014 this filter matters more here than in a city that never really closes." },
    nashville: { q: "What's open late in Nashville?", a: "Toggle \"stays open late.\" Broadway's honky-tonks keep kitchens running later than most of the city, so distance from downtown matters a lot for this one." },
  },
  "family-dinner": {
    austin: { q: "Is there a good family dinner spot in Austin?", a: "There's no \"kid-friendly\" tag to filter on, so this pulls the same restaurant pool as any dinner search. Austin's patio-heavy, casual restaurants tend to work fine for families even without a dedicated kids' menu." },
    denver: { q: "Is there a good family dinner spot in Denver?", a: "There's no \"kid-friendly\" tag to filter on. If a restaurant search comes up thin, Denver's family-hour brewery scene is worth checking under Breweries instead." },
    nashville: { q: "Is there a good family dinner spot in Nashville?", a: "There's no \"kid-friendly\" tag to filter on. Nashville's Southern comfort food restaurants tend to be casual and filling, which usually works fine with kids in tow." },
  },
  "patio-outdoor": {
    austin: { q: "Where can I eat outside in Austin?", a: "This filters for the outdoor_seating tag specifically. Austin has more of these mapped than most cities here \u2014 patio dining is basically the default, not the exception." },
    denver: { q: "Where can I eat outside in Denver?", a: "This filters for the outdoor_seating tag specifically. Denver's patio season is real but seasonal \u2014 worth double-checking that a spot's patio is actually open if you're spinning outside of summer." },
    nashville: { q: "Where can I eat outside in Nashville?", a: "This filters for the outdoor_seating tag specifically. East Nashville and 12 South have the highest concentration of mapped outdoor seating in the city." },
  },
  "bars": {
    austin: { q: "What's a good bar in Austin?", a: "No ratings here \u2014 just mapped bars and pubs within your radius. Sixth Street will skew loud and crowded; East Austin picks tend to be quieter." },
    denver: { q: "What's a good bar in Denver?", a: "No ratings here. Worth knowing: a lot of what Denver calls a \"bar\" is really a brewery taproom \u2014 check the Breweries category too if this one feels thin." },
    nashville: { q: "What's a good bar in Nashville?", a: "No ratings here. Broadway bars mean live music and crowds; anywhere else in the city will be noticeably quieter." },
  },
  "dessert-ice-cream": {
    austin: { q: "Where's good ice cream in Austin?", a: "This searches ice cream shops and dessert cafes specifically, not restaurants with a dessert menu. Texas heat means Austin has more of these mapped than you'd guess." },
    denver: { q: "Where's good ice cream in Denver?", a: "This searches ice cream shops and dessert cafes specifically. A lot of Denver's dessert spots double as coffee shops, so some overlap with the Coffee category is normal." },
    nashville: { q: "Where's good ice cream in Nashville?", a: "This searches ice cream shops and dessert cafes specifically. Worth trying a soft-serve or biscuit-dessert spot here over a standard scoop shop if one comes up." },
  },
  "bakeries": {
    austin: { q: "What's a good bakery in Austin?", a: "This filters for shops tagged specifically as bakeries, not cafes that sell pastries on the side. Austin's range runs from Texas-German kolache shops to modern sourdough." },
    denver: { q: "What's a good bakery in Denver?", a: "This filters for shops tagged specifically as bakeries. Denver's bakery scene has grown alongside its coffee culture \u2014 some overlap with the Coffee category is normal." },
    nashville: { q: "What's a good bakery in Nashville?", a: "This filters for shops tagged specifically as bakeries. Nashville leans hard into biscuits and Southern baking traditions here." },
  },
  "breweries": {
    austin: { q: "What breweries are near me in Austin?", a: "This looks for taprooms specifically, not brewing facilities without public seating. Austin's scene is spread out, so expect a short drive between stops rather than a walkable cluster." },
    denver: { q: "What breweries are near me in Denver?", a: "This looks for taprooms specifically. Denver is arguably the best brewery city in the country per capita \u2014 RiNo alone has a dense cluster worth a wider radius." },
    nashville: { q: "What breweries are near me in Nashville?", a: "This looks for taprooms specifically. Nashville's brewery scene is newer and smaller than the honky-tonk reputation suggests \u2014 Wedgewood-Houston is the area to check." },
  },
};

// Long-tail FAQ template for the other 47 cities — {city} interpolated
// at render time. Distinct per occasion/vertical (not one generic
// sentence reused everywhere), but no fabricated per-city claims.
const GENERIC_FAQ_TEMPLATE = {
  "brunch": { q: "What's the best brunch in {city} with a view?", a: "SpinPlate doesn't tag venues for \"view\" specifically \u2014 that's not something the underlying map data tracks reliably. Outdoor seating is the closest honest proxy; toggle it on if a patio matters more than a specific skyline." },
  "date-night": { q: "What's a good romantic date night spot in {city}?", a: "\"Romantic\" isn't something the map data tags, so we can't filter for it directly. A quieter spot with outdoor seating tends to get closest \u2014 toggle that filter and tighten the distance for something walkable." },
  "coffee": { q: "What's a good coffee shop in {city} for working?", a: "There's no reliable \"has wifi\" or \"laptop-friendly\" tag to filter on. Outdoor seating is the one proxy available, worth toggling if you want more than a counter and two stools." },
  "food-trucks": { q: "Are there food trucks near me in {city} open late?", a: "Depends on how well each truck's hours are mapped \u2014 many don't list hours at all. Turn on \"open now\" to filter closed ones, but treat \"unknown\" as worth a call first." },
  "happy-hour": { q: "Where's a good happy hour in {city}?", a: "SpinPlate doesn't track drink specials or pricing \u2014 that data doesn't exist here. What it can filter on is bar vs. pub type and distance; the deal-hunting part is on you." },
  "lunch": { q: "Where can I get a quick lunch near me in {city}?", a: "Distance and \"open now\" are the two filters that matter most here \u2014 set a tight radius if you're on a short break, and turn on open-now so you're not sent somewhere already closed." },
  "late-night": { q: "What's open late near me in {city}?", a: "Toggle \"stays open late\" and only spots whose mapped hours run past 10pm show up. Coverage depends on how well each place's late hours are actually mapped \u2014 treat anything unlisted as worth a call." },
  "family-dinner": { q: "What's a good family-friendly dinner spot in {city}?", a: "There's no reliable \"kid-friendly\" tag to filter on, so this pulls from the same restaurant pool as any dinner search. A fully-mapped sit-down restaurant is generally a safer bet than a sparse listing." },
  "patio-outdoor": { q: "Where can I eat outside in {city}?", a: "This filters specifically for venues tagged with outdoor seating \u2014 real tag data, not a guess. Coverage varies by city depending on how thoroughly that detail has been mapped." },
  "bars": { q: "What's a good bar near me in {city}?", a: "This pulls from mapped bars and pubs within your radius \u2014 no ratings, since that data doesn't exist here. Spin again if the first pick doesn't fit." },
  "dessert-ice-cream": { q: "Where can I get dessert or ice cream near me in {city}?", a: "This searches ice cream shops and dessert-focused cafes specifically \u2014 not general restaurants with a dessert menu, since that's a different category entirely." },
  "bakeries": { q: "What's a good bakery in {city}?", a: "This filters for shops tagged specifically as bakeries \u2014 not cafes that happen to sell pastries. For a sit-down spot with baked goods, the Coffee or Brunch category has more options." },
  "breweries": { q: "Are there any breweries near me in {city}?", a: "This looks for taprooms \u2014 places set up for drinking on-site \u2014 not brewing facilities without public tasting rooms. Not every brewery maps its taproom separately, so coverage can be patchy." },
};

// Standard FAQs that apply to every occasion — parameterized by city and
// occasion name. Kept honest about what the underlying data can and can't
// actually tell you, since there's no ratings/reviews data behind any of this.
function getStandardFaqs(city, occasion) {
  const label = occasion.name.toLowerCase();
  return [
    {
      q: `How does SpinPlate pick a ${label} spot in ${city.name}?`,
      a: `It pulls real, currently-mapped ${label} spots from OpenStreetMap (via Geoapify) within your chosen distance, filters by whatever you've toggled, then picks one at random — with a slight nudge toward listings that have more complete data (like a cuisine tag set). No ratings or reviews factor in, because that data doesn't reliably exist for this category.`,
    },
    {
      q: `Is the ${label} spot open right now?`,
      a: `If you turn on "open now," SpinPlate only shows spots whose mapped hours say they're currently open. Some venues don't have hours mapped at all — those are marked "unknown" and left in the pool rather than assumed closed, since a wrong guess would unfairly filter out a real option.`,
    },
    {
      q: `Can I set a specific distance for ${label} in ${city.name}?`,
      a: `Yes — the distance filter on this page lets you narrow to 1km, 3km, or open it up to 5km+ from ${city.name}'s center point.`,
    },
    {
      q: `Does SpinPlate show ratings for ${city.name} ${label} spots?`,
      a: `No, on purpose. The underlying map data doesn't carry reliable rating data, and we'd rather leave it out than make something up. If you want reviews before you go, that's what your maps app is for.`,
    },
  ];
}

// Resolves the long-tail FAQ for a city+occasion pair to a plain {q, a}
// object — always fully resolved before it's ever returned from
// getStaticProps, so it stays JSON-serializable (a past bug here broke
// every page in production by passing a function through props instead).
function getLongTailFaq(city, occasion) {
  if (city.flagship && FLAGSHIP_FAQ[occasion.slug]?.[city.slug]) {
    return FLAGSHIP_FAQ[occasion.slug][city.slug];
  }
  const template = GENERIC_FAQ_TEMPLATE[occasion.slug];
  return {
    q: template.q.replace("{city}", city.name),
    a: template.a.replace("{city}", city.name),
  };
}

export function getFaqs(city, occasion) {
  return [...getStandardFaqs(city, occasion), getLongTailFaq(city, occasion)];
}

// Returns the hand-written local-color note for flagship cities, or null
// for everyone else (those pages use a live-data stat sentence instead —
// see buildAreaStatSentence in geoapify.js, called from getStaticProps).
export function getCityNote(city, occasion) {
  if (!city.flagship) return null;
  return CITY_NOTES[occasion.slug]?.[city.slug] || null;
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

// ---------- State hub helpers ----------
// One flagship city per state in this data model, so a "state hub" and a
// "city hub" would be near-duplicate pages — we only build the state hub,
// and it links straight through to that state's city+occasion pages.
export function getAllStateSlugs() {
  return CITIES.map((c) => c.state.toLowerCase());
}

export function getStateBySlug(stateSlug) {
  const city = CITIES.find((c) => c.state.toLowerCase() === stateSlug.toLowerCase());
  if (!city) return null;
  return {
    slug: city.state.toLowerCase(),
    abbr: city.state,
    name: STATE_NAMES[city.state],
    city,
  };
}

export function getAllStates() {
  return CITIES.map((city) => ({
    slug: city.state.toLowerCase(),
    abbr: city.state,
    name: STATE_NAMES[city.state],
    city,
  }));
}
