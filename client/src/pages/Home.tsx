import { Link } from "wouter";
import {
  TrailPage,
  TextMeButton,
  BookButton,
  Trailheads,
  ElevationProfile,
  CityHoverProvider,
  Ways,
  Stars,
  CloseBand,
  PtkCallout, MoCallout, Compare, Rows, Arrow } from "@/components/trail/Parts";
import { REVIEWS, START_HERE, BUYER_COMPARE } from "@/lib/trail";
import { getBlogPostBySlug } from "@/lib/content";
import { ptkPhaseCounts } from "@/lib/ptk";

export default function Home() {
  return (
    <TrailPage>
      <CityHoverProvider>
        <section className="hero">
          <div className="contours" aria-hidden="true" />
          <div className="w lead">
            <div>
              <h1 data-testid="text-hero-headline">Buying in the East Bay, mapped out.</h1>
              <p className="lede">
                I spent 15 years in construction before real estate. I read the house and the market, and I keep my client
                list small so you get my full attention.
              </p>
              <div className="acts">
                <TextMeButton />
                <BookButton />
              </div>
            </div>
            <img className="portrait" src="/muzamil-khan.jpg" alt="Muzamil Khan" width={420} height={525} />
          </div>
          <Trailheads />
        </section>

        <section className="s">
          <div className="w">
            <h2>From the flats to the hills</h2>
            <p className="intro">
              What the typical detached home sold for in each city over the last 12 months, from MLS sales. Every city has a
              one-page playbook with the full numbers and how to win an offer there.
            </p>
            <ElevationProfile />
          </div>
        </section>
      </CityHoverProvider>

      <PtkCallout counts={ptkPhaseCounts()}>
        <MoCallout />
        <div className="cmp-head">
          <h2>What I do vs. a standard realtor</h2>
          <p className="intro">How I handle each part of a purchase, next to the way it's commonly done.</p>
        </div>
        <Compare rows={BUYER_COMPARE} />
      </PtkCallout>

      <section className="s">
        <div className="w">
          <h2>What working with me looks like</h2>
          <Ways
            items={[
              { icon: "house", title: "I read the house", body: "15 years in construction help me read a property: what's solid, what may be wrong, and what it will take to fix. When a home needs a closer look or a repair, I bring in my network of inspectors and contractors." },
              { icon: "data", title: "I use the data", body: "Every city has a playbook built on MLS sales, so your number comes from comparable homes, not the list price." },
              { icon: "route", title: "I build the strategy", body: "The best price may not always win. Closing timing and contingencies count too, and we plan them before you write." },
              { icon: "focus", title: "You get my full attention", body: "I keep my client list small on purpose, so you're never waiting on a callback and we can move quickly when we find the right house." },
            ]}
          />
        </div>
      </section>

      <section className="s">
        <div className="w">
          <h2>Start here</h2>
          <p className="intro">Three short reads that answer what first-time East Bay buyers ask me most.</p>
          <div className="guides">
            {START_HERE.map(({ topic, slug }) => {
              const post = getBlogPostBySlug(slug);
              if (!post) return null;
              return (
                <Link key={slug} className="guide" href={`/blog/${slug}`}>
                  <span className="topic">{topic}</span>
                  <span className="t">{post.title}</span>
                  <span className="arr"><Arrow /></span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="s">
        <div className="w">
          <h2>Most-read guides</h2>
          <Rows
            items={[
              { title: "Selling a home without an agent in El Cerrito", meta: "An honest FSBO breakdown", href: "/selling-without-an-agent-el-cerrito" },
              { title: "West Contra Costa home prices: 2026 outlook", meta: "City by city", href: "/blog/west-contra-costa-county-market-outlook-2026" },
              { title: "Berkeley neighborhoods guide", meta: "From the flats to the hills", href: "/blog/berkeley-neighborhood-guide" },
              { title: "Oakland neighborhoods guide", meta: "Pocket by pocket", href: "/blog/oakland-neighborhood-guide" },
              { title: "Seller disclosures in California", meta: "What to disclose and why", href: "/seller-hub/disclosures" },
            ]}
          />
        </div>
      </section>

      <section className="s">
        <div className="w review">
          {REVIEWS.slice(0, 2).map((r) => (
            <div key={r.name}>
              <Stars />
              <blockquote>&ldquo;{r.short}&rdquo;</blockquote>
              <cite>
                {r.name}, {r.meta.replace(/, \w+ \d{4}$/, "")}
              </cite>
            </div>
          ))}
          <p style={{ gridColumn: "1/-1", marginTop: 8 }}>
            <Link href="/about#reviews" style={{ fontWeight: 800 }}>
              Read all reviews <Arrow />
            </Link>{" "}
            <span style={{ color: "var(--ink-2)" }}>&nbsp;5.0 on Google and Zillow</span>
          </p>
        </div>
      </section>

      <CloseBand title="Questions about a city or a house?" />
    </TrailPage>
  );
}
