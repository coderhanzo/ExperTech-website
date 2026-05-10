import {
  AccentItalic,
  GlassCard,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

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
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={500}
        color="rgba(224, 255, 79, 0.08)"
        className="-bottom-20 right-1/4"
      />
      <NoiseLayer />

      <div className="container-page relative z-10">
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

        <div className="relative mt-14">
          {/* Connector line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent xl:block"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {PHASES.map((p) => (
              <GlassCard
                key={p.step}
                as="article"
                interactive
                className="px-7 pt-7 pb-8"
              >
                <div className="flex items-baseline justify-between">
                  <span className="inline-flex h-7 items-center rounded-full bg-accent/12 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                    Phase {p.step}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {p.dur}
                  </span>
                </div>

                <h3 className="mt-7 font-serif text-[28px] font-normal tracking-[-0.025em] text-ink">
                  {p.title}
                </h3>

                <div className="hairline mt-4" />

                <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                  {p.body}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
