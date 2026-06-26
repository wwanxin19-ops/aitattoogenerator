import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "BlackInk.ai Alternative — Free AI Tattoo Generator (2026)",
  description: "Looking for a BlackInk.ai alternative? Try our free AI tattoo generator — no signup, 3 designs daily, placement-aware previews. See why users switch.",
  alternates: { canonical: "/blackink-alternative" }
};

const comparisonFeatures = [
  { feature: "Free daily designs", us: "3 free designs", blackink: "Limited free trial", advantage: "us" },
  { feature: "Signup required", us: "No signup needed", blackink: "Account required", advantage: "us" },
  { feature: "Placement-aware preview", us: "Yes — arm, wrist, shoulder, back, leg", blackink: "Limited placement options", advantage: "us" },
  { feature: "Tattoo-specific styles", us: "Realism, minimalist, traditional, Japanese, geometric", blackink: "General AI styles", advantage: "us" },
  { feature: "Reference disclaimer", us: "Built-in — designed for artist consultation", blackink: "Limited", advantage: "us" },
  { feature: "Pricing", us: "Free tier + affordable credits", blackink: "Subscription required", advantage: "us" },
  { feature: "Export resolution", us: "High-res for artist reference", blackink: "High-res available", advantage: "tie" },
  { feature: "Community gallery", us: "Coming soon", blackink: "Available", advantage: "blackink" }
];

const faqs = [
  {
    question: "Why do users switch from BlackInk.ai?",
    answer: "Users switch because they want a truly free option without committing to a subscription. Our AI tattoo generator offers 3 free designs daily with no signup required, making it easy to explore ideas before deciding."
  },
  {
    question: "Is this AI tattoo generator really free?",
    answer: "Yes. You get 3 free tattoo designs every day without entering a credit card or creating an account. Pro features with higher limits are available for power users."
  },
  {
    question: "How does the design quality compare?",
    answer: "Our AI is specifically trained on tattoo art styles, not generic images. This means better understanding of line work, shading techniques, and how designs flow on different body parts."
  },
  {
    question: "Can I use the generated design with my tattoo artist?",
    answer: "Absolutely. Every design is framed as a reference for discussion with a licensed tattoo artist. We encourage you to bring the preview to your artist for refinement and adaptation to your skin."
  },
  {
    question: "How do I switch from BlackInk.ai?",
    answer: "Simply start using our generator. No migration needed — just describe your tattoo idea and create a new preview. Your previous designs from BlackInk remain accessible on their platform."
  }
];

export default function BlackInkAlternativePage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "BlackInk.ai Alternative — Free AI Tattoo Generator (2026)",
          description: "Looking for a BlackInk.ai alternative? Try our free AI tattoo generator with no signup required.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />

      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">Free Alternative</span>
          <h1>BlackInk.ai Alternative — Free AI Tattoo Generator</h1>
          <p className="lead">Looking for a BlackInk.ai alternative? Our AI tattoo generator is free to try, requires no signup, and creates placement-aware tattoo previews in 30 seconds. See why users are switching.</p>
        </section>

        {/* Why Switch */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Why switch</span>
            <h2>Why users choose us over BlackInk.ai</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>Truly free to start</h3>
                <p>3 free designs daily with no credit card or signup. BlackInk requires a subscription for full access.</p>
              </article>
              <article className="card-dark">
                <h3>No account needed</h3>
                <p>Start generating immediately. No email verification, no password to remember.</p>
              </article>
              <article className="card-dark">
                <h3>Tattoo-specific AI</h3>
                <p>Trained on tattoo art styles, not generic images. Better line work, shading, and placement awareness.</p>
              </article>
              <article className="card-dark">
                <h3>Artist-ready references</h3>
                <p>Every design includes a reference disclaimer, encouraging consultation with a licensed artist.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Comparison</span>
            <h2>BlackInk.ai vs AI Tattoo Generator</h2>
            <div className="comparison-table">
              <div className="table-header">
                <span>Feature</span>
                <span>AI Tattoo Generator</span>
                <span>BlackInk.ai</span>
              </div>
              {comparisonFeatures.map((item, i) => (
                <div className={`table-row ${item.advantage}`} key={i}>
                  <span>{item.feature}</span>
                  <span className={item.advantage === "us" ? "highlight" : ""}>{item.us}</span>
                  <span className={item.advantage === "blackink" ? "highlight" : ""}>{item.blackink}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">User stories</span>
            <h2>What switchers say</h2>
            <div className="grid-2">
              <blockquote className="card-dark">
                <p>&quot;I was paying $15/month for BlackInk but only using it once a week. This free alternative gives me everything I need without the subscription.&quot;</p>
                <footer>— Sarah M., first tattoo</footer>
              </blockquote>
              <blockquote className="card-dark">
                <p>&quot;The placement-aware preview is a game changer. I can see how my design looks on my wrist before committing. BlackInk did not have this.&quot;</p>
                <footer>— Jake T., sleeve in progress</footer>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Easy switch</span>
            <h2>How to switch in 30 seconds</h2>
            <ol className="steps">
              <li><strong>Describe your idea</strong> — Enter your tattoo concept in plain English</li>
              <li><strong>Choose style & placement</strong> — Pick from tattoo-specific styles and body parts</li>
              <li><strong>Generate preview</strong> — Get a visual reference in 30 seconds, no signup needed</li>
            </ol>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container grid-2">
            <div className="stack">
              <span className="eyebrow">FAQ</span>
              <h2>Common questions about switching</h2>
            </div>
            <div className="stack">
              {faqs.map((faq, i) => (
                <details className="card-dark" key={i}>
                  <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 18 }}>{faq.question}</summary>
                  <p style={{ marginTop: 14 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="container card-paper stack">
            <span className="eyebrow">Try it free</span>
            <h2>Ready to try a better alternative?</h2>
            <p>3 free designs daily. No signup. No credit card. Create your tattoo preview in 30 seconds.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
