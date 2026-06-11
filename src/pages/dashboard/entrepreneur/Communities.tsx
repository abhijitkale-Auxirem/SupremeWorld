import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Users } from "lucide-react";

const COMMUNITIES = [
  { name: "Global Founders Network", members: 8400, joined: true },
  { name: "Africa Tech Leaders", members: 5600, joined: true },
  { name: "Series A Founders Club", members: 1800, joined: false },
  { name: "FinTech Disruptors", members: 6300, joined: false },
];

export default function EntrepreneurCommunities() {
  return (
    <DashboardLayout>
      <PageHeader title="Communities" description="Engage with your communities." breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Communities" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMMUNITIES.map((c) => (
          <div key={c.name} className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-1">{c.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3"><Users className="w-4 h-4" />{c.members.toLocaleString()} members</p>
            <button className={`w-full text-sm rounded-lg py-2 transition-colors ${c.joined ? "bg-muted text-muted-foreground" : "bg-gold text-royal-black hover:bg-gold/90"}`}>
              {c.joined ? "View Community" : "Join Community"}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
