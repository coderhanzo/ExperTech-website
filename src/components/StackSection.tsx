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
    <section className="border-y border-line-soft bg-surface py-16 md:py-20">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.45fr] lg:items-stretch">
          <div className="flex min-h-[360px] flex-col justify-between rounded-[24px] bg-ink p-7 text-white md:p-9">
            <div>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-white">
                <Bot className="h-5 w-5" aria-hidden />
              </div>
              <p className="mt-7 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-soft">
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

            <div className="mt-9 flex flex-wrap gap-2.5">
              {PRINCIPLES.map((principle) => (
                <span
                  key={principle}
                  className="rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[12.5px] font-medium text-white/85"
                >
                  {principle}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {STACK_GROUPS.map(({ title, description, items, Icon }) => (
              <article
                key={title}
                className="flex min-h-[230px] flex-col rounded-[20px] border border-line-soft bg-canvas px-5 py-5 transition duration-200 hover:border-ink/25 hover:bg-canvas-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-accent ring-1 ring-line-soft">
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

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line-soft bg-surface px-2.5 py-1.5 text-[12px] font-medium text-ink-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
