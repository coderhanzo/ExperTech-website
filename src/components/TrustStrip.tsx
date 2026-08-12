const OUTCOMES = [
  "Customer portals",
  "Booking management",
  "Ecommerce platforms",
  "Mobile applications",
  "Workflow automation",
  "CRM & operations",
  "Payment integrations",
  "System modernisation",
  "Intelligent automation",
];

export function TrustStrip() {
  // Duplicate the list so the marquee loops seamlessly
  const loop = [...OUTCOMES, ...OUTCOMES];

  return (
    <section
      id="trust"
      className="relative isolate overflow-hidden pt-6 pb-14 md:pt-10 md:pb-20"
      aria-label="Business systems we design and build"
      style={{ scrollMarginTop: 96 }}
    >
      <div className="container-page">
        <div className="flex flex-col items-center gap-6 md:gap-8">
          <span className="eyebrow text-muted-soft">
            Systems we design and build
          </span>

          <div className="marquee-mask relative w-full overflow-hidden">
            <ul
              className="marquee-track list-none gap-3 p-0 md:gap-4"
              aria-hidden="false"
            >
              {loop.map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/12 bg-white/8 px-5 py-2.5 backdrop-blur-md md:px-6 md:py-3"
                >
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="whitespace-nowrap text-[13.5px] font-medium tracking-tight text-ink-soft md:text-[15px]">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
