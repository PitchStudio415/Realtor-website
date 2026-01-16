import { Link } from "wouter";
import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email, source: "footer" });
    },
    onSuccess: () => {
      toast({
        title: "You're on the list!",
        description: "Thanks for subscribing to our newsletter.",
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
                <Home className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Easy Bay Living</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Data-driven real estate guidance for first-time buyers and sellers in Alameda and Contra Costa counties.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>El Cerrito, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(510) 555-0123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>hello@easybayliving.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/buy" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-buy">How I Help Buyers</Link></li>
              <li><Link href="/buyer-hub" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-buyer-hub">First-Time Buyer Hub</Link></li>
              <li><Link href="/buyer-hub/timeline" className="text-muted-foreground hover:text-foreground transition-colors">Buying Timeline</Link></li>
              <li><Link href="/buyer-hub/offer-basics" className="text-muted-foreground hover:text-foreground transition-colors">Offer Basics</Link></li>
              <li><Link href="/buyer-hub/financing" className="text-muted-foreground hover:text-foreground transition-colors">Financing Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">For Sellers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sell" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-sell">How I Help Sellers</Link></li>
              <li><Link href="/seller-hub" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-seller-hub">Seller Education Hub</Link></li>
              <li><Link href="/seller-hub/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing Strategy</Link></li>
              <li><Link href="/seller-hub/disclosures" className="text-muted-foreground hover:text-foreground transition-colors">Disclosures Guide</Link></li>
              <li><Link href="/seller-hub/evaluating-offers" className="text-muted-foreground hover:text-foreground transition-colors">Evaluating Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get market insights and first-time buyer tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="input-footer-email"
              />
              <Button 
                type="submit" 
                className="w-full" 
                size="sm"
                disabled={newsletterMutation.isPending}
                data-testid="button-footer-subscribe"
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Easy Bay Living. All rights reserved.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground text-center">
            This website provides general information only and does not constitute legal, tax, or financial advice. 
            Consult with appropriate professionals for specific guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
