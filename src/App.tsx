import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { StackSection } from "./components/StackSection";
import { Story } from "./components/Story";
import { Services } from "./components/Services";
import { Work } from "./components/Work";
import { Process } from "./components/Process";
import { WhyUs } from "./components/WhyUs";
import { FeaturedOffering } from "./components/FeaturedOffering";
import { Testimonials } from "./components/Testimonials";
import { Team } from "./components/Team";
import { FAQ } from "./components/FAQ";
import { Contact } from "./components/Contact";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

const SECTION_IDS = [
  "hero",
  "story",
  "services",
  "work",
  "process",
  "why-us",
  "featured-offering",
  "testimonials",
  "team",
  "faq",
  "contact",
  "final-cta",
] as const;

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const observers = ids
      .map((id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActive(id);
          },
          { rootMargin: "-30% 0px -60% 0px" },
        );
        obs.observe(el);
        return obs;
      })
      .filter((o): o is IntersectionObserver => o !== null);
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

export default function App() {
  const active = useScrollSpy(SECTION_IDS);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <Header activeSection={active} />
      <main id="main">
        <Hero />
        <StackSection />
        <Story />
        <Services />
        <Work />
        <Process />
        <WhyUs />
        <FeaturedOffering />
        <Testimonials />
        <Team />
        <FAQ />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
