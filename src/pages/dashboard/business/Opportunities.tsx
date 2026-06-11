import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function BusinessOpportunities() {
  return (
    <DashboardLayout>
      <PageHeader title="Opportunities" breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Opportunities" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "West Africa Distribution Deal", type: "Distribution", budget: "$120K" },
          { title: "Strategic Technology Alliance", type: "Technology", budget: "$50K" },
          { title: "Regional Franchise Expansion", type: "Franchise", budget: "$200K" },
        ].map((o) => (
          <div key={o.title} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <span className="text-xs font-semibold text-muted-foreground">{o.type}</span>
            <h3 className="font-semibold text-foreground mt-1 mb-2">{o.title}</h3>
            <p className="text-gold font-bold">{o.budget}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
