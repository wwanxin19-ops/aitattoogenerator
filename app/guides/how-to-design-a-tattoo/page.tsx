import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "How to Design a Tattoo: A Beginner&apos;s Complete Guide (2026)",
  description: "Learn how to design a tattoo from idea to ink. Step-by-step guide for beginners: find inspiration, choose style, pick placement, and preview with AI before committing.",
  alternates: { canonical: "/guides/how-to-design-a-tattoo" }
};

const howToSteps = [
  {
    name: "Find Your Inspiration",
    text: "Collect images, symbols, and themes that resonate with you. Create a mood board with Pinterest or save references from tattoo artists you admire.",
    url: "https://aitattoogenerator.cc/guides/how-to-design-a-tattoo#inspiration"
  },
  {
    name: "Choose a Tattoo Style",
    text: "Pick a style that matches your personality and the design&apos;s complexity. Realism, minimalist, traditional, Japanese, and geometric are popular choices.",
    url: "https://aitattoogenerator.cc/guides/how-to-design-a-tattoo#style"
  },
  {
    name: "Select the Placement",
    text: "Consider visibility, pain level, and how the design flows with your body. Arms and legs are beginner-friendly; ribs and spine are more advanced.",
    url: "https://aitattoogenerator.cc/guides/how-to-design-a-tattoo#placement"
  },
  {
    name: "Sketch Your Idea",
    text: "Start with rough sketches or written descriptions. Use our AI tattoo generator to create a visual reference from your description in 30 seconds.",
    url: "https://aitattoogenerator.cc/generate"
  },
  {
    name: "Find a Tattoo Artist",
    text: "Look for artists who specialize in your chosen style. Review their portfolio, check hygiene standards, and schedule a consultation.",
    url: "https://aitattoogenerator.cc/guides/how-to-design-a-tattoo#artist"
  }
];

const faqs = [
  {
    question: "How do I come up with a tattoo idea?",
    answer: "Start with what matters to you: memories, values, hobbies, or aesthetic preferences. Browse tattoo portfolios on Instagram and Pinterest, then narrow down to 2-3 concepts. Use our AI tattoo generator to visualize rough ideas before committing."
  },
  {
    question: "What tattoo style should I choose?",
    answer: "Choose based on your design&apos;s subject and your personal taste. Realism works for portraits and nature. Minimalist suits simple symbols and fine lines. Traditional is bold and timeless. Japanese tells stories with rich symbolism."
  },
  {
    question: "Where should I place my first tattoo?",
    answer: "Beginner-friendly areas: outer arm (least pain, easy to hide/show), calf, or thigh. Avoid ribs, spine, elbows, and feet for your first tattoo due to higher pain levels and longer healing."
  },
  {
    question: "Can I design my own tattoo?",
    answer: "Absolutely. Many people bring sketches, photos, or written descriptions to their artist. Use our AI tattoo generator to create a visual reference from your description, then work with your artist to refine it for your skin and placement."
  },
  {
    question: "How much does a custom tattoo design cost?",
    answer: "Custom design fees range from $50-$500 depending on complexity and artist reputation. Some artists include design in the hourly rate ($100-$300/hour). Using our AI generator to preview your idea first can save revision costs."
  }
];

