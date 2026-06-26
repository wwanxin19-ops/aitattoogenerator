import Link from "next/link";
import { FAQAccordion, HeroGeneratorPanel, HowItWorksSteps, TrustSignalGrid, VisualComparison } from "@/components/Shared";
import { SchemaScripts } from "@/components/SchemaScripts";

const faqs: Array<[string, string]> = [
  ["Is this a replacement for a tattoo artist?", "No. The generator creates reference and inspiration material so you can communicate your direction more clearly."],
  ["Do I need to sign up?", "No signup is required for the first free designs. Pro features are waitlist-only this week."],
  ["Can I use the design exactly as generated?", "Use it as a starting point. A licensed tattoo artist should adapt it for skin, placement, aging, and safety."]
];

export default function HomePage() {
  return (
    <>
      <SchemaScripts
        faqs={faqs.map(([question, answer]) => ({ question, answer }))}
      />
      <main>
      <section className="container hero-grid">
        <div className="stack">
          <span className="eyebrow">AI tattoo preview studio</span>
          <h1>See Your Tattoo Before You Ink It</h1>
          <p className="lead">Turn a rough tattoo idea into a clear visual reference you can refine, compare, and bring to a licensed tattoo artist.</p>
          <div className="actions">
            <Link className="btn btn-primary" href="/ai-tattoo-generator/">Start Designing Free</Link>
            <Link className="btn btn-secondary" href="/pricing/">Buy credits</Link>
            <Link className="btn btn-secondary" href="/styles/realism/">Explore styles</Link>
          </div>
          <p className="trust-line">No signup required. 3 free designs daily.</p>
        </div>
        <HeroGeneratorPanel />
      </section>

      <section className="section">
        <div className="container stack">
          <span className="eyebrow">How it works</span>
          <h2>From tattoo idea to artist-ready reference in three steps</h2>
          <HowItWorksSteps />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container stack">
          <span className="eyebrow">Why it feels different</span>
          <h2>Built for cautious tattoo planning, not throwaway AI images</h2>
          <TrustSignalGrid />
        </div>
      </section>

      <section className="section">
        <div className="container stack">
          <span className="eyebrow">Comparison</span>
          <h2>A visual way to choose your tattoo preview workflow</h2>
          <VisualComparison />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container grid-2">
          <div className="stack">
            <span className="eyebrow">FAQ</span>
            <h2>Questions before your first preview</h2>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section">
        <div className="container card-paper stack">
          <span className="eyebrow">Start free</span>
          <h2>Your Next Tattoo Deserves a Preview</h2>
          <p>Describe your idea, pick a style, and create a reference before you commit to ink.</p>
          <Link className="btn btn-primary" href="/ai-tattoo-generator/">Start Designing Free</Link>
        </div>
      </section>
    </main>
    </>
  );
}
// rebuild 1780146348
