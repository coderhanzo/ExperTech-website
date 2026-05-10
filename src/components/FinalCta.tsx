import { ArrowUpRight, GlowOrb, NoiseLayer } from "./primitives";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="relative isolate overflow-hidden pt-2 pb-20 md:pt-6 md:pb-28"
      style={{ scrollMarginTop: 96 }}
    >
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-section)] glass-dark px-7 py-20 md:px-16 md:py-28">
          <GlowOrb
            size={780}
            color="rgba(224, 255, 79, 0.18)"
            className="-bottom-48 -right-32"
          />
          <GlowOrb
            size={520}
            color="rgba(224, 255, 79, 0.10)"
            className="-top-24 left-1/4"
          />
          <NoiseLayer />

          <div className="relative z-10 max-w-3xl">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent-soft">
              Ready when you are
            </span>

            <h2 className="text-final-cta mt-5 text-ink">
              Let's build something your team will still be{" "}
              <em className="font-light italic text-accent-soft">proud of</em>{" "}
              in five years.
            </h2>

            <p className="mt-6 max-w-xl text-[17px] leading-[1.7] text-ink/65">
              Brief us in a paragraph or a 60-minute call. We'll come back with
              a written take on scope, risk, and a realistic timeline — free,
              no decks.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex h-13 cursor-pointer items-center gap-2 rounded-full bg-accent px-7 text-[15px] font-medium tracking-tight text-canvas no-underline shadow-[var(--shadow-pop)] transition-colors duration-200 hover:bg-accent-hover active:scale-[0.98]"
                style={{ height: 52 }}
              >
                Start a project
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </a>
              <a
                href="mailto:exper.b.tech@gmail.com"
                className="text-sm text-ink/70 underline underline-offset-4 transition-colors duration-200 hover:text-ink"
              >
                or email exper.b.tech@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
