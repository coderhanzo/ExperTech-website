import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./primitives";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "story", label: "Story" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "team", label: "Team" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
] as const;

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMobileOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-line-soft bg-canvas/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-17 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-accent transition-all duration-300 ${
                      isActive ? "w-4 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="hidden h-9 cursor-pointer items-center rounded-full bg-accent px-4.5 text-[13px] font-medium text-white no-underline shadow-[0_10px_20px_-16px_rgba(183,80,45,0.75)] transition-colors duration-200 hover:bg-accent-hover active:scale-[0.98] md:inline-flex"
          >
            Start a project
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line-soft text-ink-soft transition-colors duration-200 hover:border-ink/40 hover:text-ink md:hidden"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="menu-in fixed inset-0 z-50 bg-canvas md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          <div className="container-page flex h-17 items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line-soft text-ink-soft transition-colors duration-200 hover:border-ink/40 hover:text-ink"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <nav
            aria-label="Primary mobile"
            className="container-page flex flex-col gap-1 pt-6"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl border px-5 py-4 text-base font-medium no-underline transition-colors duration-200 ${
                    isActive
                      ? "border-ink/30 bg-canvas-soft text-ink"
                      : "border-line-soft bg-surface text-ink hover:border-ink/30"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-accent px-7 text-[15px] font-medium text-white no-underline transition-colors duration-200 hover:bg-accent-hover active:scale-[0.98]"
            >
              Start a project
            </a>
          </nav>
        </div>
      )}

      <div className="h-17" aria-hidden />
    </>
  );
}
