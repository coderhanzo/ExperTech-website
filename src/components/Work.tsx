import { ArrowUpRight } from "lucide-react";
import { AccentItalic, Badge, SectionHeading } from "./primitives";

const CASES = [
  {
    num: "01",
    year: "2025",
    title: "Reconciliation engine for a fintech scale-up",
    desc: "Replaced an overloaded Rails monolith with a Go service and event pipeline handling 14M daily transactions.",
    category: "Fintech · Platform rebuild",
    status: "Shipped",
    outcome: "Month-end reconciliation: 11h → 18min",
  },
  {
    num: "02",
    year: "2025",
    title: "AI-assisted operations console for a logistics operator",
    desc: "Multi-tenant dashboard with custom RAG over 1.2M internal documents and tool-using agents for dispatch.",
    category: "Logistics · AI product",
    status: "Ongoing",
    outcome: "Est. $2.1M/yr saved in manual dispatch",
  },
  {
    num: "03",
    year: "2024",
    title: "Developer portal & SDK for a cloud infrastructure vendor",
    desc: "Public API, auth flows, typed SDKs in four languages, and a documentation site with runnable examples.",
    category: "DevTools · API & SDK",
    status: "Shipped",
    outcome: "Self-serve signups up 3.4×",
  },
  {
    num: "04",
    year: "2024",
    title: "HIPAA-grade telehealth platform",
    desc: "Patient intake, scheduling, video, and billing rebuilt as a modular platform. Full audit trail and SOC 2 readiness.",
    category: "Healthcare · Compliance",
    status: "Case study",
    outcome: "Certified in 6 months from kickoff",
  },
] as const;

export function Work() {
  return (
    <section
      id="work"
      className="border-t border-line-soft bg-canvas py-20 md:py-28 xl:py-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Work we're <AccentItalic>proud to ship</AccentItalic>.
              </>
            }
          />
          <p className="max-w-[360px] text-[15px] leading-[1.65] text-muted">
            A sample of recent engagements across fintech, healthcare,
            logistics, and developer tooling. Details abbreviated under NDA.
          </p>
        </div>

        <div className="mt-12 border-t border-line-soft">
          {CASES.map((c) => (
            <a
              key={c.num}
              href="#contact"
              className="group -mx-4 grid cursor-pointer grid-cols-[40px_1fr_40px] gap-4 rounded-xl border-b border-line-soft px-4 py-9 no-underline transition-colors duration-200 hover:bg-canvas-soft/60 md:grid-cols-[60px_1fr_280px_40px] md:gap-6"
            >
              <div className="pt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                {c.num}
              </div>

              <div>
                <h3 className="text-case-title font-normal tracking-[-0.015em] text-ink transition-colors duration-200 group-hover:text-accent">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-muted">
                  {c.desc}
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  <Badge variant="muted">{c.category}</Badge>
                  <Badge
                    variant={c.status === "Ongoing" ? "accent" : "outline"}
                  >
                    {c.status}
                  </Badge>
                </div>
              </div>

              <div className="hidden pt-1 md:block">
                <div className="text-[11px] uppercase tracking-[0.14em] text-muted">
                  Outcome
                </div>
                <div className="mt-2 text-[17px] leading-[1.4] text-ink-soft">
                  {c.outcome}
                </div>
              </div>

              <div className="flex items-start justify-end pt-1 text-xs text-muted">
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                />
                <span className="ml-2 hidden md:inline-block">{c.year}</span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-5 text-xs text-muted">
          Project details are representative; live references available under
          NDA.
        </p>
      </div>
    </section>
  );
}
