import {
  blogPosts,
  buyerModules,
  sellerModules,
  neighborhoods,
  getBlogPostBySlug,
  getBuyerModuleBySlug,
  getSellerModuleBySlug,
  getNeighborhoodBySlug,
} from "./content";
import { cities, getCityBySlug } from "./cityData";
import { buyerGuides, getBuyerGuideBySlug } from "./buyerGuideData";

export const SITE_URL = "https://muzamilkhanrealtor.com";
const SITE_NAME = "Muzamil Khan Real Estate";
const DEFAULT_TITLE = "Muzamil Khan Real Estate | East Bay Realtor®";
const DEFAULT_DESCRIPTION =
  "Muzamil Khan Real Estate — serving El Cerrito, Albany, Berkeley, Kensington and the full East Bay. 15 years construction expertise. First-time buyers, movers, buyers & sellers. Free consultation.";

export interface PageSeo {
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "article";
  jsonLd: object[];
}

const STATIC_META: Record<string, { title: string; description: string }> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/buy": {
    title: "Buying a Home in El Cerrito & the East Bay | Muzamil Khan Realtor",
    description:
      "Buy a home in El Cerrito, Albany, Berkeley, Oakland or anywhere in the East Bay with a Realtor who spent 15 years in construction. First-time buyer guidance, strong offers, inspection insight.",
  },
  "/sell": {
    title: "Sell Your Home in El Cerrito & the East Bay | Muzamil Khan Realtor",
    description:
      "Sell your East Bay home for top dollar: strategic pricing, smart prep guidance, and repair negotiations backed by 15 years of construction experience. Free home valuation.",
  },
  "/home-valuation": {
    title: "Free East Bay Home Valuation | Muzamil Khan Realtor",
    description:
      "Get a real valuation for your El Cerrito or East Bay home — based on live market data and 15 years of construction experience, not an algorithm. Free, no obligation, 24-hour response.",
  },
  "/calculator": {
    title: "East Bay Home Affordability Calculator | Muzamil Khan",
    description:
      "Estimate what you can afford in the East Bay: monthly payment, income, and down payment scenarios for El Cerrito, Richmond, Berkeley and beyond.",
  },
  "/start": {
    title: "Start Here: Buy or Sell in the East Bay | Muzamil Khan, Realtor",
    description:
      "Tell me where you're headed in 60 seconds and I'll personally reach out with a clear next step. Buying, selling, or just exploring the East Bay, no pressure. From Muzamil Khan, Rise Group.",
  },
  "/first-time-home-buyer": {
    title: "First-Time Home Buyer Guide for the East Bay | Muzamil Khan, Realtor",
    description:
      "An honest first-time home buyer guide for the East Bay from Muzamil Khan: how much you really need (as low as 3.5% down), down-payment programs, the step-by-step process, and a 15-year construction eye on every home. Free consultation.",
  },
  "/buyer-hub": {
    title: "First-Time Buyer Hub: East Bay Home Buying Guides | Muzamil Khan",
    description:
      "Plain-language guides to buying a home in the East Bay: timelines, offers, financing, closing costs, inspections, and the mistakes to avoid.",
  },
  "/seller-hub": {
    title: "Seller Education Hub: East Bay Home Selling Guides | Muzamil Khan",
    description:
      "Everything East Bay sellers need: pricing strategy, disclosures, inspection prep, repairs vs credits, and evaluating offers — explained without jargon.",
  },
  "/neighborhoods": {
    title: "East Bay Neighborhood Guides: El Cerrito, Richmond & More | Muzamil Khan",
    description:
      "Local guides to West Contra Costa and East Bay neighborhoods: El Cerrito, Richmond, Hercules, Pinole, San Pablo, El Sobrante, Kensington and beyond.",
  },
  "/blog": {
    title: "East Bay Real Estate Blog | Muzamil Khan",
    description:
      "Practical insights for East Bay buyers and sellers: market outlooks, neighborhood comparisons, offer strategy, and inspection know-how from a construction-background Realtor.",
  },
  "/about": {
    title: "About Muzamil Khan | East Bay Realtor® with a Construction Background",
    description:
      "15 years in construction, 10+ years in El Cerrito. Meet Muzamil Khan, the East Bay Realtor who reads inspection reports differently. DRE #02400805.",
  },
  "/contact": {
    title: "Contact Muzamil Khan | East Bay Realtor® | Free Consultation",
    description:
      "Ready to buy or sell in the East Bay? Call (415) 819-8312, email, or book a free buyer or seller consultation with Muzamil Khan.",
  },
  "/privacy": {
    title: "Privacy Policy | Muzamil Khan Real Estate",
    description: "Privacy policy for muzamilkhanrealtor.com.",
  },
  "/terms": {
    title: "Terms of Service | Muzamil Khan Real Estate",
    description: "Terms of service for muzamilkhanrealtor.com.",
  },
};

const SITE_IMAGE = `${SITE_URL}/muzamil-khan.jpg`;

// Publisher node, @id-linked to the sitewide RealEstateAgent declared in
// index.html so engines resolve the byline to the same Muzamil Khan entity.
const PUBLISHER_NODE = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#agent`,
  name: SITE_NAME,
  logo: {
    "@type": "ImageObject",
    url: SITE_IMAGE,
  },
};

const AUTHOR_NODE = {
  "@type": "Person",
  "@id": `${SITE_URL}/#muzamil`,
  name: "Muzamil Khan",
  jobTitle: "Real Estate Agent",
  url: `${SITE_URL}/about`,
};

