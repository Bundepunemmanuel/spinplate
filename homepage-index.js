import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";
import { CITIES } from "../data";

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CITIES;
    return CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
    );
  }, [query]);

  const sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

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
        <div className="mb-3 inline-block rounded-full bg-gold/15 px-3 py-1 font-mono text-xs uppercase tracking-wide text-gold">
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

      <div className="mb-3 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-cream/50">
          Choose a state
        </div>
        <div className="text-xs text-cream/40">{CITIES.length} states covered</div>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by city or state…"
        className="mb-4 w-full rounded-2xl bg-wine2 px-4 py-3 text-sm text-cream placeholder-cream/40 outline-none ring-1 ring-transparent focus:ring-gold/50"
      />

      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {sorted.map((city) => (
          <Link
            key={city.slug}
            href={`/state/${city.state.toLowerCase()}`}
            className="rounded-2xl bg-wine2 p-3.5 transition-transform active:scale-95"
            style={{ border: `1px solid ${city.accent}40` }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: city.accent }}
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-cream">{city.name}</div>
                <div className="font-mono text-[10px] text-cream/40">{city.state}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="rounded-2xl bg-wine2 px-4 py-6 text-center text-sm text-cream/60">
          No states match "{query}" — try a different city or state name.
        </div>
      )}
    </>
  );
}
