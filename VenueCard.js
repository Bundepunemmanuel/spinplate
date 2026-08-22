import CategoryIcon from "./CategoryIcon";
import ShareChallenge from "./ShareChallenge";

// Builds a small bounding box around the venue for a free OpenStreetMap
// embed — no API key, no billing, unlike Google Maps Embed API.
function buildOsmEmbedUrl(lat, lng) {
  const delta = 0.006;
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`;
}

export default function VenueCard({ venue, reason, city, occasion, onSpinAgain, accent = "#3D1220" }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue.name
  )}&query_place_id=&center=${venue.lat},${venue.lng}`;

  return (
    <div className="animate-reveal rounded-card bg-cream p-6 text-ink shadow-lg sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}1A`, color: accent }}
        >
          <CategoryIcon occasion={occasion.slug} />
        </div>
        <button
          onClick={onSpinAgain}
          className="rounded-full border border-wine/20 px-4 py-2 text-xs font-semibold text-wine transition-transform active:scale-95"
        >
          ↻ Spin Again
        </button>
      </div>

      <div className="mt-5 font-display text-3xl font-semibold leading-tight text-ink">
        {venue.name}
      </div>

      {venue.address && (
        <div className="mt-1 text-sm text-mute">{venue.address}</div>
      )}

      <div className="mt-4 rounded-2xl bg-wine/5 px-4 py-3 text-sm font-medium text-wine">
        {reason}
      </div>

      {venue.lat && venue.lng && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-wine/10">
          <iframe
            title={`Map preview of ${venue.name}`}
            src={buildOsmEmbedUrl(venue.lat, venue.lng)}
            className="h-40 w-full grayscale-[15%]"
            loading="lazy"
            style={{ border: 0 }}
          />
        </div>
      )}

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-wine py-3.5 text-sm font-semibold text-cream transition-transform active:scale-95"
      >
        Get Directions →
      </a>

      <ShareChallenge venue={venue} city={city} occasion={occasion} accent={accent} />

      <div className="mt-3 text-center text-xs text-mute">
        Pulled from open map data — details may vary, worth a quick call ahead.
      </div>
    </div>
  );
}
