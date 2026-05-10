import { useState, type FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import {
  AccentItalic,
  ArrowUpRight,
  GlassCard,
  GlowOrb,
  NoiseLayer,
  SectionHeading,
} from "./primitives";

const PROJECT_TYPES = [
  "Product build",
  "Platform / infra",
  "AI integration / automation",
  "Consultancy / Advisory",
  "Other",
] as const;

type Status = "idle" | "success";

export function Contact() {
  const [type, setType] = useState<(typeof PROJECT_TYPES)[number]>(
    PROJECT_TYPES[0],
  );
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("success");
  };

  const inputClass =
    "w-full rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-200 placeholder:text-muted backdrop-blur focus:border-ink/40 focus-visible:outline-none font-[inherit]";

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden section-pad-md"
      style={{ scrollMarginTop: 96 }}
    >
      <GlowOrb
        size={520}
        color="rgba(224, 255, 79, 0.10)"
        className="-top-24 -right-32"
      />
      <GlowOrb
        size={460}
        color="rgba(120, 190, 195, 0.16)"
        className="-bottom-32 -left-20"
      />
      <NoiseLayer />

      <div className="container-page relative z-10 grid gap-12 md:grid-cols-[5fr_7fr] md:gap-14">
        <div>
          <SectionHeading
            eyebrow="Work with us"
            title={
              <>
                Tell us what you're <AccentItalic>building</AccentItalic>.
              </>
            }
            description="We respond to every serious inquiry within two business days, usually with one or two specific follow-up questions. No sales funnel, no drip campaign."
          />

          <GlassCard className="mt-9 p-6 md:p-7">
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <Mail className="h-4 w-4" aria-hidden />,
                  label: "Email",
                  value: "exper.b.tech@gmail.com",
                },
                {
                  icon: <Phone className="h-4 w-4" aria-hidden />,
                  label: "Phone",
                  value: "+233 54 749 6357",
                },
              ].map((r) => (
                <div key={r.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/12 text-ink-soft backdrop-blur">
                    {r.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
                      {r.label}
                    </div>
                    <div className="mt-1 text-[15px] text-ink-soft">
                      {r.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div>
          <form
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-[var(--radius-card-lg)] glass-card p-7 md:p-9"
          >
            <NoiseLayer />
            <div className="relative z-10 grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-[13px] font-medium text-ink"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  required
                  placeholder="Full name"
                  disabled={status === "success"}
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-1.5 block text-[13px] font-medium text-ink"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="email@gmail.com"
                  disabled={status === "success"}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="contact-company"
                  className="mb-1.5 block text-[13px] font-medium text-ink"
                >
                  Company
                </label>
                <input
                  id="contact-company"
                  placeholder="Company name"
                  disabled={status === "success"}
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <span className="mb-2 block text-[13px] font-medium text-ink">
                  Project type
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PROJECT_TYPES.map((t) => {
                    const selected = type === t;
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setType(t)}
                        aria-pressed={selected}
                        disabled={status === "success"}
                        className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 font-[inherit] disabled:cursor-not-allowed disabled:opacity-60 ${
                          selected
                            ? "border border-ink bg-ink text-canvas"
                            : "border border-white/12 bg-white/10 text-ink-soft backdrop-blur hover:bg-white/18 hover:text-ink"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-4">
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-[13px] font-medium text-ink"
              >
                Tell us about the project
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="What are you building, what's the timeline, and what would success look like?"
                disabled={status === "success"}
                className={`${inputClass} resize-y`}
              />
            </div>

            <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted">
                We reply in less than 48 hours.
              </p>
              <button
                type="submit"
                disabled={status === "success"}
                className="group inline-flex h-12 cursor-pointer items-center gap-1.5 rounded-full border-none bg-ink px-7 text-[15px] font-medium tracking-tight text-canvas shadow-[var(--shadow-pill)] transition-colors duration-200 hover:bg-ink-soft active:scale-[0.98] font-[inherit] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
              >
                {status === "success" ? "Sent" : "Send inquiry"}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-disabled:transform-none" />
              </button>
            </div>

            {status === "success" && (
              <p
                role="status"
                className="relative z-10 mt-4 rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-accent"
              >
                Thanks — we've got it. You'll hear from us within two business
                days.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
