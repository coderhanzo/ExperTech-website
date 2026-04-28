import { AccentItalic, SectionHeading } from "./primitives";

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
      className="border-t border-line-soft bg-canvas py-20 md:py-28 xl:py-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Why clients stay"
          title={
            <>
              Three differences you'll feel in the{" "}
              <AccentItalic>first sprint</AccentItalic>.
            </>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {WHY.map((p) => (
            <article
              key={p.k}
              className="card-hover rounded-2xl border border-line-soft bg-surface px-9 pt-8 pb-9"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-canvas-soft text-xs font-medium text-ink">
                  {p.k}
                </span>
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-accent/40"
                />
              </div>

              <h3 className="mt-9 font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.015em] text-ink">
                {p.title}
              </h3>

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
