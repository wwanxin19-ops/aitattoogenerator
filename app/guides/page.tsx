import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Guides 2026 — How to Design, Care & Choose Your Ink",
  description: "Free tattoo guides 2026: how to design a tattoo, aftercare tips, choosing an artist, pain levels by body part, and cost breakdown. Start with our AI tattoo generator.",
  alternates: { canonical: "/guides" }
};

const guides = [
  {
    slug: "how-to-design-a-tattoo",
    name: "How to Design a Tattoo",
    description: "Complete beginner's guide: from finding inspiration to creating a design your artist will love. Includes style selection and placement advice.",
    icon: "🎨",
    readTime: "8 min",
    topics: ["Inspiration", "Style selection", "Placement", "Artist collaboration"]
  },
  {
    slug: "aftercare",
    name: "Tattoo Aftercare Guide",
    description: "Learn how to properly care for your new tattoo to ensure optimal healing and long-term vibrancy. Day-by-day instructions included.",
    icon: "🩹",
    readTime: "5 min",
    topics: ["Day 1-3", "Day 4-14", "Long-term care", "Healing problems"]
  },
  {
    slug: "first-tattoo",
    name: "First Tattoo Guide",
    description: "Everything you need to know before getting your first tattoo, from preparation to aftercare. What to expect and how to prepare.",
    icon: "🎯",
    readTime: "6 min",
    topics: ["Preparation", "Pain management", "What to expect", "Aftercare"]
  },
  {
    slug: "choosing-artist",
    name: "Choosing a Tattoo Artist",
    description: "How to find and select the right tattoo artist for your style and design. Red flags to avoid and questions to ask.",
    icon: "👨‍🎨",
    readTime: "7 min",
    topics: ["Portfolio review", "Style matching", "Consultation", "Pricing"]
  },
  {
    slug: "pain-levels",
    name: "Tattoo Pain Levels",
    description: "Understand pain levels for different body placements and how to manage discomfort. Tips for first-timers and sensitive areas.",
    icon: "📊",
    readTime: "4 min",
    topics: ["Pain scale", "Body parts", "Management tips", "Numbing options"]
  },
  {
    slug: "cost-guide",
    name: "Tattoo Cost Guide",
    description: "Factors that affect tattoo pricing and how to budget for your next piece. Average costs by size, style, and location.",
    icon: "💰",
    readTime: "5 min",
    topics: ["Pricing factors", "Size guide", "Artist rates", "Tipping"]
  }
];

const featuredTopics = [
  {
    title: "Design Your Tattoo",
    description: "Learn the complete process from idea to final design. Find inspiration, choose styles, and create a reference.",
    link: "/guides/how-to-design-a-tattoo",
    icon: "✏️"
  },
  {
    title: "Tattoo Placement",
    description: "Compare pain levels, healing times, and design suitability for 11 body parts.",
    link: "/placement",
    icon: "📍"
  },
  {
    title: "Tattoo Styles",
    description: "Explore 6 major tattoo styles with examples, best placements, and design tips.",
    link: "/tattoo-ideas",
    icon: "🎭"
  }
];

export default function GuidesPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Guides 2026 — How to Design, Care & Choose Your Ink",
          description: "Free tattoo guides covering design, aftercare, artist selection, pain levels, and costs.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Guides 2026</span>
          <h1>Tattoo Guides & Resources — Expert Advice for Your Ink</h1>
          <p className="lead">
            Comprehensive guides covering every aspect of getting a tattoo: from designing your first piece 
            to long-term aftercare. Written for beginners and experienced collectors alike.
          </p>
          <div className="quick-actions">
            <Link className="btn btn-primary" href="/guides/how-to-design-a-tattoo">Start Designing</Link>
            <Link className="btn btn-secondary" href="/generate">Generate Preview</Link>
          </div>
        </section>

        {/* Featured Topics */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Popular Topics</span>
            <h2>Essential Tattoo Topics</h2>
            <div className="grid-3">
              {featuredTopics.map((topic) => (
                <article key={topic.title} className="card-dark">
                  <Link href={topic.link} className="block">
                    <span className="text-2xl">{topic.icon}</span>
                    <h3>{topic.title}</h3>
                    <p>{topic.description}</p>
                    <span className="link-arrow">Learn more →</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* All Guides */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">All Guides</span>
            <h2>Complete Tattoo Guide Library</h2>
            <p className="text-muted">
              Browse our collection of in-depth guides. Each guide includes practical tips, 
              expert advice, and actionable steps.
            </p>
            <div className="grid-2">
              {guides.map((guide) => (
                <article key={guide.slug} className="card-dark">
                  <Link href={`/guides/${guide.slug}`} className="block">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{guide.icon}</span>
                      <span className="text-sm text-muted">{guide.readTime} read</span>
                    </div>
                    <h3>{guide.name}</h3>
                    <p>{guide.description}</p>
                    <div className="tag-list">
                      {guide.topics.map((topic) => (
                        <span key={topic} className="tag">{topic}</span>
                      ))}
                    </div>
                    <span className="link-arrow">Read guide →</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Quick Tips</span>
            <h2>Tattoo Tips for Beginners</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>Before Your Tattoo</h3>
                <ul>
                  <li>Research your artist thoroughly — check healed work, not just fresh photos</li>
                  <li>Eat a full meal and stay hydrated before your session</li>
                  <li>Avoid alcohol and blood thinners for 24 hours before</li>
                  <li>Get a good night&apos;s sleep — you&apos;ll need the energy</li>
                  <li>Wear comfortable clothing that allows easy access to the tattoo area</li>
                </ul>
              </article>
              <article className="card-dark">
                <h3>After Your Tattoo</h3>
                <ul>
                  <li>Follow your artist&apos;s aftercare instructions exactly</li>
                  <li>Keep the tattoo clean and moisturized but not soaked</li>
                  <li>Avoid direct sunlight, swimming, and strenuous exercise for 2 weeks</li>
                  <li>Don&apos;t pick or scratch at scabs — let them fall off naturally</li>
                  <li>Schedule a touch-up if needed after healing is complete</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">FAQ</span>
            <h2>Common Tattoo Questions</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>How much does a tattoo cost?</h3>
                <p>
                  Tattoo costs vary by size, complexity, artist experience, and location. 
                  Small tattoos: $50-200. Medium: $200-500. Large pieces: $500+. Hourly rates 
                  range from $100-300. Always prioritize quality over price.
                </p>
              </article>
              <article className="card-dark">
                <h3>How long does a tattoo take to heal?</h3>
                <p>
                  Surface healing takes 2-3 weeks, but full healing (including deeper skin layers) 
                  takes 4-6 weeks. Follow aftercare instructions and avoid sun exposure during healing.
                </p>
              </article>
              <article className="card-dark">
                <h3>Can I design my own tattoo?</h3>
                <p>
                  Absolutely! Many people bring sketches, photos, or written descriptions. 
                  Use our AI tattoo generator to create a visual reference from your description, 
                  then work with your artist to refine it.
                </p>
              </article>
              <article className="card-dark">
                <h3>What should I know before my first tattoo?</h3>
                <p>
                  Research your artist, choose a meaningful design, consider placement carefully, 
                  and prepare physically (eat, hydrate, rest). Read our First Tattoo Guide for 
                  complete preparation steps.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>
              Ready to design your tattoo? Use our AI generator to create a reference preview 
              in 30 seconds. No signup needed — 3 free designs daily.
            </p>
            <div className="quick-actions">
              <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
              <Link className="btn btn-secondary" href="/compare">Compare Styles</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
