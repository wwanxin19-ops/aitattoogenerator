"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { trackCTAClick } from "@/lib/analytics";
import { ComplianceNote } from "@/components/Shared";

type GenerationStatus = "pending" | "completed" | "failed";

type GenerateResponse = {
  success: true;
  data: {
    id: string;
    status: "pending";
    message: string;
    credits_remaining: number;
  };
} | {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

type PollResponse = {
  success: true;
  data: {
    id: string;
    status: GenerationStatus;
    image_url: string | null;
    prompt: string;
    style: string;
    placement: string;
    created_at: string;
    completed_at: string | null;
  };
};

const fallbackErrorMessage = "Something went wrong. Please try again.";

function trackGeneratorUse(style: string, placement: string) {
  return fetch("/internal/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event: "generator_use",
      page: window.location.pathname,
      metadata: { style, placement }
    })
  }).catch(() => undefined);
}

function GeneratorForm() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("minimalist");
  const [placement, setPlacement] = useState("arm");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ imageUrl: string; prompt: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  async function pollGeneration(genId: string, maxAttempts = 30): Promise<PollResponse["data"] | null> {
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await fetch(`/api/generate/${genId}`, {
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error(`Poll failed: ${res.status}`);
      }
      
      const data: PollResponse = await res.json();
      
      if (data.data.status === "completed" || data.data.status === "failed") {
        return data.data;
      }
      
      setProgress(Math.round(((i + 1) / maxAttempts) * 100));
    }
    
    throw new Error("Generation timed out");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError("Please describe your tattoo idea first.");
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    setErrorCode(null);
    setProgress(0);

    try {
      trackGeneratorUse(style, placement);
      trackCTAClick("generate", "generator_form");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ prompt, style, placement })
      });

      const data: GenerateResponse = await res.json();

      if (!data.success) {
        if (data.error.code === "UNAUTHORIZED") {
          window.location.href = "/api/auth/login";
          return;
        }
        if (data.error.code === "INSUFFICIENT_CREDITS") {
          setError("You’re out of credits. Buy more credits to continue generating tattoo designs.");
          setErrorCode(data.error.code);
          return;
        }
        setError(data.error.message || fallbackErrorMessage);
        setErrorCode(data.error.code || null);
        return;
      }

      const genResult = await pollGeneration(data.data.id);
      
      if (!genResult) {
        setError("生成超时，请重试");
        return;
      }
      
      if (genResult.status === "completed" && genResult.image_url) {
        setResult({
          imageUrl: genResult.image_url,
          prompt: genResult.prompt
        });
      } else if (genResult.status === "failed") {
        setError("生成失败，积分已退还");
      }
    } catch {
      setError(fallbackErrorMessage);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }

  return (
    <div className="generator-form">
      <form onSubmit={handleSubmit} className="stack">
        <div className="field">
          <label htmlFor="prompt">Describe your tattoo idea</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onInput={(e) => setPrompt(e.currentTarget.value)}
            placeholder="A fine-line snake wrapped around a peony..."
            rows={4}
            required
            maxLength={1200}
          />
        </div>

        <div className="grid-2">
          <div className="field">
            <label htmlFor="style">Style</label>
            <select id="style" value={style} onChange={(e) => setStyle(e.target.value)}>
              <option value="minimalist">Minimalist</option>
              <option value="realism">Realism</option>
              <option value="traditional">Traditional</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="placement">Placement</label>
            <select id="placement" value={placement} onChange={(e) => setPlacement(e.target.value)}>
              <option value="arm">Arm</option>
              <option value="shoulder">Shoulder</option>
              <option value="wrist">Wrist</option>
              <option value="back">Back</option>
              <option value="leg">Leg</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-block"
          disabled={loading}
          aria-disabled={loading}
        >
          {loading ? `Generating... ${progress}%` : "Generate Tattoo"}
        </button>
      </form>

      {error && (
        <div className="error-message" role="alert">
          <p>{error}</p>
          {errorCode === "INSUFFICIENT_CREDITS" && <Link href="/pricing/">Buy Credits</Link>}
        </div>
      )}

      {result && (
        <div className="result-section">
          <h3>Your Design</h3>
          <img src={result.imageUrl} alt={result.prompt} className="result-image" loading="lazy" />
          <p className="result-prompt">{result.prompt}</p>
          <ComplianceNote />
        </div>
      )}
    </div>
  );
}

export { GeneratorForm };
export default GeneratorForm;
