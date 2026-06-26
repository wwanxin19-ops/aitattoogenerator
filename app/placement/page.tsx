import type { Metadata } from "next";
import Link from "next/link";
import { SchemaScripts } from "@/components/SchemaScripts";

export const metadata: Metadata = {
  title: "Tattoo Placement Guide — Where to Get Your Tattoo",
  description: "Explore tattoo placement options from arm to ankle. Find the best body placement for your tattoo style and design.",
  alternates: { canonical: "/placement" }
};

const placements = [
  {
    slug: "arm",
    name: "Arm",
    description: "Upper arm tattoos offer great visibility and space for medium to large designs.",
    image: "/og-image.png"
  },
  {
    slug: "forearm",
    name: "Forearm",
    description: "Highly visible and perfect for designs with clear vertical flow.",
    image: "/og-image.png"
  },
  {
    slug: "sleeve",
    name: "Sleeve",
    description: "Full arm coverage that tells a story through connected designs.",
    image: "/og-image.png"
  },
  {
    slug: "chest",
    name: "Chest",
    description: "Large canvas perfect for meaningful designs close to your heart.",
    image: "/og-image.png"
  },
  {
    slug: "back",
    name: "Back",
    description: "Maximum space for elaborate designs and detailed artwork.",
    image: "/og-image.png"
  },
  {
    slug: "leg",
    name: "Leg",
    description: "Versatile placement from thigh to calf for various design sizes.",
    image: "/og-image.png"
  },
  {
    slug: "thigh",
    name: "Thigh",
    description: "Large, flat area ideal for detailed designs with less pain.",
    image: "/og-image.png"
  },
  {
    slug: "wrist",
    name: "Wrist",
    description: "Small, delicate designs that are always visible and meaningful.",
    image: "/og-image.png"
  },
  {
    slug: "ankle",
    name: "Ankle",
    description: "Subtle and feminine placement for small, elegant designs.",
    image: "/og-image.png"
  },
  {
    slug: "shoulder",
    name: "Shoulder",
    description: "Round canvas perfect for mandalas, tribal, and circular designs.",
    image: "/og-image.png"
  },
  {
    slug: "neck",
    name: "Neck",
    description: "Bold statement placement for confident, visible designs.",
    image: "/og-image.png"
  }
];

export default function PlacementPage() {
  return (
    <>
      <SchemaScripts
        pageType="article"
        article={{
          headline: "Tattoo Placement Guide — Where to Get Your Tattoo",
          description: "Explore tattoo placement options from arm to ankle. Find the best body placement for your tattoo style and design.",
          image: "https://aitattoogenerator.cc/og-image.png"
        }}
      />
      
      <main>
        <section className="container article-hero stack">
          <span className="eyebrow">Tattoo Placement</span>
          <h1>Tattoo Placement Guide</h1>
          <p className="lead">Find the perfect body placement for your tattoo. Each guide includes pain levels, healing tips, and design recommendations.</p>
        </section>

        <section className="section section-tight">
          <div className="container grid-3">
            {placements.map((placement) => (
              <article key={placement.slug} className="card-dark">
                <Link href={`/placement/${placement.slug}`} className="block">
                  <h3>{placement.name}</h3>
                  <p>{placement.description}</p>
                  <span className="link-arrow">Explore {placement.name} →</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="section section-tight">
          <div className="container card-paper stack">
            <span className="eyebrow">Start creating</span>
            <h2>Generate Your Tattoo Design</h2>
            <p>Use our AI tattoo generator to preview your design on any body placement.</p>
            <Link className="btn btn-primary" href="/generate">Start Designing Free</Link>
          </div>
        </section>
      </main>
    </>
  );
}
