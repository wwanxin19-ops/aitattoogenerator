import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Compare AI Tattoo Generators — Find the Best Tool",
  description: "Compare AI tattoo generators including AI Tattoo Generator, Tat.ink, and BlackInk.ai. Find the best tool for your tattoo design needs.",
  alternates: { canonical: "/compare" }
};

const competitors = [
  {
    name: "Tat.ink",
    strengths: ["Large inspiration gallery", "Community features"],
    weaknesses: ["Limited AI generation", "No placement preview", "Weak reference focus"],
    rating: 3.5
  },
  {
    name: "BlackInk.ai",
    strengths: ["Strong AI imagery", "Multiple styles"],
    weaknesses: ["Limited artist collaboration", "Weak reference export", "No placement guidance"],
    rating: 4.0
  },
  {
    name: "AI Tattoo Generator",
    strengths: ["Tattoo-specific prompts", "Placement-aware preview", "Reference-first approach", "Free daily credits"],
    weaknesses: ["Newer platform", "Growing style library"],
    rating: 4.5,
    isUs: true
  }
];

export default function ComparePage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Compare AI Tattoo Generators — Find the Best Tool",
          description: "Compare AI tattoo generators including AI Tattoo Generator, Tat.ink, and BlackInk.ai. Find the best tool for your tattoo design needs.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Comparison</span>
          <h1>Compare AI Tattoo Generators</h1>
          <p className="lead">See how AI Tattoo Generator compares to other popular tattoo design tools.</p>
        </section>

        <section className="section section-tight">
          <div className="container stack">
            {competitors.map((comp) => (
              <article key={comp.name} className={`card-dark ${comp.isUs ? 'card-highlight' : ''}`}>
                <h3>{comp.name} {comp.isUs && <span className="badge">Our Pick</span>}</h3>
                <div className="rating">Rating: {comp.rating}/5</div>
                
                <div className="stack-sm">
                  <h4>Strengths</h4>
                  <ul>
                    {comp.strengths.map((s) => (
                      <li key={s}>✅ {s}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="stack-sm">
                  <h4>Weaknesses</h4>
                  <ul>
                    {comp.weaknesses.map((w) => (
                      <li key={w}>❌ {w}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Try it yourself</span>
            <h2>Experience the Difference</h2>
            <p>Generate your first tattoo design free and see why users choose AI Tattoo Generator.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
