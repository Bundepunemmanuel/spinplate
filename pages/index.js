import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";
import { CITIES, withAlpha } from "../data";

export default function Home() {
  const [query, setQuery] = useState("");

  const flagship = CITIES.filter((c) => c.flagship);
  const rest = CITIES.filter((c) => !c.flagship);

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  // While searching, ignore the featured/rest split and search everyone —
  // a search for "Austin" should still find it even though it normally
  // lives in the featured row, not the grid.
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [q, isSearching]);

  const sortedRest = [...rest].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Head>
        <title>SpinPlate — Stop Scrolling, Just Spin</title>
        <meta
          name="description"
          content="Can't decide where to eat? Pick a state, pick an occasion, hit spin, and get one real nearby spot picked for you — covering all 50 states."
        />
      </Head>

      <section className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 font-mono text-xs uppercase tracking-wide text-gold">
          <span className="inline-block animate-[plate-spin_2.2s_linear_infinite]">🍴</span>
          All 50 states
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          Just spin.
        </h1>
        <p className="mt-4 max-w-md text-cream/70">
          You don't need another list of 47 restaurants. Pick a state below,
          pick an occasion, set your filters, and let it choose for you.
        </p>
      </section>

      <section className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { n: "01", t: "Pick a state + occasion" },
          { n: "02", t: "Set distance & open-now filters" },
          { n: "03", t: "Spin — get one real spot" },
        ].map((step) => (
          <div key={step.n} className="rounded-2xl bg-wine2 p-4">
            <div className="font-mono text-xs text-gold">{step.n}</div>
            <div className="mt-1.5 text-xs font-medium leading-snug text-cream/80 sm:text-sm">
              {step.t}
            </div>
          </div>
        ))}
      </section>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by city or state…"
        className="mb-8 w-full rounded-2xl bg-wine2 px-4 py-3 text-sm text-cream placeholder-cream/40 outline-none ring-1 ring-transparent focus:ring-gold/50"
      />

      {isSearching ? (
        <>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
            {searchResults.length} match{searchResults.length === 1 ? "" : "es"}
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {searchResults.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
          {searchResults.length === 0 && (
            <div className="rounded-2xl bg-wine2 px-4 py-6 text-center text-sm text-cream/60">
              No states match "{query}" — try a different city or state name.
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
            Featured cities
          </div>
          <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {flagship.map((city) => (
              <Link
                key={city.slug}
                href={`/state/${city.state.toLowerCase()}`}
                className="group relative overflow-hidden rounded-card p-5 transition-transform active:scale-[0.98]"
                style={{ backgroundColor: city.accent }}
              >
                <div className="font-mono text-[10px] uppercase tracking-wide text-cream/80">
                  {city.state} · Full local guide
                </div>
                <div className="mt-1 font-display text-2xl font-semibold text-cream">
                  {city.name}
                </div>
                <div className="mt-2 text-sm text-cream/85">{city.blurb}</div>
              </Link>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-cream/50">
              Every other state
            </div>
            <div className="text-xs text-cream/40">{rest.length} more</div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {sortedRest.map((city) => (
              <CityCard key={city.slug} city={city} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function CityCard({ city }) {
  return (
    <Link
      href={`/state/${city.state.toLowerCase()}`}
      className="rounded-2xl p-3.5 transition-transform active:scale-95"
      style={{
        backgroundColor: withAlpha(city.accent, 0.24),
        borderLeft: `3px solid ${city.accent}`,
      }}
    >
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-cream">{city.name}</div>
        <div className="font-mono text-[10px] text-cream/50">{city.state}</div>
      </div>
    </Link>
  );
}
