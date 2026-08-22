export default function CategoryIcon({ occasion, className = "h-8 w-8" }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

  switch (occasion) {
    case "brunch":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <ellipse cx="16" cy="22" rx="11" ry="3" />
          <path d="M6 22c0-6 4-11 10-11s10 5 10 11" />
          <path d="M12 11V6M16 11V5M20 11V6" />
        </svg>
      );
    case "date-night":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M9 4c-3 0-5 2.5-5 5.5 0 4 5 8 5 8s5-4 5-8C14 6.5 12 4 9 4z" />
          <path d="M9 17.5V28M5 28h8" />
          <circle cx="23" cy="9" r="5" />
          <path d="M23 14v14M19 28h8" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M7 13h16v7a6 6 0 01-6 6h-4a6 6 0 01-6-6v-7z" />
          <path d="M23 15h2a3 3 0 010 6h-2" />
          <path d="M11 5c0 1.5 2 1.5 2 3M16 5c0 1.5 2 1.5 2 3" />
        </svg>
      );
    case "food-trucks":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M3 20V11a1 1 0 011-1h13v10" />
          <path d="M17 15h7l4 4v1h-2" />
          <circle cx="9" cy="23" r="2.5" />
          <circle cx="23" cy="23" r="2.5" />
          <path d="M11.5 23h9" />
        </svg>
      );
    case "happy-hour":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M8 6h16l-7 11v9M16 26h-5M16 26h5" />
          <path d="M11 10h10" />
        </svg>
      );
    case "lunch":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M5 14L16 6l11 8" />
          <path d="M5 14v11a1 1 0 001 1h20a1 1 0 001-1V14" />
          <path d="M5 14h22" />
        </svg>
      );
    case "late-night":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M20 5a11 11 0 100 22 9 9 0 01-9-9c0-4.5 3.2-8.2 7.4-8.9A9 9 0 0120 5z" />
          <path d="M7 24l1.5-1.5M6 20h2" />
        </svg>
      );
    case "family-dinner":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <ellipse cx="16" cy="20" rx="13" ry="4" />
          <circle cx="11" cy="18" r="2.6" />
          <circle cx="21" cy="18" r="2.6" />
          <path d="M11 12v3M21 12v3" />
        </svg>
      );
    case "patio-outdoor":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M16 4v3" />
          <path d="M6 16a10 10 0 0120 0z" />
          <path d="M16 16v13M8 26h16" />
        </svg>
      );
    case "bars":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M9 9h13l-1.5 15a2 2 0 01-2 1.8h-6a2 2 0 01-2-1.8L9 9z" />
          <path d="M9 9a2 2 0 012-2h9a2 2 0 012 2" />
          <path d="M20 12h4a2 2 0 012 2v3a2 2 0 01-2 2h-4.3" />
        </svg>
      );
    case "dessert-ice-cream":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M11 14a5 5 0 0110 0z" />
          <path d="M11.5 15L16 27l4.5-12" />
          <path d="M9 14h14" />
        </svg>
      );
    case "bakeries":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M6 18c0-6 4.5-11 10-11s10 5 10 11-4.5 8-10 8-10-2-10-8z" />
          <path d="M11 13c.5 1.5 2 1.5 2.5 0M18 13c.5 1.5 2 1.5 2.5 0" />
        </svg>
      );
    case "breweries":
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <path d="M9 11h10v14a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 019 25V11z" />
          <path d="M19 14h2.5a2 2 0 012 2v3a2 2 0 01-2 2H19" />
          <path d="M9 11c0-2.5 1-4.5 2-5.5M15 11c0-2-1-3-.5-5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <circle cx="16" cy="16" r="10" />
        </svg>
      );
  }
}
