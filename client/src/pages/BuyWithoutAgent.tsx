import { TrailPage, PageHero, Acts, BookButton, Crumb, Section, Route, Rows, Marker, CloseBand, Compare } from "@/components/trail/Parts";
import { CITIES, NO_AGENT_FAQ } from "@/lib/trail";

// /buying-without-an-agent-el-cerrito: the buyer-side twin of the FSBO page.
// Title, description and FAQ schema come from seo.ts.

const ec = CITIES["el-cerrito"];

const steps = [
  { title: "Get pre-approved", body: "A lender's pre-approval letter goes with every offer. Get it before you tour." },
  { title: "Tour homes", body: "Open houses are open to anyone. For a private showing, call the listing agent." },
  { title: "Read the disclosures", body: "Ask the listing agent for the seller's disclosure packet and any inspection reports. Read them before you offer." },
  { title: "Write the offer", body: "Use the California Residential Purchase Agreement, or have a real estate attorney draft or review it." },
  { title: "Open escrow", body: "Wire your deposit, about 3% of the price, and put every contingency deadline on your calendar." },
  { title: "Inspect", body: "Hire your own home and pest inspectors. You choose them and you pay them." },
  { title: "Close", body: "Sign your loan and escrow documents. The loan funds, and the keys are yours." },
];

const ROWS = [
  { label: "Pricing your offer", me: "Your number comes from comparable sales, plus what the disclosures say about the home.", them: "You pull comps and set your number." },
  { label: "Disclosures", me: "I read the full packet and give you a plain-English summary of what matters.", them: "You read every page yourself." },
  { label: "Reading the house", me: "I walk it with you and point out what may need work and roughly what it would cost.", them: "Condition questions wait for your inspection." },
  { label: "Inspections", me: "I'm there in person and walk the findings with you.", them: "You hire the inspectors and sort through the reports." },
  { label: "Deadlines", me: "I track every contingency date for you.", them: "You track each date in the contract." },
  { label: "Negotiating repairs", me: "Credits and price changes backed by real repair numbers.", them: "You negotiate directly with the seller's agent." },
  { label: "Your team", me: "My lenders, insurance brokers, contractors, pest and general inspectors, and engineers.", them: "You find and vet each vendor yourself." },
];

export default function BuyWithoutAgent() {
  return (
    <TrailPage>
      <PageHero
        pre={<Crumb trail={[{ label: "Buy", href: "/buy" }, { label: "Buying without an agent" }]} />}
        title="Buying a home in El Cerrito without an agent"
        lede="You can buy a home here on your own. Here's how it works, what you'll handle yourself, and the steps where a second set of eyes pays off."
      >
        <Acts>
          <BookButton label="Book a buyer consult" className="btn go" />
        </Acts>
      </PageHero>

      <Section title="How it works on your own" intro="The same seven steps as any purchase. You run each one.">
        <Route steps={steps} />
      </Section>

      <Section title="Who the listing agent works for">
        <div className="pair">
          <div>
            <h3>
              <span className="mk-s"><Marker shape="circle" color="#2c7a4f" /></span>What they can do for you
            </h3>
            <ul>
              <li>Show you the home</li>
              <li>Share the disclosure packet and reports</li>
              <li>Answer factual questions about the home</li>
              <li>Tell you when offers are due</li>
            </ul>
          </div>
          <div>
            <h3>
              <span className="mk-s"><Marker shape="diamond" color="#c2461a" /></span>What they owe the seller
            </h3>
            <ul>
              <li>Their job is the best price and terms for the seller</li>
              <li>Advice on your price means representing you too</li>
              <li>That's dual agency, which needs written consent from you and the seller</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="What you take on" intro="Here's each job on your own, next to how I handle it for my buyers.">
        <Compare rows={ROWS} me="With me" them="On your own" />
      </Section>

      <Section title="El Cerrito specifics" intro="Local costs and rules to know before you write an offer.">
        <div className="gtk" style={{ maxWidth: 820 }}>
          <h3>Homes list low on purpose</h3>
          <p>
            {ec.overAsking} of El Cerrito homes sold over asking in the last 12 months, at a typical {ec.saleToList} of list price. Plan your number
            from recent sales, not the asking price.
          </p>
        </div>
        <ul className="dis-list">
          {ec.taxes.map((t) => (
            <li key={t.title}>
              <strong>{t.title}.</strong> {t.body}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="About buyer-agent fees">
        <div className="prose" style={{ maxWidth: 760 }}>
          <p>
            Buyers who work with an agent now sign a written agreement that sets the agent's fee before touring. You can ask the seller to pay
            some or all of it as part of your offer, and the seller decides.
          </p>
          <p>
            Buying on your own means no buyer-agent fee. Whether the seller passes any savings to you is up to the seller.
          </p>
        </div>
      </Section>

      <Section title="Common questions">
        <div className="faq">
          {NO_AGENT_FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="a">{f.a}</div>
            </details>
          ))}
        </div>
        <p className="tblnote" style={{ marginTop: 28 }}>
          General information, not legal advice. For your specific situation, talk with a real estate attorney.
        </p>
      </Section>

      <Section title="More buyer guides">
        <Rows
          items={[
            { title: "Buying in El Cerrito", meta: "Prices, offers and local taxes", href: "/buying-in-el-cerrito" },
            { title: "Path to Keys", meta: "Every step of a California purchase", href: "/buy/path-to-keys" },
            { title: "Winning multiple offers", meta: "How to compete and win", href: "/buy/winning-multiple-offers" },
            { title: "Selling a home without an agent in El Cerrito", meta: "The seller-side version", href: "/selling-without-an-agent-el-cerrito" },
          ]}
        />
      </Section>

      <CloseBand title="Want a second set of eyes?" sub="Text or call. I'll tell you how I'd approach the home you're looking at." />
    </TrailPage>
  );
}
