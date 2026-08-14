import { Playfair_Display, Work_Sans, JetBrains_Mono } from "next/font/google";
import Header from "../Header";
import Footer from "../Footer";
import "../styles.css";

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
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
