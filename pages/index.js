import Head from "next/head";
import Link from "next/link";
import { CITIES, OCCASIONS } from "../data";
import CategoryIcon from "../CategoryIcon";

export default function Home() {
  return (
    <>
      <Head>
        <title>SpinPlate — Stop Scrolling, Just Spin</title>
        <meta
          name="description"
          content="Can't decide where to eat? Set your filters, hit spin, and get one real nearby spot picked for you."
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
          You don't need another list of 47 restaurants. Pick a city and an
          occasion, set your filters, and let it choose for you.
        </p>
      </section>

      {CITIES.map((city) => (
        <section key={city.slug} className="mb-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
            {city.name}, {city.state}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {OCCASIONS.map((occasion) => (
              <Link
                key={occasion.slug}
                href={`/${city.slug}/${occasion.slug}`}
                className="group rounded-card bg-wine2 p-5 transition-transform active:scale-95"
              >
                <div className="text-gold">
                  <CategoryIcon occasion={occasion.slug} className="h-7 w-7" />
                </div>
                <div className="mt-3 font-display text-lg font-semibold text-cream">
                  {occasion.name}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
