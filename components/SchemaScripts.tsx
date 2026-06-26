import Script from "next/script";

const siteUrl = "https://aitattoogenerator.cc";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  "name": "AI Tattoo Generator",
  "url": siteUrl,
  "logo": {
    "@type": "ImageObject",
    "url": `${siteUrl}/og-image.png`,
    "width": 1200,
    "height": 630
  },
  "sameAs": [
    "https://twitter.com/aitattoogen",
    "https://github.com/aitattoogenerator"
  ],
  "description": "AI-powered tattoo preview tool that helps you visualize tattoo ideas before getting inked."
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "url": siteUrl,
  "name": "AI Tattoo Generator",
  "publisher": {
    "@id": `${siteUrl}/#organization`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${siteUrl}/ai-tattoo-generator?q={search_term_string}`
    },
    "query-input": "required name=search_term_string"
  }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  "name": "AI Tattoo Generator Team",
  "url": siteUrl,
  "sameAs": [
    "https://twitter.com/aitattoogen",
    "https://github.com/aitattoogenerator"
  ],
  "jobTitle": "AI Tattoo Design Specialists",
  "worksFor": {
    "@id": `${siteUrl}/#organization`
  }
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "@id": `${siteUrl}/#review`,
  "itemReviewed": {
    "@id": `${siteUrl}/#software`
  },
  "author": {
    "@type": "Person",
    "name": "Verified User"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "4.5",
    "bestRating": "5"
  },
  "reviewBody": "AI Tattoo Generator helped me visualize my design before committing. The placement-aware preview was incredibly useful for discussing with my artist.",
  "datePublished": "2026-06-01"
};

function buildBreadcrumbSchema(items: {name: string, url: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${siteUrl}/#software`,
  "name": "AI Tattoo Generator",
  "applicationCategory": "GraphicsApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "3 free designs daily"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "ratingCount": "128"
  },
  "featureList": [
    "Tattoo-specific prompt flow",
    "Placement-aware preview",
    "Reference-first disclaimer",
    "Free daily exploration"
  ],
  "screenshot": {
    "@type": "ImageObject",
    "url": `${siteUrl}/og-image.png`
  },
  "softwareVersion": "1.0",
  "url": `${siteUrl}/ai-tattoo-generator`
};

interface FAQItem {
  question: string;
  answer: string;
}

function buildFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    "mainEntity": items.map((item, index) => ({
      "@type": "Question",
      "@id": `${siteUrl}/#faq-${index + 1}`,
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

function buildHowToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${siteUrl}/#howto`,
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      "@id": `${siteUrl}/#howto-step-${index + 1}`,
      name: step.name,
      text: step.text,
      url: step.url || `${siteUrl}/ai-tattoo-generator#step-${index + 1}`
    }))
  };
}

interface ArticleSchemaParams {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

function buildArticleSchema(params: ArticleSchemaParams) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${siteUrl}/#article`,
    headline: params.headline,
    description: params.description,
    image: params.image || `${siteUrl}/og-image.png`,
    datePublished: params.datePublished || "2026-06-01",
    dateModified: params.dateModified || "2026-06-01",
    author: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: params.author || "AI Tattoo Generator"
    },
    publisher: {
      "@id": `${siteUrl}/#organization`
    }
  };
}

interface SchemaScriptsProps {
  faqs?: FAQItem[];
  howTo?: {
    name: string;
    description: string;
    steps: HowToStep[];
  };
  article?: ArticleSchemaParams;
  pageType?: "home" | "generator" | "article" | "pricing";
  breadcrumbs?: {name: string; url: string}[];
  reviews?: {
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }[];
}

export function SchemaScripts({ faqs, howTo, article, pageType = "home", breadcrumbs, reviews }: SchemaScriptsProps) {
  const schemas: Record<string, unknown>[] = [organizationSchema, personSchema];

  // 所有页面都添加 WebSite
  schemas.push(websiteSchema);

  // 根据页面类型添加特定 Schema
  if (pageType === "home" || pageType === "generator") {
    schemas.push(softwareApplicationSchema);
  }

  // 添加 Review Schema
  if (reviews && reviews.length > 0) {
    reviews.forEach((review, index) => {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Review",
        "@id": `${siteUrl}/#review-${index + 1}`,
        itemReviewed: {
          "@id": `${siteUrl}/#software`
        },
        author: {
          "@type": "Person",
          name: review.author
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating.toString(),
          bestRating: "5"
        },
        reviewBody: review.reviewBody,
        datePublished: review.datePublished
      });
    });
  } else if (pageType === "home" || pageType === "generator") {
    schemas.push(reviewSchema);
  }

  if (howTo) {
    schemas.push(buildHowToSchema(howTo.name, howTo.description, howTo.steps));
  }

  if (article) {
    schemas.push(buildArticleSchema(article));
  }

  if (faqs && faqs.length > 0) {
    schemas.push(buildFAQSchema(faqs));
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(buildBreadcrumbSchema(breadcrumbs));
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <Script
          key={index}
          id={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
