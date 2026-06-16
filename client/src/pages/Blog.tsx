import { Link, useParams } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/layout/Layout";
import { ArrowRight, ArrowLeft, Search, Calendar, ChevronDown } from "lucide-react";
import { blogPosts, getBlogPostBySlug, isPublished } from "@/lib/content";

// Baked at build time (vite define). Falls back to now if the prerender
// context doesn't apply the define. Used as the stable first-render reference
// so scheduled posts don't cause a hydration mismatch.
declare const __BUILD_MS__: number;
const BUILD_MS: number =
  typeof __BUILD_MS__ !== "undefined" ? __BUILD_MS__ : Date.now();
import { Badge } from "@/components/ui/badge";
import heroPhoto from "@assets/brand/muzamil-pinole-cafe.jpg";
import { SplitHero } from "@/components/SplitHero";

const categories = [
  { value: 'all', label: 'All' },
  { value: 'first-time-buyers', label: 'First-Time Buyers' },
  { value: 'selling', label: 'Selling' },
  { value: 'financing', label: 'Financing' },
  { value: 'market-basics', label: 'Market Basics' },
  { value: 'inspections', label: 'Inspections' },
  { value: 'neighborhood-life', label: 'Neighborhood Life' },
];

function FaqAccordion({ faq }: { faq: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div key={i} className="border border-border rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium hover:bg-muted/50 transition-colors"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              data-testid={`faq-toggle-${i}`}
            >
              <span>{item.question}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-3 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 pt-1 text-muted-foreground text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogPostPage({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);

  // Treat a not-yet-published (scheduled) post as missing so its URL can't
  // leak the content before its date.
  if (!post || !isPublished(post)) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="secondary" className="text-xs">
              {post.category.replace('-', ' ')}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formattedDate}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-blog-title">
            {post.title}
          </h1>
        </div>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-6 prose-h3:text-lg prose-h3:mt-4 prose-p:text-muted-foreground prose-p:my-2 prose-li:text-muted-foreground prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ 
            __html: post.content
              .replace(/^# .+\n/m, '')
              .replace(/### (.+)/g, '</p><h3>$1</h3><p>')
              .replace(/## (.+)/g, '</p><h2>$1</h2><p>')
              .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
              .replace(/^- /gm, '&#x2022; ')
              .replace(/\n- /g, '<br/>&#x2022; ')
              .replace(/\n\n+/g, '</p><p>')
              .replace(/\n/g, '<br/>')
          }}
        />

        {post.faq && post.faq.length > 0 && <FaqAccordion faq={post.faq} />}
        
        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="font-semibold mb-2">Have a question about your move?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            No pressure and no obligation. Leave your contact info and I'll follow up, or book a call and we'll talk through whatever you're weighing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://calendly.com/muzamil-risegroup/30min" target="_blank" rel="noopener noreferrer">
              <Button>
                Book a call
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline">
                Leave your contact info
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

function BlogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Start from the build-time reference (identical on server + first client
  // render), then switch to real time after mount so a scheduled post reveals
  // itself on its publish date without a rebuild.
  const [refMs, setRefMs] = useState(BUILD_MS);
  useEffect(() => {
    setRefMs(Date.now());
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory && isPublished(post, refMs);
  });

  return (
    <Layout>
      <SplitHero
        title="Blog"
        titleTestId="text-blog-headline"
        subtitle="Practical insights for Bay Area buyers and sellers."
        photo={heroPhoto}
        photoAlt="Muzamil Khan at a café table in Old Town Pinole"
      />

      <section className="py-8 border-b border-border sticky top-16 bg-background z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="whitespace-nowrap"
                  data-testid={`button-category-${cat.value}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-blog-search"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found matching your search.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-blog-${post.slug}`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {post.category.replace('-', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-sm text-primary">
                        Read more <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default function Blog() {
  const params = useParams<{ slug?: string }>();
  
  if (params.slug) {
    return <BlogPostPage slug={params.slug} />;
  }
  
  return <BlogIndex />;
}
