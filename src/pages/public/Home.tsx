import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  TrendingUp,
  BookOpen,
  Plane,
  ShoppingBag,
  Users,
  Star,
  ChevronRight,
  Check,
  Calendar,
  Crown,
  Building2,
  Briefcase,
  Zap,
  BarChart2,
  MessageSquare,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/PublicLayout";
import { ROUTES } from "@/constants/routes";
import heroBg from "@/assets/images/hero-bg.jpg";

/* ── Platform dropdown pages shown below hero ── */
const PLATFORM_PAGES = [
  {
    icon: Users,
    label: "Global Networking",
    desc: "Connect with entrepreneurs, investors & leaders worldwide.",
    href: ROUTES.NETWORKING,
    tag: "Platform",
    color: "from-blue-500/10 to-blue-600/5",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    icon: TrendingUp,
    label: "Investment Hub",
    desc: "Discover startup deals, track portfolio & grow wealth.",
    href: ROUTES.INVESTMENTS,
    tag: "Platform",
    color: "from-gold/10 to-gold/5",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
  },
  {
    icon: BookOpen,
    label: "Education Platform",
    desc: "Executive courses, certifications & mentorship programs.",
    href: ROUTES.EDUCATION,
    tag: "Platform",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
  },
  {
    icon: ShoppingBag,
    label: "Global Marketplace",
    desc: "Buy and sell premium products & services globally.",
    href: ROUTES.MARKETPLACE,
    tag: "Platform",
    color: "from-purple-500/10 to-purple-600/5",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    icon: Building2,
    label: "Communities",
    desc: "Join curated professional groups by industry & goal.",
    href: ROUTES.COMMUNITIES,
    tag: "Platform",
    color: "from-orange-500/10 to-orange-600/5",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
  },
];

const SERVICE_PAGES = [
  {
    icon: Plane,
    label: "Travel & Mobility",
    desc: "Luxury travel planning, visa assistance & relocation.",
    href: ROUTES.TRAVEL,
    tag: "Services",
    color: "from-sky-500/10 to-sky-600/5",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-500",
  },
  {
    icon: Calendar,
    label: "Events & Summits",
    desc: "Exclusive global business summits & networking events.",
    href: ROUTES.EVENTS,
    tag: "Services",
    color: "from-rose-500/10 to-rose-600/5",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-500",
  },
  {
    icon: Crown,
    label: "Premium Concierge",
    desc: "White-glove lifestyle management for HNW individuals.",
    href: ROUTES.CONCIERGE,
    tag: "Services",
    color: "from-gold/10 to-amber-700/5",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
  },
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
    quote:
      "SupremeWorld connected me with three strategic investors within my first month. The platform is unlike anything I have experienced.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop",
  },
  {
    name: "James Thornton",
    role: "Managing Partner, Apex Capital",
    quote:
      "The deal flow quality on SupremeWorld is exceptional. I have closed four investments this year through the platform.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&fit=crop",
  },
  {
    name: "Priya Sharma",
    role: "Global HR Director, Fortune 500",
    quote:
      "The learning hub and executive networking events have been transformative for my career trajectory.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop",
  },
];

const WHO_FOR = [
  {
    title: "Entrepreneurs",
    desc: "Launch, scale, and fund your vision with global investors and resources.",
    color: "border-l-gold",
  },
  {
    title: "Investors",
    desc: "Discover high-growth deals, manage portfolio, and maximize returns.",
    color: "border-l-deep-blue",
  },
  {
    title: "Business Owners",
    desc: "Expand globally, generate leads, and build strategic partnerships.",
    color: "border-l-gold",
  },
  {
    title: "Professionals",
    desc: "Advance your career through elite networking and continuous learning.",
    color: "border-l-deep-blue",
  },
  {
    title: "Content Creators",
    desc: "Grow your audience, land brand deals, and monetize your influence.",
    color: "border-l-gold",
  },
  {
    title: "Premium Members",
    desc: "Access exclusive concierge, VIP events, and luxury lifestyle benefits.",
    color: "border-l-deep-blue",
  },
];

