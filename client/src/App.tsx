import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buy" component={Buy} />
      <Route path="/sell" component={Sell} />
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