function faqJsonLd(faqs: { question: string; answer: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function breadcrumbJsonLd(trail: { name: string; path: string }[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === "/" ? "" : c.path}`,
    })),
  };
}

export function getSeoForPath(path: string): PageSeo {
  // normalize: strip trailing slash (except root) and query/hash
  let p = path.split(/[?#]/)[0];
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);

  const canonical = `${SITE_URL}${p === "/" ? "" : p}`;
  const base: PageSeo = {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonical,
    ogType: "website",
    jsonLd: [],
  };

  const staticMeta = STATIC_META[p];
  if (staticMeta) return { ...base, ...staticMeta };

  const blogMatch = p.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const post = getBlogPostBySlug(blogMatch[1]);
    if (post) {
      const jsonLd: object[] = [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.metaDescription || post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
          url: canonical,
          mainEntityOfPage: canonical,
          image: SITE_IMAGE,
          inLanguage: "en-US",
          articleSection: post.category,
          author: AUTHOR_NODE,
          publisher: PUBLISHER_NODE,
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]),
      ];
      if (post.faq?.length) jsonLd.push(faqJsonLd(post.faq));
      return {
        ...base,
        title: `${post.title} | ${SITE_NAME}`,
        description: post.metaDescription || post.excerpt,
        ogType: "article",
        jsonLd,
      };
    }
  }

  const buyerMatch = p.match(/^\/buyer-hub\/([^/]+)$/);
  if (buyerMatch) {
    const mod = getBuyerModuleBySlug(buyerMatch[1]);
    if (mod) {
      return {
        ...base,
        title: `${mod.title} | First-Time Buyer Hub | ${SITE_NAME}`,
        description: mod.description,
      };
    }
  }

  const sellerMatch = p.match(/^\/seller-hub\/([^/]+)$/);
  if (sellerMatch) {
    const mod = getSellerModuleBySlug(sellerMatch[1]);
    if (mod) {
      return {
        ...base,
        title: `${mod.title} | Seller Education Hub | ${SITE_NAME}`,
        description: mod.description,
      };
    }
  }

  const hoodMatch = p.match(/^\/neighborhoods\/([^/]+)$/);
  if (hoodMatch) {
    const hood = getNeighborhoodBySlug(hoodMatch[1]);
    if (hood) {
      return {
        ...base,
        title: `${hood.name} Neighborhood Guide | East Bay | ${SITE_NAME}`,
        description: hood.overview.slice(0, 155),
      };
    }
  }

  const buyerGuideMatch = p.match(/^\/buying-in-([^/]+)$/);
  if (buyerGuideMatch) {
    const guide = getBuyerGuideBySlug(buyerGuideMatch[1]);
    if (guide) {
      // BuyerGuide renders its own RealEstateAgent + FAQPage JSON-LD in the body,
      // which is included in the prerendered HTML — don't duplicate it here.
      return {
        ...base,
        title: guide.metaTitle,
        description: guide.metaDescription,
      };
    }
  }

  const cityMatch = p.match(/^\/cities\/([^/]+)$/);
  if (cityMatch) {
    const city = getCityBySlug(cityMatch[1]);
    if (city) {
      // CityPage renders its own JSON-LD (including FAQPage) in the body,
      // which is included in the prerendered HTML — don't duplicate it here.
      return {
        ...base,
        title: city.metaTitle,
        description: city.metaDescription,
      };
    }
  }

  return base;
}

/** Every prerenderable route on the site, with lastmod where known. Drives prerendering and the sitemap. */
export function listAllRoutes(): { path: string; lastmod?: string; priority: number }[] {
  const routes: { path: string; lastmod?: string; priority: number }[] = [
    { path: "/", priority: 1.0 },
    { path: "/start", priority: 0.8 },
    { path: "/buy", priority: 0.9 },
    { path: "/sell", priority: 0.9 },
    { path: "/home-valuation", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/calculator", priority: 0.6 },
    { path: "/first-time-home-buyer", priority: 0.9 },
    { path: "/buyer-hub", priority: 0.8 },
    { path: "/seller-hub", priority: 0.8 },
    { path: "/neighborhoods", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/privacy", priority: 0.1 },
    { path: "/terms", priority: 0.1 },
  ];
  const buildMs = Date.now();
  for (const post of blogPosts) {
    // Skip scheduled (future-dated) posts so they aren't prerendered or listed
    // in the sitemap before their publish date.
    if (new Date(post.publishedAt + "T00:00:00").getTime() > buildMs) continue;
    routes.push({ path: `/blog/${post.slug}`, lastmod: post.publishedAt, priority: 0.7 });
  }
  for (const mod of buyerModules) {
    routes.push({ path: `/buyer-hub/${mod.slug}`, priority: 0.6 });
  }
  for (const mod of sellerModules) {
    routes.push({ path: `/seller-hub/${mod.slug}`, priority: 0.6 });
  }
  for (const hood of neighborhoods) {
    routes.push({ path: `/neighborhoods/${hood.slug}`, priority: 0.6 });
  }
  for (const city of cities) {
    routes.push({ path: `/cities/${city.slug}`, priority: 0.8 });
  }
  for (const guide of buyerGuides) {
    routes.push({ path: `/buying-in-${guide.slug}`, priority: 0.9 });
  }
  return routes;
}
