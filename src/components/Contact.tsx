import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { getAttribution, trackEvent } from "../lib/analytics";
import { AccentItalic, GlassCard, GlowOrb, NoiseLayer, SectionHeading } from "./primitives";

const PROJECT_TYPES = ["Website / web application", "Mobile application", "Business system", "Ecommerce platform", "AI / automation", "Improve an existing system", "Product access / demo", "Not sure yet"] as const;
const BUDGETS = ["Under $10k", "$10k–$25k", "$25k–$50k", "$50k+", "Not defined yet"] as const;
const TIMELINES = ["As soon as practical", "Within 3 months", "3–6 months", "6+ months", "Exploring"] as const;
const STEPS = ["Project", "Context", "Parameters", "Contact"] as const;
const STORAGE_KEY = "neuraforge_project_enquiry";
const FORMSPREE_FORM_ID = "meajgvda";
const WHATSAPP_URL = "https://wa.me/233203758021?text=Hello%20NeuraForge%20Systems%2C%20I%27d%20like%20to%20discuss%20a%20project.";

interface Values { projectType: string; description: string; budget: string; timeline: string; name: string; email: string; company: string; }
interface SubmissionFields {
  name: string;
  email: string;
  company: string;
  message: string;
  project_type: string;
  budget: string;
  timeline: string;
  lead_type: string;
  _subject: string;
  [key: string]: string;
}
const EMPTY: Values = { projectType: "", description: "", budget: "", timeline: "", name: "", email: "", company: "" };

