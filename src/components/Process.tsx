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
    title: "Understand",
    body: "Map the users, operating reality, constraints and commercial outcome before prescribing a system.",
    dur: "Context",
  },
  {
    step: "02",
    title: "Define",
    body: "Turn the problem into a focused scope, delivery plan and technical approach with risks made visible.",
    dur: "Scope",
  },
  {
    step: "03",
    title: "Build",
    body: "Deliver working slices, review them in context and adjust with evidence instead of waiting for a final reveal.",
    dur: "Delivery",
  },
  {
    step: "04",
    title: "Operate",
    body: "Launch with documentation, monitoring and a clear path for ownership, support and the next release.",
    dur: "Ownership",
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
        color="rgba(175, 92, 65, 0.08)"
        className="-bottom-20 right-1/4"
      />
      <NoiseLayer />

      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Clear decisions. <AccentItalic>Visible progress</AccentItalic>.
            </>
          }
          description="The shape changes with the engagement; the discipline does not. You see what is being decided, built and learned throughout."
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
