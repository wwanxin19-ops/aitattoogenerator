import type { Metadata } from "next";
import { ComplianceNote, ContentCTA, ExampleImagePlaceholder, VisualComparison } from "@/components/Shared";

export const metadata: Metadata = {
  title: "Realism Tattoo Ideas",
  description: "Explore realism tattoo ideas, best placements, and how to create AI-generated reference designs that look like photographs.",
  alternates: { canonical: "/styles/realism/" }
};

export default function ArticlePage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Tattoo guide</span>
        <h1>Realism Tattoo Ideas — AI-Generated Designs That Look Like Photographs</h1>
        <p className="lead">Realism tattoos work best when the subject, light, contrast, and placement are planned before the needle touches skin.</p>
      </section>
      <section className="section section-tight">
        <div className="container article-body">
          <section className="stack"><h2>What Is Realism Tattoo Style?</h2><p>Realism tattooing aims to recreate subjects with photographic depth, shading, and proportion. Portraits, animals, statues, flowers, and cinematic scenes are common because they benefit from light and shadow.</p></section><section className="stack"><h2>Best for + popular placements</h2><ul><li>Portraits, animals, mythological figures, and objects with strong texture.</li><li>Upper arm, forearm, shoulder, thigh, and back pieces with enough surface area.</li><li>Ideas where contrast and long-term readability matter more than tiny detail.</li></ul></section>
          <ExampleImagePlaceholder />
          <section className="stack"><h2>How to Get a Realism Tattoo That Lasts</h2><p>Use the generated image as a reference, then ask your artist to adapt contrast, line support, and size for aging on skin. Realism often needs enough room to breathe.</p></section>
          <ContentCTA title="Generate Your Realism Design" href="/ai-tattoo-generator/?style=realism" />
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
