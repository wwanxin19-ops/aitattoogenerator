export const medicalDisclaimer =
  "AI-generated designs are for reference and inspiration only. Always consult a licensed tattoo artist before getting inked.";

export const siteUrl = "https://aitattoogenerator.cc";

export const navItems = [
  { href: "/generate/", label: "Generator" },
  { href: "/tattoo-ideas/", label: "Tattoo Ideas" },
  { href: "/placement/", label: "Placement" },
  { href: "/guides/", label: "Guides" },
  { href: "/pricing/", label: "Pricing" }
];

export const footerLinks = [
  { href: "/generate/", label: "Generator" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/tattoo-ideas/", label: "Tattoo Ideas" },
  { href: "/placement/", label: "Placement" },
  { href: "/guides/", label: "Guides" },
  { href: "/blog/", label: "Blog" },
  { href: "/compare/", label: "Compare" },
  { href: "/about/", label: "About" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/terms/", label: "Terms" },
  { href: "/cookie-policy/", label: "Cookies" },
  { href: "/refund-policy/", label: "Refund Policy" }
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
