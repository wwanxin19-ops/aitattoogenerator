import type { Metadata } from "next";
import Link from "next/link";
import { FAQAccordion } from "@/components/Shared";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "AI Tattoo Generator FAQ — Free, Safe & How to Use (2026)",
  description: "Find answers to frequently asked questions about AI Tattoo Generator. Is it free? How does it work? Is it safe? Design quality? Get answers and start creating free tattoo previews.",
  alternates: { canonical: "/faq" }
};

const faqCategories = [
  {
    category: "Pricing & Free Tier",
    icon: "💰",
    faqs: [
      {
        question: "Is AI Tattoo Generator free?",
        answer: "Yes. AI Tattoo Generator offers 3 free tattoo designs every day with no signup required. You can generate previews immediately without entering a credit card or creating an account. Paid credit packs are available if you need more than 3 designs daily."
      },
      {
        question: "How does the free plan work?",
        answer: "Free users receive 3 daily credits that reset every 24 hours. Each credit lets you generate one tattoo preview. You can use all 3 credits in one session or spread them throughout the day. No account is needed to use the free tier."
      },
      {
        question: "What are paid credits and how much do they cost?",
        answer: "Paid credits are one-time purchases that give you additional tattoo generations beyond the daily free limit. They never expire. Credit packs start at $4.99 for 10 generations. Unlike subscriptions, you only pay for what you use."
      },
      {
        question: "Do I need a subscription?",
        answer: "No. AI Tattoo Generator does not require a subscription. You can use the free tier indefinitely or purchase credits as needed. We believe in pay-as-you-go rather than locking you into monthly payments."
      }
    ]
  },
  {
    category: "How to Use",
    icon: "🎨",
    faqs: [
      {
        question: "How does AI Tattoo Generator work?",
        answer: "Our AI tattoo generator works in 3 simple steps: (1) Describe your tattoo idea in plain English, (2) Choose a style (realism, minimalist, traditional, etc.) and body placement, (3) Click generate and receive a visual reference preview in 30 seconds. No artistic skill or prompt engineering needed."
      },
      {
        question: "What should I write in the description?",
        answer: "Describe your idea naturally: subject, style, mood, and any specific details. For example: 'A fine-line snake wrapped around a peony, designed for the inner forearm.' The more specific you are, the better the result. Include symbolism, size preferences, and color vs black-and-white."
      },
      {
        question: "Which tattoo styles are supported?",
        answer: "We support realism, minimalist, traditional, neo-traditional, Japanese (irezumi), geometric, blackwork, watercolor, tribal, and dotwork. New styles are added monthly based on user requests. Each style is trained on professional tattoo art, not generic images."
      },
      {
        question: "Can I choose where the tattoo goes?",
        answer: "Yes. Our placement-aware preview lets you select from 10+ body parts: arm, forearm, wrist, shoulder, chest, back, ribs, thigh, calf, ankle, and neck. The AI adapts the design flow and composition for each specific placement."
      }
    ]
  },
  {
    category: "Design Quality & Safety",
    icon: "🛡️",
    faqs: [
      {
        question: "Can I use the generated design as my actual tattoo?",
        answer: "The AI-generated design is a reference and starting point, not a final tattoo. We strongly recommend bringing your preview to a licensed tattoo artist who will adapt it for your skin tone, body shape, and ensure proper aging and safety. Every design includes a reference disclaimer."
      },
      {
        question: "Is AI Tattoo Generator safe to use?",
        answer: "Yes. We prioritize safety and transparency: (1) All designs include a reference disclaimer, (2) We encourage artist consultation, (3) We never claim AI can replace tattoo artists, (4) Your data is encrypted and never sold to third parties, (5) We comply with GDPR and CCPA privacy regulations."
      },
      {
        question: "How accurate are the AI-generated previews?",
        answer: "Our AI is specifically trained on professional tattoo art, making it more accurate for tattoo planning than general AI image generators. However, the preview is still a digital approximation. Factors like skin tone, texture, and aging will affect the final result. Always consult your artist."
      },
      {
        question: "Will the design look the same on my skin?",
        answer: "Not exactly. Skin tone, texture, and body contours affect how a tattoo appears. Our placement-aware preview provides a good approximation, but your tattoo artist will need to adapt the design. This is why we frame every design as a reference, not a final blueprint."
      }
    ]
  },
  {
    category: "Technical & Support",
    icon: "⚙️",
    faqs: [
      {
        question: "Do I need to create an account?",
        answer: "No. You can generate 3 free tattoo previews daily without creating an account. Creating an account unlocks additional features: saved designs, higher resolution exports, and priority generation. But it0026apos;s completely optional."
      },
      {
        question: "What devices and browsers are supported?",
        answer: "AI Tattoo Generator works on all modern browsers (Chrome, Safari, Firefox, Edge) and devices (desktop, tablet, mobile). The responsive design adapts to your screen size. No app download is needed — it runs entirely in your browser."
      },
      {
        question: "How do I save or download my designs?",
        answer: "Free users can view and screenshot their designs. Account holders can download high-resolution PNG files with transparent backgrounds, perfect for bringing to tattoo artists. Paid credits include high-res exports."
      },
      {
        question: "How do I contact support?",
        answer: "Email us at support@aitattoogenerator.cc or use the contact form on our website. We typically respond within 24 hours. For billing issues, include your order number. For technical problems, describe your browser and device."
      }
    ]
  },
  {
    category: "Comparison & Alternatives",
    icon: "🔄",
    faqs: [
      {
        question: "How is AI Tattoo Generator different from BlackInk.ai?",
        answer: "Three key differences: (1) We offer 3 free designs daily with no signup vs BlackInk's paid subscription, (2) Our AI is tattoo-specific with placement-aware previews vs general AI art, (3) We use pay-as-you-go credits vs mandatory subscriptions. See our full comparison."
      },
      {
        question: "Can I switch from another tattoo generator?",
        answer: "Yes. There's no lock-in with any platform. Simply start using our free tier to compare results. Many users use multiple generators for different projects. Your designs from other platforms remain accessible there."
      },
      {
        question: "Is this better than working directly with a tattoo artist?",
        answer: "AI Tattoo Generator complements, not replaces, tattoo artists. It helps you visualize ideas before consultations, making artist communication more efficient. The final design should always be created by a licensed professional who understands skin, aging, and safety."
      }
    ]
  }
];

