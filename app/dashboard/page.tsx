"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BillingOverview } from "@/components/Billing";

type User = {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
};

type Credits = {
  daily: number;
  purchased: number;
  total: number;
};

type Generation = {
  id: string;
  status: "pending" | "completed" | "failed";
  image_url: string | null;
  prompt: string;
  style: string;
  placement: string;
  created_at: string;
  completed_at: string | null;
};

const defaultCredits: Credits = { daily: 0, purchased: 0, total: 0 };

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<Credits>(defaultCredits);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setError(null);
    try {
      const userRes = await fetch("/api/auth/me", { credentials: "include" });
      if (!userRes.ok) {
        setUser(null);
        return;
      }

      const userJson = await userRes.json();
      if (!userJson.success || !userJson.data) {
        setUser(null);
        return;
      }

      setUser({
        id: userJson.data.id,
        email: userJson.data.email,
        name: userJson.data.name || null,
        avatar: userJson.data.avatar || null
      });

      const usageRes = await fetch("/api/usage", { credentials: "include" });
      if (usageRes.ok) {
        const usageJson = await usageRes.json();
        if (usageJson.success && usageJson.data) {
          setCredits(usageJson.data.credits || defaultCredits);
          setGenerations(usageJson.data.recent_generations || []);
        }
      } else {
        setError("Usage data is temporarily unavailable. Your account is still signed in.");
      }
    } catch {
      setError("Dashboard data could not be loaded. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch {
      // Ignore sign-out network errors and clear the visible session anyway.
    }
    window.location.href = "/";
  };

  if (loading) {
    return (
      <main className="container dashboard-loading">
        <p>Loading your tattoo workspace...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="container dashboard-loading stack">
        <span className="eyebrow">Dashboard</span>
        <h1>Please sign in</h1>
        <p>You need to sign in to view credits, recent generations, and saved tattoo references.</p>
        <Link className="btn btn-primary" href="/api/auth/login">Sign in with Google</Link>
      </main>
    );
  }

  return (
    <main className="container dashboard">
      <section className="dashboard-header">
        <div className="user-info">
          {user.avatar && <img src={user.avatar} alt="User avatar" className="user-avatar" />}
          <div>
            <span className="eyebrow">Dashboard</span>
            <h1>{user.name || "Your tattoo workspace"}</h1>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
        <button className="btn btn-secondary" type="button" onClick={handleSignOut}>Sign Out</button>
      </section>

      {error && <div className="error-message" role="alert">{error}</div>}

      <section className="dashboard-card" aria-labelledby="credits-heading">
        <h2 id="credits-heading">Credits</h2>
        <div className="credits-display">
          <div className="credit-stat">
            <span className="credit-number">{credits.daily}</span>
            <span className="credit-label">Daily</span>
          </div>
          <div className="credit-stat">
            <span className="credit-number">{credits.purchased}</span>
            <span className="credit-label">Purchased</span>
          </div>
          <div className="credit-stat">
            <span className="credit-number">{credits.total}</span>
            <span className="credit-label">Available</span>
          </div>
        </div>
        <p className="plan-badge">Free plan includes 3 daily tattoo reference generations. Purchased credits are added on top.</p>
        <Link className="btn btn-primary upgrade-btn" href="/pricing/">Buy More Credits</Link>
      </section>

      <section className="dashboard-card" aria-labelledby="actions-heading">
        <h2 id="actions-heading">Quick actions</h2>
        <div className="quick-actions">
          <Link className="btn btn-primary" href="/ai-tattoo-generator/">Generate a tattoo</Link>
          <Link className="btn btn-secondary" href="/pricing/">Buy credits</Link>
          <Link className="btn btn-secondary" href="/dashboard/billing/">Billing history</Link>
          <Link className="btn btn-secondary" href="/styles/realism/">Explore realism</Link>
          <Link className="btn btn-secondary" href="/styles/minimalist/">Explore minimalist</Link>
        </div>
      </section>

      <BillingOverview compact />

      <section className="dashboard-card" aria-labelledby="history-heading">
        <h2 id="history-heading">Recent generations</h2>
        {generations.length > 0 ? (
          <div className="generations-list">
            {generations.map((generation) => (
              <article className="generation-item" key={generation.id}>
                <p className="generation-prompt">{generation.prompt}</p>
                <div className="generation-meta">
                  <span className={`status-badge status-${generation.status}`}>{generation.status}</span>
                  <span className="style-tag">{generation.style}</span>
                  <span className="style-tag">{generation.placement}</span>
                  <span className="style-tag">{formatDate(generation.created_at)}</span>
                </div>
                {generation.image_url && (
                  <img src={generation.image_url} alt={generation.prompt} className="generation-thumb" loading="lazy" />
                )}
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No tattoo designs yet.</p>
            <Link className="btn btn-primary" href="/ai-tattoo-generator/">Create your first design</Link>
          </div>
        )}
      </section>
    </main>
  );
}
