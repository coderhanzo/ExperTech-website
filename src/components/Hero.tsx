import { ChevronUp } from "lucide-react";
import { ArrowUpRight, Blob, GlowOrb, NoiseLayer, Ring } from "./primitives";

const TRUST_ITEMS = [
  { value: "12", label: "Yrs combined exp" },
  { value: "3", label: "Industries built for" },
  { value: "100%", label: "Custom backends" },
];

export function Hero() {
  return (
    <section
      id="hero"
      style={{ scrollMarginTop: "5rem" }}
      className="relative isolate flex flex-col px-3 pt-3 pb-2 sm:px-4 md:px-0 md:pt-0 md:pb-0 md:w-screen md:ml-[calc(50%-50vw)] md:mr-[calc(50%-50vw)] md:h-[calc(100svh-6rem)] md:overflow-hidden"
    >
      <div className="relative isolate flex flex-1 flex-col overflow-hidden rounded-[var(--radius-section)] border border-white/10 bg-canvas-deep/55 backdrop-blur-xl shadow-[var(--shadow-floating)] md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none">
        {/* Layered shape background — softened for mobile, full intensity on desktop */}
        <GlowOrb
          size={520}
          color="rgba(224, 255, 79, 0.10)"
          className="float-blob -top-32 -right-32 md:hidden"
        />
        <GlowOrb
          size={760}
          color="rgba(224, 255, 79, 0.18)"
          className="float-blob hidden md:-top-56 md:-right-24 md:block"
        />
        <GlowOrb
          size={420}
          color="rgba(224, 255, 79, 0.07)"
          className="-bottom-32 -left-32 md:hidden"
        />
        <GlowOrb
          size={620}
          color="rgba(224, 255, 79, 0.10)"
          className="hidden md:-bottom-40 md:-left-24 md:block"
        />
        <GlowOrb
          size={420}
          color="rgba(120, 190, 195, 0.20)"
          className="float-blob hidden md:right-1/4 md:top-1/3 md:block"
        />
        <Blob
          size={480}
          color="rgba(180, 230, 220, 0.12)"
          className="float-blob hidden right-[-10%] top-[14%] sm:block md:right-[-6%] md:top-[18%]"
          rotate={-18}
        />
        <Ring
          size={520}
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 md:hidden"
        />
        <Ring
          size={680}
          className="left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
        />
        <Ring
          size={960}
          className="left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-60 md:block"
        />
        <Ring
          size={1240}
          className="left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 opacity-30 md:block"
        />
        <NoiseLayer />

        {/* Centered content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-9 pb-9 sm:pt-10 sm:pb-12 md:px-12 md:pt-10 md:pb-28">
          <div className="mx-auto w-full max-w-4xl text-center md:max-w-5xl">
            {/* Status pill */}
            <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-medium tracking-wide text-ink-soft shadow-[var(--shadow-glass-inner)] backdrop-blur-md sm:px-4 sm:text-[12.5px]">
              <span aria-hidden className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span>
                <span className="hidden sm:inline">Independent software studio · </span>
                Available Q3 2026
              </span>
            </div>

            <h1 className="mt-5 text-balance text-hero text-ink md:mt-7">
              Software built to{" "}
              <em className="accent-italic">outlast</em>
              <br className="hidden sm:block" />
              {" "}the quarter it shipped in.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15.5px] leading-[1.65] text-ink-soft md:mt-7 md:text-[19px] md:leading-[1.7] md:text-muted">
              Expertech is a small team of senior engineers and product
              thinkers. We design, build, and scale web platforms, SaaS
              products, and AI systems — for companies that treat software as a
              competitive advantage.
            </p>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:mt-10">
              <a
                href="#contact"
                className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 text-[14.5px] font-medium tracking-tight text-canvas no-underline shadow-[var(--shadow-pill)] transition-all duration-200 hover:bg-ink-soft active:scale-[0.98] sm:h-13 sm:px-7 sm:text-[15px]"
                style={{ minHeight: 48 }}
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/10 px-6 text-[14.5px] font-medium text-ink no-underline backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-[0.98] sm:h-13 sm:px-7 sm:text-[15px]"
                style={{ minHeight: 48 }}
              >
                See our work
              </a>
            </div>

            {/* Trust micro-row */}
            <div className="mx-auto mt-7 grid w-full max-w-md grid-cols-3 gap-2 sm:mt-10 sm:flex sm:max-w-2xl sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-3 md:mt-14">
              {TRUST_ITEMS.map((t) => (
                <div
                  key={t.label}
                  className="flex flex-col items-center justify-center gap-0.5 rounded-2xl border border-white/12 bg-white/10 px-2.5 py-3 backdrop-blur-md sm:min-w-[160px] sm:flex-1 sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:px-5 sm:py-2.5"
                >
                  <span className="font-serif text-[18px] tracking-[-0.02em] text-ink sm:text-[20px]">
                    {t.value}
                  </span>
                  <span className="text-center text-[10px] uppercase leading-tight tracking-[0.12em] text-muted sm:text-left sm:text-[12px] sm:tracking-[0.14em]">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator — desktop only (mobile has natural scroll affordance) */}
        <a
          href="#trust"
          aria-label="Scroll to next section"
          className="group absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 no-underline md:block"
        >
          <div className="flex flex-col items-center gap-2.5">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.32em] text-ink-soft/70 transition-colors duration-200 group-hover:text-ink">
              Scroll
            </span>
            <div className="relative flex h-10 w-6 items-end justify-center rounded-full border border-ink/25 bg-white/8 pb-2 backdrop-blur-md transition-colors duration-200 group-hover:border-ink/50">
              <span
                aria-hidden
                className="scroll-cue-dot block h-1.5 w-1.5 rounded-full bg-ink/70"
              />
            </div>
            <ChevronUp
              aria-hidden
              className="scroll-cue-arrow h-3.5 w-3.5 text-ink/50"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
