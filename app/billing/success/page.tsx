import type { Metadata } from "next";
import { BillingSuccessPanel } from "@/components/Billing";

export const metadata: Metadata = {
  title: "Payment Confirmation — AI Tattoo Generator",
  description: "PayPal payment confirmation for AI Tattoo Generator credits.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/billing/success" }
};

export default function BillingSuccessPage() {
  return (
    <main>
      <BillingSuccessPanel />
    </main>
  );
}
