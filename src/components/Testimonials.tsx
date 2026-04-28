import { AccentItalic, SectionHeading } from "./primitives";

const QUOTES = [
  {
    quote:
      "They joined mid-migration, flagged three risks we hadn't seen, and shipped the fix before the quarter closed. That's the whole pitch.",
    name: "[Client Name]",
    role: "VP Engineering",
    company: "[Scale-up, fintech]",
  },
  {
    quote:
      "Most outside teams treat us like a ticket queue. Expertech treated us like a product. It's the first engagement where the handoff document was better than our internal docs.",
    name: "[Client Name]",
    role: "Co-founder & CTO",
    company: "[Series-A SaaS]",
  },
  {
    quote:
      "We needed engineers who could talk to our compliance team without flinching. They did that on day one, and the platform passed audit on the first try.",
    name: "[Client Name]",
    role: "Head of Platform",
    company: "[Healthcare]",
  },
] as const;

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="border-t border-line-soft bg-canvas py-20 md:py-28 xl:py-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="What clients say"
          title={
            <>
              Words from the people who{" "}
              <AccentItalic>had to live with the code</AccentItalic>.
            </>
          }
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="card-hover m-0 flex flex-col rounded-2xl border border-line-soft bg-surface p-9"
            >
              <span
                aria-hidden
                className="font-serif text-[56px] leading-[0.6] text-accent/70"
              >
                &ldquo;
              </span>
              <blockquote className="mt-5 flex-1 text-base leading-[1.65] text-ink-soft">
                {q.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-line-soft pt-5">
                <div className="text-sm font-medium text-ink">{q.name}</div>
                <div className="mt-1 text-xs text-muted">
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
