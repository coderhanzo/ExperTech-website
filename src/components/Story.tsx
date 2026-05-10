import {
  AccentItalic,
  GlassCard,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

export function Story() {
  return (
    <section
      id="story"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={460}
        color="rgba(224, 255, 79, 0.09)"
        className="-top-24 -left-20"
      />
      <NoiseLayer />

      <div className="container-page relative z-10 grid items-start gap-12 md:grid-cols-[5fr_7fr]">
        <SectionHeading
          eyebrow="Our story"
          title={
            <>
              A studio, not an <AccentItalic>agency</AccentItalic>.
            </>
          }
        />
        <div>
          <GlassCard className="p-8 md:p-10">
            <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-ink-soft">
              <p>
                Expertech started with a simple frustration: most software is
                written to ship a demo, not to last a decade. We set out to
                build the opposite — a small, senior team that treats every
                codebase like something it will have to maintain for years.
              </p>
              <p>
                We partner with founders, product teams, and operations leaders
                who need software that behaves under pressure. That means clear
                architecture, honest estimates, and engineers who can talk to
                your CFO as easily as they can talk to your platform team.
              </p>
              <p>
                No pods. No layers of account management. The people writing
                your code are the people you meet on day one.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
