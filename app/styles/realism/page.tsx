import type { Metadata } from "next";
import { ComplianceNote, ContentCTA, ExampleImagePlaceholder, VisualComparison } from "@/components/Shared";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Realism Tattoo Ideas 2026 — Designs That Look Like Photographs",
  description: "Explore realism tattoo ideas, best placements, and how to create AI-generated reference designs that look like photographs. Learn about portraits, animals, and cinematic scenes.",
  alternates: { canonical: "/styles/realism" }
};

const realismExamples = [
  {
    subject: "Portraits",
    description: "Family members, celebrities, pets, or historical figures rendered with photographic accuracy.",
    bestPlacement: "Upper arm, forearm, chest, back",
    tips: "Ensure high-quality reference photos. Black and grey portraits age better than color."
  },
  {
    subject: "Animals",
    description: "Wildlife, pets, and mythical creatures with lifelike fur, scales, and eyes.",
    bestPlacement: "Thigh, upper arm, shoulder, back",
    tips: "Focus on eye detail for emotional impact. Consider the animal's symbolic meaning."
  },
  {
    subject: "Nature Scenes",
    description: "Landscapes, forests, oceans, and celestial scenes with depth and atmosphere.",
    bestPlacement: "Back, chest, sleeve, thigh",
    tips: "Use atmospheric perspective for depth. Consider how the scene wraps around the body."
  },
  {
    subject: "Objects & Still Life",
    description: "Clocks, cameras, flowers, and personal items with hyper-realistic detail.",
    bestPlacement: "Forearm, calf, shoulder, chest",
    tips: "Choose objects with personal significance. Consider composition and lighting."
  }
];

const realismStyles = [
  { name: "Black and Grey", description: "Monochromatic shading using black ink diluted to create grey tones. Classic and timeless." },
  { name: "Color Realism", description: "Full color palettes matching real-life subjects. Vibrant but may fade faster over time." },
  { name: "Hyper-Realism", description: "Extreme detail that mimics high-resolution photography. Requires skilled artists and larger canvases." },
  { name: "3D Realism", description: "Designs that appear to pop off the skin using shadow and perspective techniques." }
];

const bestArtists = [
  "Look for artists specializing in realism (not just general tattooing)",
  "Check their portfolio for healed work (not just fresh photos)",
  "Ensure they have experience with your specific subject (portraits vs animals)",
  "Ask about their approach to aging and long-term readability"
];

export default function ArticlePage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Realism Tattoo Ideas 2026 — Designs That Look Like Photographs",
          description: "Explore realism tattoo ideas, best placements, and how to create AI-generated reference designs that look like photographs.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      <main>
      {/* Hero */}
      <section className="container article-hero stack">
        <span className="eyebrow">Tattoo guide</span>
        <h1>Realism Tattoo Ideas — AI-Generated Designs That Look Like Photographs</h1>
        <p className="lead">Realism tattoos work best when the subject, light, contrast, and placement are planned before the needle touches skin. Learn how to design a realism tattoo that stays stunning for years.</p>
      </section>

      {/* What is Realism */}
      <section className="section section-tight">
        <div className="container article-body">
          <section className="stack">
            <h2>What Is Realism Tattoo Style?</h2>
            <p>Realism tattooing aims to recreate subjects with photographic depth, shading, and proportion. Unlike traditional or neo-traditional styles that use bold outlines and stylized colors, realism focuses on:</p>
            <ul>
              <li><strong>Accurate proportions</strong> — subjects look true to life, not stylized</li>
              <li><strong>Gradual shading</strong> — smooth transitions from light to dark without harsh lines</li>
              <li><strong>Texture detail</strong> — skin, fur, fabric, and surfaces rendered authentically</li>
              <li><strong>Light and shadow</strong> — realistic lighting sources create depth and dimension</li>
            </ul>
            <p>Portraits, animals, statues, flowers, and cinematic scenes are common subjects because they benefit from light and shadow to create impact.</p>
          </section>

          <section className="stack">
            <h2>Popular Realism Tattoo Subjects</h2>
            <div className="grid-2">
              {realismExamples.map((example) => (
                <article key={example.subject} className="card-dark">
                  <h3>{example.subject}</h3>
                  <p>{example.description}</p>
                  <p><strong>Best placement:</strong> {example.bestPlacement}</p>
                  <p className="text-sm text-muted">{example.tips}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="stack">
            <h2>Realism Tattoo Sub-Styles</h2>
            <div className="grid-2">
              {realismStyles.map((style) => (
                <article key={style.name} className="card-dark">
                  <h3>{style.name}</h3>
                  <p>{style.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="stack">
            <h2>Best Placements for Realism Tattoos</h2>
            <ul>
              <li><strong>Upper arm</strong> — Great for portraits and medium-sized designs. Easy to show or cover.</li>
              <li><strong>Forearm</strong> — Perfect for vertical compositions like statues or standing figures.</li>
              <li><strong>Shoulder</strong> — Ideal for circular designs or subjects that benefit from the shoulder&apos;s curve.</li>
              <li><strong>Thigh</strong> — Large, flat canvas for detailed scenes and full-color work.</li>
              <li><strong>Back</strong> — Maximum space for elaborate compositions like landscapes or full back pieces.</li>
              <li><strong>Chest</strong> — Symmetrical designs work well here, especially portraits and meaningful symbols.</li>
            </ul>
            <p><strong>Key consideration:</strong> Realism needs enough room for detail. Small areas (wrist, ankle, behind ear) are generally not suitable for realism because the detail will blur over time.</p>
          </section>

          <ExampleImagePlaceholder src="/styles/realism" />

          <section className="stack">
            <h2>How to Get a Realism Tattoo That Lasts</h2>
            <p>Realism tattoos require special care to maintain their detail over time:</p>
            <ol>
              <li><strong>Choose the right artist</strong> — Realism is one of the most technically demanding styles. Not every tattoo artist can execute realism well.</li>
              <li><strong>Use high-quality reference photos</strong> — The better your reference, the better the result. Provide multiple angles and lighting conditions.</li>
              <li><strong>Plan for size</strong> — Realism needs space for detail. A portrait the size of a quarter won&apos;t hold detail. Plan for at least palm-sized or larger.</li>
              <li><strong>Consider black and grey</strong> — Color realism is beautiful but fades faster. Black and grey ages more gracefully and requires less touch-up.</li>
              <li><strong>Protect from sun</strong> — UV exposure is the #1 enemy of tattoo detail. Use SPF 50+ sunscreen on your tattoo when exposed.</li>
              <li><strong>Schedule touch-ups</strong> — Even the best realism tattoos benefit from a touch-up after 5-10 years to restore contrast.</li>
            </ol>
          </section>

          <section className="stack">
            <h2>Finding the Right Realism Tattoo Artist</h2>
            <ul>
              {bestArtists.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
            <p><strong>Red flags:</strong> Artists who claim they can do realism but have no healed examples in their portfolio. Always ask to see healed work (6+ months old) not just fresh photos.</p>
          </section>

          <section className="stack">
            <h2>Using AI to Plan Your Realism Tattoo</h2>
            <p>Our AI tattoo generator can help you plan your realism tattoo by:</p>
            <ul>
              <li>Creating a visual reference from your description and reference photos</li>
              <li>Previewing how the design flows on your chosen body placement</li>
              <li>Testing different compositions before committing to the final design</li>
              <li>Generating multiple variations to show your artist</li>
            </ul>
            <p>Remember: the AI-generated design is a reference, not the final tattoo. A skilled realism artist will adapt the concept for your skin, refine the composition, and ensure long-term readability.</p>
          </section>

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
    </>
  );
}
