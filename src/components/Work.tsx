import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  AccentItalic,
  Badge,
  GlassCard,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

interface Case {
  num: string;
  year: string;
  title: string;
  desc: string;
  category: string;
  status: string;
  outcome: string;
  upcoming?: boolean;
  liveUrl?: string;
  liveLabel?: string;
}

const CASES: Case[] = [
  {
    num: "01",
    year: "2025",
    title: "E-commerce & booking app for a salon",
    desc: "Appointment booking and an in-app store rolled into one custom-backend system. Clients book slots and shop the salon's product line; the team manages bookings, products, and orders from a single admin console.",
    category: "Beauty · Mobile + e-commerce + custom backend",
    status: "Building",
    outcome: "Going live ahead of peak season",
  },
  {
    num: "02",
    year: "2025",
    title: "Recipe portfolio site for a private chef",
    desc: "A web portfolio for the chef to publish and manage their recipe library — a clean, searchable showcase backed by a custom CMS, so new recipes go live without touching code.",
    category: "Lifestyle · Web portfolio + recipe CMS",
    status: "Shipped",
    outcome: "Live · curated recipe library in production",
    liveUrl: "https://www.telandeworld.com",
    liveLabel: "telandeworld.com",
  },
  {
    num: "03",
    year: "2024",
    title: "KwikMart — shop-from-home app & ops console",
    desc: "Customer mobile app that lets shoppers order from home, paired with a management console the mart uses to run inventory, orders, and day-to-day operations — all on one custom backend.",
    category: "Shopping · Mobile + admin console + custom backend",
    status: "Shipped",
    outcome: "Live on the App Store",
    liveUrl: "https://apps.apple.com/gb/app/kwirkmart/id6752880752",
    liveLabel: "App Store",
  },
  {
    num: "04",
    year: "2026",
    title: "AI operations layer for service businesses",
    desc: "Internal R&D — distilling the patterns from booking, kitchens, and retail into a configurable platform with AI woven through the operations layer.",
    category: "Studio R&D · In research",
    status: "Upcoming",
    outcome: "Targeting private beta · 2026",
    upcoming: true,
  },
];

function statusVariant(status: string): "accent" | "outline" {
  if (status === "Building" || status === "Upcoming" || status === "Ongoing") {
    return "accent";
  }
  return "outline";
}

export function Work() {
  return (
    <section
      id="work"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={460}
        color="rgba(120, 190, 195, 0.20)"
        className="top-1/3 -left-20"
      />
      <NoiseLayer />

      <div className="container-page relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Work we're <AccentItalic>proud to ship</AccentItalic>.
              </>
            }
          />
          <p className="max-w-[420px] text-[15px] leading-[1.7] text-muted">
            Recent engagements across beauty, lifestyle, and retail — every
            system shipped on a custom backend we own end-to-end. Details
            abbreviated under client agreements.
          </p>
        </div>

        <GlassCard className="mt-12 overflow-hidden p-2 md:p-3">
          <div>
            {CASES.map((c, i) => {
              const isLast = i === CASES.length - 1;
              const borderClass = !isLast ? "border-b border-white/12" : "";

              const rowBody: ReactNode = (
                <>
                  {/* Mobile: top meta row (number left, arrow right) */}
                  <div className="flex items-center justify-between md:hidden">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                      {c.num}
                      <span className="ml-3 text-muted-soft">{c.year}</span>
                    </span>
                    {!c.upcoming && (
                      <ArrowUpRight
                        className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden
                      />
                    )}
                  </div>

                  {/* Desktop: number column */}
                  <div className="hidden pt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted md:block">
                    {c.num}
                  </div>

                  {/* Main content */}
                  <div>
                    <h3 className="text-case-title font-normal tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-accent">
                      {c.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] leading-[1.7] text-muted">
                      {c.desc}
                    </p>

                    {/* Mobile-only Outcome */}
                    <div className="mt-4 md:hidden">
                      <div className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-muted-soft">
                        Outcome
                      </div>
                      <div className="mt-1 text-[14.5px] leading-[1.45] text-ink-soft">
                        {c.outcome}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-3.5">
                      <Badge variant="glass">{c.category}</Badge>
                      <Badge variant={statusVariant(c.status)}>
                        {c.status}
                      </Badge>
                      {c.liveUrl && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium tracking-tight text-accent">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {c.liveLabel ?? "View live"}
                          <ArrowUpRight className="h-3 w-3" aria-hidden />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desktop: Outcome column */}
                  <div className="hidden pt-1 md:block">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-muted">
                      Outcome
                    </div>
                    <div className="mt-2 text-[16.5px] leading-[1.4] text-ink-soft">
                      {c.outcome}
                    </div>
                  </div>

                  {/* Desktop: year + arrow */}
                  <div className="hidden items-start justify-end pt-1 text-xs text-muted md:flex">
                    <span className="ml-2">{c.year}</span>
                    {!c.upcoming && (
                      <ArrowUpRight
                        className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden
                      />
                    )}
                  </div>
                </>
              );

              const rowLayoutClass =
                "flex flex-col gap-3 rounded-2xl px-5 py-6 md:grid md:grid-cols-[60px_1fr_280px_40px] md:gap-6 md:px-7 md:py-8";

              if (c.upcoming) {
                return (
                  <div
                    key={c.num}
                    className={`relative ${borderClass}`}
                    aria-label={`${c.title} — in research, coming soon`}
                  >
                    <div
                      aria-hidden
                      className={`${rowLayoutClass} select-none opacity-70 blur-[2.5px]`}
                    >
                      {rowBody}
                    </div>

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-canvas-deep/85 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-accent shadow-[var(--shadow-pill)] backdrop-blur md:text-[11.5px]">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                        </span>
                        In research · Coming soon
                      </span>
                    </div>
                  </div>
                );
              }

              const href = c.liveUrl ?? "#contact";
              const externalProps = c.liveUrl
                ? { target: "_blank", rel: "noreferrer" as const }
                : {};

              return (
                <a
                  key={c.num}
                  href={href}
                  {...externalProps}
                  aria-label={
                    c.liveUrl
                      ? `${c.title} — open ${c.liveLabel ?? "live link"}`
                      : `${c.title} — start a similar project`
                  }
                  className={`group cursor-pointer no-underline transition-all duration-200 hover:bg-white/10 ${rowLayoutClass} ${borderClass}`}
                >
                  {rowBody}
                </a>
              );
            })}
          </div>
        </GlassCard>

        <p className="mt-5 text-xs text-muted">
          Project specifics abbreviated under client agreements; live references
          available on request.
        </p>
      </div>
    </section>
  );
}
