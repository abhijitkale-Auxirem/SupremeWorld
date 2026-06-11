import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import StatsGrid from "@/components/features/StatsGrid";
import TodoWidget from "@/components/features/TodoWidget";
import { useAuthContext } from "@/contexts/AuthContext";
export default function CreatorDashboard() {
  const { user } = useAuthContext();
  const stats = [
    { label: "Total Followers", value: "124K", change: "+3.2K this week", changeType: "positive" as const, icon: "Users" },
    { label: "Content Published", value: "48", change: "+4 this month", changeType: "positive" as const, icon: "Video" },
    { label: "Brand Deals", value: "6", change: "+2 new", changeType: "positive" as const, icon: "Briefcase" },
    { label: "Revenue (MTD)", value: "$8,400", change: "+22% vs last month", changeType: "positive" as const, icon: "DollarSign" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title={`Welcome back, ${user?.name?.split(" ")[0]}`} description="Creator Dashboard" breadcrumbs={[{ label: "Dashboard" }]} />
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold mb-4">Recent Content Performance</h2>
          {[
            { title: "How I Built a $1M Network", views: "42.1K", likes: "3.8K", type: "Video" },
            { title: "Top 5 Business Tools for Creators", views: "28.4K", likes: "2.1K", type: "Article" },
            { title: "My Investment Portfolio Reveal", views: "61.2K", likes: "5.4K", type: "Video" },
          ].map((c) => (
            <div key={c.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card mb-3">
              <div>
                <p className="font-medium text-foreground text-sm">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{c.type}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold text-foreground">{c.views} views</p>
                <p className="text-muted-foreground">{c.likes} likes</p>
              </div>
            </div>
          ))}
        </div>
        <TodoWidget storageKey="creator_todos" />
      </div>
    </DashboardLayout>
  );
}
