export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gold/20 bg-wine">
      <div className="mx-auto max-w-3xl px-4 py-8 text-sm text-cream/60 sm:px-6">
        <p className="max-w-md">
          Venue data comes from OpenStreetMap contributors. Hours, ratings,
          and availability may vary — always worth a quick call ahead.
        </p>
        <p className="mt-4 font-mono text-xs">© {new Date().getFullYear()} SpinPlate</p>
      </div>
    </footer>
  );
}
