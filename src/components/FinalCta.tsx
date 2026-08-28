import { ArrowUpRight, GlowOrb, NoiseLayer } from "./primitives";
import { CTAConvergence } from "./NeuralJourney";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative isolate overflow-hidden pt-2 pb-20 md:pt-6 md:pb-28"
      style={{ scrollMarginTop: 96 }}
    >
      <div className="container-page">
        <div className="final-cta-panel relative isolate overflow-hidden rounded-[var(--radius-section)] glass-dark px-7 py-20 md:px-16 md:py-28">
          <GlowOrb
            size={780}
            color="rgba(175, 92, 65, 0.18)"
            className="-bottom-48 -right-32"
          />
          <GlowOrb
            size={520}
            color="rgba(217, 140, 106, 0.10)"
            className="-top-24 left-1/4"
          />
          <NoiseLayer />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.12fr_.88fr] lg:gap-8">
            <div className="max-w-3xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent-soft">
              Ready when you are
            </span>

            <h2 className="text-final-cta mt-5 text-ink">
              Need software that fits how your business{" "}
              <em className="font-light italic text-accent-soft">actually works</em>?
            </h2>

            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-ink-soft">
              Tell us what needs to change. We’ll come back with useful questions,
              an honest view of the risks and a practical next step.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="final-cta-button group inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-accent px-7 text-[15px] font-medium tracking-tight text-canvas no-underline shadow-[var(--shadow-pop)] transition-colors duration-200 hover:bg-accent-hover active:scale-[0.98]"
                style={{ height: 52 }}
              >
                Discuss a project
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
              <a
                href="mailto:neuraforgesys@gmail.com"
                className="text-sm text-ink-soft underline decoration-ink/40 underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                or email neuraforgesys@gmail.com
              </a>
            </div>
            </div>

            <CTAConvergence />
          </div>
        </div>
      </div>
    </section>
  );
}
