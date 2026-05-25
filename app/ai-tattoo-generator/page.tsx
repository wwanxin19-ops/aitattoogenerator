import type { Metadata } from "next";
import { ComplianceNote } from "@/components/Shared";
import { ModalButton } from "@/components/ModalButtons";

export const metadata: Metadata = {
  title: "AI Tattoo Generator — See Your Design in 30 Seconds",
  description: "Describe your tattoo idea, choose a style and placement, and create a reference preview in 30 seconds.",
  alternates: { canonical: "/ai-tattoo-generator/" }
};

export default function GeneratorPage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Generator</span>
        <h1>AI Tattoo Generator — See Your Design in 30 Seconds</h1>
        <p className="lead">Use this tool to shape your idea into a visual reference. This week, Pro features collect email interest only.</p>
      </section>

      <section className="section section-tight">
        <div className="container grid-3">
          <article className="card-dark"><span className="eyebrow">1</span><h3>Describe</h3><p>Add subject, symbolism, size, mood, and details.</p></article>
          <article className="card-dark"><span className="eyebrow">2</span><h3>Choose</h3><p>Pick the style and body placement for a useful preview.</p></article>
          <article className="card-dark"><span className="eyebrow">3</span><h3>Preview</h3><p>Create a reference to refine with a licensed tattoo artist.</p></article>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container grid-2">
          <form className="generator-panel stack">
            <label>
              Your tattoo idea
              <textarea placeholder="Example: a realism wolf portrait with pine branches, designed for the upper arm" />
            </label>
            <div className="grid-2">
              <label>
                Style
                <select defaultValue="realism">
                  <option value="realism">Realism</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="traditional">Traditional</option>
                  <option value="fine-line">Fine line</option>
                </select>
              </label>
              <label>
                Placement
                <select defaultValue="arm">
                  <option value="arm">Arm</option>
                  <option value="forearm">Forearm</option>
                  <option value="wrist">Wrist</option>
                  <option value="shoulder">Shoulder</option>
                </select>
              </label>
            </div>
            <button className="btn btn-primary btn-block" type="button">Start Designing Free</button>
            <ComplianceNote tool />
          </form>
          <aside className="card-dark stack">
            <span className="eyebrow">Preview area</span>
            <div className="preview-box"><div className="preview-art" aria-hidden="true" /><p>Your generated reference will appear here.</p></div>
            <div className="card-paper stack">
              <h3>Want HD Downloads & More Generations?</h3>
              <p>Join the Pro waitlist for launch updates. No payment flow is active this week.</p>
              <ModalButton type="pro" block>Join Pro Waitlist</ModalButton>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
