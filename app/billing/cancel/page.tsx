import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Payment Canceled — AI Tattoo Generator",
  description: "PayPal checkout was canceled. No credits were charged.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/billing/cancel" }
};

export default function BillingCancelPage() {
  return (
    <main>
      <section className="container article-hero stack billing-status-card">
        <span className="eyebrow">PayPal Checkout</span>
        <h1>Payment canceled</h1>
        <p className="lead">You canceled the PayPal checkout. No credits were added and no payment was completed.</p>
        <div className="quick-actions">
          <Link className="btn btn-primary" href="/pricing/">Return to Pricing</Link>
          <Link className="btn btn-secondary" href="/dashboard/billing/">View Billing</Link>
        </div>
      </section>
    </main>
  );
}
