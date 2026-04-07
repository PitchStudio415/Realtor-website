import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, ArrowRight, MapPin, BookOpen, Truck, Hammer, Star } from "lucide-react";
import { SiInstagram, SiZillow } from "react-icons/si";
import profilePhoto from "@assets/ProfilePhoto_1773373912154.jpeg";

export default function Home() {
  return (
    <Layout>
      {/* Hero — asymmetric layout */}
      <section className="bg-[#071B2C] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-0">

            {/* Content — left */}
            <div className="flex-1 py-16 lg:py-24 lg:pr-16 flex flex-col justify-center">
              <p className="text-xs tracking-widest uppercase text-white/40 mb-6 font-medium">
                East Bay Realtor® · DRE# 02400805
              </p>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-8"
                data-testid="text-hero-name"
              >
                Muzamil<br />Khan
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                I spent 15 years in construction before becoming a Realtor — which means I walk into a house and see things most agents don't. What the inspection report actually means. What that repair will really cost. Whether the price makes sense given the bones. I work with first-time buyers, people moving to the East Bay, and sellers who want someone straight with them.
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-sm">
                <a
                  href="tel:+15106866338"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                  data-testid="link-hero-phone"
                >
                  <Phone className="w-3.5 h-3.5" />
                  (510) 686-6338
                </a>
                <span className="text-white/20 hidden sm:block">·</span>
                <a
                  href="mailto:Muzamil@risegroup.com"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                  data-testid="link-hero-email"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Muzamil@risegroup.com
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact?type=buyer">
                  <Button
                    size="lg"
                    className="bg-white text-[#071B2C] hover:bg-white/90 font-semibold px-6"
                    data-testid="button-buyer-cta"
                  >
                    I'm Buying
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact?type=seller">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 font-semibold px-6"
                    data-testid="button-seller-cta"
                  >
                    I'm Selling
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Photo — right, tall rectangle, flush to bottom */}
            <div className="hidden lg:flex flex-col items-center self-end flex-shrink-0">
              <div className="w-64 xl:w-72 h-[460px] xl:h-[500px] rounded-t-3xl overflow-hidden">
                <img
                  src={profilePhoto}
                  alt="Muzamil Khan — Realtor®"
                  className="w-full h-full object-cover object-top"
                  data-testid="img-hero-photo"
                />
              </div>
              <div className="py-5 flex flex-col items-center gap-2">
                <div className="flex items-center gap-0.5" data-testid="hero-star-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span
                  className="text-xs font-bold bg-[#006AFF] text-white px-2.5 py-1 rounded-full tracking-wide"
                  data-testid="badge-zillow-premier"
                >
                  Zillow Premier Agent
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href="https://www.instagram.com/muzamilkhan.realtor?igsh=MzRlODBiNWFlZA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    data-testid="link-photo-instagram"
                  >
                    <SiInstagram className="w-5 h-5 text-[#E1306C] hover:opacity-80 transition-opacity" />
                  </a>
                  <a
                    href="https://www.zillow.com/profile/muzamil7"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zillow"
                    data-testid="link-photo-zillow"
                  >
                    <SiZillow className="w-5 h-5 text-[#006AFF] hover:opacity-80 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Muzamil — staggered stat layout */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-primary font-medium mb-2">Why Work With Me</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-14 leading-tight max-w-xl">
            Not your average agent.
          </h2>
          <div className="space-y-14">

            <div className="grid md:grid-cols-[140px_1fr] gap-6 md:gap-16 items-start" data-testid="differentiator-construction">
              <div>
                <p className="text-6xl font-bold text-primary leading-none">15</p>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide leading-snug">Years in<br />Construction</p>
              </div>
              <div className="md:border-l md:border-border md:pl-12">
                <h3 className="font-semibold text-xl mb-3">I read inspection reports differently</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When an inspection flags foundation cracks, drainage issues, or a failing roof — I know what it actually costs to fix it, which problems are real, and which ones are noise. That knowledge changes what you offer, how you negotiate, and whether you walk or proceed. Most agents can't do that math. I can.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-[140px_1fr] gap-6 md:gap-16 items-start" data-testid="differentiator-local">
              <div>
                <p className="text-6xl font-bold text-primary leading-none">10+</p>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide leading-snug">Years in<br />El Cerrito</p>
              </div>
              <div className="md:border-l md:border-border md:pl-12">
                <h3 className="font-semibold text-xl mb-3">I actually live here</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I know which El Cerrito blocks get the morning fog and which ones don't. I know the Albany schools by reputation, not by star rating. I walk these neighborhoods. That kind of local knowledge doesn't show up on a map — it shows up when you're deciding between two offers or two houses.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-[140px_1fr] gap-6 md:gap-16 items-start" data-testid="differentiator-consultation">
              <div>
                <p className="text-6xl font-bold text-primary leading-none">$0</p>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide leading-snug">To talk<br />to me</p>
              </div>
              <div className="md:border-l md:border-border md:pl-12">
                <h3 className="font-semibold text-xl mb-3">No pitch. Just a straight conversation.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The first call is free, and I don't do the CRM follow-up pressure thing. If you want to talk through your situation — thinking about buying in six months or selling next spring — I'll give you my honest read on the market and what I'd actually do in your shoes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials — inline, no carousel */}
      <section className="py-14 bg-muted/50 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            <div data-testid="testimonial-0">
              <p className="text-foreground leading-relaxed mb-4 italic">
                "Muzamil caught a drainage issue the inspector had marked 'monitor.' He told me right then it was a real problem. We got $18K off the price before closing."
              </p>
              <p className="text-sm font-semibold text-primary">Sarah T. · El Cerrito</p>
            </div>
            <div data-testid="testimonial-1">
              <p className="text-foreground leading-relaxed mb-4 italic">
                "He knew the Albany market cold. Told us exactly what to offer and how to write it. We beat four other buyers without going over asking."
              </p>
              <p className="text-sm font-semibold text-primary">Marcus & Jen · Albany</p>
            </div>
            <div data-testid="testimonial-2">
              <p className="text-foreground leading-relaxed mb-4 italic">
                "As a first-time buyer I was completely overwhelmed. Muzamil explained every step in plain English. Never felt rushed or confused."
              </p>
              <p className="text-sm font-semibold text-primary">Priya K. · Berkeley</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who I Work With */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Who I Work With</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            First-time buyers, people relocating to the East Bay, experienced buyers, and sellers ready to move on.
          </p>

          {/* First-Time Buyers — Featured */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-10 mb-6" data-testid="card-first-time-buyers">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Where I spend most of my time</span>
            </div>
            <div className="grid md:grid-cols-[1fr_auto] gap-8 items-start">
              <div>
                <h3 className="text-2xl font-bold mb-4">First-Time Home Buyers</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Buying your first home in the East Bay is one of the biggest decisions you'll ever make. I'll walk you through the entire process — pre-approval, offers, inspections, and closing — in plain language, at your pace. My construction background means I catch what other agents walk past on inspections, and I negotiate hard on your behalf because I actually know what repairs cost.
                </p>
                <a
                  href="https://www.zillow.com/profile/muzamil7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  See my reviews on Zillow →
                </a>
              </div>
              <div className="flex flex-row md:flex-col gap-3 flex-shrink-0">
                <Link href="/buyer-hub">
                  <Button size="sm" className="whitespace-nowrap w-full" data-testid="link-buyer-hub">
                    First-Time Buyer Guide
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
                <Link href="/contact?type=buyer">
                  <Button variant="outline" size="sm" className="whitespace-nowrap w-full" data-testid="link-first-time-consult">
                    Let's talk
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Other audiences */}
          <div className="grid md:grid-cols-3 gap-5">
            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-relocators">
              <CardContent className="p-7">
                <Truck className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">Moving to the East Bay</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Relocating from out of area? I know every neighborhood from Oakland to El Cerrito to Richmond, and I can help you find your fit — even before you've arrived.
                </p>
                <Link href="/contact?type=buyer">
                  <Button variant="outline" size="sm" data-testid="link-relocation-cta">
                    Get my neighborhood take <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-buyers">
              <CardContent className="p-7">
                <Hammer className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">Buying a Home</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Strong offers, smart negotiation, and a construction eye that tells you what you're actually buying — not just what the listing says.
                </p>
                <Link href="/buy">
                  <Button variant="outline" size="sm" data-testid="link-learn-buying">
                    How I help buyers <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-sellers">
              <CardContent className="p-7">
                <MapPin className="w-5 h-5 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">Selling Your Home</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Accurate pricing, smart prep guidance, and repair negotiations where I know what things actually cost — so you keep more at closing.
                </p>
                <Link href="/sell">
                  <Button variant="outline" size="sm" data-testid="link-learn-selling">
                    How I help sellers <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-10 md:py-14 bg-[#071B2C] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ask me anything — seriously.</h2>
          <p className="text-white/60 mb-8">
            Not sure if now's the right time? Wondering what your place is worth? I'll give you a straight answer with no strings attached.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-[#071B2C] hover:bg-white/90 font-semibold px-8"
              data-testid="button-cta-contact"
            >
              Let's talk about your situation
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
