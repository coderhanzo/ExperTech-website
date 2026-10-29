import { useState } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronDown, Plus, Search, ShoppingBag } from "lucide-react";
import { projects } from "../data/site";
import { trackEvent } from "../lib/analytics";

function ProjectPreview({ kind }: { kind: typeof projects[number]["kind"] }) {
  return <div className={`project-preview preview-${kind}`} data-ui>
    <div className="preview-toolbar"><span /><span /><span /><small>Interface concept</small></div>
    {kind === "booking" ? <div className="booking-ui">
      <aside><strong>cbk.</strong><span className="selected">Overview</span><span>Appointments</span><span>Customers</span><span>Products</span><span>Team</span><span className="sidebar-bottom">Your day, connected.</span></aside>
      <div className="booking-main"><div className="ui-topline"><span>Good morning, CBK <span aria-hidden="true">+</span></span><CalendarDays size={16} /></div><p>Here’s how your day is looking.</p><div className="ui-stats"><div><small>Appointments</small><strong>12</strong><span>Today’s schedule</span></div><div><small>Returning clients</small><strong>8</strong><span>Familiar faces</span></div><div><small>Available team</small><strong>4</strong><span>Ready for the day</span></div></div><div className="ui-schedule-title"><strong>Upcoming appointments</strong><small>Today <ChevronDown size={10} /></small></div>{[["AB", "Ama Boateng", "Hair styling", "10:00"], ["EO", "Esi Owusu", "Manicure & pedicure", "11:30"], ["KA", "Kofi Asante", "Haircut", "12:00"]].map(([initials, name, service, time]) => <div className="appointment" key={name}><span className="avatar">{initials}</span><span><strong>{name}</strong><small>{service}</small></span><span className="appointment-time">{time}</span><span className="confirmed"><Check size={10} /> Confirmed</span></div>)}</div>
    </div> : kind === "publishing" ? <div className="publishing-ui"><div className="recipe-nav"><strong>Telande</strong><span>Recipes &nbsp; Stories &nbsp; About</span><Search size={15} /></div><div className="recipe-main"><div><small>FROM THE KITCHEN</small><h4>A little taste<br />of home.</h4><p>Recipes to share.<br />Stories to savour.</p><span>Find your next favourite →</span></div><img src="/media/hospitality.webp" alt="Food and hospitality editorial concept" loading="lazy" /></div></div> : <div className="commerce-ui"><div className="shop-nav"><strong>kwirkmart<span>.</span></strong><span><Search size={15} /> Find your everyday essentials</span><ShoppingBag size={18} /></div><div className="shop-banner"><span>Good things.<br /><strong>Right at your door.</strong></span><ShoppingBag size={64} strokeWidth={1} /></div><div className="shop-categories">{["Fresh produce", "Your pantry", "Household"].map((name, index) => <div key={name}><span className={`grocery-art grocery-${index}`} /><strong>{name}</strong><small>Shop the essentials →</small></div>)}</div></div>}
  </div>;
}

export function Work() {
  const [active, setActive] = useState(0);
  return <section id="work" className="section wrap">
    <div className="section-heading reveal"><div><h2>Real work.<br />Everyday impact.</h2><p>Software shaped around the businesses it serves.</p></div><span className="section-note">A selection of our projects <ArrowDownIcon /></span></div>
    <div className="project-rail reveal">{projects.map((project, index) => <article className={`project-panel ${active === index ? "is-open" : ""} panel-${project.color}`} key={project.name}>
      <button className="project-tab" aria-expanded={active === index} aria-controls={`project-${index}`} onClick={() => { setActive(index); trackEvent("case_study_view", { case_study: project.name }); }}><span className="project-initial">{project.name === "CBK Beauty" ? "cbk." : project.name === "Telande" ? "t." : "k."}</span><span className="project-tab-name">{project.name}</span><span className="project-status">{project.status}</span><Plus className="project-plus" size={22} /></button>
      {active === index && <div id={`project-${index}`} className="project-body"><div className="project-description"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.features.map((feature) => <span key={feature}>{feature}</span>)}</div><a href={project.href} target={project.href.startsWith("https") ? "_blank" : undefined} rel={project.href.startsWith("https") ? "noreferrer" : undefined} onClick={() => trackEvent("case_study_demo_click", { case_study: project.name })}>{project.link}<ArrowUpRight size={17} /></a></div><ProjectPreview kind={project.kind} /></div>}
    </article>)}</div>
    <p className="work-footnote reveal">From the first customer interaction to the operations behind it.<br />We build the parts that help a business work better.</p>
  </section>;
}

function ArrowDownIcon() { return <ArrowRight className="down-arrow" size={18} />; }
