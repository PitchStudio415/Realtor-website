import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, BookOpen } from "lucide-react";
import { sellerModules } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function formatContent(content: string) {
  return content
    .replace(/^# .+\n/m, '')
    .replace(/### (.+)/g, '<h3 class="mt-3 mb-1 font-semibold">$1</h3>')
    .replace(/## (.+)/g, '<h2 class="mt-4 mb-1 font-semibold text-lg">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/- \[ \] /g, '<span class="inline-block w-4">&#x2713;</span> ')
    .replace(/- \[x\] /g, '<span class="inline-block w-4">&#x2713;</span> ')
    .replace(/^- /gm, '&#x2022; ')
    .replace(/\n- /g, '<br/>&#x2022; ')
    .replace(/\n\n+/g, '<br/>')
    .replace(/\n/g, '<br/>');
}

export default function SellerHub() {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-accent/5 to-background py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-accent mb-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Education Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3" data-testid="text-seller-hub-headline">
              Seller Education Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Strategic guidance for selling your home in California, 
              from pricing to close.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-3">
            {sellerModules.map((module, index) => (
              <AccordionItem 
                key={module.slug} 
                value={module.slug}
                className="border rounded-lg bg-card px-6 data-[state=open]:shadow-md transition-shadow"
                data-testid={`accordion-module-${module.slug}`}
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-accent">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <p className="text-muted-foreground text-sm">{module.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div 
                    className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-lg prose-h2:mt-4 prose-h3:text-base prose-h3:mt-3 prose-p:text-muted-foreground prose-p:my-2 prose-li:text-muted-foreground prose-strong:text-foreground ml-14"
                    dangerouslySetInnerHTML={{ __html: formatContent(module.content) }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-accent text-accent-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Discuss Your Sale?</h2>
          <p className="text-accent-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's talk about your timeline, goals, and how to position your home.
          </p>
          <Link href="/contact?type=seller">
            <Button size="lg" variant="secondary" data-testid="button-seller-hub-cta">
              Book a seller consult
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
