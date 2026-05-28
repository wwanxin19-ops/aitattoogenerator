"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
}

export function AuthButton() {
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || null,
          avatar: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null,
        });
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.reload();
  };

  if (loading) {
    return <span className="auth-loading">Loading...</span>;
  }

  if (user) {
    return (
      <div className="auth-user">
        {user.avatar && (
          <img src={user.avatar} alt={user.name || user.email} className="auth-avatar" />
        )}
        <span className="auth-name">{user.name || user.email}</span>
        <button onClick={handleSignOut} className="btn btn-secondary">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button onClick={handleSignIn} className="btn btn-primary">
      Sign In with Google
    </button>
  );
}
