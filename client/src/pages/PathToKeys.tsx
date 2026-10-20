import { Link } from "wouter";
import { useEffect, useMemo, useRef, useState, Fragment } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { TrailPage, Acts, BookButton, Section, LineIcon, Arrow } from "@/components/trail/Parts";
import { PTK, type PtkStep, type PtkInsert } from "@/lib/pathToKeys";
import {
  TD,
  ESCROW_DAYS,
  DOCS,
  PHASE_NAME,
  CLOCK_KEYS,
  deadlineDate,
  fmtLong,
  fmtShort,
  sampleAcceptance,
  stepBySlug,
  stepPath,
  docPath,
  PTK_BASE,
} from "@/lib/ptk";

declare const __BUILD_MS__: number;
const BUILD_MS: number = typeof __BUILD_MS__ !== "undefined" ? __BUILD_MS__ : Date.now();
const STORE = "ptk-clock";
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function useEscrowClock() {
  const sample = useMemo(() => sampleAcceptance(new Date(BUILD_MS)), []);
  const [acc, setAcc] = useState(iso(sample));
  const [len, setLen] = useState(String(ESCROW_DAYS));
  const [mine, setMine] = useState(false);
  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(STORE) || "null");
      if (v?.a) {
        setAcc(v.a);
        setLen(v.l);
        setMine(true);
      } else {
        setAcc(iso(sampleAcceptance(new Date())));
      }
    } catch {
      /* storage unavailable: keep the sample */
    }
  }, []);
  const update = (a: string, l: string) => {
    setAcc(a);
    setLen(l);
    setMine(true);
    trackEvent("ptk_clock_set");
    try {
      localStorage.setItem(STORE, JSON.stringify({ a, l }));
    } catch {
      /* ignore */
    }
  };
  const accDate = acc ? new Date(acc + "T12:00") : sample;
  const escrow = Math.min(90, Math.max(14, Number(len) || ESCROW_DAYS));
  return { acc, len, mine, update, accDate, escrow };
}

type Clock = ReturnType<typeof useEscrowClock>;

function EscrowClock({ clock }: { clock: Clock }) {
  const [open, setOpen] = useState(true);
  useEffect(() => setOpen(window.matchMedia("(min-width: 901px)").matches), []);
  const close = new Date(clock.accDate);
  close.setDate(close.getDate() + clock.escrow);
  const rows = CLOCK_KEYS.map(([slug, label]) => {
    const d = deadlineDate(stepBySlug(slug)!.deadline, clock.accDate, clock.escrow)!;
    return { slug, label, d, day: Math.round((d.getTime() - clock.accDate.getTime()) / 86400000) };
  }).sort((a, b) => a.d.getTime() - b.d.getTime());

  return (
    <details className="clock" open={open} onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}>
      <summary>
        <span>
          Accepted <b>{fmtShort(clock.accDate)}</b> &middot; close <b>{fmtShort(close)}</b>
        </span>
        <b>Set dates</b>
      </summary>
      <div className="full">
        <h3>Your escrow clock</h3>
        <label htmlFor="ptk-acc">Offer accepted</label>
        <input id="ptk-acc" type="date" value={clock.acc} onChange={(e) => clock.update(e.target.value, clock.len)} />
        <label htmlFor="ptk-len">Escrow length (days)</label>
        <input id="ptk-len" type="number" min={14} max={90} value={clock.len} onChange={(e) => clock.update(clock.acc, e.target.value)} />
        <ul>
          {rows.map((r) => (
            <li key={r.slug}>
              <span className="d">D{r.day}</span>
              <span>{r.label}</span>
              <span className="dt">{fmtLong(r.d)}</span>
            </li>
          ))}
        </ul>
        <p className="sample">{clock.mine ? "Your dates." : "Sample dates. Enter yours to see real deadlines."}</p>
      </div>
    </details>
  );
}