export default function Home() {
  return (
    <PublicLayout>
      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-royal-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-black/95 via-royal-black/65 to-transparent" />

        {/* Animated decorative rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-gold/5 animate-spin-slow" />
          <div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-gold/8 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "18s" }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-gold/40 animate-float"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-gold/30 animate-float"
            style={{ animationDelay: "2.5s" }}
          />
          <div
            className="absolute top-2/3 right-1/5 w-1 h-1 rounded-full bg-gold/50 animate-float"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        <div className="container relative z-10 py-24">
          <div className="max-w-2xl">
            <div className="animate-fade-in-down delay-100 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Globe className="w-3.5 h-3.5" />
              The Global Business Super-Platform
            </div>
            <h1 className="animate-hero-text delay-200 font-display text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Connect. Invest.
              <br />
              <span className="gold-text-shimmer">Elevate.</span>
            </h1>
            <p className="animate-fade-in delay-400 text-white/70 text-xl leading-relaxed mb-8 max-w-xl">
              SupremeWorld unites entrepreneurs, investors, professionals, and
              HNW individuals in the world's most exclusive AI-powered
              ecosystem.
            </p>
            <div className="animate-fade-in delay-500 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gold text-royal-black hover:bg-gold/90 font-semibold text-base px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
                asChild
              >
                <Link to={ROUTES.SIGNUP}>
                  Join SupremeWorld
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-gold text-royal-black hover:bg-gold/90 font-semibold text-base px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20"
                asChild
              >
                <Link to={ROUTES.ABOUT}>Explore the Platform</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-royal-black/85 backdrop-blur-sm border-t border-white/10">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 stagger-children">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="py-5 px-6 text-center animate-count-up"
                >
                  <p className="font-display text-2xl font-bold text-gold">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Platform Pages (Header Dropdown Links) ── */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="text-center mb-10 animate-fade-in-up">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
              Explore the Platform
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Everything in One <span className="text-gold">Ecosystem</span>
            </h2>
          </div>

          {/* Platform group */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-gold/50 flex-1 max-w-[40px]" />
              <span className="text-xs font-semibold text-gold uppercase tracking-widest">
                Platform
              </span>
              <div className="w-6 h-px bg-gold/50 flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger-children">
              {PLATFORM_PAGES.map((page) => (
                <Link
                  key={page.label}
                  to={page.href}
                  className={`group animate-fade-in-up hover-lift relative p-5 rounded-xl border border-border bg-gradient-to-br ${page.color} hover:border-gold/40 transition-all duration-300 flex flex-col`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${page.iconBg} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <page.icon className={`w-5 h-5 ${page.iconColor}`} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug">
                    {page.label}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed flex-1">
                    {page.desc}
                  </p>
                  <div className="flex items-center gap-1 mt-3 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                    Explore <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Services group */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-deep-blue/50 flex-1 max-w-[40px]" />
              <span className="text-xs font-semibold text-deep-blue uppercase tracking-widest">
                Services
              </span>
              <div className="w-6 h-px bg-deep-blue/50 flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 stagger-children">
              {SERVICE_PAGES.map((page) => (
                <Link
                  key={page.label}
                  to={page.href}
                  className={`group animate-fade-in-up hover-lift relative p-5 rounded-xl border border-border bg-gradient-to-br ${page.color} hover:border-gold/40 transition-all duration-300 flex items-start gap-4`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${page.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <page.icon className={`w-6 h-6 ${page.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {page.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {page.desc}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Learn more <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              One Platform.{" "}
              <span className="gold-text-shimmer">Infinite Possibilities.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every tool, connection, and opportunity you need to thrive —
              unified in a single premium ecosystem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {[
              {
                icon: Users,
                label: "Global Networking",
                desc: "Connect with entrepreneurs, investors, and leaders worldwide.",
                href: ROUTES.NETWORKING,
              },
              {
                icon: TrendingUp,
                label: "Investment Hub",
                desc: "Discover startup deals, track portfolio performance, and grow wealth.",
                href: ROUTES.INVESTMENTS,
              },
              {
                icon: BookOpen,
                label: "Education Platform",
                desc: "Executive courses, certifications, and mentorship programs.",
                href: ROUTES.EDUCATION,
              },
              {
                icon: Plane,
                label: "Travel & Mobility",
                desc: "Luxury travel planning, visa assistance, and relocation services.",
                href: ROUTES.TRAVEL,
              },
              {
                icon: ShoppingBag,
                label: "Global Commerce",
                desc: "Buy and sell premium products and services globally.",
                href: ROUTES.MARKETPLACE,
              },
              {
                icon: Star,
                label: "Premium Concierge",
                desc: "White-glove lifestyle management for HNW individuals.",
                href: ROUTES.CONCIERGE,
              },
            ].map((feature) => (
              <Link
                key={feature.label}
                to={feature.href}
                className="group animate-fade-in-up hover-lift p-6 rounded-xl border border-border bg-card hover:border-gold/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.desc}
                </p>
                <div className="flex items-center gap-1 mt-4 text-gold text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                  Explore
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who is it for ── */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              Built for the <span className="text-gold">World's Best</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {WHO_FOR.map((item) => (
              <div
                key={item.title}
                className={`animate-fade-in-up hover-lift p-6 rounded-xl bg-card border-l-4 ${item.color} border border-border transition-all duration-300`}
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Stats Banner ── */}
      <section className="py-16 bg-royal-black relative overflow-hidden">
        {/* Animated background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-gold/3 blur-3xl animate-float" />
          <div
            className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-deep-blue/5 blur-2xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                value: "150K+",
                label: "Global Members",
                delay: "delay-100",
              },
              {
                icon: TrendingUp,
                value: "$2.4B+",
                label: "Investments Facilitated",
                delay: "delay-200",
              },
              {
                icon: BarChart2,
                value: "4,800+",
                label: "Deals Closed",
                delay: "delay-300",
              },
              {
                icon: MapPin,
                value: "80+",
                label: "Countries",
                delay: "delay-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`animate-fade-in-up ${s.delay} text-center py-6 px-4 rounded-xl bg-white/5 border border-white/8 hover:border-gold/20 hover:bg-white/8 transition-all duration-300`}
              >
                <s.icon className="w-6 h-6 text-gold mx-auto mb-3 animate-float" />
                <p className="font-display text-3xl font-bold text-gold mb-1">
                  {s.value}
                </p>
                <p className="text-white/50 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-royal-black">
        <div className="container">
          <div className="text-center mb-14 animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-white mb-4">
              Trusted by{" "}
              <span className="gold-text-shimmer">Industry Leaders</span>
            </h2>
            <p className="text-white/50 text-lg">
              Real results from members across 80+ countries.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="animate-fade-in-up hover-lift glass-card rounded-xl p-6 space-y-4 transition-all duration-300 hover:border-gold/30"
              >
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full bg-gold/20"
                  />
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

      {/* ── Quick links to Membership & Pricing ── */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Membership Card */}
            <Link
              to={ROUTES.MEMBERSHIP}
              className="group animate-fade-in-left hover-lift relative overflow-hidden p-8 rounded-2xl bg-royal-black border border-royal-black-lighter hover:border-gold/40 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:w-48 group-hover:h-48 group-hover:bg-gold/10" />
              <div className="relative z-10">
                <Crown className="w-8 h-8 text-gold mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Membership Plans
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Explorer to Elite — find the tier that matches your ambition.
                </p>
                <div className="flex items-center gap-2 text-gold text-sm font-medium">
                  View Plans{" "}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>

            {/* Pricing Card */}
            <Link
              to={ROUTES.PRICING}
              className="group animate-fade-in-right hover-lift relative overflow-hidden p-8 rounded-2xl bg-royal-black border border-royal-black-lighter hover:border-gold/40 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-gold/5 blur-2xl transition-all duration-500 group-hover:w-48 group-hover:h-48 group-hover:bg-gold/10" />
              <div className="relative z-10">
                <Zap className="w-8 h-8 text-gold mb-4 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Pricing
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  Transparent pricing across all four membership tiers.
                </p>
                <div className="flex items-center gap-2 text-gold text-sm font-medium">
                  See Pricing{" "}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <h2 className="font-display text-4xl font-bold text-foreground mb-6">
              Your Seat at the{" "}
              <span className="gold-text-shimmer">Supreme Table</span> Awaits
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join 150,000+ members from 80+ countries building the future
              together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Action Button with reduced speed animations */}
              <Button
                size="lg"
                className="relative group overflow-hidden bg-royal-black text-gold border border-gold/40 px-8 py-6 rounded-xl transition-all duration-500 hover:scale-[1.03] hover:text-white hover:border-transparent tracking-wide font-semibold shadow-2xl"
                asChild
              >
                <Link to={ROUTES.SIGNUP}>
                  {/* 1. Left-to-Right Border Glow Track Layer (Slowed down) */}
                  <span className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-transparent via-gold to-transparent bg-[length:200%_100%] animate-border-glow-slow opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* 2. Inner Button Dark Mask */}
                  <span className="absolute inset-[1px] bg-royal-black rounded-xl z-0 transition-colors group-hover:bg-royal-black-light" />

                  {/* 3. Left-to-Right Diagonal Mirror Shimmer Effect (Slowed down) */}
                  <span className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-mirror-sweep-slow z-10 pointer-events-none" />

                  {/* Text Content Layer */}
                  <span className="relative z-20 flex items-center gap-2">
                    Create Your Profile
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 rounded-xl transition-all duration-300 hover:border-gold/50"
                asChild
              >
                <Link to={ROUTES.PRICING}>View Membership Plans</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground select-none">
              {[
                "Free to join",
                "No credit card required",
                "Cancel anytime",
              ].map((t) => (
                <span key={t} className="flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
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
