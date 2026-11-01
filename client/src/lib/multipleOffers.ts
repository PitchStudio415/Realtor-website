// Winning Multiple Offers: how to compete for an East Bay home. Single source
// of truth for the hub (/buy/winning-multiple-offers) and its topic pages.
// Copy is Muzamil's own voice. Keep it consistent with Path to Keys
// (deposit 3%, inspection and appraisal 14 days, loan 17, escrow 21) and never
// add market statistics here; point to the city playbooks for numbers.

export interface MoTopic {
  slug: string;
  part: number;
  title: string;
  summary: string;
  body: string[];
  iDo: string[];
  youDo: string[];
  goodToKnow: string[];
  /** Path to Keys step slugs that go deeper on this topic. */
  ptkSteps: string[];
  /** Path to Keys document abbreviations used in this topic. */
  ptkDocs: string[];
}

export const MO_BASE = "/buy/winning-multiple-offers";
export const moTopicPath = (slug: string) => `${MO_BASE}/${slug}`;

export const MO = {
  meta: {
    title: "Winning Multiple Offers",
    lastReviewed: "2026-10-29",
    disclaimer:
      "This guide explains how competitive offers commonly work in the East Bay. Your contract sets your actual terms and dates. It is not legal or tax advice.",
  },
  parts: [
    { number: 1, title: "Before you bid", intro: "Get ready before you find the house, so you can move the day you do." },
    { number: 2, title: "Building the offer", intro: "Price, contingencies, deposit and terms. Each one can tip a seller your way." },
    { number: 3, title: "Offer day and after", intro: "How sellers decide, how to answer a counter, and what to do next." },
  ],
  topics: [
    {
      slug: "why-homes-list-low",
      part: 1,
      title: "Why East Bay homes list below value",
      summary: "Many sellers set a low list price and an offer date to draw a crowd. The list price is a starting point.",
      body: [
        "Many East Bay homes come on the market priced below what they're expected to sell for. The seller sets an offer date, usually about a week out, opens the house for tours, and shares inspections up front. The goal is to bring in several buyers at once.",
        "That means the list price tells you very little about what the home will cost. What matters is what similar homes nearby have actually sold for, and how many buyers are interested in this one.",
        "My city playbooks show how far over list recent sales have gone in each city, so we start from real sales and set expectations before you fall for a house.",
      ],
      iDo: [
        "Pull recent sales and tell you what the home will likely sell for",
        "Call the listing agent to learn the offer date, how much interest the home has, and what the seller cares about",
      ],
      youDo: ["Treat the list price as a starting point", "Ask me for the likely sale price before you get attached"],
      goodToKnow: [
        "A home priced near its value with no offer date may accept a good offer the day it comes in",
        "Disclosure packet requests and open house traffic are early signs of how many offers to expect",
      ],
      ptkSteps: ["cma"],
      ptkDocs: ["CMA"],
    },
    {
      slug: "get-offer-ready",
      part: 1,
      title: "Get offer-ready before you find the house",
      summary: "A strong pre-approval and your proof of funds, ready before the first tour.",
      body: [
        "When a seller has several offers, they compare how likely each buyer is to close. A pre-qualification is a lender's estimate. A pre-approval means the lender has reviewed your income, assets and credit. The strongest letters come from a lender who has already underwritten your file.",
        "Have your proof of funds ready too: recent statements that show your deposit, down payment and closing costs. When the right house shows up, we can write the offer that night.",
      ],
      iDo: [
        "Connect you with lenders I trust who answer the phone on offer day",
        "Have your lender match the pre-approval letter to the exact price of each offer",
      ],
      youDo: [
        "Get pre-approved with a lender who will take a listing agent's call",
        "Gather two months of bank statements for proof of funds",
        "Keep your deposit, about 3% of the price, ready to wire within days",
      ],
      goodToKnow: [
        "A letter from a local lender the listing agent knows can carry extra weight",
        "Hold off on new credit cards, car loans and large unexplained deposits while you're shopping",
      ],
      ptkSteps: ["pre-approval"],
      ptkDocs: ["PRE", "POF"],
    },
    {
      slug: "read-the-packet",
      part: 1,
      title: "Read the disclosure packet before you bid",
      summary: "Most competitive listings share inspections and disclosures up front. Reading them first lets you bid with confidence.",
      body: [
        "Most competitive listings come with a disclosure packet: the seller's disclosures, a home inspection, a pest report, and often a roof or sewer report. These reports are what let buyers write offers without an inspection contingency.",
        "I read the full packet and give you a plain-English summary of what matters. With 15 years in construction, I can put a rough cost on the repairs I see, so you know what you're taking on before you name a price.",
        "If a finding needs a closer look, I bring in a contractor, pest inspector or engineer from my network before the offer date.",
      ],
      iDo: [
        "Read the full packet and summarize it for you",
        "Give you rough repair costs before you write",
        "Line up a contractor or engineer for a second look when a finding needs it",
      ],
      youDo: ["Read my summary and ask about anything that worries you", "Decide which issues you can live with and budget for"],
      goodToKnow: [
        "Pest reports split findings into Section 1, active damage, and Section 2, conditions likely to lead to damage",
        "Anything disclosed in the packet is something you knew about before you bid, which makes it harder to negotiate later",
      ],
      ptkSteps: ["disclosure-packet"],
      ptkDocs: ["TDS", "SPQ", "PREINS", "NHD", "AVID"],
    },
    {
      slug: "walk-away-number",
      part: 1,
      title: "Set your walk-away number",
      summary: "Decide the most you'll pay before offer day, while you can still think clearly.",
      body: [
        "Offer day moves fast, and it's easy to stretch. I ask every client to set a walk-away number before we write: the highest price you'd still feel good about if you won.",
        "We build it from three things: what similar homes have sold for, what the repairs will cost, and what your monthly payment looks like at that price. Then we decide how much of that number goes in the first offer and how much we hold for a counter.",
      ],
      iDo: ["Show you comparable sales and where this home fits", "Run your monthly payment at a few prices with your lender"],
      youDo: ["Pick a number you'd be glad to pay and at peace losing at", "Share it with me so I can keep us steady on offer day"],
      goodToKnow: ["If a home sells above your walk-away number, it sold at a price that wasn't right for you"],
      ptkSteps: ["cma"],
      ptkDocs: ["CMA"],
    },
    {
      slug: "offer-price",
      part: 2,
      title: "Pricing your offer",
      summary: "Start from recent sales and the competition, then decide how much room to leave for a counter.",
      body: [
        "Your offer price comes from comparable sales, the condition of the home, and how many buyers are competing. Before we write, I call the listing agent to learn how many offers to expect and how the seller plans to respond.",
        "If the seller is likely to counter everyone, we can hold part of your walk-away number for the second round. If the seller wants one clean round, we lead with your best.",
      ],
      iDo: ["Recommend a price based on comps and the competition", "Learn from the listing agent how the seller plans to respond"],
      youDo: ["Decide your opening price and what you'll hold back"],
      goodToKnow: ["Price is the first thing a seller sees. Terms often decide between offers that are close"],
      ptkSteps: ["offer-strategy"],
      ptkDocs: ["RPA"],
    },
    {
      slug: "contingencies",
      part: 2,
      title: "Contingencies: keep, shorten or remove",
      summary: "Fewer and shorter contingencies make an offer stronger. Here's how to do it safely.",
      body: [
        "A contingency lets you cancel and keep your deposit if something goes wrong with the inspection, the appraisal or the loan. Sellers favor offers with fewer of them, because each one is a way for the deal to fall apart.",
        "My usual timelines are 14 days for inspections and the appraisal and 17 days for the loan. In a competitive situation we often shorten them or remove them. Removing one is safest once the risk is already covered: the packet is read and repairs are priced, your lender has underwritten your file, and you have cash ready for a low appraisal.",
        "Once a contingency is removed, your deposit is at risk if you can't close for that reason. We go through each one together, and you make the final call.",
      ],
      iDo: ["Walk you through what each contingency protects", "Help you cover the risk before you remove one"],
      youDo: ["Decide which contingencies to keep, shorten or remove"],
      goodToKnow: [
        "Waiving contingencies is common in the East Bay. Do it with the risk already handled",
        "Shorter windows can win a seller over while you keep your protection",
      ],
      ptkSteps: ["offer-strategy", "contingency-removal"],
      ptkDocs: ["RPA", "CR"],
    },
    {
      slug: "appraisal-gap",
      part: 2,
      title: "Covering an appraisal gap",
      summary: "If the home appraises below your price, the difference comes from your cash.",
      body: [
        "Your lender lends based on the lower of your price or the appraised value. When a home sells well over list, the appraisal can come in below the price, and the gap has to be covered in cash on top of your down payment.",
        "Here's an example. On a $1,200,000 offer with 20% down, an appraisal at $1,150,000 means the lender lends 80% of $1,150,000, or $920,000. You would bring $280,000 in total: $230,000 down plus the $50,000 gap.",
        "Offering to cover a gap tells the seller a low appraisal won't sink the deal. We decide ahead of time how much you can cover, and we can put a limit on it in the offer.",
      ],
      iDo: ["Work out with your lender how much gap you can cover", "Write the offer so the seller sees that commitment"],
      youDo: ["Confirm the cash you can put toward a gap"],
      goodToKnow: ["You can keep an appraisal contingency and still offer to cover part of a gap"],
      ptkSteps: ["appraisal"],
      ptkDocs: ["APPR"],
    },
    {
      slug: "deposit-and-close",
      part: 2,
      title: "Deposit and closing timeline",
      summary: "A solid deposit and a closing date that fits the seller's plans.",
      body: [
        "The standard deposit is 3% of the price, due within three business days of acceptance. It goes into escrow and counts toward your down payment.",
        "Closing timing matters to sellers. Some need a fast close to buy their next home. Others need extra time to move. My usual escrow is 21 days, and we adjust it to whatever helps the seller most.",
      ],
      iDo: ["Find out the seller's ideal closing date before we write", "Coordinate with your lender so the timeline holds"],
      youDo: ["Have your deposit ready to wire", "Tell me how flexible your move-in date is"],
      goodToKnow: ["Before you wire anything, call escrow at a number you looked up yourself to confirm the instructions"],
      ptkSteps: ["escrow-and-deposit"],
      ptkDocs: ["EMD", "ESC"],
    },
    {
      slug: "seller-friendly-terms",
      part: 2,
      title: "Terms that help the seller",
      summary: "A rent-back, a flexible close or a no-repairs offer can beat a higher price.",
      body: [
        "When offers are close on price, terms decide. The strongest terms solve a problem the seller actually has, so I ask the listing agent what matters before we write.",
        "Common ones: a rent-back that lets the seller stay in the home for a short time after closing, a closing date that matches their next move, agreeing not to ask for repairs, or covering some of the seller's closing costs.",
      ],
      iDo: ["Learn the seller's priorities from the listing agent", "Suggest the terms that solve their biggest problem"],
      youDo: ["Decide which terms you're comfortable offering"],
      goodToKnow: ["A rent-back needs a short written agreement covering rent, a deposit and the condition of the home at move-out"],
      ptkSteps: ["offer-strategy"],
      ptkDocs: ["RPA"],
    },
    {
      slug: "escalation-and-letters",
      part: 2,
      title: "Escalation clauses and buyer letters",
      summary: "Two tactics buyers ask about, and how I handle them.",
      body: [
        "An escalation clause says you'll beat the highest offer by a set amount, up to a cap. Whether one helps depends on the seller and the listing agent, so I ask before we include one.",
        "Buyer letters about your family and why you love the home used to be common. Many listing agents no longer pass them along, because personal details can raise fair housing concerns. I put that energy into a cover note from me about your financing, timing and terms.",
      ],
      iDo: ["Write a cover note to the listing agent that shows your strength as a buyer"],
      youDo: ["Put your best number in writing"],
      goodToKnow: ["Ask me before you include any personal letter with an offer"],
      ptkSteps: ["submitting-the-offer"],
      ptkDocs: ["RPA"],
    },
    {
      slug: "pre-emptive-offers",
      part: 3,
      title: "Pre-emptive offers",
      summary: "Offering before the offer date can win a home, if the offer is strong enough to stop the clock.",
      body: [
        "Some sellers will look at an offer before the scheduled offer date. A pre-emptive offer has to be strong enough that the seller would rather take it now than wait for the crowd, and it usually gives the seller only a short time to respond.",
        "Before we write one, I ask the listing agent whether the seller will consider early offers. If they will, we need the packet reviewed, your financing ready, and a price that reflects what the home would likely bring on offer day.",
      ],
      iDo: ["Find out whether the seller is open to early offers", "Tell you when a pre-emptive offer makes sense and when to wait"],
      youDo: ["Be ready to move fast and commit to a strong number"],
      goodToKnow: ["Some sellers respond to an early offer by moving up the offer date for everyone"],
      ptkSteps: ["submitting-the-offer"],
      ptkDocs: ["RPA", "PRE", "POF"],
    },
    {
      slug: "offer-day",
      part: 3,
      title: "What happens on offer day",
      summary: "Offers come in, the seller compares them, and most buyers hear back that night or the next day.",
      body: [
        "On the offer date, the listing agent collects every offer and walks the seller through them: price, contingencies, closing date, financing and any extra terms.",
        "The seller can accept one, counter one, or send a multiple counter offer to several buyers asking for their best and final terms. A multiple counter becomes binding only after the seller signs it again, so even if you accept, the seller still chooses.",
        "I stay in touch with the listing agent through the evening, so you hear where you stand as soon as I do.",
      ],
      iDo: ["Present your offer and follow up with the listing agent", "Tell you what changed in a counter and what I'd recommend"],
      youDo: ["Keep your phone close on offer night", "Decide on any counter with me before its deadline"],
      goodToKnow: ["You're in contract once the signed acceptance is delivered back"],
      ptkSteps: ["seller-response", "acceptance"],
      ptkDocs: ["SCO", "SMCO"],
    },
    {
      slug: "best-and-final",
      part: 3,
      title: "Best and final: answering a multiple counter",
      summary: "When the seller asks for best and final, it's your last chance to improve your offer.",
      body: [
        "A multiple counter offer usually asks every buyer to send their highest and best terms by a deadline. This is the moment to use the room you held back from your walk-away number.",
        "Price is one lever. Shortening a contingency, covering more of an appraisal gap or matching the seller's closing date can also move you to the top.",
        "If the seller signs back with you, the contract is formed when that signed counter is delivered. That's Day 0, and every deadline starts counting.",
      ],
      iDo: ["Help you decide what to improve and what to hold", "Get your response in well before the deadline"],
      youDo: ["Go back to your walk-away number and decide how close to go"],
      goodToKnow: ["Answer only the terms the counter asks about. Changing other terms turns your reply into a new counter"],
      ptkSteps: ["seller-response", "acceptance"],
      ptkDocs: ["SMCO", "BCO"],
    },
    {
      slug: "if-you-dont-win",
      part: 3,
      title: "If you don't win",
      summary: "Losing a house you wanted is hard. A backup offer and a quick debrief set you up for the next one.",
      body: [
        "Losing a house you wanted stings. It also teaches us a lot about the market you're shopping in.",
        "Ask to be in backup position. If the accepted buyer's deal falls apart, the seller can move to you without going back on the market.",
        "Then we debrief: what the winning offer looked like, if the listing agent will share it, the final sale price once it closes, and what we'd change next time. Each round makes your next offer sharper.",
      ],
      iDo: ["Ask the listing agent about the winning terms", "Put a backup offer in place when it makes sense"],
      youDo: ["Take a day, then get back out there with what we learned"],
      goodToKnow: ["A backup offer usually lets you cancel if you find another home first"],
      ptkSteps: ["seller-response"],
      ptkDocs: [],
    },
  ] as MoTopic[],
  faq: [
    {
      q: "How much over asking do East Bay homes sell for?",
      a: "It changes by city and by month. My city playbooks track how far over list recent sales went in El Cerrito, Albany, Berkeley and Oakland, and I pull current comps for every home before we write.",
      topic: "why-homes-list-low",
    },
    {
      q: "Should I waive contingencies?",
      a: "Waiving is common here. Do it once the risk is covered: the packet read and repairs priced, your loan underwritten, and cash ready for a low appraisal.",
      topic: "contingencies",
    },
    {
      q: "What is a multiple counter offer?",
      a: "A counter the seller sends to several buyers at once, usually asking for best and final terms. It becomes binding only after the seller signs it again.",
      topic: "offer-day",
    },
    {
      q: "Do buyer love letters help?",
      a: "Many listing agents no longer pass them along because of fair housing concerns. A cover note about your financing and terms carries more weight.",
      topic: "escalation-and-letters",
    },
    {
      q: "What is an appraisal gap?",
      a: "The difference between your price and a lower appraised value. Your lender lends on the lower number, so you cover the gap in cash.",
      topic: "appraisal-gap",
    },
    {
      q: "Can I make an offer before the offer date?",
      a: "Sometimes. If the seller will look at early offers, a strong pre-emptive offer can win the home before the crowd arrives.",
      topic: "pre-emptive-offers",
    },
    {
      q: "What should I do if I lose?",
      a: "Ask to be in backup position, then debrief on the winning terms. Each round sharpens your next offer.",
      topic: "if-you-dont-win",
    },
  ],
};

export const moTopicBySlug = (slug: string) => MO.topics.find((t) => t.slug === slug);
export const moTopicNumber = (t: MoTopic) => MO.topics.indexOf(t) + 1;