function StepCard({ s, clock }: { s: PtkStep; clock: Clock }) {
  const d = deadlineDate(s.deadline, clock.accDate, clock.escrow);
  const others = s.parties.filter((p) => p !== "buyer").map((p) => PTK.parties[p]);
  return (
    <article className={`st${s.milestone ? " ms" : ""}${s.conditional ? " cd" : ""}`} id={s.slug} data-step={s.number} data-phase={s.phase}>
      <div className="mk">{s.number}</div>
      <div className="sc">
        <div className="top">
          <h3>{s.title}</h3>
          <span className="tmg">
            {s.timing}
            {d && <span className="dt"> &middot; {fmtLong(d)}</span>}
          </span>
        </div>
        <p>{s.summary}</p>
        <div className="meta">
          {s.parties.includes("buyer") && <span className="you">You</span>}
          <span className="who">{others.join(", ")}</span>
          {s.documents
            .filter((a) => DOCS[a])
            .map((a) => (
              <Link key={a} className="dc" href={docPath(DOCS[a].slug)} title={DOCS[a].name}>
                {a}
              </Link>
            ))}
          <Link className="rg" href={stepPath(s.slug)}>
            Read the guide <Arrow />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Loop({ ins }: { ins: PtkInsert }) {
  return (
    <div className="ins">
      <h3>{ins.title}</h3>
      <div className="loop">
        <span className="lh">You</span>
        <span className="lh">Seller</span>
        {ins.rows!.map((r, i) => (
          <div key={i} className={`r ${r.final ? "fin" : r.side === "buyer" ? "b" : "s"}`}>
            {!r.final && r.doc && <span className="dc">{r.doc}</span>}
            {r.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function Windows() {
  const E = ESCROW_DAYS;
  const bars: [string, number, string][] = [
    ["Investigation", TD.investigationDays, ""],
    ["Appraisal", TD.appraisalDays, ""],
    ["Loan", TD.loanDays, ""],
    ["Close", E, " cl"],
  ];
  const ticks = Array.from(new Set([0, TD.sellerDisclosureDays, TD.investigationDays, TD.loanDays, E])).sort((a, b) => a - b);
  return (
    <div className="ins">
      <h3>Your contingency windows</h3>
      <p className="note">While a window is open, you can cancel for that reason and keep your deposit. These are the timelines I typically write. Your contract sets yours.</p>
      <div className="bars">
        {bars.map(([l, n, c]) => (
          <div className={`bar${c}`} key={l}>
            <span>{l}</span>
            <div className="tr">
              <div className="fl" style={{ width: `${(n / E) * 100}%` }}>
                Day {n}
              </div>
            </div>
          </div>
        ))}
        <div className="ticks" aria-hidden="true">
          <i />
          <div>
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / E) * 100}%` }}>
                D{t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Timeline({ clock }: { clock: Clock }) {
  const after = Object.fromEntries(PTK.inserts.filter((i) => i.afterStep).map((i) => [i.afterStep!, i]));
  const before = Object.fromEntries(PTK.inserts.filter((i) => i.beforeStep).map((i) => [i.beforeStep!, i]));
  return (
    <div className="tl">
      <div className="fill" aria-hidden="true" />
      {PTK.phases.map((ph) => (
        <Fragment key={ph.number}>
          <div className="ph" id={`phase-${ph.number}`}>
            <div className="pm">{ph.number}</div>
            <h2>{ph.title}</h2>
            <p>{ph.intro}</p>
          </div>
          {PTK.steps
            .filter((s) => s.phase === ph.number)
            .map((s) => (
              <Fragment key={s.slug}>
                {before[s.slug]?.type === "contingency-windows" && <Windows />}
                <StepCard s={s} clock={clock} />
                {after[s.slug] && <Loop ins={after[s.slug]} />}
              </Fragment>
            ))}
        </Fragment>
      ))}
    </div>
  );
}

/** Tracks the step in the reading zone: phase tabs, progress bar, spine fill. */
function useScrollTracking(root: React.RefObject<HTMLDivElement>) {
  const [cur, setCur] = useState({ step: 1, phase: 1, fill: 0 });
  useEffect(() => {
    if (!root.current) return;
    const steps = Array.from(root.current.querySelectorAll<HTMLElement>(".st"));
    const tl = root.current.querySelector<HTMLElement>(".tl");
    let tick = false;
    const run = () => {
      tick = false;
      const z = window.innerHeight * 0.45;
      let el = steps[0];
      for (const s of steps) if (s.getBoundingClientRect().top < z) el = s;
      steps.forEach((s) => s.classList.toggle("cur", s === el && !s.classList.contains("ms")));
      const r = tl!.getBoundingClientRect();
      setCur({ step: Number(el.dataset.step), phase: Number(el.dataset.phase), fill: Math.max(0, Math.min(r.height - 8, z - r.top - 8)) });
    };
    const onScroll = () => {
      if (!tick) {
        tick = true;
        requestAnimationFrame(run);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    run();
    return () => window.removeEventListener("scroll", onScroll);
  }, [root]);
  return cur;
}

function EmailGuide({ dark }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const m = useMutation({
    mutationFn: async () => apiRequest("POST", "/api/newsletter", { email, source: "path-to-keys" }),
    onSuccess: () => {
      trackEvent("ptk_email_capture");
      toast({ title: "On its way", description: "I'll send Path to Keys to your inbox." });
      setEmail("");
    },
    onError: () => toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" }),
  });
  return (
    <form
      id="email"
      onSubmit={(e) => {
        e.preventDefault();
        if (email) m.mutate();
      }}
      className={dark ? undefined : "fnews"}
    >
      <input type="email" required placeholder="you@example.com" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="btn alt" type="submit" disabled={m.isPending}>
        {m.isPending ? "Sending..." : "Send"}
      </button>
    </form>
  );
}

const FEATURED_DOCS = ["RPA", "TDS", "SPQ", "INSP", "RR", "CR", "CD", "DEED"];

export default function PathToKeys() {
  const clock = useEscrowClock();
  const root = useRef<HTMLDivElement>(null);
  const cur = useScrollTracking(root);
  const counts = PTK.phases.map((p) => PTK.steps.filter((s) => s.phase === p.number).length);

  return (
    <TrailPage>
      <section className="phero ptk-hero">
        <div className="contours" aria-hidden="true" />
        <div className="w">
          <div>
            <Link href="/buy" className="crumb">
              Buy / Path to Keys
            </Link>
            <h1 data-testid="text-ptk-headline">Path to Keys</h1>
            <p className="lede">
              Buying a home anywhere is a journey. In the Bay Area, that journey can get complicated, depending on where you're
              buying, the local rules, and your network.
            </p>
            <p className="goal">My goal is simple:</p>
            <div className="partner">
              <div>
                <LineIcon name="list" />
                <span>
                  <b>Keep it simple.</b> Clear data in plain English, so you have everything you need to make the best decision.
                </span>
              </div>
              <div>
                <LineIcon name="route" />
                <span>
                  <b>Go the extra mile.</b> I limit how many clients I take on at once, so I can focus on the people I'm working
                  with: attending your inspections, finding the right contractor for a specific job, and more.
                </span>
              </div>
              <div>
                <LineIcon name="key" />
                <span>
                  <b>Keep it fun.</b> Buying a home and calling it your own is exciting, and the process should feel that way too.
                </span>
              </div>
            </div>
            <Acts>
              <Link className="btn go" href="/contact" onClick={() => trackEvent("ptk_cta_book", { location: "hero" })}>
                Book a buyer consult
              </Link>
              <a className="btn alt" href="#email">
                Email me this guide
              </a>
            </Acts>
          </div>
          <div className="glance">
            <h2>At a glance</h2>
            {PTK.phases.map((p, i) => (
              <a key={p.number} href={`#phase-${p.number}`}>
                <span className="pm">{p.number}</span>
                <span className="gt">{p.title}</span>
                <span className="gs">{counts[i]} steps</span>
              </a>
            ))}
            <p className="foot">
              Steps marked <span className="you">You</span> are yours. I'm with you on all of them.
            </p>
          </div>
        </div>
      </section>

      <div className="pbar">
        <div className="w">
          <nav className="tabs" aria-label="Phases">
            {PTK.phases.map((p) => (
              <a key={p.number} href={`#phase-${p.number}`} className={cur.phase === p.number ? "on" : undefined}>
                {p.number}. {p.title}
              </a>
            ))}
          </nav>
          <span className="short" aria-hidden="true">
            {cur.phase} &middot; {PHASE_NAME[cur.phase]}
          </span>
          <span className="where" aria-hidden="true">
            Step <b>{cur.step}</b> of {PTK.steps.length}
          </span>
          <span className="prog" aria-hidden="true" style={{ width: `${(cur.step / PTK.steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="w ptk" ref={root}>
        <aside>
          <EscrowClock clock={clock} />
          <div className="legend">
            <h3>How to read this</h3>
            <div><span className="lm" />A step</div>
            <div><span className="lm ms" />A milestone</div>
            <div><span className="lm cd" />Only if needed</div>
            <div><span className="you">You</span>Steps where you act</div>
          </div>
        </aside>
        <div style={{ "--fill": `${cur.fill}px` } as React.CSSProperties} className="tl-wrap">
          <Timeline clock={clock} />
        </div>
      </div>

      <Section title="Common questions" intro="Short answers. Each one links to the step that covers it in full.">
        <div className="faq">
          {PTK.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="a">
                {f.a} <Link href={stepPath(f.step)}>See the step <Arrow /></Link>
              </div>
            </details>
          ))}
        </div>
      </Section>

      <Section title="Document library">
        <div className="docs">
          {FEATURED_DOCS.map((a) => (
            <Link key={a} className="doc" href={docPath(DOCS[a].slug)}>
              <span className="ab">{a}</span>
              <span className="n">{DOCS[a].name}</span>
              <span className="p">
                Phase {DOCS[a].phase} &middot; {PHASE_NAME[DOCS[a].phase]}
              </span>
            </Link>
          ))}
        </div>
        <Link className="more-link" href={`${PTK_BASE}/documents`}>
          See all {PTK.documents.length} documents <Arrow />
        </Link>
      </Section>

      <section className="s" style={{ paddingTop: 24 }}>
        <div className="w">
          <div className="close">
            <div>
              <h2>Ready to start at step 1?</h2>
              <p>Book a 30-minute buyer consult. We'll go over your budget, your timeline, and which East Bay cities fit.</p>
            </div>
            <div className="stack">
              <div className="acts">
                <BookButton label="Book a buyer consult" className="btn go" />
              </div>
              <span className="lab">Or get this guide by email</span>
              <EmailGuide dark />
            </div>
          </div>
          <p className="compliance" style={{ marginTop: 20 }}>
            Muzamil Khan &middot; Rise Group &middot; DRE #02400805. {PTK.meta.disclaimer}
          </p>
        </div>
      </section>
    </TrailPage>
  );
}
