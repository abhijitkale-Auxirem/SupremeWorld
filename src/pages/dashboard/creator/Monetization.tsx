import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function CreatorMonetization() {
  return (
    <DashboardLayout>
      <PageHeader title="Monetization" description="Revenue streams and earnings overview." breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Monetization" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { source: "Brand Deals", amount: "$3,800", pct: "+12%" },
          { source: "Digital Products", amount: "$2,100", pct: "+34%" },
          { source: "Subscriptions", amount: "$1,200", pct: "+8%" },
          { source: "Consulting", amount: "$1,300", pct: "+21%" },
        ].map((s) => (
          <div key={s.source} className="p-5 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground">{s.source}</p>
            <p className="font-display text-xl font-bold text-gold mt-1">{s.amount}</p>
            <p className="text-success text-sm mt-1">{s.pct} vs last month</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
