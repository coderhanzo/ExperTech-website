import {
  AccentItalic,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

const QUOTES = [
  {
    quote:
      "They built the salon booking app around how we actually run the floor — not how a generic SaaS thinks we should. It went live before our busiest season and our front desk hasn't looked back.",
    name: "[Client Name]",
    role: "Owner",
    company: "[Salon · Beauty]",
    wash: "rgba(175, 92, 65, 0.14)",
    tag: "Beauty",
  },
  {
    quote:
      "I needed a system that fits a working kitchen, not a generic restaurant template. They wrote a custom backend around my menu, my suppliers, and my service flow — and it just works.",
    name: "[Client Name]",
    role: "Head Chef",
    company: "[Private kitchen · Lifestyle]",
    wash: "rgba(120, 190, 195, 0.35)",
    tag: "Lifestyle",
  },
  {
    quote:
      "We needed an app that could handle real foot traffic and inventory at the same time. They shipped a custom backend that scales with the store, instead of forcing us into someone else's stack.",
    name: "[Client Name]",
    role: "Owner",
    company: "[Shopping mart · Retail]",
    wash: "rgba(180, 220, 180, 0.30)",
    tag: "Shopping",
  },
] as const;

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={500}
        color="rgba(175, 92, 65, 0.08)"
        className="-top-24 left-1/3"
      />
      <NoiseLayer />

      <div className="container-page relative z-10">
        <SectionHeading
          align="center"
          eyebrow="What clients say"
          title={
            <>
              Words from the people who{" "}
              <AccentItalic>had to live with the code</AccentItalic>.
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="group relative m-0 flex flex-col overflow-hidden rounded-[var(--radius-card-lg)] glass-card glass-hover p-9"
            >
              {/* Color wash */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full blur-3xl"
                style={{ background: q.wash }}
              />
              <NoiseLayer />

              <div className="relative z-10 flex items-center justify-between">
                <span
                  aria-hidden
                  className="font-serif text-[64px] leading-[0.5] text-accent/65"
                >
                  &ldquo;
                </span>
                <span className="rounded-full border border-white/12 bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-muted backdrop-blur">
                  {q.tag}
                </span>
              </div>

              <blockquote className="relative z-10 mt-8 flex-1 text-[16px] leading-[1.7] text-ink-soft">
                {q.quote}
              </blockquote>

              <figcaption className="relative z-10 mt-8 border-t border-white/12 pt-5">
                <div className="text-[14.5px] font-medium text-ink">
                  {q.name}
                </div>
                <div className="mt-1 text-[12px] text-muted">
                  {q.role} · {q.company}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
