import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, MapPin, Phone, Mail, ChevronDown, ChevronUp, Hammer } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    title: "Get fully pre-approved, not just pre-qualified",
    body: "Pre-qualified is a guess; pre-approved means a lender has verified your income and credit and you can shop for real. This is where you learn your true monthly number, including property tax (a bit over 1% of the purchase price in Alameda and Contra Costa counties) and insurance, not just the mortgage. I'll connect you with local lenders who actually answer the phone.",
  },
  {
    title: "Figure out your real budget and must-haves",
    body: "We separate must-haves from nice-to-haves, and match them to neighborhoods you can actually afford. For a first-time buyer, picking the right city for your budget (El Cerrito vs. Richmond vs. Berkeley) is half the battle, and it's exactly what I help you sort out before you waste weekends.",
  },
  {
    title: "Tour with a plan",
    body: "We tour with a strategy, not just open houses: commute, light, noise, schools, and what the block actually feels like morning and night. I'll tell you when a home is worth a second look and when to keep driving.",
  },
  {
    title: "Read the disclosures like they matter",
    body: "In California you usually get the inspection reports up front. This is where my construction background earns its keep: I read past the scary-sounding language to what's cosmetic, what's a real repair, and roughly what it costs, so we offer with eyes open.",
  },
  {
    title: "Make a smart offer, then escrow to keys",
    body: "Today's market is more balanced than the 2021 frenzy, so you often have room for sensible contingencies instead of waiving everything. Once your offer is accepted, escrow runs about 30 days. I keep the lender, title, and inspectors moving so nothing falls through the cracks, then you get the keys.",
  },
];

const SECTIONS = [
  {
    heading: "Can I actually afford to buy my first home in the East Bay?",
    content:
      "Probably sooner than you think, and almost certainly with less money down than you've been told. The single most common myth I hear from first-time buyers is that you need 20% down. You don't. FHA loans allow as little as 3.5% down, plenty of conventional loans go well below 20%, and California first-time-buyer programs like CalHFA can help with the down payment itself.\n\nWhat actually determines your budget is your monthly comfort number, not a giant lump sum. Once a lender verifies your income and credit, we work backward from a monthly payment you're happy with to a price range, then I show you which East Bay cities fit it. Across the area I work in, that range runs from roughly $800K up to $5M, and first-time buyers land all over it depending on city and home type.",
  },
  {
    heading: "Down payment help and first-time-buyer programs",
    content:
      "There's more help available than most first-time buyers realize, and the right lender will know which programs you qualify for. FHA financing (3.5% down) is the workhorse for first-time buyers. Conventional loans with low down payments and mortgage insurance are another path. And California's CalHFA programs can provide down-payment and closing-cost assistance for eligible buyers.\n\nI'm not a lender, so I won't promise you a specific rate or program, but I will make sure you're talking to lenders who actually specialize in first-time buyers and these assistance programs, instead of whoever a big bank assigns you. Getting matched to the right loan is often the difference between buying this year and waiting three.",
  },
  {
    heading: "Why a construction background matters for your first home",
    content:
      "Most of the East Bay's housing stock was built before 1970. That's great for charm and terrible for surprises if you don't know what you're looking at, and as a first-time buyer, you're not expected to. That's my job.\n\nI spent 15 years in construction before real estate. When we walk a home, I'm reading the bones, not the staging: foundation, drainage, original plumbing and wiring, the roof, and whether that addition was ever permitted. When the disclosure packet lands, I translate it into what's cosmetic, what's a real expense, and roughly what it costs, before you ever write an offer. For a first-time buyer, that turns the scariest part of the process into a negotiating tool instead of a reason to panic or overpay.",
  },
];

