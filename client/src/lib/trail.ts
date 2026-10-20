// Shared content for the Trail Map redesign (Oct 2026): the four core cities,
// reviews, and the "Start here" essentials. City numbers and offer guidance come
// from the one-page buyer playbooks (MLS, detached single-family, last 12 months).

export type CitySlug = "el-cerrito" | "albany" | "oakland" | "berkeley";

export interface CityTerm {
  title: string;
  body: string;
  link?: { label: string; href: string };
}

export interface TrailCity {
  slug: CitySlug;
  name: string;
  /** CSS custom property holding the city's trail color. */
  color: string;
  /** Hex of the same color, for SVG fills. */
  hex: string;
  median: string;
  saleToList: string;
  daysOnMarket: string;
  overAsking: string;
  sales: number;
  /** Scope line under the stats. */
  scope: string;
  /** One-line description for cards. */
  note: string;
  lede: string;
  overListLine: string;
  offerIntro?: string;
  offer: CityTerm[];
  taxes: CityTerm[];
  playbookUrl: string;
  metaTitle: string;
  metaDescription: string;
  /** Blog posts about this city, newest first. */
  posts: string[];
}

const TRANSFER_TABLE = { label: "Transfer tax rate table", href: "https://chicagotitleconnection.com/transfertax.htm" };

const SEWER = (ebmud: boolean): CityTerm => ({
  title: "Sewer lateral",
  body: ebmud
    ? "The private sewer lateral needs an EBMUD compliance certificate at sale, usually $6,500 to $10,000 if work is needed. We settle who pays up front."
    : "The private sewer lateral must be certified compliant at sale, usually $6,500 to $10,000 if work is needed. We settle who pays up front.",
});

const WAIVE_OFFER: CityTerm[] = [
  { title: "Waive inspection", body: "You read the seller's reports already. No surprises." },
  { title: "Waive appraisal", body: "If it appraises low, you cover the gap in cash. Rare, but know that number before you write." },
  { title: "Loan contingency", body: "Keeping it is safer. Releasing it is stronger. Release only once fully underwritten." },
  { title: "Close in 14 to 17 days", body: "We can go up to 21 if we need to. A clean, quick close often beats a few thousand dollars." },
];

const PROTECTED_OFFER = (inspectionDays: string): CityTerm[] => [
  { title: "Short inspection", body: `Keep it, but short: ${inspectionDays} is common here. Waiving is an option on the most competitive homes.` },
  { title: "Appraisal, 14 days", body: "Often kept. If it appraises low, you can renegotiate or cover the gap in cash." },
  { title: "Loan, 14 days", body: "Often kept. Release once you are fully underwritten." },
  { title: "Close in 14 to 21 days", body: "A clean, on-time close still makes your offer stronger." },
];

