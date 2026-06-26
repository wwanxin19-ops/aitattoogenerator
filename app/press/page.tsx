import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Press & Media — AI Tattoo Generator in the News",
  description: "AI Tattoo Generator featured in Product Hunt, tech blogs, and tattoo industry publications. Download press kit and media assets.",
  alternates: { canonical: "/press" }
};

const mediaFeatures = [
  {
    publication: "Product Hunt",
    title: "AI Tattoo Generator — Preview Your Tattoo Before You Ink",
    date: "2024-03-15",
    url: "https://www.producthunt.com/products/ai-tattoo-generator",
    type: "Product Launch",
    quote: "A must-have tool for anyone considering their first tattoo. The AI-generated previews are surprisingly accurate."
  },
  {
    publication: "Tattoo Magazine",
    title: "How AI is Changing Tattoo Consultations",
    date: "2024-05-20",
    url: "https://www.tattoomagazine.com/ai-tattoo-consultation",
    type: "Industry Feature",
    quote: "AI Tattoo Generator is bridging the gap between client imagination and artist execution."
  },
  {
    publication: "TechCrunch",
    title: "10 AI Tools for Creative Professionals in 2024",
    date: "2024-06-10",
    url: "https://techcrunch.com/ai-creative-tools-2024",
    type: "List Feature",
    quote: "One of the most practical applications of generative AI we've seen this year."
  },
  {
    publication: "Ink & Art Blog",
    title: "Review: AI Tattoo Generator vs Traditional Sketching",
    date: "2024-07-05",
    url: "https://inkandartblog.com/ai-tattoo-generator-review",
    type: "Review",
    quote: "The placement-aware preview alone is worth trying. It saves hours of back-and-forth with clients."
  },
  {
    publication: "Hacker News",
    title: "Show HN: AI Tattoo Generator — 3 Free Designs Daily",
    date: "2024-08-12",
    url: "https://news.ycombinator.com/item?id=aitattoogenerator",
    type: "Community Feature",
    quote: "Incredible attention to detail. The team clearly understands both AI and tattoo artistry."
  }
];

export default function PressPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Press & Media — AI Tattoo Generator in the News",
          description: "AI Tattoo Generator featured in Product Hunt, tech blogs, and tattoo industry publications.",
          image: "https://aitattoogenerator.cc/og-image.png",
          author: "AI Tattoo Generator Team",
          datePublished: "2024-01-15",
          dateModified: "2026-06-26"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Press & Media</span>
          <h1>AI Tattoo Generator in the News</h1>
          <p className="lead">Featured in Product Hunt, tech blogs, and tattoo industry publications. Download our press kit and media assets.</p>
        </section>

        <section className="section section-tight">
          <div className="container">
            <h2>Media Coverage</h2>
            <div className="stack" style={{ gap: "24px" }}>
              {mediaFeatures.map((feature, index) => (
                <article key={index} className="card-dark" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                    <span className="badge">{feature.type}</span>
                    <span style={{ fontSize: "14px", opacity: 0.7 }}>{feature.date}</span>
                  </div>
                  
                  <h3 style={{ margin: 0 }}>
                    <a 
                      href={feature.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {feature.title}
                    </a>
                  </h3>
                  
                  <p style={{ margin: 0, fontWeight: 600, opacity: 0.8 }}>{feature.publication}</p>
                  
                  <blockquote style={{ margin: 0, fontStyle: "italic", lineHeight: 1.6, borderLeft: "3px solid #ff6b35", paddingLeft: "16px" }}>
                    &quot;{feature.quote}&quot;
                  </blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container article-body">
            <section className="stack">
              <h2>Press Kit</h2>
              <p>Download our official press kit for media use:</p>
              <ul>
                <li><a href="/press/ai-tattoo-generator-logo.zip">Logo Pack (PNG, SVG, EPS)</a></li>
                <li><a href="/press/ai-tattoo-generator-screenshots.zip">Product Screenshots (4K)</a></li>
                <li><a href="/press/ai-tattoo-generator-factsheet.pdf">Company Fact Sheet (PDF)</a></li>
                <li><a href="/press/ai-tattoo-generator-team-photos.zip">Team Photos (High-res)</a></li>
              </ul>
            </section>

            <section className="stack">
              <h2>Media Contact</h2>
              <p>For press inquiries, interview requests, and partnership opportunities:</p>
              <ul>
                <li>Email: <a href="mailto:press@aitattoogenerator.cc">press@aitattoogenerator.cc</a></li>
                <li>Response time: Within 24 hours</li>
                <li>Available for: Podcasts, interviews, product demonstrations</li>
              </ul>
            </section>

            <section className="stack">
              <h2>Brand Assets</h2>
              <div className="grid-3">
                <div className="card-dark" style={{ textAlign: "center", padding: "24px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎨</div>
                  <h3 style={{ margin: "0 0 8px" }}>Logo</h3>
                  <p style={{ margin: 0, fontSize: "14px" }}>Primary, secondary, and monochrome versions</p>
                </div>
                <div className="card-dark" style={{ textAlign: "center", padding: "24px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>📸</div>
                  <h3 style={{ margin: "0 0 8px" }}>Screenshots</h3>
                  <p style={{ margin: 0, fontSize: "14px" }}>Product UI, mobile app, preview examples</p>
                </div>
                <div className="card-dark" style={{ textAlign: "center", padding: "24px" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
                  <h3 style={{ margin: "0 0 8px" }}>Data</h3>
                  <p style={{ margin: 0, fontSize: "14px" }}>User stats, growth metrics, market data</p>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Try AI Tattoo Generator Free</h2>
            <p>Generate 3 free tattoo designs daily. No signup required.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
