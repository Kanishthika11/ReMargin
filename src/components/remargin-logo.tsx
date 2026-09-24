import { Link } from "@tanstack/react-router";

export function ReMarginLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="ReMargin home">
      <span className="relative grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground shadow-brand">
        <span className="absolute h-4 w-1.5 -translate-x-1 rotate-12 rounded-full bg-accent" />
        <span className="absolute h-4 w-1.5 translate-x-1 -rotate-12 rounded-full bg-primary-foreground" />
      </span>
      {!compact && <span className="font-display text-xl font-bold text-current">ReMargin</span>}
    </Link>
  );
}