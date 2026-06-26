import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Best AI Tattoo Generator 2026 — Top 3 Compared (Free vs Paid)",
  description: "Compare the best AI tattoo generators of 2026: AI Tattoo Generator vs BlackInk.ai vs Tat.ink. Features, pricing, free tiers, and design quality compared. Find the right tool for you.",
  alternates: { canonical: "/compare" }
};

const comparisonData = [
  {
    feature: "Free daily designs",
    aiTattoo: "3 free designs",
    blackink: "Limited trial",
    tatink: "1 free design",
    winner: "aiTattoo"
  },
  {
    feature: "Signup required",
    aiTattoo: "No signup needed",
    blackink: "Account required",
    tatink: "Account required",
    winner: "aiTattoo"
  },
  {
    feature: "Pricing",
    aiTattoo: "Free + credits from $4.99",
    blackink: "$15/month subscription",
    tatink: "$9.99/month subscription",
    winner: "aiTattoo"
  },
  {
    feature: "Tattoo-specific AI",
    aiTattoo: "Yes — trained on tattoo art",
    blackink: "General AI models",
    tatink: "Limited AI generation",
    winner: "aiTattoo"
  },
  {
    feature: "Placement-aware preview",
    aiTattoo: "Yes — arm, wrist, back, leg, etc.",
    blackink: "No placement options",
    tatink: "No placement preview",
    winner: "aiTattoo"
  },
  {
    feature: "Style variety",
    aiTattoo: "Realism, minimalist, traditional, Japanese, geometric",
    blackink: "Multiple general styles",
    tatink: "Large inspiration gallery",
    winner: "tie"
  },
  {
    feature: "Reference export",
    aiTattoo: "High-res with artist disclaimer",
    blackink: "Standard export",
    tatink: "Limited export options",
    winner: "aiTattoo"
  },
  {
    feature: "Community features",
    aiTattoo: "Coming soon",
    blackink: "Basic sharing",
    tatink: "Active community gallery",
    winner: "tatink"
  },
  {
    feature: "Mobile app",
    aiTattoo: "Web-based (responsive)",
    blackink: "iOS app available",
    tatink: "iOS app available",
    winner: "tie"
  }
];

const detailedComparison = [
  {
    category: "Pricing & Free Tier",
    aiTattoo: "3 free designs daily with no signup. Credit packs start at $4.99 for 10 additional designs. No subscription required.",
    blackink: "7-day free trial, then $15/month or $99/year. No free tier after trial. Subscription required for all features.",
    tatink: "1 free design upon signup, then $9.99/month. Limited free browsing of community gallery."
  },
  {
    category: "Design Quality",
    aiTattoo: "Tattoo-specific AI trained on professional tattoo art. Understands line work, shading, and how designs flow on skin. Placement-aware previews show realistic results.",
    blackink: "Strong general AI imagery with good detail. However, designs sometimes look like digital art rather than tattoo-ready references. No placement context.",
    tatink: "Primarily an inspiration gallery with limited AI generation. AI designs are basic and lack tattoo-specific refinement."
  },
  {
    category: "User Experience",
    aiTattoo: "Simple 3-step process: describe, choose style/placement, generate. No account needed to start. Results in 30 seconds.",
    blackink: "Clean interface with style selection. Requires account creation before generating. Results take 1-2 minutes.",
    tatink: "Gallery-first approach — browse before generating. Account required. AI generation is secondary feature."
  },
  {
    category: "Artist Collaboration",
    aiTattoo: "Built-in reference disclaimer encourages artist consultation. High-res exports suitable for bringing to tattoo shops. Placement-aware previews help artists understand your vision.",
    blackink: "Standard image export. No specific features for artist collaboration. Users must manually explain their vision.",
    tatink: "Community-focused but weak artist tools. Designs are more for inspiration than direct artist reference."
  }
];

const faqs = [
  {
    question: "Which AI tattoo generator is best for beginners?",
    answer: "AI Tattoo Generator is best for beginners because it requires no signup, offers 3 free designs daily, and has a simple 3-step process. The placement-aware preview helps beginners visualize results on their body before committing."
  },
  {
    question: "Which is the cheapest tattoo generator?",
    answer: "AI Tattoo Generator has the most affordable model: 3 free designs daily with no subscription. Paid credits start at $4.99. BlackInk.ai costs $15/month and Tat.ink is $9.99/month, both requiring subscriptions."
  },
  {
    question: "Can I switch between tattoo generators?",
    answer: "Yes. There's no lock-in with any platform. You can use multiple generators to compare results. Many users start with our free tier, then explore paid options if they need more designs."
  },
  {
    question: "Do these generators replace tattoo artists?",
    answer: "No. All three tools create reference previews, not final designs. We explicitly encourage bringing AI previews to licensed tattoo artists for adaptation to your skin, placement, and aging."
  },
  {
    question: "Which generator has the best design quality?",
    answer: "For tattoo-specific quality, AI Tattoo Generator leads because it's trained on tattoo art rather than generic images. BlackInk.ai produces beautiful general AI art. Tat.ink excels at inspiration browsing but has weaker AI generation."
  }
];

