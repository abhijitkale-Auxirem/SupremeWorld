import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useMembershipContext } from "@/contexts/MembershipContext";
import { MEMBERSHIP_PLANS } from "@/constants/membershipPlans";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
export default function MembershipDashboard() {
  const { tier, tierLabel } = useMembershipContext();
  return (
    <DashboardLayout>
      <PageHeader title="My Membership" description="Manage your SupremeWorld membership." breadcrumbs={[{ label: "Membership" }]} />
      <div className="p-6 rounded-xl border border-gold/30 bg-royal-black text-white mb-8 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <Crown className="w-6 h-6 text-gold" />
          <div>
            <p className="text-white/60 text-sm">Current Plan</p>
            <h2 className="font-display text-2xl font-bold text-gold">{tierLabel}</h2>
          </div>
        </div>
        <p className="text-white/60 text-sm">Membership renews monthly. Cancel anytime from your billing settings.</p>
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-4">Available Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MEMBERSHIP_PLANS.map((plan) => (
          <div key={plan.id} className={cn("p-5 rounded-xl border-2 bg-card", plan.tier === tier ? "border-gold shadow-lg shadow-gold/10" : "border-border")}>
            {plan.tier === tier && <div className="text-xs font-bold text-gold mb-2">Current Plan</div>}
            <h4 className="font-display font-bold text-foreground">{plan.name}</h4>
            <p className="text-2xl font-bold text-gold mt-1">{plan.price === 0 ? "Free" : `$${plan.price}/mo`}</p>
            <ul className="space-y-1 mt-3 mb-4">
              {plan.features.slice(0, 4).map((f) => <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground"><Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />{f}</li>)}
            </ul>
            {plan.tier !== tier && <Button size="sm" variant="outline" className="w-full text-xs">Upgrade to {plan.name}</Button>}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
