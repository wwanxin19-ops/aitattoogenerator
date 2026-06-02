"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

export type CreditPackageId = "credits_30" | "credits_100" | "credits_300";

type CreditPackage = {
  id: CreditPackageId;
  name: string;
  credits: number;
  price: string;
  description: string;
  audience: string;
  recommended?: boolean;
};

type Credits = {
  daily: number;
  purchased: number;
  total: number;
};

type BillingOrder = {
  id: string;
  provider: "paypal" | string;
  package_id: CreditPackageId | string;
  amount_cents: number;
  currency: string;
  credits: number;
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded" | string;
  created_at: string;
  paid_at: string | null;
};

type UsageResponse = {
  success: boolean;
  data?: {
    credits?: Credits;
  };
  error?: {
    code?: string;
    message?: string;
  };
};

type BillingHistoryResponse = {
  success: boolean;
  data?: {
    orders?: BillingOrder[];
  };
  error?: {
    code?: string;
    message?: string;
  };
};

const checkoutSnapshotKey = "aitg_checkout_credits_snapshot";

export const creditPackages: CreditPackage[] = [
  {
    id: "credits_30",
    name: "Starter Pack",
    credits: 30,
    price: "$4.99",
    description: "30 tattoo generation credits",
    audience: "Best for trying a few tattoo directions before your artist consult."
  },
  {
    id: "credits_100",
    name: "Creator Pack",
    credits: 100,
    price: "$9.99",
    description: "100 tattoo generation credits",
    audience: "Best for creators testing multiple tattoo ideas.",
    recommended: true
  },
  {
    id: "credits_300",
    name: "Pro Pack",
    credits: 300,
    price: "$19.99",
    description: "300 tattoo generation credits",
    audience: "Best for exploring full sleeves, variations, and client concepts."
  }
];

const statusCopy: Record<string, string> = {
  pending: "Confirming",
  paid: "Paid",
  failed: "Failed",
  cancelled: "Canceled",
  refunded: "Refunded"
};

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatAmount(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency || "USD"
  }).format(amountCents / 100);
}

function normalizeBillingError(code?: string, message?: string) {
  if (code === "UNAUTHORIZED") return "Please sign in before purchasing credits.";
  if (code === "INVALID_PACKAGE") return "Invalid credit package. Please choose another pack.";
  if (code === "PAYPAL_ORDER_CREATE_FAILED") return "Unable to start PayPal checkout. Please try again.";
  if (code === "PAYPAL_NOT_CONFIGURED" || code === "NOT_FOUND") return "Payment is temporarily unavailable.";
  return message || "Unable to start PayPal checkout. Please try again.";
}

async function fetchUsageCredits(): Promise<Credits | null> {
  const res = await fetch("/api/usage", { credentials: "include" });
  if (!res.ok) return null;
  const json = (await res.json()) as UsageResponse;
  return json.success && json.data?.credits ? json.data.credits : null;
}

async function createPayPalOrder(packageId: CreditPackageId) {
  const beforeCredits = await fetchUsageCredits();
  if (beforeCredits) {
    sessionStorage.setItem(checkoutSnapshotKey, JSON.stringify(beforeCredits));
  }

  const res = await fetch("/api/billing/paypal/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ package_id: packageId })
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    const code = json.error?.code;
    const error = new Error(normalizeBillingError(code, json.error?.message));
    error.name = code || "PAYPAL_CHECKOUT_ERROR";
    throw error;
  }

  return json.data as { order_id: string; approval_url: string };
}

