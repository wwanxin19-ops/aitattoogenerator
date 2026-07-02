import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | AI Tattoo Generator",
  description: "Refund policy for AI Tattoo Generator credits. Unused credits can be refunded within 14 days. Used credits are not refundable.",
  alternates: { canonical: "/refund-policy" }
};

export default function RefundPolicyPage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Legal</span>
        <h1>Refund Policy</h1>
        <p className="lead">Last updated: July 2, 2026</p>
      </section>

      <section className="section section-tight">
        <div className="container article-body">
          <h2>Can I get a refund?</h2>
          <p>
            We offer refunds on <strong>unused credits</strong> within 14 days of purchase.
            If you have not used any credits from your pack, contact us at{" "}
            <a href="mailto:support@aitattoogenerator.cc">support@aitattoogenerator.cc</a>{" "}
            and we will process your refund within 5–10 business days.
          </p>

          <h2>Used credits are not refundable</h2>
          <p>
            Once credits have been used to generate a tattoo design, they cannot be refunded.
            Please use your free daily credits to try the product before purchasing.
          </p>

          <h2>How do I request a refund?</h2>
          <p>
            Email us at <a href="mailto:support@aitattoogenerator.cc">support@aitattoogenerator.cc</a>{" "}
            with the email address used for your PayPal purchase and the approximate date of purchase.
            We will review your request and confirm your remaining credit balance before issuing the refund.
          </p>

          <h2>How long does a refund take?</h2>
          <p>
            Refunds are processed within 5–10 business days. The time it takes for the funds to appear in your account depends on your payment provider and bank.
          </p>

          <h2>Chargebacks</h2>
          <p>
            Filing a chargeback without first contacting us may result in permanent account suspension and loss of access to any remaining credits.
          </p>
        </div>
      </section>
    </main>
  );
}
