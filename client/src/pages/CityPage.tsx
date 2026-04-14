import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, MapPin, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { cities, getCityBySlug } from "@/lib/cityData";
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

export default function CityPage() {
  const params = useParams<{ slug: string }>();
  const city = getCityBySlug(params.slug || "");

  if (!city) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <p className="text-muted-foreground mb-8">We couldn't find that city page.</p>
          <Link href="/"><Button>Back to Home</Button></Link>
        </div>
      </Layout>
    );
  }

  const otherCities = cities.filter((c) => c.slug !== city.slug);

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "M. Muzamil Khan",
    "description": `M. Muzamil Khan at Rise Group Real Estate specializes in ${city.name} homes. Expert guidance on neighborhoods, schools, market data, and commute options.`,
    "url": city.ogUrl,
    "telephone": "+14158198312",
    "email": "Muzamil@risegroup.com",
    "worksFor": { "@type": "LocalBusiness", "name": "Rise Group Real Estate" },
    "areaServed": `${city.name}, CA`,
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
    "mainEntity": city.faqs.map((faq) => ({
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
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white/60 hover:text-white mb-6 -ml-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>West Contra Costa County · DRE# 02400805</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3" data-testid="text-city-name">
            {city.name} Real Estate
          </h1>
          <p className="text-white/50 text-sm tracking-wide mb-6">{city.tagline}</p>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-10">
            {city.intro}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {city.stats.map((stat) => (
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
              {city.sections.map((section, i) => (
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
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <Card className="bg-[#071B2C] text-white border-0 shadow-xl">
                <CardContent className="p-6">
                  <p className="text-xs tracking-widest uppercase text-white/50 mb-2">Work With Me</p>
                  <h3 className="text-xl font-bold mb-1">Buying or Selling in {city.name}?</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-5">
                    M. Muzamil Khan and Rise Group Real Estate can help you navigate this market with local knowledge and honest guidance.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-white text-[#071B2C] hover:bg-white/90 font-semibold mb-3" data-testid="button-city-contact">
                      Get in Touch
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

              {/* Other Cities */}
              <Card>
                <CardContent className="p-5">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Other Cities I Serve</p>
                  <div className="space-y-1">
                    {otherCities.map((c) => (
                      <Link key={c.slug} href={`/cities/${c.slug}`}>
                        <div
                          className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group"
                          data-testid={`link-city-${c.slug}`}
                        >
                          <span className="text-sm font-medium">{c.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    ))}
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
          <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Common Questions</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Frequently Asked About {city.name}
          </h2>
          <div>
            {city.faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-[#071B2C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Ready to Move Forward?</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Talk {city.name} Real Estate
          </h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto mb-8">
            Whether you're buying, selling, or just exploring your options, I'm happy to answer questions at whatever pace works for you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact?type=buyer">
              <Button size="lg" className="bg-white text-[#071B2C] hover:bg-white/90 font-semibold px-6" data-testid="button-cta-buyer">
                I'm Buying
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact?type=seller">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-6" data-testid="button-cta-seller">
                I'm Selling
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
