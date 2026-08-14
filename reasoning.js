// Builds a one-line "why this fits" from whatever real data we actually
// have — distance, cuisine, open status, outdoor seating. Never invents a
// rating or review that doesn't exist. Several phrasing templates per
// situation so repeated spins don't all sound identical.

function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)}m away`;
  return `${km.toFixed(1)}km away`;
}

function cuisineLabel(cuisine) {
  if (!cuisine) return null;
  // OSM cuisine tags are often semicolon-separated, sometimes underscored
  return cuisine.split(";")[0].replace(/_/g, " ");
}

export function buildReason(venue, { openStatus }) {
  const dist = formatDistance(venue.distanceKm);
  const cuisine = cuisineLabel(venue.cuisine);

  const openLine =
    openStatus === true
      ? "open now"
      : openStatus === false
      ? "worth calling ahead — may be closed"
      : null;

  const templates = [];

  if (cuisine && openLine) {
    templates.push(`${cuisine[0].toUpperCase() + cuisine.slice(1)}, ${dist}, ${openLine}.`);
  }
  if (cuisine) {
    templates.push(`A ${cuisine} spot ${dist.replace(" away", "")} away.`);
  }
  if (venue.outdoorSeating) {
    templates.push(`${dist}, and it has outdoor seating.`);
  }
  templates.push(`${dist} from where you set your pin.`);
  if (openLine) {
    templates.push(`${openLine.charAt(0).toUpperCase() + openLine.slice(1)}, ${dist}.`);
  }

  // pick pseudo-randomly among whichever templates actually apply
  return templates[Math.floor(Math.random() * templates.length)];
}
