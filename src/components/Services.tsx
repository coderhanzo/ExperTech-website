import { Boxes, Cpu } from "lucide-react";
import type { ReactNode } from "react";
import { AccentItalic, ArrowRight, SectionHeading } from "./primitives";

const CLIENT_CAPS = [
  "Custom web applications & SaaS platforms",
  "API design, backend systems & data pipelines",
  "Cloud architecture on AWS, GCP, and Azure",
  "AI integration, RAG systems & internal tooling",
  "Mobile apps with React Native & native bridges",
  "Performance, observability & technical audits",
];

const STUDIO_CAPS = [
  "Design systems & component libraries",
  "Developer platforms & internal SDKs",
  "Workflow automation & AI agents",
  "Open-source tooling & technical R&D",
  "Reusable ingestion and eval infrastructure",
  "Playbooks for teams scaling past 20 engineers",
];

interface ServiceCardProps {
  index: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  href: string;
  ctaLabel: string;
  icon: ReactNode;
  dark?: boolean;
}

function ServiceCard({
  index,
  title,
  tagline,
  description,
  capabilities,
  href,
  ctaLabel,
  icon,
  dark = false,
}: ServiceCardProps) {
  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[24px] px-7 pt-7 pb-7 transition-shadow duration-300 md:px-9 md:pt-9 md:pb-8 ${
        dark
          ? "border border-[#2c241d] bg-[#17130f] text-canvas hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]"
          : "border border-line-soft bg-surface text-ink hover:shadow-[0_18px_32px_-24px_rgba(20,19,15,0.18)]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
            dark ? "bg-white/10 text-white" : "bg-canvas-soft text-ink"
          }`}
        >
          {icon}
        </span>
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.16em] ${
            dark ? "text-white/50" : "text-muted"
          }`}
        >
          {index}
        </span>
      </div>

      <h3
        className={`text-h3 mt-10 font-normal ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h3>

      <p
        className={`mt-4 text-[17px] italic leading-[1.45] ${
          dark ? "text-[#ffd8ca]" : "text-accent"
        }`}
      >
        {tagline}
      </p>

      <p
        className={`mt-5 text-[15px] leading-[1.7] ${
          dark ? "text-white/72" : "text-muted"
        }`}
      >
        {description}
      </p>

      <ul className="mt-8 mb-10 flex list-none flex-col gap-3.5 p-0">
        {capabilities.map((c) => (
          <li
            key={c}
            className={`flex items-start gap-3 text-sm leading-[1.45] ${
              dark ? "text-white/85" : "text-ink-soft"
            }`}
          >
            <span
              aria-hidden
              className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                dark ? "bg-accent-soft" : "bg-accent"
              }`}
            />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      <div
        className={`mt-auto border-t pt-6 ${
          dark ? "border-white/10" : "border-line-soft"
        }`}
      >
        <a
          href={href}
          className={`group inline-flex cursor-pointer items-center gap-2 text-sm font-medium no-underline transition-colors duration-200 ${
            dark
              ? "text-canvas hover:text-accent-soft"
              : "text-ink hover:text-accent"
          }`}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="border-t border-line-soft bg-canvas py-20 md:py-28 xl:py-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Two practices,
              <br />
              one standard of <AccentItalic>craft</AccentItalic>.
            </>
          }
          description="We split our work into client engagements and in-house product R&D. Both pull from the same engineering bench — which keeps the thinking sharp on either side."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <ServiceCard
            index="01"
            title="Client engagements"
            tagline="You have a roadmap. We ship it."
            description="End-to-end product engineering for companies that need a trusted outside team. We embed quickly, move with your cadence, and leave behind documentation, tests, and systems your team can own."
            capabilities={CLIENT_CAPS}
            href="#contact"
            ctaLabel="Brief us on your project"
            icon={<Boxes className="h-5 w-5" aria-hidden />}
          />
          <ServiceCard
            index="02"
            title="Studio & platforms"
            tagline="We build what we wish existed."
            description="Our internal practice funds focused R&D: developer platforms, AI tooling, and infrastructure patterns we spin out as products or offer to clients as battle-tested starting points."
            capabilities={STUDIO_CAPS}
            href="#featured-offering"
            ctaLabel="Explore Stacktrace"
            icon={<Cpu className="h-5 w-5" aria-hidden />}
            dark
          />
        </div>
      </div>
    </section>
  );
}
