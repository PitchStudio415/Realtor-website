import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { 
  Search, 
  FileText, 
  Home, 
  Key,
  CheckCircle2,
  ArrowRight,
  ClipboardCheck,
  Banknote,
  Building,
  BookOpen,
  Truck
} from "lucide-react";
import heroImage from "@assets/stock_images/modern_home_exterior_d46ee0b9.jpg";

const timeline = [
  {
    icon: ClipboardCheck,
    title: "Discovery",
    description: "We discuss your needs, budget, and priorities. I help you understand the current market.",
  },
  {
    icon: Banknote,
    title: "Financing",
    description: "Get pre-approved and understand your true budget including closing costs.",
  },
  {
    icon: Search,
    title: "Touring",
    description: "View homes that match your criteria. I provide context on each property's value.",
  },
  {
    icon: FileText,
    title: "Offer",
    description: "Craft a competitive offer strategy based on market data and seller motivation.",
  },
  {
    icon: Building,
    title: "Escrow",
    description: "Navigate inspections, appraisal, and loan approval. I coordinate all parties.",
  },
  {
    icon: Key,
    title: "Close",
    description: "Final walkthrough, sign documents, and get your keys.",
  },
];

export default function Buy() {
  return (
    <Layout>
      <section className="relative overflow-hidden min-h-[400px] md:min-h-[450px]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white" data-testid="text-buy-headline">
              Buying a Home in El Cerrito, Albany, Berkeley &amp; the East Bay
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium mb-10 leading-relaxed">
              Whether you're a first-time buyer, relocating to the East Bay, or an experienced buyer — I'll guide you from search to closing with data, strategy, and honest advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact?type=buyer">
                <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 shadow-lg" data-testid="button-buy-cta">
                  Book a buyer consult
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/calculator">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-6 bg-white text-foreground border-white hover:bg-white/90 shadow-lg" data-testid="button-calculator-cta">
                  Affordability Calculator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Audience callouts */}
      <section className="py-10 md:py-12 bg-muted/40 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">First-Time Buyers</h3>
                <p className="text-sm text-muted-foreground">I'll explain every step clearly — no jargon, no pressure. You'll feel confident, not confused, from day one.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Relocating to the East Bay</h3>
                <p className="text-sm text-muted-foreground">Moving from out of area? I'll help you understand each neighborhood so you land in the right place, fast.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Experienced Buyers</h3>
                <p className="text-sm text-muted-foreground">Know what you want? I'll help you move fast, compete smart, and negotiate the best deal with construction-level insight.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First-Time Buyer Callout */}
      <section className="py-10 md:py-12 bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-1 block">For First-Time Buyers</span>
              <p className="text-lg md:text-xl font-medium text-foreground">
                Never bought a home before? I'll walk you through every step — from pre-approval to closing — with clear explanations and zero pressure.
              </p>
            </div>
            <Link href="/buyer-hub" className="flex-shrink-0">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" data-testid="button-first-time-buyer-hub">
                First-Time Buyer Hub
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">How I Help Buyers</h2>
            <p className="text-muted-foreground">
              The East Bay market moves fast. My job is to help you move confidently,
              armed with the information you need to make smart decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Market Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  I analyze comparable sales and market trends so you know what homes are actually worth.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Offer Strategy</h3>
                <p className="text-sm text-muted-foreground">
                  We craft competitive offers based on data, not emotion. No overbidding just because.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Negotiate the Best Deal</h3>
                <p className="text-sm text-muted-foreground">
                  I know what repairs and renovations actually cost — which means I negotiate repair credits and price reductions with real numbers, not guesses.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Inspection Guidance</h3>
                <p className="text-sm text-muted-foreground">
                  15 years in construction with builders and developers means I catch what others miss — separating routine maintenance from real red flags that affect value.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Clear Communication</h3>
                <p className="text-sm text-muted-foreground">
                  I explain everything in plain language and respond quickly to your questions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Local Knowledge</h3>
                <p className="text-sm text-muted-foreground">
                  Based in El Cerrito, I know El Cerrito, Albany, Berkeley, Kensington, and the surrounding East Bay deeply.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">The Buying Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From first conversation to getting your keys, here's what to expect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((step, index) => (
              <Card key={step.title} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Buyer Resources</h2>
            <p className="text-muted-foreground">Deep-dive guides to help you understand the process.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/calculator">
              <Card className="h-full hover-elevate cursor-pointer border-primary/20 bg-primary/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1 text-primary">Affordability Calculator</h3>
                  <p className="text-sm text-muted-foreground">What can you afford?</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/buyer-hub/timeline">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Buying Timeline</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step process</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/buyer-hub/offer-basics">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Offer Basics</h3>
                  <p className="text-sm text-muted-foreground">Price, contingencies & more</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/buyer-hub/financing">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Pre-Approval Guide</h3>
                  <p className="text-sm text-muted-foreground">What lenders look for</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/buyer-hub/closing-costs">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Closing Costs</h3>
                  <p className="text-sm text-muted-foreground">What to budget for</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/buyer-hub">
              <Button variant="outline">
                View all buyer resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Home Search?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals, timeline, and budget. No pressure, just a conversation about your options.
          </p>
          <Link href="/contact?type=buyer">
            <Button size="lg" variant="secondary" data-testid="button-buy-cta-bottom">
              Book a buyer consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
