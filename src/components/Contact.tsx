import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowUpRight, Check, Mail, MessageCircle } from "lucide-react";
import { site } from "../data/site";
import { getAttribution, trackEvent } from "../lib/analytics";

const EMPTY = { projectType: "", description: "", budget: "", timeline: "", name: "", email: "", company: "" };
const STORAGE_KEY = "neuraforge_project_enquiry";

function readDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return Object.fromEntries(Object.entries(EMPTY).map(([key, value]) => [key, typeof draft?.[key] === "string" ? draft[key] : value])) as typeof EMPTY;
  } catch { return EMPTY; }
}

export function Contact() {
  const [values, setValues] = useState(readDraft);
  const [error, setError] = useState("");
  const [state, send] = useForm(site.formId);
  const attribution = useMemo(() => getAttribution(), []);
  const started = useRef(false);
  const tracked = useRef(false);
  useEffect(() => {
    try {
      if (state.succeeded) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch { /* Drafts are optional when browser storage is unavailable. */ }
    if (state.succeeded && !tracked.current) {
      tracked.current = true;
      trackEvent(values.projectType === "Product access / demo" ? "product_waitlist_joined" : "project_enquiry_submitted", { project_type: values.projectType, budget: values.budget, timeline: values.timeline, source: attribution.utm_source });
    }
  }, [values, state.succeeded, attribution]);
  const update = (field: keyof typeof EMPTY, value: string) => setValues((current) => ({ ...current, [field]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!values.name.trim() || values.description.trim().length < 20) {
      setError("Please add your name and at least 20 characters about your project.");
      return;
    }
    setError("");
    try {
      await send({ name: values.name.trim(), email: values.email.trim(), company: values.company.trim(), message: values.description.trim(), project_type: values.projectType, budget: values.budget, timeline: values.timeline, lead_type: values.projectType === "Product access / demo" ? "product" : "service", _subject: "New project enquiry — NeuraForge Systems", ...attribution });
    } catch { setError("We couldn’t send your enquiry. Please try again, or email us directly."); }
  }
  return <section id="contact" className="contact-section section"><div className="wrap contact-layout">
    <div className="contact-intro reveal"><h2>What are you<br />working on?</h2><p>A new idea, a growing business, or a system that could work better. Let’s start there.</p><div className="contact-links"><a href={`mailto:${site.email}`} onClick={() => trackEvent("email_click")}><Mail size={20} /><span><small>Email us</small>{site.email}</span><ArrowUpRight size={18} /></a><a href={site.whatsapp} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click")}><MessageCircle size={20} /><span><small>Chat on WhatsApp</small>{site.phone}</span><ArrowUpRight size={18} /></a></div><p className="contact-note">Based in Accra.<br />Good conversations travel well.</p></div>
    <div className="enquiry-form reveal">{state.succeeded ? <div className="form-success" role="status"><span><Check size={28} /></span><h3>You’re on our radar.</h3><p>Thanks for sharing your project. We’ll review your enquiry and reply within two business days.</p><a href="#work" className="text-link">Explore our work <ArrowUpRight size={18} /></a></div> : <form onSubmit={submit} aria-busy={state.submitting} onFocus={() => { if (!started.current) { started.current = true; trackEvent("project_enquiry_started", { source: attribution.utm_source, landing_page: attribution.landing_page }); } }}>
      <h3>Tell us a little about it.</h3><p>Your progress is saved on this device.</p>
      <div className="form-grid"><label>Your name<input name="name" autoComplete="name" required maxLength={150} placeholder="Alex Mensah" value={values.name} onChange={(event) => update("name", event.target.value)} /></label><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" value={values.email} onChange={(event) => update("email", event.target.value)} /></label>
      <label className="full-width">Company <span>(optional)</span><input name="company" autoComplete="organization" maxLength={200} placeholder="Your company or organisation" value={values.company} onChange={(event) => update("company", event.target.value)} /></label>
      <label className="full-width">What do you have in mind?<select name="project_type" required value={values.projectType} onChange={(event) => update("projectType", event.target.value)}><option value="" disabled>Select a project type</option>{["Website / web application", "Mobile application", "Business system", "Ecommerce platform", "AI / automation", "Improve an existing system", "Product access / demo", "Not sure yet"].map((type) => <option key={type}>{type}</option>)}</select></label>
      <label>Indicative budget<select name="budget" required value={values.budget} onChange={(event) => update("budget", event.target.value)}><option value="" disabled>Select a range</option>{["Under $10k", "$10k–$25k", "$25k–$50k", "$50k+", "Not defined yet"].map((budget) => <option key={budget}>{budget}</option>)}</select></label><label>Timeline<select name="timeline" required value={values.timeline} onChange={(event) => update("timeline", event.target.value)}><option value="" disabled>Select a timeline</option>{["As soon as practical", "Within 3 months", "3–6 months", "6+ months", "Exploring"].map((timeline) => <option key={timeline}>{timeline}</option>)}</select></label>
      <label className="full-width">A little about your project<textarea name="message" rows={4} required minLength={20} maxLength={4000} placeholder="What are you hoping to build or improve?" value={values.description} onChange={(event) => update("description", event.target.value)} /></label></div>
      <ValidationError errors={state.errors} className="form-error" />{error && <p className="form-error" role="alert">{error}</p>}<div className="form-submit"><span>Just a conversation.<br />No commitment.</span><button type="submit" disabled={state.submitting} className="button">{state.submitting ? "Sending…" : "Send your enquiry"}<ArrowUpRight size={18} /></button></div>
    </form>}</div>
  </div></section>;
}