export default function HowToDesignTattooPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "How to Design a Tattoo: A Beginner&apos;s Complete Guide (2026)",
          description: "Learn how to design a tattoo from idea to ink. Step-by-step guide for beginners.",
          image: "https://aitattoogenerator.cc/og-image.png",
          datePublished: "2026-01-15",
          dateModified: "2026-01-15"
        }}
        howTo={{
          name: "How to Design a Tattoo",
          description: "Follow these 5 steps to design your perfect tattoo from idea to ink.",
          steps: howToSteps
        }}
      />

      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Guide</span>
          <h1>How to Design a Tattoo: A Beginner&apos;s Complete Guide</h1>
          <p className="lead">From first idea to final ink: learn how to design a tattoo that you will love forever. Includes style tips, placement advice, and how to preview your design with AI.</p>
          <p className="text-sm text-muted">Reading time: 8 minutes · Updated January 2026</p>
        </section>

        {/* Table of Contents */}
        <section className="section section-tight">
          <div className="container">
            <div className="card-dark">
              <h3>Table of Contents</h3>
              <ol className="toc-list">
                <li><a href="#inspiration">Find Your Inspiration</a></li>
                <li><a href="#style">Choose a Tattoo Style</a></li>
                <li><a href="#placement">Select the Placement</a></li>
                <li><a href="#sketch">Sketch Your Idea</a></li>
                <li><a href="#artist">Find a Tattoo Artist</a></li>
                <li><a href="#faq">Frequently Asked Questions</a></li>
              </ol>
            </div>
          </div>
        </section>

        {/* Step 1: Inspiration */}
        <section className="section" id="inspiration">
          <div className="container stack">
            <span className="eyebrow">Step 1</span>
            <h2>Find Your Inspiration</h2>
            <p>Every great tattoo starts with a meaningful idea. Here is how to find yours:</p>
            
            <h3>Start with your story</h3>
            <p>Think about moments, people, or values that shaped you. A tattoo is permanent — it should represent something that will still matter in 20 years.</p>
            
            <h3>Build a mood board</h3>
            <p>Collect 20-30 images that resonate with your concept. Use Pinterest, Instagram, or save artist portfolios. Look for recurring themes, colors, and compositions.</p>
            
            <h3>Consider symbolism</h3>
            <p>Research the meaning behind symbols you are drawn to. A rose is not just beautiful — it represents love, pain, and growth. Make sure the symbolism aligns with your intention.</p>
          </div>
        </section>

        {/* Step 2: Style */}
        <section className="section" id="style">
          <div className="container stack">
            <span className="eyebrow">Step 2</span>
            <h2>Choose a Tattoo Style</h2>
            <p>The style determines how your tattoo looks and ages. Here are the most popular options:</p>
            
            <div className="grid-2">
              <article className="card-dark">
                <h3>Realism</h3>
                <p>Photographic detail for portraits, animals, and nature. Requires a specialist artist. Ages well with proper care.</p>
                <Link href="/tattoo-ideas/realism" className="link-arrow">Explore realism →</Link>
              </article>
              <article className="card-dark">
                <h3>Minimalist</h3>
                <p>Clean lines, simple shapes, and negative space. Perfect for first tattoos and subtle designs.</p>
                <Link href="/tattoo-ideas/minimalist" className="link-arrow">Explore minimalist →</Link>
              </article>
              <article className="card-dark">
                <h3>Traditional</h3>
                <p>Bold lines, limited colors, iconic imagery. Timeless and readable even after decades.</p>
                <Link href="/tattoo-ideas/traditional" className="link-arrow">Explore traditional →</Link>
              </article>
              <article className="card-dark">
                <h3>Japanese</h3>
                <p>Rich storytelling with dragons, koi, and waves. Large-scale, highly detailed, deeply symbolic.</p>
                <Link href="/tattoo-ideas/japanese" className="link-arrow">Explore Japanese →</Link>
              </article>
            </div>
          </div>
        </section>

        {/* Step 3: Placement */}
        <section className="section" id="placement">
          <div className="container stack">
            <span className="eyebrow">Step 3</span>
            <h2>Select the Placement</h2>
            <p>Where you put your tattoo affects pain, visibility, and how the design flows. Here is what to consider:</p>
            
            <h3>Beginner-friendly areas</h3>
            <ul>
              <li><strong>Outer arm (bicep)</strong>: Low pain, easy to hide/show, flat surface for clean lines</li>
              <li><strong>Calf</strong>: Moderate pain, good for medium designs, easy aftercare</li>
              <li><strong>Thigh</strong>: Low-moderate pain, large canvas, easy to conceal</li>
            </ul>
            
            <h3>Advanced areas</h3>
            <ul>
              <li><strong>Ribs</strong>: High pain, bony area, design moves with breathing</li>
              <li><strong>Spine</strong>: High pain, sensitive area, limited to linear designs</li>
              <li><strong>Hands/feet</strong>: High pain, fast fading, visible to everyone</li>
            </ul>
            
            <p><Link href="/placement" className="link-arrow">See full placement guide →</Link></p>
          </div>
        </section>

        {/* Step 4: Sketch */}
        <section className="section" id="sketch">
          <div className="container stack">
            <span className="eyebrow">Step 4</span>
            <h2>Sketch Your Idea</h2>
            <p>You do not need to be an artist to design your tattoo. Here are three approaches:</p>
            
            <h3>Write a detailed description</h3>
            <p>Describe your idea in plain English: &quot;A fine-line snake wrapped around a peony, designed for the inner forearm.&quot; Your artist will translate this into art.</p>
            
            <h3>Use AI to preview</h3>
            <p>Our AI tattoo generator can create a visual reference from your description in 30 seconds. No signup needed — 3 free designs daily.</p>
            <Link className="btn btn-primary" href="/generate">Try AI Tattoo Generator</Link>
            
            <h3>Work with your artist</h3>
            <p>Bring your mood board, written description, or AI preview to your consultation. A good artist will refine your concept for your skin tone, body shape, and aging.</p>
          </div>
        </section>

        {/* Step 5: Artist */}
        <section className="section" id="artist">
          <div className="container stack">
            <span className="eyebrow">Step 5</span>
            <h2>Find a Tattoo Artist</h2>
            <p>The right artist makes the difference between a good tattoo and a great one. Here is how to choose:</p>
            
            <h3>Check their portfolio</h3>
            <p>Look for healed tattoos (not just fresh photos), consistency in style, and attention to detail. If you want realism, do not choose an artist who only does traditional.</p>
            
            <h3>Verify hygiene standards</h3>
            <p>The shop should be clean, use new needles, and follow health regulations. Do not compromise on safety — infections can ruin your tattoo and your health.</p>
            
            <h3>Schedule a consultation</h3>
            <p>Most artists offer free consultations. Bring your references, discuss sizing and placement, and ask about their process. Trust your gut — if something feels off, keep looking.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container grid-2">
            <div className="stack">
              <span className="eyebrow">FAQ</span>
              <h2>Frequently asked questions about designing a tattoo</h2>
            </div>
            <div className="stack">
              {faqs.map((faq, i) => (
                <details className="card-dark" key={i}>
                  <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 18 }}>{faq.question}</summary>
                  <p style={{ marginTop: 14 }}>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section">
          <div className="container card-paper stack">
            <span className="eyebrow">Ready to design?</span>
            <h2>Preview Your Tattoo Idea with AI</h2>
            <p>Describe your concept, choose a style, and generate a visual reference in 30 seconds. No signup needed.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
