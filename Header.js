import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gold/20 bg-wine">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
            ↻
          </span>
          <span className="font-display text-xl font-semibold text-cream">
            SpinPlate
          </span>
        </Link>
      </div>
    </header>
  );
}
