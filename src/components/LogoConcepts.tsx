import type { ReactNode } from "react";
import { Download } from "lucide-react";
import { AccentItalic, NoiseLayer, SectionHeading } from "./primitives";

/* ──────────────────────────────────────────────────────────────────
   Inline SVG renderers — match the standalone files in /public/brand
   Each uses `currentColor` for the main glyph and #E0FF4F for accent.
   ────────────────────────────────────────────────────────────────── */

function StrataLockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      className={className}
      role="img"
      aria-label="ExperTech — Strata"
    >
      <g transform="translate(0,8)">
        <rect x="12" y="14" width="24" height="4" rx="2" fill="currentColor" />
        <rect x="12" y="26" width="30" height="4" rx="2" fill="currentColor" />
        <rect x="12" y="38" width="36" height="4" rx="2" fill="currentColor" />
        <rect x="12" y="50" width="40" height="4" rx="2" fill="#E0FF4F" />
      </g>
      <text
        x="80"
        y="51"
        fontFamily="'Fraunces','Georgia',serif"
        fontSize="36"
        fontWeight="400"
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        ExperTech
      </text>
    </svg>
  );
}

function StrataMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Strata mark"
    >
      <rect x="12" y="14" width="24" height="4" rx="2" fill="currentColor" />
      <rect x="12" y="26" width="30" height="4" rx="2" fill="currentColor" />
      <rect x="12" y="38" width="36" height="4" rx="2" fill="currentColor" />
      <rect x="12" y="50" width="40" height="4" rx="2" fill="#E0FF4F" />
    </svg>
  );
}

function SculptedELockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      className={className}
      role="img"
      aria-label="ExperTech — Sculpted E"
    >
      <g transform="translate(0,8)">
        <rect x="14" y="10" width="8" height="44" rx="1" fill="currentColor" />
        <rect x="14" y="10" width="34" height="8" rx="1" fill="currentColor" />
        <rect x="14" y="29" width="20" height="6" rx="1" fill="#E0FF4F" />
        <rect x="14" y="46" width="34" height="8" rx="1" fill="currentColor" />
      </g>
      <text
        x="80"
        y="51"
        fontFamily="'Fraunces','Georgia',serif"
        fontSize="36"
        fontWeight="400"
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        ExperTech
      </text>
    </svg>
  );
}

function SculptedEMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Sculpted E mark"
    >
      <rect x="14" y="10" width="8" height="44" rx="1" fill="currentColor" />
      <rect x="14" y="10" width="34" height="8" rx="1" fill="currentColor" />
      <rect x="14" y="29" width="20" height="6" rx="1" fill="#E0FF4F" />
      <rect x="14" y="46" width="34" height="8" rx="1" fill="currentColor" />
    </svg>
  );
}

function RailWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      className={className}
      role="img"
      aria-label="ExperTech — Editorial rail"
    >
      <rect x="14" y="22" width="3" height="36" rx="1.5" fill="#E0FF4F" />
      <text
        x="28"
        y="52"
        fontFamily="'Fraunces','Georgia',serif"
        fontSize="42"
        fontWeight="400"
        letterSpacing="-0.025em"
        fill="currentColor"
      >
        ExperTech
      </text>
    </svg>
  );
}

function ArcsLockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 80"
      className={className}
      role="img"
      aria-label="ExperTech — Endurance arcs"
    >
      <g
        transform="translate(0,8)"
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
      >
        <path d="M 52 40 A 28 28 0 0 0 24 12" stroke="#E0FF4F" />
        <path d="M 52 30 A 18 18 0 0 0 34 12" stroke="currentColor" />
        <path d="M 52 20 A 8 8 0 0 0 44 12" stroke="currentColor" />
      </g>
      <text
        x="80"
        y="51"
        fontFamily="'Fraunces','Georgia',serif"
        fontSize="36"
        fontWeight="400"
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        ExperTech
      </text>
    </svg>
  );
}

function ArcsMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Endurance arcs mark"
    >
      <g fill="none" strokeWidth="3.5" strokeLinecap="round">
        <path d="M 52 40 A 28 28 0 0 0 24 12" stroke="#E0FF4F" />
        <path d="M 52 30 A 18 18 0 0 0 34 12" stroke="currentColor" />
        <path d="M 52 20 A 8 8 0 0 0 44 12" stroke="currentColor" />
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Concept data
   ────────────────────────────────────────────────────────────────── */

interface Concept {
  id: "A" | "B" | "C" | "D";
  name: string;
  tagline: string;
  description: string;
  file: string;
  Lockup: (p: { className?: string }) => ReactNode;
  Mark?: (p: { className?: string }) => ReactNode;
}

