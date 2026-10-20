import { Link, useLocation } from "wouter";
import { useState } from "react";

const navItems = [
  { label: "Buy", href: "/buy", match: ["/buy/", "/first-time-home-buyer", "/buyer-hub", "/calculator"] },
  { label: "Sell", href: "/sell", match: ["/sell", "/seller-hub", "/home-valuation", "/selling-without"] },
  { label: "Neighborhoods", href: "/neighborhoods", match: ["/neighborhoods", "/cities/", "/buying-in-"] },
  { label: "Blog", href: "/blog", match: ["/blog"] },
  { label: "About", href: "/about", match: ["/about"] },
];

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const isOn = (m: string[], href: string) => location === href || m.some((p) => location.startsWith(p));

  return (
    <header className="tm top">
      <div className="w">
        <Link href="/" className="mark" data-testid="logo-text">
          <span className="mk" aria-hidden="true">
            MK<span className="dot">.</span>
          </span>
          <span className="sep" aria-hidden="true" />
          Muzamil Khan
        </Link>
        <nav className="main" aria-label="Main" data-testid="desktop-nav">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} className={isOn(n.match, n.href) ? "on" : undefined} data-testid={`nav-${n.label.toLowerCase()}`}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hdr-r">
          <Link href="/contact" className="btn go small" data-testid="button-contact">
            Contact
          </Link>
          <button className="menu-btn" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} data-testid="button-mobile-menu">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mnav" id="mobile-nav" aria-label="Mobile" data-testid="mobile-nav">
          {[...navItems, { label: "Contact", href: "/contact", match: [] }].map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
