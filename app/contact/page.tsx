import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact AI Tattoo Generator — Get in Touch",
  description: "Contact AI Tattoo Generator for support, feedback, or partnership inquiries. We're here to help with your tattoo design journey.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Contact AI Tattoo Generator — Get in Touch",
          description: "Contact AI Tattoo Generator for support, feedback, or partnership inquiries. We're here to help with your tattoo design journey.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Contact</span>
          <h1>Contact Us</h1>
          <p className="lead">Have questions or feedback? We&apos;d love to hear from you.</p>
        </section>

        <section className="section section-tight">
          <div className="container contact-layout">
            <div className="stack">
              <div className="card-dark stack">
                <h3>Support</h3>
                <p>For technical issues, account help, or billing questions:</p>
                <a href="mailto:support@aitattoogenerator.cc" className="link">support@aitattoogenerator.cc</a>
              </div>
              
              <div className="card-dark stack">
                <h3>Feedback</h3>
                <p>Suggestions or feature requests:</p>
                <a href="mailto:feedback@aitattoogenerator.cc" className="link">feedback@aitattoogenerator.cc</a>
              </div>
              
              <div className="card-dark stack">
                <h3>Partnerships</h3>
                <p>For business or media inquiries:</p>
                <a href="mailto:partners@aitattoogenerator.cc" className="link">partners@aitattoogenerator.cc</a>
              </div>
              
              <div className="card-dark stack">
                <h3>Social</h3>
                <p>Follow us for updates and inspiration:</p>
                <div className="flex gap-4">
                  <a href="https://twitter.com/aitattoogen" target="_blank" rel="noopener noreferrer" className="link">Twitter</a>
                  <a href="https://github.com/aitattoogenerator" target="_blank" rel="noopener noreferrer" className="link">GitHub</a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>Try our AI tattoo generator free and see your idea come to life.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
