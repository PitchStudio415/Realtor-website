# CMA Tool - Project Brief

**Goal:** Drop in any address *or* paste a listing URL (Zillow, Redfin, Realtor.com) and get a buyer-facing CMA PDF and an internal showing-prep one-pager from MLS data. Same data model, two views, toggle between them.

**Owner:** Muzamil Khan, Realtor®, Rise Group, DRE# 02400805
**Hosting:** cma.muzamilkhanrealtor.com (Replit, password-protected)
**Passcode:** Mainman909!!
**Brief date:** 4/18/2026

---

## Architecture

Single Node + Express app on Replit. Web form and CLI both feed the same backend pipeline:

```
Address OR Listing URL input
  → URL parser (if URL: extract address + MLS# from slug — no scraping)
  → Geocode
  → MLS adapter (subject + comps)
  → Comp engine (filters, scoring)
  → Renderer (Internal one-pager OR Buyer CMA)
  → PDF output via Puppeteer
```

**Key design choice:** MLS-only data source for v1. No ATTOM, no PropStream, no BatchSkipTracing. The tool serves CMA generation on listed and recently-sold properties, which MLS covers fully. Off-market analysis (owner of record, equity, skip-traced contact) is a separate workflow and would be a v2 module if ever needed (~$100/mo PropStream + $0.20-0.50 per BatchSkip lookup).

**URL input design choice:** The URL parser reads the URL string only. It does not fetch, scrape, or hit Zillow/Redfin/Realtor servers. The address is extracted from the URL slug (e.g., `/1234-Spruce-St-Berkeley-CA-94702/`), and the MLS# is pulled from the URL when present. From there, the pipeline is identical to an address input — everything resolves through bridgeMLS, which remains the only data source. No ToS exposure.

The MLS adapter is isolated so it can be swapped:

```
/cma-tool
  /adapters
    mls-mock.js        ← starts here
    mls-bridge.js      ← swapped in once Bridge access is approved
    url-parser.js      ← parses Zillow / Redfin / Realtor URLs into {address, mlsNumber?}
    geocode.js
  /core
    comp-engine.js
    data-model.js
  /renderers
    internal-pdf.js
    buyer-pdf.js
    html-preview.js
  /interfaces
    web/
    cli/
  /integrations
    hubspot.js         ← stubbed, off by default
```

---

## URL parser spec

Supports three sources. Detects by domain, extracts address from the URL path, and captures MLS# when available in the URL or query string. No page fetches.

| Source | URL pattern | What's extractable |
|---|---|---|
| Zillow | `zillow.com/homedetails/{address-slug}/{zpid}_zpid/` | Address slug → street, city, state, zip |
| Redfin | `redfin.com/{ST}/{City}/{address-slug}-{zip}/home/{listing-id}` | Address slug + Redfin listing ID |
| Realtor.com | `realtor.com/realestateandhomes-detail/{address-slug}_{City}_{ST}_{zip}_{internal-id}` | Address slug + realtor.com internal ID |

Flow:

1. Detect source from hostname.
2. Regex the address slug out of the path.
3. Normalize: `1234-Spruce-St-Berkeley-CA-94702` → `{street: "1234 Spruce St", city: "Berkeley", state: "CA", zip: "94702"}`.
4. If MLS# is present in the URL (some Redfin/Realtor links), attach it.
5. Hand the normalized object to the existing pipeline. If MLS# present, skip geocode and do direct MLS lookup. Otherwise geocode → MLS adapter by address.

**Fallback:** If the URL is malformed, comes from an unsupported source, or the MLS lookup returns nothing (off-market, pocket listing, outside bridgeMLS territory, rental), surface a clear "couldn't resolve this link — enter address manually?" state. Do not fail silently.

---

## Two parallel tracks

### Track 1: MLS access (slow, blocking, ~3-6 weeks)

**Step 1 - Broker of Record at Rise Group.** Rise Group's BoR has to authorize a Bridge Interactive feed under the brokerage account. Get verbal yes first, then formal sign-off when bridgeMLS sends paperwork. Walnut Creek office (590 Ygnacio Valley Rd #102) should know who the BoR is.

