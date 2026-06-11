import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import StatsGrid from "@/components/features/StatsGrid";
import { ROUTES } from "@/constants/routes";
export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "152,480", change: "+1,240 this week", changeType: "positive" as const, icon: "Users" },
    { label: "Active Memberships", value: "48,320", change: "+840 this month", changeType: "positive" as const, icon: "CreditCard" },
    { label: "Platform Revenue (MTD)", value: "$2.1M", change: "+18% vs last month", changeType: "positive" as const, icon: "DollarSign" },
    { label: "Open Compliance Items", value: "7", change: "3 urgent", changeType: "negative" as const, icon: "Shield" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Admin Dashboard" description="Platform overview and ecosystem health." breadcrumbs={[{ label: "Admin" }]} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-display font-semibold mb-4">Recent Signups</h3>
          {[
            { name: "Kwame Asante", role: "Entrepreneur", country: "Ghana", date: "Jun 11" },
            { name: "Lisa Wang", role: "Investor", country: "China", date: "Jun 11" },
            { name: "Marcus Bell", role: "Professional", country: "USA", date: "Jun 10" },
            { name: "Fatima Al-Hassan", role: "Business", country: "Saudi Arabia", date: "Jun 10" },
          ].map((u) => (
            <div key={u.name} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-xs font-semibold">{u.name[0]}</div>
                <div>
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.role} · {u.country}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{u.date}</span>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-display font-semibold mb-4">Platform Health</h3>
          {[
            { metric: "Uptime", value: "99.98%", status: "Good" },
            { metric: "API Latency", value: "142ms", status: "Good" },
            { metric: "Active Sessions", value: "8,420", status: "Normal" },
            { metric: "Pending Verifications", value: "34", status: "Review" },
          ].map((h) => (
            <div key={h.metric} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <span className="text-sm text-foreground">{h.metric}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{h.value}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${h.status === "Good" || h.status === "Normal" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{h.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
