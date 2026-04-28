import { AccentItalic, ArrowUpRight, Badge } from "./primitives";

const TECH_TAGS = [
  "TypeScript",
  "Rust core",
  "OpenTelemetry",
  "Postgres",
  "ClickHouse",
  "LLM evals",
  "Self-hostable",
];

const OUTCOMES = [
  { value: "6×", label: "Faster triage on incidents" },
  { value: "–42%", label: "Mean time to resolution" },
  { value: "1-day", label: "Avg install to first insight" },
];

const TRACE_ROWS: { label: string; dur: string; tone: "ink" | "muted" | "accent" }[] = [
  { label: "checkout.submit", dur: "142ms", tone: "ink" },
  { label: "└ payments.charge", dur: "89ms", tone: "muted" },
  { label: "  └ stripe.api.v2", dur: "71ms", tone: "muted" },
  { label: "└ inventory.reserve", dur: "18ms", tone: "muted" },
  { label: "└ email.queue", dur: "3ms", tone: "muted" },
  { label: "└ llm.eval:cart-summary", dur: "221ms", tone: "accent" },
];

const toneClass: Record<"ink" | "muted" | "accent", string> = {
  ink: "text-ink",
  muted: "text-muted",
  accent: "text-accent",
};

export function FeaturedOffering() {
  return (
    <section
      id="featured-offering"
      className="bg-canvas pt-4 pb-20 md:pt-8 md:pb-28 xl:pb-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] border border-ink/10 bg-canvas-soft px-8 py-12 md:px-16 md:py-16 xl:py-15">
          <div className="relative z-[1] grid items-start gap-12 lg:grid-cols-[7fr_5fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="accent">Flagship platform</Badge>
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  Studio release · 2026
                </span>
              </div>

              <h2 className="text-feature mt-7 font-normal tracking-[-0.02em] text-ink">
                Stacktrace —{" "}
                <AccentItalic>
                  the engineering observability layer
                </AccentItalic>{" "}
                your product team actually uses.
              </h2>

              <p className="mt-6 text-[17px] leading-[1.65] text-ink-soft">
                Stacktrace stitches together traces, logs, customer sessions,
                and LLM evals into one searchable timeline. Built for teams
                that ship daily and still want to understand what's actually
                running in production — without stitching six dashboards
                together at 2 a.m.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {TECH_TAGS.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group inline-flex h-12 cursor-pointer items-center gap-1.5 rounded-full bg-ink px-7 text-[15px] font-medium tracking-tight text-canvas no-underline transition-colors duration-200 hover:bg-ink-soft active:scale-[0.98]"
                >
                  Request early access
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#work"
                  className="inline-flex h-12 cursor-pointer items-center rounded-full border border-ink/15 bg-transparent px-6 text-[15px] font-medium text-ink no-underline transition-colors duration-200 hover:border-ink/40 hover:text-accent"
                >
                  See it in production
                </a>
              </div>
            </div>

            <div>
              <div className="rounded-2xl border border-ink/10 bg-surface p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05),0_24px_48px_-32px_rgba(20,19,15,0.18)]">
                <div className="flex items-center justify-between border-b border-line-soft pb-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    Live trace
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-accent">
                    <span
                      aria-hidden
                      className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    streaming
                  </span>
                </div>

                <div className="mt-4 flex flex-col gap-1.5 font-mono text-[12.5px] leading-[1.65]">
                  {TRACE_ROWS.map((r) => (
                    <div
                      key={r.label}
                      className={`flex justify-between ${toneClass[r.tone]}`}
                    >
                      <span>{r.label}</span>
                      <span>{r.dur}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3 border-t border-line-soft pt-4">
                  {OUTCOMES.map((o) => (
                    <div key={o.label}>
                      <div className="text-[20px] font-medium tracking-[-0.02em] text-ink">
                        {o.value}
                      </div>
                      <div className="mt-1 text-[11px] uppercase leading-snug tracking-[0.1em] text-muted">
                        {o.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent-soft/50 blur-3xl"
          />
        </div>
      </div>
    </section>
  );
}
