import { useState, useEffect, useMemo } from "react";
import { fetchVenues } from "./overpass";
import { filterVenues, pickRandom, isOpenNow } from "./spin";
import { buildReason } from "./reasoning";
import VenueCard from "./VenueCard";

const DISTANCE_OPTIONS = [
  { label: "1 km", km: 1 },
  { label: "3 km", km: 3 },
  { label: "5+ km", km: null },
];

// Rotates through while we wait on the Overpass API, so the loading state
// reads as "actively working" rather than a frozen screen.
const LOADING_CAPTIONS = [
  "Spinning the plate…",
  "Scouting the neighborhood…",
  "Sniffing out good spots…",
  "Checking who's actually open…",
  "Nearly got a table…",
];

function PlateSpinner({ accent, mirrorAttempt }) {
  const [captionIndex, setCaptionIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCaptionIndex((i) => (i + 1) % LOADING_CAPTIONS.length);
    }, 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-6">
      <div className="relative h-20 w-20">
        <div
          className="absolute inset-0 rounded-full border-4"
          style={{ borderColor: `${accent}40` }}
        />
        <div
          className="absolute inset-0 flex items-start justify-center animate-[plate-spin_1.6s_linear_infinite]"
          style={{ transformOrigin: "50% 50%" }}
        >
          <span className="-mt-1 text-2xl leading-none">🍴</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center animate-[plate-pulse_1.6s_ease-in-out_infinite]">
          <span className="text-3xl leading-none">🍽️</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-cream">
          {LOADING_CAPTIONS[captionIndex]}
        </div>
        {mirrorAttempt > 0 && (
          <div className="mt-1 font-mono text-[11px] text-cream/40">
            trying another map source ({mirrorAttempt + 1}/3)…
          </div>
        )}
      </div>
    </div>
  );
}

export default function SpinWidget({ city, occasion, accent = "#C89B3C", accentText = "#E0B85C" }) {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [allVenues, setAllVenues] = useState([]);
  const [mirrorAttempt, setMirrorAttempt] = useState(0);
  const [maxDistanceKm, setMaxDistanceKm] = useState(3);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [picked, setPicked] = useState(null);
  const [reason, setReason] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setMirrorAttempt(0);
    fetchVenues({
      lat: city.lat,
      lng: city.lng,
      radiusMeters: occasion.radiusMeters,
      osmTags: occasion.osmTags,
      onAttempt: (index) => {
        if (!cancelled) setMirrorAttempt(index);
      },
    })
      .then((venues) => {
        if (cancelled) return;
        setAllVenues(venues);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [city.slug, occasion.slug]);

  const eligible = useMemo(
    () => filterVenues(allVenues, { maxDistanceKm, openNowOnly }),
    [allVenues, maxDistanceKm, openNowOnly]
  );

  function handleSpin() {
    if (!eligible.length) return;
    setSpinning(true);
    setPicked(null);
    // brief delay purely for the spin animation to feel intentional,
    // not because anything is actually processing
    setTimeout(() => {
      const venue = pickRandom(eligible);
      const openStatus = isOpenNow(venue.openingHours);
      setReason(buildReason(venue, { openStatus }));
      setPicked(venue);
      setSpinning(false);
    }, 650);
  }

  return (
    <div className="overflow-hidden rounded-card bg-wine2 p-6 sm:p-8">
      {status === "loading" ? (
        <PlateSpinner accent={accent} mirrorAttempt={mirrorAttempt} />
      ) : (
        <>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-cream">
              {status === "ready" && (
                <>
                  <span style={{ color: accentText }}>
                    {allVenues.length} real spot{allVenues.length === 1 ? "" : "s"}
                  </span>
                  {` mapped here — ${eligible.length} match your filters`}
                </>
              )}
              {status === "error" && "Couldn't reach the map data — try again"}
            </div>
          </div>

          <div className="mb-5 flex flex-wrap gap-2">
            {DISTANCE_OPTIONS.map((opt) => {
              const active = maxDistanceKm === opt.km;
              return (
                <button
                  key={opt.label}
                  onClick={() => setMaxDistanceKm(opt.km)}
                  className="rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95"
                  style={
                    active
                      ? { backgroundColor: accent, color: "#F7F0E4" }
                      : { backgroundColor: "rgba(247,240,228,0.1)", color: "#F7F0E4" }
                  }
                >
                  {opt.label}
                </button>
              );
            })}
            <button
              onClick={() => setOpenNowOnly((v) => !v)}
              className="rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95"
              style={
                openNowOnly
                  ? { backgroundColor: accent, color: "#F7F0E4" }
                  : { backgroundColor: "rgba(247,240,228,0.1)", color: "#F7F0E4" }
              }
            >
              Open now
            </button>
          </div>

          {status === "ready" && eligible.length === 0 && (
            <div className="mb-5 rounded-2xl bg-cream/10 px-4 py-3 text-sm text-cream/80">
              Nothing matches those filters yet — try widening the distance.
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 rounded-2xl bg-cream/10 px-4 py-3 text-sm text-cream/80">
              The free map service didn't respond in time. This can happen — give it another try in a moment.
            </div>
          )}

          {!picked && (
            <button
              onClick={handleSpin}
              disabled={status !== "ready" || eligible.length === 0 || spinning}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold transition-transform active:scale-95 ${
                status === "ready" && eligible.length > 0
                  ? "bg-gold text-ink"
                  : "cursor-not-allowed bg-cream/10 text-cream/40"
              } ${spinning ? "animate-spin-pulse" : ""}`}
            >
              {spinning ? "Spinning…" : "🎯 Spin"}
            </button>
          )}

          {picked && (
            <VenueCard
              venue={picked}
              reason={reason}
              occasionSlug={occasion.slug}
              onSpinAgain={handleSpin}
              accent={accent}
            />
          )}
        </>
      )}
    </div>
  );
}
