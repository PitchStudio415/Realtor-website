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
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-md bg-white/20 flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-lg text-white">Muzamil Khan - Realtor®</span>
            </Link>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Trusted, 5-star real estate guidance for first-time buyers, movers, and sellers in El Cerrito, Albany, Berkeley, Kensington, and the surrounding East Bay.
            </p>
            <Link href="/contact" data-testid="link-footer-free-consult">
              <Button variant="secondary" size="sm" className="mb-4 font-semibold w-full">
                Book a Free Consultation
              </Button>
            </Link>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>El Cerrito, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(510) 686-6338</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>Muzamil@risegroup.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-white">For Buyers</h3>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/buy" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-footer-buy">How I Help Buyers</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/buyer-hub" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-footer-buyer-hub">First-Time Buyer Hub</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/buyer-hub/timeline" className="text-primary-foreground/80 hover:text-white transition-colors">Buying Timeline</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/buyer-hub/offer-basics" className="text-primary-foreground/80 hover:text-white transition-colors">Offer Basics</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/buyer-hub/financing" className="text-primary-foreground/80 hover:text-white transition-colors">Financing Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-white">For Sellers</h3>
            <ul className="space-y-1.5 text-sm">
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/sell" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-footer-sell">How I Help Sellers</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/seller-hub" className="text-primary-foreground/80 hover:text-white transition-colors" data-testid="link-footer-seller-hub">Seller Education Hub</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/seller-hub/pricing" className="text-primary-foreground/80 hover:text-white transition-colors">Pricing Strategy</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/seller-hub/disclosures" className="text-primary-foreground/80 hover:text-white transition-colors">Disclosures Guide</Link></li>
              <li className="flex items-center gap-2"><span className="text-primary-foreground/60">&#x2022;</span><Link href="/seller-hub/evaluating-offers" className="text-primary-foreground/80 hover:text-white transition-colors">Evaluating Offers</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3 text-white">Stay Updated</h3>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Get market insights and first-time buyer tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                data-testid="input-footer-email"
              />
              <Button 
                type="submit" 
                variant="secondary"
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
        
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/70">
            <p>&copy; {new Date().getFullYear()} Muzamil Khan - Realtor®. All rights reserved.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
          <p className="mt-4 text-xs text-primary-foreground/60 text-center">
            This website provides general information only and does not constitute legal, tax, or financial advice. 
            Consult with appropriate professionals for specific guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
