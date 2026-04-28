import { AccentItalic, SectionHeading } from "./primitives";

const METRICS = [
  { value: "12+", label: "Years of senior engineering" },
  { value: "40+", label: "Products shipped to production" },
  { value: "9", label: "Industries served" },
  { value: "98%", label: "Client retention" },
] as const;

export function Story() {
  return (
    <section
      id="story"
      className="bg-canvas py-20 md:py-28 xl:py-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page grid items-start gap-12 md:grid-cols-[5fr_7fr]">
        <SectionHeading
          eyebrow="Our story"
          title={
            <>
              A studio, not an <AccentItalic>agency</AccentItalic>.
            </>
          }
        />
        <div>
          <div className="flex flex-col gap-5 text-[17px] leading-[1.7] text-ink-soft">
            <p>
              Expertech started with a simple frustration: most software is
              written to ship a demo, not to last a decade. We set out to build
              the opposite — a small, senior team that treats every codebase
              like something it will have to maintain for years.
            </p>
            <p>
              We partner with founders, product teams, and operations leaders
              who need software that behaves under pressure. That means clear
              architecture, honest estimates, and engineers who can talk to
              your CFO as easily as they can talk to your platform team.
            </p>
            <p>
              No pods. No layers of account management. The people writing your
              code are the people you meet on day one.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-line-soft pt-9 md:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label}>
                <div className="font-serif text-[36px] font-normal leading-none tracking-[-0.02em] text-ink">
                  {m.value}
                </div>
                <div className="mt-2 text-[11px] uppercase leading-snug tracking-[0.12em] text-muted">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