export function Contact() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") ?? EMPTY; }
    catch { return EMPTY; }
  });
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const attribution = useMemo(() => getAttribution(), []);
  const [formState, submitToFormspree] = useForm<SubmissionFields>(FORMSPREE_FORM_ID);
  const trackedSubmission = useRef(false);
  const isProduct = values.projectType === "Product access / demo";

  useEffect(() => { if (!formState.succeeded) localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); }, [values, formState.succeeded]);
  useEffect(() => {
    if (!formState.succeeded || trackedSubmission.current) return;
    trackedSubmission.current = true;
    localStorage.removeItem(STORAGE_KEY);
    trackEvent(isProduct ? "product_waitlist_joined" : "project_enquiry_submitted", {
      project_type: values.projectType,
      budget: values.budget,
      timeline: values.timeline,
      source: attribution.utm_source,
    });
  }, [formState.succeeded, isProduct, values, attribution]);
  useEffect(() => {
    const selectProduct = () => setValues((current) => ({ ...current, projectType: "Product access / demo" }));
    window.addEventListener("neuraforge:product-interest", selectProduct);
    return () => window.removeEventListener("neuraforge:product-interest", selectProduct);
  }, []);

  const update = (field: keyof Values, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const validationMessage = () => {
    if (step === 0 && !values.projectType) return "Choose the closest project type to continue.";
    if (step === 1 && values.description.trim().length < 20) return "Add a little more context so the first conversation can be useful.";
    if (step === 2 && (!values.budget || !values.timeline)) return "Select a budget range and timing. ‘Not defined’ and ‘Exploring’ are valid answers.";
    if (step === 3 && (!values.name.trim() || !/^\S+@\S+\.\S+$/.test(values.email))) return "Enter your name and a valid email address.";
    return "";
  };
  const focusWizard = () => requestAnimationFrame(() => document.getElementById("enquiry-wizard")?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  const next = () => {
    const error = validationMessage();
    if (error) { setMessage(error); return; }
    if (!started) { setStarted(true); trackEvent("project_enquiry_started", { source: attribution.utm_source, landing_page: attribution.landing_page }); }
    trackEvent("project_enquiry_step_completed", { step: step + 1, project_type: values.projectType });
    setMessage(""); setStep((current) => Math.min(current + 1, STEPS.length - 1)); focusWizard();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validationMessage();
    if (error) { setMessage(error); return; }
    setMessage("");
    await submitToFormspree({
      name: values.name,
      email: values.email,
      company: values.company,
      message: values.description,
      project_type: values.projectType,
      budget: values.budget,
      timeline: values.timeline,
      lead_type: isProduct ? "product" : "service",
      _subject: `New ${isProduct ? "product" : "project"} enquiry — NeuraForge Systems`,
      ...attribution,
    });
  };

  const choiceClass = (selected: boolean) => `min-h-12 rounded-2xl border px-4 py-3 text-left text-[13px] font-medium transition-all ${selected ? "border-accent/50 bg-accent/15 text-accent-soft shadow-[var(--shadow-glass-inner)]" : "border-white/12 bg-white/8 text-ink-soft hover:bg-white/14 hover:text-ink"}`;
  const inputClass = "w-full rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-[15px] text-ink outline-none placeholder:text-muted backdrop-blur focus:border-ink/40";

  return (
    <section id="contact" className="relative isolate overflow-hidden section-pad-md" style={{ scrollMarginTop: 96 }}>
      <GlowOrb size={520} color="rgba(175, 92, 65, 0.10)" className="-top-24 -right-32" />
      <GlowOrb size={460} color="rgba(120, 190, 195, 0.16)" className="-bottom-32 -left-20" />
      <NoiseLayer />
      <div className="container-page relative z-10 grid gap-12 md:grid-cols-[5fr_7fr] md:gap-14">
        <div>
          <SectionHeading eyebrow="Project enquiry" title={<>Tell us what the software needs to <AccentItalic>do</AccentItalic>.</>} description="A few focused questions help us understand your project and make the first conversation useful. Progress is saved on this device." />
          <GlassCard className="mt-9 p-6 md:p-7">
            <div className="space-y-4">
              <a href="mailto:neuraforgesys@gmail.com" onClick={() => trackEvent("email_click")} className="flex items-center gap-4 text-ink-soft no-underline hover:text-ink"><span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/12"><Mail className="h-4 w-4" /></span><span><span className="block text-[10px] uppercase tracking-[0.18em] text-muted">Email</span><span className="mt-1 block text-[14px]">neuraforgesys@gmail.com</span></span></a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent("whatsapp_click")} className="flex items-center gap-4 text-ink-soft no-underline hover:text-ink"><span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/12"><MessageCircle className="h-4 w-4" /></span><span><span className="block text-[10px] uppercase tracking-[0.18em] text-muted">WhatsApp</span><span className="mt-1 block text-[14px]">+233 (0) 20 375 8021</span></span></a>
            </div>
          </GlassCard>
        </div>

        <form id="enquiry-wizard" onSubmit={submit} aria-busy={formState.submitting} className="relative scroll-mt-24 overflow-hidden rounded-[var(--radius-card-lg)] glass-card p-6 md:p-9">
          <NoiseLayer />
          <input type="hidden" name="project_type" value={values.projectType} />
          <input type="hidden" name="budget" value={values.budget} />
          <input type="hidden" name="timeline" value={values.timeline} />
          <input type="hidden" name="lead_type" value={isProduct ? "product" : "service"} />
          <input type="hidden" name="_subject" value={`New ${isProduct ? "product" : "project"} enquiry — NeuraForge Systems`} />
          {Object.entries(attribution).map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
          <p className="sr-only" role="status" aria-live="polite">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>
          <div className="relative z-10 grid grid-cols-4 gap-2 border-b border-white/12 pb-6" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((label, index) => <div key={label} className="min-w-0"><div className={`h-1 rounded-full ${index <= step ? "bg-accent" : "bg-white/12"}`} /><div className={`mt-2 truncate text-[9px] uppercase tracking-[0.12em] ${index === step ? "text-accent-soft" : "text-muted"}`}>{label}</div></div>)}
          </div>

          <div className="relative z-10 min-h-[390px] py-8">
            {formState.succeeded ? <div role="status" className="flex min-h-[320px] flex-col justify-center"><span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-canvas"><Check className="h-5 w-5" /></span><h3 className="mt-6 font-serif text-[30px] text-ink">Enquiry received.</h3><p className="mt-4 max-w-lg text-[15px] leading-[1.7] text-muted">We’ll review the context and reply within two business days with useful next questions or a suggested conversation.</p></div>
            : step === 0 ? <fieldset><legend className="font-serif text-[26px] text-ink">What are you looking to build?</legend><p className="mt-2 text-[13px] text-muted">Choose the closest answer. It does not lock the scope.</p><div className="mt-6 grid gap-2 sm:grid-cols-2">{PROJECT_TYPES.map((type) => <button key={type} type="button" onClick={() => update("projectType", type)} aria-pressed={values.projectType === type} className={choiceClass(values.projectType === type)}>{type}</button>)}</div></fieldset>
            : step === 1 ? <div><label htmlFor="project-context" className="font-serif text-[26px] text-ink">What needs to change?</label><p className="mt-2 text-[13px] text-muted">Describe the current situation, the people involved and what a good outcome looks like.</p><textarea id="project-context" name="message" value={values.description} onChange={(event) => update("description", event.target.value)} rows={8} minLength={20} maxLength={4000} className={`${inputClass} mt-6 resize-y`} placeholder="For example: our team currently manages appointments and payments across several tools…" /><ValidationError field="message" errors={formState.errors} className="mt-2 text-[13px] text-red-200" /></div>
            : step === 2 ? <div className="grid gap-8 sm:grid-cols-2"><fieldset><legend className="font-serif text-[22px] text-ink">Indicative budget</legend><div className="mt-5 grid gap-2">{BUDGETS.map((item) => <button key={item} type="button" onClick={() => update("budget", item)} aria-pressed={values.budget === item} className={choiceClass(values.budget === item)}>{item}</button>)}</div></fieldset><fieldset><legend className="font-serif text-[22px] text-ink">Timing</legend><div className="mt-5 grid gap-2">{TIMELINES.map((item) => <button key={item} type="button" onClick={() => update("timeline", item)} aria-pressed={values.timeline === item} className={choiceClass(values.timeline === item)}>{item}</button>)}</div></fieldset></div>
            : <div><h3 className="font-serif text-[26px] text-ink">Where should we reply?</h3><p className="mt-2 text-[13px] text-muted">We use these details only to respond to this enquiry.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><div><label htmlFor="enquiry-name" className="mb-2 block text-[12px] font-medium text-ink">Name · required</label><input id="enquiry-name" name="name" autoComplete="name" value={values.name} onChange={(e) => update("name", e.target.value)} className={inputClass} /><ValidationError field="name" errors={formState.errors} className="mt-2 text-[13px] text-red-200" /></div><div><label htmlFor="enquiry-email" className="mb-2 block text-[12px] font-medium text-ink">Email · required</label><input id="enquiry-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(e) => update("email", e.target.value)} className={inputClass} /><ValidationError field="email" errors={formState.errors} className="mt-2 text-[13px] text-red-200" /></div><div className="sm:col-span-2"><label htmlFor="enquiry-company" className="mb-2 block text-[12px] font-medium text-ink">Company · optional</label><input id="enquiry-company" name="company" autoComplete="organization" value={values.company} onChange={(e) => update("company", e.target.value)} className={inputClass} /></div></div></div>}
          </div>

          {!formState.succeeded && <div className="relative z-10 border-t border-white/12 pt-5">{message && <p role="status" className="mb-4 text-[13px] text-accent-soft">{message}</p>}<ValidationError errors={formState.errors} className="mb-4 text-[13px] text-red-200" /><div className="flex items-center justify-between gap-3"><button type="button" disabled={step === 0 || formState.submitting} onClick={() => { setMessage(""); setStep((current) => Math.max(0, current - 1)); focusWizard(); }} className="inline-flex h-11 items-center gap-2 rounded-full border border-white/12 bg-white/10 px-5 text-[13px] font-medium text-ink disabled:opacity-40"><ArrowLeft className="h-4 w-4" />Back</button>{step < STEPS.length - 1 ? <button type="button" onClick={next} className="inline-flex h-11 items-center gap-2 rounded-full border-none bg-ink px-6 text-[13px] font-medium text-canvas hover:bg-ink-soft">Continue<ArrowRight className="h-4 w-4" /></button> : <button type="submit" disabled={formState.submitting} className="inline-flex h-11 items-center gap-2 rounded-full border-none bg-accent px-6 text-[13px] font-medium text-canvas hover:bg-accent-hover disabled:opacity-60">{formState.submitting ? "Sending…" : "Send enquiry"}<ArrowRight className="h-4 w-4" /></button>}</div></div>}
        </form>
      </div>
    </section>
  );
}
