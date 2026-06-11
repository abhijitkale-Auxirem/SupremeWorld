import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function CareerGrowth() {
  const goals = [
    { title: "Become VP of Strategy", progress: 60, deadline: "Dec 2026" },
    { title: "Complete Executive MBA", progress: 35, deadline: "Jun 2027" },
    { title: "Build 1,000+ Network", progress: 84, deadline: "Sep 2026" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Career Growth" description="Track your career goals and milestones." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, { label: "Career Growth" }]} />
      <div className="space-y-4">
        {goals.map((g) => (
          <div key={g.title} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold text-foreground">{g.title}</h3>
              <div className="text-right"><span className="text-gold font-bold">{g.progress}%</span><p className="text-xs text-muted-foreground">Due {g.deadline}</p></div>
            </div>
            <div className="w-full bg-muted rounded-full h-2"><div className="h-2 rounded-full bg-gold" style={{ width: `${g.progress}%` }} /></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