export const CITIES: Record<CitySlug, TrailCity> = {
  "el-cerrito": {
    slug: "el-cerrito",
    name: "El Cerrito",
    color: "var(--elcerrito)",
    hex: "#a86d0e",
    median: "$1.18M",
    saleToList: "115%",
    daysOnMarket: "14 days",
    overAsking: "86%",
    sales: 175,
    scope: "All El Cerrito neighborhoods, detached single-family homes, last 12 months",
    note: "Hillside views, BART on both ends, and the most room to negotiate of the four.",
    lede: "From the flats to the hills, homes here move fast and sell over asking. Here is where the market stands and how to write the offer that gets picked.",
    overListLine: "Homes list low on purpose. The typical home sold 15% over list, and the highest number still loses if it misses the seller's terms.",
    offerIntro: "Buyers here are more protected than in Berkeley. You can usually keep your contingencies, just on shorter timelines.",
    offer: PROTECTED_OFFER("7 to 10 days"),
    taxes: [
      { title: "City transfer tax", body: "1.2%, split between buyer and seller. Contra Costa County's 0.11% is paid by the seller.", link: TRANSFER_TABLE },
      { title: "Property tax", body: "A 1% base plus local assessments and bonds. Prorated at closing. We confirm the exact figure before you offer." },
      SEWER(true),
    ],
    playbookUrl: "/el-cerrito-buyer-playbook",
    metaTitle: "Buying a Home in El Cerrito: Prices, Offers & Taxes | Muzamil Khan",
    metaDescription:
      "Buying in El Cerrito: median $1.18M, 86% sold over asking. How listings move, what a winning offer looks like, transfer tax and sewer lateral rules, from a local Realtor.",
    posts: ["living-in-el-cerrito-local-guide", "el-cerrito-buyer-window-2026", "el-cerrito-vs-richmond-vs-hercules-where-to-buy-2026"],
  },
  albany: {
    slug: "albany",
    name: "Albany",
    color: "var(--albany)",
    hex: "#7d4aa8",
    median: "$1.40M",
    saleToList: "125%",
    daysOnMarket: "13 days",
    overAsking: "73%",
    sales: 90,
    scope: "All Albany neighborhoods, detached single-family homes, last 12 months",
    note: "One square mile, top-rated schools, and very few homes for sale at any time.",
    lede: "Albany is one square mile, and homes here move fast and sell over asking. Here is where the market stands and how to write the offer that gets picked.",
    overListLine: "Homes list low on purpose. The typical home sold 25% over list, and the highest number still loses if it misses the seller's terms.",
    offerIntro: "Buyers here are more protected than in Berkeley. You can usually keep your contingencies, just on shorter timelines.",
    offer: PROTECTED_OFFER("7 days"),
    taxes: [
      { title: "City transfer tax", body: "1.5%, split between buyer and seller. The county's 0.11% is paid by the seller.", link: TRANSFER_TABLE },
      { title: "Property tax", body: "A 1% base plus local parcel taxes and bonds, which add up in Albany. Prorated at closing. We confirm the exact figure before you offer." },
      SEWER(true),
    ],
    playbookUrl: "/albany-buyer-playbook",
    metaTitle: "Buying a Home in Albany, CA: Prices, Offers & Taxes | Muzamil Khan",
    metaDescription:
      "Buying in Albany: median $1.40M, 73% sold over asking. How listings move, what a winning offer looks like, transfer tax and sewer lateral rules, from a local Realtor.",
    posts: ["albany-neighborhood-guide"],
  },
  oakland: {
    slug: "oakland",
    name: "Oakland",
    color: "var(--oakland)",
    hex: "#2c7a4f",
    median: "$1.50M",
    saleToList: "123%",
    daysOnMarket: "14 days",
    overAsking: "86%",
    sales: 386,
    scope: "Rockridge, Temescal & the Oakland Hills, detached single-family homes, last 12 months",
    note: "Rockridge, Temescal, and the Oakland Hills: walkable pockets and view homes, priced block by block.",
    lede: "In Rockridge, Temescal, and the Oakland Hills, homes move fast and sell over asking. Here is where the market stands and how to write the offer that gets picked.",
    overListLine: "Homes list low on purpose. The typical home sold 23% over list, and the highest number still loses if it misses the seller's terms.",
    offer: WAIVE_OFFER,
    taxes: [
      { title: "City transfer tax", body: "1% up to $300K, 1.5% to $2M, 1.75% to $5M, 2.5% above, split between buyer and seller. The county's 0.11% is paid by the seller.", link: TRANSFER_TABLE },
      { title: "Property tax", body: "Plan for about 1.2% to 1.4% of the price per year, including local assessments. Prorated at closing." },
      { title: "Fire zone and insurance", body: "Many hills homes sit in a state Very High Fire Hazard Severity Zone, and the disclosure report will say so. Get an insurance quote before you write." },
      SEWER(false),
    ],
    playbookUrl: "/oakland-buyer-playbook",
    metaTitle: "Buying a Home in Oakland: Rockridge, Temescal & the Hills | Muzamil Khan",
    metaDescription:
      "Buying in Rockridge, Temescal or the Oakland Hills: median $1.50M, 86% sold over asking. How listings move, winning offers, transfer tax tiers and fire-zone insurance.",
    posts: ["oakland-neighborhood-guide"],
  },
  berkeley: {
    slug: "berkeley",
    name: "Berkeley",
    color: "var(--berkeley)",
    hex: "#2b5fb8",
    median: "$1.64M",
    saleToList: "128%",
    daysOnMarket: "14 days",
    overAsking: "84%",
    sales: 593,
    scope: "All Berkeley neighborhoods, detached single-family homes, last 12 months",
    note: "A dozen neighborhoods from the flats to the hills, and the most competitive market of the four.",
    lede: "From the flats to the hills, homes here move fast and sell over asking. Here is where the market stands and how to write the offer that gets picked.",
    overListLine: "Homes list low on purpose. The typical home sold 28% over list, and the highest number still loses if it misses the seller's terms.",
    offer: WAIVE_OFFER,
    taxes: [
      { title: "City transfer tax", body: "1.5% up to $1.7M, 2.5% above, split between buyer and seller. The county's 0.11% is paid by the seller.", link: TRANSFER_TABLE },
      { title: "Property tax", body: "Plan for about 1.2% to 1.4% of the price per year, including local assessments." },
      { title: "Energy rule (BESO)", body: "Required energy assessment at sale. You see the score and upgrades before you close.", link: { label: "berkeleyca.gov/BESO", href: "https://berkeleyca.gov/BESO" } },
      SEWER(false),
    ],
    playbookUrl: "/berkeley-buyer-playbook",
    metaTitle: "Buying a Home in Berkeley: Prices, Offers & Taxes | Muzamil Khan",
    metaDescription:
      "Buying in Berkeley: median $1.64M, 84% sold over asking. How listings move, what a winning offer looks like, transfer tax, BESO and sewer lateral rules, from a local Realtor.",
    posts: ["berkeley-neighborhood-guide", "el-cerrito-buyer-window-2026", "east-bay-market-update-spring-2026"],
  },
};

