import { Link } from "wouter";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { DOCS, PHASE_NAME, docPath, stepBySlug, stepPath } from "@/lib/ptk";
import { SMS } from "@/lib/trail";
import { Arrow } from "@/components/trail/Parts";

/** Document details slide in from the left so the reader keeps their place in the guide.
 *  Doc links stay real <a href> to the full document page (crawlers, new tabs, no-JS). */
const DrawerCtx = createContext<(abbr: string) => void>(() => {});

export function DocDrawerProvider({ children }: { children: ReactNode }) {
  const [abbr, setAbbr] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((a: string) => {
    opener.current = document.activeElement as HTMLElement | null;
    setAbbr(a);
    setTimeout(() => setShown(true), 20);
    trackEvent("ptk_doc_open", { abbr: a });
  }, []);

  const close = useCallback(() => {
    setShown(false);
    setTimeout(() => {
      setAbbr(null);
      opener.current?.focus();
    }, 320);
  }, []);

  useEffect(() => {
    if (!abbr) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [abbr, close]);

  const d = abbr ? DOCS[abbr] : null;

  return (
    <DrawerCtx.Provider value={open}>
      {children}
      {d && (
        <div className={`drawer-wrap${shown ? " in" : ""}`}>
          <div className="scrim" onClick={close} aria-hidden="true" />
          <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabIndex={-1} ref={panel}>
            <div className="dr-top">
              <span className="dc">{d.abbr}</span>
              <button className="dr-close" onClick={close} aria-label="Close">
                <svg viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M5 5 L15 15 M15 5 L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <h2 id="drawer-title">{d.name}</h2>
            <p className="dr-what">{d.what}</p>
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
                <h3 className="dr-h">Shows up in</h3>
                <div className="chiprow">
                  {d.usedInSteps.map((s) => {
                    const st = stepBySlug(s);
                    return st ? (
                      <Link key={s} href={stepPath(s)} onClick={close}>
                        Step {st.number}: {st.title}
                      </Link>
                    ) : null;
                  })}
                </div>
              </>
            )}
            <div className="dr-foot">
              <a className="btn go small" href={SMS}>
                Questions? Text me
              </a>
              <Link className="dr-full" href={docPath(d.slug)} onClick={close}>
                Full page <Arrow />
              </Link>
            </div>
          </div>
        </div>
      )}
    </DrawerCtx.Provider>
  );
}

/** A document link that opens the drawer on a normal click, and the full page otherwise. */
export function DocLink({ abbr, className, children, title }: { abbr: string; className?: string; children: ReactNode; title?: string }) {
  const open = useContext(DrawerCtx);
  const d = DOCS[abbr];
  if (!d) return null;
  const onClick = (e: MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    open(abbr);
  };
  return (
    <a href={docPath(d.slug)} className={className} title={title} onClick={onClick}>
      {children}
    </a>
  );
}
