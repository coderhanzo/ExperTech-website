import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ShoppingBag,
  Sparkles,
  Utensils,
} from "lucide-react";

type VisualKind = "booking" | "publishing" | "commerce";

interface CaseStudy {
  name: string;
  industry: string;
  summary: string;
  platform: string;
  status: string;
  capabilities: string[];
  visual: VisualKind;
  liveUrl?: string;
  liveLabel: string;
}

const CASES: CaseStudy[] = [
  {
    name: "CBK Beauty",
    industry: "Beauty & wellness",
    summary:
      "One operating system for appointments, products, loyalty and the team running the salon each day.",
    platform: "Mobile app + administration portal",
    status: "In development",
    capabilities: ["Booking", "Commerce", "Payments", "Loyalty"],
    visual: "booking",
    liveLabel: "Discuss similar work",
  },
  {
    name: "Telande",
    industry: "Food & media",
    summary:
      "A focused publishing platform that gives a private chef direct control of a growing recipe library.",
    platform: "Responsive publishing platform",
    status: "Live",
    capabilities: ["Publishing", "Recipe CMS", "Search", "Content operations"],
    visual: "publishing",
    liveUrl: "https://www.telandeworld.com",
    liveLabel: "View live project",
  },
  {
    name: "KwirkMart",
    industry: "Retail",
    summary:
      "A shop-from-home experience connected to the tools behind inventory, orders and everyday operations.",
    platform: "iOS app + operations console",
    status: "Live",
    capabilities: ["Mobile commerce", "Inventory", "Orders", "Operations"],
    visual: "commerce",
    liveUrl: "https://apps.apple.com/gb/app/kwirkmart/id6752880752",
    liveLabel: "View on the App Store",
  },
];

function WindowFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-black/10 bg-[#f9f7f3] shadow-[0_28px_70px_-35px_rgba(30,27,23,0.45)]">
      <div className="flex h-9 items-center gap-1.5 border-b border-black/8 bg-white/70 px-4">
        <span className="h-2 w-2 rounded-full bg-[#d98c6a]" />
        <span className="h-2 w-2 rounded-full bg-[#d5c9b9]" />
        <span className="h-2 w-2 rounded-full bg-[#3d4436]" />
        <span className="ml-3 h-3 w-28 rounded-full bg-black/5" />
      </div>
      {children}
    </div>
  );
}

