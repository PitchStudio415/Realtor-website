import type { BlogPost, EducationModule, Neighborhood } from "@shared/schema";

export const blogPosts: BlogPost[] = [
  {
    slug: "first-home-offer-mistakes",
    title: "5 Offer Mistakes First-Time Buyers Make in the Bay Area",
    excerpt: "Learn how to avoid common pitfalls when writing your first offer in a competitive market.",
    category: "first-time-buyers",
    publishedAt: "2025-01-10",
    content: `
# 5 Offer Mistakes First-Time Buyers Make in the Bay Area

The Bay Area housing market moves fast, and first-time buyers often feel pressure to act quickly. Here are the most common mistakes I see—and how to avoid them.

## 1. Not Getting Pre-Approved First

A pre-qualification letter isn't the same as pre-approval. Sellers want to see you've been thoroughly vetted by a lender. Get your pre-approval done before you start touring homes seriously.

## 2. Waiving Contingencies Without Understanding Them

In competitive situations, buyers sometimes waive inspection or appraisal contingencies. Before doing this, understand what you're giving up and the risks involved.

## 3. Ignoring the Seller's Timeline

Sometimes a higher offer loses to a lower one because the seller needed a specific closing date. Ask your agent about the seller's needs.

## 4. Being Inflexible on Small Terms

Things like a rent-back period or including the refrigerator might matter more to the seller than a few thousand dollars. Be strategic about what you negotiate.

## 5. Writing a Price You Can't Actually Afford

Overbidding is common here, but make sure you can actually afford what you offer—especially if the appraisal comes in low.
    `,
  },
  {
    slug: "pre-approval-explained",
    title: "How Mortgage Pre-Approval Actually Works",
    excerpt: "A clear breakdown of the pre-approval process and what lenders look at.",
    category: "financing",
    publishedAt: "2025-01-05",
    content: `
# How Mortgage Pre-Approval Actually Works

Getting pre-approved for a mortgage is one of the first steps in your home buying journey. Here's what actually happens.

## What Lenders Look At

- **Credit Score**: Most conventional loans need 620+, but 740+ gets the best rates
- **Debt-to-Income Ratio**: Your monthly debt payments divided by gross income, ideally under 43%
- **Down Payment**: How much cash you can bring to close
- **Employment History**: Typically 2+ years of stable income
- **Assets**: Bank statements showing reserves

## Pre-Qualification vs Pre-Approval

**Pre-qualification** is a quick estimate based on self-reported info. It's not verified.

**Pre-approval** means the lender has actually checked your credit, income, and assets. This is what sellers want to see.

## The Process

1. Gather documents (W-2s, tax returns, bank statements, pay stubs)
2. Apply with a lender
3. They pull your credit and verify everything
4. You get a pre-approval letter valid for 60-90 days

## Tips

- Don't make major purchases or open new credit before closing
- Rate shop within a 14-day window to minimize credit impacts
- Ask about different loan programs (FHA, conventional, jumbo)
    `,
  },
  {
    slug: "bay-area-closing-costs",
    title: "What Closing Costs Actually Look Like in the Bay Area",
    excerpt: "A realistic breakdown of buyer and seller closing costs with example numbers.",
    category: "first-time-buyers",
    publishedAt: "2025-01-01",
    content: `
# What Closing Costs Actually Look Like in the Bay Area

Closing costs can catch first-time buyers off guard. Here's what to expect across the East Bay: El Cerrito, Albany, Berkeley, Oakland, Richmond, and beyond.

## Buyer Closing Costs (Typical Range)

On a $900,000 home, expect roughly $18,000-$27,000 in closing costs (2-3% of purchase price).

### Breakdown:
- **Loan origination fee**: 0.5-1% of loan amount
- **Appraisal**: $600-$900
- **Title insurance**: $1,500-$2,500
- **Escrow fees**: $1,500-$2,000
- **Recording fees**: $150-$300
- **Home inspection**: $400-$600
- **Prepaid property taxes**: Varies by timing
- **Prepaid homeowner's insurance**: $1,500-$3,000/year

## What's Negotiable

- Seller credits toward closing costs
- Lender credits (in exchange for higher rate)
- Some title company fees

## Tips

- Ask for a detailed loan estimate early
- Get quotes from multiple title companies
- Budget more than you think you'll need
    `,
  },
  {
    slug: "staging-worth-it",
    title: "Is Home Staging Actually Worth the Cost?",
    excerpt: "When staging makes sense and when it doesn't—a data-driven look.",
    category: "selling",
    publishedAt: "2024-12-20",
    content: `
# Is Home Staging Actually Worth the Cost?

Staging can cost anywhere from $2,000 to $10,000+ for a vacant Bay Area home. Is it worth it?

## The Data

Studies suggest staged homes sell 3-10% higher and faster than non-staged homes. On a $1M home, even a 3% difference is $30,000.

## When Staging Makes Sense

- **Vacant homes**: Empty rooms photograph poorly and feel cold
- **Dated homes**: Staging distracts from older finishes
- **Unusual layouts**: Furniture shows how to use the space
- **High-end properties**: Buyers expect it

## When You Can Skip It

- **Already nicely furnished**: Just declutter and deep clean
- **Hot markets**: When everything sells fast anyway
- **Very low price points**: The math doesn't work

## Virtual Staging

For vacant homes, virtual staging ($200-$500 per image) can help with online photos, though buyers will still see empty rooms in person.

## My Recommendation

Get a stager consultation first ($150-$300). They'll tell you what impact staging would have for your specific home.
    `,
  },
  {
    slug: "repairs-vs-credits",
    title: "Should You Make Repairs or Offer Credit to Buyers?",
    excerpt: "How to decide between fixing issues yourself or giving buyers money to handle them.",
    category: "selling",
    publishedAt: "2024-12-15",
    content: `
# Should You Make Repairs or Offer Credit to Buyers?

After a buyer's inspection, you'll likely face repair requests. Here's how to think about them.

## When to Make Repairs Yourself

- **Safety issues**: Electrical problems, gas leaks, structural concerns
- **Simple fixes**: A handyman can handle in a day
- **Things that scare buyers**: Active leaks, pest evidence
- **When the fix is cheaper than perceived value**: $500 repair that buyers think costs $2,000

## When to Offer Credit Instead

- **Buyer has strong preferences**: They want to choose the contractor
- **Cosmetic issues**: Paint, flooring, fixtures
- **Timing is tight**: Repairs might delay closing
- **Large projects**: Where quality matters and buyer wants control

## How Credits Work

A credit reduces what the buyer pays at closing. If they're buying at $900,000 with a $10,000 credit, they bring $10,000 less to closing.

## Negotiation Tips

- Get repair quotes before responding
- Credits often cost you less than worst-case buyer estimates
- Some lenders limit credit amounts (usually 3% of purchase price)
    `,
  },
  {
    slug: "home-inspection-findings",
    title: "Common Inspection Findings in East Bay Homes",
    excerpt: "What inspectors typically find in El Cerrito, Albany, Berkeley, Oakland, Richmond, and East Bay properties.",
    category: "inspections",
    publishedAt: "2024-12-10",
    content: `
# Common Inspection Findings in East Bay Homes

After years of attending inspections in the East Bay, I've seen patterns in what comes up. Here's what to expect.

## Older Homes (Pre-1970s)

- **Outdated electrical**: Knob and tube, ungrounded outlets, small panels
- **Original plumbing**: Galvanized pipes that may need replacement
- **Foundation issues**: Cracks, inadequate bolting to foundation
- **Single-pane windows**: Drafty and inefficient

## 1970s-1990s Homes

- **Polybutylene plumbing**: Gray plastic pipes prone to failure
- **Original roofs**: Most 30-year roofs are at end of life
- **Dated HVAC**: Inefficient systems needing replacement
- **Aluminum wiring**: Fire hazard requiring remediation

## All Eras

- **Drainage issues**: Poor grading, clogged gutters
- **Water heater problems**: Seismic strapping, age, leaks
- **Deferred maintenance**: Small issues that add up
- **Pest damage**: Termites are everywhere in California

## What's Normal

Every home has findings. The question is: are they routine maintenance or major concerns? An experienced agent helps you distinguish between the two.
    `,
  },
];

