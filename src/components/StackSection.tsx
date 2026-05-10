import {
  Bot,
  BrainCircuit,
  CloudCog,
  Code,
  Database,
  Gauge,
  Server,
  type LucideIcon,
} from "lucide-react";
import { GlassCard, GlowOrb, NoiseLayer } from "./primitives";

const STACK_GROUPS: Array<{
  title: string;
  description: string;
  items: string[];
  Icon: LucideIcon;
}> = [
  {
    title: "Product frontends",
    description: "Interfaces that stay fast as workflows get more complex.",
    items: ["React", "Next.js", "TypeScript", "Design systems"],
    Icon: Code,
  },
  {
    title: "Application backends",
    description: "APIs, jobs, and services built for maintainable change.",
    items: ["Node.js", "Python", "Go", "REST & GraphQL"],
    Icon: Server,
  },
  {
    title: "Data foundations",
    description: "Schemas, pipelines, search, and reporting with clear ownership.",
    items: ["PostgreSQL", "Redis", "Analytics", "Data pipelines"],
    Icon: Database,
  },
  {
    title: "Cloud operations",
    description: "Deployment, observability, and infrastructure that teams can run.",
    items: ["AWS", "GCP", "Azure", "Kubernetes"],
    Icon: CloudCog,
  },
  {
    title: "AI systems",
    description: "Assistants and retrieval systems wired into real product workflows.",
    items: ["RAG", "Agents", "Evals", "Internal tools"],
    Icon: BrainCircuit,
  },
  {
    title: "Performance craft",
    description: "Measured improvements across load time, cost, and reliability.",
    items: ["Profiling", "Caching", "Testing", "Observability"],
    Icon: Gauge,
  },
];

const PRINCIPLES = ["Typed contracts", "Operational visibility", "Portable architecture"];

export function StackSection() {
  return (
    <section className="relative isolate overflow-hidden section-pad-md" aria-label="Our stack">
      <GlowOrb
        size={520}
        color="rgba(120, 190, 195, 0.22)"
        className="-top-40 left-1/4"
      />
      <NoiseLayer />
      <div className="container-page relative z-10">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.4fr] lg:items-stretch">
          <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[var(--radius-card-lg)] glass-dark p-7 md:p-9">
            <GlowOrb
              size={420}
              color="rgba(224, 255, 79, 0.13)"
              className="-bottom-32 -left-20"
            />
            <NoiseLayer />
            <div className="relative z-10">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-canvas shadow-[var(--shadow-pop)]">
                <Bot className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.2em] text-accent-soft">
                Core stack
              </p>
              <h2 className="text-h2 mt-4 text-white">
                A practical toolchain for durable software.
              </h2>
              <p className="mt-5 text-[15.5px] leading-[1.75] text-white/70">
                We keep the stack familiar on purpose: proven tools, typed
                boundaries, clean handoffs, and enough operational depth to run
                what we ship.
              </p>
            </div>

            <div className="relative z-10 mt-9 flex flex-wrap gap-2">
              {PRINCIPLES.map((principle) => (
                <span
                  key={principle}
                  className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[12.5px] font-medium text-white/85 backdrop-blur"
                >
                  {principle}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {STACK_GROUPS.map(({ title, description, items, Icon }) => (
              <GlassCard
                key={title}
                as="article"
                interactive
                className="flex min-h-[230px] flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-accent ring-1 ring-white/15 backdrop-blur">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden />
                </div>

                <h3 className="mt-5 text-[22px] leading-[1.16] text-ink">
                  {title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-muted">
                  {description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/10 px-2.5 py-1 text-[12px] font-medium text-ink-soft backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
