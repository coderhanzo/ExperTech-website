import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AccentItalic, ArrowRight, SectionHeading } from "./primitives";

const TEAM = [
  {
    name: "Rainer Werner Bielert",
    role: "Founder & Backend Engineer",
    bio: "Product-minded backend engineer with fifteen years across platform architecture, infrastructure, and AI systems. Leads technical direction and client delivery.",
    initials: "RB",
  },
  {
    name: "Nathaniel Anum Adjei",
    role: "Engineering Lead, Fullstack Web",
    bio: "Fullstack engineer focused on distributed systems, React applications, and pragmatic migrations. Turns ambiguous product needs into reliable production software.",
    initials: "NA",
  },
  {
    name: "Ignatius Kofi Bampo",
    role: "Engineering Lead, Mobile",
    bio: "Mobile and frontend engineer with a sharp eye for accessible interfaces, design systems, and fast user experiences across web and native surfaces.",
    initials: "IB",
  },
  {
    name: "Naisba Awini",
    role: "Finance & Operations Lead",
    bio: "Keeps delivery, planning, and commercial operations clear. Builds the operating rhythm that lets the engineering team stay focused on shipping well.",
    initials: "NA",
  },
] as const;

export function Team() {
  const [index, setIndex] = useState(0);
  const count = TEAM.length;

  const goTo = (i: number) => setIndex((i + count) % count);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  return (
    <section
      id="team"
      className="border-t border-line-soft bg-surface py-20 md:py-28 xl:py-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="The team"
          title={
            <>
              The people <AccentItalic>behind the code</AccentItalic>.
            </>
          }
          description="A small senior team. No rotating juniors, no proxy account managers — the people you meet are the people who ship."
        />

        <div className="mt-12">
          <div
            className="relative mx-auto max-w-190"
            role="region"
            aria-roledescription="carousel"
            aria-label="Team members"
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {TEAM.map((member, i) => (
                  <article
                    key={member.name}
                    className="w-full shrink-0 grow-0 basis-full"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${count}`}
                    aria-hidden={i !== index}
                  >
                    <div className="card-hover flex flex-col rounded-2xl border border-line-soft bg-canvas px-8 pt-8 pb-9 md:px-10 md:pt-10 md:pb-11">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/25 bg-canvas-soft text-[15px] font-medium tracking-[-0.02em] text-accent">
                        {member.initials}
                      </div>

                      <h3 className="mt-7 font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.015em] text-ink">
                        {member.name}
                      </h3>

                      <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                        {member.role}
                      </p>

                      <div className="hairline mt-5" />

                      <p className="mt-5 text-[15px] leading-[1.65] text-muted">
                        {member.bio}
                      </p>

                      <a
                        href="#contact"
                        className="group mt-7 inline-flex w-fit items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted no-underline transition-colors duration-200 hover:text-accent"
                      >
                        Get in touch
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous team member"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line-soft bg-canvas text-ink transition-colors duration-200 hover:border-accent/45 hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Select team member"
            >
              {TEAM.map((member, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={member.name}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show ${member.name}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 cursor-pointer rounded-full border-none p-0 transition-all duration-200 ${
                      isActive
                        ? "w-8 bg-accent"
                        : "w-1.5 bg-line-soft hover:bg-ink/30"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next team member"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-line-soft bg-canvas text-ink transition-colors duration-200 hover:border-accent/45 hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
