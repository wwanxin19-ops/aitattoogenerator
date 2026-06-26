import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Blog — Trends, Inspiration & Design Ideas",
  description: "Latest tattoo trends, design inspiration, and expert advice from the AI Tattoo Generator blog.",
  alternates: { canonical: "/blog" }
};

const posts = [
  {
    slug: "2026-tattoo-trends",
    title: "2026 Tattoo Trends to Watch",
    excerpt: "From AI-assisted design to minimalist revival, discover what's trending in the tattoo world this year.",
    date: "2026-06-15",
    category: "Trends"
  },
  {
    slug: "choosing-tattoo-style",
    title: "How to Choose the Right Tattoo Style",
    excerpt: "A comprehensive guide to finding the perfect tattoo style that matches your personality and vision.",
    date: "2026-06-10",
    category: "Guide"
  },
  {
    slug: "tattoo-placement-tips",
    title: "Tattoo Placement: Tips from Artists",
    excerpt: "Professional tattoo artists share their advice on choosing the best placement for your design.",
    date: "2026-06-05",
    category: "Tips"
  }
];

export default function BlogPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Blog — Trends, Inspiration & Design Ideas",
          description: "Latest tattoo trends, design inspiration, and expert advice from the AI Tattoo Generator blog.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Blog</span>
          <h1>Tattoo Blog</h1>
          <p className="lead">Latest trends, design inspiration, and expert advice for your next tattoo.</p>
        </section>

        <section className="section section-tight">
          <div className="container stack">
            {posts.map((post) => (
              <article key={post.slug} className="card-dark">
                <Link href={`/blog/${post.slug}`} className="block">
                  <span className="eyebrow">{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <time>{post.date}</time>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>Use our AI tattoo generator to create a reference preview.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
