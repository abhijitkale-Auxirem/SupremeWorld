import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function ContentHub() {
  const items = [
    { title: "How I Built a $1M Network", type: "Video", status: "Published", date: "Jun 8" },
    { title: "Top 5 Business Tools", type: "Article", status: "Published", date: "Jun 3" },
    { title: "Creator Economy Deep Dive", type: "Podcast", status: "Draft", date: "Jun 1" },
    { title: "Brand Partnership Guide", type: "Article", status: "Scheduled", date: "Jun 15" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Content Hub" breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Content Hub" }]} />
      <div className="space-y-3">
        {items.map((c) => (
          <div key={c.title} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
            <div><p className="font-medium text-foreground">{c.title}</p><p className="text-sm text-muted-foreground">{c.type} · {c.date}</p></div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${c.status === "Published" ? "bg-success/10 text-success" : c.status === "Draft" ? "bg-muted text-muted-foreground" : "bg-gold/10 text-gold"}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
