import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./primitives";

const NAV_PRIMARY = [
  { id: "services", label: "Services" },
  { id: "solutions", label: "Solutions" },
  { id: "work", label: "Work" },
  { id: "products", label: "Products" },
] as const;

const NAV_SECONDARY = [
  { id: "about", label: "About" },
] as const;

const NAV_DRAWER_GROUPS: Array<{ label: string; items: ReadonlyArray<{ id: string; label: string }> }> = [
  {
    label: "Explore",
    items: [
      { id: "hero", label: "Home" },
      { id: "services", label: "Services" },
      { id: "solutions", label: "Solutions" },
      { id: "work", label: "Work" },
      { id: "products", label: "Products" },
      { id: "process", label: "Process" },
    ],
  },
  {
    label: "Studio",
    items: [
      { id: "about", label: "About" },
      { id: "why-us", label: "Why NeuraForge" },
    ],
  },
  {
    label: "Connect",
    items: [
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" },
    ],
  },
];

const DESKTOP_LINKS = [...NAV_PRIMARY, ...NAV_SECONDARY];

interface HeaderProps {
  activeSection: string;
}

type HeaderTheme = "dark" | "light";

export function Header({ activeSection }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<HeaderTheme>("dark");
  const [mobileOpen, setMobileOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateHeader = () => {
      setScrolled(window.scrollY > 24);
      const themeOwner = document
        .elementsFromPoint(window.innerWidth / 2, 44)
        .map((element) => element.closest<HTMLElement>("[data-header-theme]"))
        .find((element): element is HTMLElement => element !== null);
      setTheme(themeOwner?.dataset.headerTheme === "light" ? "light" : "dark");
      frame = 0;
    };
    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeader);
    };
    updateHeader();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Return focus to trigger when drawer closes
  useEffect(() => {
    if (!mobileOpen) triggerRef.current?.focus({ preventScroll: true });
  }, [mobileOpen]);

  const isLight = theme === "light";

  return (
    <>
      <header
        data-theme={theme}
        className="fixed inset-x-0 top-3 z-40 transition-all duration-300 md:top-4"
      >
        <div className="container-page">
          {/* Desktop pill */}
          <div
            className={`hidden items-center justify-between gap-3 rounded-full px-2.5 transition-all duration-300 md:flex ${
              scrolled ? "py-1.5" : "py-2"
            } ${
              isLight
                ? "border border-black/10 bg-[#efeae2]/88 shadow-[0_12px_38px_-22px_rgba(30,27,23,.35)] backdrop-blur-2xl"
                : scrolled
                  ? "glass-pill"
                  : "border border-white/12 bg-white/8 backdrop-blur-xl shadow-[var(--shadow-pill)]"
            }`}
          >
            <div className="pl-3">
              <Logo tone={isLight ? "light" : "dark"} />
            </div>

            <nav
              aria-label="Primary"
              className="flex items-center gap-0.5 rounded-full"
            >
              {DESKTOP_LINKS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium no-underline transition-colors duration-200 ${
                      isLight
                        ? isActive
                          ? "bg-black/[0.065] text-[#171918]"
                          : "text-[#5f625f] hover:bg-black/[0.045] hover:text-[#171918]"
                        : isActive
                          ? "bg-white/12 text-ink shadow-[var(--shadow-glass-inner)]"
                          : "text-ink-soft hover:bg-white/8 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 pr-1">
              <a
                href="#contact"
                className={`group inline-flex h-10 cursor-pointer items-center gap-1.5 rounded-full px-5 text-[13.5px] font-medium tracking-tight no-underline shadow-[var(--shadow-pill)] transition-all duration-200 active:scale-[0.98] ${
                  isLight
                    ? "bg-[#171918] text-[#f7f5f0] hover:bg-[#303431]"
                    : "bg-ink text-canvas hover:bg-ink-soft"
                }`}
              >
                Discuss a project
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile pill */}
          <div className={`flex items-center justify-between gap-2 rounded-full border px-2.5 py-2 shadow-[var(--shadow-pill)] backdrop-blur-2xl transition-colors duration-300 md:hidden ${
            isLight
              ? "border-black/10 bg-[#efeae2]/90"
              : "border-white/15 bg-white/10"
          }`}>
            <div className="pl-2">
              <Logo tone={isLight ? "light" : "dark"} />
            </div>
            <div className="flex items-center gap-1.5">
              <a
                href="#contact"
                className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[12.5px] font-medium tracking-tight text-canvas no-underline shadow-[var(--shadow-pill)]"
              >
                Discuss
              </a>
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-200 ${
                  isLight
                    ? "border-black/10 bg-black/[0.045] text-[#303431] hover:bg-black/[0.08]"
                    : "border-white/12 bg-white/10 text-ink-soft hover:bg-white/15 hover:text-ink"
                }`}
              >
                <Menu className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-50 md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          {/* Scrim */}
          <div
            aria-hidden
            className="scrim-in absolute inset-0 bg-canvas-deep/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute inset-x-3 top-3 max-h-[calc(100vh-1.5rem)] overflow-y-auto">
            <div className="drawer-in glass-card rounded-[28px] p-4">
              {/* Drawer top bar */}
              <div className="flex items-center justify-between gap-3 px-2">
                <Logo />
                <div className="flex items-center gap-1.5">
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[12.5px] font-medium tracking-tight text-canvas no-underline shadow-[var(--shadow-pill)]"
                  >
                    Discuss a project
                  </a>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/10 text-ink-soft transition-colors duration-200 hover:bg-white/18 hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>

              <div className="mt-5 px-2 pb-4">
                {NAV_DRAWER_GROUPS.map((group) => (
                  <div key={group.label} className="mt-4 first:mt-0">
                    <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-soft">
                      {group.label}
                    </div>
                    <nav
                      aria-label={group.label}
                      className="mt-2 flex flex-col"
                    >
                      {group.items.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setMobileOpen(false)}
                            className={`flex items-center justify-between rounded-2xl px-2 py-3 font-serif text-[22px] tracking-[-0.01em] no-underline transition-colors duration-200 ${
                              isActive
                                ? "text-accent"
                                : "text-ink hover:text-accent"
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
                    </nav>
                  </div>
                ))}

                <div className="mt-7 border-t border-white/12 pt-5 text-[11px] uppercase tracking-[0.2em] text-muted-soft">
                  Available Q3 2026 · Accra · Remote worldwide
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to offset fixed header */}
      <div className="h-20 md:h-24" aria-hidden />
    </>
  );
}
