import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navigation, site } from "../data/site";
import { Brand } from "./Brand";

export function Footer() {
  return <footer className="site-footer"><div className="wrap"><div className="footer-top"><div><a href="#hero" aria-label="NeuraForge Systems home"><Brand /></a><p>Useful software.<br />Built around real life.</p></div><nav aria-label="Footer navigation">{navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}<a href="#faq">FAQs</a></nav><address><span>Start a conversation</span><a href={`mailto:${site.email}`}>{site.email}<ArrowUpRight size={16} /></a><a href={site.whatsapp} target="_blank" rel="noreferrer">{site.phone}<ArrowUpRight size={16} /></a><span>{site.location} · Working worldwide</span></address></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {site.name} {site.suffix}</span><a href="#hero">Back to the top <ArrowUp size={15} /></a></div><div className="footer-wordmark" aria-hidden="true">{site.name}</div></div></footer>;
}
