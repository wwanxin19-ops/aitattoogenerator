import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/Shared";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "FAQ — AI Tattoo Generator Questions & Answers",
  description: "Find answers to frequently asked questions about AI Tattoo Generator, including how it works, pricing, and usage.",
  alternates: { canonical: "/faq" }
};

const faqs: Array<[string, string]> = [
  ["What is AI Tattoo Generator?", "AI Tattoo Generator is a tool that creates visual reference previews of tattoo ideas based on your description, chosen style, and body placement. It's designed to help you communicate your vision to a licensed tattoo artist."],
  ["Is the generated tattoo design final?", "No. AI-generated designs are for reference and inspiration only. Always consult a licensed tattoo artist who will adapt the design for your skin, placement, and long-term readability."],
  ["Do I need to sign up?", "No signup is required for the first free designs. You can generate up to 3 free tattoo previews daily without creating an account."],
  ["How does the free plan work?", "Free users receive 3 daily credits for tattoo reference generation. These credits reset every 24 hours."],
  ["What are paid credits?", "Paid credits are one-time purchases that give you additional tattoo generations beyond the daily free limit. They never expire."],
  ["Can I use the design exactly as generated?", "Use it as a starting point. A licensed tattoo artist should adapt it for skin, placement, aging, and safety considerations."],
  ["What styles are supported?", "We support realism, minimalist, traditional, watercolor, geometric, Japanese, and more styles. New styles are added regularly."],
  ["How do I choose the right placement?", "Consider visibility, pain tolerance, design size, and future expansion. Check our placement guides for detailed advice on each body area."],
  ["Is my data safe?", "Yes. We prioritize user privacy and do not share your personal information or generated designs with third parties. See our Privacy Policy for details."],
  ["How do I contact support?", "Email us at support@aitattoogenerator.cc or use the contact form on our website. We typically respond within 24 hours."]
];

const faqSchemaItems = faqs.map(([question, answer]) => ({ question, answer }));

export default function FAQPage() {
  return (
    <>
      <SchemaScripts
        pageType="pricing"
        faqs={faqSchemaItems}
      />
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">FAQ</span>
          <h1>Frequently Asked Questions</h1>
          <p className="lead">Find answers to common questions about AI Tattoo Generator.</p>
        </section>

        <section className="section section-tight">
          <div className="container">
            <FAQAccordion items={faqs} />
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Still have questions?</span>
            <h2>Contact Us</h2>
            <p>Can&apos;t find what you&apos;re looking for? Reach out to our support team.</p>
            <Link className="btn btn-primary" href="/contact">Contact Support</Link>
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
