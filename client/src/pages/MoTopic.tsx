import { Link, useParams } from "wouter";
import { DocDrawerProvider, DocLink } from "@/components/trail/DocDrawer";
import { TrailPage, CloseBand, Arrow } from "@/components/trail/Parts";
import { MO, MO_BASE, moTopicBySlug, moTopicNumber, moTopicPath } from "@/lib/multipleOffers";
import { DOCS, stepBySlug, stepPath } from "@/lib/ptk";
import NotFound from "@/pages/not-found";

const PART_NAME = Object.fromEntries(MO.parts.map((p) => [p.number, p.title])) as Record<number, string>;

export default function MoTopic() {
  const { slug } = useParams<{ slug: string }>();
  const t = moTopicBySlug(slug);
  if (!t) return <NotFound />;
  const i = MO.topics.indexOf(t);
  const prev = MO.topics[i - 1];
  const next = MO.topics[i + 1];
  const near = MO.topics.slice(Math.max(0, i - 2), i + 3);
  const deeper = t.ptkSteps.map(stepBySlug).filter((s): s is NonNullable<typeof s> => !!s);
  const docs = t.ptkDocs.filter((a) => DOCS[a]);

  return (
    <TrailPage>
      <DocDrawerProvider>
        <section className="phero sp-hero">
          <div className="contours" aria-hidden="true" style={{ opacity: 0.45 }} />
          <div className="w">
            <Link className="crumb" href={MO_BASE}>
              Buy / Winning Multiple Offers / {moTopicNumber(t)}
            </Link>
            <div className="ttl">
              <span className="mk">{moTopicNumber(t)}</span>
              <h1>{t.title}</h1>
            </div>
            <div className="pills">
              <span className="pill t">Part {t.part}</span>
              <span className="pill">{PART_NAME[t.part]}</span>
            </div>
          </div>
        </section>

        <section className="s">
          <div className="w sp">
            <main className="prose">
              {t.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {t.iDo.length > 0 && (
                <>
                  <h2>What I do</h2>
                  <ul className="mo-do">
                    {t.iDo.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              )}
              {t.youDo.length > 0 && (
                <>
                  <h2>What you do</h2>
                  <ol>
                    {t.youDo.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </>
              )}
              {t.goodToKnow.length > 0 && (
                <div className="gtk">
                  <h3>Good to know</h3>
                  <ul>
                    {t.goodToKnow.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="mo-note">{MO.meta.disclaimer}</p>
              <div className="pn">
                {prev ? (
                  <Link href={moTopicPath(prev.slug)}>
                    <span><Arrow back /> {moTopicNumber(prev)}</span>
                    <b>{prev.title}</b>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link href={moTopicPath(next.slug)}>
                    <span>{moTopicNumber(next)} <Arrow /></span>
                    <b>{next.title}</b>
                  </Link>
                )}
              </div>
            </main>
            <aside className="side">
              {docs.length > 0 && (
                <div className="box">
                  <h3>Documents involved</h3>
                  {docs.map((a) => (
                    <DocLink key={a} abbr={a} className="dl">
                      <span className="dc">{a}</span>
                      {DOCS[a].name}
                    </DocLink>
                  ))}
                </div>
              )}
              {deeper.length > 0 && (
                <div className="box">
                  <h3>Go deeper in Path to Keys</h3>
                  <ul className="wy">
                    {deeper.map((s) => (
                      <li key={s.slug}>
                        <i>{s.number}</i>
                        <Link href={stepPath(s.slug)}>{s.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="box">
                <h3>In this guide</h3>
                <ul className="wy">
                  {near.map((n) => (
                    <li key={n.slug} className={n === t ? "on" : undefined}>
                      <i>{moTopicNumber(n)}</i>
                      {n === t ? n.title : <Link href={moTopicPath(n.slug)}>{n.title}</Link>}
                    </li>
                  ))}
                </ul>
                <Link className="more-link" style={{ marginTop: 12 }} href={MO_BASE}>
                  See the whole guide <Arrow />
                </Link>
              </div>
              <div className="box dark">
                <h3>Competing for a home?</h3>
                <p>Send me the listing. I'll read the packet, price the repairs, and tell you what it will likely take to win.</p>
                <Link className="btn go small" href="/contact">
                  Book a buyer consult
                </Link>
              </div>
            </aside>
          </div>
        </section>
        <CloseBand title="Want help with your next offer?" />
      </DocDrawerProvider>
    </TrailPage>
  );
}
