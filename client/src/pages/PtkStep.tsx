import { Link, useParams } from "wouter";
import { DocDrawerProvider, DocLink } from "@/components/trail/DocDrawer";
import { TrailPage, Section, CloseBand, Arrow } from "@/components/trail/Parts";
import { PTK } from "@/lib/pathToKeys";
import { DOCS, PHASE_NAME, stepBySlug, stepPath, docPath, PTK_BASE, deadlineDate, fmtLong, sampleAcceptance, ESCROW_DAYS } from "@/lib/ptk";
import NotFound from "@/pages/not-found";

declare const __BUILD_MS__: number;
const BUILD_MS: number = typeof __BUILD_MS__ !== "undefined" ? __BUILD_MS__ : Date.now();

export default function PtkStep() {
  const { slug } = useParams<{ slug: string }>();
  const s = stepBySlug(slug);
  if (!s) return <NotFound />;
  const i = PTK.steps.indexOf(s);
  const prev = PTK.steps[i - 1];
  const next = PTK.steps[i + 1];
  const d = deadlineDate(s.deadline, sampleAcceptance(new Date(BUILD_MS)), ESCROW_DAYS);
  const near = PTK.steps.slice(Math.max(0, i - 2), i + 3);
  const table = PTK.inspectionTable.step === s.slug ? PTK.inspectionTable.rows : null;

  return (
    <TrailPage>
      <DocDrawerProvider>
      <section className="phero sp-hero">
        <div className="contours" aria-hidden="true" style={{ opacity: 0.45 }} />
        <div className="w">
          <Link className="crumb" href={PTK_BASE}>
            Buy / Path to Keys / Step {s.number}
          </Link>
          <div className="ttl">
            <span className="mk">{s.number}</span>
            <h1>{s.title}</h1>
          </div>
          <div className="pills">
            <span className="pill t">{s.timing}</span>
            {d && <span className="pill">Sample date {fmtLong(d)}</span>}
            <span className="pill">
              Phase {s.phase} &middot; {PHASE_NAME[s.phase]}
            </span>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="w sp">
          <main className="prose">
            <p>{s.body}</p>
            {s.youDo.length > 0 && (
              <>
                <h2>What you do</h2>
                <ol>
                  {s.youDo.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ol>
              </>
            )}
            <h2>Who does what</h2>
            <div className="roles">
              {Object.entries(s.roles).map(([r, t]) => (
                <div className="role" key={r}>
                  <b>{r === "buyer" ? <span className="you">You</span> : PTK.parties[r]}</b>
                  <span>{t}</span>
                </div>
              ))}
            </div>
            {table && (
              <>
                <h2>Common inspections</h2>
                <table className="tbl">
                  <thead>
                    <tr>
                      <th>Inspection</th>
                      <th>What it covers</th>
                      <th>Typical cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((r) => (
                      <tr key={r.name}>
                        <td><b>{r.name}</b></td>
                        <td>{r.covers}</td>
                        <td>{r.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="tblnote">Typical ranges. Quotes vary by home size and age.</p>
              </>
            )}
            {s.goodToKnow.length > 0 && (
              <div className="gtk">
                <h3>Good to know</h3>
                <ul>
                  {s.goodToKnow.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="pn">
              {prev ? (
                <Link href={stepPath(prev.slug)}>
                  <span><Arrow back /> Step {prev.number}</span>
                  <b>{prev.title}</b>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link href={stepPath(next.slug)}>
                  <span>Step {next.number} <Arrow /></span>
                  <b>{next.title}</b>
                </Link>
              )}
            </div>
          </main>
          <aside className="side">
            {s.documents.length > 0 && (
              <div className="box">
                <h3>Documents for this step</h3>
                {s.documents
                  .filter((a) => DOCS[a])
                  .map((a) => (
                    <DocLink key={a} abbr={a} className="dl">
                      <span className="dc">{a}</span>
                      {DOCS[a].name}
                    </DocLink>
                  ))}
              </div>
            )}
            <div className="box">
              <h3>Where you are</h3>
              <ul className="wy">
                {near.map((n) => (
                  <li key={n.slug} className={n === s ? "on" : undefined}>
                    <i>{n.number}</i>
                    {n === s ? n.title : <Link href={stepPath(n.slug)}>{n.title}</Link>}
                  </li>
                ))}
              </ul>
              <Link className="more-link" style={{ marginTop: 12 }} href={`${PTK_BASE}#${s.slug}`}>
                See the full path <Arrow />
              </Link>
            </div>
            <div className="box dark">
              <h3>Questions about this step?</h3>
              <p>I spent 15 years in construction. Send me the report and I'll tell you what matters.</p>
              <Link className="btn go small" href="/contact">
                Book a buyer consult
              </Link>
            </div>
          </aside>
        </div>
      </section>
      <CloseBand title="Ready to start at step 1?" />
      </DocDrawerProvider>
    </TrailPage>
  );
}
