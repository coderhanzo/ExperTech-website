import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, MessageCircle, X } from "lucide-react";

const GUIDE_LINKS = [
  {
    label: "I have a project in mind",
    detail: "Start with a focused project brief.",
    href: "#contact",
  },
  {
    label: "Help me choose a service",
    detail: "See the outcomes we can support.",
    href: "#services",
  },
  {
    label: "Show me relevant work",
    detail: "Explore products we have shaped.",
    href: "#work",
  },
] as const;

export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let hasSeenNudge = false;
    try {
      hasSeenNudge = sessionStorage.getItem("neuraforge-guide-seen") === "true";
    } catch {
      hasSeenNudge = false;
    }
    if (hasSeenNudge) return;

    const reveal = window.setTimeout(() => {
      setShowNudge(true);
      try {
        sessionStorage.setItem("neuraforge-guide-seen", "true");
      } catch {
        // The nudge still works when storage is unavailable.
      }
    }, 850);
    const dismiss = window.setTimeout(() => setShowNudge(false), 2900);
    return () => {
      window.clearTimeout(reveal);
      window.clearTimeout(dismiss);
    };
  }, []);

  useEffect(() => {
    const collapseOnScroll = () => {
      if (window.scrollY > 60) setShowNudge(false);
    };
    window.addEventListener("scroll", collapseOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", collapseOnScroll);
  }, []);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSuppressed(entry.isIntersecting);
        if (entry.isIntersecting) setOpen(false);
      },
      { threshold: 0.16 },
    );
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const goTo = () => setOpen(false);

  return (
    <aside
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[45] transition-all duration-300 sm:bottom-6 sm:right-6 ${
        suppressed ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100"
      }`}
      aria-label="Project guide"
    >
      {open && (
        <div
          id="project-guide"
          role="dialog"
          aria-modal="false"
          aria-labelledby="project-guide-title"
          className="assistant-panel-in absolute bottom-[calc(100%+12px)] right-0 w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border border-white/14 bg-[#141716]/95 p-3 text-ink shadow-[0_26px_80px_-28px_rgba(0,0,0,.8)] backdrop-blur-2xl"
        >
          <div className="flex items-start justify-between gap-4 px-2 pb-3 pt-2">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-soft">
                <Compass className="h-3.5 w-3.5" /> Project guide
              </div>
              <h2 id="project-guide-title" className="mt-2 font-serif text-2xl tracking-[-0.03em] text-ink">
                What are you trying to move forward?
              </h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close project guide"
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/7 text-muted transition-colors hover:bg-white/12 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            {GUIDE_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={goTo}
                className="group flex items-center justify-between gap-4 rounded-[16px] border border-transparent bg-white/[0.055] px-4 py-3.5 no-underline transition-colors hover:border-accent/25 hover:bg-white/[0.09]"
              >
                <span>
                  <span className="block text-[13px] font-semibold text-ink">{item.label}</span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-muted">{item.detail}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-accent-soft transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>

          <p className="px-3 pb-1 pt-3 text-[10px] leading-relaxed text-muted-soft">
            Guided navigation for now. A conversational assistant can be added after we select a trusted backend.
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          setShowNudge(false);
          setOpen((current) => !current);
        }}
        aria-expanded={open}
        aria-controls="project-guide"
        aria-label={open ? "Close project guide" : "Open project guide"}
        className={`group ml-auto flex h-14 cursor-pointer items-center justify-end overflow-hidden rounded-full border border-white/14 bg-[#171a19]/94 text-ink shadow-[0_16px_48px_-18px_rgba(0,0,0,.75)] backdrop-blur-xl transition-[width,background-color,transform] duration-300 hover:bg-[#202422] active:scale-[0.97] ${
          showNudge && !open ? "w-[142px]" : "w-14"
        }`}
      >
        <span
          className={`whitespace-nowrap pl-5 text-[12px] font-semibold transition-all duration-200 ${
            showNudge && !open ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
          }`}
        >
          Let’s chat
        </span>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center">
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5 text-accent-soft" />}
        </span>
      </button>
    </aside>
  );
}
