import { useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { Work } from "./components/Work";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { Story } from "./components/Story";
import { Solutions } from "./components/Solutions";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".parallax-gradient");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      sections.forEach((section) => {
        if (motion.matches) {
          section.style.removeProperty("--parallax-y");
          return;
        }
        const bounds = section.getBoundingClientRect();
        if (bounds.bottom < 0 || bounds.top > innerHeight) return;
        const offset = (innerHeight / 2 - bounds.top - bounds.height / 2) * .18;
        section.style.setProperty("--parallax-y", `${Math.max(-110, Math.min(110, offset))}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Header />
    <main id="main" tabIndex={-1}>
      <Hero /><TrustStrip /><Work /><Process /><Services /><Story /><Solutions /><FAQ /><Contact />
    </main>
    <Footer />
  </>;
}