function BookingVisual() {
  return (
    <WindowFrame>
      <div className="grid min-h-[370px] grid-cols-[86px_1fr] bg-[#f6f0eb] sm:grid-cols-[116px_1fr]">
        <div className="border-r border-black/8 bg-[#242927] p-3 text-[#f7f5f0] sm:p-4">
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em]">
            <Sparkles className="h-3.5 w-3.5 text-[#d98c6a]" />
            <span className="hidden sm:inline">CBK</span>
          </div>
          <div className="mt-9 space-y-2">
            {["Today", "Clients", "Services", "Store"].map((item, index) => (
              <div
                key={item}
                className={`rounded-lg px-2 py-2 text-[8px] sm:text-[10px] ${
                  index === 0 ? "bg-white/10 text-white" : "text-white/42"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-black/42">Tuesday · 18 June</div>
              <div className="mt-1 font-serif text-xl font-semibold text-[#1b1e1d] sm:text-2xl">Good morning, CBK.</div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d98c6a]/15 text-[#91432e]">
              <CalendarDays className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              ["Appointments", "12"],
              ["Returning", "68%"],
              ["Revenue", "GHS 4.8k"],
            ].map(([label, value], index) => (
              <div key={label} className={`rounded-xl border border-black/7 bg-white p-3 ${index === 2 ? "hidden sm:block" : ""}`}>
                <div className="text-[8px] uppercase tracking-[0.12em] text-black/38">{label}</div>
                <div className="mt-2 text-base font-semibold text-[#1b1e1d]">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl border border-black/7 bg-white p-3">
            <div className="flex items-center justify-between text-[9px] text-black/45">
              <span>Today’s schedule</span>
              <span>09:00—17:30</span>
            </div>
            <div className="mt-3 space-y-2">
              {[
                ["09:30", "Silk press", "Ama"],
                ["11:00", "Natural styling", "Esi"],
                ["13:30", "Consultation", "Naa"],
              ].map(([time, service, client], index) => (
                <div key={time} className="grid grid-cols-[42px_1fr_auto] items-center gap-2 rounded-lg bg-[#f6f0eb] px-2.5 py-2 text-[9px]">
                  <span className="font-mono text-black/38">{time}</span>
                  <span className="font-medium text-[#252826]">{service}</span>
                  <span className={index === 1 ? "text-[#91432e]" : "text-black/45"}>{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function PublishingVisual() {
  return (
    <WindowFrame>
      <div className="min-h-[370px] bg-[#f3eadf] p-4 sm:p-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-3 text-[9px] uppercase tracking-[0.16em] text-[#363832]">
          <span className="flex items-center gap-2 font-semibold"><Utensils className="h-3.5 w-3.5" /> Telande</span>
          <span>Recipes · Stories</span>
        </div>
        <div className="mt-5 grid grid-cols-[1.05fr_.95fr] gap-4 sm:gap-6">
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-[#a34f34]">From the kitchen</div>
              <div className="mt-3 font-serif text-[clamp(1.6rem,4vw,3.3rem)] leading-[0.94] tracking-[-0.04em] text-[#20231f]">
                Food with a story worth sharing.
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {["Ghanaian", "Weeknight", "Plant-forward"].map((tag) => (
                <span key={tag} className="rounded-full border border-black/12 px-2.5 py-1 text-[8px] text-black/55">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden rounded-[42%_58%_44%_56%/55%_42%_58%_45%] bg-[#bd5d3e]">
            <div className="absolute -right-10 -top-6 h-40 w-40 rounded-full bg-[#f0b95d]" />
            <div className="absolute bottom-7 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-[#eee1c7] shadow-xl sm:h-44 sm:w-44">
              <div className="absolute inset-5 rounded-full bg-[#54704f]" />
              <div className="absolute left-1/2 top-1/2 h-10 w-20 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full bg-[#d69a55]" />
              <div className="absolute left-[28%] top-[34%] h-6 w-6 rounded-full bg-[#efcb6f]" />
              <div className="absolute right-[24%] top-[55%] h-5 w-5 rounded-full bg-[#853d2c]" />
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function CommerceVisual() {
  return (
    <WindowFrame>
      <div className="relative min-h-[370px] overflow-hidden bg-[#e7eee9] p-5 sm:p-7">
        <div className="absolute inset-y-0 right-0 w-1/3 bg-[#d9a84a]" />
        <div className="relative z-10 grid grid-cols-[1fr_128px] items-center gap-4 sm:grid-cols-[1fr_170px]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#183b31] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.16em] text-white">
              <ShoppingBag className="h-3 w-3 text-[#f2c75f]" /> KwirkMart
            </div>
            <h3 className="mt-5 max-w-[260px] font-serif text-[clamp(1.7rem,4vw,3.2rem)] leading-[0.95] tracking-[-0.04em] text-[#183b31]">
              The everyday shop, brought home.
            </h3>
            <div className="mt-6 grid max-w-[250px] grid-cols-2 gap-2">
              {["Live inventory", "Fast checkout", "Order tracking", "Operations"].map((item) => (
                <div key={item} className="border-t border-[#183b31]/18 pt-2 text-[8px] font-medium text-[#183b31]/65 sm:text-[9px]">{item}</div>
              ))}
            </div>
          </div>
          <div className="relative mx-auto h-[320px] w-[150px] rounded-[30px] border-[7px] border-[#1b211f] bg-[#f8f5ee] p-3 shadow-[0_28px_45px_-24px_rgba(20,35,29,.6)] sm:w-[170px]">
            <div className="mx-auto h-1.5 w-12 rounded-full bg-[#1b211f]" />
            <div className="mt-5 text-[8px] text-black/40">Good afternoon</div>
            <div className="mt-1 text-sm font-semibold text-[#183b31]">What do you need?</div>
            <div className="mt-3 h-8 rounded-full bg-black/5" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {["#efc75e", "#b9583f", "#6d8b60", "#d8c5a3"].map((color, index) => (
                <div key={color} className="rounded-xl bg-white p-1.5 shadow-sm">
                  <div className="h-14 rounded-lg" style={{ backgroundColor: color }} />
                  <div className="mt-1.5 h-1.5 w-10 rounded-full bg-black/10" />
                  <div className="mt-1 h-1.5 w-6 rounded-full bg-black/6" />
                  {index === 0 && <span className="sr-only">Featured product</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function ProjectVisual({ kind }: { kind: VisualKind }) {
  if (kind === "booking") return <BookingVisual />;
  if (kind === "publishing") return <PublishingVisual />;
  return <CommerceVisual />;
}

function ProjectLink({ project }: { project: CaseStudy }) {
  const href = project.liveUrl ?? "#contact";
  return (
    <a
      href={href}
      target={project.liveUrl ? "_blank" : undefined}
      rel={project.liveUrl ? "noreferrer" : undefined}
      className="group inline-flex items-center gap-2 text-[13px] font-semibold text-[#171918] no-underline transition-colors hover:text-[#91432e]"
    >
      {project.liveLabel}
      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export function Work() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = CASES[activeIndex];

  return (
    <section
      id="work"
      data-header-theme="light"
      className="relative isolate overflow-hidden bg-[#efeae2] py-24 text-[#171918] sm:py-32 lg:py-40"
      style={{ scrollMarginTop: 96 }}
    >
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full border border-black/6" />
      <div className="pointer-events-none absolute -right-6 top-24 h-48 w-48 rounded-full border border-[#c9785a]/18" />
      <div className="container-page relative z-10">
        <div className="grid gap-8 border-b border-black/12 pb-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:pb-14">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#91432e]">
              <span className="h-px w-9 bg-[#c9785a]" /> Selected work
            </div>
            <h2 className="mt-5 max-w-[760px] text-[clamp(2.5rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.055em] text-[#171918]">
              Products shaped by the work behind them.
            </h2>
          </div>
          <p className="max-w-[470px] text-[15px] leading-[1.75] text-[#5f625f] lg:justify-self-end lg:pb-1">
            Each engagement starts with the operating reality: the customers,
            decisions and constraints the software needs to serve.
          </p>
        </div>

        <div className="mt-12 hidden grid-cols-[.86fr_1.14fr] gap-12 lg:grid xl:gap-20">
          <div className="border-t border-black/12">
            {CASES.map((project, index) => {
              const active = activeIndex === index;
              return (
                <button
                  key={project.name}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={active}
                  className="group grid w-full cursor-pointer grid-cols-[34px_1fr_auto] items-start gap-4 border-b border-black/12 bg-transparent py-7 text-left"
                >
                  <span className={`font-mono text-[10px] transition-colors ${active ? "text-[#91432e]" : "text-black/30"}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className={`block font-serif text-[clamp(1.75rem,3vw,3.6rem)] leading-[0.94] tracking-[-0.04em] transition-colors ${active ? "text-[#171918]" : "text-black/28 group-hover:text-black/55"}`}>
                      {project.name}
                    </span>
                    <span className={`mt-3 block max-w-[390px] text-[13px] leading-[1.65] transition-all ${active ? "translate-y-0 text-[#60635f] opacity-100" : "-translate-y-1 text-black/35 opacity-0"}`}>
                      {project.summary}
                    </span>
                  </span>
                  <span className={`mt-1 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.18em] transition-colors ${active ? "text-[#91432e]" : "text-black/28"}`}>
                    {project.industry}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="sticky top-28 self-start">
            <div key={activeProject.name} className="work-preview-in rounded-[28px] bg-[#dcd5cb] p-4 sm:p-6">
              <ProjectVisual kind={activeProject.visual} />
            </div>
            <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-6">
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/38">Platform</div>
                <div className="mt-1.5 text-[13px] font-medium text-[#3f433f]">{activeProject.platform}</div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeProject.capabilities.map((capability) => (
                    <span key={capability} className="rounded-full border border-black/12 px-2.5 py-1 text-[9px] text-black/52">{capability}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="mb-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#91432e]">{activeProject.status}</div>
                <ProjectLink project={activeProject} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-12 lg:hidden">
          {CASES.map((project, index) => (
            <article key={project.name}>
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] text-[#91432e]">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 font-serif text-3xl tracking-[-0.035em] text-[#171918]">{project.name}</h3>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/45">{project.industry}</span>
              </div>
              <div className="rounded-[22px] bg-[#dcd5cb] p-2.5 sm:p-4">
                <ProjectVisual kind={project.visual} />
              </div>
              <p className="mt-5 text-[14px] leading-[1.7] text-[#60635f]">{project.summary}</p>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#91432e]">{project.status}</span>
                <ProjectLink project={project} />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 border-t border-black/10 pt-5 text-[11px] leading-relaxed text-black/42">
          Project specifics are abbreviated where client agreements require it. No unverified performance claims are shown.
        </p>
      </div>
    </section>
  );
}
