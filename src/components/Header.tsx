import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "../data/site";
import { Brand } from "./Brand";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 48);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return <>
    <div className="announcement"><a href="#work">Built around real businesses. Explore our work <ArrowUpRight size={14} /></a></div>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}>
      <div className="wrap header-inner">
        <a href="#hero" aria-label="NeuraForge Systems home" onClick={() => setOpen(false)}><Brand /></a>
        <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="header-actions"><a className="button button-small" href="#contact">Let’s talk <ArrowUpRight size={16} /></a><button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
      </div>
      {open && <nav id="mobile-menu" className="mobile-nav wrap" aria-label="Mobile navigation">{navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={20} /></a>)}<a href="#contact" onClick={() => setOpen(false)}>Start a conversation<ArrowUpRight size={20} /></a></nav>}
    </header>
  </>;
}
