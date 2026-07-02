"use client";

import { useEffect, useState } from "react";
import { getStoredConsent, setStoredConsent, type ConsentValue } from "@/lib/consent";

type View = "banner" | "preferences";

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [view, setView] = useState<View>("banner");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);
  }, []);

  const notifyChange = (value: ConsentValue) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("cookieConsentChange", { detail: value }));
    }
  };

  const handleAccept = () => {
    setStoredConsent("accepted");
    setConsent("accepted");
    notifyChange("accepted");
  };

  const handleReject = () => {
    setStoredConsent("rejected");
    setConsent("rejected");
    notifyChange("rejected");
  };

  const handleReset = () => {
    setStoredConsent(null);
    setConsent(null);
    notifyChange(null);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const openBanner = () => {
      setStoredConsent(null);
      setView("banner");
      setConsent(null);
    };
    window.addEventListener("openCookieSettings", openBanner);
    return () => window.removeEventListener("openCookieSettings", openBanner);
  }, []);

  if (!mounted || consent !== null) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      {view === "banner" ? (
        <div className="cookie-banner-inner">
          <div className="cookie-banner-body">
            <p className="cookie-banner-title">We value your privacy</p>
            <p className="cookie-banner-text">
              We use cookies to keep you signed in and understand how our site is used.
              Essential cookies are always on. Analytics cookies help us improve the product.
            </p>
          </div>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setView("preferences")}
            >
              Manage preferences
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReject}
            >
              Reject analytics
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAccept}
            >
              Accept all
            </button>
          </div>
        </div>
      ) : (
        <Preferences
          onBack={() => setView("banner")}
          onAccept={handleAccept}
          onReject={handleReject}
          onReset={handleReset}
        />
      )}
    </div>
  );
}

function Preferences({
  onBack,
  onAccept,
  onReject,
  onReset,
}: {
  onBack: () => void;
  onAccept: () => void;
  onReject: () => void;
  onReset: () => void;
}) {
  return (
    <div className="cookie-banner-inner">
      <div className="cookie-banner-body">
        <p className="cookie-banner-title">Cookie preferences</p>
        <div className="cookie-preference-item">
          <div className="cookie-preference-label">
            <span className="cookie-preference-name">Essential</span>
            <span className="cookie-preference-status">Always on</span>
          </div>
          <p className="cookie-preference-desc">
            Required for sign-in, security, and CSRF protection. Retained for your session up to 7 days.
          </p>
        </div>
        <div className="cookie-preference-item">
          <div className="cookie-preference-label">
            <span className="cookie-preference-name">Analytics</span>
            <span className="cookie-preference-status">Off by default</span>
          </div>
          <p className="cookie-preference-desc">
            Traffic analysis and heatmaps via Google Analytics 4 and Microsoft Clarity. Retention follows Google and Microsoft policies.
          </p>
        </div>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="btn btn-secondary" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn-secondary" onClick={onReset}>
          Reset all
        </button>
        <button type="button" className="btn btn-secondary" onClick={onReject}>
          Reject analytics
        </button>
        <button type="button" className="btn btn-primary" onClick={onAccept}>
          Accept all
        </button>
      </div>
    </div>
  );
}
