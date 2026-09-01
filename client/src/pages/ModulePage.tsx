import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, ChevronRight } from "lucide-react";
import { buyerModules, sellerModules } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/seo";
import type { EducationModule } from "@shared/schema";

interface Props {
  hub: "buyer" | "seller";
  module: EducationModule;
}

const HUB_META = {
  buyer: {
    path: "/buyer-hub",
    label: "First-Time Buyer Hub",
    crumb: "First-Time Buyer Hub",
    modules: buyerModules,
    ctaHref: "/contact?type=buyer",
    ctaText: "Book a buyer consult",
  },
  seller: {
    path: "/seller-hub",
    label: "Seller Education Hub",
    crumb: "Seller Education Hub",
    modules: sellerModules,
    ctaHref: "/contact?type=seller",
    ctaText: "Book a seller consult",
  },
} as const;

/** A single education module rendered as its own full-content page. */
export default function ModulePage({ hub, module }: Props) {
  const meta = HUB_META[hub];
  const related = meta.modules.filter((m) => m.slug !== module.slug).slice(0, 4);
  const bodyHtml = renderMarkdown(module.content, { dropH1: true });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: meta.crumb, item: `${SITE_URL}${meta.path}` },
      { "@type": "ListItem", position: 3, name: module.title, item: `${SITE_URL}${meta.path}/${module.slug}` },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href={meta.path} className="hover:text-primary">{meta.crumb}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground">{module.title}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-module-title">
            {module.title}
          </h1>
          <p className="text-lg text-muted-foreground">{module.description}</p>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article
            className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h3:text-lg prose-h3:mt-5 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <div className="mt-10 flex items-center justify-between border-t pt-6">
            <Link href={meta.path}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All {hub === "buyer" ? "buyer" : "seller"} guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-8 md:py-10 bg-muted/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-5">Keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((m) => (
                <Link key={m.slug} href={`${meta.path}/${m.slug}`}>
                  <div className="h-full rounded-lg border bg-card p-5 hover-elevate cursor-pointer">
                    <h3 className="font-semibold mb-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{m.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 md:py-12 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Have a question about this?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            I'm happy to walk you through it for your specific situation, no pressure.
          </p>
          <Link href={meta.ctaHref}>
            <Button size="lg" variant="secondary">
              {meta.ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
