import { AccentItalic, SectionHeading } from "./primitives";

const PHASES = [
  {
    step: "01",
    title: "Discover",
    body: "Two weeks of deep listening — to your users, your data, your team. We leave with a written thesis on what to build, what to cut, and what's going to hurt.",
    dur: "~2 weeks",
  },
  {
    step: "02",
    title: "Architect",
    body: "We draw the system end-to-end before the first commit. Data models, service boundaries, infrastructure, evals — committed to a doc your engineering lead signs off on.",
    dur: "~2 weeks",
  },
  {
    step: "03",
    title: "Build",
    body: "Weekly shippable slices, visible progress, working software. Pair-programming with your team where it helps. No silent phases, no surprise demos.",
    dur: "8–16 weeks",
  },
  {
    step: "04",
    title: "Scale",
    body: "Handoff with runbooks, on-call coverage, and optional retainer. We stay long enough for your team to own it — and no longer than that.",
    dur: "ongoing",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="bg-canvas pt-4 pb-20 md:pt-8 md:pb-28 xl:pb-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A process that survives{" "}
              <AccentItalic>first contact</AccentItalic> with reality.
            </>
          }
          description="Most engagements fail in the handoffs between phases, not inside them. Ours is designed to make those handoffs obvious, short, and well-documented."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PHASES.map((p) => (
            <article
              key={p.step}
              className="card-hover rounded-2xl border border-line-soft bg-surface px-7 pt-7 pb-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  Phase {p.step}
                </span>
                <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  {p.dur}
                </span>
              </div>

              <h3 className="mt-7 font-serif text-[28px] font-normal tracking-[-0.02em] text-ink">
                {p.title}
              </h3>

              <div className="hairline mt-4" />

              <p className="mt-4 text-[15px] leading-[1.65] text-muted">
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
