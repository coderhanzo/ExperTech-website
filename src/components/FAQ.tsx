import { Plus } from "lucide-react";
import { faqs } from "../data/site";
export function FAQ() {
  return <section id="faq" className="section parallax-gradient"><div className="wrap faq-layout"><div className="faq-intro reveal"><h2>A few things<br />you might ask.</h2><p>Clear answers before we get started.</p><a href="#contact" className="text-link">Ask us something else <span aria-hidden="true">↗</span></a></div><div className="faq-list reveal">{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<Plus size={19} /></summary><p>{faq.answer}</p></details>)}</div></div></section>;
}
