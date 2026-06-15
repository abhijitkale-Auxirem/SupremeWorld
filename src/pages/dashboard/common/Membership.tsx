import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useMembershipContext } from "@/contexts/MembershipContext";
import { MEMBERSHIP_PLANS } from "@/constants/membershipPlans";
import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, Landmark, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuthContext } from "@/contexts/AuthContext";
import { AuthUser } from "@/types/auth.types";

export default function MembershipDashboard() {
  const { tier, tierLabel } = useMembershipContext();
  const { updateUser } = useAuthContext();

  const handleTierSwitch = (targetTier: AuthUser["membershipTier"], planName: string) => {
    try {
      updateUser({ membershipTier: targetTier });
      toast.success(`Successfully switched system allocation node to ${planName} layer.`);
    } catch (error) {
      console.error("Context update failure: ", error);
      toast.error("An error occurred while upgrading your membership tier.");
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="My Membership" 
        description="Manage your SupremeWorld membership configuration settings." 
        breadcrumbs={[{ label: "Membership" }]} 
      />

      <div className="space-y-8">
        {/* UPPER LAYER: Active Account Allocation Status Table */}
        <div className="rounded-xl border border-gold/20 bg-royal-black overflow-hidden shadow-xl shadow-gold/5 max-w-3xl">
          <div className="p-4 border-b border-gold/10 bg-gold/5 flex items-center gap-2 select-none">
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-wider">Account Subscription Ledger</span>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gold/10 text-[11px] font-bold text-white/40 uppercase tracking-wider">
                  <th className="p-4 pl-6">Active Node Allocation</th>
                  <th className="p-4 text-center">Billing Frequency</th>
                  <th className="p-4 text-center">Lifecycle State</th>
                  <th className="p-4 pr-6 text-right">Administrative Parameters</th>
                </tr>
              </thead>
              <tbody className="text-white font-medium">
                <tr className="bg-transparent">
                  <td className="p-4 pl-6">
                    <div className="font-display text-xl font-black text-gold tracking-tight">{tierLabel} Tier</div>
                  </td>
                  <td className="p-4 text-center text-sm text-white/70 font-mono font-bold">
                    Monthly Calendar Arc
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
                      Active Asset
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <span className="text-xs text-white/50 block">Cancel anytime from billing panel</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* LOWER LAYER: Available Plans Matrix Comparison Table */}
        <div className="space-y-3">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">Available Subscription Matrix</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Compare membership configurations and unlock ecosystem feature privileges.</p>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="w-full overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                    <th className="p-4 pl-5">Membership Tier Plan</th>
                    <th className="p-4 text-center">Price Index</th>
                    <th className="p-4">Core Privileges & Core Inclusions</th>
                    <th className="p-4 text-center">Current Status</th>
                    <th className="p-4 pr-5 text-right">Action Authorization</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-medium">
                  {MEMBERSHIP_PLANS.map((plan) => {
                    const isCurrentTier = plan.tier === tier;
                    
                    return (
                      <tr 
                        key={plan.id} 
                        className={cn(
                          "transition-colors group",
                          isCurrentTier ? "bg-gold/[0.02] hover:bg-gold/[0.04]" : "hover:bg-muted/30"
                        )}
                      >
                        {/* Plan Name Identification */}
                        <td className="p-4 pl-5">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs shadow-inner",
                              isCurrentTier ? "bg-gold/10 border-gold/30 text-gold" : "bg-muted border-border text-muted-foreground"
                            )}>
                              {plan.name === 'Elite' ? <Star className="w-3.5 h-3.5" /> : <Landmark className="w-3.5 h-3.5" />}
                            </div>
                            <span className={cn("font-bold tracking-tight", isCurrentTier ? "text-gold text-base" : "text-foreground")}>
                              {plan.name}
                            </span>
                          </div>
                        </td>

                        {/* Price Point */}
                        <td className="p-4 text-center">
                          <span className="font-mono font-black text-base text-foreground">
                            {plan.price === 0 ? "Free" : `$${plan.price}`}
                          </span>
                          {plan.price !== 0 && <span className="text-[10px] text-muted-foreground font-semibold block">/ month</span>}
                        </td>

                        {/* Feature Tags List Wrapper Cell */}
                        <td className="p-4 max-w-sm lg:max-w-md">
                          <div className="flex flex-wrap gap-1.5">
                            {plan.features.slice(0, 3).map((f) => (
                              <span 
                                key={f} 
                                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-muted/60 border border-border/40 text-muted-foreground"
                              >
                                <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                                <span className="truncate max-w-[150px]">{f}</span>
                              </span>
                            ))}
                            {plan.features.length > 3 && (
                              <span className="text-[10px] font-bold text-muted-foreground/60 px-1.5 py-0.5 select-none">
                                +{plan.features.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>

                        {/* State Tracker Info Indicators */}
                        <td className="p-4 text-center select-none">
                          {isCurrentTier ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-gold bg-gold/10 border border-gold/20 px-2.5 py-0.5 rounded-full">
                              <Zap className="w-3 h-3 fill-gold" /> Current Node
                            </span>
                          ) : (
                            <span className="text-xs font-semibold text-muted-foreground/60 font-mono">
                              Available Allocation
                            </span>
                          )}
                        </td>

                        {/* Control Actions Buttons */}
                        <td className="p-4 pr-5 text-right">
                          {isCurrentTier ? (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              disabled 
                              className="h-8 text-xs font-bold text-gold/40 bg-transparent disabled:opacity-100"
                            >
                              Account Default
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 text-xs font-bold border-border hover:border-gold/50 hover:bg-gold/5 hover:text-foreground transition-all ml-auto cursor-pointer"
                              onClick={() => handleTierSwitch(plan.tier, plan.name)}
                            >
                              Upgrade Plan
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