// Flatten for Schema
const allFaqs = faqCategories.flatMap(cat => cat.faqs);
const faqSchemaItems = allFaqs.map(({ question, answer }) => ({ question, answer }));

export default function FAQPage() {
  return (
    <>
      <SchemaScripts
        pageType="pricing"
        faqs={faqSchemaItems}
      />
      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">FAQ</span>
          <h1>AI Tattoo Generator FAQ — Common Questions Answered</h1>
          <p className="lead">
            Find answers about pricing, how to use the tool, design quality, safety, and more. 
            Can0026apos;t find your question? Contact our support team.
          </p>
        </section>

        {/* Category Navigation */}
        <section className="section section-tight">
          <div className="container">
            <div className="grid-5 category-nav">
              {faqCategories.map((cat, i) => (
                <a href={`#category-${i}`} className="card-dark category-card" key={i}>
                  <span className="category-icon">{cat.icon}</span>
                  <span className="category-name">{cat.category}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        {faqCategories.map((cat, catIndex) => (
          <section className="section section-tight" id={`category-${catIndex}`} key={catIndex}>
            <div className="container stack">
              <div className="category-header">
                <span className="eyebrow">{cat.icon} {cat.category}</span>
              </div>
              <FAQAccordion items={cat.faqs.map(f => [f.question, f.answer])} />
            </div>
          </section>
        ))}

        {/* Related Links */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Related</span>
            <h2>Helpful resources</h2>
            <div className="grid-3">
              <Link href="/guides/how-to-design-a-tattoo" className="card-dark resource-link">
                <h3>How to Design a Tattoo</h3>
                <p>Step-by-step guide for beginners</p>
              </Link>
              <Link href="/compare" className="card-dark resource-link">
                <h3>Compare Generators</h3>
                <p>See how we compare to alternatives</p>
              </Link>
              <Link href="/placement" className="card-dark resource-link">
                <h3>Placement Guide</h3>
                <p>Choose the right body location</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Still have questions?</span>
            <h2>Contact Our Support Team</h2>
            <p>Can0026apos;t find what you0026apos;re looking for? Reach out and we0026apos;ll respond within 24 hours.</p>
            <Link className="btn btn-primary" href="/contact">Contact Support</Link>
          </div>
        </section>

        {/* Tool CTA */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Try AI Tattoo Generator Free</h2>
            <p>3 free designs daily. No signup. No credit card. See your tattoo idea come to life in 30 seconds.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
