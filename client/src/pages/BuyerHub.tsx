import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, BookOpen, ChevronDown } from "lucide-react";
import { buyerModules } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function formatContent(content: string) {
  return content
    .replace(/^# .+\n+/m, '')
    .replace(/\n+### (.+)\n+/g, '<h3 class="mt-2 font-semibold">$1</h3>')
    .replace(/\n+## (.+)\n+/g, '<h2 class="mt-3 font-semibold text-lg">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/- \[ \] /g, '<span class="inline-block w-4">&#x2713;</span> ')
    .replace(/- \[x\] /g, '<span class="inline-block w-4">&#x2713;</span> ')
    .replace(/^- /gm, '&#x2022; ')
    .replace(/\n- /g, '<br/>&#x2022; ')
    .replace(/\n\n+/g, '<br/>')
    .replace(/\n/g, '<br/>');
}

export default function BuyerHub() {
  return (
    <Layout>
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-primary mb-3">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Education Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3" data-testid="text-buyer-hub-headline">
              First-Time Buyer Guide
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Everything you need to know about buying your first home in California, 
              from pre-approval to closing day.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="space-y-3">
            {buyerModules.map((module, index) => (
              <AccordionItem 
                key={module.slug} 
                value={module.slug}
                className="border rounded-lg bg-card px-6 data-[state=open]:shadow-md transition-shadow"
                data-testid={`accordion-module-${module.slug}`}
              >
                <AccordionTrigger className="hover:no-underline py-5">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <p className="text-muted-foreground text-sm">{module.description}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div 
                    className="text-sm text-muted-foreground ml-14 [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatContent(module.content) }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-primary text-primary-foreground">
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
