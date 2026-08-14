import { getAllCityOccasionPaths } from "../data";

const SITE_URL = "https://spinplate.vercel.app"; // update once deployed

function generateSitemap(paths) {
  const urls = ["", ...paths.map((p) => `${p.city}/${p.occasion}`)]
    .map((path) => {
      return `  <url>
    <loc>${SITE_URL}/${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap(getAllCityOccasionPaths());
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function Sitemap() {
  return null;
}
