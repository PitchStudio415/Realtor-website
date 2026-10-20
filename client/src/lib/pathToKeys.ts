// Path to Keys content: every phase, step, document and FAQ. Single source of
// truth; edit timelineDefaults to change every day label and date on the guide.
// Copy is Muzamil's own; keep outside names and citations out of it.

export interface PtkDeadline { type: "calendar" | "business"; from: "acceptance" | "close"; days?: number; configKey?: string }
export interface PtkStep {
  number: number; slug: string; phase: number; title: string; timing: string; deadline: PtkDeadline | null;
  milestone: boolean; conditional: boolean; primaryParty: string; parties: string[]; summary: string; body: string;
  roles: Record<string, string>; youDo: string[]; goodToKnow: string[]; documents: string[];
}
export interface PtkDoc {
  abbr: string; slug: string; name: string; phase: number; what: string; comesFrom: string; whoSigns: string;
  when: string; lookFor: string[]; usedInSteps: string[];
}
export interface PtkLoopRow { side: string; doc: string | null; label: string; final: boolean }
export interface PtkInsert { type: string; id?: string; afterStep?: string; beforeStep?: string; rows?: PtkLoopRow[]; title?: string }

export const PTK = {
  "meta": {
    "title": "Path to Keys",
    "route": "/buy/path-to-keys",
    "agent": "Muzamil Khan",
    "brokerage": "Rise Group",
    "dre": "02400805",
    "lastReviewed": "2026-10-19",
    "disclaimer": "Day counts are the timelines I typically write into offers. Your contract sets your actual dates. This guide explains the process and is not legal or tax advice."
  },
  "timelineDefaults": {
    "_note": "Edit here only. Every date and day label on the site comes from these numbers. Set Oct 19 2026: inspection and appraisal 14, loan 17.",
    "escrowDays": 21,
    "depositBusinessDays": 3,
    "sellerDisclosureDays": 7,
    "investigationDays": 14,
    "appraisalDays": 14,
    "loanDays": 17,
    "finalWalkthroughDaysBeforeClose": 5,
    "noticeToPerformDays": 2
  },
  "parties": {
    "buyer": "You",
    "agent": "Your agent",
    "seller": "Seller & listing agent",
    "lender": "Lender",
    "escrow": "Escrow & title",
    "insp": "Inspector",
    "appr": "Appraiser"
  },
  "phases": [
    {
      "number": 1,
      "title": "Before the offer",
      "intro": "Get your team and financing in place, find the right home, and study it before you bid.",
      "span": "2 to 8 weeks"
    },
    {
      "number": 2,
      "title": "Offer & negotiation",
      "intro": "Your offer goes in. Terms go back and forth until both sides sign the same version.",
      "span": "1 to 7 days"
    },
    {
      "number": 3,
      "title": "Escrow & contingencies",
      "intro": "The clock starts. You inspect, appraise and finalize the loan, with the right to back out while contingencies stay open.",
      "span": "Day 0 to 17"
    },
    {
      "number": 4,
      "title": "Closing",
      "intro": "Final checks, signatures, funding and recording. Then keys.",
      "span": "Last 5 days"
    }
  ],
  "steps": [
    {
      "number": 1,
      "slug": "buyer-agreement",
      "phase": 1,
      "title": "Sign the buyer agreement",
      "timing": "Before touring",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "agent",
      "parties": [
        "buyer",
        "agent"
      ],
      "summary": "Sets who represents you and how your agent is paid. Required before touring with an agent.",
      "body": "The Buyer Representation and Broker Compensation agreement is required in California before an agent tours homes with you. It spells out how long you work together, what your agent does, and how compensation works.",
      "roles": {
        "buyer": "Reads and signs. Ask questions about anything unclear.",
        "agent": "Explains every section and answers questions before you sign."
      },
      "youDo": [
        "Read the term length and compensation sections",
        "Ask how any seller-paid compensation offsets what you owe"
      ],
      "goodToKnow": [
        "Compensation is negotiable and must be in writing",
        "Ask how either of you ends the agreement early"
      ],
      "documents": [
        "BRBC"
      ]
    },
    {
      "number": 2,
      "slug": "pre-approval",
      "phase": 1,
      "title": "Get pre-approved",
      "timing": "Before touring",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "lender",
      "parties": [
        "buyer",
        "lender"
      ],
      "summary": "A lender confirms what you can borrow. Sellers expect this letter with every offer.",
      "body": "A lender reviews your income, assets and credit and confirms the loan amount you qualify for. A pre-approval is stronger than a pre-qualification because the lender has checked your documents.",
      "roles": {
        "buyer": "Sends documents and picks a comfortable payment.",
        "lender": "Pulls credit, reviews documents and issues the letter."
      },
      "youDo": [
        "Send pay stubs, W-2s, two years of tax returns and two months of bank statements",
        "Pick a monthly payment you're comfortable with, not only the max"
      ],
      "goodToKnow": [
        "No new credit, car loans or large transfers until after closing",
        "Ask the lender to write a letter matched to each offer price"
      ],
      "documents": [
        "PRE",
        "POF"
      ]
    },
    {
      "number": 3,
      "slug": "touring-homes",
      "phase": 1,
      "title": "Tour homes",
      "timing": "Weeks 1 to 6",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent"
      ],
      "summary": "Open houses and private showings. Keep notes so homes don't blur together.",
      "body": "We visit homes in person, at open houses and private showings. Most buyers see 8 to 15 homes before choosing.",
      "roles": {
        "buyer": "Scores each home against your must-haves.",
        "agent": "Books showings, points out issues, and pulls history on each home."
      },
      "youDo": [
        "Score each home on your must-haves",
        "Visit the street at night and at commute time"
      ],
      "goodToKnow": [
        "Look past staging and paint. Focus on layout, light, roof, foundation and location"
      ],
      "documents": []
    },
    {
      "number": 4,
      "slug": "choosing-a-home",
      "phase": 1,
      "title": "Choose a home",
      "timing": "When one stands out",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent"
      ],
      "summary": "Once a home fits, we move fast. Most East Bay listings set an offer date.",
      "body": "In the East Bay, many listings set an offer date about a week after going live. Some sellers review early offers.",
      "roles": {
        "buyer": "Decides this is the one.",
        "agent": "Calls the listing agent for the offer date, competition and seller priorities."
      },
      "youDo": [
        "Tell your agent what you love and what worries you",
        "Confirm the offer date and submission rules"
      ],
      "goodToKnow": [
        "Ask whether the seller will look at offers before the offer date"
      ],
      "documents": []
    },
    {
      "number": 5,
      "slug": "disclosure-packet",
      "phase": 1,
      "title": "Request the disclosure packet",
      "timing": "Before the offer",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "seller",
      "parties": [
        "agent",
        "seller",
        "buyer"
      ],
      "summary": "Many sellers share disclosures and inspections upfront. Read them before you bid.",
      "body": "Many East Bay sellers order home and pest inspections before listing and share a disclosure packet with buyers. Reading it first lets you write a stronger offer with fewer surprises.",
      "roles": {
        "agent": "Requests the packet and walks you through the findings.",
        "seller": "Provides disclosures and any pre-inspections.",
        "buyer": "Reads the reports and decides if the issues are acceptable."
      },
      "youDo": [
        "Read the home and pest reports with your agent",
        "Get contractor bids on big items before the offer date"
      ],
      "goodToKnow": [
        "Pest reports split work into Section 1 (active damage) and Section 2 (conditions likely to cause damage)"
      ],
      "documents": [
        "TDS",
        "SPQ",
        "PREINS",
        "NHD",
        "HOA"
      ]
    },
    {
      "number": 6,
      "slug": "cma",
      "phase": 1,
      "title": "Review the CMA",
      "timing": "Before the offer",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "agent",
      "parties": [
        "agent",
        "buyer"
      ],
      "summary": "Recent sales tell us what the home will likely sell for, which is often above list.",
      "body": "A Comparative Market Analysis compares recent nearby sales, pending deals and active listings to estimate what the home will sell for.",
      "roles": {
        "agent": "Pulls comps and adjusts for size, condition and location.",
        "buyer": "Sets a walk-away number."
      },
      "youDo": [
        "Compare price per square foot of the closest sales",
        "Set your walk-away number before emotions run high"
      ],
      "goodToKnow": [
        "Many East Bay homes list below expected value to draw multiple offers"
      ],
      "documents": [
        "CMA"
      ]
    },
    {
      "number": 7,
      "slug": "offer-strategy",
      "phase": 1,
      "title": "Set offer strategy",
      "timing": "1 to 2 days before",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "agent",
      "parties": [
        "agent",
        "buyer",
        "lender"
      ],
      "summary": "Price, deposit, contingencies, close date and terms that make your offer stand out.",
      "body": "We decide every term of the offer. Price matters most, but terms like a shorter contingency or a rent-back can win against a higher bid.",
      "roles": {
        "agent": "Recommends terms based on the competition and seller priorities.",
        "buyer": "Makes the final call on each term.",
        "lender": "Confirms the loan supports the price and timeline."
      },
      "youDo": [
        "Decide which contingencies to keep or shorten",
        "Confirm cash for deposit and down payment"
      ],
      "goodToKnow": [
        "Deposit is 3% of price",
        "Fewer contingencies make a stronger offer and put more deposit at risk"
      ],
      "documents": []
    },
    {
      "number": 8,
      "slug": "submitting-the-offer",
      "phase": 2,
      "title": "Sign and submit the offer",
      "timing": "By offer deadline",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent"
      ],
      "summary": "Your offer goes on the RPA, the standard California purchase contract.",
      "body": "The California Residential Purchase Agreement sets price, deposit, loan terms, contingency periods, close date, and who pays which costs. Your agent submits it with your pre-approval and proof of funds.",
      "roles": {
        "buyer": "Reviews and signs.",
        "agent": "Writes the offer, packages it and presents it to the listing agent."
      },
      "youDo": [
        "Review every term with your agent",
        "Sign electronically and confirm attachments"
      ],
      "goodToKnow": [
        "Every deadline counts from acceptance, not from the day you sign"
      ],
      "documents": [
        "RPA",
        "PRE",
        "POF"
      ]
    },
    {
      "number": 9,
      "slug": "seller-response",
      "phase": 2,
      "title": "Seller responds",
      "timing": "Usually 1 to 3 days",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "seller",
      "parties": [
        "seller",
        "agent"
      ],
      "summary": "Accept, reject, or counter. With several offers, expect a multiple counter.",
      "body": "The seller accepts, rejects or counters. With several offers, the seller often sends a multiple counter offer asking for best and final terms.",
      "roles": {
        "seller": "Reviews offers and decides how to respond.",
        "agent": "Gathers feedback and tells you where you stand."
      },
      "youDo": [
        "Talk through each change with your agent",
        "Decide what you'll give and what you won't"
      ],
      "goodToKnow": [
        "A multiple counter isn't binding until the seller signs again"
      ],
      "documents": [
        "SCO",
        "SMCO"
      ]
    },
    {
      "number": 10,
      "slug": "acceptance",
      "phase": 2,
      "title": "Acceptance: Day 0",
      "timing": "Day 0",
      "deadline": {
        "type": "calendar",
        "from": "acceptance",
        "days": 0
      },
      "milestone": true,
      "conditional": false,
      "primaryParty": "seller",
      "parties": [
        "seller",
        "buyer",
        "agent"
      ],
      "summary": "Both sides sign the same terms. You're in contract and every deadline starts counting.",
      "body": "Once both sides sign the final terms and the signed copy is delivered back, you're in contract. That's Day 0.",
      "roles": {
        "seller": "Signs the final terms.",
        "buyer": "Receives the signed contract.",
        "agent": "Sends the contract to escrow and your lender."
      },
      "youDo": [
        "Put every escrow deadline on your calendar",
        "Watch for escrow's welcome email"
      ],
      "goodToKnow": [
        "Acceptance happens on delivery of the signed counter, not when it's signed"
      ],
      "documents": []
    },
    {
      "number": 11,
      "slug": "escrow-and-deposit",
      "phase": 3,
      "title": "Open escrow and send deposit",
      "timing": "3 business days",
      "deadline": {
        "type": "business",
        "from": "acceptance",
        "configKey": "depositBusinessDays"
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "escrow",
      "parties": [
        "escrow",
        "buyer",
        "agent"
      ],
      "summary": "Escrow holds the money and paperwork. Your deposit goes in within 3 business days.",
      "body": "Escrow is a neutral company that holds money and documents until closing. Your earnest money deposit goes to escrow within 3 business days of acceptance.",
      "roles": {
        "escrow": "Opens the file and sends wiring instructions.",
        "buyer": "Wires the deposit after confirming instructions by phone.",
        "agent": "Delivers the contract to escrow."
      },
      "youDo": [
        "Call escrow at a number you already trust to confirm wire details",
        "Sign escrow instructions"
      ],
      "goodToKnow": [
        "Never wire based on an email alone. Wire fraud targets home buyers"
      ],
      "documents": [
        "ESC",
        "EMD"
      ]
    },
    {
      "number": 12,
      "slug": "disclosures",
      "phase": 3,
      "title": "Receive and sign disclosures",
      "timing": "By Day 7",
      "deadline": {
        "type": "calendar",
        "from": "acceptance",
        "configKey": "sellerDisclosureDays"
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "seller",
      "parties": [
        "seller",
        "buyer",
        "escrow"
      ],
      "summary": "Remaining disclosures and the title report arrive. You sign to show receipt.",
      "body": "The seller delivers remaining disclosures and the title company sends a preliminary title report. Signing shows you received them, not that you approve.",
      "roles": {
        "seller": "Delivers disclosures.",
        "buyer": "Reads, asks questions and signs receipt.",
        "escrow": "Sends the preliminary title report."
      },
      "youDo": [
        "Read every disclosure and flag questions",
        "Check the title report for liens and easements"
      ],
      "goodToKnow": [
        "You get at least 5 days after delivery to review, even if other deadlines are sooner"
      ],
      "documents": [
        "TDS",
        "SPQ",
        "AVID",
        "NHD",
        "PTR"
      ]
    },
    {
      "number": 13,
      "slug": "inspections",
      "phase": 3,
      "title": "Inspections",
      "timing": "Day 1 to 14",
      "deadline": {
        "type": "calendar",
        "from": "acceptance",
        "configKey": "investigationDays"
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "insp",
      "parties": [
        "insp",
        "buyer",
        "agent"
      ],
      "summary": "Check anything you want: home, pest, roof, sewer, foundation, insurance.",
      "body": "Your investigation contingency lets you check anything about the property. Common inspections: general home (which covers the roof, foundation and chimney), pest, and sewer lateral.",
      "roles": {
        "insp": "Inspects and writes reports.",
        "buyer": "Attends, reads the reports and gets bids.",
        "agent": "Schedules access and helps prioritize findings."
      },
      "youDo": [
        "Attend the end of the general inspection",
        "Get bids on big items",
        "Get a homeowner's insurance quote early"
      ],
      "goodToKnow": [
        "Older East Bay homes often need a sewer lateral inspection",
        "Fire insurance can be hard to place in some hill areas"
      ],
      "documents": [
        "INSP"
      ]
    },
    {
      "number": 14,
      "slug": "request-for-repair",
      "phase": 3,
      "title": "Request repairs",
      "timing": "Before Day 14",
      "deadline": null,
      "milestone": false,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent"
      ],
      "summary": "Ask for repairs, a credit or a price cut based on what inspections found.",
      "body": "Based on inspections, you ask the seller for repairs, a credit at closing, or a lower price.",
      "roles": {
        "buyer": "Decides what to ask for.",
        "agent": "Writes the request and negotiates."
      },
      "youDo": [
        "Prioritize safety and major systems over cosmetics",
        "Decide your plan if the seller says no"
      ],
      "goodToKnow": [
        "Credits are often simpler than repairs because you control the work"
      ],
      "documents": [
        "RR"
      ]
    },
    {
      "number": 15,
      "slug": "appraisal",
      "phase": 3,
      "title": "Appraisal",
      "timing": "By Day 14",
      "deadline": {
        "type": "calendar",
        "from": "acceptance",
        "configKey": "appraisalDays"
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "appr",
      "parties": [
        "appr",
        "lender",
        "agent"
      ],
      "summary": "The lender confirms the home supports the loan. A low value changes the math.",
      "body": "Your lender orders an appraisal. If the value comes in below the price, the lender lends based on the lower number and you cover the gap or renegotiate.",
      "roles": {
        "appr": "Visits and values the home.",
        "lender": "Orders and reviews the appraisal.",
        "agent": "Sends the appraiser supporting comps."
      },
      "youDo": [
        "Know how much extra cash you'd add if value comes in short"
      ],
      "goodToKnow": [
        "Low appraisal options: renegotiate, cover the gap, split it, or cancel while the contingency is open"
      ],
      "documents": [
        "APPR"
      ]
    },
    {
      "number": 16,
      "slug": "loan-approval",
      "phase": 3,
      "title": "Loan approval",
      "timing": "By Day 17",
      "deadline": {
        "type": "calendar",
        "from": "acceptance",
        "configKey": "loanDays"
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "lender",
      "parties": [
        "lender",
        "buyer"
      ],
      "summary": "Underwriting checks everything. Once conditions clear, your loan is approved.",
      "body": "Underwriting verifies your file and issues conditions. Once cleared, the lender approves the loan.",
      "roles": {
        "lender": "Underwrites and approves.",
        "buyer": "Answers requests fast."
      },
      "youDo": [
        "Answer lender requests the same day",
        "Lock your rate if you haven't"
      ],
      "goodToKnow": [
        "No job changes, new debt or large unexplained deposits"
      ],
      "documents": [
        "LOAN"
      ]
    },
    {
      "number": 17,
      "slug": "contingency-removal",
      "phase": 3,
      "title": "Remove contingencies",
      "timing": "Day 14 and 17",
      "deadline": {
        "type": "calendar",
        "from": "acceptance",
        "configKey": "loanDays"
      },
      "milestone": true,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent",
        "seller"
      ],
      "summary": "You sign off once satisfied. After this, backing out risks your deposit.",
      "body": "You sign a Contingency Removal for each contingency once you're satisfied. This is the biggest commitment point in the deal.",
      "roles": {
        "buyer": "Signs once satisfied.",
        "agent": "Confirms timing and delivers to the seller.",
        "seller": "Receives the removal."
      },
      "youDo": [
        "Confirm inspections, appraisal and loan are settled",
        "Ask what each removal means for your deposit"
      ],
      "goodToKnow": [
        "Contingencies don't drop off on their own. You sign to remove them"
      ],
      "documents": [
        "CR"
      ]
    },
    {
      "number": 18,
      "slug": "notice-to-perform",
      "phase": 3,
      "title": "Notice to Buyer to Perform",
      "timing": "Only if late",
      "deadline": null,
      "milestone": false,
      "conditional": true,
      "primaryParty": "seller",
      "parties": [
        "seller",
        "buyer"
      ],
      "summary": "If a deadline passes, the seller gives you 2 days to act before cancelling.",
      "body": "If a deadline passes without your removal, the seller sends a Notice to Buyer to Perform. You get 2 days to act before the seller cancels.",
      "roles": {
        "seller": "Sends the notice.",
        "buyer": "Removes the contingency or negotiates an extension."
      },
      "youDo": [
        "Remove on time to avoid this",
        "Need more time? Get a signed extension before the deadline"
      ],
      "goodToKnow": [
        "An extension counts only with the seller's signature"
      ],
      "documents": [
        "NBP"
      ]
    },
    {
      "number": 19,
      "slug": "final-walkthrough",
      "phase": 4,
      "title": "Final walkthrough",
      "timing": "5 days before close",
      "deadline": {
        "type": "calendar",
        "from": "close",
        "configKey": "finalWalkthroughDaysBeforeClose"
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent"
      ],
      "summary": "Confirm the home is in agreed condition and repairs are done.",
      "body": "You visit the home to confirm it's in the agreed condition, repairs are done and included items are still there.",
      "roles": {
        "buyer": "Tests everything.",
        "agent": "Checks repairs against the agreement."
      },
      "youDo": [
        "Run faucets, appliances, heat and outlets",
        "Match repair receipts to the agreement"
      ],
      "goodToKnow": [
        "A condition check, not a new inspection"
      ],
      "documents": [
        "VP"
      ]
    },
    {
      "number": 20,
      "slug": "signing",
      "phase": 4,
      "title": "Sign loan and escrow docs",
      "timing": "3 to 5 days before",
      "deadline": {
        "type": "calendar",
        "from": "close",
        "days": -4
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "escrow",
      "parties": [
        "buyer",
        "escrow",
        "lender"
      ],
      "summary": "Review the Closing Disclosure, then sign with a notary.",
      "body": "You get the Closing Disclosure at least 3 business days before signing, then sign the loan and escrow packet with a notary.",
      "roles": {
        "buyer": "Reviews and signs.",
        "escrow": "Hosts the signing.",
        "lender": "Sends final documents."
      },
      "youDo": [
        "Compare the Closing Disclosure to your Loan Estimate",
        "Bring government ID"
      ],
      "goodToKnow": [
        "Ask the lender about any fee that changed"
      ],
      "documents": [
        "CD",
        "LDOCS",
        "DEED"
      ]
    },
    {
      "number": 21,
      "slug": "wiring-funds",
      "phase": 4,
      "title": "Wire closing funds",
      "timing": "1 to 2 days before",
      "deadline": {
        "type": "calendar",
        "from": "close",
        "days": -2
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "escrow"
      ],
      "summary": "Send your remaining down payment and costs. Confirm instructions by phone.",
      "body": "You send the rest of your down payment and closing costs to escrow.",
      "roles": {
        "buyer": "Wires the funds.",
        "escrow": "Confirms receipt."
      },
      "youDo": [
        "Confirm wire instructions by phone at a trusted number",
        "Confirm escrow received the funds"
      ],
      "goodToKnow": [
        "Escrow never changes wire instructions by email"
      ],
      "documents": []
    },
    {
      "number": 22,
      "slug": "funding-and-recording",
      "phase": 4,
      "title": "Funding and recording",
      "timing": "Close of escrow",
      "deadline": {
        "type": "calendar",
        "from": "close",
        "days": 0
      },
      "milestone": false,
      "conditional": false,
      "primaryParty": "escrow",
      "parties": [
        "lender",
        "escrow"
      ],
      "summary": "The lender funds, the seller gets paid, and the deed records with the county.",
      "body": "The lender funds the loan, escrow pays the seller, and the title company records the deed with the county. Once recorded, the home is yours.",
      "roles": {
        "lender": "Funds the loan.",
        "escrow": "Pays everyone and records the deed."
      },
      "youDo": [
        "Wait for your agent's call confirming recording"
      ],
      "goodToKnow": [
        "Recording usually happens in the morning"
      ],
      "documents": [
        "DEED"
      ]
    },
    {
      "number": 23,
      "slug": "keys",
      "phase": 4,
      "title": "Get the keys",
      "timing": "Close of escrow",
      "deadline": {
        "type": "calendar",
        "from": "close",
        "days": 0
      },
      "milestone": true,
      "conditional": false,
      "primaryParty": "buyer",
      "parties": [
        "buyer",
        "agent",
        "seller"
      ],
      "summary": "Keys at recording, unless you agreed to a rent-back.",
      "body": "You get keys at recording, unless the contract sets a rent-back or a later possession date.",
      "roles": {
        "buyer": "Moves in.",
        "agent": "Hands over keys.",
        "seller": "Leaves the home as agreed."
      },
      "youDo": [
        "Change the locks",
        "Set up utilities and insurance",
        "File for the homeowners' property tax exemption"
      ],
      "goodToKnow": [
        "The exemption lowers your property tax bill each year"
      ],
      "documents": []
    }
  ],
  "inserts": [
    {
      "type": "negotiation-loop",
      "id": "offer",
      "afterStep": "seller-response",
      "rows": [
        {
          "side": "buyer",
          "doc": "RPA",
          "label": "Your offer",
          "final": false
        },
        {
          "side": "seller",
          "doc": "SCO",
          "label": "Seller counters",
          "final": false
        },
        {
          "side": "buyer",
          "doc": "BCO",
          "label": "You counter back",
          "final": false
        },
        {
          "side": "seller",
          "doc": "SCO",
          "label": "Seller counters again",
          "final": false
        },
        {
          "side": "buyer",
          "doc": null,
          "label": "Both sides sign the same terms",
          "final": true
        }
      ],
      "title": "Back and forth until both sides sign"
    },
    {
      "type": "contingency-windows",
      "beforeStep": "escrow-and-deposit"
    },
    {
      "type": "negotiation-loop",
      "id": "repair",
      "afterStep": "request-for-repair",
      "rows": [
        {
          "side": "buyer",
          "doc": "RR",
          "label": "You request repairs or a credit",
          "final": false
        },
        {
          "side": "seller",
          "doc": "RRRR",
          "label": "Seller agrees, refuses or counters",
          "final": false
        },
        {
          "side": "buyer",
          "doc": "RRRR",
          "label": "You reply",
          "final": false
        },
        {
          "side": "seller",
          "doc": null,
          "label": "Agreement on repairs or credit",
          "final": true
        }
      ],
      "title": "Repair negotiation"
    }
  ],
  "documents": [
    {
      "abbr": "BRBC",
      "slug": "brbc",
      "name": "Buyer Representation and Broker Compensation Agreement",
      "phase": 1,
      "what": "Your written agreement with your agent. It sets the term, what your agent does for you, and how compensation works.",
      "comesFrom": "Your agent",
      "whoSigns": "You and your agent",
      "when": "Before touring homes",
      "lookFor": [
        "Length of the agreement",
        "Compensation amount and who pays it",
        "How either side ends it early"
      ],
      "usedInSteps": [
        "buyer-agreement"
      ]
    },
    {
      "abbr": "PRE",
      "slug": "pre",
      "name": "Pre-approval letter",
      "phase": 1,
      "what": "A lender's letter saying you qualify for a loan up to an amount, after reviewing your documents and credit.",
      "comesFrom": "Lender",
      "whoSigns": "No signature",
      "when": "Before touring, refreshed for each offer",
      "lookFor": [
        "Loan type and amount",
        "Expiration date"
      ],
      "usedInSteps": [
        "pre-approval",
        "submitting-the-offer"
      ]
    },
    {
      "abbr": "POF",
      "slug": "pof",
      "name": "Proof of funds",
      "phase": 1,
      "what": "Bank or brokerage statements showing you have the deposit, down payment and closing costs.",
      "comesFrom": "You",
      "whoSigns": "No signature",
      "when": "With your offer",
      "lookFor": [
        "Black out account numbers before sharing"
      ],
      "usedInSteps": [
        "pre-approval",
        "submitting-the-offer"
      ]
    },
    {
      "abbr": "TDS",
      "slug": "tds",
      "name": "Transfer Disclosure Statement",
      "phase": 3,
      "what": "The seller's required disclosure of known conditions affecting the property, from appliances to defects.",
      "comesFrom": "Seller",
      "whoSigns": "Seller, then you to acknowledge receipt",
      "when": "Often in the pre-offer packet, otherwise by Day 7",
      "lookFor": [
        "Anything marked 'yes' with an explanation",
        "Past repairs, leaks, additions without permits"
      ],
      "usedInSteps": [
        "disclosure-packet",
        "disclosures"
      ]
    },
    {
      "abbr": "SPQ",
      "slug": "spq",
      "name": "Seller Property Questionnaire",
      "phase": 3,
      "what": "A longer questionnaire covering things the TDS misses: neighborhood issues, past insurance claims, pets, lawsuits, deaths on the property.",
      "comesFrom": "Seller",
      "whoSigns": "Seller, then you",
      "when": "With the TDS",
      "lookFor": [
        "Insurance claims",
        "Neighbor disputes",
        "Work done without permits"
      ],
      "usedInSteps": [
        "disclosure-packet",
        "disclosures"
      ]
    },
    {
      "abbr": "AVID",
      "slug": "avid",
      "name": "Agent Visual Inspection Disclosure",
      "phase": 3,
      "what": "Each agent's notes from a walk-through of accessible areas. It is not a professional inspection.",
      "comesFrom": "Listing agent and your agent",
      "whoSigns": "Agents, then you",
      "when": "During escrow",
      "lookFor": [
        "Stains, cracks, odors, uneven floors"
      ],
      "usedInSteps": [
        "disclosures"
      ]
    },
    {
      "abbr": "NHD",
      "slug": "nhd",
      "name": "Natural Hazard Disclosure report",
      "phase": 3,
      "what": "A third-party report on earthquake fault zones, flood zones, fire hazard zones and similar.",
      "comesFrom": "Third-party company ordered by seller",
      "whoSigns": "You acknowledge receipt",
      "when": "Pre-offer packet or by Day 7",
      "lookFor": [
        "Very high fire hazard zone, which affects insurance",
        "Earthquake fault or liquefaction zone"
      ],
      "usedInSteps": [
        "disclosure-packet",
        "disclosures"
      ]
    },
    {
      "abbr": "PREINS",
      "slug": "preins",
      "name": "Seller pre-inspections",
      "phase": 1,
      "what": "Home and pest inspections the seller ordered before listing, shared so buyers can bid with fewer contingencies.",
      "comesFrom": "Seller",
      "whoSigns": "No signature",
      "when": "In the disclosure packet before the offer",
      "lookFor": [
        "Pest Section 1 and Section 2 items",
        "Roof, foundation, electrical, sewer findings"
      ],
      "usedInSteps": [
        "disclosure-packet"
      ]
    },
    {
      "abbr": "HOA",
      "slug": "hoa",
      "name": "HOA documents",
      "phase": 3,
      "what": "For condos and townhomes: budget, reserves, rules, minutes and any pending assessments or lawsuits.",
      "comesFrom": "HOA, ordered by seller",
      "whoSigns": "You acknowledge receipt",
      "when": "Pre-offer or during escrow",
      "lookFor": [
        "Reserve funding level",
        "Special assessments",
        "Rental and pet rules"
      ],
      "usedInSteps": [
        "disclosure-packet"
      ]
    },
    {
      "abbr": "CMA",
      "slug": "cma",
      "name": "Comparative Market Analysis",
      "phase": 1,
      "what": "Your agent's analysis of recent sales, pending deals and active listings to estimate what the home will sell for.",
      "comesFrom": "Your agent",
      "whoSigns": "No signature",
      "when": "Before setting your offer price",
      "lookFor": [
        "Price per square foot of the closest comps",
        "How far over list similar homes sold"
      ],
      "usedInSteps": [
        "cma"
      ]
    },
    {
      "abbr": "RPA",
      "slug": "rpa",
      "name": "California Residential Purchase Agreement",
      "phase": 2,
      "what": "The contract. Price, deposit, loan terms, contingency periods, close date, who pays which costs, and what stays with the house.",
      "comesFrom": "Your agent",
      "whoSigns": "You, then the seller on acceptance",
      "when": "When you make an offer",
      "lookFor": [
        "Deposit amount",
        "Each contingency length",
        "Close date and possession",
        "Items included or excluded"
      ],
      "usedInSteps": [
        "submitting-the-offer"
      ]
    },
    {
      "abbr": "SCO",
      "slug": "sco",
      "name": "Seller Counter Offer",
      "phase": 2,
      "what": "The seller's response changing some of your terms. Anything not changed stays as you wrote it.",
      "comesFrom": "Listing agent",
      "whoSigns": "Seller, then you to accept",
      "when": "After your offer",
      "lookFor": [
        "Every changed term",
        "Expiration time"
      ],
      "usedInSteps": [
        "seller-response"
      ]
    },
    {
      "abbr": "SMCO",
      "slug": "smco",
      "name": "Seller Multiple Counter Offer",
      "phase": 2,
      "what": "A counter sent to several buyers at once. Even if you sign it, the seller must sign again for it to bind.",
      "comesFrom": "Listing agent",
      "whoSigns": "You, then seller signs final",
      "when": "In multiple-offer situations",
      "lookFor": [
        "Expiration time",
        "That the seller's final signature is still needed"
      ],
      "usedInSteps": [
        "seller-response"
      ]
    },
    {
      "abbr": "BCO",
      "slug": "bco",
      "name": "Buyer Counter Offer",
      "phase": 2,
      "what": "Your response to a seller counter, changing terms again.",
      "comesFrom": "Your agent",
      "whoSigns": "You, then seller to accept",
      "when": "During negotiation",
      "lookFor": [
        "Expiration time"
      ],
      "usedInSteps": [
        "seller-response"
      ]
    },
    {
      "abbr": "ESC",
      "slug": "esc",
      "name": "Escrow instructions",
      "phase": 3,
      "what": "Escrow's written instructions to carry out the contract: what it collects, pays and records.",
      "comesFrom": "Escrow company",
      "whoSigns": "You and the seller",
      "when": "Days 1 to 5",
      "lookFor": [
        "Names and vesting (how you'll hold title)",
        "Matches the purchase price and terms"
      ],
      "usedInSteps": [
        "escrow-and-deposit"
      ]
    },
    {
      "abbr": "EMD",
      "slug": "emd",
      "name": "Earnest money deposit receipt",
      "phase": 3,
      "what": "Escrow's confirmation that your good-faith deposit arrived.",
      "comesFrom": "Escrow",
      "whoSigns": "No signature",
      "when": "Within 3 business days of acceptance",
      "lookFor": [
        "Amount matches the contract"
      ],
      "usedInSteps": [
        "escrow-and-deposit"
      ]
    },
    {
      "abbr": "PTR",
      "slug": "ptr",
      "name": "Preliminary title report",
      "phase": 3,
      "what": "Shows who owns the home and any liens, easements or restrictions recorded against it.",
      "comesFrom": "Title company",
      "whoSigns": "You approve within your contingency",
      "when": "First week of escrow",
      "lookFor": [
        "Liens that must be paid off",
        "Easements",
        "CC&Rs"
      ],
      "usedInSteps": [
        "disclosures"
      ]
    },
    {
      "abbr": "INSP",
      "slug": "insp",
      "name": "Inspection reports",
      "phase": 3,
      "what": "Your own inspectors' reports: general home, pest, and any specialists like roof, sewer lateral, foundation or chimney.",
      "comesFrom": "Inspectors you hire",
      "whoSigns": "No signature",
      "when": "Days 1 to 14",
      "lookFor": [
        "Safety items",
        "Major systems",
        "Cost estimates for big repairs"
      ],
      "usedInSteps": [
        "inspections"
      ]
    },
    {
      "abbr": "APPR",
      "slug": "appr",
      "name": "Appraisal report",
      "phase": 3,
      "what": "An independent value opinion ordered by your lender to confirm the home supports the loan.",
      "comesFrom": "Appraiser via lender",
      "whoSigns": "No signature",
      "when": "By Day 14",
      "lookFor": [
        "Appraised value versus price",
        "Comparable sales used"
      ],
      "usedInSteps": [
        "appraisal"
      ]
    },
    {
      "abbr": "RR",
      "slug": "rr",
      "name": "Request for Repair",
      "phase": 3,
      "what": "Your formal request for repairs, a credit or a price cut based on what inspections found.",
      "comesFrom": "Your agent",
      "whoSigns": "You",
      "when": "Before the investigation contingency ends",
      "lookFor": [
        "Specific repairs and who does them",
        "Credit amount"
      ],
      "usedInSteps": [
        "request-for-repair"
      ]
    },
    {
      "abbr": "RRRR",
      "slug": "rrrr",
      "name": "Seller Response and Buyer Reply to Request for Repair",
      "phase": 3,
      "what": "The seller's answer to your request, and your reply. Can go back and forth.",
      "comesFrom": "Listing agent, then your agent",
      "whoSigns": "Seller, then you",
      "when": "Before Day 14",
      "lookFor": [
        "What the seller agreed to, item by item"
      ],
      "usedInSteps": [
        "request-for-repair"
      ]
    },
    {
      "abbr": "LOAN",
      "slug": "loan",
      "name": "Loan approval",
      "phase": 3,
      "what": "The lender's confirmation that underwriting conditions are cleared and the loan is approved.",
      "comesFrom": "Lender",
      "whoSigns": "No signature",
      "when": "By Day 17",
      "lookFor": [
        "Any remaining conditions before funding"
      ],
      "usedInSteps": [
        "loan-approval"
      ]
    },
    {
      "abbr": "CR",
      "slug": "cr",
      "name": "Contingency Removal",
      "phase": 3,
      "what": "You sign to remove one or more contingencies. After that, backing out for that reason puts your deposit at risk.",
      "comesFrom": "Your agent",
      "whoSigns": "You",
      "when": "Day 14 and Day 17",
      "lookFor": [
        "Which contingencies you're removing",
        "That you're satisfied before signing"
      ],
      "usedInSteps": [
        "contingency-removal"
      ]
    },
    {
      "abbr": "NBP",
      "slug": "nbp",
      "name": "Notice to Buyer to Perform",
      "phase": 3,
      "what": "The seller's notice when you miss a deadline. You get 2 days to act before the seller cancels.",
      "comesFrom": "Listing agent",
      "whoSigns": "Seller",
      "when": "Only if a deadline passes",
      "lookFor": [
        "The deadline it names"
      ],
      "usedInSteps": [
        "notice-to-perform"
      ]
    },
    {
      "abbr": "VP",
      "slug": "vp",
      "name": "Verification of Property Condition",
      "phase": 4,
      "what": "Your sign-off after the final walkthrough confirming the home's condition.",
      "comesFrom": "Your agent",
      "whoSigns": "You",
      "when": "About 5 days before close",
      "lookFor": [
        "Repairs completed",
        "Included items still there"
      ],
      "usedInSteps": [
        "final-walkthrough"
      ]
    },
    {
      "abbr": "CD",
      "slug": "cd",
      "name": "Closing Disclosure",
      "phase": 4,
      "what": "The lender's final statement of loan terms and closing costs. Federal law requires you get it 3 business days before signing.",
      "comesFrom": "Lender",
      "whoSigns": "You acknowledge receipt",
      "when": "3 business days before signing",
      "lookFor": [
        "Rate and payment match your lock",
        "Cash to close",
        "Changed fees"
      ],
      "usedInSteps": [
        "signing"
      ]
    },
    {
      "abbr": "DEED",
      "slug": "deed",
      "name": "Grant deed",
      "phase": 4,
      "what": "The document that transfers ownership from the seller to you. Recorded with the county at closing.",
      "comesFrom": "Escrow",
      "whoSigns": "Seller",
      "when": "Signing and recording",
      "lookFor": [
        "Your names and vesting are correct"
      ],
      "usedInSteps": [
        "signing",
        "funding-and-recording"
      ]
    },
    {
      "abbr": "LDOCS",
      "slug": "ldocs",
      "name": "Loan documents",
      "phase": 4,
      "what": "The note (your promise to repay) and deed of trust (the home secures the loan), plus lender disclosures.",
      "comesFrom": "Lender via escrow",
      "whoSigns": "You, with a notary",
      "when": "3 to 5 days before close",
      "lookFor": [
        "Matches the Closing Disclosure"
      ],
      "usedInSteps": [
        "signing"
      ]
    }
  ],
  "faq": [
    {
      "q": "How long does buying a home take in the East Bay?",
      "a": "Plan on 2 to 8 weeks to find a home, then about 21 days of escrow. Cash or shorter-escrow offers can close in 2 to 3 weeks.",
      "step": "touring-homes"
    },
    {
      "q": "How much is the deposit, and can I lose it?",
      "a": "3% of the price, wired to escrow within 3 business days. It is protected while your contingencies are open. After you remove them, backing out puts it at risk.",
      "step": "escrow-and-deposit"
    },
    {
      "q": "What happens if the appraisal comes in low?",
      "a": "You can renegotiate the price, cover the gap in cash, split the difference with the seller, or cancel while the appraisal contingency is open.",
      "step": "appraisal"
    },
    {
      "q": "Should I ask for repairs or a credit?",
      "a": "A credit is often simpler. You control who does the work and when. Focus requests on safety items and major systems.",
      "step": "request-for-repair"
    },
    {
      "q": "How do I avoid wire fraud?",
      "a": "Call escrow at a number you already trust before you wire. Escrow never changes wire instructions by email.",
      "step": "wiring-funds"
    }
  ],
  "inspectionTable": {
    "step": "inspections",
    "_note": "Cost ranges are placeholders. Confirm current local pricing before publishing.",
    "rows": [
      {
        "name": "General home",
        "covers": "Structure, foundation, roof, chimney, plumbing, electrical, heating",
        "cost": "$500–800"
      },
      {
        "name": "Pest (termite)",
        "covers": "Section 1 and Section 2 findings",
        "cost": "$250–450"
      },
      {
        "name": "Sewer lateral",
        "covers": "Camera scope of the line to the street",
        "cost": "$250–400"
      }
    ]
  }
} as unknown as {
  meta: { title: string; route: string; agent: string; brokerage: string; dre: string; lastReviewed: string; disclaimer: string };
  timelineDefaults: Record<string, number | string>;
  parties: Record<string, string>;
  phases: { number: number; title: string; intro: string; span: string }[];
  steps: PtkStep[];
  inserts: PtkInsert[];
  documents: PtkDoc[];
  faq: { q: string; a: string; step: string }[];
  inspectionTable: { step: string; rows: { name: string; covers: string; cost: string }[] };
};
