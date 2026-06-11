import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import StatsGrid from "@/components/features/StatsGrid";
import TodoWidget from "@/components/features/TodoWidget";
import { useAuthContext } from "@/contexts/AuthContext";
export default function BusinessDashboard() {
  const { user } = useAuthContext();
  const stats = [
    { label: "Active Leads", value: "38", change: "+12 this week", changeType: "positive" as const, icon: "Users" },
    { label: "Partnerships", value: "7", change: "+1 this month", changeType: "positive" as const, icon: "Handshake" },
    { label: "Marketplace Sales", value: "$24,800", change: "+18% vs last month", changeType: "positive" as const, icon: "ShoppingBag" },
    { label: "Open Opportunities", value: "15", change: "5 new", changeType: "positive" as const, icon: "Lightbulb" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title={`Welcome back, ${user?.name?.split(" ")[0]}`} description="Business Owner Dashboard" breadcrumbs={[{ label: "Dashboard" }]} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-4">Recent Lead Activity</h2>
          {[
            { name: "Acme Corp", status: "Qualified", value: "$45K", source: "SupremeWorld" },
            { name: "TechBridge Ltd", status: "Negotiating", value: "$120K", source: "Referral" },
            { name: "Global Trade Inc", status: "New", value: "$28K", source: "SupremeWorld" },
          ].map((l) => (
            <div key={l.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card mb-3">
              <div>
                <p className="font-medium text-foreground">{l.name}</p>
                <p className="text-sm text-muted-foreground">Source: {l.source}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gold">{l.value}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${l.status === "Qualified" ? "bg-success/10 text-success" : l.status === "New" ? "bg-deep-blue/10 text-deep-blue" : "bg-gold/10 text-gold"}`}>{l.status}</span>
              </div>
            </div>
          ))}
        </div>
        <TodoWidget storageKey="business_todos" />
      </div>
    </DashboardLayout>
  );
}
