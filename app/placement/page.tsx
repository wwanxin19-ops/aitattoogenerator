import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Placement Guide 2026 — Pain Levels, Healing & Best Designs by Body Part",
  description: "Complete tattoo placement guide 2026: pain levels, healing times, and best design types for arm, forearm, wrist, chest, back, leg, thigh, and more. Find your perfect spot.",
  alternates: { canonical: "/placement" }
};

const placements = [
  {
    slug: "arm",
    name: "Arm",
    description: "Upper arm tattoos offer great visibility and space for medium to large designs. One of the most popular and versatile placements.",
    pain: "Low to Medium",
    healing: "2-3 weeks",
    bestFor: ["Medium designs", "Sleeve start", "First tattoo"],
    popularDesigns: ["Tribal", "Geometric", "Floral", "Quotes"]
  },
  {
    slug: "forearm",
    name: "Forearm",
    description: "Highly visible and perfect for designs with clear vertical flow. Easy to show off or cover with long sleeves.",
    pain: "Low",
    healing: "2-3 weeks",
    bestFor: ["Visible designs", "Vertical flow", "Quotes", "Bands"],
    popularDesigns: ["Script", "Geometric", "Nature", "Abstract"]
  },
  {
    slug: "sleeve",
    name: "Sleeve",
    description: "Full arm coverage that tells a story through connected designs. Requires planning and multiple sessions.",
    pain: "Medium to High",
    healing: "3-4 weeks per session",
    bestFor: ["Large compositions", "Thematic designs", "Experienced collectors"],
    popularDesigns: ["Japanese", "Traditional", "Biomechanical", "Nature scenes"]
  },
  {
    slug: "chest",
    name: "Chest",
    description: "Large canvas perfect for meaningful designs close to your heart. Can extend to shoulders for a full upper body piece.",
    pain: "High",
    healing: "3-4 weeks",
    bestFor: ["Meaningful designs", "Large pieces", "Symmetrical work"],
    popularDesigns: ["Portraits", "Religious", "Animals", "Mandala"]
  },
  {
    slug: "back",
    name: "Back",
    description: "Maximum space for elaborate designs and detailed artwork. The largest canvas on the body for truly epic pieces.",
    pain: "Medium to High",
    healing: "3-4 weeks",
    bestFor: ["Large detailed work", "Full back pieces", "Wings", "Landscapes"],
    popularDesigns: ["Japanese back piece", "Wings", "Tribal", "Realism scenes"]
  },
  {
    slug: "leg",
    name: "Leg",
    description: "Versatile placement from thigh to calf for various design sizes. Easy to cover or show depending on clothing.",
    pain: "Low to Medium",
    healing: "2-3 weeks",
    bestFor: ["Medium to large designs", "Flowing compositions", "First tattoo"],
    popularDesigns: ["Japanese", "Traditional", "Nature", "Geometric"]
  },
  {
    slug: "thigh",
    name: "Thigh",
    description: "Large, flat area ideal for detailed designs with less pain. Popular for first tattoos and large feminine pieces.",
    pain: "Low",
    healing: "2-3 weeks",
    bestFor: ["Large designs", "Detailed work", "Feminine pieces", "First tattoo"],
    popularDesigns: ["Floral", "Mandala", "Quotes", "Animals"]
  },
  {
    slug: "wrist",
    name: "Wrist",
    description: "Small, delicate designs that are always visible and meaningful. Perfect for subtle, personal tattoos.",
    pain: "Medium",
    healing: "2-3 weeks",
    bestFor: ["Small designs", "Symbols", "Quotes", "First tattoo"],
    popularDesigns: ["Symbols", "Coordinates", "Dates", "Minimalist"]
  },
  {
    slug: "ankle",
    name: "Ankle",
    description: "Subtle and feminine placement for small, elegant designs. Easy to hide with socks or show with sandals.",
    pain: "Medium to High",
    healing: "2-3 weeks",
    bestFor: ["Small designs", "Delicate work", "Feminine pieces"],
    popularDesigns: ["Flowers", "Butterflies", "Symbols", "Script"]
  },
  {
    slug: "shoulder",
    name: "Shoulder",
    description: "Round canvas perfect for mandalas, tribal, and circular designs. Can extend to chest or back for larger pieces.",
    pain: "Medium",
    healing: "2-3 weeks",
    bestFor: ["Circular designs", "Mandalas", "Tribal", "Cap sleeves"],
    popularDesigns: ["Mandala", "Tribal", "Floral", "Geometric"]
  },
  {
    slug: "neck",
    name: "Neck",
    description: "Bold statement placement for confident, visible designs. Consider professional implications before choosing.",
    pain: "High",
    healing: "2-3 weeks",
    bestFor: ["Statement pieces", "Small designs", "Experienced collectors"],
    popularDesigns: ["Script", "Symbols", "Small portraits", "Flowers"]
  }
];

const painGuide = [
  { level: "Low", areas: ["Thigh", "Forearm", "Upper Arm", "Calf"], tip: "Good for first tattoos" },
  { level: "Medium", areas: ["Wrist", "Shoulder", "Lower Back", "Ankle"], tip: "Manageable with preparation" },
  { level: "High", areas: ["Chest", "Ribs", "Neck", "Spine", "Elbow"], tip: "Consider for experienced collectors" }
];

