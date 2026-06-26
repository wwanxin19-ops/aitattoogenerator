import type { Metadata } from "next";
import { GeneratorForm } from "@/components/GeneratorForm";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "AI Tattoo Generator — See Your Design in 30 Seconds",
  description: "Describe your tattoo idea, choose a style and placement, and create a reference preview in 30 seconds.",
  alternates: { canonical: "/ai-tattoo-generator" }
};

const howToSteps = [
  {
    name: "Describe",
    text: "Add subject, symbolism, size, mood, and details to describe your tattoo idea.",
    url: "https://aitattoogenerator.cc/ai-tattoo-generator#describe"
  },
  {
    name: "Choose",
    text: "Pick the style and body placement for a useful preview.",
    url: "https://aitattoogenerator.cc/ai-tattoo-generator#choose"
  },
  {
    name: "Preview",
    text: "Create a reference to refine with a licensed tattoo artist.",
    url: "https://aitattoogenerator.cc/ai-tattoo-generator#preview"
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
      />
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
        <GeneratorForm />
      </section>
    </main>
    </>
  );
}