**Step 2 - bridgeMLS data department.**
- Phone: 925.363.2333
- Email: info@bridgemls.com
- Office: 2855 Telegraph Ave #600, Berkeley CA 94705

Specifically request the **Internal Use / Back-Office feed** type, not IDX (public-facing, strips agent-only fields) or VOW (consumer-registered, partially gated). Use the field list below to signal you know what you're asking for.

**Step 3 - Bridge Interactive account.** Once approved, set up at bridgedataoutput.com to get dataset_id and API credentials.

**Fallback path:** If bridgeMLS approval drags past 4 weeks, evaluate Repliers.io or Spark API (FBS). These resellers handle the bridgeMLS compliance layer. ~$50-200/mo, days instead of weeks.

### Track 2: Build with mock data (start immediately)

Scaffold the entire pipeline against a mock MLS adapter that mirrors real RESO field structure. When bridgeMLS access lands, swap one file (`mls-mock.js` → `mls-bridge.js`) and ship.

---

## RESO field mapping (use when talking to bridgeMLS)

| Wishlist field | RESO field name |
|---|---|
| Property images | Media collection (MediaURL, Order, MediaCategory) |
| Days on market | DaysOnMarket, CumulativeDaysOnMarket |
| Square footage | LivingArea |
| $/sqft | Calculated: ListPrice / LivingArea |
| Beds, baths | BedroomsTotal, BathroomsTotalInteger |
| Year built | YearBuilt |
| Lot size | LotSizeSquareFeet |
| HOA | AssociationFee, AssociationFeeFrequency |
| Public overview | PublicRemarks |
| Confidential remarks | PrivateRemarks (agent-gated) |
| Vacant or occupied | OccupantType (Owner / Tenant / Vacant / CallAgent) |
| Open houses | OpenHouse resource (OpenHouseDate, StartTime, EndTime, Type) |
| Listing agent contact | ListAgentFullName, ListAgentDirectPhone, ListAgentMobilePhone, ListAgentEmail |
| Listing brokerage | ListOfficeName, ListOfficePhone |

**Two soft spots:** Disclosure links (Glide, Disclosures.io) and ShowingTime/BrokerBay deep links are not standardized fields. Both typically appear inside `PrivateRemarks` or `ShowingInstructions` text. Tool will regex out URLs and detect known service domains.

---

## Internal one-pager spec

Layout (8.5x11 PDF + responsive web view):

- Top bar: View toggle (Internal | Buyer CMA), brand mark
- Header: Address + status badge (left), price (right), MLS#/beds/baths/year subline
- Metrics row: Sq ft, $/sq ft, DOM, Lot sq ft, Year built, HOA (HOA only renders when populated)
- Two columns: Hero image + 4 thumbnails (left, 1+4 grid), Listing agent contact card (right, tappable phone/email)
- Status flags: Occupancy state, open house dates
- Action buttons: Schedule showing, Disclosure package (Glide)
- Overview block (PublicRemarks)
- Confidential block (subdued gray, "agent only" label, contains PrivateRemarks)
- Footer: Pull timestamp + URL (left), identity block (right)

Footer identity block:
```
Muzamil Khan, Realtor® · DRE# 02400805
Rise Group · 590 Ygnacio Valley Rd #102, Walnut Creek CA
M 415-819-8312 · muzamil@risegroup.com
```

---

## Buyer CMA spec

Match the layout of `6785-Inyo-CMA.pdf` (Rise Group format):

- Subject property hero panel with list price, sq ft, $/sqft, status, DOM, suggested value range, pricing read commentary
- Active comparables table (ranked by size, subject inline)
- Sold comparables table (size-matched, last 6 months)
- "What the comps tell us" + "Strategic recommendations" two-column commentary
- Standard footer disclaimer (broker price opinion, not USPAP, data deemed reliable but not guaranteed)