export default function PlacementPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Placement Guide 2026 — Pain Levels, Healing & Best Designs by Body Part",
          description: "Complete tattoo placement guide: pain levels, healing times, and best design types for each body part.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        {/* Hero */}
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Placement Guide 2026</span>
          <h1>Where to Get Your Tattoo — Complete Placement Guide</h1>
          <p className="lead">
            Find the perfect body placement for your tattoo. Compare pain levels, healing times, 
            and best design types for 11 popular body parts. Make an informed decision before you ink.
          </p>
          <div className="quick-actions">
            <Link className="btn btn-primary" href="/generate">Generate Your Design</Link>
            <Link className="btn btn-secondary" href="/tattoo-ideas">Browse Ideas</Link>
          </div>
        </section>

        {/* Pain Level Overview */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Pain Guide</span>
            <h2>Tattoo Pain Levels by Body Part</h2>
            <p className="text-muted">
              Pain varies by body part due to nerve density and proximity to bone. 
              Use this guide to choose a placement that matches your pain tolerance.
            </p>
            <div className="grid-3">
              {painGuide.map((guide) => (
                <article key={guide.level} className="card-dark">
                  <h3>{guide.level} Pain</h3>
                  <p>{guide.areas.join(", ")}</p>
                  <p className="text-sm text-muted">{guide.tip}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Placement Details */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Body Parts</span>
            <h2>Tattoo Placement Options — Detailed Guide</h2>
            <p className="text-muted">
              Click any body part to see detailed information about pain levels, 
              healing times, and the best design types for that placement.
            </p>
            <div className="grid-3">
              {placements.map((placement) => (
                <article key={placement.slug} className="card-dark">
                  <Link href={`/placement/${placement.slug}`} className="block">
                    <h3>{placement.name}</h3>
                    <p>{placement.description}</p>
                    <div className="meta-grid">
                      <span className="meta-item">Pain: {placement.pain}</span>
                      <span className="meta-item">Healing: {placement.healing}</span>
                    </div>
                    <div className="tag-list">
                      {placement.popularDesigns.slice(0, 3).map((design) => (
                        <span key={design} className="tag">{design}</span>
                      ))}
                    </div>
                    <span className="link-arrow">{placement.name} placement guide →</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Placement Tips */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">Expert Tips</span>
            <h2>How to Choose the Right Placement</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>Consider Visibility</h3>
                <p>
                  Think about your profession and lifestyle. Visible placements (hands, neck, face) 
                  may affect job prospects. Consider how often you want to show or hide your tattoo.
                </p>
              </article>
              <article className="card-dark">
                <h3>Think About Aging</h3>
                <p>
                  Skin changes over time. Areas with less sun exposure (upper arm, back) 
                  maintain tattoo quality longer. High-movement areas (wrists, ankles) may fade faster.
                </p>
              </article>
              <article className="card-dark">
                <h3>Match Design to Canvas</h3>
                <p>
                  Large, detailed designs need flat areas (thigh, back, chest). Small, simple designs 
                  work better on curved or limited spaces (wrist, ankle, behind ear).
                </p>
              </article>
              <article className="card-dark">
                <h3>Plan for Future Tattoos</h3>
                <p>
                  If you plan multiple tattoos, consider how they&apos;ll flow together. 
                  Leave space for future pieces and think about overall composition.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section section-tight">
          <div className="container stack">
            <span className="eyebrow">FAQ</span>
            <h2>Common Placement Questions</h2>
            <div className="grid-2">
              <article className="card-dark">
                <h3>What is the least painful place for a tattoo?</h3>
                <p>
                  The thigh, forearm, and upper arm are generally the least painful due to 
                  muscle padding and fewer nerve endings. These are great choices for first tattoos.
                </p>
              </article>
              <article className="card-dark">
                <h3>How long does a tattoo take to heal?</h3>
                <p>
                  Surface healing takes 2-3 weeks, but full healing (including deeper skin layers) 
                  takes 4-6 weeks. Follow your artist&apos;s aftercare instructions for best results.
                </p>
              </article>
              <article className="card-dark">
                <h3>Can I workout after getting a tattoo?</h3>
                <p>
                  Avoid strenuous exercise for 48-72 hours. Sweat and friction can irritate 
                  the fresh tattoo. Wait until the surface has healed before returning to intense workouts.
                </p>
              </article>
              <article className="card-dark">
                <h3>Will my tattoo stretch if I gain muscle?</h3>
                <p>
                  Moderate muscle gain won&apos;t significantly affect tattoos on the upper arm, chest, or back. 
                  However, dramatic weight changes can distort tattoos on the stomach or thighs.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Preview Your Design on Any Body Part</h2>
            <p>
              Use our AI tattoo generator to create a placement-aware preview. 
              See how your design looks on your chosen body part before you commit.
            </p>
            <div className="quick-actions">
              <Link className="btn btn-primary" href="/generate">Generate Your Design</Link>
              <Link className="btn btn-secondary" href="/compare">Compare Styles</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
