import { Link } from "wouter";
import { createContext, useContext, useState, type ReactNode, type CSSProperties } from "react";
import { Layout } from "@/components/layout/Layout";
import { CITIES, CITY_ORDER, CITY_CARD_ORDER, cityPath, SMS, PHONE, type CitySlug } from "@/lib/trail";

/** Wraps a redesigned page: site header/footer plus the .tm design scope. */
export function TrailPage({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <div className="tm">{children}</div>
    </Layout>
  );
}

export const ChatIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.6 7.2L4 20l1-4.6A8 8 0 1 1 21 12z" />
  </svg>
);

export const TrailMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2 L22 20 H2 Z" fill="none" stroke="#1c2a24" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M7.5 20 L12 12 L16.5 20" fill="none" stroke="#c2461a" strokeWidth="2.2" strokeLinejoin="round" />
  </svg>
);

/** Trail-marker shapes used for list items (never same-size icon cards). */
export const Marker = ({ shape, color }: { shape: "circle" | "square" | "triangle" | "diamond"; color: string }) => (
  <svg viewBox="0 0 26 26" aria-hidden="true">
    {shape === "circle" && <circle cx="13" cy="13" r="10" fill={color} />}
    {shape === "square" && <rect x="3.5" y="3.5" width="19" height="19" rx="2" fill={color} />}
    {shape === "triangle" && <path d="M13 2 L24 23 H2 Z" fill={color} />}
    {shape === "diamond" && <path d="M13 2 L24 13 L13 24 L2 13 Z" fill={color} />}
  </svg>
);

/** Line arrow used on every text link and row, so all arrows share one stroke. */
export const Arrow = ({ back }: { back?: boolean }) => (
  <svg className="ico-arr" viewBox="0 0 16 16" aria-hidden="true" style={back ? { transform: "scaleX(-1)" } : undefined}>
    <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Star = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 15l-5.4 3 1.2-6L1.3 7.8l6.1-.7z" fill="#c2461a" />
  </svg>
);

export const Stars = () => (
  <div className="stars" aria-label="5 stars">
    <Star /><Star /><Star /><Star /><Star />
  </div>
);

export function TextMeButton({ label = "Text me", small }: { label?: string; small?: boolean }) {
  return (
    <a className={`btn go${small ? " small" : ""}`} href={SMS}>
      <ChatIcon />
      {label}
    </a>
  );
}

export function BookButton({ label = "Book a call", className = "btn alt" }: { label?: string; className?: string }) {
  return (
    <Link href="/contact" className={className}>
      {label}
    </Link>
  );
}

export function Crumb({ trail, color }: { trail: { label: string; href?: string }[]; color?: string }) {
  const parent = [...trail].reverse().find((t) => t.href);
  return (
    <Link href={parent?.href || "/"} className="crumb" style={color ? ({ "--c": color } as CSSProperties) : undefined}>
      {color && <span className="pin" />}
      {trail.map((t) => t.label).join(" / ")}
    </Link>
  );
}

