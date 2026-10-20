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
import FirstTimeBuyerGuide from "@/pages/FirstTimeBuyerGuide";
import Start from "@/pages/Start";
import HomeValuation from "@/pages/HomeValuation";
import SellWithoutAgent from "@/pages/SellWithoutAgent";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import PathToKeys from "@/pages/PathToKeys";
import PtkStep from "@/pages/PtkStep";
import PtkDocs from "@/pages/PtkDocs";
import { CITY_ORDER } from "@/lib/trail";
import { REDIRECTS } from "@shared/redirects";

/** Client-side counterpart of the server's 301s, for in-app links to old URLs. */
function ClientRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}

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

  // New page opens at the top; a link with a #section jumps to that section instead.
  // Back/forward keeps the browser's own scroll position.
  useEffect(() => {
    const onPop = () => {
      (window as unknown as { __navBack?: boolean }).__navBack = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const w = window as unknown as { __navBack?: boolean };
    if (w.__navBack) {
      w.__navBack = false;
      return;
    }
    const id = window.location.hash.slice(1);
    requestAnimationFrame(() => {
      const target = id ? document.getElementById(decodeURIComponent(id)) : null;
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      {Object.entries(REDIRECTS).map(([from, to]) => (
        <Route key={from} path={from}>
          <ClientRedirect to={to} />
        </Route>
      ))}
      <Route path="/" component={Home} />
      <Route path="/start" component={Start} />
      <Route path="/buy" component={Buy} />
      <Route path="/buy/path-to-keys" component={PathToKeys} />
      <Route path="/buy/path-to-keys/documents" component={PtkDocs} />
      <Route path="/buy/path-to-keys/documents/:slug" component={PtkDocs} />
      <Route path="/buy/path-to-keys/:slug" component={PtkStep} />
      <Route path="/sell" component={Sell} />
      <Route path="/selling-without-an-agent-el-cerrito" component={SellWithoutAgent} />
      <Route path="/home-valuation" component={HomeValuation} />
      <Route path="/calculator" component={Calculator} />
      <Route path="/first-time-home-buyer" component={FirstTimeBuyerGuide} />
      <Route path="/buyer-hub/:slug" component={BuyerHub} />
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
      {CITY_ORDER.map((slug) => (
        <Route key={slug} path={`/buying-in-${slug}`} component={BuyerGuide} />
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