export const buyerModules: EducationModule[] = [
  {
    slug: "timeline",
    title: "Home Buying Timeline in California",
    description: "A step-by-step guide from starting your search to getting your keys.",
    hub: "buyer",
    order: 1,
    content: `
# Home Buying Timeline in California

A clear timeline helps you plan cash, timing, and decisions. This reflects a typical California transaction. Your path shifts based on price point and market heat.

## Phase 1: Preparation

**1 to 3 months before you shop**

- Pull your credit report. Fix errors. Lower balances.
- Set a target budget. Include down payment, closing costs, and reserves.
- Review neighborhoods with commute, schools, and lifestyle in mind.
- Interview agents. Pick one who explains strategy and tradeoffs clearly.

## Phase 2: Loan Pre-Approval

**1 to 2 weeks**

- Gather documents: pay stubs, W-2s, tax returns, bank statements.
- Apply with 2 or 3 lenders. Compare rate, fees, and responsiveness.
- Secure a written pre-approval sized to your comfort, not the max.

## Phase 3: Home Search

**Timing varies**

- Define non-negotiables versus preferences.
- Tour homes in person. Photos hide flaws.
- Track list price to sale price to learn leverage.
- Typical range runs from a few weeks to several months.

## Phase 4: Offer and Negotiation

- Set price, terms, and contingencies based on comps and demand.
- Submit the offer. Counter as needed.
- Reach mutual acceptance. The clock starts.

## Phase 5: Escrow

**30 to 45 days**

- Open escrow.
- Deposit earnest money, often around 3 percent of purchase price.
- Complete inspections early, usually within the first 7 to 17 days.
- Lender orders the appraisal.
- Finalize loan approval.
- Title and escrow clear outstanding items.

## Phase 6: Closing

- Complete the final walkthrough.
- Sign loan and escrow documents.
- Wire remaining funds.
- Deed records with the county.
- Keys released after recordation.
    `,
  },
  {
    slug: "offer-basics",
    title: "Offer Basics: Price, Credits, Contingencies",
    description: "Understanding the key components that make up your purchase offer.",
    hub: "buyer",
    order: 2,
    content: `
# Offer Basics: Price, Credits, Contingencies

Your offer is more than just a price. Here's what goes into it.

## Purchase Price

The amount you're offering to pay. In competitive markets, this often exceeds the list price.

## Earnest Money Deposit

Shows you're serious. Typically 3% of purchase price in the Bay Area, deposited within 3 days of acceptance.

## Contingencies

These are your "outs" if something goes wrong:

### Inspection Contingency (17 days typical)
Right to inspect and request repairs or cancel if findings are unacceptable.

### Appraisal Contingency
Protection if the home appraises for less than your offer price.

### Loan Contingency (21 days typical)
If your financing falls through, you can cancel without losing your deposit.

## Seller Credits

Asking the seller to pay some of your closing costs. This increases the effective price you're paying.

## Appraisal Gap Coverage

Promising to pay the difference if the appraisal comes in low, up to a certain amount.

## Other Terms

- Closing timeline
- Rent-back arrangements
- What's included (appliances, fixtures)
- Specific contingencies (sale of your current home)
    `,
  },
  {
    slug: "financing",
    title: "How Pre-Approval Works",
    description: "What lenders look at and how to prepare for mortgage approval.",
    hub: "buyer",
    order: 3,
    content: `
# How Pre-Approval Works

Pre-approval is essential before seriously shopping for homes. Sellers want to see you've been vetted by a lender before accepting your offer.

## What Lenders Evaluate

### Credit Score

- 620+ for conventional loans
- 580+ for FHA loans
- 740+ for best rates

### Debt-to-Income Ratio (DTI)

Your monthly debt payments divided by gross monthly income.

- Front-end DTI (housing only): Ideally under 28%
- Back-end DTI (all debt): Ideally under 43%

### Down Payment

- Conventional: 3-20%+
- FHA: 3.5%
- VA: 0%
- Jumbo (Bay Area loans over ~$1.15M): 10-20%+

### Employment & Income

- 2+ years of stable employment
- Tax returns, W-2s, pay stubs
- Self-employed: 2 years of tax returns showing stable income

### Assets

- Bank statements showing down payment plus reserves
- Gift letters if using family funds

## Pre-Qualification vs Pre-Approval

**Pre-qualification** is a quick estimate based on self-reported information. It is not verified.

**Pre-approval** means the lender has checked your credit, income, and assets. This is what sellers want to see.

## Tips

- Shop rates within a 14-day window to minimize credit impacts
- Don't open new credit or make large purchases before closing
- Have documents ready before applying
    `,
  },
  {
    slug: "closing-costs",
    title: "Closing Costs Breakdown",
    description: "What to budget for beyond your down payment.",
    hub: "buyer",
    order: 4,
    content: `
# Closing Costs Breakdown

Budget 2-3% of the purchase price for closing costs, in addition to your down payment.

## Lender Fees

- **Loan origination**: 0-1% of loan amount
- **Appraisal**: $600-$900
- **Credit report**: $30-$50
- **Underwriting fee**: $400-$600

## Title & Escrow

- **Title insurance (lender's policy)**: Required, ~$500-$1,000
- **Title insurance (owner's policy)**: Recommended, ~$1,000-$2,000
- **Escrow fee**: $1,500-$2,500
- **Recording fees**: $150-$300

## Prepaid Items

- **Property taxes**: Prorated for remainder of tax period
- **Homeowner's insurance**: First year paid at closing
- **Interest**: Prorated from closing to first payment

## Example: $900,000 Home

| Item | Estimated Cost |
|------|---------------|
| Loan origination (0.5%) | $3,600 |
| Appraisal | $750 |
| Title insurance | $2,500 |
| Escrow | $2,000 |
| Recording | $200 |
| Prepaid taxes (2 months) | $2,000 |
| Prepaid insurance | $2,000 |
| **Total** | **~$13,050** |

## Ways to Reduce

- Negotiate seller credits
- Take lender credit (higher rate, lower costs)
- Shop title companies
    `,
  },
  {
    slug: "inspections",
    title: "Inspections and Repair Negotiations",
    description: "What to expect from home inspections and how to handle findings.",
    hub: "buyer",
    order: 5,
    content: `
# Inspections and Repair Negotiations

The inspection contingency period is crucial for protecting yourself.

## Standard Inspections

### General Home Inspection ($400-$600)
Covers structure, roof, electrical, plumbing, HVAC, and more. Takes 2-3 hours.

### Pest Inspection ($100-$200)
Looks for termites, wood-boring beetles, dry rot, and fungus damage.

## Specialty Inspections (As Needed)

- **Sewer lateral**: Video inspection of pipes ($200-$300)
- **Chimney**: For homes with fireplaces ($150-$250)
- **Pool/Spa**: Complex systems need specialists ($150-$250)
- **Foundation**: If concerns arise ($300-$500)
- **Roof**: For older or concerning roofs ($200-$400)

## After the Inspection

### Option 1: Accept As-Is
Proceed with purchase, handling repairs yourself.

### Option 2: Request Repairs
Ask seller to fix specific items before closing.

### Option 3: Request Credit
Ask for money at closing to handle repairs yourself.

### Option 4: Cancel
If findings are too serious, exercise your contingency.

## Negotiation Strategy

- Focus on safety, structural, and expensive items
- Get repair estimates to support requests
- Be reasonable—minor issues are expected
- Consider seller's perspective and market conditions
    `,
  },
  {
    slug: "common-mistakes",
    title: "Common Mistakes and How to Avoid Them",
    description: "Learn from others' errors to have a smoother home buying experience.",
    hub: "buyer",
    order: 6,
    content: `
# Common Mistakes and How to Avoid Them

First-time buyers often make similar mistakes. Here's how to avoid them.

## Before You Start

### Mistake: Not checking credit early enough
**Fix**: Check credit 6+ months before buying. Address errors and pay down debt.

### Mistake: Not saving enough
**Fix**: Budget for down payment + 3% closing costs + 3 months reserves.

## During the Search

### Mistake: Falling in love with one home
**Fix**: Keep options open until you're in contract.

### Mistake: Skipping neighborhoods
**Fix**: Visit areas at different times (morning, evening, weekend).

### Mistake: Ignoring commute reality
**Fix**: Do a test commute during rush hour before making offers.

## Making Offers

### Mistake: Offering more than you can afford
**Fix**: Know your limits and stick to them, even in competitive situations.

### Mistake: Waiving contingencies without understanding
**Fix**: Discuss risks thoroughly with your agent before removing protections.

## In Escrow

### Mistake: Making major purchases
**Fix**: Don't buy cars, furniture, or open credit cards until after closing.

### Mistake: Changing jobs
**Fix**: Wait until after closing if possible. If not, tell your lender immediately.

### Mistake: Missing deadlines
**Fix**: Keep a calendar of all contingency dates. Your agent should track these too.

## At Closing

### Mistake: Not doing final walkthrough
**Fix**: Always walk through the day before or day of closing.

### Mistake: Forgetting utilities
**Fix**: Set up transfers for electricity, gas, water, internet before closing.
    `,
  },
  {
    slug: "glossary",
    title: "Real Estate Glossary",
    description: "Key terms every buyer should know.",
    hub: "buyer",
    order: 7,
    content: `
# Real Estate Glossary

Key terms every buyer should know.

**Appraisal**: Professional estimate of a property's market value, required by lenders.

**Assessed Value**: Value assigned by the county for property tax purposes.

**Buyer's Agent**: Real estate agent representing the buyer's interests.

**Closing**: The final step where ownership transfers and funds are exchanged.

**Closing Costs**: Fees paid at closing beyond the purchase price (typically 2-3% of loan).

**Comparable Sales (Comps)**: Recently sold similar properties used to estimate value.

**Contingency**: A condition that must be met for the sale to proceed.

**Conventional Loan**: Mortgage not backed by a government agency.

**Counter Offer**: Seller's response to a buyer's offer with different terms.

**Days on Market (DOM)**: How long a property has been listed for sale.

**Deed**: Legal document transferring property ownership.

**Down Payment**: Cash paid upfront toward the purchase price.

**Earnest Money Deposit (EMD)**: Good faith deposit showing buyer commitment (typically 3% in Bay Area).

**Escrow**: Neutral third party holding funds and documents during the transaction.

**FHA Loan**: Government-backed loan with lower down payment requirements.

**Fixed-Rate Mortgage**: Loan with an interest rate that stays the same.

**HOA (Homeowners Association)**: Organization managing common areas and enforcing community rules.

**Home Inspection**: Professional examination of a property's condition.

**Interest Rate**: The cost of borrowing money, expressed as a percentage.

**Jumbo Loan**: Loan exceeding conforming limits (currently ~$1.15M in Bay Area).

**Lien**: Legal claim against a property for unpaid debts.

**Listing Agent**: Real estate agent representing the seller.

**Loan Estimate**: Document showing loan terms, projected payments, and closing costs.

**Loan-to-Value (LTV)**: Loan amount divided by property value.

**MLS (Multiple Listing Service)**: Database where agents share property listings.

**Mortgage Insurance (PMI)**: Insurance required when down payment is less than 20%.

**Offer**: Formal proposal to purchase a property at a specific price and terms.

**Pre-Approval**: Lender's verified commitment to lend you a specific amount.

**Principal**: The loan amount borrowed, not including interest.

**Property Taxes**: Annual taxes based on assessed value, paid to the county.

**Rate Lock**: Agreement to hold an interest rate for a set period.

**Rent-Back**: Arrangement where seller stays in home after closing, paying rent.

**Title**: Legal ownership of a property.

**Title Insurance**: Protection against ownership disputes or claims on the property.

**Transfer Tax**: Tax paid when property ownership transfers (varies by city).

**Underwriting**: Lender's process of verifying your loan application.

**VA Loan**: Government-backed loan for veterans with no down payment required.

**Walkthrough**: Final inspection before closing to verify property condition.
    `,
  },
];

