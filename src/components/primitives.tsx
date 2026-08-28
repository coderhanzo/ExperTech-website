import type { CSSProperties, ReactNode } from "react";

/* ──────────────────────────────────────────────────────
   Logo
   ────────────────────────────────────────────────────── */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`} aria-hidden>
      <img
        src="/favicon.svg"
        alt=""
        className="h-full w-full object-contain"
        draggable={false}
      />
    </span>
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const wordmark = tone === "light" ? "text-[#171918]" : "text-ink";
  const descriptor = tone === "light" ? "text-[#666b67]" : "text-muted";

  return (
    <a
      href="#hero"
      className="flex items-center gap-2.5 no-underline"
      aria-label="NeuraForge Systems — home"
    >
      <LogoMark className="h-10 w-10" />
      <span className={`flex flex-col leading-none transition-colors duration-300 ${wordmark}`}>
        <span className="font-serif text-[14px] font-semibold uppercase tracking-[0.16em]">
          Neura<span className="text-accent-soft">Forge</span>
        </span>
        <span className={`mt-1 text-[7px] font-semibold uppercase tracking-[0.48em] transition-colors duration-300 ${descriptor}`}>
          Systems
        </span>
      </span>
    </a>
  );
}

/* ──────────────────────────────────────────────────────
   Eyebrow + AccentItalic
   ────────────────────────────────────────────────────── */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

export function AccentItalic({ children }: { children: ReactNode }) {
  return <em className="accent-italic">{children}</em>;
}

/* ──────────────────────────────────────────────────────
   SectionHeading
   ────────────────────────────────────────────────────── */
interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-[680px] flex-col ${alignment} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-h2 mt-4 text-ink">{title}</h2>
      {description && (
        <p className="mt-5 text-[16px] leading-[1.7] text-muted">
          {description}
        </p>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────
   Badge
   ────────────────────────────────────────────────────── */
type BadgeVariant = "default" | "muted" | "accent" | "outline" | "dark" | "glass";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: "border border-line-soft text-ink-soft bg-white/10 backdrop-blur",
    muted: "bg-canvas-soft text-ink-soft",
    accent:
      "bg-accent/10 text-accent border border-accent/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
    outline: "border border-ink/20 text-ink",
    dark: "bg-ink text-canvas",
    glass:
      "border border-white/12 bg-white/10 text-ink-soft backdrop-blur shadow-[var(--shadow-glass-inner)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.02em] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

/* ──────────────────────────────────────────────────────
   Arrows
   ────────────────────────────────────────────────────── */
interface ArrowProps {
  className?: string;
}

export function ArrowUpRight({ className = "h-4 w-4" }: ArrowProps) {
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

export function ArrowRight({ className = "h-4 w-4" }: ArrowProps) {
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

/* ──────────────────────────────────────────────────────
   Button
   ────────────────────────────────────────────────────── */
type ButtonVariant = "primary" | "ghost" | "dark" | "glass" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  trailingArrow?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function Button({
  href,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  children,
  trailingArrow = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-[13px]",
    md: "h-12 px-7 text-[15px]",
    lg: "h-14 px-8 text-[16px]",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-accent text-canvas hover:bg-accent-hover shadow-[var(--shadow-pop)] active:scale-[0.98]",
    ghost:
      "border border-white/12 bg-white/10 text-ink backdrop-blur-md hover:bg-white/15 hover:border-white/18 shadow-[var(--shadow-glass-inner)] active:scale-[0.98]",
    dark:
      "bg-ink text-canvas hover:bg-ink-soft active:scale-[0.98]",
    glass:
      "border border-white/12 bg-white/8 text-ink backdrop-blur-xl hover:bg-white/12 active:scale-[0.98]",
    link:
      "h-auto !px-0 bg-transparent text-ink hover:text-accent underline-offset-4",
  };

  const base =
    "group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium tracking-tight no-underline transition-all duration-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100";

  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="inline-flex items-center gap-2">
        {children}
        {trailingArrow && (
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-disabled:transform-none" />
        )}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel} className={cls}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cls}
    >
      {inner}
    </button>
  );
}

/* ──────────────────────────────────────────────────────
   Section + Container
   ────────────────────────────────────────────────────── */
type SectionTone = "canvas" | "surface" | "ink" | "warm";
type SectionSize = "sm" | "md" | "lg";

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  size?: SectionSize;
  className?: string;
  children: ReactNode;
  withTopHairline?: boolean;
  withShapes?: boolean;
}

export function Section({
  id,
  tone = "canvas",
  size = "md",
  className = "",
  children,
  withTopHairline = false,
  withShapes = false,
}: SectionProps) {
  const tones: Record<SectionTone, string> = {
    canvas: "bg-transparent text-ink",
    surface: "bg-surface/70 backdrop-blur-sm text-ink",
    ink: "bg-ink text-canvas",
    warm: "bg-gradient-to-br from-canvas-soft via-canvas to-canvas-deep text-ink",
  };
  const padding =
    size === "sm" ? "section-pad-sm" : size === "lg" ? "section-pad-lg" : "section-pad-md";

  return (
    <section
      id={id}
      style={{ scrollMarginTop: 96 }}
      className={`relative isolate overflow-hidden ${padding} ${tones[tone]} ${className}`}
    >
      {withTopHairline && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-soft to-transparent"
        />
      )}
      {withShapes && <SectionShapes />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`container-page ${className}`}>{children}</div>;
}

/* ──────────────────────────────────────────────────────
   Decorative shape primitives
   ────────────────────────────────────────────────────── */
interface GlowOrbProps {
  size?: number;
  color?: string;
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}

export function GlowOrb({
  size = 520,
  color = "rgba(175, 92, 65, 0.14)",
  opacity = 1,
  className = "",
  style,
}: GlowOrbProps) {
  return (
    <span
      aria-hidden
      className={`shape-glow ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        opacity,
        ...style,
      }}
    />
  );
}

