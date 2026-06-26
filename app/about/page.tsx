import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "About AI Tattoo Generator — Our Mission, Team & Expertise",
  description: "Meet the AI Tattoo Generator team. Built by tattoo enthusiasts and AI experts to help people visualize tattoo ideas before getting inked. 10K+ designs created.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "About AI Tattoo Generator — Our Mission, Team & Expertise",
          description: "Meet the AI Tattoo Generator team. Built by tattoo enthusiasts and AI experts to help people visualize tattoo ideas before getting inked.",
          image: "https://aitattoogenerator.cc/og-image.png",
          author: "AI Tattoo Generator Team",
          datePublished: "2024-01-15",
          dateModified: "2026-06-26"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">About Us</span>
          <h1>About AI Tattoo Generator</h1>
          <p className="lead">Helping people visualize their tattoo ideas before making a permanent decision. Built by tattoo enthusiasts and AI experts.</p>
        </section>

        <section className="section section-tight">
          <div className="container article-body">
            <section className="stack">
              <h2>Our Mission</h2>
              <p>AI Tattoo Generator was created to solve a simple problem: people often struggle to communicate their tattoo vision to artists. We believe that having a clear visual reference leads to better tattoos and happier clients.</p>
              <p>Since launching in 2024, we have helped <strong>10,000+ users</strong> create tattoo previews, ranging from first-timers exploring ideas to experienced collectors planning their next piece.</p>
            </section>
            
            <section className="stack">
              <h2>Our Team</h2>
              <div className="grid-2">
                <article className="card-dark">
                  <h3>Product & AI Team</h3>
                  <p>Our core team combines expertise in machine learning, computer vision, and user experience design. We have 15+ years combined experience building AI-powered creative tools.</p>
                </article>
                <article className="card-dark">
                  <h3>Tattoo Industry Advisors</h3>
                  <p>We work with licensed tattoo artists who review our AI outputs, provide feedback on style accuracy, and ensure our tool respects the artist-client relationship.</p>
                </article>
              </div>
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

            <section className="stack">
              <h2>Our Expertise</h2>
              <div className="grid-3">
                <article className="card-dark">
                  <h3>50+ Tattoo Styles</h3>
                  <p>Our AI is trained on professional tattoo art across realism, minimalist, traditional, Japanese, geometric, and watercolor styles.</p>
                </article>
                <article className="card-dark">
                  <h3>Placement-Aware</h3>
                  <p>We understand how designs flow on different body parts — arm, back, chest, leg, wrist, and more.</p>
                </article>
                <article className="card-dark">
                  <h3>Continuous Improvement</h3>
                  <p>We update our models monthly based on artist feedback and user preferences.</p>
                </article>
              </div>
            </section>

            <section className="stack">
              <h2>Recognition</h2>
              <ul>
                <li>Featured on Product Hunt (2024)</li>
                <li>10,000+ designs created by users worldwide</li>
                <li>4.5/5 average user rating</li>
                <li>Used by tattoo artists in 30+ countries as a client communication tool</li>
              </ul>
            </section>

            <section className="stack">
              <h2>Contact & Support</h2>
              <p>We are committed to helping you plan your perfect tattoo. Reach out to us:</p>
              <ul>
                <li>Email: <a href="mailto:support@aitattoogenerator.cc">support@aitattoogenerator.cc</a></li>
                <li>Response time: Within 24 hours</li>
                <li>Business hours: Monday–Friday, 9 AM–6 PM EST</li>
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
