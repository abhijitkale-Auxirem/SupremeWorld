import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/contexts/AuthContext";
import { ROLE_DASHBOARD_ROUTES } from "@/constants/roles";
import logoMark from "@/assets/images/logo-mark.png";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Platform",
    children: [
      { label: "Networking", href: ROUTES.NETWORKING },
      { label: "Investments", href: ROUTES.INVESTMENTS },
      { label: "Education", href: ROUTES.EDUCATION },
      { label: "Marketplace", href: ROUTES.MARKETPLACE },
      { label: "Communities", href: ROUTES.COMMUNITIES },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "Travel", href: ROUTES.TRAVEL },
      { label: "Events", href: ROUTES.EVENTS },
      { label: "Concierge", href: ROUTES.CONCIERGE },
    ],
  },
  { label: "Membership", href: ROUTES.MEMBERSHIP },
  { label: "Pricing", href: ROUTES.PRICING },
  { label: "About", href: ROUTES.ABOUT },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (isAuthenticated && user) {
      navigate(ROLE_DASHBOARD_ROUTES[user.role]);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            aria-label="SupremeWorld Home"
          >
            <img src={logoMark} alt="SupremeWorld" className="h-8 w-8 rounded" />
            <span className="font-display font-bold text-xl text-foreground">
              Supreme<span className="text-gold">World</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((link) =>
              "children" in link ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted"
                    aria-haspopup="true"
                    aria-expanded={openDropdown === link.label}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-lg border border-border bg-card shadow-xl shadow-black/10 py-1 animate-nav-dropdown">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "block px-4 py-2 text-sm transition-colors hover:bg-muted",
                            location.pathname === child.href ? "text-gold font-medium" : "text-foreground/80"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href!}
                  className={cn(
                    "px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-muted",
                    location.pathname === link.href ? "text-gold" : "text-foreground/80 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated && user ? (
              <Button
                onClick={() => navigate(ROLE_DASHBOARD_ROUTES[user.role])}
                className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light"
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to={ROUTES.LOGIN}>Sign In</Link>
                </Button>
                <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
                  <Link to={ROUTES.SIGNUP}>Join SupremeWorld</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-slide-in-bottom">
            <div className="container py-4 space-y-1">
              {NAV_LINKS.map((link) =>
                "children" in link ? (
                  <div key={link.label}>
                    <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className="block px-6 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href!}
                    className="block px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-border flex flex-col gap-2">
                {isAuthenticated && user ? (
                  <Button onClick={() => { navigate(ROLE_DASHBOARD_ROUTES[user.role]); setMobileOpen(false); }}>
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to={ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>Sign In</Link>
                    </Button>
                    <Button className="bg-royal-black text-gold border border-gold" asChild>
                      <Link to={ROUTES.SIGNUP} onClick={() => setMobileOpen(false)}>Join SupremeWorld</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 animate-fade-in">{children}</main>

      {/* Footer */}
      <footer className="bg-royal-black text-white border-t border-royal-black-lighter">
        <div className="container py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <img src={logoMark} alt="SupremeWorld" className="h-8 w-8 rounded" />
                <span className="font-display font-bold text-xl">
                  Supreme<span className="text-gold">World</span>
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                An AI-powered global ecosystem combining business networking, investments, education, travel, and premium lifestyle services.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Platform</p>
              <ul className="space-y-2">
                {[
                  { label: "Networking", href: ROUTES.NETWORKING },
                  { label: "Investments", href: ROUTES.INVESTMENTS },
                  { label: "Education", href: ROUTES.EDUCATION },
                  { label: "Marketplace", href: ROUTES.MARKETPLACE },
                ].map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-white/60 text-sm hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Company</p>
              <ul className="space-y-2">
                {[
                  { label: "About", href: ROUTES.ABOUT },
                  { label: "Careers", href: ROUTES.CAREERS },
                  { label: "Blog", href: ROUTES.BLOG },
                  { label: "Contact", href: ROUTES.CONTACT },
                  { label: "Help Center", href: ROUTES.HELP_CENTER },
                ].map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-white/60 text-sm hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-3">Legal</p>
              <ul className="space-y-2">
                {[
                  { label: "Privacy Policy", href: ROUTES.PRIVACY_POLICY },
                  { label: "Terms & Conditions", href: ROUTES.TERMS_CONDITIONS },
                  { label: "Cookie Policy", href: ROUTES.COOKIE_POLICY },
                  { label: "Refund Policy", href: ROUTES.REFUND_POLICY },
                ].map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-white/60 text-sm hover:text-gold transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-royal-black-lighter pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} SupremeWorld. All rights reserved.
            </p>
            <p className="text-white/40 text-sm">
              Connecting the world's most ambitious minds.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
