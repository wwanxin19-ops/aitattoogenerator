"use client";

import { FormEvent, useState } from "react";

type ModalType = "pro" | "studio";

type EmailModalProps = {
  type: ModalType;
  onClose: () => void;
};

type WaitlistErrorCode =
  | "ALREADY_JOINED"
  | "INVALID_EMAIL"
  | "INVALID_SOURCE"
  | "RATE_LIMITED"
  | "CONFIG_ERROR"
  | "SERVER_ERROR";

type WaitlistResponse =
  | {
      success: true;
      data: {
        email: string;
        source: ModalType;
        created_at: string;
      };
    }
  | {
      success: false;
      error: {
        code: WaitlistErrorCode;
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

const fallbackErrorMessage = "Something went wrong. Please try again.";

function getErrorMessage(code: WaitlistErrorCode, message?: string) {
  if (message) return message;

  switch (code) {
    case "ALREADY_JOINED":
      return "This email is already on this waitlist.";
    case "INVALID_EMAIL":
      return "Please enter a valid email address.";
    case "INVALID_SOURCE":
      return "This waitlist source is not supported.";
    case "RATE_LIMITED":
      return "Too many attempts. Please wait a moment and try again.";
    case "CONFIG_ERROR":
      return "The waitlist is not configured yet. Please try again later.";
    case "SERVER_ERROR":
      return fallbackErrorMessage;
    default:
      return fallbackErrorMessage;
  }
}

export function EmailModal({ type, onClose }: EmailModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = modalCopy[type];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, source: type })
      });
      const result = (await response.json()) as WaitlistResponse;

      if (!response.ok || !result.success) {
        const error = result.success ? undefined : result.error;
        setErrorMessage(getErrorMessage(error?.code ?? "SERVER_ERROR", error?.message));
        return;
      }

      setSubmitted(true);
      event.currentTarget.reset();
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
          {submitted ? (
            <div className="compliance-note tool-compliance" role="status">
              Thanks — you&apos;re on the list.
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
              <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
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
