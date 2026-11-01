import { Link } from "wouter";
import { TrailPage, PageHero, Acts, BookButton, Crumb, Section, CloseBand, Arrow } from "@/components/trail/Parts";
import { MO, moTopicNumber, moTopicPath } from "@/lib/multipleOffers";
import { PTK_BASE } from "@/lib/ptk";

export default function MultipleOffers() {
  return (
    <TrailPage>
      <PageHero
        pre={<Crumb trail={[{ label: "Buy", href: "/buy" }, { label: "Winning Multiple Offers" }]} />}
        title="How to win a home in multiple offers"
        lede="Competitive East Bay homes often draw several offers. Here's how I get my clients ready to compete, from the first tour to best and final."
      >
        <Acts>
          <BookButton label="Book a buyer consult" className="btn go" />
          <a className="btn alt" href="#part-1">
            Start reading
          </a>
        </Acts>
      </PageHero>

      {MO.parts.map((p) => (
        <Section key={p.number} id={`part-${p.number}`} title={`${p.number}. ${p.title}`} intro={p.intro}>
          <div className="mo-list">
            {MO.topics
              .filter((t) => t.part === p.number)
              .map((t) => (
                <Link key={t.slug} className="mo-item" href={moTopicPath(t.slug)}>
                  <span className="n">{moTopicNumber(t)}</span>
                  <span>
                    <b>{t.title}</b>
                    <span className="s">{t.summary}</span>
                  </span>
                  <span className="arr"><Arrow /></span>
                </Link>
              ))}
          </div>
        </Section>
      ))}

      <Section title="Common questions" intro="Short answers. Each one links to the page that covers it in full.">
        <div className="faq">
          {MO.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="a">
                {f.a} <Link href={moTopicPath(f.topic)}>Read more <Arrow /></Link>
              </div>
            </details>
          ))}
        </div>
        <p className="intro" style={{ marginTop: 36 }}>
          Once your offer is accepted, <Link href={PTK_BASE} style={{ fontWeight: 800, color: "var(--ink)" }}>Path to Keys</Link> walks you through every step from escrow to the keys.
        </p>
        <p className="tblnote" style={{ marginTop: 18 }}>{MO.meta.disclaimer}</p>
      </Section>

      <CloseBand title="Competing for a home right now?" sub="Send me the listing. I'll tell you what it will likely take to win." />
    </TrailPage>
  );
}
