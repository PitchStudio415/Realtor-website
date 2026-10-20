import { TrailPage, Acts, TextMeButton, BookButton, Section, Stars, CloseBand, Arrow } from "@/components/trail/Parts";
import { ReelCard } from "@/components/ReelCard";
import { REVIEWS, STORIES, GOOGLE_URL, ZILLOW_URL } from "@/lib/trail";

export default function About() {
  return (
    <TrailPage>
      <section className="phero">
        <div className="contours" aria-hidden="true" />
        <div className="w bio">
          <img className="ph" src="/muzamil-khan.jpg" alt="Muzamil Khan" width={480} height={600} />
          <div>
            <h1 data-testid="text-about-headline">Muzamil Khan</h1>
            <div className="prose" style={{ marginTop: 22 }}>
              <p>
                With over 15 years in the construction industry, I bring a strong foundation in how homes are built, valued, and
                maintained. I grew up in Los Angeles and have called the Bay Area home for over a decade.
              </p>
              <p>
                I earned an MBA at UC Davis to better understand the forces that shape Bay Area real estate. Today I help
                first-time buyers move with clarity and confidence, and I work with people relocating to or from the East Bay.
              </p>
            </div>
            <div className="facts num">
              <div><b>15 yrs</b><span>In construction</span></div>
              <div><b>10+ yrs</b><span>Living in El Cerrito</span></div>
              <div><b>5.0</b><span>On Google and Zillow</span></div>
            </div>
            <p className="src">Realtor with Rise Group &middot; DRE #02400805</p>
            <Acts>
              <TextMeButton />
              <BookButton />
            </Acts>
          </div>
        </div>
      </section>

      <Section title="Reviews" intro="5.0 on Google and Zillow, from first-time buyers, movers, and sellers." id="reviews">
        <div className="revs">
          {REVIEWS.map((r) => (
            <div className="rev" key={r.name} data-testid={`testimonial-${r.name.split(" ")[0].toLowerCase()}`}>
              <Stars />
              <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
              <cite>
                {r.name} <span>&middot; {r.meta}</span>
              </cite>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 24, fontWeight: 800, display: "flex", gap: 24, flexWrap: "wrap" }}>
          <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">Google reviews <Arrow /></a>
          <a href={ZILLOW_URL} target="_blank" rel="noopener noreferrer">Zillow reviews <Arrow /></a>
        </p>
      </Section>

      <Section title="Client stories" id="stories">
        <div className="reels">
          {STORIES.map((v) => (
            <ReelCard key={v.src} src={v.src} poster={v.poster} title={v.title} caption={v.title} />
          ))}
        </div>
      </Section>

      <CloseBand title="Let's talk about your move." />
    </TrailPage>
  );
}
