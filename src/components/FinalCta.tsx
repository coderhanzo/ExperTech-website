import { ArrowUpRight } from "./primitives";

export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="bg-canvas pt-4 pb-20 md:pt-8"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[28px] bg-ink px-8 py-20 md:px-16 md:py-24">
          <div className="relative z-1 max-w-180">
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent-soft">
              Ready when you are
            </span>

            <h2 className="text-final-cta mt-5 text-white">
              Let's build something your team will still be{" "}
              <em className="font-light italic text-accent-soft">proud of</em>{" "}
              in five years.
            </h2>

            <p className="mt-6 text-[17px] leading-[1.65] text-white/65">
              Brief us in a paragraph or a 60-minute call. We'll come back with
              a written take on scope, risk, and a realistic timeline — free,
              no decks.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex h-12 cursor-pointer items-center gap-1.5 rounded-full bg-accent px-7 text-[15px] font-medium text-white no-underline shadow-[0_12px_24px_-18px_rgba(183,80,45,0.8)] transition-colors duration-200 hover:bg-accent-hover active:scale-[0.98]"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="mailto:hello@expertech.dev"
                className="text-sm text-white/70 underline underline-offset-4 transition-colors duration-200 hover:text-white"
              >
                or email hello@expertech.dev
              </a>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -bottom-32 h-105 w-105 rounded-full bg-accent/25 blur-[80px]"
          />
        </div>
      </div>
    </section>
  );
}
