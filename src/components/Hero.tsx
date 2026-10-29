import { ArrowDown, ArrowRight, ArrowUpRight, Globe2 } from "lucide-react";

export function Hero() {
  return <section id="hero" className="hero" aria-labelledby="hero-heading">
    <img className="hero-art" src="/media/neuraforge-hero.png" alt="" width="1672" height="941" />
    <div className="hero-scrim" aria-hidden="true" />
    <div className="wrap hero-inner">
      <div className="hero-copy">
        <h1 id="hero-heading" className="enter">Your next idea.<br />Built to work.</h1>
        <p className="hero-description enter">Websites, apps and business systems, built around the people who use them. From first conversation to launch and beyond.</p>
        <div className="hero-actions enter"><a className="button" href="#contact">Let’s build your idea <ArrowUpRight size={19} aria-hidden="true" /></a><a className="hero-work-link" href="#work">Explore our work <ArrowRight size={19} aria-hidden="true" /></a></div>
        <p className="hero-assurance enter">Thoughtful engineering. A team in your corner.</p>
      </div>
      <div className="hero-bottom enter">
        <p className="hero-location"><Globe2 size={19} aria-hidden="true" /><span>From Accra. Built for anywhere.</span></p>
        <p className="hero-capabilities"><span>Web & mobile</span><span>Business systems</span><span>AI & automation</span></p>
        <a href="#process" className="discover">How we build <ArrowDown size={17} aria-hidden="true" /></a>
      </div>
    </div>
  </section>;
}
