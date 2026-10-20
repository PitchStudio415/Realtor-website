import { Link, useParams } from "wouter";
import type { CSSProperties } from "react";
import { TrailPage, PageHero, Section, CloseBand, Crumb, Arrow } from "@/components/trail/Parts";
import { CITIES, CITY_CARD_ORDER, NEARBY, cityPath } from "@/lib/trail";
import { getNeighborhoodBySlug } from "@/lib/content";
import NotFound from "@/pages/not-found";

function CityCard({ slug }: { slug: (typeof CITY_CARD_ORDER)[number] }) {
  const c = CITIES[slug];
  return (
    <div className="card" style={{ "--c": c.color } as CSSProperties} data-testid={`card-city-${slug}`}>
      <div className="hd">
        <span className="pin big" />
        <h2>
          {c.name}
          {slug === "oakland" ? "*" : ""}
        </h2>
      </div>
      <p className="note">{c.note}</p>
      <div className="quad num">
        <div><b>{c.median}</b><span>Median price</span></div>
        <div><b>{c.saleToList}</b><span>Sale to list</span></div>
        <div><b>{c.daysOnMarket}</b><span>On market</span></div>
        <div><b>{c.overAsking}</b><span>Sold over asking</span></div>
      </div>
      <div className="links">
        <Link href={cityPath(slug)}>City page <Arrow /></Link>
        <a href={c.playbookUrl}>Buyer playbook <Arrow /></a>
      </div>
    </div>
  );
}

/** A remaining nearby-city stub like /neighborhoods/kensington. */
function NeighborhoodDetail({ slug }: { slug: string }) {
  const hood = getNeighborhoodBySlug(slug);
  if (!hood) return <NotFound />;
  return (
    <TrailPage>
      <PageHero
        title={hood.name}
        lede={hood.overview}
        pre={<Crumb trail={[{ label: "Neighborhoods", href: "/neighborhoods" }, { label: hood.name }]} />}
      />
      <Section title="Homes here">
        <div className="prose" style={{ maxWidth: 720, marginTop: 20 }}>
          <p>{hood.housingStock}</p>
        </div>
      </Section>
      <Section title="Day to day">
        <div className="prose" style={{ maxWidth: 720, marginTop: 20 }}>
          <p>{hood.lifestyle}</p>
          <p>{hood.whoItFits}</p>
        </div>
      </Section>
      <CloseBand title={`Thinking about ${hood.name}?`} />
    </TrailPage>
  );
}

export default function Neighborhoods() {
  const params = useParams<{ slug?: string }>();
  if (params.slug) return <NeighborhoodDetail slug={params.slug} />;

  return (
    <TrailPage>
      <PageHero
        title="Where I work"
        lede="Four cities I know block by block. Each one has the same four numbers, a city page, and a one-page buyer playbook."
      />
      <section className="s">
        <div className="w">
          <div className="cards">
            {CITY_CARD_ORDER.map((s) => (
              <CityCard key={s} slug={s} />
            ))}
          </div>
          <p className="src">Detached single-family homes, last 12 months, MLS. *Rockridge, Temescal &amp; the Oakland Hills.</p>
        </div>
      </section>
      <Section title="Nearby in West Contra Costa" intro="I live in El Cerrito and work these cities too.">
        <div className="near">
          {NEARBY.map((n) => (
            <Link key={n.name} href={n.href}>
              {n.name}
            </Link>
          ))}
        </div>
      </Section>
      <CloseBand title="Not sure which city fits?" sub="Text me your budget and commute. I'll tell you where to look." />
    </TrailPage>
  );
}
