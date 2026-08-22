import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  CITIES,
  OCCASIONS,
  getCityBySlug,
  getOccasionBySlug,
  getAllCityOccasionPaths,
  getFaqs,
  getCityNote,
  withAlpha,
} from "../../data";
import { fetchAreaStats, buildStatSentence } from "../../geoapify";
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

  // Flagship cities (Austin/Denver/Nashville) use hand-written local color.
  // Everyone else gets an honest sentence built from real Geoapify numbers
  // fetched at build time — never invented "local color" for a city we
  // don't actually know well. fetchAreaStats fails soft (returns null),
  // so a flaky API call never breaks the build.
  let areaNote = getCityNote(city, occasion);
  if (!areaNote) {
    const stats = await fetchAreaStats({
      lat: city.lat,
      lng: city.lng,
      radiusMeters: occasion.radiusMeters,
      categories: occasion.categories,
    });
    areaNote = buildStatSentence(city, occasion, stats);
  }

  return {
    props: { city, occasion, areaNote },
  };
}

export default function CityOccasionPage({ city, occasion, areaNote }) {
  const router = useRouter();
  const isChallenge = router.query.challenge === "1";
  const title = `${occasion.name} in ${city.name}, ${city.state} — SpinPlate`;
  const description = `${occasion.name} spots in ${city.name} — pulled from real, open map data, not a stale 'best of' list from three years ago.`;
  const faqs = getFaqs(city, occasion);
  const radiusKm = occasion.radiusMeters / 1000;

  const otherOccasions = OCCASIONS.filter((o) => o.slug !== occasion.slug);
  const otherCities = CITIES.filter((c) => c.slug !== city.slug && c.flagship);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <div className="mb-5 flex items-center gap-3 text-sm font-medium text-cream/60">
        <Link href="/" className="hover:text-gold">
          All cities
        </Link>
        <span className="text-cream/30">/</span>
        <Link href={`/state/${city.state.toLowerCase()}`} className="hover:text-gold">
          {city.state}
        </Link>
      </div>

      <div
        className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wide"
        style={{ backgroundColor: withAlpha(city.accent, 0.18), color: city.accentText }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: city.accent }} />
        {city.name}, {city.state}
      </div>
      <h1 className="font-display text-4xl font-semibold leading-tight text-cream sm:text-5xl">
        {occasion.name} in {city.name}
      </h1>
      <p className="mt-4 max-w-md text-cream/70">{description}</p>
      <p className="mt-2 text-sm" style={{ color: city.accentText }}>
        {occasion.tagline}
      </p>

      {isChallenge && (
        <div
          className="mt-6 rounded-2xl px-4 py-3 text-sm font-medium"
          style={{ backgroundColor: `${city.accent}2A`, color: city.accentText }}
        >
          🎯 A friend sent you here to spin — no promises you'll land on the
          same place, that's the fun part.
        </div>
      )}

      <div className="mt-8">
        <SpinWidget city={city} occasion={occasion} accent={city.accent} accentText={city.accentText} />
      </div>

      <section className="mt-8 rounded-2xl bg-wine2 p-5">
        <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-cream/50">
          About {occasion.name.toLowerCase()} in {city.name}
        </h2>
        <p className="text-sm leading-relaxed text-cream/75">{areaNote}</p>
        <p className="mt-2 text-xs text-cream/40">
          Results are pulled from within {radiusKm}km of downtown {city.name}.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
          Common questions
        </h2>
        <div className="space-y-2.5">
          {faqs.map((faq, i) => (
            <details key={i} className="group rounded-2xl bg-wine2 px-4 py-3.5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-cream">
                {faq.q}
                <span className="flex-shrink-0 text-cream/40 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/65">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
          Other categories in {city.name}
        </h2>
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
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-cream/50">
          {occasion.name} in other flagship cities
        </h2>
        <div className="flex flex-wrap gap-2.5">
          {otherCities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}/${occasion.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-wine2 px-4 py-2.5 text-sm font-medium text-cream hover:text-gold"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.accent }} />
              {c.name}
            </Link>
          ))}
        </div>
        <Link
          href={`/state/${city.state.toLowerCase()}`}
          className="mt-4 inline-block text-sm font-medium underline"
          style={{ color: city.accentText }}
        >
          See every category in {city.state} →
        </Link>
      </section>
    </>
  );
}
