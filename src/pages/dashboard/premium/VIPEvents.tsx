import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function VIPEvents() {
  const events = [
    { title: "SupremeWorld Annual Gala", date: "Dec 5, 2026", location: "Singapore", type: "Gala", ticket: "VIP Table" },
    { title: "Global Entrepreneur Summit", date: "Aug 15, 2026", location: "Dubai", type: "Summit", ticket: "VIP Pass" },
    { title: "Executive Networking Dinner", date: "Jul 18, 2026", location: "London", type: "Private Dinner", ticket: "Invited" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="VIP Events" description="Exclusive events and invitations." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "VIP Events" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div key={ev.title} className="p-5 rounded-xl border border-gold/30 bg-card">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-gold">{ev.type}</span>
              <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{ev.ticket}</span>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{ev.title}</h3>
            <p className="text-sm text-muted-foreground">{ev.date} · {ev.location}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
