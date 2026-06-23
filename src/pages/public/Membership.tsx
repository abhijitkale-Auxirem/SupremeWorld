import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/PublicLayout";
import { ROUTES } from "@/constants/routes";
import { Crown, Star, Shield, Globe, Check, ArrowRight, Zap, Users, TrendingUp, BarChart2 } from "lucide-react";
import { MEMBERSHIP_PLANS } from "@/constants/membershipPlans";
import { cn } from "@/lib/utils";

const TIER_FEATURES = {
  free: [
    { feature: "Browse platform & member profiles", included: true },
    { feature: "Basic professional profile", included: true },
    { feature: "Join up to 3 communities", included: true },
    { feature: "Access free events & webinars", included: true },
    { feature: "Unlimited connections", included: false },
    { feature: "Direct messaging", included: false },
    { feature: "Learning hub access", included: false },
    { feature: "AI Supreme Assistant", included: false },
    { feature: "Deal rooms & investor matching", included: false },
    { feature: "Analytics dashboard", included: false },
    { feature: "Concierge services", included: false },
  ],
  standard: [
    { feature: "Everything in Explorer", included: true },
    { feature: "Unlimited connections & messaging", included: true },
    { feature: "Unlimited community access", included: true },
    { feature: "Full learning hub (200+ courses)", included: true },
    { feature: "Business listing & marketplace", included: true },
    { feature: "Investment opportunity browsing", included: true },
    { feature: "AI Supreme Assistant", included: false },
    { feature: "Deal rooms & investor matching", included: false },
    { feature: "Analytics dashboard", included: false },
    { feature: "Concierge services", included: false },
    { feature: "Verified profile badge", included: false },
  ],
  premium: [
    { feature: "Everything in Networker", included: true },
    { feature: "AI Supreme Assistant", included: true },
    { feature: "Private deal rooms", included: true },
    { feature: "Investor matching & deal flow", included: true },
    { feature: "Advanced analytics dashboard", included: true },
    { feature: "Verified profile badge", included: true },
    { feature: "VIP event access", included: true },
    { feature: "Basic concierge services", included: true },
    { feature: "Premium marketplace access", included: true },
    { feature: "Dedicated relationship manager", included: false },
    { feature: "Full luxury concierge", included: false },
  ],
  elite: [
    { feature: "Everything in Executive", included: true },
    { feature: "Dedicated relationship manager", included: true },
    { feature: "Full luxury concierge", included: true },
    { feature: "Private investment groups", included: true },
    { feature: "Co-investment opportunities", included: true },
    { feature: "Executive club global access", included: true },
    { feature: "Priority travel booking", included: true },
    { feature: "White-glove support 24/7", included: true },
    { feature: "Custom analytics reports", included: true },
    { feature: "Exclusive Elite-only events", included: true },
    { feature: "Personal assistant services", included: true },
  ],
};

const tierKey = ["free", "standard", "premium", "elite"] as const;

const TIER_ICONS = { free: Globe, standard: Star, premium: Crown, elite: Shield };
const TESTIMONIALS = [
  { 
    name: "Kwame Asante", 
    tier: "Executive", 
    quote: "The deal rooms and investor matching paid for the membership in the first month. Exceptional ROI.", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&fit=crop" 
  },
  { 
    name: "Sarah Mitchell", 
    tier: "Elite", 
    quote: "My relationship manager handles everything — travel, event tickets, investor introductions. It is genuinely transformative.", 
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&fit=crop" 
  },
  { 
    name: "David Osei", 
    tier: "Networker", 
    quote: "The learning hub alone is worth the subscription. I have completed 4 courses and two certifications.", 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop" 
  },
];
export default function Membership() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Crown className="w-3.5 h-3.5" />
              4 Membership Tiers
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Choose Your <span className="text-gold">Level of Access</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              From free exploration to full elite access — every tier unlocks a new dimension of opportunity, connection, and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.SIGNUP}>Get Started Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.PRICING}>Compare All Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tier overview */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Membership Tiers</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Each tier is designed for a specific stage of ambition — start free, upgrade as you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {MEMBERSHIP_PLANS.map((plan, i) => {
              const Icon = TIER_ICONS[tierKey[i]];
              const features = TIER_FEATURES[tierKey[i]];
              return (
                <div key={plan.id} className={cn("relative rounded-2xl border-2 p-6 flex flex-col bg-card transition-all hover:shadow-xl", plan.color, plan.isPopular && "shadow-lg shadow-gold/10 ring-1 ring-gold/20")}>
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 bg-gold text-royal-black text-xs font-bold rounded-full">Most Popular</span>
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="font-display text-3xl font-bold text-foreground">
                      {plan.price === 0 ? "Free" : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && <span className="text-muted-foreground text-sm">/month</span>}
                  </div>
                  <ul className="space-y-2 flex-1 mb-6">
                    {features.map((f) => (
                      <li key={f.feature} className={`flex items-start gap-2 text-sm ${f.included ? "text-foreground" : "text-muted-foreground/50 line-through"}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${f.included ? "text-success" : "text-muted-foreground/30"}`} />
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={cn("w-full font-semibold", plan.isPopular ? "bg-gold text-royal-black hover:bg-gold/90" : "")}
                    variant={plan.isPopular ? "default" : "outline"}
                    asChild
                  >
                    <Link to={ROUTES.SIGNUP}>{plan.price === 0 ? "Start for Free" : `Join ${plan.name}`}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What members say */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Members Across All Tiers</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Real results from members at every level of our platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full bg-gold/10" />
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <span className="text-xs text-gold font-medium">{t.tier} Member</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform metrics */}
      <section className="py-16 bg-royal-black">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Platform Value by the Numbers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Users, v: "150K+", l: "Verified Members" },
              { icon: TrendingUp, v: "$2.4B+", l: "Investments Facilitated" },
              { icon: Zap, v: "4,800+", l: "Deals Closed" },
              { icon: BarChart2, v: "96%", l: "Member Retention" },
            ].map((s) => (
              <div key={s.l} className="text-center py-6 px-4 rounded-xl bg-white/5 border border-white/10">
                <s.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">Membership FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Can I try the platform before subscribing?", a: "Yes. The Explorer tier is completely free with no credit card required. You can browse the platform, build your profile, and join up to 3 communities before upgrading." },
              { q: "What happens if I cancel?", a: "Your access continues until the end of your current billing period. You will then be downgraded to the free Explorer tier and retain your profile and connections." },
              { q: "Is there an annual billing discount?", a: "Yes. Annual billing on all paid plans saves 20% compared to monthly. Available during signup or from Dashboard > Membership." },
              { q: "How is billing handled?", a: "All subscriptions are billed monthly or annually via Stripe. We accept major credit cards. Invoices are available in Dashboard > Settings > Billing." },
            ].map((f, i) => (
              <details key={i} className="group p-5 rounded-xl border border-border bg-card cursor-pointer">
                <summary className="flex items-center justify-between font-semibold text-foreground text-sm list-none">
                  {f.q}
                  <span className="ml-4 text-muted-foreground group-open:rotate-180 transition-transform text-lg leading-none">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-8" asChild>
              <Link to={ROUTES.SIGNUP}>
                Start Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
