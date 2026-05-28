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
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Please Sign In</h1>
        <p>You need to sign in to view your dashboard.</p>
        <Link href="/" className="btn btn-primary">Go to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: '0 auto' }}>
      <h1>Dashboard</h1>
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        {user.avatar && (
          <img src={user.avatar} alt="avatar" style={{ width: 60, height: 60, borderRadius: '50%' }} />
        )}
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button onClick={handleSignOut} className="btn btn-secondary">Sign Out</button>
    </div>
  );
}
