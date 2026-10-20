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
import { getBuyerGuideBySlug } from "./buyerGuideData";
import { CITIES, CITY_ORDER, type CitySlug } from "./trail";
import { PTK } from "./pathToKeys";
import { stepBySlug, docBySlug, PTK_BASE } from "./ptk";
import { REDIRECT_SOURCES } from "@shared/redirects";

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
  "/selling-without-an-agent-el-cerrito": {
    title: "Selling Your El Cerrito Home Without an Agent (FSBO)",
    description:
      "Thinking of selling your El Cerrito home without an agent? An honest FSBO breakdown: what you save, what you take on, the California disclosures you owe, and when going it alone actually pays off.",
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
    title: 'East Bay Neighborhoods: Berkeley, Oakland, Albany & El Cerrito | Muzamil Khan',
    description:
      'Median price, sale-to-list, days on market and percent sold over asking for Berkeley, Oakland, Albany and El Cerrito, plus nearby West Contra Costa cities, from a local Realtor.',
  },
  "/blog": {
    title: 'East Bay Real Estate Blog: Start Here & City Guides | Muzamil Khan',
    description:
      'Start with three essentials for first-time East Bay buyers, then read city guides for Berkeley, Oakland, Albany, El Cerrito and West County, plus buying and selling advice.',
  },
  "/about": {
    title: 'About Muzamil Khan | East Bay Realtor®, Reviews & Client Stories',
    description:
      '15 years in construction, 10+ years in El Cerrito. Meet Muzamil Khan, read 5-star client reviews, and watch client stories. Realtor with Rise Group, DRE #02400805.',
  },
  "/testimonials": {
    title: "Client Testimonials & Reviews | Muzamil Khan, East Bay Realtor®",
    description:
      "Video client stories and verified 5-star Google and Zillow reviews for Muzamil Khan, East Bay Realtor. Real clients, real closings in El Cerrito, Berkeley, Benicia, Pittsburg and beyond.",
  },
  "/buy/path-to-keys": {
    title: "Path to Keys: How Buying a Home Works in the East Bay | Muzamil Khan",
    description:
      "Every step of buying an East Bay home, from the buyer agreement to the keys: who does what, the documents you sign, contingency windows, and an escrow clock with your real dates.",
  },
  "/buy/path-to-keys/documents": {
    title: "Home Buying Documents Explained: All 29 | Path to Keys",
    description:
      "Every document in a California home purchase, from the buyer agreement and RPA to disclosures, contingency removal and the grant deed, explained in plain English.",
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
const SITE_LOGO = `${SITE_URL}/muzamil-logo.jpg`;

// Publisher node, @id-linked to the sitewide RealEstateAgent declared in
// index.html so engines resolve the byline to the same Muzamil Khan entity.
const PUBLISHER_NODE = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#agent`,
  name: SITE_NAME,
  logo: {
    "@type": "ImageObject",
    url: SITE_LOGO,
    width: 512,
    height: 512,
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


  if (p === PTK_BASE) {
    return {
      ...base,
      ...STATIC_META[p],
      jsonLd: [
        faqJsonLd(PTK.faq.map((f) => ({ question: f.q, answer: f.a }))),
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Buy", path: "/buy" },
          { name: "Path to Keys", path: PTK_BASE },
        ]),
      ],
    };
  }

  const ptkDocMatch = p.match(/^\/buy\/path-to-keys\/documents\/([^/]+)$/);
  if (ptkDocMatch) {
    const d = docBySlug(ptkDocMatch[1]);
    if (d) {
      const title = `${d.name} (${d.abbr}) Explained | Path to Keys`;
      return {
        ...base,
        title,
        description: d.what,
        ogType: "article",
        jsonLd: [
          { "@context": "https://schema.org", "@type": "Article", headline: d.name, description: d.what, dateModified: PTK.meta.lastReviewed, author: AUTHOR_NODE, publisher: PUBLISHER_NODE, mainEntityOfPage: canonical },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Path to Keys", path: PTK_BASE },
            { name: "Documents", path: `${PTK_BASE}/documents` },
            { name: d.abbr, path: p },
          ]),
        ],
      };
    }
  }

  const ptkStepMatch = p.match(/^\/buy\/path-to-keys\/([^/]+)$/);
  if (ptkStepMatch) {
    const st = stepBySlug(ptkStepMatch[1]);
    if (st) {
      return {
        ...base,
        title: `${st.title} When Buying a Home in California | Path to Keys`,
        description: `${st.summary} Step ${st.number} of ${PTK.steps.length} in buying an East Bay home.`,
        ogType: "article",
        jsonLd: [
          { "@context": "https://schema.org", "@type": "Article", headline: st.title, description: st.summary, dateModified: PTK.meta.lastReviewed, author: AUTHOR_NODE, publisher: PUBLISHER_NODE, mainEntityOfPage: canonical },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Path to Keys", path: PTK_BASE },
            { name: st.title, path: p },
          ]),
        ],
      };
    }
  }

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
      // Keep the long editorial headline as the on-page H1, but use a short
      // metaTitle (<=60 chars) for the <title> so Google doesn't truncate it.
      // No brand suffix on posts; it only ate the keyword-bearing part.
      return {
        ...base,
        title: post.metaTitle || post.title,
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
  if (buyerGuideMatch && buyerGuideMatch[1] in CITIES) {
    const city = CITIES[buyerGuideMatch[1] as CitySlug];
    const faqs = getBuyerGuideBySlug(city.slug)?.faqs ?? [];
    const jsonLd: object[] = [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Neighborhoods", path: "/neighborhoods" },
        { name: city.name, path: p },
      ]),
    ];
    if (faqs.length) jsonLd.push(faqJsonLd(faqs.map((f) => ({ question: f.q, answer: f.a }))));
    return { ...base, title: city.metaTitle, description: city.metaDescription, jsonLd };
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

