import { Link } from "react-router-dom";
import { ArrowRight, Globe, TrendingUp, BookOpen, Plane, ShoppingBag, Users, Star, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/PublicLayout";
import { ROUTES } from "@/constants/routes";
import heroBg from "@/assets/images/hero-bg.jpg";

const FEATURES = [
  { icon: Users, label: "Global Networking", desc: "Connect with entrepreneurs, investors, and leaders worldwide.", href: ROUTES.NETWORKING },
  { icon: TrendingUp, label: "Investment Hub", desc: "Discover startup deals, track portfolio performance, and grow wealth.", href: ROUTES.INVESTMENTS },
  { icon: BookOpen, label: "Education Platform", desc: "Executive courses, certifications, and mentorship programs.", href: ROUTES.EDUCATION },
  { icon: Plane, label: "Travel & Mobility", desc: "Luxury travel planning, visa assistance, and relocation services.", href: ROUTES.TRAVEL },
  { icon: ShoppingBag, label: "Global Commerce", desc: "Buy and sell premium products and services globally.", href: ROUTES.MARKETPLACE },
  { icon: Star, label: "Premium Concierge", desc: "White-glove lifestyle management for HNW individuals.", href: ROUTES.CONCIERGE },
];

const STATS = [
  { value: "150K+", label: "Global Members" },
  { value: "$2.4B+", label: "Investments Facilitated" },
  { value: "80+", label: "Countries" },
  { value: "1,200+", label: "Events Hosted" },
];

const TESTIMONIALS = [
  {
    name: "Amara Nwosu",
    role: "Founder & CEO, TechBridge Africa",
    quote: "SupremeWorld connected me with three strategic investors within my first month. The platform is unlike anything I have experienced.",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=amara`,
  },
  {
    name: "James Thornton",
    role: "Managing Partner, Apex Capital",
    quote: "The deal flow quality on SupremeWorld is exceptional. I have closed four investments this year through the platform.",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=james`,
  },
  {
    name: "Priya Sharma",
    role: "Global HR Director, Fortune 500",
    quote: "The learning hub and executive networking events have been transformative for my career trajectory.",
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=priya`,
  },
];

export default function Home() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-royal-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-black/90 via-royal-black/60 to-transparent" />
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Globe className="w-3.5 h-3.5" />
              The Global Business Super-Platform
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Connect. Invest.
              <br />
              <span className="text-gold">Elevate.</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-xl">
              SupremeWorld unites entrepreneurs, investors, professionals, and HNW individuals in the world's most exclusive AI-powered ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gold text-royal-black hover:bg-gold/90 font-semibold text-base px-8"
                asChild
              >
                <Link to={ROUTES.SIGNUP}>
                  Join SupremeWorld
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-base px-8"
                asChild
              >
                <Link to={ROUTES.ABOUT}>Explore the Platform</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-royal-black/80 backdrop-blur-sm border-t border-white/10">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
              {STATS.map((stat) => (
                <div key={stat.label} className="py-5 px-6 text-center">
                  <p className="font-display text-2xl font-bold text-gold">{stat.value}</p>
                  <p className="text-white/50 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              One Platform. <span className="text-gold">Infinite Possibilities.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every tool, connection, and opportunity you need to thrive — unified in a single premium ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, idx) => (
              <Link
                key={feature.label}
                to={feature.href}
                className="group p-6 rounded-xl border border-border bg-card hover:border-gold/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Who is it for */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Built for the <span className="text-gold">World's Best</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Entrepreneurs", desc: "Launch, scale, and fund your vision with global investors and resources.", color: "border-l-gold" },
              { title: "Investors", desc: "Discover high-growth deals, manage portfolio, and maximize returns.", color: "border-l-deep-blue" },
              { title: "Business Owners", desc: "Expand globally, generate leads, and build strategic partnerships.", color: "border-l-gold" },
              { title: "Professionals", desc: "Advance your career through elite networking and continuous learning.", color: "border-l-deep-blue" },
              { title: "Content Creators", desc: "Grow your audience, land brand deals, and monetize your influence.", color: "border-l-gold" },
              { title: "Premium Members", desc: "Access exclusive concierge, VIP events, and luxury lifestyle benefits.", color: "border-l-deep-blue" },
            ].map((item) => (
              <div key={item.title} className={`p-6 rounded-xl bg-card border-l-4 ${item.color} border border-border`}>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-royal-black">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Trusted by <span className="text-gold">Industry Leaders</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card rounded-xl p-6 space-y-4">
                <p className="text-white/80 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full bg-gold/20" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gold/80 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Your Seat at the <span className="text-gold">Supreme Table</span> Awaits
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join 150,000+ members from 80+ countries building the future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-8" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Create Your Profile
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link to={ROUTES.PRICING}>View Membership Plans</Link>
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              {["Free to join", "No credit card required", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-success" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
