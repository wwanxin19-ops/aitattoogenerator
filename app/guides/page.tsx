import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Guides 2026 — How to Design, Care & Choose Your Ink",
  description: "Free tattoo guides 2026: how to design a tattoo, aftercare tips, choosing an artist, pain levels by body part, and cost breakdown. Start with our AI tattoo generator.",
  alternates: { canonical: "/guides" }
};

const guides = [
  {
    slug: "aftercare",
    name: "Tattoo Aftercare Guide",
    description: "Learn how to properly care for your new tattoo to ensure optimal healing and long-term vibrancy.",
    icon: "🩹"
  },
  {
    slug: "first-tattoo",
    name: "First Tattoo Guide",
    description: "Everything you need to know before getting your first tattoo, from preparation to aftercare.",
    icon: "🎯"
  },
  {
    slug: "choosing-artist",
    name: "Choosing a Tattoo Artist",
    description: "How to find and select the right tattoo artist for your style and design.",
    icon: "🎨"
  },
  {
    slug: "pain-levels",
    name: "Tattoo Pain Levels",
    description: "Understand pain levels for different body placements and how to manage discomfort.",
    icon: "📊"
  },
  {
    slug: "cost-guide",
    name: "Tattoo Cost Guide",
    description: "Factors that affect tattoo pricing and how to budget for your next piece.",
    icon: "💰"
  }
];

export default function GuidesPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Guides — Aftercare, Tips & Advice",
          description: "Comprehensive tattoo guides covering aftercare, first tattoo tips, choosing an artist, pain levels, and cost information.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Guides</span>
          <h1>Tattoo Guides & Resources</h1>
          <p className="lead">Expert advice on tattoo aftercare, preparation, and making informed decisions about your ink.</p>
        </section>

        <section className="section section-tight">
          <div className="container grid-2">
            {guides.map((guide) => (
              <article key={guide.slug} className="card-dark">
                <Link href={`/guides/${guide.slug}`} className="block">
                  <span className="text-2xl">{guide.icon}</span>
                  <h3>{guide.name}</h3>
                  <p>{guide.description}</p>
                  <span className="link-arrow">Read guide →</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>Use our AI tattoo generator to create a reference preview before visiting your artist.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
