import type { Metadata } from "next";
import { ComplianceNote, ContentCTA, ExampleImagePlaceholder, VisualComparison } from "@/components/Shared";

export const metadata: Metadata = {
  title: "Minimalist Tattoo Ideas",
  description: "Explore minimalist tattoo ideas, placement tips, and simple AI-generated reference designs built around strong meaning.",
  alternates: { canonical: "/styles/minimalist" }
};

export default function ArticlePage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Tattoo guide</span>
        <h1>Minimalist Tattoo Ideas — Simple Lines, Strong Meaning</h1>
        <p className="lead">Minimalist tattoos rely on restraint: fewer lines, clearer symbolism, and placement choices that keep the design readable.</p>
      </section>
      <section className="section section-tight">
        <div className="container article-body">
          <section className="stack"><h2>What Is Minimalist Tattoo Style?</h2><p>Minimalist tattoos use simple lines, small shapes, negative space, and focused symbolism. The goal is not to add more detail, but to remove everything that does not serve the idea.</p></section><section className="stack"><h2>Best for + popular placements</h2><ul><li>Names, dates, tiny symbols, botanical linework, constellations, and abstract marks.</li><li>Wrist, forearm, ankle, collarbone, behind the ear, and small shoulder placements.</li><li>Ideas where meaning matters more than visual density.</li></ul></section>
          <ExampleImagePlaceholder src="/styles/minimalist" />
          <section className="stack"><h2>How to Make Minimalist Tattoos Work</h2><p>Keep the idea specific, avoid overcrowding, and ask your artist whether the line weight will age well at your chosen size.</p></section>
          <ContentCTA title="Generate Your Minimalist Design" href="/ai-tattoo-generator/?style=minimalist" />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container stack">
          <span className="eyebrow">Compare workflows</span>
          <h2>Use AI as a planning tool, not a final tattoo decision</h2>
          <VisualComparison />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container">
          <ComplianceNote />
        </div>
      </section>
    </main>
  );
}
