import { Link, useLocation } from "wouter";
import { Phone, MessageSquare, Calendar } from "lucide-react";

/**
 * Slim fixed bottom bar on mobile widths with the three actions that matter:
 * call, text, book. Hidden on the contact page (the form is already there).
 */
export function MobileCtaBar() {
  const [location] = useLocation();
  if (location.startsWith("/contact")) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-[#071B2C]/95 backdrop-blur border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
      data-testid="mobile-cta-bar"
    >
      <div className="grid grid-cols-3 divide-x divide-white/10">
        <a
          href="tel:+14158198312"
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
          data-testid="mobile-cta-call"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href="sms:+14158198312"
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
          data-testid="mobile-cta-text"
        >
          <MessageSquare className="w-4 h-4" />
          Text
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white"
          data-testid="mobile-cta-book"
        >
          <Calendar className="w-4 h-4" />
          Book
        </Link>
      </div>
    </div>
  );
}
