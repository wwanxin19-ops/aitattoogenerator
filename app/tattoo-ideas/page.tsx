import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Ideas 2026 — 500+ AI Designs by Style, Theme & Placement",
  description: "Browse 500+ AI tattoo ideas by style (realism, minimalist, traditional, Japanese), theme (dragon, floral, geometric), and body placement. Generate your custom design free in 30 seconds.",
  alternates: { canonical: "/tattoo-ideas" }
};

const styles = [
  {
    slug: "realism",
    name: "Realism",
    description: "Photographic depth and detail for portraits, animals, and cinematic scenes. Best for upper arm, forearm, and back placements.",
    popular: ["Portraits", "Animals", "Flowers", "Celebrities"],
    image: "/og-image.png"
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    description: "Clean lines, simple shapes, and subtle symbolism for understated elegance. Perfect for wrist, ankle, and behind-the-ear placements.",
    popular: ["Fine Lines", "Symbols", "Quotes", "Nature"],
    image: "/og-image.png"
  },
  {
    slug: "traditional",
    name: "Traditional",
    description: "Bold lines, vibrant colors, and classic American tattoo imagery. Ideal for arm, chest, and leg placements.",
    popular: ["Roses", "Anchors", "Skulls", "Eagles"],
    image: "/og-image.png"
  },
  {
    slug: "watercolor",
    name: "Watercolor",
    description: "Fluid, painterly effects that mimic watercolor paintings on skin. Great for floral, abstract, and nature designs.",
    popular: ["Floral", "Abstract", "Animals", "Splashes"],
    image: "/og-image.png"
  },
  {
    slug: "geometric",
    name: "Geometric",
    description: "Precise shapes, patterns, and sacred geometry for modern designs. Perfect for arm, chest, and back placements.",
    popular: ["Mandala", "Sacred Geometry", "Dotwork", "Patterns"],
    image: "/og-image.png"
  },
  {
    slug: "japanese",
    name: "Japanese",
    description: "Traditional irezumi with rich symbolism and flowing compositions. Best for sleeves, back pieces, and leg tattoos.",
    popular: ["Dragons", "Koi Fish", "Cherry Blossoms", "Samurai"],
    image: "/og-image.png"
  }
];

const themes = [
  { name: "Dragon", slug: "dragon", styles: ["Japanese", "Realism", "Traditional"] },
  { name: "Floral", slug: "floral", styles: ["Watercolor", "Minimalist", "Traditional"] },
  { name: "Geometric", slug: "geometric-theme", styles: ["Geometric", "Minimalist"] },
  { name: "Animal", slug: "animal", styles: ["Realism", "Traditional", "Japanese"] },
  { name: "Portrait", slug: "portrait", styles: ["Realism"] },
  { name: "Abstract", slug: "abstract", styles: ["Watercolor", "Geometric", "Minimalist"] }
];

const placements = [
  { name: "Arm", slug: "arm", pain: "Low", visibility: "High" },
  { name: "Forearm", slug: "forearm", pain: "Low", visibility: "High" },
  { name: "Wrist", slug: "wrist", pain: "Medium", visibility: "High" },
  { name: "Chest", slug: "chest", pain: "High", visibility: "Medium" },
  { name: "Back", slug: "back", pain: "Medium", visibility: "Low" },
  { name: "Leg", slug: "leg", pain: "Low", visibility: "Medium" }
];

