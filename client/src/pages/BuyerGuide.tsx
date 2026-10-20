import { useLocation } from "wouter";
import type { CSSProperties } from "react";
import { TrailPage, PageHero, Acts, BookButton, Section, Route, Rows, CloseBand, Crumb, Arrow } from "@/components/trail/Parts";
import { CITIES, type CitySlug } from "@/lib/trail";
import { getBuyerGuideBySlug } from "@/lib/buyerGuideData";
import { getBlogPostBySlug, isPublished } from "@/lib/content";
import NotFound from "@/pages/not-found";

/** One page per core city: /buying-in-<slug>. Built from that city's buyer playbook.
 *  FAQPage and BreadcrumbList JSON-LD come from seo.ts. */
export default function BuyerGuide() {
  const [location] = useLocation();
  const slug = location.replace(/^\/buying-in-/, "").replace(/\/$/, "") as CitySlug;
  const c = CITIES[slug];
  if (!c) return <NotFound />;
  const faqs = getBuyerGuideBySlug(slug)?.faqs ?? [];
  const posts = c.posts
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is NonNullable<typeof p> => !!p && isPublished(p))
    .map((p) => ({
      title: p.title,
      meta: new Date(p.publishedAt + "T12:00").toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      href: `/blog/${p.slug}`,
    }));

  return (
    <TrailPage>
      <div style={{ "--c": c.color } as CSSProperties}>
        <PageHero
          title={`Buying in ${c.name}`}
          lede={c.lede}
          pre={<Crumb trail={[{ label: "Neighborhoods", href: "/neighborhoods" }, { label: c.name }]} color={c.color} />}
        >
          <div className="statband num">
            <div><b>{c.median}</b><span>Median sale price</span></div>
            <div><b>{c.saleToList}</b><span>Sale to list</span></div>
            <div><b>{c.daysOnMarket}</b><span>Days on market</span></div>
            <div><b>{c.overAsking}</b><span>Sold over asking</span></div>
          </div>
          <p className="src">
            {c.scope}, {c.sales} MLS sales.
          </p>
          <Acts>
            <a className="btn go" href={c.playbookUrl} data-testid="button-playbook">
              Get the {c.name} playbook
            </a>
            <BookButton />
          </Acts>
        </PageHero>

        <Section title="How a listing moves" intro="About two weeks to tour, read disclosures, and build your offer. We start prepping yours on day one.">
          <Route
            steps={[
              { title: "Days 1 to 3", body: "Listing goes live, usually midweek." },
              { title: "Two weekends", body: "Back-to-back weekends of open houses." },
              { title: "Around day 14", body: "Offers due, usually midweek after the second weekend." },
            ]}
          />
        </Section>

        <Section title="What a winning offer looks like" intro={`${c.overListLine}${c.offerIntro ? " " + c.offerIntro : ""}`}>
          <div className="terms">
            {c.offer.map((t) => (
              <div className="term" key={t.title}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Taxes and city rules">
          <div className="terms">
            {c.taxes.map((t) => (
              <div className="term" key={t.title}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                {t.link && (
                  <a href={t.link.href} target="_blank" rel="noopener noreferrer">
                    {t.link.label} <Arrow />
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>

        <section className="s" style={{ paddingTop: 0, borderTop: "none" }}>
          <div className="w">
            <div className="pb">
              <div>
                <h3>The {c.name} buyer playbook</h3>
                <p>All of this on one page you can save, print, or send to your lender.</p>
              </div>
              <a className="btn go" href={c.playbookUrl}>
                Open the playbook
              </a>
            </div>
          </div>
        </section>

        {faqs.length > 0 && (
          <Section title={`Questions about buying in ${c.name}`}>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="a">{f.a}</div>
                </details>
              ))}
            </div>
          </Section>
        )}

        {posts.length > 0 && (
          <Section title={`Reading on ${c.name}`}>
            <Rows items={posts} />
          </Section>
        )}

        <CloseBand title={`Thinking about ${c.name}?`} />
      </div>
    </TrailPage>
  );
}
