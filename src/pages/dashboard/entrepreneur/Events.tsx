import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Calendar, MapPin } from "lucide-react";

const EVENTS = [
  { title: "Global Entrepreneur Summit 2026", date: "Aug 15, 2026", location: "Dubai", registered: true },
  { title: "Africa Tech & Business Meetup", date: "Jul 22, 2026", location: "Lagos", registered: false },
  { title: "Investor Pitch Day", date: "Jul 5, 2026", location: "Online", registered: true },
];

export default function EntrepreneurEvents() {
  return (
    <DashboardLayout>
      <PageHeader title="Events" description="Upcoming events and summits." breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Events" }]} />
      <div className="space-y-4">
        {EVENTS.map((ev) => (
          <div key={ev.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-border bg-card gap-4">
            <div>
              <h3 className="font-semibold text-foreground">{ev.title}</h3>
              <div className="flex gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{ev.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{ev.location}</span>
              </div>
            </div>
            <button className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium ${ev.registered ? "bg-success/10 text-success" : "bg-gold text-royal-black hover:bg-gold/90"}`}>
              {ev.registered ? "Registered" : "Register Now"}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