export function PageHero({
  title,
  lede,
  children,
  pre,
  className = "",
  contourOpacity,
}: {
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  pre?: ReactNode;
  className?: string;
  contourOpacity?: number;
}) {
  return (
    <section className={`phero ${className}`}>
      <div className="contours" aria-hidden="true" style={contourOpacity ? { opacity: contourOpacity } : undefined} />
      <div className="w">
        {pre}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

export function Acts({ children }: { children: ReactNode }) {
  return <div className="acts">{children}</div>;
}

export function Section({
  title,
  intro,
  children,
  id,
  style,
}: {
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <section className="s" id={id} style={style}>
      <div className="w">
        <h2>{title}</h2>
        {intro && <p className="intro">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function CloseBand({ title, sub = "Text or call. I'll give you a straight answer.", children }: { title: ReactNode; sub?: ReactNode; children?: ReactNode }) {
  return (
    <section className="s" style={{ paddingTop: 24 }}>
      <div className="w">
        <div className="close">
          <div>
            <h2>{title}</h2>
            <p>{sub}</p>
          </div>
          {children || (
            <div className="acts">
              <a className="btn go" href={SMS}>
                Text {PHONE}
              </a>
              <BookButton />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Route({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div className="route" style={{ "--n": steps.length } as CSSProperties}>
      {steps.map((s, i) => (
        <div className="stop" key={s.title}>
          <div className="mk">{i + 1}</div>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Rows({ items }: { items: { title: string; meta?: string; href: string }[] }) {
  return (
    <div className="rows">
      {items.map((it) =>
        it.href.startsWith("http") ? (
          <a key={it.title} className="rowx" href={it.href} target="_blank" rel="noopener noreferrer">
            <span className="t">{it.title}</span>
            <span className="m">{it.meta}</span>
            <span className="arr"><Arrow /></span>
          </a>
        ) : (
          <Link key={it.title} className="rowx" href={it.href}>
            <span className="t">{it.title}</span>
            <span className="m">{it.meta}</span>
            <span className="arr"><Arrow /></span>
          </Link>
        ),
      )}
    </div>
  );
}

export function Ways({ items }: { items: { title: string; body: string }[] }) {
  const shapes = [
    ["circle", "#2c7a4f"],
    ["square", "#2b5fb8"],
    ["triangle", "#1c2a24"],
    ["diamond", "#c2461a"],
  ] as const;
  return (
    <div className="ways">
      {items.map((it, i) => (
        <div className="way" key={it.title}>
          <Marker shape={shapes[i % 4][0]} color={shapes[i % 4][1]} />
          <div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- city highlight: one city lights up in every place it appears ---------- */

const HoverCtx = createContext<{ city: CitySlug | null; set: (c: CitySlug | null) => void }>({ city: null, set: () => {} });

export function CityHoverProvider({ children }: { children: ReactNode }) {
  const [city, set] = useState<CitySlug | null>(null);
  return <HoverCtx.Provider value={{ city, set }}>{children}</HoverCtx.Provider>;
}

function useCityHover(slug: CitySlug) {
  const { city, set } = useContext(HoverCtx);
  return {
    on: city === slug,
    handlers: {
      onMouseEnter: () => set(slug),
      onMouseLeave: () => set(null),
      onFocus: () => set(slug),
      onBlur: () => set(null),
    },
  };
}

function Trailhead({ slug }: { slug: CitySlug }) {
  const c = CITIES[slug];
  const { on, handlers } = useCityHover(slug);
  return (
    <Link href={cityPath(slug)} className={`th${on ? " on" : ""}`} style={{ "--c": c.color } as CSSProperties} {...handlers}>
      <span className="name">
        <span className="pin" />
        {c.name}
      </span>
      <div className="fig num">{c.median}</div>
      <div className="sub num">median &middot; {c.overAsking} over asking</div>
      <span className="go2"><Arrow /></span>
    </Link>
  );
}

export function Trailheads({ style }: { style?: CSSProperties }) {
  return (
    <div className="trailheads" style={style}>
      <div className="w" style={style ? { padding: 0 } : undefined}>
        {CITY_CARD_ORDER.map((s) => (
          <Trailhead key={s} slug={s} />
        ))}
      </div>
    </div>
  );
}

const PROFILE_POINTS: Record<CitySlug, { x: number; y: number; label: string }> = {
  "el-cerrito": { x: 200, y: 196, label: "El Cerrito" },
  albany: { x: 430, y: 130, label: "Albany" },
  oakland: { x: 640, y: 100, label: "Oakland*" },
  berkeley: { x: 900, y: 58, label: "Berkeley" },
};

function ProfilePoint({ slug }: { slug: CitySlug }) {
  const c = CITIES[slug];
  const p = PROFILE_POINTS[slug];
  const { on, handlers } = useCityHover(slug);
  return (
    <g className={`pt${on ? " on" : ""}`} {...handlers}>
      <circle className="halo" cx={p.x} cy={p.y} r="22" fill={c.hex} />
      <circle cx={p.x} cy={p.y} r="7" fill={c.hex} stroke="#fff" strokeWidth="3" />
      <text className="nm" x={p.x} y={p.y - 22} textAnchor="middle" fontWeight="800" fontSize="16" fill="#1c2a24">
        {p.label}
      </text>
      <text className="md" x={p.x} y={p.y - 40} textAnchor="middle" fontSize="14" fill="#47554d">
        {c.median}
      </text>
    </g>
  );
}

const RIDGE =
  "M60 214 C 120 210, 160 200, 200 196 C 280 188, 350 140, 430 130 C 510 120, 570 106, 640 100 C 730 92, 820 66, 900 58 C 980 50, 1040 48, 1100 46";

export function ElevationProfile() {
  return (
    <div className="profile">
      <svg
        viewBox="0 0 1100 300"
        role="img"
        aria-label={`Median sale price by city: ${CITY_ORDER.map((s) => `${CITIES[s].name} ${CITIES[s].median}`).join(", ")}`}
        fontFamily="Overpass"
      >
        <g stroke="#e3e9e1" strokeWidth="1">
          {[250, 190, 130, 70].map((y) => (
            <line key={y} x1="0" y1={y} x2="1100" y2={y} />
          ))}
        </g>
        <g className="ax" fontSize="13" fill="#47554d">
          <text x="0" y="244">$1.0M</text>
          <text x="0" y="184">$1.2M</text>
          <text x="0" y="124">$1.4M</text>
          <text x="0" y="64">$1.6M</text>
        </g>
        <path d={`M60 300 L${RIDGE.slice(1)} L1100 300 Z`} fill="#ebf0e8" />
        <path className="ridge" d={RIDGE} fill="none" stroke="#1c2a24" strokeWidth="2.5" strokeLinecap="round" />
        {CITY_ORDER.map((s) => (
          <ProfilePoint key={s} slug={s} />
        ))}
      </svg>
      <div className="cap">
        <span>Median sale price, detached single-family homes, last 12 months. Source: MLS.</span>
        <span>*Rockridge, Temescal &amp; the Oakland Hills</span>
      </div>
    </div>
  );
}

/* ---------- Path to Keys callout (homepage and Buy) ---------- */

export function PtkCallout({ counts }: { counts: { number: number; title: string; steps: number }[] }) {
  return (
    <section className="s">
      <div className="w">
        <div className="ptk-call">
          <div>
            <h2>Path to Keys</h2>
            <p>Every step from pre-approval to keys, laid out in order. You make the big decisions. I walk every step with you and make it simple.</p>
            <div className="acts">
              <Link className="btn go" href="/buy/path-to-keys">
                See the full path
              </Link>
              <BookButton label="Book a buyer consult" />
            </div>
          </div>
          <div className="mini">
            {counts.map((p) => (
              <Link key={p.number} className="s" href={`/buy/path-to-keys#phase-${p.number}`}>
                <span className="pm">{p.number}</span>
                <b>{p.title}</b>
                <span>{p.steps} steps</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
