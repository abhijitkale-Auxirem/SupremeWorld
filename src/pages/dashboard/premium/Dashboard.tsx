import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import StatsGrid from "@/components/features/StatsGrid";
import TodoWidget from "@/components/features/TodoWidget";
import { useAuthContext } from "@/contexts/AuthContext";
export default function PremiumDashboard() {
  const { user } = useAuthContext();
  const stats = [
    { label: "Concierge Requests", value: "3", change: "2 active", changeType: "neutral" as const, icon: "Star" },
    { label: "VIP Events Booked", value: "4", change: "Next: Aug 15", changeType: "neutral" as const, icon: "Crown" },
    { label: "Travel Arrangements", value: "2", change: "Next trip: Jul 20", changeType: "neutral" as const, icon: "Plane" },
    { label: "Executive Club Access", value: "Elite", change: "Member since Jan 2025", changeType: "positive" as const, icon: "Shield" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title={`Welcome back, ${user?.name?.split(" ")[0]}`} description="Premium Member Dashboard — Elite Access" breadcrumbs={[{ label: "Dashboard" }]} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-4">Active Concierge Requests</h2>
          {[
            { title: "Private Jet Booking — Dubai to London", status: "In Progress", priority: "High" },
            { title: "VIP Table — SupremeWorld Annual Gala", status: "Confirmed", priority: "Medium" },
            { title: "Luxury Villa — Maldives, July 2026", status: "Pending", priority: "High" },
          ].map((r) => (
            <div key={r.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card mb-3">
              <div><p className="font-medium text-foreground text-sm">{r.title}</p><p className="text-xs text-muted-foreground mt-0.5">Priority: {r.priority}</p></div>
              <span className={`px-2 py-0.5 text-xs rounded-full ${r.status === "Confirmed" ? "bg-success/10 text-success" : r.status === "In Progress" ? "bg-deep-blue/10 text-deep-blue" : "bg-gold/10 text-gold"}`}>{r.status}</span>
            </div>
          ))}
        </div>
        <TodoWidget storageKey="premium_todos" />
      </div>
    </DashboardLayout>
  );
}
