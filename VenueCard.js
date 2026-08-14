import CategoryIcon from "./CategoryIcon";

export default function VenueCard({ venue, reason, occasionSlug, onSpinAgain }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    venue.name
  )}&query_place_id=&center=${venue.lat},${venue.lng}`;

  return (
    <div className="animate-reveal rounded-card bg-cream p-6 text-ink shadow-lg sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-wine/10 text-wine">
          <CategoryIcon occasion={occasionSlug} />
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

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-wine py-3.5 text-sm font-semibold text-cream transition-transform active:scale-95"
      >
        Get Directions →
      </a>

      <div className="mt-3 text-center text-xs text-mute">
        Pulled from open map data — details may vary, worth a quick call ahead.
      </div>
    </div>
  );
}
