"use client";

import { FormEvent, useState } from "react";
import { ComplianceNote } from "@/components/Shared";
import { ModalButton } from "@/components/ModalButtons";

type GenerateResponse =
  | {
      success: true;
      data: {
        request_id: string;
        status: "mocked";
        message: string;
        created_at: string;
        result: {
          image_url: string | null;
          preview_text: string;
        };
      };
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
      };
    };

const fallbackErrorMessage = "Something went wrong. Please try again.";

function trackGeneratorUse(style: string, placement: string, size: string, colorMode: string) {
  return fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: "generator_use",
      page: window.location.pathname,
      metadata: {
        style,
        placement,
        size,
        color_mode: colorMode
      }
    })
  }).catch(() => undefined);
}

export function GeneratorForm() {
  const [previewText, setPreviewText] = useState("Your generated reference will appear here.");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const prompt = String(formData.get("prompt") ?? "").trim();
    const style = String(formData.get("style") ?? "").trim();
    const placement = String(formData.get("placement") ?? "").trim();
    const size = String(formData.get("size") ?? "").trim();
    const colorMode = String(formData.get("color_mode") ?? "").trim();

    if (!prompt) {
      setErrorMessage("Please describe the tattoo you want to generate.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setPreviewText("Creating your mock tattoo concept...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          style,
          placement,
          size,
          color_mode: colorMode
        })
      });
      const result = (await response.json()) as GenerateResponse;

      if (!response.ok || !result.success) {
        const message = result.success ? fallbackErrorMessage : result.error.message || fallbackErrorMessage;
        setErrorMessage(message);
        setPreviewText("Your generated reference will appear here.");
        return;
      }

      setPreviewText(result.data.result.preview_text);
      void trackGeneratorUse(style, placement, size, colorMode);
    } catch {
      setErrorMessage(fallbackErrorMessage);
      setPreviewText("Your generated reference will appear here.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container grid-2">
      <form className="generator-panel stack" onSubmit={handleSubmit}>
        <label>
          Your tattoo idea
          <textarea
            name="prompt"
            required
            placeholder="Example: a realism wolf portrait with pine branches, designed for the upper arm"
          />
        </label>
        <div className="grid-2">
          <label>
            Style
            <select name="style" defaultValue="realism">
              <option value="realism">Realism</option>
              <option value="minimalist">Minimalist</option>
              <option value="traditional">Traditional</option>
              <option value="fine-line">Fine line</option>
            </select>
          </label>
          <label>
            Placement
            <select name="placement" defaultValue="arm">
              <option value="arm">Arm</option>
              <option value="forearm">Forearm</option>
              <option value="wrist">Wrist</option>
              <option value="shoulder">Shoulder</option>
            </select>
          </label>
        </div>
        <div className="grid-2">
          <label>
            Size
            <select name="size" defaultValue="medium">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          <label>
            Color mode
            <select name="color_mode" defaultValue="black-and-grey">
              <option value="black-and-grey">Black & grey</option>
              <option value="color">Color</option>
              <option value="fine-line">Fine line</option>
            </select>
          </label>
        </div>
        {errorMessage ? (
          <div className="compliance-note" role="alert">
            {errorMessage}
          </div>
        ) : null}
        <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting ? "Creating mock preview..." : "Start Designing Free"}
        </button>
        <ComplianceNote tool />
      </form>
      <aside className="card-dark stack">
        <span className="eyebrow">Preview area</span>
        <div className="preview-box" role="status">
          <div className="preview-art" aria-hidden="true" />
          <p>{previewText}</p>
        </div>
        <div className="card-paper stack">
          <h3>Want HD Downloads & More Generations?</h3>
          <p>Join the Pro waitlist for launch updates. No payment flow is active this week.</p>
          <ModalButton type="pro" block section="generator-preview">
            Join Pro Waitlist
          </ModalButton>
        </div>
      </aside>
    </div>
  );
}