interface BlobProps {
  className?: string;
  color?: string;
  size?: number;
  rotate?: number;
  style?: CSSProperties;
}

export function Blob({
  className = "",
  color = "rgba(175, 92, 65, 0.10)",
  size = 380,
  rotate = 0,
  style,
}: BlobProps) {
  return (
    <span
      aria-hidden
      className={`shape-blob ${className}`}
      style={{
        width: size,
        height: size * 0.85,
        background: color,
        transform: `rotate(${rotate}deg)`,
        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
        ...style,
      }}
    />
  );
}

interface RingProps {
  className?: string;
  size?: number;
  style?: CSSProperties;
}

export function Ring({ className = "", size = 480, style }: RingProps) {
  return (
    <span
      aria-hidden
      className={`shape-ring ${className}`}
      style={{ width: size, height: size, ...style }}
    />
  );
}

export function NoiseLayer({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`noise-layer ${className}`} />;
}

/* Default decorative cluster used by Section withShapes */
function SectionShapes() {
  return (
    <>
      <GlowOrb
        size={420}
        color="rgba(175, 92, 65, 0.10)"
        className="-top-32 -right-20"
      />
      <GlowOrb
        size={360}
        color="rgba(120, 190, 195, 0.16)"
        className="-bottom-24 -left-24"
      />
      <NoiseLayer />
    </>
  );
}

/* ──────────────────────────────────────────────────────
   Glass Card primitive (semantic wrapper)
   ────────────────────────────────────────────────────── */
interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "figure" | "li";
  interactive?: boolean;
  tone?: "light" | "soft" | "dark";
}

export function GlassCard({
  children,
  className = "",
  as = "div",
  interactive = false,
  tone = "light",
}: GlassCardProps) {
  const toneClass =
    tone === "dark"
      ? "glass-dark text-ink"
      : tone === "soft"
        ? "glass-card-soft"
        : "glass-card";
  const cls = `relative rounded-[var(--radius-card)] ${toneClass} ${
    interactive ? "glass-hover" : ""
  } ${className}`;
  if (as === "article") return <article className={cls}>{children}</article>;
  if (as === "figure") return <figure className={cls}>{children}</figure>;
  if (as === "li") return <li className={cls}>{children}</li>;
  return <div className={cls}>{children}</div>;
}