export default function ComparePage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Best AI Tattoo Generator 2026 — Top 3 Compared (Free vs Paid)",
          description: "Compare the best AI tattoo generators of 2026. Features, pricing, and design quality compared.",
          image: "https://aitattoogenerator.cc/og-image.png",
          datePublished: "2026-01-15",
          dateModified: "2026-01-15"
        }}
      />
      
      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">2026 Comparison</span>
          <h1>Best AI Tattoo Generator — Top 3 Compared</h1>
          <p className="lead">AI Tattoo Generator vs BlackInk.ai vs Tat.ink: we compare pricing, free tiers, design quality, and features to help you choose the right tool.</p>
        </section>

        {/* Quick Comparison Table */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">At a glance</span>
            <h2>Quick comparison table</h2>
            
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th className="highlight-col">AI Tattoo Generator</th>
                    <th>BlackInk.ai</th>
                    <th>Tat.ink</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className={row.winner === "aiTattoo" ? "winner-row" : ""}>
                      <td><strong>{row.feature}</strong></td>
                      <td className={row.winner === "aiTattoo" ? "highlight-cell" : ""}>
                        {row.aiTattoo} {row.winner === "aiTattoo" && "✅"}
                      </td>
                      <td className={row.winner === "blackink" ? "highlight-cell" : ""}>
                        {row.blackink} {row.winner === "blackink" && "✅"}
                      </td>
                      <td className={row.winner === "tatink" ? "highlight-cell" : ""}>
                        {row.tatink} {row.winner === "tatink" && "✅"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Detailed comparison</span>
            <h2>In-depth feature comparison</h2>
            
            {detailedComparison.map((section, i) => (
              <article className="card-dark comparison-section" key={i}>
                <h3>{section.category}</h3>
                <div className="grid-3">
                  <div className="stack-sm">
                    <h4 className="brand-ai">AI Tattoo Generator</h4>
                    <p>{section.aiTattoo}</p>
                  </div>
                  <div className="stack-sm">
                    <h4 className="brand-blackink">BlackInk.ai</h4>
                    <p>{section.blackink}</p>
                  </div>
                  <div className="stack-sm">
                    <h4 className="brand-tatink">Tat.ink</h4>
                    <p>{section.tatink}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Pros & Cons</span>
            <h2>Strengths and weaknesses</h2>
            
            <div className="grid-3">
              <article className="card-dark">
                <h3 className="brand-ai">AI Tattoo Generator</h3>
                <div className="pros-cons">
                  <div className="pros">
                    <h4>✅ Pros</h4>
                    <ul>
                      <li>3 free designs daily</li>
                      <li>No signup required</li>
                      <li>Tattoo-specific AI</li>
                      <li>Placement-aware previews</li>
                      <li>No subscription</li>
                      <li>Artist-ready references</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <h4>❌ Cons</h4>
                    <ul>
                      <li>Newer platform</li>
                      <li>Growing style library</li>
                      <li>No mobile app yet</li>
                      <li>Community features coming</li>
                    </ul>
                  </div>
                </div>
              </article>
              
              <article className="card-dark">
                <h3 className="brand-blackink">BlackInk.ai</h3>
                <div className="pros-cons">
                  <div className="pros">
                    <h4>✅ Pros</h4>
                    <ul>
                      <li>Strong AI imagery</li>
                      <li>Multiple styles</li>
                      <li>iOS app available</li>
                      <li>Established brand</li>
                      <li>Good detail quality</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <h4>❌ Cons</h4>
                    <ul>
                      <li>$15/month subscription</li>
                      <li>No free tier after trial</li>
                      <li>No placement preview</li>
                      <li>General AI (not tattoo-specific)</li>
                      <li>Weak artist collaboration</li>
                    </ul>
                  </div>
                </div>
              </article>
              
              <article className="card-dark">
                <h3 className="brand-tatink">Tat.ink</h3>
                <div className="pros-cons">
                  <div className="pros">
                    <h4>✅ Pros</h4>
                    <ul>
                      <li>Large inspiration gallery</li>
                      <li>Active community</li>
                      <li>iOS app available</li>
                      <li>Good for browsing</li>
                      <li>Social features</li>
                    </ul>
                  </div>
                  <div className="cons">
                    <h4>❌ Cons</h4>
                    <ul>
                      <li>Limited AI generation</li>
                      <li>No placement preview</li>
                      <li>Subscription required</li>
                      <li>Weak reference export</li>
                      <li>Not artist-focused</li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Verdict */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Our verdict</span>
            <h2>Which AI tattoo generator should you choose?</h2>
            
            <div className="verdict-grid">
              <article className="verdict-card">
                <h3>Choose AI Tattoo Generator if...</h3>
                <ul>
                  <li>You want to try before committing</li>
                  <li>You prefer pay-as-you-go over subscriptions</li>
                  <li>Tattoo-specific quality matters to you</li>
                  <li>You want placement-aware previews</li>
                  <li>You plan to consult a tattoo artist</li>
                </ul>
              </article>
              
              <article className="verdict-card">
                <h3>Choose BlackInk.ai if...</h3>
                <ul>
                  <li>You want the highest detail AI art</li>
                  <li>You prefer a subscription model</li>
                  <li>You need an iOS app</li>
                  <li>General AI art quality is your priority</li>
                </ul>
              </article>
              
              <article className="verdict-card">
                <h3>Choose Tat.ink if...</h3>
                <ul>
                  <li>You want to browse community designs</li>
                  <li>Social features are important</li>
                  <li>You need an iOS app</li>
                  <li>AI generation is secondary</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container grid-2">
            <div className="stack">
              <span className="eyebrow">FAQ</span>
              <h2>Common questions about AI tattoo generators</h2>
            </div>
            <div className="stack">
              {faqs.map((faq, i) => (
                <details className="card-dark" key={i}>
                  <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 18 }}>{faq.question}</summary>
                  <p style={{ marginTop: 14 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="container card-paper stack">
            <span className="eyebrow">Try the winner</span>
            <h2>Start with the best free AI tattoo generator</h2>
            <p>3 free designs daily. No signup. No credit card. See why users choose AI Tattoo Generator.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