export const sellerModules: EducationModule[] = [
  {
    slug: "pricing",
    title: "Pricing Strategy and Comps Explained",
    description: "How to price your home strategically using market data.",
    hub: "seller",
    order: 1,
    content: `
# Pricing Strategy and Comps Explained

Pricing correctly is the most important decision you'll make when selling. Get it right, and you attract serious buyers quickly. Get it wrong, and your home sits on the market losing value.

## What Are Comps?

Comparable sales (called "comps") are recently sold homes similar to yours. They form the foundation of any pricing analysis.

**Good comps match your home in:**

- Location: same neighborhood, ideally same block
- Size: within 10-15% of square footage
- Bedrooms and bathrooms: similar count
- Lot size: comparable outdoor space
- Age and condition: similar updates and maintenance
- Sale date: within the last 3-6 months

## The Pricing Sweet Spot

**Price too high:** Fewer showings, stale listing perception, and eventually selling for less than market value.

**Price too low:** Multiple offers drive price up, creates urgency and competition, and may actually net more than pricing high.

**Price right:** Strong initial interest, quality offers quickly, and less time on market.

## Bay Area Pricing Tactics

In competitive markets, many sellers price 5-10% below expected value to encourage bidding wars. This strategy works when inventory is low, buyer demand is high, and your home shows well.

## My Approach

I analyze 10-15 comparable sales, consider active competition, and factor in current buyer demand. Then we discuss strategy based on your timeline and goals.
    `,
  },
  {
    slug: "disclosures",
    title: "Disclosures in California",
    description: "Understanding your disclosure obligations as a seller.",
    hub: "seller",
    order: 2,
    content: `
# Disclosures in California

California has extensive disclosure requirements. Here's what you need to know.

## Required Disclosures

### Transfer Disclosure Statement (TDS)
Your detailed knowledge of the property's condition—systems, repairs, problems.

### Seller Property Questionnaire (SPQ)
Additional questions about history, neighbors, legal issues.

### Natural Hazard Disclosure (NHD)
Third-party report on flood zones, fire zones, earthquake faults, etc.

### Lead-Based Paint Disclosure
Required for homes built before 1978.

## What to Disclose

**Rule of thumb**: If you know about it, disclose it.

This includes:
- Past repairs and why they were needed
- Insurance claims
- Deaths on the property (within 3 years)
- Neighborhood nuisances
- HOA issues
- Permit status of improvements
- Known defects, even if repaired

## What Happens If You Don't Disclose

- Buyer can rescind the contract during escrow
- Buyer can sue after closing
- Your agent could face liability too

## My Advice

Disclose everything. It protects you legally and builds trust with buyers. Most issues, properly disclosed, don't kill deals—surprises do.

**Note**: This is general information, not legal advice. Consult an attorney for specific situations.
    `,
  },
  {
    slug: "inspection-prep",
    title: "Inspection Prep Checklist",
    description: "Get your home ready for buyer inspections.",
    hub: "seller",
    order: 3,
    content: `
# Inspection Prep Checklist

A smooth inspection leads to smoother negotiations. Here's how to prepare.

## Before Listing

### Exterior
- [ ] Clear debris from roof and gutters
- [ ] Trim vegetation away from house
- [ ] Ensure proper drainage away from foundation
- [ ] Repair obvious damage (broken fence boards, cracked walkways)
- [ ] Check that all exterior outlets work

### Interior
- [ ] Replace burnt-out light bulbs
- [ ] Fix running toilets and dripping faucets
- [ ] Ensure all windows and doors operate properly
- [ ] Check smoke and CO detectors
- [ ] Clear access to electrical panel, water heater, HVAC

### Systems
- [ ] Replace HVAC filters
- [ ] Have HVAC serviced if older
- [ ] Flush water heater if sediment is an issue
- [ ] Test garage door safety reverse

## Day of Inspection

- [ ] Leave all utilities on
- [ ] Unlock gates, sheds, attic access
- [ ] Remove pets or confine them
- [ ] Leave keys for any locked areas
- [ ] Provide documentation for recent work (permits, warranties)

## Consider Pre-Listing Inspections

Having your own inspection done before listing:
- Identifies issues before buyers do
- Gives you time to make repairs
- Reduces negotiation surprises
- Shows buyers you're proactive
    `,
  },
  {
    slug: "repairs-vs-credits",
    title: "Repairs vs Credits Decision Guide",
    description: "When to fix issues yourself versus offering buyers credit.",
    hub: "seller",
    order: 4,
    content: `
# Repairs vs Credits Decision Guide

After a buyer's inspection, you'll negotiate repairs. Here's how to decide what to do.

## Make Repairs When:

### Safety Issues
- Electrical hazards
- Gas leaks
- Structural concerns
- Mold remediation

### Quick Fixes
- Items a handyman handles in a day
- Cost is known and predictable
- Quality won't be questioned

### High-Perception Items
- Active leaks (even small ones)
- Pest evidence
- Items that scare buyers more than they cost

## Offer Credit When:

### Buyer Preference Matters
- Flooring, paint, fixtures
- Buyer wants to choose contractor
- Buyer wants specific materials

### Timing Is Tight
- Repairs would delay closing
- Finding contractors is difficult

### Large Projects
- Major work where quality matters
- Buyer wants control over the process

## Credit Mechanics

Credits reduce buyer's closing costs, not purchase price. On a $900,000 sale with $10,000 credit, buyer brings $10,000 less to closing.

**Lender Limits**: Most lenders cap credits at 3-6% of purchase price.

## Negotiation Tips

- Get repair quotes before responding
- Credits often cost you less than buyer's worst-case estimates
- Consider the deal as a whole, not each item separately
    `,
  },
  {
    slug: "evaluating-offers",
    title: "How to Evaluate Offers Beyond Price",
    description: "Understanding what makes an offer strong beyond the dollar amount.",
    hub: "seller",
    order: 5,
    content: `
# How to Evaluate Offers Beyond Price

The highest offer isn't always the best offer. Here's what to consider.

## Price vs. Net Proceeds

Consider seller credits, repair requests, and other terms that affect what you actually receive.

## Buyer Qualification

### Strong Indicators
- Large down payment (20%+)
- Pre-approval from reputable local lender
- Proof of funds for down payment
- Stable employment

### Concerns
- Minimum down payment
- Pre-qualification (not approval)
- Out-of-area lender unfamiliar with local market

## Contingencies

### Fewer Contingencies = Stronger Offer
- No inspection contingency (buyer accepts as-is)
- No appraisal contingency (buyer covers gap)
- No loan contingency (cash offer or highly qualified)

### But Consider Risk
- Buyers waiving contingencies may back out later
- Verify they understand what they're giving up

## Timeline

### Your Needs
- When do you need to close?
- Do you need a rent-back period?
- Are you buying another home with tight timing?

### Buyer Flexibility
- Can they accommodate your ideal timeline?
- Are they flexible on possession date?

## Other Factors

- Escalation clauses (up to what amount?)
- As-is offers vs. repair expectations
- Personal letters (nice but shouldn't outweigh terms)
- Backup offers in case the first fails
    `,
  },
  {
    slug: "timeline",
    title: "Timeline from Listing to Close",
    description: "What to expect from preparing your home to handing over the keys.",
    hub: "seller",
    order: 6,
    content: `
# Timeline from Listing to Close

Here's a typical timeline for selling a home in the Bay Area.

## Pre-Listing (2-4 weeks)

### Week 1-2
- Meet with agent, discuss strategy
- Get preliminary market analysis
- Decide on pricing approach
- Order pre-listing inspection (optional)

### Week 3-4
- Declutter and deep clean
- Make repairs and improvements
- Stage the home
- Take professional photos
- Write listing description

## On Market (1-4 weeks typical)

### Week 1
- List goes live
- First showing weekend
- Open houses

### Week 2+
- Continue showings
- Review offer deadline approaches
- Evaluate offers and negotiate
- Accept offer

## In Escrow (30-45 days typical)

### Days 1-3
- Open escrow
- Buyer deposits earnest money

### Days 1-17
- Buyer conducts inspections
- Negotiate repair requests
- Buyer removes inspection contingency

### Days 17-21
- Appraisal ordered and completed
- Buyer removes appraisal contingency

### Days 21-30
- Final loan approval
- Buyer removes loan contingency

### Days 30-45
- Sign closing documents
- Buyer does final walkthrough
- Funds transfer
- Deed records
- Hand over keys

## After Closing

- Cancel utilities
- Notify mortgage company of sale
- File tax records
- Forward mail
    `,
  },
  {
    slug: "glossary",
    title: "Seller Glossary",
    description: "Key terms every seller should know.",
    hub: "seller",
    order: 7,
    content: `
# Seller Glossary

Key terms you'll encounter when selling your home.

**As-Is Sale**: Selling without making repairs, though disclosures still required.

**Backup Offer**: Second-choice offer that becomes primary if first offer fails.

**Buyer Contingency**: Conditions buyers include that let them cancel (inspection, financing, appraisal).

**Closing Costs**: Fees paid at closing including escrow, title, transfer taxes (typically 1-2% for sellers).

**Comparative Market Analysis (CMA)**: Agent's estimate of home value based on recent sales.

**Contingency Removal**: Buyer formally waiving their right to cancel for that reason.

**Counter Offer**: Your response to a buyer's offer with different terms.

**Days on Market (DOM)**: How long a listing has been active.

**Disclosure**: Required documents about property condition, history, and known issues.

**Dual Agency**: When one agent represents both buyer and seller (requires disclosure).

**Earnest Money Deposit (EMD)**: Buyer's good faith deposit (typically 3% in Bay Area).

**Escalation Clause**: Buyer's offer to beat other offers by specified amount up to a cap.

**Escrow**: Neutral third party holding funds and documents during the transaction.

**Escrow Holdback**: Funds held after closing for specific repairs or issues.

**Fiduciary Duty**: Agent's legal obligation to act in your best interest.

**Home Warranty**: Service contract covering repairs to systems and appliances.

**Inspection Contingency**: Buyer's right to inspect and request repairs or cancel.

**Listing Agreement**: Contract with your agent specifying terms and commission.

**Lockbox**: Secure key holder allowing agents to show your home.

**Multiple Counter Offer**: Responding to several buyers simultaneously.

**Net Sheet**: Estimate of what you'll receive after all costs.

**Preliminary Title Report**: Document showing ownership and any claims on property.

**Pre-Listing Inspection**: Inspection done before listing to identify issues early.

**Rent-Back**: Arrangement where you stay in home after closing, paying rent.

**Seller Concession**: Credits or contributions to buyer's closing costs.

**Staging**: Furnishing and decorating to help buyers visualize living there.

**Title Insurance**: Protection for buyer and lender against ownership claims.

**Transfer Disclosure Statement (TDS)**: Required form disclosing property condition.

**Transfer Tax**: Tax paid when property changes hands. Varies by city.

**Under Contract**: Property has accepted offer but hasn't closed yet.
    `,
  },
];

