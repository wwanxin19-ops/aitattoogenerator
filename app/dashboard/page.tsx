"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setUser({
            id: json.data.id,
            email: json.data.email,
            name: json.data.name || null,
            avatar: json.data.avatar || null,
          });
          setLoading(false);
          return;
        }
      }
      setUser(null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore
    }
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
        <Link href="/" style={{ color: "#ff6b35" }}>Go to Home</Link>
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

      <div style={{ marginTop: 20 }}>
        <button
          onClick={handleSignOut}
          style={{
            background: "#ff6b35",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 6,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
