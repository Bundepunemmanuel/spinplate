import Head from "next/head";
import { Playfair_Display, Work_Sans, JetBrains_Mono } from "next/font/google";
import Header from "../Header";
import Footer from "../Footer";
import "../styles.css";

const SITE_URL = "https://spinplate-com.vercel.app";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
});

const body = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} min-h-screen bg-wine`}>
      <Head>
        {/* Site-wide OG/Twitter defaults — individual pages can override
            title/description via their own <Head>, but every page gets a
            real og:image without needing to set one itself. */}
        <meta property="og:site_name" content="SpinPlate" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
      </Head>
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
