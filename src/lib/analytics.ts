export type CommercialEvent =
  | "service_view"
  | "solution_view"
  | "case_study_view"
  | "case_study_demo_click"
  | "project_enquiry_started"
  | "project_enquiry_step_completed"
  | "project_enquiry_submitted"
  | "product_view"
  | "product_waitlist_joined"
  | "whatsapp_click"
  | "email_click";

declare global { interface Window { dataLayer?: unknown[]; } }

export function trackEvent(event: CommercialEvent, properties: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...properties };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("neuraforge:analytics", { detail: payload }));
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function getAttribution(): Record<string, string> {
  if (typeof window === "undefined") return {} as Record<string, string>;
  let previous: Record<string, string> = {};
  try { previous = JSON.parse(sessionStorage.getItem("neuraforge_attribution") ?? "{}"); }
  catch { sessionStorage.removeItem("neuraforge_attribution"); }
  const params = new URLSearchParams(window.location.search);
  const current: Record<string, string> = {};
  UTM_KEYS.forEach((key) => { const value = params.get(key); if (value) current[key] = value; });
  const attribution: Record<string, string> = {
    ...previous,
    ...current,
    landing_page: previous.landing_page ?? `${window.location.pathname}${window.location.search}`,
    referrer: previous.referrer ?? document.referrer,
  };
  sessionStorage.setItem("neuraforge_attribution", JSON.stringify(attribution));
  return attribution;
}
