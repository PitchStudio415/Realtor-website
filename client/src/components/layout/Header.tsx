import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { label: "Buy", href: "/buy" },
  { label: "Sell", href: "/sell" },
  { 
    label: "Learn", 
    children: [
      { label: "First-Time Buyer Hub", href: "/buyer-hub" },
      { label: "Seller Education Hub", href: "/seller-hub" },
      { label: "Affordability Calculator", href: "/calculator" },
    ]
  },
  { label: "Neighborhoods", href: "/neighborhoods" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="logo-icon">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg hidden sm:block" data-testid="logo-text">Muzamil Khan Realtor</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
            {navItems.map((item) => (
              item.children ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-1"
                      data-testid={`nav-${item.label.toLowerCase()}`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link 
                          href={child.href}
                          className="w-full cursor-pointer"
                          data-testid={`nav-${child.label.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.href} href={item.href!}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={location === item.href ? "text-primary" : ""}
                    data-testid={`nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/contact" className="hidden sm:block">
              <Button size="sm" data-testid="button-contact">
                Contact
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background" data-testid="mobile-nav">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.label} className="py-2">
                  <span className="text-sm font-medium text-muted-foreground px-3">{item.label}</span>
                  <div className="mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link 
                        key={child.href} 
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button variant="ghost" className="w-full justify-start pl-6" size="sm">
                          {child.label}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={item.href} 
                  href={item.href!}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${location === item.href ? "text-primary" : ""}`}
                    size="sm"
                  >
                    {item.label}
                  </Button>
                </Link>
              )
            ))}
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full mt-2" size="sm">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
