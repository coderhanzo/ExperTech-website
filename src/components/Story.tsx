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
      id="about"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={460}
        color="rgba(175, 92, 65, 0.11)"
        className="-top-24 -left-20"
      />
      <NoiseLayer />

      <div className="container-page relative z-10 grid items-start gap-12 md:grid-cols-[5fr_7fr]">
        <SectionHeading
          eyebrow="About NeuraForge"
          title={
            <>
              Engineering close to the <AccentItalic>business problem</AccentItalic>.
            </>
          }
        />
        <div>
          <GlassCard className="p-8 md:p-10">
            <div className="flex flex-col gap-5 text-[17px] leading-[1.75] text-ink-soft">
              <p>
                NeuraForge designs and builds software that helps businesses
                operate, sell and scale. We work where customer experience,
                internal operations and dependable engineering meet.
              </p>
              <p>
                We partner with founders, product teams and operations leaders
                who need software to fit the reality of their business. That
                means understanding the workflow before prescribing the stack.
              </p>
              <p>
                The people making product and engineering decisions stay close
                to the work—from the first conversation through launch and handoff.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
