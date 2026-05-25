"use client";

import { FormEvent, useState } from "react";

type ModalType = "pro" | "studio";

type EmailModalProps = {
  type: ModalType;
  onClose: () => void;
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
};

export function EmailModal({ type, onClose }: EmailModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const copy = modalCopy[type];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    if (!email) return;
    setSubmitted(true);
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
                <input
                  className="email-input"
                  type="email"
                  required
                  name="email"
                  placeholder={copy.placeholder}
                />
              </label>
              <button className="btn btn-primary btn-block" type="submit">
                {copy.button}
              </button>
            </form>
          )}
          <p style={{ fontSize: 13 }}>{copy.trust}</p>
        </div>
      </section>
    </div>
  );
}
