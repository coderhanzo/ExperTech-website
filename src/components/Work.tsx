import { ArrowUpRight } from "lucide-react";
import {
  AccentItalic,
  Badge,
  GlassCard,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

interface CaseStudy {
  name: string;
  industry: string;
  summary: string;
  capabilities: string[];
  platform: string;
  status: string;
  liveUrl?: string;
  liveLabel?: string;
}

const CASES: CaseStudy[] = [
  {
    name: "CBK Beauty",
    industry: "Beauty & wellness",
    summary: "A unified platform for salon bookings, commerce, customer loyalty and day-to-day administration.",
    capabilities: ["Booking", "Commerce", "Payments", "Loyalty", "CRM"],
    platform: "Mobile app + administration portal",
    status: "In development",
  },
  {
    name: "Telande",
    industry: "Food & media",
    summary: "A focused publishing platform that gives a private chef direct control of a growing recipe library.",
    capabilities: ["Publishing", "Recipe CMS", "Search", "Content operations"],
    platform: "Responsive web platform",
    status: "Live",
    liveUrl: "https://www.telandeworld.com",
    liveLabel: "View live project",
  },
  {
    name: "KwirkMart",
    industry: "Retail",
    summary: "A shop-from-home mobile experience connected to the tools behind inventory, orders and daily operations.",
    capabilities: ["Mobile commerce", "Inventory", "Orders", "Operations"],
    platform: "iOS app + operations console",
    status: "Live",
    liveUrl: "https://apps.apple.com/gb/app/kwirkmart/id6752880752",
    liveLabel: "View on the App Store",
  },
];

export function Work() {
  return (
    <section id="work" className="relative isolate overflow-hidden section-pad-md" style={{ scrollMarginTop: 96 }}>
      <GlowOrb size={460} color="rgba(120, 190, 195, 0.20)" className="top-1/3 -left-20" />
      <NoiseLayer />
      <div className="container-page relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <SectionHeading eyebrow="Selected work" title={<>Proof before <AccentItalic>promises</AccentItalic>.</>} />
          <p className="max-w-[440px] text-[15px] leading-[1.7] text-muted">
            Systems shaped around real workflows and operating constraints. We show the business context and delivered capability—not just a technology list.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {CASES.map((project, index) => {
            const href = project.liveUrl ?? "#contact";
            return (
              <GlassCard key={project.name} as="article" interactive className="flex h-full flex-col overflow-hidden p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">Case 0{index + 1}</span>
                  <Badge variant={project.status === "Live" ? "outline" : "accent"}>{project.status}</Badge>
                </div>
                <div className="mt-8 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">{project.industry}</div>
                <h3 className="text-case-title mt-3 text-ink">{project.name}</h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-muted">{project.summary}</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.capabilities.map((capability) => <Badge key={capability} variant="glass">{capability}</Badge>)}
                </div>
                <div className="mt-auto border-t border-white/12 pt-6 md:mt-9">
                  <div className="text-[10.5px] uppercase tracking-[0.16em] text-muted-soft">Platform</div>
                  <div className="mt-1.5 text-[14px] text-ink-soft">{project.platform}</div>
                  <a href={href} target={project.liveUrl ? "_blank" : undefined} rel={project.liveUrl ? "noreferrer" : undefined} className="group mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-ink no-underline transition-colors hover:text-accent">
                    {project.liveLabel ?? "Discuss similar work"}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </a>
                </div>
              </GlassCard>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-muted">Project specifics are abbreviated where client agreements require it. No unverified performance claims are shown.</p>
      </div>
    </section>
  );
}
