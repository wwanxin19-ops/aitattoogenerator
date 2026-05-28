"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

interface Credits {
  credits_remaining: number;
  plan_type: string;
  daily_limit: number;
  today_generations: number;
}

interface Generation {
  id: string;
  prompt: string;
  style: string | null;
  status: string;
  image_url: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Dashboard auth error:", userError?.message);
          setLoading(false);
          return;
        }

        setUser({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        });

        // Get credits
        const creditsRes = await fetch("/api/user/credits");
        if (creditsRes.ok) {
          const creditsData = await creditsRes.json();
          if (creditsData.success) {
            setCredits(creditsData.data);
          }
        }

        // Get generation history
        const historyRes = await fetch("/api/user/history?page=1&limit=10");
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          if (historyData.success) {
            setGenerations(historyData.data.generations);
          }
        }
      } catch (err) {
        console.error("Dashboard load failed:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="container">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="dashboard-card">
            <h2>Please Sign In</h2>
            <p>You need to sign in to view your dashboard.</p>
            <a href="/" className="btn btn-primary">Go to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div className="user-info">
            {user.avatar && (
              <img src={user.avatar} alt={user.name || user.email} className="user-avatar" />
            )}
            <div>
              <h1>{user.name || "User"}</h1>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <button onClick={handleSignOut} className="btn btn-secondary">
            Sign Out
          </button>
        </div>

        {/* Credits Card */}
        <div className="dashboard-card credits-card">
          <h2>Your Credits</h2>
          <div className="credits-display">
            <div className="credit-stat">
              <span className="credit-number">{credits?.credits_remaining ?? 0}</span>
              <span className="credit-label">Remaining</span>
            </div>
            <div className="credit-stat">
              <span className="credit-number">{credits?.today_generations ?? 0}</span>
              <span className="credit-label">Used Today</span>
            </div>
            <div className="credit-stat">
              <span className="credit-number">{credits?.daily_limit ?? 10}</span>
              <span className="credit-label">Daily Limit</span>
            </div>
          </div>
          <div className="plan-badge">
            Current Plan: <strong>{credits?.plan_type?.toUpperCase() ?? "FREE"}</strong>
          </div>
          {credits?.plan_type === "free" && (
            <Link href="/pricing" className="btn btn-primary upgrade-btn">
              Upgrade to Pro
            </Link>
          )}
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link href="/ai-tattoo-generator" className="btn btn-primary">
              Generate New Tattoo
            </Link>
            <Link href="/pricing" className="btn btn-secondary">
              View Pricing
            </Link>
          </div>
        </div>

        {/* Generation History */}
        <div className="dashboard-card">
          <h2>Recent Generations</h2>
          {generations.length === 0 ? (
            <p className="empty-state">No generations yet. Start creating!</p>
          ) : (
            <div className="generations-list">
              {generations.map((gen) => (
                <div key={gen.id} className="generation-item">
                  <div className="generation-prompt">{gen.prompt}</div>
                  <div className="generation-meta">
                    <span className={`status-badge status-${gen.status}`}>{gen.status}</span>
                    {gen.style && <span className="style-tag">{gen.style}</span>}
                    <span className="date">{new Date(gen.created_at).toLocaleDateString()}</span>
                  </div>
                  {gen.image_url && (
                    <img src={gen.image_url} alt={gen.prompt} className="generation-thumb" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
