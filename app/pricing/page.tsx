import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/Shared";
import { PayPalCreditPackages } from "@/components/Billing";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "AI Tattoo Generator Pricing — Free Plan & Pro Credits (2026)",
  description: "AI Tattoo Generator pricing: 3 free designs daily. No subscription. Pay-as-you-go credits from $4.99. Compare to BlackInk.ai ($15/month) and save $180/year.",
  alternates: { canonical: "/pricing" }
};

const faqs: Array<[string, string]> = [
  ["Is this a subscription?", "No. The current MVP sells one-time PayPal credit packs only. There is no automatic renewal."],
  ["When do credits appear?", "After PayPal payment, the backend confirms the webhook and adds purchased credits. This can take a few seconds."],
  ["Can the success page add credits directly?", "No. Credits are only issued by the backend after PayPal webhook confirmation."],
  ["What does Free include?", "Free users still receive daily credits for tattoo reference generation. Purchased credits are added on top."]
];

const faqSchemaItems = faqs.map(([question, answer]) => ({ question, answer }));

export default function PricingPage() {
  return (
    <>
      <SchemaScripts
        pageType="pricing"
        faqs={faqSchemaItems}
      />
      <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Credits Pricing</span>
        <h1>Buy Tattoo Generation Credits with PayPal</h1>
        <p className="lead">Choose a one-time credits pack. No subscription, no auto-renewal, and credits are issued only after backend PayPal webhook confirmation.</p>
        <div className="quick-actions">
          <Link className="btn btn-secondary" href="/dashboard/billing/">View Billing</Link>
          <Link className="btn btn-secondary" href="/ai-tattoo-generator/">Generate Tattoo</Link>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <PayPalCreditPackages />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container grid-2">
          <div className="stack"><span className="eyebrow">FAQ</span><h2>PayPal credits questions</h2></div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      <section className="section section-tight">
        <div className="container grid-3">
          <article className="card-dark"><h3>Webhook first</h3><p>The success page never grants credits directly. Backend PayPal webhook confirmation is the source of truth.</p></article>
          <article className="card-dark"><h3>One-time packs</h3><p>This MVP only supports credit purchases. Subscriptions, coupons, invoices, and team accounts stay out of scope.</p></article>
          <article className="card-dark"><h3>Credits stack</h3><p>Purchased credits appear alongside daily credits in Dashboard and Billing.</p></article>
        </div>
      </section>
    </main>
    </>
  );
}
