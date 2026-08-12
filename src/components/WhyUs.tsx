import {
  AccentItalic,
  GlassCard,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

const WHY = [
  {
    k: "01",
    title: "Direct access",
    body: "The people making product and engineering decisions stay close to the work and to your team.",
  },
  {
    k: "02",
    title: "Decisions before code",
    body: "We clarify the workflow, constraints and measure of success before adding technical complexity.",
  },
  {
    k: "03",
    title: "Built for ownership",
    body: "Clear architecture, documentation and operational visibility make the system easier to run after launch.",
  },
] as const;

export function WhyUs() {
  return (
    <section
      id="why-us"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={500}
        color="rgba(175, 92, 65, 0.09)"
        className="top-1/3 -right-32"
      />
      <NoiseLayer />

      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="Why NeuraForge"
          title={
            <>
              A senior team, close to the <AccentItalic>problem</AccentItalic>.
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {WHY.map((p) => (
            <GlassCard
              key={p.k}
              as="article"
              interactive
              className="px-9 pt-8 pb-10"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/12 text-[12px] font-medium tracking-tight text-ink backdrop-blur">
                  {p.k}
                </span>
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-accent/55"
                />
              </div>

              <h3 className="mt-9 font-serif text-[26px] font-normal leading-[1.18] tracking-[-0.02em] text-ink">
                {p.title}
              </h3>

              <p className="mt-4 text-[15px] leading-[1.7] text-muted">
                {p.body}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
