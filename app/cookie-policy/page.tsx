import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy — AI Tattoo Generator",
  description: "Cookie policy for AI Tattoo Generator. Learn what cookies we use, why we use them, and how to manage your preferences.",
  alternates: { canonical: "/cookie-policy" }
};

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Cookies</span>
        <h1>Cookie Policy</h1>
        <p className="lead">Last updated: June 3, 2026. This policy explains how AI Tattoo Generator uses cookies and similar technologies.</p>
      </section>

      <section className="section section-tight">
        <div className="container stack">
          <article className="card-paper stack">
            <h2>What are cookies</h2>
            <p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep you signed in, and understand how visitors use the service.</p>
          </article>

          <article className="card-paper stack">
            <h2>Cookies we use</h2>
            <p><strong>Essential cookies.</strong> Required for the site to function, including authentication session management and security protections. These cannot be disabled.</p>
            <p><strong>Analytics cookies.</strong> Help us understand how visitors interact with the site so we can improve the experience. These are only set when analytics tools are explicitly enabled.</p>
          </article>

          <article className="card-paper stack">
            <h2>Third-party services</h2>
            <p>We may use Google Analytics (GA4) and similar tools to measure site performance. These services may set their own cookies according to their privacy policies. No advertising cookies are used.</p>
          </article>

          <article className="card-paper stack">
            <h2>Managing cookies</h2>
            <p>You can manage or delete cookies through your browser settings. Note that disabling essential cookies may prevent sign-in and core features from working correctly.</p>
          </article>

          <article className="card-paper stack">
            <h2>Changes to this policy</h2>
            <p>We may update this cookie policy as our service evolves. The latest version will always be available on this page.</p>
            <Link className="btn btn-primary" href="/">Back to home</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
