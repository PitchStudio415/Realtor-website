# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: first-time home buyers and people relocating to the East Bay, focused on Berkeley, Oakland (Rockridge, Temescal, the Oakland Hills), Albany, and El Cerrito. They are early in the process, nervous about bidding wars and older housing stock, and want someone to explain how buying here actually works.

Secondary: homeowners in the same cities thinking about selling.

The visitor's job on the site: understand the local market and the process well enough to trust Muzamil, then text, call, or book a call.

## Product Purpose

Lead-generation site for Muzamil Khan, a Realtor with Rise Group (DRE #02400805), based in El Cerrito. Success is a qualified buyer (or seller) reaching out by phone, text, form, or a booked 30-minute call.

## Positioning

- 15 years in construction before real estate: reads the house, the inspection report, and real repair costs, and negotiates from them.
- Local and data-backed: lives in El Cerrito (10+ years); publishes one-page city playbooks with real MLS numbers (Berkeley, Oakland, Albany, El Cerrito).
- Honest, plain-English, no pressure.
- Wins competitive offers through strategy, not just price ("the best price may not always win; strategizing is key").
- Works with fewer clients at a time so current clients get full attention.

## Operating Context

- Hosted on Replit; React + Vite SPA, prerendered; deploy flow documented in the owner's notes (path-only checkout, never Sync).
- Content: 18 blog posts (client/src/lib/content.ts), buyer guides per city, buyer/seller lesson modules, four static buyer playbooks under client/public/<city>-buyer-playbook/.
- Leads go to Follow Up Boss; calendar booking via Calendly (30-minute call).
- Instagram (@muzamilkhan.realtor) drives traffic to playbook pages.

## Capabilities and Constraints

- Navigation was confirmed (Oct 2026) as five sections: Buy, Sell, Neighborhoods, Blog, About, plus Contact.
- One page per city (Berkeley, Oakland, Albany, El Cerrito) combining stats, playbook, guide, and related posts; nearby West Contra Costa cities secondary (Richmond, Kensington, Pinole, Hercules, San Pablo, El Sobrante).
- Far-off cities (Walnut Creek, Concord, Pleasant Hill, Fremont, Hayward, Alameda) are removed and redirected.
- Reviews live under About; Testimonials leaves the top menu.
- Blog grouping confirmed: "Start here" essentials, then posts by city, then remaining buying and selling posts.
- Old URLs must 301-redirect so links and rankings carry over.
- Light theme; dark-mode toggle removed.

## Brand Commitments

- Name: Muzamil Khan Real Estate; credit line "Muzamil Khan | Rise Group", DRE #02400805, (415) 819-8312, Muzamil@risegroup.com.
- Must use Muzamil's real professional photos (no stock imagery).
- Colors and typeface are not locked (as of Oct 19 2026); the owner wants simple but modern. Plain white minimalism with hairlines was rejected as too bland.
- Voice: plain, active, human; no em dashes; no AI tells.

## Evidence on Hand

- Reviews: Karen & Dave (Benicia, Aug 2026), Jimmy Moore (relocation, Jul 2026), Timothy (South San Francisco, Mar 2026), Tenisi Elena (Pittsburg, Feb 2026); 5.0 on Google and Zillow.
- Client video stories: client/public/videos/client-story-*.mp4.
- MLS stats (detached, last 12 months): Berkeley $1.64M / 128% / 14 days / 84% over asking (593 sales); Oakland pockets $1.5M / 123% / 14 days / 86% (386); Albany $1.40M / 125% / 13 days / 73% (90); El Cerrito $1.18M / 115% / 14 days / 86% (175).
- Photos: attached_assets/brand/ and client/public/ (muzamil-khan.jpg and others).
- Do not fabricate stats, reviews, client counts, or sales volume.

## Product Principles

1. Lead with the buyer's real question (how do I win here, and what will this house cost me), not with self-promotion.
2. Every page has one obvious next step: text, call, or book.
3. One home per topic: a city, a guide, or a post lives in exactly one place.
4. Real numbers and real people only.
