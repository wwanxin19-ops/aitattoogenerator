"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
        });
      }
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h1>Please Sign In</h1>
        <p>You need to sign in to view your dashboard.</p>
        <a href="/" style={{ color: "#ff6b35" }}>Go to Home</a>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1>Dashboard</h1>
      
      <div style={{ marginTop: 30, padding: 20, border: "1px solid #333", borderRadius: 8 }}>
        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 20 }}
          />
        )}
        <p><strong>Name:</strong> {user.name || "N/A"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>

      <div style={{ marginTop: 30 }}>
        <h2>Quick Actions</h2>
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <a href="/ai-tattoo-generator" style={{ padding: "10px 20px", background: "#ff6b35", color: "white", textDecoration: "none", borderRadius: 4 }}>
            Generate Tattoo
          </a>
          <a href="/pricing" style={{ padding: "10px 20px", background: "#333", color: "white", textDecoration: "none", borderRadius: 4 }}>
            View Pricing
          </a>
        </div>
      </div>

      <div style={{ marginTop: 30 }}>
        <button
          onClick={handleSignOut}
          style={{ padding: "10px 20px", background: "#666", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
