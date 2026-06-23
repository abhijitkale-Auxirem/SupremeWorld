import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useAuthContext } from "@/contexts/AuthContext";
import { ROLE_LABELS } from "@/constants/roles";
import { TrendingUp, Users, Lightbulb, Calendar, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/utils/helpers";
import TodoWidget from "@/components/features/TodoWidget";
import StatsGrid from "@/components/features/StatsGrid";

export default function EntrepreneurDashboard() {
  const { user } = useAuthContext();

  const stats = [
    { label: "Active Businesses", value: "3", change: "+1 this month", changeType: "positive" as const, icon: "Building2" },
    { label: "Investor Connections", value: "47", change: "+8 this week", changeType: "positive" as const, icon: "Users" },
    { label: "Open Opportunities", value: "12", change: "4 new", changeType: "positive" as const, icon: "Lightbulb" },
    { label: "Upcoming Events", value: "5", change: "2 this week", changeType: "neutral" as const, icon: "Calendar" },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0]}`}
        description={`${ROLE_LABELS[user?.role ?? "entrepreneur"]} Dashboard — SupremeWorld`}
        breadcrumbs={[{ label: "Dashboard" }]}
        actions={
          <Button className="bg-gold text-royal-black hover:bg-gold/90" asChild>
            <Link to={ROUTES.ENTREPRENEUR_BUSINESSES}><Plus className="w-4 h-4 mr-1.5" />Add Business</Link>
          </Button>
        }
      />
      <StatsGrid stats={stats} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display text-lg font-semibold text-foreground">Recent Opportunities</h2>
          {[
            { title: "Strategic Partnership — TechHub Africa", type: "Partnership", status: "Open", date: "Jun 10, 2026" },
            { title: "Seed Funding Round — Series A Push", type: "Investment", status: "In Progress", date: "Jun 8, 2026" },
            { title: "Joint Venture — GreenBuild Initiative", type: "Collaboration", status: "Open", date: "Jun 5, 2026" },
          ].map((op) => (
            <div key={op.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
              <div>
                <p className="font-medium text-foreground text-sm">{op.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{op.type}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{op.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${op.status === "Open" ? "bg-success/10 text-success" : "bg-deep-blue/10 text-deep-blue"}`}>
                  {op.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <TodoWidget storageKey="entrepreneur_todos" />
        </div>
      </div>
    </DashboardLayout>
  );
}
