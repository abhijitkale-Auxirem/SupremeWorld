import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Users, Briefcase, DollarSign } from "lucide-react";

export default function EntrepreneurOpportunities() {
  const opps = [
    { title: "B2B Partnership — TechHub", type: "Partnership", status: "Open", budget: "$50K" },
    { title: "Co-founder Wanted — FinApp", type: "Collaboration", status: "Open", budget: "Equity" },
    { title: "Distribution Deal — West Africa", type: "Distribution", status: "In Progress", budget: "$120K" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Opportunities" description="Discover and manage business opportunities." breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Opportunities" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opps.map((o) => (
          <div key={o.title} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <span className="text-xs font-semibold text-muted-foreground">{o.type}</span>
            <h3 className="font-display font-semibold text-foreground mt-1 mb-3">{o.title}</h3>
            <div className="flex items-center justify-between">
              <span className="text-gold font-semibold text-sm">{o.budget}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${o.status === "Open" ? "bg-success/10 text-success" : "bg-deep-blue/10 text-deep-blue"}`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
