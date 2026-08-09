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
    title: "Senior by default",
    body: "Every engineer on your project has shipped production software for ten-plus years. No rotating juniors, no learning on your time, no bait-and-switch after the SOW is signed.",
  },
  {
    k: "02",
    title: "Product thinking, not ticket-pushing",
    body: "We will push back on a ticket that doesn't make sense and propose the one that should exist instead. You're paying for judgment, not just throughput.",
  },
  {
    k: "03",
    title: "Built to hand off",
    body: "Tests, docs, runbooks, and an architecture a new hire can read in an afternoon. The day we leave, your team shouldn't notice a capability gap.",
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
          eyebrow="Why clients stay"
          title={
            <>
              Three differences you'll feel in the{" "}
              <AccentItalic>first sprint</AccentItalic>.
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
