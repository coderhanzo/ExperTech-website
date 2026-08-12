import { ArrowRight, Boxes, Cog, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import { AccentItalic, GlassCard, GlowOrb, NoiseLayer, SectionHeading } from "./primitives";

const CAPABILITIES: Array<{ verb: string; title: string; description: string; items: string[]; icon: ReactNode }> = [
  {
    verb: "Build",
    title: "Digital products",
    description: "Web applications, mobile apps, SaaS platforms and customer-facing software shaped around a clear commercial job.",
    items: ["Custom software development", "Web application development", "Mobile application development"],
    icon: <Boxes className="h-5 w-5" aria-hidden />,
  },
  {
    verb: "Automate",
    title: "Business operations",
    description: "Booking, CRM, ecommerce, inventory and workflow systems that reduce manual work and connect the people doing it.",
    items: ["Business systems", "Workflow automation", "Payments & integrations"],
    icon: <Cog className="h-5 w-5" aria-hidden />,
  },
  {
    verb: "Modernise",
    title: "Existing systems",
    description: "Architecture, performance, reliability and selective AI capability for software supporting its next stage of growth.",
    items: ["Platform upgrades", "Technical audits", "Intelligent automation"],
    icon: <RefreshCw className="h-5 w-5" aria-hidden />,
  },
];

export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden section-pad-md" style={{ scrollMarginTop: 96 }}>
      <GlowOrb size={520} color="rgba(175, 92, 65, 0.09)" className="-top-32 -right-20" />
      <NoiseLayer />
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="Engineering services"
          title={<>Capability with a <AccentItalic>business purpose</AccentItalic>.</>}
          description="Services answer what we can build. We shape the engagement around the outcome—not around a preferred technology or pre-packaged delivery model."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CAPABILITIES.map((capability, index) => (
            <GlassCard key={capability.verb} as="article" interactive className="flex min-h-[410px] flex-col p-7 md:p-8">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-ink ring-1 ring-white/15 backdrop-blur">{capability.icon}</span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-muted">0{index + 1}</span>
              </div>
              <div className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">{capability.verb}</div>
              <h3 className="text-h3 mt-3 text-ink">{capability.title}</h3>
              <p className="mt-4 text-[15px] leading-[1.7] text-muted">{capability.description}</p>
              <ul className="mt-auto list-none space-y-3 border-t border-white/12 p-0 pt-6 md:mt-9">
                {capability.items.map((item) => <li key={item} className="flex items-start gap-3 text-[14px] text-ink-soft"><span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-accent" />{item}</li>)}
              </ul>
            </GlassCard>
          ))}
        </div>
        <a href="#contact" className="group mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-ink no-underline transition-colors hover:text-accent">
          Discuss what you need to build <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </div>
    </section>
  );
}
