import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Is AI Tattoo Generator Free? — Pricing Explained (2026)",
  description: "Yes, AI Tattoo Generator is free. Get 3 tattoo designs daily with no signup. Learn about free tier limits, paid credits, and how our pricing compares to BlackInk.ai and other alternatives.",
  alternates: { canonical: "/is-ai-tattoo-generator-free" }
};

const faqs = [
  {
    question: "Is AI Tattoo Generator completely free?",
    answer: "Yes, AI Tattoo Generator offers a free tier with 3 tattoo designs daily. No signup, no credit card, no subscription required. You can use the free tier indefinitely. Paid credits are available if you need more than 3 designs per day."
  },
  {
    question: "What are the free tier limits?",
    answer: "The free tier includes: 3 tattoo generations per day, basic resolution previews, no signup required, access to all tattoo styles, placement-aware previews, and standard export quality. Credits reset every 24 hours."
  },
  {
    question: "Do I need to pay after the trial?",
    answer: "There is no trial period — the free tier is permanent. You can use 3 free designs daily forever. If you need more generations, you can purchase credit packs starting at $4.99 for 10 additional designs. These credits never expire."
  },
  {
    question: "How much do paid credits cost?",
    answer: "Credit packs start at $4.99 for 10 generations. Larger packs offer better value: 25 credits for $9.99, 60 credits for $19.99. Unlike subscriptions, credits never expire and you only pay for what you use."
  },
  {
    question: "Is there a subscription option?",
    answer: "No. AI Tattoo Generator does not offer subscriptions. We believe in pay-as-you-go pricing. This means no monthly bills, no cancellation hassle, and no paying for months you don0026apos;t use."
  },
  {
    question: "How does your pricing compare to BlackInk.ai?",
    answer: "BlackInk.ai costs $15/month ($180/year) with no free tier after the trial. AI Tattoo Generator offers 3 free designs daily with no subscription. For casual users, we save $180/year. For power users, our credit packs are more flexible."
  },
  {
    question: "Can I get more than 3 free designs?",
    answer: "The free tier is limited to 3 designs per day. This limit resets every 24 hours. If you need more designs on a specific day, you can purchase a credit pack. There is no way to increase the daily free limit."
  },
  {
    question: "Are there any hidden fees?",
    answer: "No hidden fees. The free tier is truly free. Paid credits are a one-time purchase with no recurring charges. We display the full price upfront with no surprises at checkout."
  }
];

export default function IsItFreePage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Is AI Tattoo Generator Free? — Pricing Explained (2026)",
          description: "Yes, AI Tattoo Generator is free. Get 3 tattoo designs daily with no signup.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />

      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">Pricing</span>
          <h1>Is AI Tattoo Generator Free? Yes — Here0026apos;s How It Works</h1>
          <p className="lead">
            AI Tattoo Generator offers 3 free tattoo designs daily with no signup required. 
            Learn about our free tier, paid credits, and how we compare to paid alternatives.
          </p>
        </section>

        {/* Quick Answer */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <h2>Short Answer: Yes, It0026apos;s Free</h2>
            <p>
              You get <strong>3 free AI tattoo designs every day</strong> with absolutely no cost. 
              No signup. No credit card. No subscription. The free tier never expires.
            </p>
            <Link className="btn btn-primary" href="/generate">
              Try Free Now
            </Link>
          </div>
        </section>

        {/* Detailed FAQ */}
        <section className="section" id="faq">
          <div className="container grid-2">
            <div className="stack">
              <span className="eyebrow">FAQ</span>
              <h2>Common questions about pricing</h2>
            </div>
            <div className="stack">
              {faqs.map((faq, i) => (
                <details className="card-dark" key={i}>
                  <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 18 }}>
                    {faq.question}
                  </summary>
                  <p style={{ marginTop: 14 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Comparison</span>
            <h2>Free vs Paid Tattoo Generators</h2>
            
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
                  <tr className="winner-row">
                    <td><strong>Daily free designs</strong></td>
                    <td className="highlight-cell">3 free ✅</td>
                    <td>0 (trial only)</td>
                    <td>1 (with signup)</td>
                  </tr>
                  <tr>
                    <td><strong>Signup required</strong></td>
                    <td className="highlight-cell">No ✅</td>
                    <td>Yes</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td><strong>Monthly cost</strong></td>
                    <td className="highlight-cell">Free or pay-as-you-go ✅</td>
                    <td>$15/month</td>
                    <td>$9.99/month</td>
                  </tr>
                  <tr>
                    <td><strong>Credit expiration</strong></td>
                    <td className="highlight-cell">Never ✅</td>
                    <td>N/A (subscription)</td>
                    <td>N/A (subscription)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="container card-paper stack">
            <span className="eyebrow">Start free</span>
            <h2>Get Your Free Tattoo Preview Now</h2>
            <p>3 free designs daily. No signup. No credit card. Create your tattoo reference in 30 seconds.</p>
            <Link className="btn btn-primary" href="/generate">
              Start Designing Free
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