/** West to east, cheapest to priciest: the order of the elevation profile. */
export const CITY_ORDER: CitySlug[] = ["el-cerrito", "albany", "oakland", "berkeley"];
/** Display order on the Neighborhoods page. */
export const CITY_CARD_ORDER: CitySlug[] = ["berkeley", "oakland", "albany", "el-cerrito"];

export const cityPath = (slug: CitySlug) => `/buying-in-${slug}`;

export const NEARBY = [
  { name: "Richmond", href: "/cities/richmond" },
  { name: "Kensington", href: "/neighborhoods/kensington" },
  { name: "Pinole", href: "/cities/pinole" },
  { name: "Hercules", href: "/cities/hercules" },
  { name: "San Pablo", href: "/cities/san-pablo" },
  { name: "El Sobrante", href: "/cities/el-sobrante" },
];

export const PHONE = "(415) 819-8312";
export const SMS = "sms:+14158198312";
export const TEL = "tel:+14158198312";
export const EMAIL = "Muzamil@risegroup.com";
export const CALENDLY = "https://calendly.com/muzamil-risegroup/30min";
export const GOOGLE_URL = "https://www.google.com/maps?cid=4248271409235072484";
export const ZILLOW_URL = "https://www.zillow.com/profile/muzamil7";
export const INSTAGRAM_URL = "https://www.instagram.com/muzamilkhan.realtor";

export const START_HERE: { topic: string; slug: string }[] = [
  { topic: "Budget", slug: "down-payment-help-east-bay-first-time-buyers" },
  { topic: "The house", slug: "what-i-check-older-east-bay-home-first-time-buyer" },
  { topic: "The offer", slug: "first-home-offer-mistakes" },
];

export interface Review {
  quote: string;
  short: string;
  name: string;
  meta: string;
}

export const REVIEWS: Review[] = [
  {
    quote:
      "Muzamil did an outstanding job getting us the home of our dreams. He was able to negotiate a price that saved us from a bidding war which saved us thousands.",
    short: "He was able to negotiate a price that saved us from a bidding war, which saved us thousands.",
    name: "Karen & Dave",
    meta: "Benicia, August 2026",
  },
  {
    quote:
      "Muzamil helped me find my perfect home from three time zones away. He arranged an entire weekend of tours and guided me through an especially tricky closing.",
    short: "Muzamil helped me find my perfect home from three time zones away.",
    name: "Jimmy Moore",
    meta: "Relocated to the Bay Area, July 2026",
  },
  {
    quote:
      "Muzamil went above and beyond by making multiple trips to meet and coordinate with contractors on our behalf when we weren't able to be there.",
    short: "He went above and beyond, coordinating contractors on our behalf.",
    name: "Timothy",
    meta: "South San Francisco, March 2026",
  },
  {
    quote: "He walked us through the process from start to finish in a way that felt smooth and manageable.",
    short: "He walked us through the process from start to finish.",
    name: "Tenisi Elena",
    meta: "Pittsburg, February 2026",
  },
];

export const STORIES = [
  { src: "/videos/client-story-durham.mp4", poster: "/videos/client-story-durham-poster.jpg", title: "Karen and Dave, Benicia" },
  { src: "/videos/client-story-camelia.mp4", poster: "/videos/client-story-camelia-poster.jpg", title: "Sold in Berkeley" },
  { src: "/videos/client-story-warren.mp4", poster: "/videos/client-story-warren-poster.jpg", title: "Welcome home, Pittsburg" },
];
