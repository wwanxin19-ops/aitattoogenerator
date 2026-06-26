import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "About AI Tattoo Generator — Our Mission & Story",
  description: "Learn about AI Tattoo Generator's mission to help people visualize tattoo ideas before getting inked. Built for cautious tattoo planning.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "About AI Tattoo Generator — Our Mission & Story",
          description: "Learn about AI Tattoo Generator's mission to help people visualize tattoo ideas before getting inked. Built for cautious tattoo planning.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">About</span>
          <h1>About AI Tattoo Generator</h1>
          <p className="lead">Helping people visualize their tattoo ideas before making a permanent decision.</p>
        </section>

        <section className="section section-tight">
          <div className="container article-body">
            <section className="stack">
              <h2>Our Mission</h2>
              <p>AI Tattoo Generator was created to solve a simple problem: people often struggle to communicate their tattoo vision to artists. We believe that having a clear visual reference leads to better tattoos and happier clients.</p>
            </section>
            
            <section className="stack">
              <h2>How It Works</h2>
              <p>Our AI-powered tool generates tattoo reference previews based on your description, chosen style, and body placement. These previews are designed to be starting points for discussion with licensed tattoo artists, not final designs.</p>
            </section>
            
            <section className="stack">
              <h2>Our Approach</h2>
              <p>We prioritize:</p>
              <ul>
                <li><strong>Reference-first:</strong> All generated designs include disclaimers that they are for inspiration only.</li>
                <li><strong>Artist collaboration:</strong> Our tool is designed to enhance, not replace, the artist-client relationship.</li>
                <li><strong>Safe exploration:</strong> Free daily credits let you experiment without commitment.</li>
                <li><strong>Educational content:</strong> We provide guides on aftercare, placement, and choosing artists.</li>
              </ul>
            </section>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>Try our AI tattoo generator free and see your idea come to life.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
