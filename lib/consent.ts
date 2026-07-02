export type ConsentValue = "accepted" | "rejected" | null;

const CONSENT_KEY = "cookieConsent";

export function getStoredConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (raw === "accepted" || raw === "rejected") return raw;
  return null;
}

export function setStoredConsent(value: ConsentValue) {
  if (typeof window === "undefined") return;
  if (value === null) {
    window.localStorage.removeItem(CONSENT_KEY);
  } else {
    window.localStorage.setItem(CONSENT_KEY, value);
  }
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === "accepted";
}