export function PayPalCreditPackages() {
  const [loadingPackageId, setLoadingPackageId] = useState<CreditPackageId | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy(packageId: CreditPackageId) {
    setError(null);
    setLoadingPackageId(packageId);

    try {
      const data = await createPayPalOrder(packageId);
      if (!data.approval_url) {
        throw new Error("Missing PayPal approval URL");
      }
      window.location.href = data.approval_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed. Please try again.");
      setLoadingPackageId(null);
    }
  }

  return (
    <div className="stack">
      {error && (
        <div className="error-message" role="alert">
          <p>{error}</p>
          {error.includes("sign in") && <Link href="/api/auth/login">Sign in with Google</Link>}
        </div>
      )}

      <div className="pricing-grid">
        {creditPackages.map((pack) => (
          <article className={`card-paper stack${pack.recommended ? " plan-recommended" : ""}`} key={pack.id}>
            <span className="badge">{pack.recommended ? "Most Popular" : pack.name}</span>
            <h2>{pack.name}</h2>
            <div className="price">{pack.price}</div>
            <p className="credit-pack-count">{pack.credits} Credits</p>
            <p>{pack.description}</p>
            <p>{pack.audience}</p>
            <button
              className="btn btn-primary btn-block"
              type="button"
              disabled={loadingPackageId === pack.id}
              aria-disabled={loadingPackageId === pack.id}
              onClick={() => handleBuy(pack.id)}
            >
              {loadingPackageId === pack.id ? "Redirecting to PayPal..." : "Buy with PayPal"}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function BillingSuccessPanel() {
  const [status, setStatus] = useState<"confirming" | "confirmed" | "still-confirming">("confirming");
  const [credits, setCredits] = useState<Credits | null>(null);

  const baseline = useMemo(() => {
    if (typeof window === "undefined") return null;
    const raw = sessionStorage.getItem(checkoutSnapshotKey);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Credits;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    let attempts = 0;
    let stopped = false;

    async function pollCredits() {
      attempts += 1;
      const nextCredits = await fetchUsageCredits();
      if (stopped) return;

      if (nextCredits) {
        setCredits(nextCredits);
        const increased = baseline
          ? nextCredits.total > baseline.total || nextCredits.purchased > baseline.purchased
          : false;

        if (increased) {
          sessionStorage.removeItem(checkoutSnapshotKey);
          setStatus("confirmed");
          window.setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1800);
          return;
        }
      }

      if (attempts >= 15) {
        setStatus("still-confirming");
      } else {
        window.setTimeout(pollCredits, 2000);
      }
    }

    pollCredits();

    return () => {
      stopped = true;
    };
  }, [baseline]);

  return (
    <div className="container article-hero stack billing-status-card">
      <span className="eyebrow">PayPal Checkout</span>
      {status === "confirmed" ? (
        <>
          <h1>Payment confirmed</h1>
          <p className="lead">Your credits have been added to your account. Redirecting to Dashboard...</p>
        </>
      ) : status === "still-confirming" ? (
        <>
          <h1>Still confirming your payment</h1>
          <p className="lead">PayPal has redirected you back successfully. Your credits may take a few seconds to appear. Please refresh your dashboard later if they do not show immediately.</p>
        </>
      ) : (
        <>
          <h1>Payment is being confirmed</h1>
          <p className="lead">Your payment was received by PayPal. We are confirming it now. Your credits will appear in your account shortly.</p>
        </>
      )}

      {credits && (
        <div className="credits-display">
          <div className="credit-stat"><span className="credit-number">{credits.daily}</span><span className="credit-label">Daily</span></div>
          <div className="credit-stat"><span className="credit-number">{credits.purchased}</span><span className="credit-label">Purchased</span></div>
          <div className="credit-stat"><span className="credit-number">{credits.total}</span><span className="credit-label">Total</span></div>
        </div>
      )}

      <div className="quick-actions">
        <Link className="btn btn-primary" href="/dashboard">Open Dashboard</Link>
        <Link className="btn btn-secondary" href="/pricing">Back to Pricing</Link>
      </div>
    </div>
  );
}

export function BillingOverview({ compact = false }: { compact?: boolean }) {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [orders, setOrders] = useState<BillingOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [historyMessage, setHistoryMessage] = useState<string | null>(null);

  const loadBilling = useCallback(async () => {
    setLoading(true);
    setHistoryMessage(null);

    try {
      const usageCredits = await fetchUsageCredits();
      setCredits(usageCredits);

      const historyRes = await fetch("/api/billing/history", { credentials: "include" });
      if (historyRes.ok) {
        const historyJson = (await historyRes.json()) as BillingHistoryResponse;
        setOrders(historyJson.success ? historyJson.data?.orders || [] : []);
      } else if (historyRes.status === 404) {
        setHistoryMessage("Billing history will appear here after the backend history API is enabled.");
      } else if (historyRes.status === 401) {
        setHistoryMessage("Please sign in to view billing history.");
      } else {
        setHistoryMessage("Billing history is temporarily unavailable.");
      }
    } catch {
      setHistoryMessage("Billing data could not be loaded. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBilling();
  }, [loadBilling]);

  if (loading) {
    return <div className="dashboard-card"><p>Loading billing...</p></div>;
  }

  return (
    <div className="stack">
      <section className="dashboard-card" aria-labelledby="billing-credits-heading">
        <div className="dashboard-card-header">
          <div>
            <span className="eyebrow">Billing</span>
            <h2 id="billing-credits-heading">Credits</h2>
          </div>
          <Link className="btn btn-primary" href="/pricing/">Buy More Credits</Link>
        </div>
        <div className="credits-display">
          <div className="credit-stat"><span className="credit-number">{credits?.daily ?? 0}</span><span className="credit-label">Daily</span></div>
          <div className="credit-stat"><span className="credit-number">{credits?.purchased ?? 0}</span><span className="credit-label">Purchased</span></div>
          <div className="credit-stat"><span className="credit-number">{credits?.total ?? 0}</span><span className="credit-label">Total available</span></div>
        </div>
      </section>

      <section className="dashboard-card" aria-labelledby="billing-history-heading">
        <div className="dashboard-card-header">
          <h2 id="billing-history-heading">Recent purchases</h2>
          {!compact && <button className="btn btn-secondary" type="button" onClick={loadBilling}>Refresh</button>}
        </div>
        {orders.length > 0 ? (
          <div className="billing-history-list">
            {orders.map((order) => (
              <article className="billing-history-item" key={order.id}>
                <div>
                  <p className="generation-prompt">{order.credits} credits · {formatAmount(order.amount_cents, order.currency)}</p>
                  <p className="user-email">{order.provider.toUpperCase()} · {order.package_id} · {formatDate(order.created_at)}</p>
                </div>
                <span className={`status-badge status-${order.status}`}>{statusCopy[order.status] || order.status}</span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>{historyMessage || "No purchases yet."}</p>
            <Link className="btn btn-primary" href="/pricing/">Buy credits</Link>
          </div>
        )}
      </section>
    </div>
  );
}
