import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/Shared";
import { ModalButton } from "@/components/ModalButtons";

export const metadata: Metadata = {
  title: "Pricing — AI Tattoo Generator",
  description: "Simple pricing for free tattoo previews, Pro waitlist access, and Studio early access.",
  alternates: { canonical: "/pricing/" }
};

const faqs: Array<[string, string]> = [
  ["Can I pay for Pro today?", "No. This week, Pro and Studio buttons collect email interest only and do not open Stripe."],
  ["What does Free include?", "Free lets you start designing and explore tattoo reference ideas before choosing paid features later."],
  ["Who is Studio for?", "Studio is intended for tattoo shops and professional designers who want early access and custom setup."]
];

export default function PricingPage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Pricing</span>
        <h1>Simple Pricing for Every Stage of Your Tattoo Journey</h1>
        <p className="lead">Start free today. Pro and Studio are waitlist-only this week, with no payment or Stripe checkout.</p>
      </section>
      <section className="section section-tight">
        <div className="container pricing-grid">
          <article className="card-paper stack">
            <span className="badge">Free</span>
            <h2>Free</h2>
            <div className="price">$0</div>
            <p>Explore tattoo reference ideas before you commit.</p>
            <ul className="feature-list">
              <li>3 free designs daily</li><li>No signup required</li><li>Reference-first workflow</li>
            </ul>
            <Link className="btn btn-primary btn-block" href="/ai-tattoo-generator/">Start Designing Free</Link>
          </article>
          <article className="card-paper stack plan-recommended">
            <span className="badge">Best value</span>
            <h2>Pro</h2>
            <div className="price">$7.9/month</div>
            <p>Or $79/year (save $15.8). Join the waitlist for HD downloads, more generations, and design history.</p>
            <ul className="feature-list">
              <li>HD downloads planned</li><li>More generations planned</li><li>Design history planned</li>
            </ul>
            <ModalButton type="pro" block>Join Pro Waitlist</ModalButton>
          </article>
          <article className="card-paper stack">
            <span className="badge">Studio</span>
            <h2>Studio</h2>
            <div className="price">$19.9/month</div>
            <p>Or $199/year (save $39.8). Built for tattoo shops and professional design workflows.</p>
            <ul className="feature-list">
              <li>Early access + custom setup</li><li>Studio workflow planning</li><li>Professional use cases</li>
            </ul>
            <ModalButton type="studio" block>Contact for Studio</ModalButton>
          </article>
        </div>
      </section>
      <section className="section section-tight">
        <div className="container grid-2">
          <div className="stack"><span className="eyebrow">FAQ</span><h2>Pricing questions</h2></div>
          <FAQAccordion items={faqs} />
        </div>
      </section>
      <section className="section section-tight">
        <div className="container grid-3">
          <article className="card-dark"><h3>No payment this week</h3><p>Pro and Studio CTAs collect email interest only.</p></article>
          <article className="card-dark"><h3>Reference-first</h3><p>Designs are inspiration to discuss with a licensed artist.</p></article>
          <article className="card-dark"><h3>Clear next step</h3><p>Start free, then join the relevant waitlist when ready.</p></article>
        </div>
      </section>
    </main>
  );
}
