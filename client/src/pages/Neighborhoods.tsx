import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, MapPin, Home, Users, Car } from "lucide-react";
import { neighborhoods, getNeighborhoodBySlug } from "@/lib/content";
import heroPhoto from "@assets/brand/muzamil-path-suit.jpg";
import { SplitHero } from "@/components/SplitHero";

function NeighborhoodDetail({ slug }: { slug: string }) {
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Neighborhood Not Found</h1>
          <Link href="/neighborhoods">
            <Button>Back to Neighborhoods</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/neighborhoods">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Neighborhoods
            </Button>
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">
                {neighborhood.county === 'alameda' ? 'Alameda County' : 'Contra Costa County'}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-neighborhood-name">
              {neighborhood.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {neighborhood.overview}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="font-semibold text-lg">Housing Stock</h2>
                </div>
                <p className="text-muted-foreground">{neighborhood.housingStock}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-semibold text-lg">Lifestyle</h2>
                </div>
                <p className="text-muted-foreground">{neighborhood.lifestyle}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-chart-3/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-chart-3" />
                  </div>
                  <h2 className="font-semibold text-lg">Who It Fits</h2>
                </div>
                <p className="text-muted-foreground">{neighborhood.whoItFits}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/buyer-hub">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">First-Time Buyer Hub</h3>
                  <p className="text-sm text-muted-foreground">Complete buying guide</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/seller-hub">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">Seller Education</h3>
                  <p className="text-sm text-muted-foreground">Selling your home</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/buy">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">How I Help Buyers</h3>
                  <p className="text-sm text-muted-foreground">My approach</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/sell">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-1">How I Help Sellers</h3>
                  <p className="text-sm text-muted-foreground">My approach</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Interested in {neighborhood.name}?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss what's available and whether it's the right fit for your needs.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary">
              Book a consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-xs text-muted-foreground text-center">
          Note: Neighborhood details change over time. Specific information about schools, 
          commutes, and pricing should be confirmed during your consult.
        </p>
      </div>
    </Layout>
  );
}

const CORE_SLUGS = ['albany', 'berkeley', 'oakland', 'el-cerrito', 'kensington', 'pinole'];
// cities with a dedicated deep-dive page at /cities/:slug
const CITY_PAGE_SLUGS = ['el-cerrito', 'richmond', 'hercules', 'san-pablo', 'pinole', 'el-sobrante', 'rodeo'];

function NeighborhoodIndex() {
  const featuredSlugs = CORE_SLUGS;
  const featuredNeighborhoods = featuredSlugs.map(slug => neighborhoods.find(n => n.slug === slug)).filter(Boolean) as typeof neighborhoods;
  const otherNeighborhoods = neighborhoods.filter(n => !featuredSlugs.includes(n.slug));

  return (
    <Layout>
      <SplitHero
        eyebrow={
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <MapPin className="w-5 h-5" />
            <span className="font-medium">Explore</span>
          </div>
        }
        title={<>Homes for Sale Across the East Bay: El Cerrito, Albany, Berkeley, Oakland, Richmond &amp; More</>}
        titleTestId="text-neighborhoods-headline"
        subtitle="Local expertise across the neighborhoods I know best, and beyond."
        photo={heroPhoto}
        photoAlt="Muzamil Khan on a tree-lined East Bay sidewalk"
      />

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold">Core Neighborhoods</h2>
              <span className="text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-1 rounded">Muzamil's Focus Areas</span>
            </div>
            <p className="text-muted-foreground mb-8 text-center">The communities I know best, where I live, work, and help clients every day.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredNeighborhoods.map((n) => {
                const href = CITY_PAGE_SLUGS.includes(n.slug) ? `/cities/${n.slug}` : `/neighborhoods/${n.slug}`;
                return (
                  <Link key={n.slug} href={href}>
                    <Card className="h-full hover-elevate cursor-pointer border-primary/20" data-testid={`card-neighborhood-${n.slug}`}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{n.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {n.overview}
                        </p>
                        <div className="flex items-center text-sm text-primary font-medium">
                          Learn more <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">More East Bay Communities</h2>
            <p className="text-muted-foreground mb-8">I also serve buyers and sellers throughout the broader East Bay area.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherNeighborhoods.map((n) => (
                <Link key={n.slug} href={CITY_PAGE_SLUGS.includes(n.slug) ? `/cities/${n.slug}` : `/neighborhoods/${n.slug}`}>
                  <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-neighborhood-${n.slug}`}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{n.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {n.overview}
                      </p>
                      <div className="flex items-center text-sm text-primary">
                        Learn more <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-muted/30 border-0">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Neighborhood details change over time. Schools, commute times, and market conditions 
              should be verified during your home search. This information is for general guidance only.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your priorities and find neighborhoods that match your lifestyle and budget.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" data-testid="button-neighborhoods-cta">
              Book a consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default function Neighborhoods() {
  const params = useParams<{ slug?: string }>();
  
  if (params.slug) {
    return <NeighborhoodDetail slug={params.slug} />;
  }
  
  return <NeighborhoodIndex />;
}
