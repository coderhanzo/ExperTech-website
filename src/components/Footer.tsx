import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./primitives";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
];

const SVC_LINKS = [
  { label: "Custom web & SaaS", href: "#services" },
  { label: "Backend & platforms", href: "#services" },
  { label: "AI systems", href: "#services" },
  { label: "Technical audits", href: "#services" },
  { label: "Stacktrace (studio)", href: "#featured-offering" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "GitHub", href: "#", Icon: Github },
  { label: "X / Twitter", href: "#", Icon: Twitter },
];

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-canvas">
      <div className="container-page py-16">
        <div className="grid gap-10 md:grid-cols-[5fr_3fr_4fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[320px] text-[14.5px] leading-[1.65] text-muted">
              An independent software studio building web platforms, SaaS
              products, and AI systems for companies that take their software
              seriously.
            </p>
            <div className="mt-6 flex gap-2">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line-soft bg-surface text-muted no-underline transition-colors duration-200 hover:border-ink/40 hover:bg-canvas-soft hover:text-ink"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              Navigation
            </div>
            <ul className="mt-5 flex list-none flex-col gap-3 p-0">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-soft no-underline transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              What we build
            </div>
            <ul className="mt-5 flex list-none flex-col gap-3 p-0">
              {SVC_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-ink-soft no-underline transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-15 flex flex-wrap justify-between gap-3 border-t border-line-soft pt-7 text-xs text-muted">
          <span>
            © {new Date().getFullYear()} ExperTech Solutions. All rights reserved.
          </span>
          <span>Accra · Ghana · Remote worldwide</span>
        </div>
      </div>
    </footer>
  );
}
