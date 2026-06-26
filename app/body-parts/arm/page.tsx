import type { Metadata } from "next";
import { ComplianceNote, ContentCTA, ExampleImagePlaceholder, VisualComparison } from "@/components/Shared";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Arm Tattoo Ideas",
  description: "Explore arm tattoo ideas from shoulder to wrist, including placement planning and AI-generated reference prompts.",
  alternates: { canonical: "/body-parts/arm" }
};

export default function ArticlePage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Arm Tattoo Ideas — From Shoulder to Wrist",
          description: "Explore arm tattoo ideas from shoulder to wrist, including placement planning and AI-generated reference prompts.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Tattoo guide</span>
        <h1>Arm Tattoo Ideas — From Shoulder to Wrist</h1>
        <p className="lead">The arm is one of the most flexible tattoo placements because it can carry small symbols, wraparound compositions, or larger story-driven pieces.</p>
      </section>
      <section className="section section-tight">
        <div className="container article-body">
          <section className="stack"><h2>Arm Tattoo Placements</h2><ul><li>Upper arm: strong for larger realism, traditional, or symbolic work.</li><li>Forearm: visible, readable, and useful for designs with clear vertical flow.</li><li>Wrist: best for small minimalist ideas with simple silhouettes.</li><li>Shoulder: good for round compositions and designs that can expand later.</li></ul></section>
          <ExampleImagePlaceholder src="/body-parts/arm" />
          <section className="stack"><h2>What to Know Before Getting an Arm Tattoo</h2><p>Think about visibility, sleeve expansion, sun exposure, and how the design wraps when your arm moves. Bring references, but let your artist adapt the layout to the body.</p></section>
          <ContentCTA title="Generate Your Arm Design" href="/ai-tattoo-generator/?placement=arm" />
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
    </>
  );
}
