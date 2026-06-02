import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — AI Tattoo Generator",
  description: "Privacy policy for AI Tattoo Generator, including account, usage, analytics, and tattoo prompt data practices.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Privacy</span>
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: June 2, 2026. This policy explains what AI Tattoo Generator collects and how the data is used.</p>
      </section>

      <section className="section section-tight">
        <div className="container stack">
          <article className="card-paper stack">
            <h2>Information we collect</h2>
            <p>When you use the site, we may process your tattoo prompts, selected style and placement, generated design metadata, account profile information from Google sign-in, waitlist email submissions, and basic technical logs needed to keep the service secure and reliable.</p>
          </article>

          <article className="card-paper stack">
            <h2>How we use information</h2>
            <p>We use this information to provide tattoo reference generation, show your dashboard and credit balance, maintain abuse prevention, improve product quality, respond to support requests, and measure site performance when analytics is configured.</p>
          </article>

          <article className="card-paper stack">
            <h2>Tattoo and health disclaimer</h2>
            <p>Generated tattoo designs are reference material only. They are not medical, legal, safety, or professional tattoo advice. Always consult a licensed tattoo artist before getting inked.</p>
          </article>

          <article className="card-paper stack">
            <h2>Cookies and authentication</h2>
            <p>We use cookies or similar storage to keep you signed in and to protect authenticated API requests. If analytics tools are enabled, they may use cookies or device identifiers according to their own policies.</p>
          </article>

          <article className="card-paper stack">
            <h2>Data sharing</h2>
            <p>We do not sell personal information. We may share necessary data with infrastructure, authentication, analytics, and generation providers solely to operate the service.</p>
          </article>

          <article className="card-paper stack">
            <h2>Your choices</h2>
            <p>You can sign out, stop using the generator, or contact us to request deletion of account-related data where technically and legally possible.</p>
            <Link className="btn btn-primary" href="/">Back to home</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