export default function TattooIdeasPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Ideas 2026 — 500+ AI Designs by Style, Theme & Placement",
          description: "Browse 500+ AI tattoo ideas by style, theme, and body placement. Generate your custom design free in 30 seconds.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Ideas 2026</span>
          <h1>Tattoo Ideas — 500+ AI Designs by Style, Theme & Placement</h1>
          <p className="lead">
            Explore our collection of 500+ AI-generated tattoo ideas across 6 major styles, 
            popular themes, and body placements. Find inspiration for your next tattoo and 
            generate a custom design in 30 seconds.
          </p>
          <div className="quick-actions">
            <Link className="btn btn-primary" href="/generate">Generate Your Design</Link>
            <Link className="btn btn-secondary" href="/placement">Browse by Placement</Link>
          </div>
        </section>

        {/* Style Gallery */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Browse by Style</span>
            <h2>Tattoo Styles — Find Your Aesthetic</h2>
            <p className="text-muted">
              Each style has unique characteristics. Choose the one that matches your personality 
              and design vision.
            </p>
            <div className="grid-3">
              {styles.map((style) => (
                <article key={style.slug} className="card-dark">
                  <Link href={`/tattoo-ideas/${style.slug}`} className="block">
                    <h3>{style.name}</h3>
                    <p>{style.description}</p>
                    <div className="tag-list">
                      {style.popular.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <span className="link-arrow">Explore {style.name} →</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Themes */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Popular Themes</span>
            <h2>Tattoo Themes — From Dragons to Florals</h2>
            <p className="text-muted">
              Discover popular tattoo themes and the styles that work best for each.
            </p>
            <div className="grid-3">
              {themes.map((theme) => (
                <article key={theme.slug} className="card-dark">
                  <h3>{theme.name} Tattoos</h3>
                  <p>Best styles: {theme.styles.join(", ")}</p>
                  <div className="tag-list">
                    {theme.styles.map((style) => (
                      <span key={style} className="tag">{style}</span>
                    ))}
                  </div>
                  <Link className="btn btn-secondary" href={`/generate?theme=${theme.slug}`}>
                    Generate {theme.name} Design
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Placement Guide */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Body Placement</span>
            <h2>Where to Place Your Tattoo</h2>
            <p className="text-muted">
              Different body parts suit different designs. Consider pain level, visibility, 
              and design size when choosing placement.
            </p>
            <div className="grid-3">
              {placements.map((placement) => (
                <article key={placement.slug} className="card-dark">
                  <Link href={`/placement/${placement.slug}`} className="block">
                    <h3>{placement.name}</h3>
                    <p>Pain level: {placement.pain} · Visibility: {placement.visibility}</p>
                    <span className="link-arrow">{placement.name} placement guide →</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">How it works</span>
            <h2>From Idea to Design in 3 Steps</h2>
            <div className="grid-3">
              <article className="card-dark">
                <span className="eyebrow">Step 1</span>
                <h3>Choose Your Style</h3>
                <p>Browse our style guides above to find the aesthetic that matches your vision.</p>
              </article>
              <article className="card-dark">
                <span className="eyebrow">Step 2</span>
                <h3>Describe Your Idea</h3>
                <p>Use our AI generator to describe your tattoo idea in plain English. Add details about subject, style, and placement.</p>
              </article>
              <article className="card-dark">
                <span className="eyebrow">Step 3</span>
                <h3>Generate & Preview</h3>
                <p>Get your AI-generated reference in 30 seconds. Preview before you commit to ink.</p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">FAQ</span>
            <h2>Common Questions About Tattoo Ideas</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>How do I choose a tattoo style?</h3>
                <p>Consider your design subject, personal aesthetic, and the artist you want to work with. Realism suits portraits, minimalist works for symbols, and traditional is timeless.</p>
              </article>
              <article className="card-dark">
                <h3>Can I combine multiple styles?</h3>
                <p>Yes! Many tattoos blend styles — like watercolor realism or geometric traditional. Our AI can generate hybrid designs based on your description.</p>
              </article>
              <article className="card-dark">
                <h3>What if I don&apos;t know what I want?</h3>
                <p>Browse our style guides and popular themes above for inspiration. You can also generate multiple designs with different styles to compare.</p>
              </article>
              <article className="card-dark">
                <h3>Are these designs unique?</h3>
                <p>Each AI-generated design is unique to your description. Use it as a reference and work with your tattoo artist to create a one-of-a-kind piece.</p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Custom Tattoo Design</h2>
            <p>
              Found inspiration? Describe your idea and generate a unique reference design 
              in 30 seconds. No signup needed — 3 free designs daily.
            </p>
            <div className="quick-actions">
              <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
              <Link className="btn btn-secondary" href="/compare">Compare Styles</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
