import { Link } from "wouter";
import { TrailPage, PageHero, Acts, BookButton, Section, Route, Rows, Marker, CloseBand } from "@/components/trail/Parts";
import { getBlogPostBySlug } from "@/lib/content";

const steps = [
  { title: "Price it right", body: "Recent sales and current competition set the strategy." },
  { title: "Prep that pays", body: "Only the repairs and staging that earn their cost back." },
  { title: "Market it", body: "Professional photos, a clear story, and real exposure." },
  { title: "Compare offers", body: "Price, terms, and buyer strength side by side." },
  { title: "Escrow", body: "Inspections and requests handled with real repair numbers." },
  { title: "Close", body: "Final paperwork and your proceeds." },
];

const post = (slug: string) => {
  const p = getBlogPostBySlug(slug);
  return p ? { title: p.title, meta: new Date(p.publishedAt + "T12:00").toLocaleDateString("en-US", { month: "short", year: "numeric" }), href: `/blog/${slug}` } : null;
};

export default function Sell() {
  return (
    <TrailPage>
      <PageHero
        title="Selling your home in the East Bay"
        lede="Pricing from real sales, prep that pays for itself, and negotiation from someone who knows what every repair costs."
      >
        <Acts>
          <Link className="btn go" href="/home-valuation" data-testid="button-home-valuation">
            What is my home worth?
          </Link>
          <BookButton />
        </Acts>
      </PageHero>

      <Section title="Prep that pays for itself" intro="I spent 15 years in construction. Here is where your prep dollars come back at sale.">
        <div className="pair">
          <div>
            <h3>
              <span className="mk-s"><Marker shape="circle" color="#2c7a4f" /></span>Usually worth it
            </h3>
            <ul>
              <li>Deep cleaning and decluttering</li>
              <li>Fresh paint in neutral colors</li>
              <li>Minor repairs buyers will notice</li>
              <li>Curb appeal</li>
              <li>Staging a vacant home</li>
            </ul>
          </div>
          <div>
            <h3>
              <span className="mk-s"><Marker shape="diamond" color="#c2461a" /></span>Often not worth it
            </h3>
            <ul>
              <li>A major kitchen remodel</li>
              <li>Adding a bathroom</li>
              <li>High-end finishes above the neighborhood</li>
              <li>Installing a pool</li>
              <li>Very personal upgrades</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="How selling works">
        <Route steps={steps} />
      </Section>

      <Section title="Seller guides">
        <Rows
          items={[
            { title: "Pricing strategy", meta: "Comps and market read", href: "/seller-hub/pricing" },
            { title: "Disclosures", meta: "What to share and when", href: "/seller-hub/disclosures" },
            { title: "Evaluating offers", meta: "Beyond the price", href: "/seller-hub/evaluating-offers" },
            ...[post("repairs-vs-credits"), post("staging-worth-it")].filter((x): x is NonNullable<typeof x> => !!x),
            { title: "Selling without an agent", meta: "An honest look", href: "/selling-without-an-agent-el-cerrito" },
          ]}
        />
      </Section>

      <CloseBand title="Thinking about selling?" sub="Text or call. I'll tell you what your home would sell for today." />
    </TrailPage>
  );
}
