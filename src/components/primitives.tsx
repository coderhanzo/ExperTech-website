import type { ReactNode } from "react";

export function Logo() {
  return (
    <a href="#hero" className="flex items-center gap-2.5 no-underline">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-ink text-canvas text-[13px] font-medium">
        Ex
      </span>
      <span className="text-[15px] font-medium tracking-tight text-ink">
        Expertech
      </span>
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function AccentItalic({ children }: { children: ReactNode }) {
  return <em className="accent-italic">{children}</em>;
}

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-[640px] ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-h2 mt-4 text-ink">{title}</h2>
      {description && (
        <p className="mt-4 text-[15.5px] leading-[1.65] text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

type BadgeVariant = "default" | "muted" | "accent" | "outline" | "dark";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "border border-line-soft text-ink-soft bg-surface",
    muted: "bg-canvas-soft text-ink-soft",
    accent: "bg-accent/10 text-accent border border-accent/20",
    outline: "border border-ink/25 text-ink",
    dark: "bg-ink text-canvas",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.02em] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

interface ArrowUpRightProps {
  className?: string;
}

export function ArrowUpRight({ className = "h-4 w-4" }: ArrowUpRightProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export function ArrowRight({ className = "h-4 w-4" }: ArrowUpRightProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
