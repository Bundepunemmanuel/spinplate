import Head from "next/head";
import Link from "next/link";
import { CITIES, OCCASIONS, withAlpha } from "../data";
import CategoryIcon from "../CategoryIcon";

export default function Home() {
  return (
    <>
      <Head>
        <title>SpinPlate — Stop Scrolling, Just Spin</title>
        <meta
          name="description"
          content="Can't decide where to eat? Pick a city, pick an occasion, hit spin, and get one real nearby spot picked for you."
        />
      </Head>

      <section className="mb-10">
        <div className="mb-3 inline-block rounded-full bg-gold/15 px-3 py-1 font-mono text-xs uppercase tracking-wide text-gold">
          Stop scrolling
        </div>
        <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
          Just spin.
        </h1>
        <p className="mt-4 max-w-md text-cream/70">
          You don't need another list of 47 restaurants. Pick a city below,
          pick an occasion, set your filters, and let it choose for you.
        </p>
      </section>

      <section className="mb-10 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { n: "01", t: "Pick a city + occasion" },
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

      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
        Choose a city
      </div>

      <div className="space-y-3">
        {CITIES.map((city, i) => (
          <details
            key={city.slug}
            name="city-accordion"
            open={i === 0}
            className="group overflow-hidden rounded-card"
            style={{
              backgroundColor: withAlpha(city.accent, 0.16),
              border: `1px solid ${withAlpha(city.accent, 0.35)}`,
            }}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: city.accent }}
                />
                <div>
                  <div className="font-display text-xl font-semibold text-cream sm:text-2xl">
                    {city.name}
                    <span className="ml-1.5 font-mono text-xs font-normal text-cream/40">
                      {city.state}
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs text-cream/60 sm:text-sm">
                    {city.blurb}
                  </div>
                </div>
              </div>
              <span
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-transform group-open:rotate-45"
                style={{ backgroundColor: city.accent, color: "#F7F0E4" }}
              >
                +
              </span>
            </summary>

            <div className="grid grid-cols-2 gap-3 px-5 pb-5 sm:px-6 sm:pb-6">
              {OCCASIONS.map((occasion) => (
                <Link
                  key={occasion.slug}
                  href={`/${city.slug}/${occasion.slug}`}
                  className="group/card rounded-2xl bg-wine p-4 transition-transform active:scale-95"
                  style={{ border: `1px solid ${withAlpha(city.accent, 0.3)}` }}
                >
                  <div style={{ color: city.accentText }}>
                    <CategoryIcon occasion={occasion.slug} className="h-6 w-6" />
                  </div>
                  <div className="mt-2.5 font-display text-base font-semibold text-cream">
                    {occasion.name}
                  </div>
                </Link>
              ))}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
