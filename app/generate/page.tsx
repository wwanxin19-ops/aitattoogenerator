import type { Metadata } from "next";
import { GeneratorForm } from "@/components/GeneratorForm";
import { SchemaScripts } from "@/components/SchemaScripts";
import { AgeGateWrapper } from "@/components/AgeGateWrapper";

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: "AI Tattoo Generator Free Online — Create Your Design in 30 Seconds",
  description: "Free AI tattoo generator online — describe your idea, pick style and placement, and create a tattoo reference preview in 30 seconds. No signup needed. 3 free designs daily.",
  alternates: { canonical: "/generate" }
};

const howToSteps = [
  {
    name: "Describe",
    text: "Add subject, symbolism, size, mood, and details to describe your tattoo idea.",
    url: "https://aitattoogenerator.cc/generate#describe"
  },
  {
    name: "Choose",
    text: "Pick the style and body placement for a useful preview.",
    url: "https://aitattoogenerator.cc/generate#choose"
  },
  {
    name: "Preview",
    text: "Create a reference to refine with a licensed tattoo artist.",
    url: "https://aitattoogenerator.cc/generate#preview"
  }
];

const faqs = [
  {
    question: "Is this AI tattoo generator free?",
    answer: "Yes. You get 3 free tattoo designs daily without signing up. Pro features are available for users who need more generations or higher resolution previews."
  },
  {
    question: "How does the AI tattoo generator work?",
    answer: "Describe your tattoo idea in plain English, choose a style (minimalist, realism, traditional, etc.) and body placement, then click generate. The AI creates a visual reference you can use to discuss your design with a licensed tattoo artist."
  },
  {
    question: "Can I use the generated design as my actual tattoo?",
    answer: "The AI-generated design is a reference and starting point. We recommend bringing it to a licensed tattoo artist who can adapt it for your skin, placement, aging, and safety."
  },
  {
    question: "What tattoo styles are supported?",
    answer: "Our AI tattoo generator supports minimalist, realism, traditional, neo-traditional, Japanese, geometric, blackwork, watercolor, and many more styles."
  },
  {
    question: "Do I need to create an account?",
    answer: "No. You can generate up to 3 free tattoo designs daily without signing up. Creating an account unlocks additional features and higher daily limits."
  }
];

export default function GeneratorPage() {
  return (
    <>
      <SchemaScripts
        pageType="generator"
        howTo={{
          name: "How to Generate a Tattoo Design with AI",
          description: "Follow these 3 steps to create an AI-generated tattoo reference preview in 30 seconds.",
          steps: howToSteps
        }}
        faqs={faqs}
      />
      <main>
        {/* Hero + Tool */}
        <section className="container article-hero stack" id="generator">
          <span className="eyebrow">Free AI Tattoo Generator Online</span>
          <h1>AI Tattoo Generator — Create Your Design in 30 Seconds</h1>
          <p className="lead">Describe your tattoo idea, pick a style and placement, and generate a visual reference you can bring to a licensed tattoo artist. No signup needed — 3 free designs daily.</p>
        </section>

        {/* How It Works */}
        <section className="section section-tight" id="how-it-works">
          <div className="container stack">
            <span className="eyebrow">How it works</span>
            <h2>From idea to artist-ready reference in 3 steps</h2>
            <div className="grid-3">
              <article className="card-dark" id="describe">
                <span className="eyebrow">Step 1</span>
                <h3>Describe</h3>
                <p>Add subject, symbolism, size, mood, and details to describe your tattoo idea in plain English.</p>
              </article>
              <article className="card-dark" id="choose">
                <span className="eyebrow">Step 2</span>
                <h3>Choose</h3>
                <p>Pick the tattoo style and body placement so the preview is useful, not random.</p>
              </article>
              <article className="card-dark" id="preview">
                <span className="eyebrow">Step 3</span>
                <h3>Preview</h3>
                <p>Create a reference preview to refine with a licensed tattoo artist before you commit to ink.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Generator Tool */}
        <section className="section section-tight">
          <div className="container">
            <AgeGateWrapper>
              <GeneratorForm />
            </AgeGateWrapper>
          </div>
        </section>

        {/* Features */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Features</span>
            <h2>Why use our AI tattoo generator</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>Free to try</h3>
                <p>3 free tattoo designs daily with no credit card or signup required.</p>
              </article>
              <article className="card-dark">
                <h3>Tattoo-specific AI</h3>
                <p>Trained on tattoo art styles, not generic AI images. Results are designed for skin and placement.</p>
              </article>
              <article className="card-dark">
                <h3>Placement-aware</h3>
                <p>Choose arm, wrist, shoulder, back, leg, and more. The preview adapts to the body part.</p>
              </article>
              <article className="card-dark">
                <h3>Artist-ready reference</h3>
                <p>Every design is framed as inspiration you can discuss with a licensed tattoo artist.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Supported Styles */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Styles</span>
            <h2>Supported tattoo styles</h2>
            <p>Our AI tattoo generator supports a wide range of styles. Explore popular options:</p>
            <div className="grid-3">
              <a href="/tattoo-ideas/realism" className="card-dark">Realism</a>
              <a href="/tattoo-ideas/minimalist" className="card-dark">Minimalist</a>
              <a href="/tattoo-ideas/traditional" className="card-dark">Traditional</a>
              <a href="/tattoo-ideas/japanese" className="card-dark">Japanese</a>
              <a href="/tattoo-ideas/geometric" className="card-dark">Geometric</a>
              <a href="/tattoo-ideas/blackwork" className="card-dark">Blackwork</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-tight" id="faq">
          <div className="container grid-2">
            <div className="stack">
              <span className="eyebrow">FAQ</span>
              <h2>Common questions about our AI tattoo generator</h2>
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
            <span className="eyebrow">Start free</span>
            <h2>Ready to preview your tattoo idea?</h2>
            <p>Describe your idea, pick a style, and create a reference before you commit to ink.</p>
            <a className="btn btn-primary" href="#generator">Generate Your Tattoo</a>
          </div>
        </section>
      </main>
    </>
  );
}
