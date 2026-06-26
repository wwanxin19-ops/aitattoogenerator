import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Ideas — Explore Styles, Placements & Designs",
  description: "Browse tattoo ideas by style and body placement. Find realism, minimalist, traditional, and more tattoo designs with AI-generated previews.",
  alternates: { canonical: "/tattoo-ideas" }
};

const styles = [
  {
    slug: "realism",
    name: "Realism",
    description: "Photographic depth and detail for portraits, animals, and cinematic scenes.",
    image: "/og-image.png"
  },
  {
    slug: "minimalist",
    name: "Minimalist",
    description: "Clean lines, simple shapes, and subtle symbolism for understated elegance.",
    image: "/og-image.png"
  },
  {
    slug: "traditional",
    name: "Traditional",
    description: "Bold lines, vibrant colors, and classic American tattoo imagery.",
    image: "/og-image.png"
  },
  {
    slug: "watercolor",
    name: "Watercolor",
    description: "Fluid, painterly effects that mimic watercolor paintings on skin.",
    image: "/og-image.png"
  },
  {
    slug: "geometric",
    name: "Geometric",
    description: "Precise shapes, patterns, and sacred geometry for modern designs.",
    image: "/og-image.png"
  },
  {
    slug: "japanese",
    name: "Japanese",
    description: "Traditional irezumi with rich symbolism and flowing compositions.",
    image: "/og-image.png"
  }
];

export default function TattooIdeasPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Ideas — Explore Styles, Placements & Designs",
          description: "Browse tattoo ideas by style and body placement. Find realism, minimalist, traditional, and more tattoo designs with AI-generated previews.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Ideas</span>
          <h1>Tattoo Ideas by Style</h1>
          <p className="lead">Explore different tattoo styles and find the perfect design for your next piece. Each style guide includes AI-generated previews and placement tips.</p>
        </section>

        <section className="section section-tight">
          <div className="container grid-3">
            {styles.map((style) => (
              <article key={style.slug} className="card-dark">
                <Link href={`/tattoo-ideas/${style.slug}`} className="block">
                  <h3>{style.name}</h3>
                  <p>{style.description}</p>
                  <span className="link-arrow">Explore {style.name} →</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>Use our AI tattoo generator to create a reference preview in your chosen style.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
