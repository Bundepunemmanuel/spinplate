import Head from "next/head";
import Link from "next/link";
import { CITIES, OCCASIONS, getCityBySlug, getOccasionBySlug, getAllCityOccasionPaths } from "../../data";
import SpinWidget from "../../SpinWidget";

export async function getStaticPaths() {
  return {
    paths: getAllCityOccasionPaths().map((p) => ({
      params: { city: p.city, occasion: p.occasion },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const city = getCityBySlug(params.city);
  const occasion = getOccasionBySlug(params.occasion);
  if (!city || !occasion) return { notFound: true };
  return { props: { city, occasion } };
}

export default function CityOccasionPage({ city, occasion }) {
  const title = `${occasion.name} in ${city.name} — SpinPlate`;
  const description = occasion.intro.replace("{city}", city.name);

  const otherOccasions = OCCASIONS.filter((o) => o.slug !== occasion.slug);
  const otherCities = CITIES.filter((c) => c.slug !== city.slug);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Link
        href="/"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-cream/60 hover:text-gold"
      >
        ← All cities
      </Link>

      <div className="mb-3 inline-block rounded-full bg-gold/15 px-3 py-1 font-mono text-xs uppercase tracking-wide text-gold">
        {city.name}, {city.state}
      </div>
      <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
        {occasion.name} in {city.name}
      </h1>
      <p className="mt-4 max-w-md text-cream/70">{description}</p>
      <p className="mt-2 text-sm text-gold/80">{occasion.tagline}</p>

      <div className="mt-8">
        <SpinWidget city={city} occasion={occasion} />
      </div>

      <section className="mt-12">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
          Other occasions in {city.name}
        </div>
        <div className="flex flex-wrap gap-2.5">
          {otherOccasions.map((o) => (
            <Link
              key={o.slug}
              href={`/${city.slug}/${o.slug}`}
              className="rounded-full bg-wine2 px-4 py-2.5 text-sm font-medium text-cream hover:text-gold"
            >
              {o.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
          {occasion.name} in other cities
        </div>
        <div className="flex flex-wrap gap-2.5">
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}/${occasion.slug}`}
              className="rounded-full bg-wine2 px-4 py-2.5 text-sm font-medium text-cream hover:text-gold"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
