import { ArrowUpRight, Layers3 } from "lucide-react";
import { AccentItalic, Badge, GlassCard, GlowOrb, NoiseLayer, SectionHeading } from "./primitives";

export function Products() {
  return (
    <section id="products" className="relative isolate overflow-hidden section-pad-md" style={{ scrollMarginTop: 96 }}>
      <GlowOrb size={520} color="rgba(175, 92, 65, 0.09)" className="-bottom-24 -right-24" />
      <NoiseLayer />
      <div className="container-page relative z-10">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:items-start">
          <SectionHeading
            eyebrow="NeuraForge products"
            title={<>Software we build for <AccentItalic>ourselves</AccentItalic>.</>}
            description="Products are commercial offerings, not client portfolio items. Status and availability stay explicit so research is never mistaken for finished software."
          />
          <GlassCard as="article" className="overflow-hidden">
            <div className="grid md:grid-cols-[1.1fr_.9fr]">
              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent">Research</Badge>
                  <Badge variant="glass">Operations software</Badge>
                </div>
                <h3 className="mt-7 font-serif text-[30px] leading-[1.15] text-ink">Operations layer for service businesses</h3>
                <p className="mt-5 text-[15px] leading-[1.7] text-muted">An internal product direction exploring how booking, customer management and repeat workflows can live in one configurable system.</p>
                <a href="#contact" onClick={() => { window.dispatchEvent(new CustomEvent("neuraforge:product-interest")); }} className="group mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink no-underline transition-colors hover:text-accent">
                  Register product interest <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </div>
              <div className="relative isolate flex min-h-[300px] flex-col justify-between overflow-hidden glass-dark p-7 md:p-9">
                <GlowOrb size={320} color="rgba(175, 92, 65, 0.14)" className="-bottom-28 -right-20" />
                <NoiseLayer />
                <div className="relative z-10 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span>Product record</span><Layers3 className="h-4 w-4 text-accent" aria-hidden />
                </div>
                <div className="relative z-10 my-8 space-y-2">
                  {["Bookings", "Customers", "Workflows", "Reporting"].map((item) => <div key={item} className="rounded-xl border border-white/12 bg-white/8 px-4 py-3 text-[13px] text-ink-soft backdrop-blur">{item}</div>)}
                </div>
                <div className="relative z-10 text-[10px] uppercase tracking-[0.18em] text-accent-soft">Not yet publicly available</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
