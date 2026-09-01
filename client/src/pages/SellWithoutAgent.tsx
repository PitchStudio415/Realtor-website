import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SITE = "https://muzamilkhanrealtor.com";
const PATH = "/selling-without-an-agent-el-cerrito";

const FAQS = [
  {
    q: "Do I still have to pay a buyer's agent if I sell without an agent?",
    a: "Not automatically. Since the 2024 industry commission changes, the buyer's agent fee is negotiated separately and is no longer assumed. Many buyers still come with an agent and expect the seller to contribute toward that agent's fee, so most FSBO sellers offer something to stay competitive. You decide the amount, and it is negotiable in the contract.",
  },
  {
    q: "How much is real estate commission in the East Bay?",
    a: "Total commission is negotiable and typically runs in the range of 4 to 6 percent of the sale price when two agents are involved, split between the listing side and the buyer's side. Selling on your own removes the listing-side fee but usually not the buyer-side contribution. On a higher-priced East Bay home, even one side is real money, which is exactly why FSBO is tempting here.",
  },
  {
    q: "Can I list my home on the MLS without an agent?",
    a: "Not directly. Only licensed members can post to the local MLS. FSBO sellers who want MLS exposure use a flat-fee MLS service, which lists your home for a set fee while you handle showings and negotiation. Without the MLS your home is missing from Zillow, Redfin, and Realtor.com syndication, which is where most East Bay buyers actually look.",
  },
  {
    q: "What disclosures do I legally have to give in California?",
    a: "California requires a full set of seller disclosures regardless of whether you use an agent, including the Transfer Disclosure Statement (TDS), the Natural Hazard Disclosure (NHD), a lead-based paint disclosure for older homes, and local and state add-ons. Getting these wrong is the most common way a FSBO sale turns into a legal problem after closing, so this is the piece most worth taking seriously.",
  },
  {
    q: "Is listing on Zillow FSBO enough to sell my home?",
    a: "It gets you visibility, but Zillow's FSBO listings sit in a separate, less-trafficked view than agent listings and do not syndicate the same way. Pricing, photography, disclosure handling, and negotiation still fall entirely on you. It can work for a clean, well-priced home in a hot pocket, and it leaves money on the table more often than sellers expect.",
  },
  {
    q: "What is the biggest risk of selling without an agent?",
    a: "Mispricing and disclosure gaps. Price too high and the home sits, which costs you far more than any commission you saved. Miss a required disclosure and you can face a claim after the sale closes. A construction background helps here: I can tell you what a buyer's inspector will flag and what it actually costs, so nothing blows up your deal late.",
  },
];

function Faq({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`faq-toggle-${i}`}
      >
        <span className="font-medium text-base">{q}</span>
        {open ? <ChevronUp className="w-4 h-4 flex-shrink-0 text-primary" /> : <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />}
      </button>
      {open && <p className="pb-4 text-muted-foreground leading-relaxed text-sm md:text-base">{a}</p>}
    </div>
  );
}