/** Every prerenderable route on the site, with lastmod where known. Drives prerendering and the sitemap.
 *  `noSitemap` routes are still prerendered but kept out of sitemap.xml. */
export function listAllRoutes(): { path: string; lastmod?: string; priority: number; noSitemap?: boolean }[] {
  const routes: { path: string; lastmod?: string; priority: number; noSitemap?: boolean }[] = [
    { path: "/", priority: 1.0 },
    { path: "/start", priority: 0.8 },
    { path: "/buy", priority: 0.9 },
    { path: "/sell", priority: 0.9 },
    { path: "/selling-without-an-agent-el-cerrito", priority: 0.8 },
    { path: "/home-valuation", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/calculator", priority: 0.6 },
    { path: "/first-time-home-buyer", priority: 0.9 },
    { path: PTK_BASE, lastmod: PTK.meta.lastReviewed, priority: 0.9 },
    { path: `${PTK_BASE}/documents`, lastmod: PTK.meta.lastReviewed, priority: 0.6 },
    { path: "/neighborhoods", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/privacy", priority: 0.1, noSitemap: true },
    { path: "/terms", priority: 0.1, noSitemap: true },
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
    const path = `/neighborhoods/${hood.slug}`;
    // Skip stubs that 301 to a richer /cities/* or /buying-in-* page.
    if (REDIRECT_SOURCES.has(path)) continue;
    routes.push({ path, priority: 0.6 });
  }
  for (const city of cities) {
    routes.push({ path: `/cities/${city.slug}`, priority: 0.8 });
  }
  for (const slug of CITY_ORDER) {
    routes.push({ path: `/buying-in-${slug}`, priority: 0.9 });
  }
  for (const st of PTK.steps) {
    routes.push({ path: `${PTK_BASE}/${st.slug}`, lastmod: PTK.meta.lastReviewed, priority: 0.6 });
  }
  for (const d of PTK.documents) {
    routes.push({ path: `${PTK_BASE}/documents/${d.slug}`, lastmod: PTK.meta.lastReviewed, priority: 0.5 });
  }
  // Anything that 301s elsewhere is never prerendered or listed.
  return routes.filter((r) => !REDIRECT_SOURCES.has(r.path));
}
