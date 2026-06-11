import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function BrandDeals() {
  const deals = [
    { brand: "TechGear Pro", value: "$3,500", type: "Sponsored Post", status: "Active" },
    { brand: "FinanceApp", value: "$8,000", type: "Campaign", status: "Negotiating" },
    { brand: "LuxeWatch Co", value: "$2,200", type: "Review", status: "Completed" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Brand Deals" description="Manage your brand partnerships and sponsorships." breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Brand Deals" }]} />
      <div className="space-y-3">
        {deals.map((d) => (
          <div key={d.brand} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card">
            <div><h3 className="font-semibold text-foreground">{d.brand}</h3><p className="text-sm text-muted-foreground">{d.type}</p></div>
            <div className="text-right">
              <p className="font-bold text-gold">{d.value}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${d.status === "Active" ? "bg-success/10 text-success" : d.status === "Negotiating" ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"}`}>{d.status}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
