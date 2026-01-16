import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, MapPin, Award, MessageSquare, BarChart3, Languages } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function About() {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-about-headline">
                About Me
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                I'm a data-driven real estate agent helping first-time buyers and sellers navigate the 
                East Bay market with confidence.
              </p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Based in El Cerrito, serving Alameda and Contra Costa counties</span>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Avatar className="w-56 h-56 md:w-72 md:h-72">
                  <AvatarFallback className="text-6xl md:text-7xl bg-primary/10 text-primary">
                    BA
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">My Approach</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground mb-4">
                Real estate is one of the biggest financial decisions most people make. 
                I believe you deserve clear information, not sales pressure.
              </p>
              <p className="text-muted-foreground mb-4">
                My background includes 13+ years in sales across various industries, 
                where I learned that the best outcomes come from truly understanding 
                what clients need and communicating honestly—even when it's not what 
                they want to hear.
              </p>
              <p className="text-muted-foreground">
                I bring that same approach to real estate. I'll give you the data, 
                explain your options, and advocate hard for your interests—but I won't 
                push you into a decision that doesn't make sense for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What I Bring</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Data-Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Every recommendation is backed by market analysis, not hunches.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Clear Communication</h3>
                <p className="text-sm text-muted-foreground">
                  I explain things in plain language and respond quickly.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-chart-3/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-chart-3" />
                </div>
                <h3 className="font-semibold mb-2">Sales Experience</h3>
                <p className="text-sm text-muted-foreground">
                  13+ years of negotiation experience working for your interests.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-chart-4/10 flex items-center justify-center mx-auto mb-4">
                  <Languages className="w-6 h-6 text-chart-4" />
                </div>
                <h3 className="font-semibold mb-2">Multilingual</h3>
                <p className="text-sm text-muted-foreground">
                  Fluent in English, Urdu, and Hindi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Local Knowledge</h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-muted-foreground mb-4">
                I live in El Cerrito and know the East Bay deeply. From the hills of Berkeley 
                to the neighborhoods of Oakland, from Walnut Creek to Fremont—I understand 
                what makes each area unique.
              </p>
              <p className="text-muted-foreground">
                This local knowledge helps me guide buyers to neighborhoods that match their 
                lifestyle and helps sellers understand who's buying in their area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's Talk</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether you're buying, selling, or just exploring your options, I'm happy to 
            answer questions and discuss your goals.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" data-testid="button-about-cta">
              Book a consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
