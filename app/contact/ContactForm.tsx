"use client";

import { FormEvent, useState } from "react";

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const CATEGORY_OPTIONS = [
  { value: "support", label: "Support" },
  { value: "billing", label: "Billing" },
  { value: "feedback", label: "Feedback" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" }
];

function errorMessageFromCode(code?: string) {
  switch (code) {
    case "INVALID_NAME":
      return "Please enter your name.";
    case "INVALID_EMAIL":
      return "Please enter a valid email address.";
    case "INVALID_SUBJECT":
      return "Please enter a subject.";
    case "INVALID_MESSAGE":
      return "Please enter at least 10 characters.";
    case "RATE_LIMITED":
      return "Too many messages. Please try again later.";
    case "EMAIL_NOT_CONFIGURED":
      return "Email delivery is not configured yet. Please email support@aitattoogenerator.cc directly.";
    default:
      return "Unable to send your message right now. Please email support@aitattoogenerator.cc directly.";
  }
}

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          category: formData.get("category"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website")
        })
      });

      const result = await response.json().catch(() => null) as
        | { success?: boolean; error?: { code?: string; message?: string } }
        | null;

      if (!response.ok || !result?.success) {
        setState({ status: "error", message: errorMessageFromCode(result?.error?.code) });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "Message sent. We also emailed you a confirmation reply."
      });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please email support@aitattoogenerator.cc directly."
      });
    }
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form className="contact-form card-paper stack" onSubmit={onSubmit}>
      <div className="contact-form-grid">
        <label>
          Name
          <input className="email-input" name="name" type="text" minLength={2} maxLength={80} autoComplete="name" required />
        </label>
        <label>
          Email
          <input className="email-input" name="email" type="email" maxLength={254} autoComplete="email" required />
        </label>
      </div>

      <label>
        Category
        <select className="email-input" name="category" defaultValue="support" required>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <label>
        Subject
        <input className="email-input" name="subject" type="text" minLength={3} maxLength={120} required />
      </label>

      <label>
        Message
        <textarea className="email-input contact-message" name="message" minLength={10} maxLength={4000} required />
      </label>

      <label className="contact-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </button>

      {state.status === "success" && <p className="form-status form-status-success" role="status">{state.message}</p>}
      {state.status === "error" && <p className="form-status form-status-error" role="alert">{state.message}</p>}
    </form>
  );
}
