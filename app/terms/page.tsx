import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — AI Tattoo Generator",
  description: "Terms of service for using AI Tattoo Generator as a tattoo reference and planning tool.",
  alternates: { canonical: "/terms" }
};

export default function TermsPage() {
  return (
    <main>
      <section className="container article-hero stack">
        <span className="eyebrow">Terms</span>
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: June 2, 2026. By using AI Tattoo Generator, you agree to these terms.</p>
      </section>

      <section className="section section-tight">
        <div className="container stack">
          <article className="card-paper stack">
            <h2>Reference-only output</h2>
            <p>AI Tattoo Generator creates visual references and planning material. Outputs are not professional tattoo advice and should be reviewed and adapted by a licensed tattoo artist before use on skin.</p>
          </article>

          <article className="card-paper stack">
            <h2>Acceptable use</h2>
            <p>You agree not to use the service to create illegal, hateful, harassing, sexually exploitative, infringing, or unsafe content. We may block requests, suspend access, or remove content that appears to violate these rules.</p>
          </article>

          <article className="card-paper stack">
            <h2>Accounts and credits</h2>
            <p>Some features require sign-in. Free daily credits and paid-plan details may change as the product evolves. Pro and Studio features marked as waitlist-only do not create a payment obligation.</p>
          </article>

          <article className="card-paper stack">
            <h2>Generated designs</h2>
            <p>You are responsible for reviewing whether a generated design is suitable, original enough for your needs, and safe to tattoo. We do not guarantee uniqueness, fitness for a particular purpose, or error-free output.</p>
          </article>

          <article className="card-paper stack">
            <h2>Service availability</h2>
            <p>The service may be interrupted, changed, rate-limited, or discontinued. We are not liable for missed appointments, tattoo decisions, or other losses caused by relying on generated references.</p>
          </article>

          <article className="card-paper stack">
            <h2>Contact</h2>
            <p>If you have questions about these terms, contact the site operator through the support channel provided with your account or waitlist confirmation.</p>
            <Link className="btn btn-primary" href="/ai-tattoo-generator/">Start designing</Link>
          </article>
        </div>
      </section>
    </main>
  );
}