const FAQS = [
  {
    q: "Who is a good first-time home buyer agent in the East Bay?",
    a: "I'm Muzamil Khan, a Realtor with Rise Group (DRE #02400805), and first-time East Bay buyers are where I spend most of my time. I bring 15 years of construction experience to every showing, so I catch what other agents walk past on inspections and negotiate repairs knowing what they actually cost. I serve El Cerrito, Albany, Berkeley, Kensington, Richmond, and Oakland. Call or text 415-819-8312 or email Muzamil@risegroup.com for a free, no-pressure consultation.",
  },
  {
    q: "Do I need 20% down to buy my first home?",
    a: "No. That's the biggest myth in first-time buying. FHA loans allow as little as 3.5% down, many conventional loans go below 20%, and California programs like CalHFA can help with the down payment itself. Putting less down usually means paying mortgage insurance, but it can be the difference between buying now and waiting years.",
  },
  {
    q: "What credit score do I need to buy a house?",
    a: "It varies by loan, but FHA loans are often available with lower credit scores than people expect, and conventional loans reward stronger credit with better rates. The honest answer is that the only way to know your real options is a quick conversation with a lender, which costs nothing. I can point you to ones who work with first-time buyers all day.",
  },
  {
    q: "How much money do I actually need to buy my first East Bay home?",
    a: "Less than you fear. Beyond the down payment (which can be as low as 3.5%), you'll want funds for closing costs and a small cushion. The smarter way to think about it is your comfortable monthly payment, which a lender translates into a price range. From there I show you which East Bay cities fit your budget.",
  },
  {
    q: "How long does it take to buy a home as a first-time buyer?",
    a: "From a real pre-approval to keys, plan on a few weeks to a couple of months depending on how quickly we find the right home. Once your offer is accepted, escrow usually runs about 30 days. I keep every party moving so it stays on track.",
  },
  {
    q: "What are closing costs and how much are they?",
    a: "Closing costs are the fees to finalize your loan and purchase, lender fees, title, escrow, and a few others, typically a few percent of the price. The good news: they're often negotiable, sometimes covered partly by the seller, and California assistance programs can help with them. I'll make sure you see the full picture before you commit, with no surprises at the table.",
  },
  {
    q: "Should I buy a starter home or wait for my forever home?",
    a: "For most first-time buyers, getting in matters more than getting it perfect. A starter home in the right area builds equity while you wait, and in the East Bay that equity has historically helped buyers move up later. I'll help you weigh the real trade-offs for your budget and timeline, not push you into either.",
  },
  {
    q: "Why use a local agent instead of just browsing Zillow?",
    a: "Zillow shows you listings; it doesn't read the disclosure packet, walk the block at night, or tell you the addition was never permitted. With a construction background, I tell you what a home actually is, not just what the listing says, and I negotiate from real knowledge of repair costs. For a first-time buyer, that guidance is worth far more than a search filter.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0" data-testid={`faq-item-${index}`}>
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
        <p className="pb-4 text-muted-foreground leading-relaxed text-sm md:text-base">{a}</p>
      )}
    </div>
  );
}

