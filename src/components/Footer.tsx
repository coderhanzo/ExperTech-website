// import { useState, type FormEvent } from "react"; // re-enable when newsletter form is uncommented
import { Github, Linkedin, Twitter } from "lucide-react";
import { GlowOrb, NoiseLayer } from "./primitives";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const SVC_LINKS = [
  { label: "Custom web & SaaS", href: "#services" },
  { label: "Backend & platforms", href: "#services" },
  { label: "AI systems", href: "#services" },
  { label: "Technical audits", href: "#services" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "GitHub", href: "#", Icon: Github },
  { label: "X / Twitter", href: "#", Icon: Twitter },
];

export function Footer() {
  // const [submitted, setSubmitted] = useState(false);

  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  // };

  return (
    <footer className="relative isolate overflow-hidden">
      <div className="container-page pt-4 pb-10">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-section)] glass-dark px-7 py-14 md:px-14 md:py-20">
          <GlowOrb
            size={780}
            color="rgba(224, 255, 79, 0.18)"
            className="-bottom-48 -left-40"
          />
          <GlowOrb
            size={520}
            color="rgba(224, 255, 79, 0.10)"
            className="-top-32 right-1/4"
          />
          <NoiseLayer />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            {/* Brand */}
            <div>
              <div className="font-serif text-[34px] leading-[0.95] tracking-[-0.025em] text-ink md:text-[44px]">
                ExperTech
              </div>
              <p className="mt-5 max-w-[320px] text-[14.5px] leading-[1.7] text-ink/65">
                An independent software studio building web platforms, SaaS
                products, and AI systems for companies that take their
                software seriously.
              </p>
              <div className="mt-7 flex gap-2">
                {SOCIAL.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/8 text-ink/70 no-underline backdrop-blur-md transition-colors duration-200 hover:border-white/30 hover:bg-white/15 hover:text-ink"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/45">
                Navigation
              </div>
              <ul className="mt-5 flex list-none flex-col gap-3 p-0">
                {NAV_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14.5px] text-ink/80 no-underline transition-colors duration-200 hover:text-accent-soft"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/45">
                What we build
              </div>
              <ul className="mt-5 flex list-none flex-col gap-3 p-0">
                {SVC_LINKS.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[14.5px] text-ink/80 no-underline transition-colors duration-200 hover:text-accent-soft"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email capture */}
            {/* <div className="text-center lg:text-left">
              <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/45">
                Get notes from the studio
              </div>
              <p className="mx-auto mt-3 max-w-sm text-[14px] leading-[1.65] text-ink/65 lg:mx-0 lg:max-w-none">
                Occasional engineering essays and field notes. No marketing
                drips, no spam.
              </p>
              <form
                onSubmit={onSubmit}
                className="mx-auto mt-5 flex h-12 w-full max-w-sm items-center gap-1 rounded-full border border-white/15 bg-white/8 p-1 backdrop-blur-md lg:mx-0 lg:max-w-none"
              >
                <input
                  type="email"
                  required
                  placeholder="you@studio.com"
                  disabled={submitted}
                  aria-label="Email address"
                  className="h-full flex-1 bg-transparent px-4 text-[14px] text-ink outline-none placeholder:text-ink/40 focus-visible:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitted}
                  className="inline-flex h-full cursor-pointer items-center rounded-full bg-accent px-5 text-[13px] font-medium text-canvas transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitted ? "Subscribed" : "Subscribe"}
                </button>
              </form>
            </div> */}
          </div>

          <div className="relative z-10 mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[12px] text-ink/55">
            <span>
              © {new Date().getFullYear()} ExperTech Solutions. All rights
              reserved.
            </span>
            <span>Accra · Ghana · Remote worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
