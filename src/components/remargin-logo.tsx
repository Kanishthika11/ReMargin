import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/logo_transparent.png";

export function ReMarginLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-1.5" aria-label="ReMargin home">
      <img 
        src={logoImage} 
        alt="ReMargin logo" 
        className="h-11 sm:h-13 w-auto object-contain transition-transform hover:scale-105 drop-shadow-md" 
      />
      {!compact && (
        <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          <span className="bg-gradient-to-r from-[#285e35] via-[#48a65e] to-[#80e594] bg-clip-text text-transparent">Re</span>Margin
        </span>
      )}
    </Link>
  );
}