export default function FirstTimeBuyerGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "M. Muzamil Khan",
    "description":
      "M. Muzamil Khan at Rise Group Real Estate specializes in first-time home buyers across the East Bay: El Cerrito, Albany, Berkeley, Kensington, Richmond, and Oakland. 15 years of construction experience, honest guidance on down payments, financing, and inspections.",
    "url": "https://muzamilkhanrealtor.com/first-time-home-buyer",
    "telephone": "+14158198312",
    "email": "Muzamil@risegroup.com",
    "worksFor": { "@type": "LocalBusiness", "name": "Rise Group Real Estate" },
    "areaServed": "East Bay, California",
    "audience": { "@type": "Audience", "audienceType": "First-time home buyers" },
    "knowsAbout": [
      "First-time home buyers",
      "Down payment assistance programs",
      "FHA loans",
      "CalHFA first-time buyer programs",
      "East Bay real estate",
      "Home inspections",
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Real Estate License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "California Department of Real Estate",
        "identifier": "DRE #02400805",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": { "@type": "Answer", "text": faq.a },
    })),
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
            <span>First-Time Buyers · East Bay · DRE# 02400805</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3" data-testid="text-ftb-title">
            First-Time Home Buyer Guide for the East Bay
          </h1>
          <p className="text-white/50 text-sm tracking-wide mb-6">Plain language · No pressure · A construction eye on every home</p>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mb-10">
            Buying your first home in the East Bay is one of the biggest decisions you'll make, and you shouldn't have to make it confused or rushed. I'm Muzamil Khan, a Realtor with Rise Group and 15 years in construction before real estate. This is the honest version of what it takes, what it costs, and how a first-time buyer actually gets it done here.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Down Payment", value: "As low as 3.5%" },
              { label: "Cities Served", value: "6 East Bay" },
              { label: "Free Consultation", value: "No pressure" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/8 rounded-xl px-6 py-4">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/50 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-12">
              {SECTIONS.map((section, i) => (
                <div key={i} data-testid={`section-${i}`}>
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  <div className="space-y-4">
                    {section.content.split("\n\n").map((para, j) => (
                      <p key={j} className="text-muted-foreground leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div data-testid="section-process">
                <h2 className="text-2xl font-bold mb-2">The First-Time Buyer Process, Step by Step</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">Five steps, in plain language, at whatever pace works for you.</p>
                <ol className="space-y-6">
                  {STEPS.map((step, i) => (
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

              {/* City guides cross-link */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Buying in a Specific East Bay City?</h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  I've written first-time-buyer guides for the cities I work in most, with real prices and neighborhood detail for each.
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { slug: "el-cerrito", name: "El Cerrito" },
                    { slug: "albany", name: "Albany" },
                    { slug: "berkeley", name: "Berkeley" },
                  ].map((c) => (
                    <Link key={c.slug} href={`/buying-in-${c.slug}`}>
                      <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/40 transition-colors cursor-pointer group">
                        <span className="text-sm font-medium">Buying in {c.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="bg-[#071B2C] text-white border-0 shadow-xl lg:sticky lg:top-24">
                <CardContent className="p-6">
                  <p className="text-xs tracking-widest uppercase text-white/50 mb-2">Free Consultation</p>
                  <h3 className="text-xl font-bold mb-1">New to all this? Let's talk.</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-5">
                    Tell me where you are, even if it's "I have no idea where to start." I'll give you a straight answer and a clear first step. No pressure, no obligation.
                  </p>
                  <Link href="/contact?type=buyer">
                    <Button className="w-full bg-white text-[#071B2C] hover:bg-white/90 font-semibold mb-3" data-testid="button-ftb-contact">
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

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-5">
                  <Hammer className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-semibold mb-1">15 years in construction</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Most East Bay homes predate 1970. Before you offer, I'll tell you what's cosmetic, what's a real repair, and roughly what it costs, so your first home isn't a money pit.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Keep Learning</p>
                  <div className="space-y-1">
                    <Link href="/buyer-hub">
                      <div className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group">
                        <span className="text-sm font-medium">First-Time Buyer Hub</span>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                    <Link href="/calculator">
                      <div className="flex items-center justify-between py-2 px-2 rounded-md hover:bg-muted/50 transition-colors cursor-pointer group">
                        <span className="text-sm font-medium">Affordability Calculator</span>
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
          <p className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Questions First-Time Buyers Actually Ask</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">First-Time Home Buyer FAQ</h2>
          <div>
            {FAQS.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-[#071B2C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-white/40 mb-3">Ready When You Are</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Find Your First Home</h2>
          <p className="text-white/65 text-lg max-w-xl mx-auto mb-8">
            Whether you're months away or ready to tour this weekend, I'm happy to answer questions at whatever pace works for you.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact?type=buyer">
              <Button size="lg" className="bg-white text-[#071B2C] hover:bg-white/90 font-semibold px-6" data-testid="button-cta-ftb">
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/buyer-hub">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold px-6">
                Browse the Buyer Hub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