Same data pull as Internal view. Renderer branches on view selection.

---

## Comp engine defaults

- Sqft band: ±20% of subject
- Radius: 0.5 miles
- Property type: same as subject
- Lookback: 6 months for sold, current for active
- Manual override knobs available in UI

---

## Build plan, week of 4/20

- [ ] Repo scaffold on Replit
- [ ] Mock MLS adapter with 5 sample East Bay properties (full field set including PrivateRemarks, OccupantType, OpenHouse, Media)
- [ ] URL parser module (Zillow, Redfin, Realtor.com — URL string only, no fetching)
- [ ] Unified input handler: accepts address string OR listing URL, routes accordingly
- [ ] Comp engine with default filters
- [ ] Internal one-pager renderer (matches approved v2 mockup)
- [ ] Buyer CMA renderer (matches Inyo layout)
- [ ] CLI command: `cma "1234 Spruce St, Berkeley CA"` OR `cma "https://www.zillow.com/..."` outputs both PDFs
- [ ] Web form at cma.muzamilkhanrealtor.com behind passcode — single input field accepts address or URL
- [ ] View toggle wired up

**Target:** working tool with mock data by end of day Sunday 4/19.

---

## Drafted outreach (ready to send Monday 4/20)

### To Broker of Record at Rise Group

**Subject:** Quick approval needed - data feed for internal CMA tool

Hi [BoR name],

I'm building an internal CMA tool for my own pipeline work and want to request a Bridge Interactive data feed (the Zillow-owned platform bridgeMLS uses for API access). The feed has to be requested under the brokerage account with your authorization.

A few notes to make this easy:
- Internal use only. No consumer-facing display, no syndication, no public IDX site.
- Zero cost to Rise Group. Bridge Interactive is free to MLS members.
- The output is a private one-pager I generate for myself when prepping showings and CMAs. Same data I already pull manually from connectMLS, just faster.
- I'll handle all the bridgeMLS paperwork. Just need your written sign-off as Broker of Record.

Can you reply with a yes (or any concerns) so I can move forward with bridgeMLS this week?

Thanks,
Muzamil

### To bridgeMLS (send after BoR yes)

**Subject:** Data feed application - internal use, agent productivity tool

Hi,

I'm a bridgeMLS subscriber and I'd like to request the data feed application packet for a Bridge Interactive feed.

Use case: internal agent productivity tool for CMA generation and showing prep. No consumer-facing display, no syndication, no IDX, no public website.

Feed type: Internal Use / Back-Office. I specifically need access to the following agent-only fields, which I understand are not available in IDX or VOW feeds:

- PrivateRemarks
- ShowingInstructions, ShowingContactPhone, ShowingContactType
- OccupantType
- ListAgentDirectPhone, ListAgentMobilePhone, ListAgentEmail
- Documents resource (for disclosure attachments)
- Media collection (property photos)
- Standard listing and sold data, last 6 months minimum

My Broker of Record at Rise Group is aware and ready to authorize. Can you send the application packet, the data license agreement, and any setup fees I should expect?

Thanks,

Muzamil Khan, Realtor®
Rise Group
DRE# 02400805
M: 415-819-8312
E: muzamil@risegroup.com

---

## Status as of 4/18/2026

- [x] Architecture decided (MLS-only, mock-first build)
- [x] Internal one-pager design approved (v2 mockup)
- [x] Buyer CMA format set (Inyo layout)
- [x] Hosting confirmed (Replit, cma.muzamilkhanrealtor.com)
- [x] Passcode set
- [x] BoR + bridgeMLS messages drafted
- [x] URL input feature scoped (Zillow/Redfin/Realtor, parse-only, no scraping)
- [ ] Identify Rise Group BoR by name
- [ ] Send BoR message Monday 4/20
- [ ] Scaffold repo with mock data + URL parser (target: Sunday 4/19)
- [ ] BoR sign-off
- [ ] Send bridgeMLS application
- [ ] Bridge Interactive account creation
- [ ] Live MLS swap-in once credentials approved
