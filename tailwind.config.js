/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./*.js",
  ],
  theme: {
    extend: {
      colors: {
        wine: "#3D1220",
        wine2: "#4E1826",
        cream: "#F7F0E4",
        gold: "#C89B3C",
        gold2: "#E0B85C",
        ink: "#2A0E16",
        mute: "#8A7368",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};
