import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import StatsGrid from "@/components/features/StatsGrid";
import TodoWidget from "@/components/features/TodoWidget";
import { useAuthContext } from "@/contexts/AuthContext";
export default function ProfessionalDashboard() {
  const { user } = useAuthContext();
  const stats = [
    { label: "Network Size", value: "842", change: "+34 this month", changeType: "positive" as const, icon: "Network" },
    { label: "Courses In Progress", value: "3", change: "1 completed", changeType: "positive" as const, icon: "BookOpen" },
    { label: "Certifications Earned", value: "7", change: "+2 this year", changeType: "positive" as const, icon: "Award" },
    { label: "Profile Views", value: "1,240", change: "+18% this week", changeType: "positive" as const, icon: "TrendingUp" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title={`Welcome back, ${user?.name?.split(" ")[0]}`} description="Professional Dashboard" breadcrumbs={[{ label: "Dashboard" }]} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-4">Learning Progress</h2>
          {[
            { course: "AI for Business Leaders", progress: 75, category: "Technology" },
            { course: "Advanced Investment Strategies", progress: 45, category: "Finance" },
            { course: "Executive Leadership Masterclass", progress: 90, category: "Leadership" },
          ].map((c) => (
            <div key={c.course} className="p-4 rounded-xl border border-border bg-card mb-3">
              <div className="flex justify-between mb-2">
                <p className="font-medium text-sm text-foreground">{c.course}</p>
                <span className="text-gold font-semibold text-sm">{c.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="h-2 rounded-full bg-gold transition-all" style={{ width: `${c.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
        <TodoWidget storageKey="professional_todos" />
      </div>
    </DashboardLayout>
  );
}
