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
    default:
      return (
        <svg viewBox="0 0 32 32" className={className} {...common}>
          <circle cx="16" cy="16" r="10" />
        </svg>
      );
  }
}
