// GA4 event tracking utilities
// Events are only sent when NEXT_PUBLIC_GA_ID is configured

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

interface GTagWindow extends Window {
  gtag?: (...args: unknown[]) => void;
}

function isGAEnabled(): boolean {
  return typeof window !== "undefined" && !!GA_ID && !!(window as GTagWindow).gtag;
}

/**
 * Send a custom event to GA4
 * @param eventName - GA4 event name (use snake_case)
 * @param params - Event parameters
 */
export function trackEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  if (!isGAEnabled()) return;
  
  const w = window as GTagWindow;
  w.gtag!("event", eventName, {
    ...params,
    send_to: GA_ID,
  });
}

/**
 * Track CTA button clicks
 * @param ctaName - Name of the CTA (e.g., "generate", "waitlist", "studio")
 * @param location - Page or section where CTA appears
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent("cta_click", {
    cta_name: ctaName,
    location,
  });
}

/**
 * Track form submissions
 * @param formName - Name of the form (e.g., "waitlist", "lead", "contact")
 * @param status - "success" or "error"
 */
export function trackFormSubmit(formName: string, status: "success" | "error") {
  trackEvent("form_submit", {
    form_name: formName,
    status,
  });
}

/**
 * Track page-specific actions
 * @param action - Action name (e.g., "scroll", "copy", "share")
 * @param target - What the action was performed on
 */
export function trackAction(action: string, target?: string) {
  trackEvent("user_action", {
    action,
    target: target || "unknown",
  });
}
