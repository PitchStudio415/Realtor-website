import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { 
  BarChart3, 
  MessageSquare, 
  Wrench, 
  BookOpen, 
  Home as HomeIcon, 
  DollarSign,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { blogPosts } from "@/lib/content";

export default function Home() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email, source: "home-checklist" });
    },
    onSuccess: () => {
      toast({
        title: "Check your inbox!",
        description: "Your First-Time Buyer Checklist is on the way.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <Layout>
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-headline">
              Clear guidance for buying and selling in the East Bay.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-subhead">
              Data-led strategy, strong negotiation, and practical advice for first-time buyers and sellers in Alameda and Contra Costa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?type=buyer">
                <Button size="lg" className="w-full sm:w-auto" data-testid="button-buyer-cta">
                  Book a buyer consult
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact?type=seller">
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-seller-cta">
                  Book a seller consult
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Work With Me</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A strategic approach that puts your interests first.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-0 shadow-md hover-elevate" data-testid="card-proof-data">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Data-Driven Strategy</h3>
                <p className="text-muted-foreground text-sm">
                  Every pricing decision and offer strategy is backed by thorough market analysis, not guesswork.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover-elevate" data-testid="card-proof-negotiation">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Strong Negotiation</h3>
                <p className="text-muted-foreground text-sm">
                  13+ years in sales means I know how to advocate for your interests and communicate clearly.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md hover-elevate" data-testid="card-proof-construction">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Wrench className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Construction Experience</h3>
                <p className="text-muted-foreground text-sm">
                  Residential experience helps me guide you through inspections, repairs, and scope conversations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Learn Before You Leap</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Free guides to help you understand the process.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <Card className="group hover-elevate" data-testid="card-education-buyer">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                  <HomeIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">First-Time Buyer Guide</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Step-by-step walkthrough from pre-approval to closing, designed for California buyers.
                </p>
                <Link href="/buyer-hub">
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Read the guide <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="group hover-elevate" data-testid="card-education-seller">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Seller Prep Guide</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  How to prepare your home, price strategically, and maximize your sale.
                </p>
                <Link href="/seller-hub">
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Read the guide <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="group hover-elevate" data-testid="card-education-financing">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-md bg-chart-3/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-chart-3" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Financing Basics</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Understand pre-approval, loan types, and what lenders look for.
                </p>
                <Link href="/buyer-hub/financing">
                  <Button variant="ghost" size="sm" className="p-0 h-auto">
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get the Bay Area First-Time Buyer Checklist
            </h2>
            <p className="text-primary-foreground mb-6">
              A printable guide covering everything from credit check to closing day.
            </p>
            <form onSubmit={handleChecklist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border-white/40 text-white placeholder:text-white/80"
                data-testid="input-checklist-email"
              />
              <Button 
                type="submit" 
                variant="secondary"
                disabled={newsletterMutation.isPending}
                data-testid="button-checklist-submit"
              >
                {newsletterMutation.isPending ? "Sending..." : "Get the Checklist"}
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/80 mt-3">
              By subscribing, you agree to receive occasional market updates. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Recent Articles</h2>
              <p className="text-muted-foreground">Practical insights for Bay Area buyers and sellers.</p>
            </div>
            <Link href="/blog" className="hidden sm:block">
              <Button variant="ghost">
                View all <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="group hover-elevate" data-testid={`card-blog-${post.slug}`}>
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {post.category.replace('-', ' ')}
                  </span>
                  <h3 className="font-semibold text-lg mt-2 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Read more <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blog">
              <Button variant="outline">
                View all articles <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Whether you're buying your first home or selling your current one, let's talk about your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?type=buyer">
                <Button size="lg" className="w-full sm:w-auto" data-testid="button-cta-buyer-bottom">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Book a buyer consult
                </Button>
              </Link>
              <Link href="/contact?type=seller">
                <Button size="lg" variant="outline" className="w-full sm:w-auto" data-testid="button-cta-seller-bottom">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Book a seller consult
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
