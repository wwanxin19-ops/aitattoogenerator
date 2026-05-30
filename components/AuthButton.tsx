"use client";

import { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

export function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (mounted) {
      fetchUser();
      const interval = setInterval(fetchUser, 30000);
      return () => clearInterval(interval);
    }
  }, [mounted, fetchUser]);

  const handleSignIn = () => {
    window.location.href = "/api/auth/login";
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore
    }
    setUser(null);
    window.location.reload();
  };

  // 服务端渲染时不显示 loading，直接显示 Sign In 按钮
  if (!mounted) {
    return (
      <button
        onClick={handleSignIn}
        style={{
          background: "#ff6b35",
          border: "none",
          color: "#fff",
          padding: "8px 18px",
          borderRadius: 6,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Sign In
      </button>
    );
  }

  if (loading) {
    return <span style={{ color: "#999" }}>Loading...</span>;
  }

  if (user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {user.avatar && (
          <img
            src={user.avatar}
            alt="avatar"
            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
          />
        )}
        <span style={{ color: "#fff", fontSize: 14 }}>
          {user.name || user.email}
        </span>
        <button
          onClick={handleSignOut}
          style={{
            background: "transparent",
            border: "1px solid #ff6b35",
            color: "#ff6b35",
            padding: "6px 14px",
            borderRadius: 6,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      style={{
        background: "#ff6b35",
        border: "none",
        color: "#fff",
        padding: "8px 18px",
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Sign In
    </button>
  );
}
