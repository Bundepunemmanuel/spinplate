import Head from "next/head";
import Link from "next/link";
import { OCCASIONS, getAllStateSlugs, getStateBySlug, withAlpha } from "../../../data";
import CategoryIcon from "../../../CategoryIcon";

export async function getStaticPaths() {
  return {
    paths: getAllStateSlugs().map((state) => ({ params: { state } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const state = getStateBySlug(params.state);
  if (!state) return { notFound: true };
  return { props: { state } };
}

export default function StateHubPage({ state }) {
  const { name, abbr, city } = state;
  const title = `Restaurants, Bars & More in ${name} — SpinPlate`;
  const description = `Every SpinPlate category for ${city.name}, ${abbr} — brunch, bars, coffee, late-night, and more, picked from real live map data.`;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} categories on SpinPlate`,
    itemListElement: OCCASIONS.map((o, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://spinplate.vercel.app/${city.slug}/${o.slug}`,
      name: `${o.name} in ${city.name}`,
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        />
      </Head>

      <Link href="/" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-cream/60 hover:text-gold">
        ← All states
      </Link>

      <div
        className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wide"
        style={{ backgroundColor: withAlpha(city.accent, 0.18), color: city.accentText }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: city.accent }} />
        {abbr}
      </div>
      <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
        {name}
      </h1>
      <p className="mt-4 max-w-md text-cream/70">
        SpinPlate's {name} coverage centers on {city.name}. {city.blurb}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {OCCASIONS.map((occasion) => (
          <Link
            key={occasion.slug}
            href={`/${city.slug}/${occasion.slug}`}
            className="rounded-2xl bg-wine2 p-4 transition-transform active:scale-95"
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
    </>
  );
}
