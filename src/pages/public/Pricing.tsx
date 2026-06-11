import { Link } from "react-router-dom";
import { Check, ArrowRight, Shield, Zap, Star, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/PublicLayout";
import { MEMBERSHIP_PLANS } from "@/constants/membershipPlans";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { useState } from "react";

const COMPARISON_FEATURES = [
  { feature: "Basic Profile", free: true, networker: true, executive: true, elite: true },
  { feature: "Browse Members & Opportunities", free: true, networker: true, executive: true, elite: true },
  { feature: "Community Access", free: "3 max", networker: "Unlimited", executive: "Unlimited + create", elite: "Unlimited + create" },
  { feature: "Connections & Messaging", free: false, networker: true, executive: true, elite: true },
  { feature: "Learning Hub (200+ Courses)", free: false, networker: true, executive: true, elite: true },
  { feature: "Certifications", free: false, networker: true, executive: true, elite: true },
  { feature: "AI Supreme Assistant", free: false, networker: false, executive: true, elite: true },
  { feature: "Investment Deal Flow", free: false, networker: "Browse only", executive: "Full access", elite: "Priority access" },
  { feature: "Private Deal Rooms", free: false, networker: false, executive: true, elite: true },
  { feature: "Investor Matching", free: false, networker: false, executive: true, elite: true },
  { feature: "Analytics Dashboard", free: false, networker: false, executive: true, elite: true },
  { feature: "Verified Profile Badge", free: false, networker: false, executive: true, elite: true },
  { feature: "VIP Event Access", free: false, networker: "Discounts", executive: "VIP access", elite: "Exclusive VIP" },
  { feature: "Concierge Services", free: false, networker: false, executive: "Basic", elite: "Full white-glove" },
  { feature: "Dedicated Relationship Manager", free: false, networker: false, executive: false, elite: true },
  { feature: "Private Groups", free: false, networker: false, executive: false, elite: true },
  { feature: "Co-Investment Access", free: false, networker: false, executive: false, elite: true },
  { feature: "Executive Club Access (120+ clubs)", free: false, networker: false, executive: false, elite: true },
  { feature: "24/7 Personal Assistant", free: false, networker: false, executive: false, elite: true },
  { feature: "Priority Support", free: "Standard", networker: "Standard", executive: "Priority", elite: "White-glove" },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-success mx-auto" />;
  if (value === false) return <span className="text-muted-foreground/30 mx-auto block text-center text-lg leading-none">–</span>;
  return <span className="text-xs text-center text-foreground/80 block">{String(value)}</span>;
}

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const getPrice = (price: number) => {
    if (price === 0) return "Free";
    if (billing === "annual") return `$${Math.round(price * 0.8)}`;
    return `$${price}`;
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
            <Star className="w-3.5 h-3.5" />
            Transparent Pricing · No Hidden Fees
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
            Membership <span className="text-gold">Pricing</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-8">
            Choose the plan that matches your ambition. Upgrade or downgrade at any time. Cancel anytime.
          </p>
          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/10 border border-white/20">
            <button onClick={() => setBilling("monthly")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${billing === "monthly" ? "bg-gold text-royal-black" : "text-white/60 hover:text-white"}`}>Monthly</button>
            <button onClick={() => setBilling("annual")} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billing === "annual" ? "bg-gold text-royal-black" : "text-white/60 hover:text-white"}`}>
              Annual
              <span className={`text-xs font-bold ${billing === "annual" ? "text-royal-black" : "text-success"}`}>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {MEMBERSHIP_PLANS.map((plan) => (
              <div key={plan.id} className={cn("relative rounded-2xl border-2 p-6 flex flex-col bg-card transition-shadow hover:shadow-xl", plan.color, plan.isPopular && "shadow-lg shadow-gold/10 ring-1 ring-gold/20")}>
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gold text-royal-black text-xs font-bold rounded-full">Most Popular</span>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl font-bold text-foreground">{getPrice(plan.price)}</span>
                    {plan.price > 0 && (
                      <div>
                        <div className="text-muted-foreground text-sm">/{billing === "monthly" ? "mo" : "mo"}</div>
                        {billing === "annual" && <div className="text-xs text-success">billed annually</div>}
                      </div>
                    )}
                  </div>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={cn("w-full font-semibold", plan.isPopular ? "bg-gold text-royal-black hover:bg-gold/90" : "")}
                  variant={plan.isPopular ? "default" : "outline"}
                  asChild
                >
                  <Link to={ROUTES.SIGNUP}>{plan.price === 0 ? "Get Started Free" : `Start ${plan.name}`}</Link>
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground flex flex-wrap justify-center gap-6">
            {["No credit card required for free tier", "Cancel anytime", "Secure Stripe billing", "Invoices always available"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-success" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Full Feature Comparison</h2>
            <p className="text-muted-foreground">Every feature, every tier — side by side.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground w-1/2">Feature</th>
                  {MEMBERSHIP_PLANS.map((p) => (
                    <th key={p.id} className="p-4 text-center w-1/8">
                      <div className={`font-display font-bold text-sm ${p.isPopular ? "text-gold" : "text-foreground"}`}>{p.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{getPrice(p.price)}{p.price > 0 ? "/mo" : ""}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/20" : ""}`}>
                    <td className="p-4 text-sm text-foreground font-medium">{row.feature}</td>
                    <td className="p-4 text-center"><FeatureValue value={row.free} /></td>
                    <td className="p-4 text-center"><FeatureValue value={row.networker} /></td>
                    <td className="p-4 text-center"><FeatureValue value={row.executive} /></td>
                    <td className="p-4 text-center"><FeatureValue value={row.elite} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-gold" />
            <h2 className="font-display text-2xl font-bold text-foreground">Pricing FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is there a free trial for paid plans?", a: "We do not offer a free trial for paid plans, but our Explorer tier is completely free and gives you a genuine experience of the platform." },
              { q: "Can I upgrade mid-cycle?", a: "Yes. If you upgrade mid-cycle, you will be charged the prorated difference for the remaining days in your billing period and immediately gain access to the new tier." },
              { q: "Do you offer team or corporate pricing?", a: "Yes. Corporate and team pricing is available for 5+ seats. Contact enterprise@supremeworld.ai for custom pricing and invoicing options." },
              { q: "What currencies are supported?", a: "All pricing is in USD. Your card will be charged in USD. Local currency display is for reference only." },
              { q: "What is your refund policy?", a: "We do not offer refunds for partially used billing periods, except where required by law. Please review our full Refund Policy for details." },
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-royal-black">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Join SupremeWorld?</h2>
          <p className="text-white/60 mb-6">Start free. Upgrade when you are ready. No contracts, no risk.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
              <Link to={ROUTES.SIGNUP}>
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
              <Link to={ROUTES.CONTACT}>Talk to Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
