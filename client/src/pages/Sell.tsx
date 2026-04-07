import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { 
  BarChart3, 
  Sparkles, 
  Megaphone, 
  FileText,
  CheckCircle2,
  ArrowRight,
  HandshakeIcon,
  Key
} from "lucide-react";
import heroImage from "@assets/stock_images/berkeley_california__0a7c1f06.jpg";

const timeline = [
  {
    icon: BarChart3,
    title: "Pricing",
    description: "I analyze comparable sales and current competition to find the right price strategy.",
  },
  {
    icon: Sparkles,
    title: "Prep",
    description: "Recommendations on repairs, staging, and improvements that actually matter.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    description: "Professional photos, compelling descriptions, and strategic exposure.",
  },
  {
    icon: FileText,
    title: "Offers",
    description: "Review and compare offers, negotiate terms, and select the strongest buyer.",
  },
  {
    icon: HandshakeIcon,
    title: "Escrow",
    description: "Manage inspections, negotiations, and coordinate with all parties.",
  },
  {
    icon: Key,
    title: "Close",
    description: "Final paperwork, transfer of possession, and receive your proceeds.",
  },
];

export default function Sell() {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white" data-testid="text-sell-headline">
              Sell Your Home for Top Dollar in El Cerrito, Albany, Berkeley, Oakland &amp; Across the East Bay
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Strategic pricing, smart preparation, and skilled negotiation to maximize your sale.
            </p>
            <Link href="/contact?type=seller">
              <Button size="lg" className="shadow-lg" data-testid="button-sell-cta">
                Book a seller consult
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Home Valuation Callout */}
      <section className="bg-primary text-primary-foreground py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold mb-1">Know Your Home's True Worth Before You List</h2>
              <p className="text-primary-foreground/80">Free home valuation with no obligation, backed by 15 years of construction industry expertise.</p>
            </div>
            <Link href="/contact?type=seller" className="flex-shrink-0">
              <Button size="lg" variant="secondary" className="font-semibold whitespace-nowrap" data-testid="button-valuation-cta">
                Get a Free Valuation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">How I Help Sellers</h2>
            <p className="text-muted-foreground">
              Selling a home involves dozens of decisions. I provide the data and guidance 
              to help you make each one confidently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Strategic Pricing</h3>
                <p className="text-base text-muted-foreground">
                  Data-driven pricing that positions your home competitively in the current market.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Prep Guidance</h3>
                <p className="text-base text-muted-foreground">
                  Focus your prep budget on improvements that actually impact sale price.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Skilled Negotiation</h3>
                <p className="text-base text-muted-foreground">
                  I evaluate offers holistically and negotiate to protect your interests.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Disclosure Support</h3>
                <p className="text-base text-muted-foreground">
                  Help preparing thorough disclosures that protect you and build buyer trust.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Repair Negotiations</h3>
                <p className="text-base text-muted-foreground">
                  15 years working with builders and developers means I know exactly what repairs cost and which ones matter to buyers.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Escrow Management</h3>
                <p className="text-base text-muted-foreground">
                  I coordinate inspections, appraisals, and all parties through closing.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <CheckCircle2 className="w-6 h-6 text-accent mb-3" />
                <h3 className="font-semibold mb-2">Relocation Coordination</h3>
                <p className="text-base text-muted-foreground">
                  Moving out of the area? I'll coordinate your sale timeline with your move for a seamless transition.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The Selling Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From pricing strategy to handing over the keys, here's what to expect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeline.map((step, index) => (
              <Card key={step.title} className="relative">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Step {index + 1}</span>
                      </div>
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-base text-muted-foreground">{step.description}</p>
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
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Here's what I tell every seller before we list.</h2>
            <p className="text-muted-foreground">
              After years in construction, I've seen what actually moves the needle — and what's just money out the window. Sellers who skip the wrong things and do the right ones come out ahead at closing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-accent">Usually Worth It</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Deep cleaning and decluttering</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Fresh paint in neutral colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Minor repairs (leaky faucets, broken hardware)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Curb appeal improvements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Professional staging (for vacant homes)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-muted-foreground">Often Not Worth It</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 text-center">-</span>
                  <span className="text-muted-foreground">Major kitchen remodel before sale</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 text-center">-</span>
                  <span className="text-muted-foreground">Adding a bathroom</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 text-center">-</span>
                  <span className="text-muted-foreground">High-end finishes in modest neighborhoods</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 text-center">-</span>
                  <span className="text-muted-foreground">Pool installation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 text-center">-</span>
                  <span className="text-muted-foreground">Personalized upgrades (specific paint colors)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Seller Resources</h2>
            <p className="text-muted-foreground">Deep-dive guides to help you prepare and sell successfully.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/seller-hub/pricing">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Pricing Strategy</h3>
                  <p className="text-base text-muted-foreground">Comps & market analysis</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/seller-hub/disclosures">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Disclosures Guide</h3>
                  <p className="text-base text-muted-foreground">What to disclose in CA</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/seller-hub/evaluating-offers">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Evaluating Offers</h3>
                  <p className="text-base text-muted-foreground">Beyond the price</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/seller-hub/repairs-vs-credits">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Repairs vs Credits</h3>
                  <p className="text-base text-muted-foreground">How to decide</p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/seller-hub">
              <Button variant="outline">
                View all seller resources
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-accent text-accent-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Discuss Your Sale?</h2>
          <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's talk about your timeline, goals, and how to position your home for success.
          </p>
          <Link href="/contact?type=seller">
            <Button size="lg" variant="secondary" data-testid="button-sell-cta-bottom">
              Book a seller consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
