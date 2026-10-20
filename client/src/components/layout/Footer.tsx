import { Link } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/hooks/use-toast";
import { PHONE, EMAIL, GOOGLE_URL, ZILLOW_URL, INSTAGRAM_URL, CITIES, CITY_CARD_ORDER, cityPath } from "@/lib/trail";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const signup = useMutation({
    mutationFn: async (e: string) => apiRequest("POST", "/api/newsletter", { email: e, source: "footer" }),
    onSuccess: () => {
      trackEvent("newsletter_signup", { source: "footer" });
      toast({ title: "You're on the list", description: "Market notes and buyer tips, now and then." });
      setEmail("");
    },
    onError: () => toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" }),
  });

  return (
    <footer className="tm">
      <div className="w" style={{ display: "block" }}>
        <div className="frow">
          <div>
            <h3>Market notes by email</h3>
            <p>Local numbers and buyer tips, a few times a year.</p>
            <form
              className="fnews"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) signup.mutate(email);
              }}
            >
              <input type="email" required placeholder="you@example.com" aria-label="Email" value={email} onChange={(e) => setEmail(e.target.value)} data-testid="input-footer-email" />
              <button className="btn alt small" type="submit" disabled={signup.isPending} data-testid="button-footer-subscribe">
                {signup.isPending ? "Sending..." : "Subscribe"}
              </button>
            </form>
          </div>
          <div>
            <h3>Cities</h3>
            <ul>
              {CITY_CARD_ORDER.map((s) => (
                <li key={s}>
                  <Link href={cityPath(s)}>Buying in {CITIES[s].name}</Link>
                </li>
              ))}
              <li>
                <Link href="/neighborhoods">All neighborhoods</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>Guides</h3>
            <ul>
              <li><Link href="/buy/path-to-keys">Path to Keys</Link></li>
              <li><Link href="/first-time-home-buyer">First-time buyer guide</Link></li>
              <li><Link href="/home-valuation">What's my home worth?</Link></li>
              <li><Link href="/calculator">Affordability calculator</Link></li>
              <li><Link href="/about#reviews">Reviews</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <span>
            Muzamil Khan | Rise Group &middot; DRE #02400805 &middot; {PHONE} &middot; {EMAIL} &middot; El Cerrito, CA
          </span>
          <span className="links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" data-testid="link-social-instagram">Instagram</a>
            <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" data-testid="link-social-google">Google</a>
            <a href={ZILLOW_URL} target="_blank" rel="noopener noreferrer" data-testid="link-social-zillow">Zillow</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </span>
        </div>
        <p className="fine">
          General information only, not legal, tax, or financial advice. Equal Housing Opportunity.
        </p>
      </div>
    </footer>
  );
}
