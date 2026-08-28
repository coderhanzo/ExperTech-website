import { useEffect, useState } from "react";
import { ArrowUpRight, Blob, GlowOrb, LogoMark, NoiseLayer, Ring } from "./primitives";

const TRUST_ITEMS = [
  { value: "Web", label: "Customer platforms" },
  { value: "Mobile", label: "Product experiences" },
  { value: "Ops", label: "Business systems" },
];

/* ──────────────────────────────────────────────────────────────────
    Studio status pill — live Accra time
   ────────────────────────────────────────────────────────────────── */
const STUDIO_CONFIG = {
  timezone: "Africa/Accra",
  // Used on the very first render before the hook mounts (avoids hydration flash).
  fallback: "--:-- GMT",
} as const;

function computeStudioStatus(): string {
  const now = new Date();
  const tz = STUDIO_CONFIG.timezone;

  const time = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  return `${time} GMT`;
}

function useStudioStatus(): string | null {
  // null on first render → render fallback. After mount, returns live status.
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setStatus(computeStudioStatus());
    const id = setInterval(() => setStatus(computeStudioStatus()), 30_000);
    return () => clearInterval(id);
  }, []);

  return status;
}

export function Hero() {
  const status = useStudioStatus();
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
          color="rgba(175, 92, 65, 0.10)"
          className="float-blob -top-32 -right-32 md:hidden"
        />
        <GlowOrb
          size={760}
          color="rgba(175, 92, 65, 0.20)"
          className="float-blob hidden md:-top-56 md:-right-24 md:block"
        />
        <GlowOrb
          size={420}
          color="rgba(217, 140, 106, 0.07)"
          className="-bottom-32 -left-32 md:hidden"
        />
        <GlowOrb
          size={620}
          color="rgba(175, 92, 65, 0.10)"
          className="hidden md:-bottom-40 md:-left-24 md:block"
        />
        <GlowOrb
          size={420}
          color="rgba(61, 68, 54, 0.28)"
          className="float-blob hidden md:right-1/4 md:top-1/3 md:block"
        />
        <Blob
          size={480}
          color="rgba(61, 68, 54, 0.18)"
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
        <div className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 opacity-[0.11] lg:block">
          <LogoMark className="h-[580px] w-[580px]" />
        </div>
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] w-full opacity-35"
          viewBox="0 0 1200 360"
          preserveAspectRatio="none"
        >
          <g fill="none" stroke="rgba(175,92,65,.34)" strokeWidth="1">
            <path d="M0 260H154l38-42h124l54-68h172l48 43h146l45-75h159l38-54h192" />
            <path d="M0 306h228l42-38h173l54-59h122l51 42h183l37-65h310" />
            <path d="M0 214h116l43-48h147l48-61h181l53 44h111l42-64h176l43-45h240" />
          </g>
          <g fill="#D98C6A">
            <circle cx="154" cy="260" r="3"/><circle cx="316" cy="218" r="3"/>
            <circle cx="542" cy="150" r="3"/><circle cx="736" cy="193" r="3"/>
            <circle cx="940" cy="118" r="3"/><circle cx="270" cy="268" r="3"/>
            <circle cx="619" cy="209" r="3"/><circle cx="890" cy="186" r="3"/>
          </g>
        </svg>
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
              <span>{status ?? STUDIO_CONFIG.fallback}</span>
            </div>

            <h1 className="mt-5 text-balance text-hero text-ink md:mt-7">
              Software built around{" "}
              <em className="accent-italic">how your business</em>
              <br className="hidden sm:block" />
              {" "}actually works.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15.5px] leading-[1.65] text-ink-soft md:mt-7 md:text-[19px] md:leading-[1.7] md:text-muted">
              We design and engineer web platforms, mobile applications and
              operational systems for businesses ready to modernise, scale or
              launch something new.
            </p>

            <div className="mt-7 flex flex-col items-stretch justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3 md:mt-10">
              <a
                href="#contact"
                className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-6 text-[14.5px] font-medium tracking-tight text-canvas no-underline shadow-[var(--shadow-pill)] transition-all duration-200 hover:bg-ink-soft active:scale-[0.98] sm:h-13 sm:px-7 sm:text-[15px]"
                style={{ minHeight: 48 }}
              >
                Discuss a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 bg-white/10 px-6 text-[14.5px] font-medium text-ink no-underline backdrop-blur-md transition-all duration-200 hover:bg-white/15 active:scale-[0.98] sm:h-13 sm:px-7 sm:text-[15px]"
                style={{ minHeight: 48 }}
              >
                View our work
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

      </div>
    </section>
  );
}
