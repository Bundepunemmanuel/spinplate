import { useState, useEffect, useMemo } from "react";
import { fetchVenues } from "./geoapify";
import { filterVenues, pickRandom, isOpenNow, getTopCuisines } from "./spin";
import { buildReason } from "./reasoning";
import VenueCard from "./VenueCard";

const DISTANCE_OPTIONS = [
  { label: "1 km", km: 1 },
  { label: "3 km", km: 3 },
  { label: "5+ km", km: null },
];

// Rotates through while we wait on Geoapify, so the loading state reads as
// "actively working" rather than a frozen screen.
const LOADING_CAPTIONS = [
  "Spinning the plate…",
  "Scouting the neighborhood…",
  "Sniffing out good spots…",
  "Checking who's actually open…",
  "Nearly got a table…",
];

function PlateSpinner() {
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
        <div className="absolute inset-0 rounded-full border-4 border-gold/25" />
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
      <div className="text-sm font-semibold text-cream">
        {LOADING_CAPTIONS[captionIndex]}
      </div>
    </div>
  );
}

export default function SpinWidget({ city, occasion, accent = "#C89B3C", accentText = "#E0B85C" }) {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [allVenues, setAllVenues] = useState([]);
  const [retryCount, setRetryCount] = useState(0);
  const [maxDistanceKm, setMaxDistanceKm] = useState(3);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [lateNightOnly, setLateNightOnly] = useState(false);
  const [outdoorOnly, setOutdoorOnly] = useState(occasion.extraFilter === "outdoorOnly");
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [picked, setPicked] = useState(null);
  const [pickedPoolSize, setPickedPoolSize] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [reason, setReason] = useState("");
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setSelectedCuisine(null); // reset so a stale cuisine from the previous city/occasion can't silently persist
    fetchVenues({
      lat: city.lat,
      lng: city.lng,
      radiusMeters: occasion.radiusMeters,
      categories: occasion.categories,
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
  }, [city.slug, occasion.slug, retryCount]);

  const cuisineOptions = useMemo(() => getTopCuisines(allVenues), [allVenues]);

  const eligible = useMemo(
    () =>
      filterVenues(allVenues, {
        maxDistanceKm,
        openNowOnly,
        lateNightOnly: occasion.extraFilter === "lateNight" ? lateNightOnly : false,
        outdoorOnly: occasion.extraFilter === "outdoorOnly" ? outdoorOnly : false,
        timezone: city.timezone,
        cuisine: selectedCuisine,
      }),
    [allVenues, maxDistanceKm, openNowOnly, lateNightOnly, outdoorOnly, occasion.extraFilter, city.timezone, selectedCuisine]
  );

  function handleSpin() {
    if (!eligible.length) return;
    setSpinning(true);
    setPicked(null);
    const poolSizeAtSpin = eligible.length;
    // brief delay purely for the spin animation to feel intentional,
    // not because anything is actually processing
    setTimeout(() => {
      const venue = pickRandom(eligible);
      const openStatus = isOpenNow(venue.openingHours, city.timezone);
      setReason(buildReason(venue, { openStatus }));
      setPicked(venue);
      setPickedPoolSize(poolSizeAtSpin);
      setSpinning(false);
    }, 650);
  }

  function handleRetry() {
    setRetryCount((n) => n + 1);
  }

  return (
    <div className="overflow-hidden rounded-card bg-wine2 p-6 sm:p-8">
      {status === "loading" ? (
        <PlateSpinner />
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
              {status === "error" && "Couldn't reach the map data"}
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
            {occasion.extraFilter === "lateNight" && (
              <button
                onClick={() => setLateNightOnly((v) => !v)}
                className="rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95"
                style={
                  lateNightOnly
                    ? { backgroundColor: accent, color: "#F7F0E4" }
                    : { backgroundColor: "rgba(247,240,228,0.1)", color: "#F7F0E4" }
                }
              >
                Stays open late
              </button>
            )}
            {occasion.extraFilter === "outdoorOnly" && (
              <button
                onClick={() => setOutdoorOnly((v) => !v)}
                className="rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95"
                style={
                  outdoorOnly
                    ? { backgroundColor: accent, color: "#F7F0E4" }
                    : { backgroundColor: "rgba(247,240,228,0.1)", color: "#F7F0E4" }
                }
              >
                Outdoor seating
              </button>
            )}
          </div>

          {cuisineOptions.length >= 2 && (
            <div className="mb-5 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCuisine(null)}
                className="rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95"
                style={
                  !selectedCuisine
                    ? { backgroundColor: accent, color: "#F7F0E4" }
                    : { backgroundColor: "rgba(247,240,228,0.1)", color: "#F7F0E4" }
                }
              >
                All cuisines
              </button>
              {cuisineOptions.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedCuisine(c.value)}
                  className="rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95"
                  style={
                    selectedCuisine === c.value
                      ? { backgroundColor: accent, color: "#F7F0E4" }
                      : { backgroundColor: "rgba(247,240,228,0.1)", color: "#F7F0E4" }
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          {status === "ready" && eligible.length === 0 && (
            <div className="mb-5 rounded-2xl bg-cream/10 px-4 py-3 text-sm text-cream/80">
              Nothing matches those filters yet — try widening the distance.
            </div>
          )}

          {status === "error" && (
            <div className="mb-5 flex flex-col gap-3 rounded-2xl bg-cream/10 px-4 py-3 text-sm text-cream/80">
              <span>The map service didn't respond in time. This can happen occasionally — try again.</span>
              <button
                onClick={handleRetry}
                className="self-start rounded-full px-4 py-2 text-xs font-semibold transition-transform active:scale-95"
                style={{ backgroundColor: accent, color: "#F7F0E4" }}
              >
                ↻ Try again
              </button>
            </div>
          )}

          {!picked && status !== "error" && (
            <button
              onClick={handleSpin}
              onPointerDown={() => setIsPressed(true)}
              onPointerUp={() => setIsPressed(false)}
              onPointerLeave={() => setIsPressed(false)}
              disabled={status !== "ready" || eligible.length === 0 || spinning}
              className={`w-full rounded-3xl py-6 text-xl font-black uppercase tracking-wide transition-transform duration-75 ${
                status === "ready" && eligible.length > 0 ? "cursor-pointer text-ink" : "cursor-not-allowed bg-cream/10 text-cream/40"
              } ${spinning ? "animate-spin-pulse" : ""} ${isPressed ? "translate-y-1.5" : ""}`}
              style={
                status === "ready" && eligible.length > 0
                  ? {
                      background: "linear-gradient(180deg, #FFD27A 0%, #E0B85C 40%, #C89B3C 100%)",
                      boxShadow: isPressed ? "0 2px 0 #8a6116" : "0 6px 0 #8a6116, 0 8px 16px rgba(200,155,60,0.35)",
                      animation: !isPressed && !spinning ? "button-glow 2.4s ease-in-out infinite" : undefined,
                    }
                  : { boxShadow: "0 6px 0 rgba(0,0,0,0.15)" }
              }
            >
              {spinning ? "Spinning…" : "🎯 SPIN"}
            </button>
          )}

          {picked && (
            <VenueCard
              venue={picked}
              reason={reason}
              city={city}
              occasion={occasion}
              poolSize={pickedPoolSize}
              onSpinAgain={handleSpin}
              accent={accent}
            />
          )}
        </>
      )}
    </div>
  );
}