const CONCEPTS: Concept[] = [
  {
    id: "A",
    name: "Strata",
    tagline: "Layered foundations.",
    description:
      "Four stacked bars at stepped widths read as architectural strata — durable, built up layer by layer. The chartreuse bottom bar acts as the foundation line, anchoring the mark. Works as a tiny favicon and as a hero mark on letterhead.",
    file: "concept-a-strata.svg",
    Lockup: StrataLockup,
    Mark: StrataMark,
  },
  {
    id: "B",
    name: "Sculpted E",
    tagline: "A wordmark's confident initial.",
    description:
      "A modernist serif-flavoured capital E rendered in geometric blocks. The shorter middle arm is the only chartreuse element — a precise editorial accent rather than a decorative flourish. Reads as monogram, premium, restrained.",
    file: "concept-b-sculpted-e.svg",
    Lockup: SculptedELockup,
    Mark: SculptedEMark,
  },
  {
    id: "C",
    name: "Editorial Rail",
    tagline: "Wordmark-first, no separate symbol.",
    description:
      "A pure serif wordmark anchored by a thin chartreuse vertical rail — the kind of detail you see in magazine mastheads. No standalone symbol; the wordmark IS the mark. Strongest for documents, slightly harder to scale to a 16px favicon.",
    file: "concept-c-rail.svg",
    Lockup: RailWordmark,
  },
  {
    id: "D",
    name: "Endurance Arcs",
    tagline: "Three rings · built to last.",
    description:
      "Three concentric quarter-arcs nest like tree rings or ripples expanding outward — a subtle reference to growth and longevity (\"software built to outlast the quarter it shipped in\"). The outermost arc carries the chartreuse accent.",
    file: "concept-d-arcs.svg",
    Lockup: ArcsLockup,
    Mark: ArcsMark,
  },
];

/* ──────────────────────────────────────────────────────────────────
   Component
   ────────────────────────────────────────────────────────────────── */

export function LogoConcepts() {
  return (
    <section
      id="logo-concepts"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <NoiseLayer />
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="Logo concepts · review"
          title={
            <>
              Four concepts to <AccentItalic>pick from</AccentItalic>.
            </>
          }
          description="Each lockup uses the brand palette only — Gun Metal, Chartreuse, off-white — and works at favicon size up to letterhead scale. Download the SVG you like and tell me to wire it in everywhere."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {CONCEPTS.map((c) => (
            <ConceptCard key={c.id} concept={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ConceptCard({ concept }: { concept: Concept }) {
  const { id, name, tagline, description, file, Lockup, Mark } = concept;
  return (
    <article className="glass-card flex flex-col overflow-hidden rounded-[var(--radius-card-lg)] p-6 md:p-7">
      {/* Header */}
      <header className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
            Concept {id}
          </div>
          <h3 className="mt-1 font-serif text-[26px] font-normal tracking-[-0.02em] text-ink">
            {name}
          </h3>
          <p className="mt-1 text-[13.5px] italic text-accent">{tagline}</p>
        </div>
        <a
          href={`/brand/${file}`}
          download
          aria-label={`Download ${name} SVG`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[11.5px] font-medium tracking-tight text-accent no-underline transition-colors duration-200 hover:bg-accent/20"
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          SVG
        </a>
      </header>

      {/* Light-background preview (Gun Metal lockup on cream) */}
      <div
        className="mt-6 flex items-center justify-center rounded-2xl px-4 py-7 md:py-9"
        style={{ backgroundColor: "#F5F1EA", color: "#00272B" }}
      >
        <Lockup className="h-12 w-auto md:h-14" />
      </div>

      {/* Dark-background preview (off-white lockup on Gun Metal) */}
      <div
        className="mt-3 flex items-center justify-center rounded-2xl px-4 py-7 md:py-9"
        style={{ backgroundColor: "#00272B", color: "#F5F1EA" }}
      >
        <Lockup className="h-12 w-auto md:h-14" />
      </div>

      {/* Mark-only preview at multiple sizes (only for concepts that have a separate mark) */}
      {Mark && (
        <div className="mt-4 flex items-end justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
          <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-muted-soft">
            Mark only
          </div>
          <div className="flex items-end gap-4 text-ink-soft">
            <Mark className="h-4 w-4" />
            <Mark className="h-6 w-6" />
            <Mark className="h-8 w-8" />
            <Mark className="h-12 w-12" />
          </div>
        </div>
      )}

      {!Mark && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12px] leading-[1.55] text-muted">
          <span className="font-medium text-ink-soft">Wordmark-only · </span>
          no separate symbol. Favicon would need a custom mini-mark or just
          the chartreuse rail on Gun Metal at 16px.
        </div>
      )}

      <p className="mt-5 text-[14.5px] leading-[1.65] text-ink-soft">
        {description}
      </p>
    </article>
  );
}
