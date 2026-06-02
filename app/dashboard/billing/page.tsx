import type { Metadata } from "next";
import Link from "next/link";
import { BillingOverview } from "@/components/Billing";

export const metadata: Metadata = {
  title: "Dashboard Billing — AI Tattoo Generator",
  description: "View purchased credits, daily credits, total credits, and recent PayPal purchases.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/dashboard/billing" }
};

export default function DashboardBillingPage() {
  return (
    <main className="container dashboard">
      <section className="dashboard-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Billing</h1>
          <p className="user-email">Purchased credits, daily credits, and PayPal order history.</p>
        </div>
        <Link className="btn btn-secondary" href="/dashboard/">Back to Dashboard</Link>
      </section>
      <BillingOverview />
    </main>
  );
}
