import { Link, useParams } from "wouter";
import { useState, useEffect, type CSSProperties } from "react";
import { TrailPage, PageHero, Section, Rows, CloseBand, Crumb, Arrow } from "@/components/trail/Parts";
import { blogPosts, getBlogPostBySlug, isPublished } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { CITIES, START_HERE, cityPath, type CitySlug } from "@/lib/trail";
import type { BlogPost } from "@shared/schema";

// Baked at build time (vite define). Used as the stable first-render reference
// so scheduled posts reveal on their date without a rebuild.
declare const __BUILD_MS__: number;
const BUILD_MS: number = typeof __BUILD_MS__ !== "undefined" ? __BUILD_MS__ : Date.now();

interface Group {
  name: string;
  color: string;
  posts: string[];
  href?: string;
  city?: CitySlug;
}

const CITY_GROUPS: Group[] = [
  ...(["berkeley", "oakland", "albany", "el-cerrito"] as CitySlug[]).map((s) => ({
    name: CITIES[s].name,
    color: CITIES[s].color,
    posts: CITIES[s].posts,
    href: cityPath(s),
    city: s,
  })),
  {
    name: "Richmond & West County",
    color: "var(--ink-2)",
    posts: ["best-neighborhoods-in-richmond-for-first-time-buyers", "west-contra-costa-county-market-outlook-2026", "el-cerrito-vs-richmond-vs-hercules-where-to-buy-2026"],
  },
  { name: "All East Bay", color: "var(--trail)", posts: ["east-bay-market-update-spring-2026"] },
];

const fmtMonth = (d: string) => new Date(d + "T12:00").toLocaleDateString("en-US", { month: "short", year: "numeric" });

/** The first city group a post belongs to, for its breadcrumb color and playbook callout. */
function cityOf(slug: string): Group | undefined {
  return CITY_GROUPS.find((g) => g.city && g.posts[0] === slug) || CITY_GROUPS.find((g) => g.city && g.posts.includes(slug));
}

function BlogIndex() {
  const [refMs, setRefMs] = useState(BUILD_MS);
  useEffect(() => setRefMs(Date.now()), []);
  const live = (slug: string) => {
    const p = getBlogPostBySlug(slug);
    return p && isPublished(p, refMs) ? p : undefined;
  };
  const grouped = new Set([...START_HERE.map((s) => s.slug), ...CITY_GROUPS.flatMap((g) => g.posts)]);
  const rest = blogPosts.filter((p) => isPublished(p, refMs) && !grouped.has(p.slug));
  const row = (p: BlogPost) => ({ title: p.title, meta: fmtMonth(p.publishedAt), href: `/blog/${p.slug}` });

  return (
    <TrailPage>
      <PageHero title="Blog" lede="Start with the three essentials, then read up on the city you are looking at." />

      <Section title="Start here" intro="What first-time East Bay buyers ask me most.">
        <div className="guides">
          {START_HERE.map(({ topic, slug }) => {
            const p = live(slug);
            if (!p) return null;
            return (
              <Link key={slug} className="guide" href={`/blog/${slug}`}>
                <span className="topic">{topic}</span>
                <span className="t">{p.title}</span>
                <span className="arr"><Arrow /></span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section title="By city">
        <div className="bycity">
          {CITY_GROUPS.map((g) => {
            const posts = g.posts.map(live).filter((p): p is BlogPost => !!p);
            if (!posts.length) return null;
            return (
              <div className="cb" key={g.name} style={{ "--c": g.color } as CSSProperties}>
                <div className="hd">
                  <h3>
                    <span className="pin" />
                    {g.name}
                  </h3>
                  {g.href && <Link href={g.href}>City <Arrow /></Link>}
                </div>
                {posts.map((p) => (
                  <Link key={p.slug} className="p" href={`/blog/${p.slug}`} data-testid={`card-blog-${p.slug}`}>
                    {p.title}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </Section>

      {rest.some((p) => p.category !== "selling") && (
        <Section title="More on buying">
          <Rows items={rest.filter((p) => p.category !== "selling").map(row)} />
        </Section>
      )}
      {rest.some((p) => p.category === "selling") && (
        <Section title="Selling">
          <Rows items={rest.filter((p) => p.category === "selling").map(row)} />
        </Section>
      )}

      <CloseBand title="Have a question I haven't written about?" sub="Text me. It might be the next post." />
    </TrailPage>
  );
}

function BlogPostPage({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);

  // A scheduled (future-dated) post is treated as missing so its URL can't leak early.
  if (!post || !isPublished(post)) {
    return (
      <TrailPage>
        <section className="notfound">
          <div className="w">
            <h1 style={{ fontSize: 40, fontWeight: 800 }}>Post not found</h1>
            <p style={{ margin: "14px 0 24px", color: "var(--ink-2)" }}>It may have moved. The blog has everything in one place.</p>
            <Link className="btn go" href="/blog">
              Back to the blog
            </Link>
          </div>
        </section>
      </TrailPage>
    );
  }

  const g = cityOf(post.slug);
  const city = g?.city ? CITIES[g.city] : undefined;
  const pool = blogPosts.filter((p) => p.slug !== post.slug && isPublished(p));
  const related = [...pool.filter((p) => p.category === post.category), ...pool.filter((p) => p.category !== post.category)].slice(0, 3);
  const date = new Date(post.publishedAt + "T12:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  return (
    <TrailPage>
      <section className="phero">
        <div className="contours" aria-hidden="true" style={{ opacity: 0.45 }} />
        <div className="w">
          <div className="article">
            <Crumb trail={[{ label: "Blog", href: "/blog" }, { label: g?.name || "Article" }]} color={g?.color} />
            <h1 data-testid="text-blog-title">{post.title}</h1>
            <div className="byline">
              <span className="av" aria-hidden="true" />
              <span>
                <b>
                  <Link href="/about">Muzamil Khan</Link>
                </b>
                , Realtor, DRE #02400805
                <br />
                {date}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="s">
        <div className="w">
          <div className="article prose" style={g ? ({ "--c": g.color } as CSSProperties) : undefined}>
            {/* renderMarkdown escapes all HTML in the authored content before adding its own tags. */}
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content, { dropH1: true }) }} />
            {city && (
              <div className="inline-pb">
                <span>
                  <b>Buying in {city.name}?</b>
                  <br />
                  <span>The city page has the numbers, the offer strategy, and the one-page playbook.</span>
                </span>
                <Link className="btn go small" href={cityPath(city.slug)}>
                  {city.name} page
                </Link>
              </div>
            )}
          </div>
          {post.faq && post.faq.length > 0 && (
            <div className="article" style={{ marginTop: 48 }}>
              <h2 style={{ fontSize: 30 }}>Common questions</h2>
              <div className="faq">
                {post.faq.map((f) => (
                  <details key={f.question}>
                    <summary>{f.question}</summary>
                    <div className="a">{f.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Section title="Keep reading">
        <Rows items={related.map((p) => ({ title: p.title, meta: fmtMonth(p.publishedAt), href: `/blog/${p.slug}` }))} />
      </Section>

      <CloseBand title={city ? `Questions about ${city.name}?` : "Have a question about your move?"} />
    </TrailPage>
  );
}

export default function Blog() {
  const params = useParams<{ slug?: string }>();
  return params.slug ? <BlogPostPage slug={params.slug} /> : <BlogIndex />;
}
