import { getAllCityOccasionPaths, getAllStateSlugs } from "../data";

const SITE_URL = "https://spinplate.vercel.app"; // update once deployed on a real domain

function generateSitemap(cityOccasionPaths, stateSlugs) {
  const urls = [
    { path: "", priority: "1.0" },
    ...stateSlugs.map((s) => ({ path: s, priority: "0.7" })),
    ...cityOccasionPaths.map((p) => ({ path: `${p.city}/${p.occasion}`, priority: "0.8" })),
  ]
    .map(
      ({ path, priority }) => `  <url>
    <loc>${SITE_URL}/${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap(getAllCityOccasionPaths(), getAllStateSlugs());
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