export const neighborhoods: Neighborhood[] = [
  {
    slug: "el-cerrito",
    name: "El Cerrito",
    county: "contra-costa",
    overview: "Muzamil's home neighborhood. A diverse, welcoming hillside community with BART access, bay views, and a strong sense of community.",
    housingStock: "Mid-century ranches, some Craftsman homes, newer townhomes. Generally more affordable than neighboring Berkeley with excellent value.",
    lifestyle: "Two BART stations. Stunning bay views from hillside homes. Diverse dining scene along San Pablo Ave. Close to Tilden Regional Park.",
    whoItFits: "Commuters wanting BART access, buyers seeking a Berkeley alternative at lower prices, families wanting good schools and community feel.",
  },
  {
    slug: "albany",
    name: "Albany",
    county: "alameda",
    overview: "Charming small city between Berkeley and El Cerrito. Known for top-rated schools, tree-lined streets, and a tight-knit community feel.",
    housingStock: "Craftsman bungalows, mid-century homes, and classic California ranch-styles. A compact, highly desirable housing market.",
    lifestyle: "Excellent Albany Unified schools. Walkable Solano Ave with local shops and restaurants. BART nearby. Safe, friendly neighborhoods.",
    whoItFits: "Families prioritizing top-rated schools, buyers wanting a true neighborhood feel, those seeking a quieter alternative to Berkeley.",
  },
  {
    slug: "berkeley",
    name: "Berkeley",
    county: "alameda",
    overview: "A vibrant university city known for progressive politics, excellent dining, and walkable neighborhoods.",
    housingStock: "Mix of Craftsman bungalows, mid-century homes, Victorians, and newer condos. Prices vary dramatically by neighborhood.",
    lifestyle: "Strong food and arts scene. BART accessible. UC Berkeley creates a youthful energy. Excellent public schools in the hills.",
    whoItFits: "Academics, families wanting urban walkability, food enthusiasts, those who value diversity and progressive community.",
  },
  {
    slug: "kensington",
    name: "Kensington",
    county: "contra-costa",
    overview: "Quiet hillside community bordering Berkeley and El Cerrito. Known for excellent schools, beautiful homes, and peaceful streets with bay views.",
    housingStock: "Mix of Craftsman bungalows, Tudor Revival, and mid-century homes on large lots. Highly sought-after and well-maintained.",
    lifestyle: "Exceptionally peaceful and safe. Kensington Hilltop Elementary is highly rated. Easy access to Tilden Park trails and bay views.",
    whoItFits: "Families seeking top schools in a serene setting, those wanting a quiet hillside retreat with easy East Bay access.",
  },
  {
    slug: "oakland",
    name: "Oakland",
    county: "alameda",
    overview: "California's most diverse city with distinct neighborhoods, a thriving arts scene, and improving infrastructure.",
    housingStock: "Victorians, Craftsman bungalows, mid-century ranches, new construction. Wide price range from affordable to luxury.",
    lifestyle: "Strong food and arts culture. Multiple BART stations. Lake Merritt offers urban outdoor space. Rapidly evolving neighborhoods.",
    whoItFits: "Young professionals, artists, families seeking diversity, buyers priced out of SF wanting urban amenities.",
  },
  {
    slug: "alameda",
    name: "Alameda",
    county: "alameda",
    overview: "Island city with small-town feel, excellent schools, and historic architecture.",
    housingStock: "Victorians, Craftsman homes, and mid-century ranches. No lots split since 1973, limiting density.",
    lifestyle: "Beach access, walkable downtown, good schools. Ferry to SF. Slightly removed from BART but shuttle connections.",
    whoItFits: "Families wanting excellent schools and safety, those seeking small-town feel with city access, historic home lovers.",
  },
  {
    slug: "richmond",
    name: "Richmond",
    county: "contra-costa",
    overview: "Waterfront city undergoing revitalization with improving neighborhoods and new development.",
    housingStock: "Post-war ranches, newer construction in Marina Bay, Victorian homes in Point Richmond.",
    lifestyle: "BART accessible. Waterfront trails. Point Richmond has village feel. Growing arts and dining scene.",
    whoItFits: "First-time buyers seeking affordability, those betting on neighborhood improvement, waterfront lifestyle seekers.",
  },
  {
    slug: "walnut-creek",
    name: "Walnut Creek",
    county: "contra-costa",
    overview: "Suburban city with excellent downtown, top schools, and access to outdoor recreation.",
    housingStock: "Larger single-family homes, planned communities, condos near downtown. Higher price point for the area.",
    lifestyle: "Walkable downtown with dining and shopping. BART station. Close to Mt. Diablo. Excellent schools.",
    whoItFits: "Families prioritizing schools, suburban lifestyle seekers, those wanting walkable downtown plus space.",
  },
  {
    slug: "concord",
    name: "Concord",
    county: "contra-costa",
    overview: "Largest city in Contra Costa with diverse neighborhoods and new development at former naval base.",
    housingStock: "Wide range from affordable starter homes to new construction. Significant new development coming.",
    lifestyle: "BART accessible. More suburban feel. Good value for space. Growing downtown.",
    whoItFits: "First-time buyers wanting space, families seeking affordability, those okay with longer commutes for value.",
  },
  {
    slug: "pleasant-hill",
    name: "Pleasant Hill",
    county: "contra-costa",
    overview: "Central Contra Costa location with good schools and convenient access.",
    housingStock: "Mix of 1960s-80s homes, townhomes, and condos. Mid-range pricing for the area.",
    lifestyle: "Near BART. Good schools. Central location for East Bay and Delta access.",
    whoItFits: "Families wanting central location, those needing easy freeway access, buyers seeking mid-range pricing.",
  },
  {
    slug: "fremont",
    name: "Fremont",
    county: "alameda",
    overview: "Large South Bay city known for top schools, tech employers, and diverse community.",
    housingStock: "Tract homes from various eras, newer townhomes, luxury developments. Strong appreciation.",
    lifestyle: "Excellent schools (particularly in Mission San Jose area). Tech job access. Strong Asian community.",
    whoItFits: "Families prioritizing top schools, tech workers, those wanting suburban life with South Bay access.",
  },
  {
    slug: "hayward",
    name: "Hayward",
    county: "alameda",
    overview: "Central East Bay city with improving neighborhoods and strong affordability.",
    housingStock: "Mix of tract homes, older ranches, newer construction. Good value compared to northern cities.",
    lifestyle: "BART accessible. CSU East Bay creates college-town elements. Downtown revitalization underway.",
    whoItFits: "First-time buyers seeking affordability, those wanting central location, buyers betting on appreciation.",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: BlogPost['category']): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBuyerModuleBySlug(slug: string): EducationModule | undefined {
  return buyerModules.find(module => module.slug === slug);
}

export function getSellerModuleBySlug(slug: string): EducationModule | undefined {
  return sellerModules.find(module => module.slug === slug);
}

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find(n => n.slug === slug);
}

export function getNeighborhoodsByCounty(county: Neighborhood['county']): Neighborhood[] {
  return neighborhoods.filter(n => n.county === county);
}
