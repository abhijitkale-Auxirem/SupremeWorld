import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import TodoWidget from "@/components/features/TodoWidget";
import StatsGrid from "@/components/features/StatsGrid";
import { ROUTES } from "@/constants/routes";
import { useAuthContext } from "@/contexts/AuthContext";

export default function InvestorDashboard() {
  const { user } = useAuthContext();
  const stats = [
    { label: "Total Invested", value: "$1.2M", change: "+$150K this quarter", changeType: "positive" as const, icon: "DollarSign" },
    { label: "Active Investments", value: "14", change: "+2 this month", changeType: "positive" as const, icon: "TrendingUp" },
    { label: "Portfolio Value", value: "$2.1M", change: "+74% ROI", changeType: "positive" as const, icon: "PieChart" },
    { label: "Open Deals", value: "8", change: "3 pending review", changeType: "neutral" as const, icon: "FileText" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title={`Welcome back, ${user?.name?.split(" ")[0]}`} description="Investor Dashboard — SupremeWorld" breadcrumbs={[{ label: "Dashboard" }]} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-4">Recent Investments</h2>
          {[
            { name: "FinTechAfrica", stage: "Series A", amount: "$250,000", roi: "+32%", status: "Active" },
            { name: "AgriSmart AI", stage: "Seed", amount: "$75,000", roi: "+18%", status: "Active" },
            { name: "LogiChain", stage: "Series A", amount: "$500,000", roi: "+56%", status: "Active" },
          ].map((inv) => (
            <div key={inv.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card mb-3 hover:border-gold/30 transition-colors">
              <div>
                <p className="font-medium text-foreground">{inv.name}</p>
                <p className="text-sm text-muted-foreground">{inv.stage} · {inv.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-success font-semibold text-sm">{inv.roi}</p>
                <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
        <TodoWidget storageKey="investor_todos" />
      </div>
    </DashboardLayout>
  );
}
