import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
export default function PremiumConcierge() {
  const services = [
    { title: "Private Jet Booking — Dubai to London", status: "In Progress", date: "Jun 8, 2026" },
    { title: "VIP Table — Annual Gala", status: "Confirmed", date: "Dec 5, 2026" },
    { title: "Maldives Villa — July 2026", status: "Pending", date: "Jul 20, 2026" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Concierge Services" description="Your personal requests and arrangements." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "Concierge" }]}
        actions={<Button className="bg-gold text-royal-black hover:bg-gold/90"><Plus className="w-4 h-4 mr-1.5" />New Request</Button>} />
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.title} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card">
            <div><h3 className="font-semibold text-foreground">{s.title}</h3><p className="text-sm text-muted-foreground">{s.date}</p></div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${s.status === "Confirmed" ? "bg-success/10 text-success" : s.status === "In Progress" ? "bg-deep-blue/10 text-deep-blue" : "bg-gold/10 text-gold"}`}>{s.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
