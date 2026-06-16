import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, MapPin, Phone, Mail, ChevronDown, ChevronUp, Hammer } from "lucide-react";
import { buyerGuides, getBuyerGuideBySlug } from "@/lib/buyerGuideData";
import { useState } from "react";

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-border last:border-0"
      data-testid={`faq-item-${index}`}
    >
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors"
        onClick={() => setOpen(!open)}
        data-testid={`faq-toggle-${index}`}
      >
        <span className="font-medium text-base">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 flex-shrink-0 text-primary" />
        ) : (
          <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
        )}
      </button>
      {open && (
        <p className="pb-4 text-muted-foreground leading-relaxed text-sm md:text-base">
          {a}
        </p>
      )}
    </div>
  );
}

export default function BuyerGuide() {
  // Routes are registered as /buying-in-<slug>; derive the slug from the path.
  const [location] = useLocation();
  const slug = location.replace(/^\/buying-in-/, "").replace(/\/.*$/, "");
  const guide = getBuyerGuideBySlug(slug);

  if (!guide) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find that buyer guide.</p>
          <Link href="/"><Button>Back to Home</Button></Link>
        </div>
      </Layout>
    );
  }

  const otherGuides = buyerGuides.filter((g) => g.slug !== guide.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "M. Muzamil Khan",
    "description": `M. Muzamil Khan at Rise Group Real Estate helps first-time and experienced buyers purchase homes in ${guide.name}, CA. 15 years of construction experience, honest guidance on neighborhoods, pricing, and inspections.`,
    "url": guide.ogUrl,
    "telephone": "+14158198312",
    "email": "Muzamil@risegroup.com",
    "worksFor": { "@type": "LocalBusiness", "name": "Rise Group Real Estate" },
    "areaServed": `${guide.name}, CA`,
    "knowsAbout": ["First-time home buyers", "East Bay real estate", "Home inspections", `Buying a home in ${guide.name}`],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Real Estate License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "California Department of Real Estate",
        "identifier": "DRE #02400805"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a }
    }))
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-[#071B2C] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/buy">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              How I Help Buyers
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>East Bay Buyer's Guide · DRE# 02400805</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3" data-testid="text-guide-name">
            Buying a Home in {guide.name}
          </h1>
          <p className="text-white/50 text-sm tracking-wide mb-6">{guide.tagline}</p>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-10">
            {guide.intro}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {guide.stats.map((stat) => (
              <div key={stat.label} className="bg-white/8 rounded-xl px-6 py-4" data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              {guide.sections.map((section, i) => (
                <div key={i} data-testid={`section-${i}`}>
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.content.split("\n\n").map((para, j) => (
                      <p key={j} className="text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Buying process steps */}
              <div data-testid="section-process">
                <h2 className="text-2xl font-bold mb-2">The Buying Process for a First-Time East Bay Buyer</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Five steps, in plain language, at whatever pace works for you.
                </p>
                <ol className="space-y-6">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex gap-4" data-testid={`step-${i}`}>
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="bg-[#071B2C] text-white border-0 shadow-xl lg:sticky lg:top-24">
                <CardContent className="p-6">
                  <p className="text-xs tracking-widest uppercase text-white/50 mb-2">Free Consultation</p>
                  <h3 className="text-xl font-bold mb-1">Thinking about buying in {guide.name}?</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-5">
                    Tell me where you are in the process. I'll give you a straight answer and a clear next step, no pressure, no obligation.
                  </p>
                  <Link href="/contact?type=buyer">
                    <Button className="w-full bg-white text-[#071B2C] hover:bg-white/90 font-semibold mb-3" data-testid="button-guide-contact">
                      Book a Free Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <div className="space-y-2 pt-2">
                    <a href="tel:+14158198312" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                      <Phone className="w-3.5 h-3.5" />
                      415-819-8312
                    </a>
                    <a href="mailto:Muzamil@risegroup.com" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm">
                      <Mail className="w-3.5 h-3.5" />
                      Muzamil@risegroup.com
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Construction edge callout */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-5">
                  <Hammer className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-semibold mb-1">15 years in construction</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I read inspection reports differently. Before you offer, I'll tell you what's cosmetic, what's a real repair, and roughly what it costs.
                  </p>
                </CardContent>
              </Card>

              {/* Other buyer guides */}
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Buying Elsewhere in the East Bay</p>
                  <div className="space-y-1">
                    {otherGuides.map((g) => (
                      <Link key={g.slug} href={`/buying-in-${g.slug}`}>
                        <div
                          className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                          data-testid={`link-guide-${g.slug}`}
                        >
                          <span className="text-sm font-medium">Buying in {g.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
                    <Link href={`/cities/${guide.slug}`}>
                      <div
                        className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                        data-testid={`link-city-${guide.slug}`}
                      >
                        <span className="text-sm font-medium">{guide.name} Market Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-muted/40 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Questions Buyers Actually Ask</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Buying in {guide.name}: FAQ
          </h2>
          <div>
            {guide.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-[#071B2C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Ready When You Are</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Find Your First Home in {guide.name}
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto mb-8">
            Whether you're months away or ready to tour this weekend, I'm happy to answer questions at whatever pace works for you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact?type=buyer">
              <Button size="lg" className="bg-white text-[#071B2C] hover:bg-white/90 font-semibold px-6" data-testid="button-cta-buyer">
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/buyer-hub">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-6" data-testid="button-cta-hub">
                First-Time Buyer Hub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
