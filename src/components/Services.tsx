import { Boxes, Cpu } from "lucide-react";
import type { ReactNode } from "react";
import {
  AccentItalic,
  ArrowRight,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

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
      className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card-lg)] px-7 pt-8 pb-7 transition-all duration-300 md:px-9 md:pt-10 md:pb-9 ${
        dark
          ? "glass-dark text-ink hover:shadow-[0_30px_60px_-28px_rgba(0,0,0,0.55)]"
          : "glass-card hover:-translate-y-1"
      }`}
    >
      {dark && (
        <GlowOrb
          size={360}
          color="rgba(175, 92, 65, 0.13)"
          className="-bottom-32 -right-24"
        />
      )}
      {dark && <NoiseLayer />}

      <div className="relative z-10 flex items-center gap-3">
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
            dark
              ? "bg-white/10 text-white backdrop-blur"
              : "bg-white/12 text-ink ring-1 ring-white/15 backdrop-blur"
          }`}
        >
          {icon}
        </span>
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.18em] ${
            dark ? "text-white/55" : "text-muted"
          }`}
        >
          {index}
        </span>
      </div>

      <h3
        className={`relative z-10 text-h3 mt-9 font-normal ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h3>

      <p
        className={`relative z-10 mt-4 text-[17px] italic leading-[1.45] ${
          dark ? "text-accent-soft" : "text-accent"
        }`}
      >
        {tagline}
      </p>

      <p
        className={`relative z-10 mt-5 text-[15px] leading-[1.7] ${
          dark ? "text-white/72" : "text-ink-soft"
        }`}
      >
        {description}
      </p>

      <ul className="relative z-10 mt-8 mb-10 flex list-none flex-col gap-3 p-0">
        {capabilities.map((c) => (
          <li
            key={c}
            className={`flex items-start gap-3 text-[14.5px] leading-[1.55] ${
              dark ? "text-white/82" : "text-ink-soft"
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
        className={`relative z-10 mt-auto border-t pt-6 ${
          dark ? "border-white/10" : "border-white/12"
        }`}
      >
        <a
          href={href}
          className={`group/cta inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium no-underline transition-colors duration-200 ${
            dark
              ? "text-ink hover:text-accent-soft"
              : "text-ink hover:text-accent"
          }`}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={520}
        color="rgba(175, 92, 65, 0.09)"
        className="-top-32 -right-20"
      />
      <NoiseLayer />

      <div className="container-page relative z-10">
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
            href="#contact"
            ctaLabel="Talk about studio work"
            icon={<Cpu className="h-5 w-5" aria-hidden />}
            dark
          />
        </div>
      </div>
    </section>
  );
}
