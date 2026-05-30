"use client";

import { FormEvent, useState } from "react";
import { trackFormSubmit } from "@/lib/analytics";

type ModalType = "pro" | "studio";

type EmailModalProps = {
  type: ModalType;
  onClose: () => void;
};

type LeadsErrorCode =
  | "INVALID_JSON"
  | "INVALID_EMAIL"
  | "INVALID_SOURCE"
  | "DUPLICATE_LEAD"
  | "ALREADY_JOINED"
  | "RATE_LIMITED"
  | "SERVER_CONFIG_ERROR"
  | "CONFIG_ERROR"
  | "DATABASE_ERROR"
  | "SERVER_ERROR"
  | "METHOD_NOT_ALLOWED";

type LeadsResponse =
  | {
      success: true;
      data: {
        id?: string;
        email: string;
        source: ModalType;
        created_at: string;
      };
    }
  | {
      success: false;
      error: {
        code: LeadsErrorCode;
        message: string;
      };
    };

const modalCopy = {
  pro: {
    headline: "Get Notified When Pro Launches",
    sub: "Be the first to unlock HD downloads, more generations, and your design history.",
    placeholder: "Enter your email",
    button: "Notify Me",
    trust: "No spam. Unsubscribe anytime."
  },
  studio: {
    headline: "Studio Access Coming Soon",
    sub: "For tattoo shops and professional designers. Get early access + custom setup.",
    placeholder: "Enter your studio email",
    button: "Request Early Access",
    trust: "We'll reach out within 48 hours."
  }
} satisfies Record<ModalType, Record<string, string>>;

const successMessage = "Thanks — you're on the list.";
const duplicateMessage = "You're already on the waitlist.";
const fallbackErrorMessage = "Something went wrong. Please try again.";

function getErrorMessage(code: LeadsErrorCode, message?: string) {
  switch (code) {
    case "DUPLICATE_LEAD":
    case "ALREADY_JOINED":
      return duplicateMessage;
    case "INVALID_EMAIL":
      return "Please enter a valid email address.";
    case "RATE_LIMITED":
      return "Too many attempts. Please try again later.";
    case "INVALID_SOURCE":
      return "This waitlist source is not supported.";
    case "INVALID_JSON":
    case "SERVER_CONFIG_ERROR":
    case "CONFIG_ERROR":
    case "DATABASE_ERROR":
    case "SERVER_ERROR":
    case "METHOD_NOT_ALLOWED":
    default:
      return message || fallbackErrorMessage;
  }
}

function trackEmailSubmit(source: ModalType) {
  return fetch("/internal/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: "email_submit",
      source,
      page: window.location.pathname,
      metadata: {
        form: "email_modal"
      }
    })
  }).catch(() => undefined);
}

export function EmailModal({ type, onClose }: EmailModalProps) {
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = modalCopy[type];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/internal/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, source: type })
      });
      const result = (await response.json()) as LeadsResponse;

      if (!result.success) {
        const message = getErrorMessage(result.error.code, result.error.message);
        if (result.error.code === "DUPLICATE_LEAD" || result.error.code === "ALREADY_JOINED") {
          setSubmittedMessage(message);
          form.reset();
          void trackEmailSubmit(type);
      trackFormSubmit(type === "pro" ? "waitlist" : "studio_lead", "success");
          return;
        }
        setErrorMessage(message);
        return;
      }

      setSubmittedMessage(successMessage);
      form.reset();
      void trackEmailSubmit(type);
    } catch {
      setErrorMessage(fallbackErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-actions">
          <button className="close-button" type="button" onClick={onClose} aria-label="Close email modal">
            Close
          </button>
        </div>
        <div className="stack">
          <span className="eyebrow">Early access</span>
          <h2 id="email-modal-title">{copy.headline}</h2>
          <p>{copy.sub}</p>
          {submittedMessage ? (
            <div className="compliance-note tool-compliance" role="status">
              {submittedMessage}
            </div>
          ) : (
            <form className="stack" onSubmit={handleSubmit}>
              <label>
                <span className="eyebrow">Email</span>
                <input className="email-input" type="email" name="email" required placeholder={copy.placeholder} disabled={isSubmitting} />
              </label>
              {errorMessage ? (
                <div className="compliance-note" role="alert">
                  {errorMessage}
                </div>
              ) : null}
              <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? "Submitting..." : copy.button}
              </button>
            </form>
          )}
          <p style={{ fontSize: 13 }}>{copy.trust}</p>
        </div>
      </section>
    </div>
  );
}
