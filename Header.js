import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b border-gold/20 bg-wine">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-192.png" alt="" width={32} height={32} className="rounded-full" priority />
          <span className="font-display text-xl font-semibold text-cream">
            SpinPlate
          </span>
        </Link>
      </div>
    </header>
  );
}
