import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { Phone, Mail, ArrowRight, MapPin } from "lucide-react";
import profilePhoto from "@assets/ProfilePhoto_1773373912154.jpeg";

export default function Home() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#0F172A] text-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center sm:items-start gap-10">
          {/* Portrait */}
          <div className="flex-shrink-0">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-white/10">
              <img
                src={profilePhoto}
                alt="Muzamil Khan — Realtor®"
                className="w-full h-full object-cover object-top"
                data-testid="img-hero-photo"
              />
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs tracking-widest uppercase text-white/40 mb-3 font-medium">
              El Cerrito · Albany · Berkeley · Kensington
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-1"
              data-testid="text-hero-name"
            >
              Muzamil Khan
            </h1>
            <p className="text-lg text-white/60 font-medium mb-1">Realtor®</p>
            <p className="text-sm text-white/35 mb-2">DRE# 02400805</p>
            <div className="flex items-center gap-2 text-white/45 text-sm mb-6">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>El Cerrito, Albany, Berkeley, Kensington & surrounding East Bay</span>
            </div>

            <div className="w-12 h-px bg-white/20 mb-6" />

            <p className="text-white/65 text-base leading-relaxed mb-6 max-w-lg">
              Your trusted El Cerrito, Albany &amp; Berkeley Realtor® — backed by 15 years in the construction industry working with builders, developers, and investors. Get expert guidance for buying, selling, or relocating in the East Bay.
            </p>

            <div className="space-y-2 mb-7">
              <a
                href="tel:+15106866338"
                className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
                data-testid="link-hero-phone"
              >
                <Phone className="w-3.5 h-3.5" />
                (510) 686-6338
              </a>
              <a
                href="mailto:Muzamil@risegroup.com"
                className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors text-sm"
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
                  className="bg-white text-[#0F172A] hover:bg-white/90 font-semibold px-6"
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
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How I Can Help</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you're buying your first home or ready to sell, I'll guide you through every step.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-buyers">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">For Buyers</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Offer strategy, tough negotiation, and inspection guidance backed by 15 years in construction — so you know exactly what you're buying and never overpay.
                </p>
                <div className="flex gap-3">
                  <Link href="/buy">
                    <Button variant="outline" size="sm" data-testid="link-learn-buying">
                      Learn more
                    </Button>
                  </Link>
                  <Link href="/buyer-hub">
                    <Button variant="ghost" size="sm" data-testid="link-buyer-hub">
                      Buyer guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border hover:shadow-md transition-shadow" data-testid="card-sellers">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-3">For Sellers</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">
                  Expert home valuation, strategic pricing, and repair negotiations where my construction background puts more money in your pocket at closing.
                </p>
                <div className="flex gap-3">
                  <Link href="/sell">
                    <Button variant="outline" size="sm" data-testid="link-learn-selling">
                      Learn more
                    </Button>
                  </Link>
                  <Link href="/seller-hub">
                    <Button variant="ghost" size="sm" data-testid="link-seller-hub">
                      Seller guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-14 md:py-16 bg-[#0F172A] text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-white/60 mb-8">
            Free consultation — no pressure, no obligation. Just a straightforward conversation about your goals.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-[#0F172A] hover:bg-white/90 font-semibold px-8"
              data-testid="button-cta-contact"
            >
              Book a free consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
