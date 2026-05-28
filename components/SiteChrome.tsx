"use client";

import { useState } from "react";
import Link from "next/link";
import { navItems } from "@/lib/constants";

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav-shell">
      <nav className="container nav" aria-label="Main navigation">
        <Link className="wordmark" href="/">
          AI Tattoo<span>Generator</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="menu-icon" aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
        </button>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="btn btn-primary" href="/ai-tattoo-generator/" onClick={() => setMenuOpen(false)}>
            Start Designing Free
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link className="wordmark" href="/">
            AI Tattoo<span>Generator</span>
          </Link>
          <p style={{ marginTop: 8, fontSize: 14 }}>Preview your tattoo idea before you ink it.</p>
        </div>
        <div className="footer-links">
          <Link href="/ai-tattoo-generator/">Generator</Link>
          <Link href="/pricing/">Pricing</Link>
          <Link href="/styles/realism/">Realism</Link>
          <Link href="/styles/minimalist/">Minimalist</Link>
          <Link href="/body-parts/arm/">Arm Tattoos</Link>
        </div>
      </div>
    </footer>
  );
}
