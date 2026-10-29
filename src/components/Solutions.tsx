import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { industries } from "../data/site";

export function Solutions() {
  const [active, setActive] = useState(0);
  const industry = industries[active];
  return <section id="sectors" className="section sectors-section"><div className="wrap"><div className="section-heading reveal"><div><h2>Your industry.<br />Your way of working.</h2><p>Different businesses. Different challenges. Software that fits.</p></div></div><div className="sectors-layout"><div className="sector-options reveal" aria-label="Choose an industry">{industries.map((item, index) => <button key={item.name} className={active === index ? "active" : ""} aria-pressed={active === index} aria-controls="industry-panel" onClick={() => setActive(index)}><span>{item.name}</span><ArrowUpRight size={22} /></button>)}<p>Have a different challenge?<br /><a href="#contact">We’d love to hear about it.</a></p></div><div className="industry-panel reveal" id="industry-panel" aria-live="polite"><img key={industry.image} src={`/media/${industry.image}`} alt={industry.name} loading="lazy" /><div className="industry-scrim" /><div className="industry-copy"><div className="tags">{industry.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h3>{industry.title}</h3><p>{industry.description}</p><a href="#contact">Let’s talk about your business <ArrowUpRight size={18} /></a></div></div></div></div></section>;
}
