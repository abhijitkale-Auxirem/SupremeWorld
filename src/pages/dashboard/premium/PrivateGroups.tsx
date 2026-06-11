import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Lock } from "lucide-react";
export default function PrivateGroups() {
  const groups = [
    { name: "Elite Investor Circle", members: 48, type: "Investment" },
    { name: "Executive Leaders Network", members: 120, type: "Leadership" },
    { name: "Global HNW Community", members: 85, type: "Lifestyle" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Private Groups" description="Your exclusive member-only groups." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "Private Groups" }]} />
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.name} className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0"><Lock className="w-5 h-5 text-gold" /></div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{g.name}</h3>
              <p className="text-sm text-muted-foreground">{g.type} · {g.members} members</p>
            </div>
            <button className="text-sm text-gold hover:text-gold/80 transition-colors">Enter</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
