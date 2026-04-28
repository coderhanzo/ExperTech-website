import { ArrowUpRight } from "./primitives";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-24 pb-28 md:pt-32 md:pb-36 xl:pt-40 xl:pb-44"
      style={{ scrollMarginTop: "5rem" }}
    >
      {/* Background gradient glow - improved positioning and blur */}
      <div
        aria-hidden
        className="absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-accent-soft/30 blur-3xl md:-top-60 md:-right-60 md:h-[40rem] md:w-[40rem]"
      />

      <div className="container-page relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Status badge - fixed alignment and hover interaction */}
        <div className="inline-flex items-center gap-2 rounded-full border border-line-soft bg-surface/80 backdrop-blur-sm px-4 py-1.5 text-sm font-medium tracking-wide text-ink-soft shadow-sm transition-all duration-200 hover:bg-surface hover:shadow-md">
          <span
            aria-hidden
            className="relative flex h-2 w-2"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span>Independent software studio — available Q3 2026</span>
        </div>

        {/* Main heading - improved text balance and line height */}
        <h1 className="mt-8 text-balance text-4xl font-bold text-ink sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Software built to{" "}
          <em className="accent-italic">
            outlast
          </em>{" "}
          the quarter it shipped in.
        </h1>

        {/* Description - better readability on all devices */}
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:mt-8 md:text-xl">
          Expertech is a small team of senior engineers and product thinkers. We
          design, build, and scale web platforms, SaaS products, and AI systems
          for companies that treat software as a competitive advantage — not a
          line item.
        </p>

        {/* CTA Buttons - fixed hover states and accessibility */}
        <div className="mt-10 flex flex-wrap items-center gap-4 md:mt-12">
          <a
            href="#contact"
            className="group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-white no-underline shadow-[0_14px_26px_-18px_rgba(183,80,45,0.85)] transition-all duration-200 hover:bg-accent-hover hover:shadow-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-canvas"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#work"
            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-line-soft bg-surface px-8 text-base font-semibold text-ink no-underline shadow-sm transition-all duration-200 hover:border-ink/35 hover:bg-white active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-canvas"
          >
            See our work
          </a>
        </div>
      </div>
    </section>
  );
}
