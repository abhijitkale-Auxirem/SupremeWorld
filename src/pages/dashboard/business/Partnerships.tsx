import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function BusinessPartnerships() {
  const data = [
    { partner: "TechHub Africa", type: "Distribution", status: "Active", since: "Mar 2026" },
    { partner: "GlobalTrade SG", type: "Joint Venture", status: "Negotiating", since: "May 2026" },
    { partner: "FinFlow Ltd", type: "Technology", status: "Active", since: "Jan 2026" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Partnerships" description="Manage strategic partnerships." breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Partnerships" }]} />
      <div className="space-y-3">
        {data.map((p) => (
          <div key={p.partner} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <div>
              <h3 className="font-semibold text-foreground">{p.partner}</h3>
              <p className="text-sm text-muted-foreground">{p.type} · Since {p.since}</p>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${p.status === "Active" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{p.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
