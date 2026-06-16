import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { getSeoForPath } from "./lib/seo";
import { initAnalytics, trackPageview } from "./lib/analytics";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Buy from "@/pages/Buy";
import Sell from "@/pages/Sell";
import Calculator from "@/pages/Calculator";
import BuyerHub from "@/pages/BuyerHub";
import SellerHub from "@/pages/SellerHub";
import Neighborhoods from "@/pages/Neighborhoods";
import Blog from "@/pages/Blog";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import CityPage from "@/pages/CityPage";
import BuyerGuide from "@/pages/BuyerGuide";
import HomeValuation from "@/pages/HomeValuation";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { buyerGuides } from "@/lib/buyerGuideData";

function setMetaContent(selector: string, content: string) {
  const el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.setAttribute("content", content);
}

/** Applies per-route title/meta/canonical/JSON-LD and reports SPA pageviews. */
function HeadManager() {
  const [location] = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const seo = getSeoForPath(location);

    document.title = seo.title;
    setMetaContent('meta[name="description"]', seo.description);
    setMetaContent('meta[property="og:title"]', seo.title);
    setMetaContent('meta[property="og:description"]', seo.description);
    setMetaContent('meta[name="twitter:title"]', seo.title);
    setMetaContent('meta[name="twitter:description"]', seo.description);
    setMetaContent('meta[property="og:type"]', seo.ogType);

    let ogUrl = document.head.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", seo.canonical);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", seo.canonical);

    const JSONLD_ID = "route-jsonld";
    document.getElementById(JSONLD_ID)?.remove();
    if (seo.jsonLd.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = JSONLD_ID;
      script.textContent = JSON.stringify(seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd);
      document.head.appendChild(script);
    }

    trackPageview(location);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buy" component={Buy} />
      <Route path="/sell" component={Sell} />
      <Route path="/home-valuation" component={HomeValuation} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/buyer-hub" component={BuyerHub} />
      <Route path="/buyer-hub/:slug" component={BuyerHub} />
      <Route path="/seller-hub" component={SellerHub} />
      <Route path="/seller-hub/:slug" component={SellerHub} />
      <Route path="/neighborhoods" component={Neighborhoods} />
      <Route path="/neighborhoods/:slug" component={Neighborhoods} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cities/:slug" component={CityPage} />
      {buyerGuides.map((g) => (
        <Route key={g.slug} path={`/buying-in-${g.slug}`} component={BuyerGuide} />
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <HeadManager />
          <Router />
          <MobileCtaBar />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
