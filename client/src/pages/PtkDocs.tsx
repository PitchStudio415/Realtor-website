import { Link, useParams } from "wouter";
import { DocDrawerProvider, DocLink } from "@/components/trail/DocDrawer";
import { TrailPage, PageHero, Section, CloseBand } from "@/components/trail/Parts";
import { PTK } from "@/lib/pathToKeys";
import { PHASE_NAME, PTK_BASE, docBySlug, docPath, stepBySlug, stepPath } from "@/lib/ptk";
import NotFound from "@/pages/not-found";

function DocIndex() {
  return (
    <TrailPage>
      <DocDrawerProvider>
      <PageHero
        title="Document library"
        lede={`All ${PTK.documents.length} documents you'll see between your buyer agreement and your keys, in the order they show up.`}
        pre={
          <Link className="crumb" href={PTK_BASE}>
            Buy / Path to Keys / Documents
          </Link>
        }
      />
      {PTK.phases.map((p) => (
        <Section key={p.number} title={`${p.number}. ${p.title}`}>
          <div className="doclist">
            {PTK.documents
              .filter((d) => d.phase === p.number)
              .map((d) => (
                <DocLink key={d.slug} abbr={d.abbr} className="doc">
                  <span className="ab">{d.abbr}</span>
                  <span className="n">{d.name}</span>
                  <span className="p">{d.what}</span>
                </DocLink>
              ))}
          </div>
        </Section>
      ))}
      <CloseBand title="Want help reading yours?" sub="Send it over. I'll walk you through what matters." />
      </DocDrawerProvider>
    </TrailPage>
  );
}

function DocPage({ slug }: { slug: string }) {
  const d = docBySlug(slug);
  if (!d) return <NotFound />;
  return (
    <TrailPage>
      <PageHero
        title={d.name}
        lede={d.what}
        pre={
          <>
            <Link className="crumb" href={`${PTK_BASE}/documents`}>
              Buy / Path to Keys / Documents
            </Link>
            <div style={{ marginBottom: 14 }}>
              <span className="dc" style={{ fontSize: 15, padding: "5px 12px" }}>{d.abbr}</span>
            </div>
          </>
        }
      />
      <section className="s">
        <div className="w" style={{ maxWidth: 820 }}>
          <dl className="ddl">
            <dt>Comes from</dt>
            <dd>{d.comesFrom}</dd>
            <dt>Who signs</dt>
            <dd>{d.whoSigns}</dd>
            <dt>When</dt>
            <dd>{d.when}</dd>
            <dt>Phase</dt>
            <dd>
              {d.phase}. {PHASE_NAME[d.phase]}
            </dd>
          </dl>
          {d.lookFor.length > 0 && (
            <div className="gtk">
              <h3>What to look for</h3>
              <ul>
                {d.lookFor.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          )}
          {d.usedInSteps.length > 0 && (
            <>
              <h2 style={{ fontSize: 24, marginTop: 40 }}>Shows up in</h2>
              <div className="chiprow">
                {d.usedInSteps.map((s) => {
                  const st = stepBySlug(s);
                  return st ? (
                    <Link key={s} href={stepPath(s)}>
                      Step {st.number}: {st.title}
                    </Link>
                  ) : null;
                })}
              </div>
            </>
          )}
        </div>
      </section>
      <CloseBand title="Questions about this document?" sub="Send it over. I'll walk you through what matters." />
    </TrailPage>
  );
}

export default function PtkDocs() {
  const { slug } = useParams<{ slug?: string }>();
  return slug ? <DocPage slug={slug} /> : <DocIndex />;
}
