import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
const MEMBERSHIPS = [
  { tier: "Explorer", count: 89420, revenue: "$0", pct: "58.6%" },
  { tier: "Networker", count: 38120, revenue: "$1,867,880", pct: "25.0%" },
  { tier: "Executive", count: 19680, revenue: "$2,942,320", pct: "12.9%" },
  { tier: "Elite", count: 5260, revenue: "$2,624,740", pct: "3.5%" },
];
export default function AdminMemberships() {
  return (
    <DashboardLayout>
      <PageHeader title="Memberships" description="Membership tier distribution and revenue." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Memberships" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {MEMBERSHIPS.map((m) => (
          <div key={m.tier} className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-display font-semibold text-foreground">{m.tier}</h3>
            <p className="font-display text-2xl font-bold text-gold mt-2">{m.count.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">{m.pct} of members</p>
            <p className="text-sm font-semibold text-foreground mt-2">Revenue: {m.revenue}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
