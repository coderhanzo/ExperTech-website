import { useState } from "react";
import { ArrowUpRight, Check, Code2, MessagesSquare, Rocket } from "lucide-react";
import { process } from "../data/site";

const icons = [MessagesSquare, Code2, Rocket];
export function Process() {
  const [active, setActive] = useState(0);
  const current = process[active];
  const Icon = icons[active];
  return <section id="process" className="process-section section parallax-gradient">
    <div className="wrap"><div className="process-heading reveal"><h2>A clear path.<br />From idea to everyday.</h2><p>Good software starts with a good conversation.<br />Here’s what happens after that.</p></div>
      <div className="process-layout"><div className="process-orbit reveal"><div className="orbit-line orbit-outer" /><div className="orbit-line orbit-inner" /><div className="orbit-center"><span className="orbit-symbol"><Icon size={37} strokeWidth={1.4} /></span><strong>{current.name}</strong><span>Built together.</span></div>{process.map((step, index) => { const StepIcon = icons[index]; return <button key={step.name} className={`orbit-step step-${index} ${active === index ? "active" : ""}`} aria-pressed={active === index} onClick={() => setActive(index)}><StepIcon size={18} />{step.name}{active === index && <Check size={14} />}</button>; })}<span className="orbit-dot dot-a" /><span className="orbit-dot dot-b" /></div>
      <div className="process-copy reveal" aria-live="polite"><h3>{current.title}</h3><p>{current.description}</p><div className="process-deliverable"><Check size={18} />{current.deliverable}</div><a className="text-link" href="#contact">Start the conversation<ArrowUpRight size={18} /></a></div></div>
    </div>
  </section>;
}
