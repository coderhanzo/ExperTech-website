import { ArrowUpRight } from "lucide-react";
import { AccentItalic, GlassCard, GlowOrb, NoiseLayer, SectionHeading } from "./primitives";

const SOLUTIONS = [
  { title: "Booking management", body: "Manage availability, appointments, staff, customers, payments and notifications through one connected platform.", proof: "Relevant work · CBK Beauty" },
  { title: "Ecommerce platforms", body: "Connect product discovery and checkout to the inventory, fulfilment and administration behind every order.", proof: "Relevant work · KwirkMart" },
  { title: "Customer portals", body: "Give customers a clear, secure place to manage services, orders, accounts and ongoing communication.", proof: "Web + mobile delivery" },
  { title: "CRM & operations", body: "Bring customer records, internal activity and operational workflows into a system your team can trust.", proof: "Operational systems" },
  { title: "Workflow automation", body: "Replace duplicated entry, spreadsheets and fragile handoffs with visible, dependable workflows.", proof: "Automation + integrations" },
  { title: "Payment integrations", body: "Build payment collection, status handling and operational reconciliation into the product experience.", proof: "Commerce + booking" },
] as const;

export function Solutions() {
  return (
    <section id="solutions" className="relative isolate overflow-hidden section-pad-md" style={{ scrollMarginTop: 96 }}>
      <GlowOrb size={560} color="rgba(61, 68, 54, 0.30)" className="top-1/4 -left-40" />
      <NoiseLayer />
      <div className="container-page relative z-10">
        <SectionHeading
          eyebrow="Business solutions"
          title={<>Start with the <AccentItalic>problem</AccentItalic>, not the stack.</>}
          description="Solutions show how our engineering capability applies to a specific operational or customer problem. Each can stand alone as a first introduction to NeuraForge."
        />
        <GlassCard className="mt-14 overflow-hidden p-2 md:p-3">
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {SOLUTIONS.map((solution, index) => (
              <a key={solution.title} href="#contact" className={`group flex min-h-[260px] flex-col rounded-2xl p-6 text-inherit no-underline transition-colors hover:bg-white/10 md:p-7 ${index % 3 !== 2 ? "xl:border-r xl:border-white/12" : ""} ${index < 3 ? "border-b border-white/12" : index === 3 ? "border-b border-white/12 md:border-b-0" : ""}`}>
                <div className="flex items-start justify-between gap-5">
                  <h3 className="font-serif text-[24px] text-ink">{solution.title}</h3>
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </div>
                <p className="mt-5 text-[14.5px] leading-[1.7] text-muted">{solution.body}</p>
                <div className="mt-auto border-t border-white/12 pt-5 text-[10.5px] uppercase tracking-[0.16em] text-accent">{solution.proof}</div>
              </a>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
