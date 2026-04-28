import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AccentItalic, SectionHeading } from "./primitives";

const FAQS = [
  {
    q: "How long does a typical engagement take?",
    a: "Most engagements run 8 to 16 weeks from kickoff to the first production release, depending on scope. We'll give you an honest range after the two-week Discover phase — not before.",
  },
  {
    q: "Do you work with early-stage startups, or only scale-ups?",
    a: "Both. We work with pre-seed founders who need an engineering partner to get to a usable product, and with later-stage companies that need senior capacity for a focused initiative. What we don't do is staff augmentation for features we don't believe in.",
  },
  {
    q: "How do you price your work?",
    a: "Fixed monthly retainer based on team shape and duration. No per-hour timesheets, no change-order theatre. We'd rather write the right thing slowly than the wrong thing on budget.",
  },
  {
    q: "What happens after the project ships?",
    a: "You own the code and the infrastructure. We offer optional retainers for on-call, hardening, and future phases — but every engagement is designed so your team can operate without us from day one.",
  },
  {
    q: "Do you work remotely or on-site?",
    a: "Fully remote by default, with async-first collaboration across time zones. We'll travel on-site for kickoffs, critical workshops, or incident response when it genuinely helps.",
  },
  {
    q: "Can you work within our existing stack?",
    a: "Yes. We have strong preferences, but we're pragmatic — if your team has shipped a Rails monolith for ten years and it works, we're not going to suggest a rewrite for its own sake.",
  },
] as const;

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="bg-canvas pt-4 pb-20 md:pt-8 md:pb-28 xl:pb-36"
      style={{ scrollMarginTop: 68 }}
    >
      <div className="container-page grid gap-12 md:grid-cols-[5fr_7fr]">
        <SectionHeading
          eyebrow="Frequently asked"
          title={
            <>
              The <AccentItalic>honest</AccentItalic> questions first.
            </>
          }
          description="The things prospective clients actually ask us. If yours isn't here, send it — we'll answer plainly."
        />

        <div className="border-t border-line-soft">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-line-soft">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left text-[15px] font-medium transition-colors duration-200 ${
                    isOpen ? "text-ink" : "text-ink hover:text-accent"
                  }`}
                >
                  <span>{f.q}</span>
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "border-ink bg-ink text-canvas"
                        : "border-line-soft text-muted"
                    }`}
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden
                    />
                  </span>
                </button>
                <div
                  id={`faq-${i}`}
                  role="region"
                  className="accordion-content"
                  data-state={isOpen ? "open" : "closed"}
                  aria-hidden={!isOpen}
                >
                  <div>
                    <p className="pb-5 pr-10 text-[15px] leading-[1.65] text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
