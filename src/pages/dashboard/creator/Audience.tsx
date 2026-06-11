import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function CreatorAudience() {
  return (
    <DashboardLayout>
      <PageHeader title="Audience" description="Your follower demographics and engagement." breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Audience" }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { platform: "YouTube", followers: "84K", growth: "+2.1K" },
          { platform: "LinkedIn", followers: "28K", growth: "+880" },
          { platform: "Twitter / X", followers: "12K", growth: "+340" },
        ].map((p) => (
          <div key={p.platform} className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-2">{p.platform}</h3>
            <p className="font-display text-2xl font-bold text-gold">{p.followers}</p>
            <p className="text-sm text-success mt-1">{p.growth} this month</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
