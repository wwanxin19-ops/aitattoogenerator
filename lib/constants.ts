export const medicalDisclaimer =
  "AI-generated designs are for reference and inspiration only. Always consult a licensed tattoo artist before getting inked.";

export const siteUrl = "https://aitattoogenerator.cc";

export const navItems = [
  { href: "/pricing/", label: "Pricing" },
  { href: "/styles/realism/", label: "Styles" },
  { href: "/ai-tattoo-generator/", label: "Generator" }
];

export const footerLinks = [
  { href: "/ai-tattoo-generator/", label: "Generator" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/styles/realism/", label: "Realism" },
  { href: "/styles/minimalist/", label: "Minimalist" },
  { href: "/body-parts/arm/", label: "Arm Tattoos" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/cookie-policy/", label: "Cookies" }
] as const;

export const comparisonColumns = [
  {
    name: "Tat.ink",
    intro: "Good for browsing inspiration, weaker for structured pre-ink planning.",
    features: [
      ["Tattoo-specific prompt flow", "Limited", "limited"],
      ["Placement-aware preview", "Limited", "limited"],
      ["Reference-first disclaimer", "No", "no"],
      ["Free daily exploration", "Limited", "limited"]
    ],
    ours: false
  },
  {
    name: "BlackInk.ai",
    intro: "Strong AI imagery, but less focused on taking a safe reference to an artist.",
    features: [
      ["Tattoo-specific prompt flow", "Yes", "yes"],
      ["Placement-aware preview", "Limited", "limited"],
      ["Reference-first disclaimer", "Limited", "limited"],
      ["Free daily exploration", "Limited", "limited"]
    ],
    ours: false
  },
  {
    name: "AI Tattoo Generator",
    intro: "Designed around previewing your idea before you talk to a licensed artist.",
    features: [
      ["Tattoo-specific prompt flow", "Yes", "yes"],
      ["Placement-aware preview", "Yes", "yes"],
      ["Reference-first disclaimer", "Yes", "yes"],
      ["Free daily exploration", "Yes", "yes"]
    ],
    ours: true
  }
] as const;
