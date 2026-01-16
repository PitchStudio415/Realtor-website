import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import { buyerModules, getBuyerModuleBySlug } from "@/lib/content";

function ModuleContent({ slug }: { slug: string }) {
  const module = getBuyerModuleBySlug(slug);
  const currentIndex = buyerModules.findIndex(m => m.slug === slug);
  const prevModule = currentIndex > 0 ? buyerModules[currentIndex - 1] : null;
  const nextModule = currentIndex < buyerModules.length - 1 ? buyerModules[currentIndex + 1] : null;

  if (!module) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Link href="/buyer-hub">
            <Button>Back to Buyer Hub</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-8">
          <Link href="/buyer-hub">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Buyer Hub
            </Button>
          </Link>
          <span className="text-sm font-medium text-primary">First-Time Buyer Hub</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2" data-testid="text-module-title">
            {module.title}
          </h1>
        </div>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-6 prose-h3:text-lg prose-h3:mt-4 prose-p:text-muted-foreground prose-p:my-2 prose-li:text-muted-foreground prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ 
            __html: module.content
              .replace(/^# .+\n/m, '')
              .replace(/### (.+)/g, '</p><h3>$1</h3><p>')
              .replace(/## (.+)/g, '</p><h2>$1</h2><p>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/- \[ \]/g, '<span class="text-muted-foreground">&#x2022;</span>')
              .replace(/- \[x\]/g, '<span class="text-accent">&#x2022;</span>')
              .replace(/\n\n+/g, '</p><p>')
              .replace(/\n/g, '<br/>')
          }}
        />
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 justify-between">
          {prevModule ? (
            <Link href={`/buyer-hub/${prevModule.slug}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {prevModule.title}
              </Button>
            </Link>
          ) : <div />}
          {nextModule && (
            <Link href={`/buyer-hub/${nextModule.slug}`}>
              <Button className="w-full sm:w-auto">
                {nextModule.title}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </article>
    </Layout>
  );
}

function HubIndex() {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-4">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Education Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-buyer-hub-headline">
              First-Time Buyer Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Everything you need to know about buying your first home in California, 
              from pre-approval to closing day.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4">
            {buyerModules.map((module, index) => (
              <Link key={module.slug} href={`/buyer-hub/${module.slug}`}>
                <Card className="hover-elevate cursor-pointer" data-testid={`card-module-${module.slug}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-semibold text-primary">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{module.title}</h3>
                        <p className="text-muted-foreground text-sm">{module.description}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Home Search?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and get your questions answered.
          </p>
          <Link href="/contact?type=buyer">
            <Button size="lg" variant="secondary" data-testid="button-buyer-hub-cta">
              Book a buyer consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default function BuyerHub() {
  const params = useParams<{ slug?: string }>();
  
  if (params.slug) {
    return <ModuleContent slug={params.slug} />;
  }
  
  return <HubIndex />;
}
