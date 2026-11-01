import { DocDrawerProvider, DocLink } from "@/components/trail/DocDrawer";
import { TrailPage, PageHero, Acts, BookButton, Crumb, Section, Ways, Rows, Marker, CloseBand } from "@/components/trail/Parts";
import { sellerModules } from "@/lib/content";
import { DISCLOSURE_FAQ } from "@/lib/trail";

// /seller-hub/disclosures, rebuilt in the Trail Map style. SEO title and
// description still come from the "disclosures" seller module in content.ts.

const FORMS = [
  { abbr: "TDS", name: "Transfer Disclosure Statement", what: "Your knowledge of the home's condition: systems, repairs and known problems.", who: "You fill this out" },
  { abbr: "SPQ", name: "Seller Property Questionnaire", what: "Follow-up questions on history, insurance claims, neighbors and past work.", who: "You fill this out" },
  { abbr: "NHD", name: "Natural Hazard Disclosure", what: "A third-party report on flood, fire and earthquake zones.", who: "Ordered from a report company" },
  { abbr: "AVID", name: "Agent Visual Inspection Disclosure", what: "My own walkthrough notes on what I can see in the home.", who: "I complete this" },
  { abbr: "LEAD", name: "Lead-Based Paint Disclosure", what: "Required for homes built before 1978.", who: "You sign this" },
  { abbr: "PREINS", name: "Pre-listing inspections", what: "Home and pest inspections before you list, so buyers bid with full information.", who: "Recommended" },
];

const DISCLOSE = [
  "Past repairs and why they were needed",
  "Known defects, even if repaired",
  "Insurance claims",
  "Permit status of work on the home",
  "HOA issues",
  "Neighborhood nuisances",
  "A death on the property in the last 3 years",
];

export default function SellerDisclosures() {
  return (
    <TrailPage>
      <DocDrawerProvider>
        <PageHero
          pre={<Crumb trail={[{ label: "Sell", href: "/sell" }, { label: "Disclosures" }]} />}
          title="Seller disclosures in California"
          lede="If you know about it, disclose it. Here's what California asks of sellers, what to include, and how I help you get it right."
        >
          <Acts>
            <BookButton label="Book a seller consult" className="btn go" />
          </Acts>
        </PageHero>

        <Section title="The forms" intro="Tap any form to see what it covers.">
          <div className="doclist">
            {FORMS.map((f) => {
              const inner = (
                <>
                  <span className="ab">{f.abbr === "LEAD" ? "Pre-1978" : f.abbr}</span>
                  <span className="n">{f.name}</span>
                  <span className="p">{f.what}</span>
                  <span className="who">{f.who}</span>
                </>
              );
              return f.abbr === "LEAD" ? (
                <div key={f.abbr} className="doc">{inner}</div>
              ) : (
                <DocLink key={f.abbr} abbr={f.abbr} className="doc">{inner}</DocLink>
              );
            })}
          </div>
        </Section>

        <Section title="What to disclose" intro="The rule is simple: if you know about it, disclose it. That includes:">
          <ul className="dis-list">
            {DISCLOSE.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </Section>

        <Section title="What happens if a seller doesn't disclose?">
          <div className="pair">
            <div>
              <h3>
                <span className="mk-s"><Marker shape="circle" color="#2c7a4f" /></span>Disclose up front
              </h3>
              <ul>
                <li>Buyers bid with confidence</li>
                <li>Fewer surprises after their inspection</li>
                <li>You're protected after closing</li>
              </ul>
            </div>
            <div>
              <h3>
                <span className="mk-s"><Marker shape="diamond" color="#c2461a" /></span>Leave it out
              </h3>
              <ul>
                <li>The buyer may be able to cancel during escrow</li>
                <li>The buyer can sue after closing</li>
                <li>Deals fall apart late, when it costs you most</li>
              </ul>
            </div>
          </div>
          <div className="gtk" style={{ maxWidth: 820 }}>
            <h3>My advice</h3>
            <p>Disclose everything. Most issues, disclosed up front, don't kill deals. Surprises do.</p>
          </div>
        </Section>

        <Section title="How I help">
          <Ways
            items={[
              { icon: "house", title: "I walk the home first", body: "15 years in construction help me spot what belongs in your disclosures and what a buyer's inspector will flag." },
              { icon: "list", title: "I review your forms", body: "We go through your disclosures and pre-inspections together, so buyers get a clear, complete story." },
              { icon: "route", title: "Pre-inspections, lined up", body: "Home and pest inspectors I trust, scheduled before you list, so buyers can bid with fewer contingencies." },
              { icon: "data", title: "Real repair numbers", body: "Contractors and engineers from my network price anything that comes up, so you decide from facts." },
            ]}
          />
          <p className="tblnote" style={{ marginTop: 28 }}>
            General information, not legal advice. For your specific situation, talk with a real estate attorney.
          </p>
        </Section>

        <Section title="Common questions">
          <div className="faq">
            {DISCLOSURE_FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="a">{f.a}</div>
              </details>
            ))}
          </div>
        </Section>

        <Section title="More seller guides">
          <Rows
            items={[
              { title: "Selling a home without an agent in El Cerrito", meta: "An honest FSBO breakdown", href: "/selling-without-an-agent-el-cerrito" },
              ...sellerModules
                .filter((m) => m.slug !== "disclosures" && m.slug !== "glossary")
                .map((m) => ({ title: m.title, meta: m.description, href: `/seller-hub/${m.slug}` })),
            ]}
          />
        </Section>

        <CloseBand title="Getting ready to sell?" sub="Text or call. I'll walk your home and tell you what to disclose and what to fix." />
      </DocDrawerProvider>
    </TrailPage>
  );
}