/** Answer-engine target for "selling home without an agent in El Cerrito" (FSBO). */
export default function SellWithoutAgent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "How I Help Sellers", item: `${SITE}/sell` },
      { "@type": "ListItem", position: 3, name: "Selling Without an Agent", item: `${SITE}${PATH}` },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-[#071B2C] text-white py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-white/50 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/sell" className="hover:text-white">How I Help Sellers</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80">Selling Without an Agent</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Selling Your El Cerrito Home Without an Agent: An Honest Look at FSBO
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            You can absolutely sell your own home, and sometimes it is the right call. Here is a straight, no-spin
            breakdown of what you save, what you take on, and when going it alone actually pays off in the East Bay,
            from an agent who will tell you the truth even when it costs me the listing.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-10 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary">
            <p>
              FSBO stands for "for sale by owner," which simply means you sell your home yourself instead of hiring a
              listing agent. The appeal is obvious: on an East Bay home, the listing-side commission is a meaningful
              chunk of money. The question is not whether you <em>can</em> do it. You can. The question is whether the
              money you save outweighs the work, risk, and pricing power you give up.
            </p>

            <h2>What you save, and what you take on</h2>
            <p>
              Selling on your own removes the listing agent's fee. It does not remove the work that fee pays for. Here is
              the honest split of what moves onto your plate.
            </p>

            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-3 font-semibold">Job to be done</th>
                    <th className="text-left p-3 font-semibold">With a listing agent</th>
                    <th className="text-left p-3 font-semibold">On your own (FSBO)</th>
                  </tr>
                </thead>
                <tbody className="[&_td]:p-3 [&_td]:border-t [&_td]:border-border [&_td]:align-top">
                  <tr><td>Pricing</td><td>Comparable sales analysis and pricing strategy</td><td>You research comps and set the price</td></tr>
                  <tr><td>Prep and photos</td><td>Staging advice, pro photography, listing copy</td><td>You arrange and pay for prep and media</td></tr>
                  <tr><td>MLS and syndication</td><td>Full MLS plus Zillow, Redfin, Realtor.com</td><td>Flat-fee MLS service, or FSBO listings only</td></tr>
                  <tr><td>Showings</td><td>Agent schedules and hosts</td><td>You handle every call and showing</td></tr>
                  <tr><td>Disclosures</td><td>Managed and reviewed for completeness</td><td>You complete all California disclosures</td></tr>
                  <tr><td>Negotiation</td><td>Agent negotiates price, credits, repairs</td><td>You negotiate directly with buyers and their agents</td></tr>
                  <tr><td>Escrow to close</td><td>Agent coordinates timeline and contingencies</td><td>You track deadlines and paperwork</td></tr>
                </tbody>
              </table>
            </div>

            <h2>When selling without an agent can make sense</h2>
            <ol>
              <li>You already have a buyer, such as a neighbor, relative, or tenant, and only need help with the paperwork.</li>
              <li>Your home is in a hot pocket where well-priced listings sell fast with little marketing.</li>
              <li>You have sold before, are comfortable with contracts and deadlines, and have time to run showings.</li>
              <li>You are willing to pay for a real estate attorney or transaction coordinator to backstop the legal side.</li>
            </ol>

            <h2>When it usually costs more than it saves</h2>
            <p>
              The two most expensive FSBO mistakes are mispricing and disclosure gaps. Price too high and the home sits,
              collects days on market, and eventually sells for less than it would have with a sharp price from day one.
              That loss almost always dwarfs the commission you set out to save. Miss a required California disclosure and
              a buyer can come back after closing with a claim. Neither risk shows up until it is expensive.
            </p>

            <h2>The middle path most sellers miss</h2>
            <p>
              It is not simply "full agent" or "totally alone." A flat-fee MLS service gets you on the MLS while you run
              the rest. A limited-service listing hands you specific pieces. And a full-service agent is negotiable on
              both fee and scope. When I price my own service, I am transparent about what you get for it, and if your
              situation genuinely points to FSBO, I will tell you.
            </p>

            <h2>If you still want to sell it yourself, do this in order</h2>
            <ol>
              <li>Pull real comparable sales for your specific street and home type, not a Zestimate.</li>
              <li>Get a pre-listing inspection so you know what a buyer's inspector will find first.</li>
              <li>Complete your California disclosures early: TDS, NHD, lead paint for older homes, and local add-ons.</li>
              <li>Decide your buyer-agent contribution and put it in writing before you market.</li>
              <li>Invest in photography and a flat-fee MLS listing so buyers actually see the home.</li>
              <li>Line up a real estate attorney or transaction coordinator for contract and escrow support.</li>
            </ol>

            <p>
              A construction background is the part I bring that most sellers cannot buy off the shelf. Before you list,
              I can walk your home and tell you what an inspector will flag, what is cosmetic, and what is a real repair,
              so a late surprise does not cost you the deal or a price cut at the worst moment.
            </p>
          </article>

          <div className="mt-10 rounded-xl bg-muted/40 border border-border p-6">
            <h2 className="text-xl font-bold mb-3">Want a straight answer for your specific home?</h2>
            <p className="text-muted-foreground mb-5">
              Tell me your address and timeline. I will give you an honest read on whether FSBO fits, what your home is
              likely worth, and the cleanest path to sell it well. No pressure, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/home-valuation"><Button className="w-full sm:w-auto">Get a real home valuation<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
              <a href="tel:+14158198312"><Button variant="outline" className="w-full sm:w-auto"><Phone className="w-4 h-4 mr-2" />415-819-8312</Button></a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16 bg-muted/40 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Selling Without an Agent: FAQ</h2>
          <div>
            {FAQS.map((f, i) => <Faq key={i} q={f.q} a={f.a} i={i} />)}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/sell"><Button variant="ghost">How I Help Sellers<ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
            <Link href="/seller-hub"><Button variant="ghost">Seller Education Hub<ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
