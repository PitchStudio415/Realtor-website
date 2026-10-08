import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Star, ArrowRight, ExternalLink } from "lucide-react";
import { SiGoogle, SiZillow } from "react-icons/si";
import { ReelCard } from "@/components/ReelCard";

const GOOGLE_URL = "https://www.google.com/maps?cid=4248271409235072484";
const ZILLOW_URL = "https://www.zillow.com/profile/muzamil7";

const videoStories = [
  {
    src: "/videos/client-story-durham.mp4",
    poster: "/videos/client-story-durham-poster.jpg",
    title: "Karen and Dave, 316 Durham Ct, Benicia",
    quote: "“He saved us thousands in a bidding war.”",
    attrib: "Karen & Dave · 316 Durham Ct, Benicia",
    testId: "reel-story-durham",
  },
  {
    src: "/videos/client-story-camelia.mp4",
    poster: "/videos/client-story-camelia-poster.jpg",
    title: "Sold in Berkeley, 1175 Camelia St",
    quote: "Sold in Berkeley.",
    attrib: "1175 Camelia St, Berkeley",
    testId: "reel-story-camelia",
  },
  {
    src: "/videos/client-story-warren.mp4",
    poster: "/videos/client-story-warren-poster.jpg",
    title: "Welcome home, 330 Warren Way, Pittsburg",
    quote: "Welcome home.",
    attrib: "330 Warren Way, Pittsburg",
    testId: "reel-story-warren",
  },
];

const reviews = [
  {
    quote:
      "Muzamil did an outstanding job getting us the home of our dreams. He was able to negotiate a price that saved us from a bidding war which saved us thousands. Highly recommend. He is going to sell my house too and I am super confident he will do an exceptional job.",
    name: "Karen & Dave",
    meta: "Bought and sold a single family home · Benicia, CA · August 2026",
    tags: ["Local knowledge", "Process expertise", "Responsiveness", "Negotiation skills"],
    href: ZILLOW_URL,
    testId: "testimonial-karen",
  },
  {
    quote:
      "Muzamil helped me find my perfect home from three time zones away. I was relocating from the East Coast to the Bay Area. He helped me identify potential properties and then arranged an entire weekend of property tours in which we hit roughly 15 different homes. Once we settled on the perfect fit, he helped guide me through an especially tricky closing process, including finding a new lender at the last minute after my first fell through. He also coordinated multiple contractors working on my home post closing. I am eternally grateful for his patience and guidance.",
    name: "Jimmy Moore",
    meta: "Relocated and bought a home · Bay Area · July 2026",
    tags: ["Relocation", "Process expertise", "Responsiveness", "Coordination"],
    href: GOOGLE_URL,
    testId: "testimonial-jimmy",
  },
  {
    quote:
      "Muzamil went above and beyond by making multiple trips to meet and coordinate with contractors on our behalf when we weren't able to be there.",
    name: "Timothy",
    meta: "Bought a condo · Sunshine Gardens, South San Francisco · March 2026",
    tags: ["Local knowledge", "Process expertise", "Responsiveness", "Negotiation"],
    href: GOOGLE_URL,
    testId: "testimonial-timothy",
  },
  {
    quote:
      "He walked us through the process from start to finish in a way that felt smooth and manageable. His attention to detail and willingness to go the extra mile made our experience truly a positive one.",
    name: "Tenisi Elena",
    meta: "Bought a single family home · Pittsburg, CA · February 2026",
    tags: ["Local knowledge", "Process expertise", "Responsiveness", "Negotiation"],
    href: GOOGLE_URL,
    testId: "testimonial-tenisi",
  },
];

export default function Testimonials() {
  return (
    <Layout>
      {/* Hero + video stories */}
      <section className="bg-[#071B2C] text-white py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3 font-medium text-center">Testimonials</p>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4" data-testid="text-testimonials-title">
            Real clients. Real keys.
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-white/70">5.0 on Google and Zillow</span>
          </div>
          <p className="text-white/70 text-center max-w-xl mx-auto mb-12 leading-relaxed">
            A few recent closings, straight from the front door, plus what clients wrote afterward. This is what working together actually looks like.
          </p>

          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {videoStories.map((v) => (
              <div key={v.testId} data-testid={`client-story-${v.testId}`}>
                <ReelCard src={v.src} poster={v.poster} title={v.title} testId={v.testId} />
                <div className="text-center mt-3 max-w-xs mx-auto">
                  <p className="text-sm font-medium">{v.quote}</p>
                  <p className="text-xs text-white/55 mt-1">{v.attrib}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
            <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-[#071B2C] hover:bg-white/90" data-testid="button-read-google">
                <SiGoogle className="w-4 h-4 mr-2 text-[#4285F4]" />
                Read reviews on Google
              </Button>
            </a>
            <a href={ZILLOW_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" data-testid="button-read-zillow">
                <SiZillow className="w-4 h-4 mr-2 text-[#006AFF]" />
                Read reviews on Zillow
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Written reviews */}
      <section className="py-14 md:py-20 bg-muted/40 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <SiGoogle className="w-5 h-5 text-[#4285F4]" />
            <SiZillow className="w-5 h-5 text-[#006AFF]" />
            <span className="text-sm font-medium text-muted-foreground">Verified 5-Star Client Reviews</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <a
                key={r.testId}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-border rounded-2xl p-7 bg-background hover:border-primary/30 hover:shadow-md transition-all"
                data-testid={r.testId}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-foreground leading-relaxed mb-5 italic">"{r.quote}"</p>
                <div>
                  <p className="font-semibold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.meta}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {r.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-primary/8 text-primary px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Want this kind of move?</h2>
          <p className="text-muted-foreground mb-7 max-w-xl mx-auto leading-relaxed">
            Whether you are buying your first home or selling the one you have, I will guide you through it with the same honest, hands-on approach these clients had.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" data-testid="button-testimonials-contact">
                Book a call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/home-valuation">
              <Button size="lg" variant="outline" data-testid="button-testimonials-valuation">
                What could your home sell for?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
