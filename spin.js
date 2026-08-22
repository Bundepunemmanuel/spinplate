// OSM's opening_hours syntax is a real spec (e.g. "Mo-Fr 08:00-17:00;
// Sa-Su 09:00-15:00") but full parsing is genuinely complex. This handles
// the common simple cases and honestly reports "unknown" rather than
// guessing wrong for anything unusual — a false "closed" would wrongly
// filter out a real venue, so we err toward including it when unsure.
const DAY_CODES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function parseSimpleRange(rangeStr) {
  const match = rangeStr.match(/(\d{1,2}):(\d{2})-(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const [, h1, m1, h2, m2] = match.map(Number);
  return { startMin: h1 * 60 + m1, endMin: h2 * 60 + m2 };
}

// Returns { day: "Mo", minutes: 735 } for the current wall-clock time in
// the given IANA timezone — e.g. Denver's own local time, not the
// visitor's device time. Without this, "open now" was being checked
// against whatever timezone the visitor's phone happened to be set to,
// which silently breaks for anyone not in the same timezone as the city
// they're browsing.
function getLocalDayAndMinutes(timezone, now) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type) => parts.find((p) => p.type === type)?.value;
  const weekdayLong = get("weekday"); // "Mon", "Tue", ...
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  const WEEKDAY_TO_CODE = { Sun: "Su", Mon: "Mo", Tue: "Tu", Wed: "We", Thu: "Th", Fri: "Fr", Sat: "Sa" };
  return { day: WEEKDAY_TO_CODE[weekdayLong], minutes: hour * 60 + minute };
}

export function isOpenNow(openingHoursStr, timezone, now = new Date()) {
  if (!openingHoursStr) return "unknown";
  if (openingHoursStr.toLowerCase() === "24/7") return true;
  if (!timezone) return "unknown"; // can't honestly evaluate without knowing whose "now" this is

  const { day: currentDay, minutes: currentMin } = getLocalDayAndMinutes(timezone, now);

  const segments = openingHoursStr.split(";").map((s) => s.trim());

  for (const seg of segments) {
    const dayMatch = seg.match(/^([A-Za-z,-]+)\s+(.+)$/);
    if (!dayMatch) continue;
    const [, dayPart, timePart] = dayMatch;

    // only handle simple "Mo-Fr" or single-day "Sa" style ranges —
    // anything more exotic (holidays, "off", etc.) falls through to unknown
    const dayRangeMatch = dayPart.match(/^([A-Za-z]{2})(-([A-Za-z]{2}))?$/);
    if (!dayRangeMatch) return "unknown";

    const startDay = dayRangeMatch[1];
    const endDay = dayRangeMatch[3] || startDay;
    const startIdx = DAY_CODES.indexOf(startDay);
    const endIdx = DAY_CODES.indexOf(endDay);
    if (startIdx === -1 || endIdx === -1) return "unknown";

    const inDayRange =
      startIdx <= endIdx
        ? startIdx <= DAY_CODES.indexOf(currentDay) &&
          DAY_CODES.indexOf(currentDay) <= endIdx
        : DAY_CODES.indexOf(currentDay) >= startIdx ||
          DAY_CODES.indexOf(currentDay) <= endIdx;

    if (!inDayRange) continue;

    const range = parseSimpleRange(timePart);
    if (!range) return "unknown";

    return currentMin >= range.startMin && currentMin <= range.endMin;
  }

  return false;
}

// Checks whether a venue's cuisine tag(s) include the given cuisine.
// OSM cuisine values are semicolon-separated (e.g. "mexican;tex_mex"), so a
// venue can match more than one filter chip.
function venueHasCuisine(venue, cuisine) {
  if (!venue.cuisine) return false;
  const values = venue.cuisine.split(";").map((c) => c.trim().toLowerCase());
  return values.includes(cuisine.toLowerCase());
}

export function filterVenues(venues, { maxDistanceKm, openNowOnly, lateNightOnly, outdoorOnly, timezone, cuisine }) {
  return venues.filter((v) => {
    if (maxDistanceKm && v.distanceKm > maxDistanceKm) return false;
    if (cuisine && !venueHasCuisine(v, cuisine)) return false;
    if (openNowOnly) {
      const open = isOpenNow(v.openingHours, timezone);
      if (open === false) return false;
      // "unknown" passes through — we don't want to hide a venue just
      // because its hours weren't mapped
    }
    if (lateNightOnly) {
      const late = isOpenLate(v.openingHours);
      if (late === false) return false;
      // same reasoning as above — "unknown" stays in the pool
    }
    if (outdoorOnly && !v.outdoorSeating) return false;
    return true;
  });
}

// Checks whether a venue's mapped hours run past 10pm on any day. Reuses
// the same conservative parsing as isOpenNow — anything it can't parse
// confidently returns "unknown" rather than guessing, so a real late-night
// spot never gets wrongly filtered out just because its hours string is
// unusual.
export function isOpenLate(openingHoursStr) {
  if (!openingHoursStr) return "unknown";
  if (openingHoursStr.toLowerCase() === "24/7") return true;

  const segments = openingHoursStr.split(";").map((s) => s.trim());
  let sawParseable = false;

  for (const seg of segments) {
    const dayMatch = seg.match(/^([A-Za-z,-]+)\s+(.+)$/);
    if (!dayMatch) continue;
    const [, , timePart] = dayMatch;
    const range = parseSimpleRange(timePart);
    if (!range) continue;
    sawParseable = true;
    // closes at/after 22:00, or wraps past midnight (end < start)
    if (range.endMin >= 22 * 60 || range.endMin < range.startMin) return true;
  }

  return sawParseable ? false : "unknown";
}

// Derives the cuisine filter chips live from the venues actually returned
// for this city+category — never a hardcoded list. Returns the top few by
// frequency, title-cased for display. Only meaningful with real variety in
// the pool, so callers should skip rendering the filter row entirely if
// this comes back with fewer than 2 options.
export function getTopCuisines(venues, max = 6) {
  const counts = {};
  venues.forEach((v) => {
    if (!v.cuisine) return;
    v.cuisine.split(";").forEach((raw) => {
      const clean = raw.trim().toLowerCase();
      if (!clean) return;
      counts[clean] = (counts[clean] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([value]) => ({
      value,
      label: value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    }));
}

// Uniform random pick. OSM has no reliable quality signal (no ratings) to
// weight by, so we're honest about that instead of pretending otherwise —
// slight nudge toward venues that at least have a cuisine tag set, since
// that usually means a more complete listing.
export function pickRandom(venues) {
  if (!venues.length) return null;
  const withCuisine = venues.filter((v) => v.cuisine);
  const pool = withCuisine.length >= 3 ? withCuisine : venues;
  return pool[Math.floor(Math.random() * pool.length)];
}
