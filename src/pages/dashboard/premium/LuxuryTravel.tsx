import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { MapPin, Calendar } from "lucide-react";
export default function LuxuryTravel() {
  const trips = [
    { destination: "Maldives", hotel: "Four Seasons Resort", dates: "Jul 20–27, 2026", status: "Upcoming" },
    { destination: "Dubai", hotel: "Burj Al Arab", dates: "Sep 5–10, 2026", status: "Upcoming" },
    { destination: "Monaco", hotel: "Hotel de Paris", dates: "Apr 8–12, 2026", status: "Completed" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Luxury Travel" description="Your travel arrangements and itineraries." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "Luxury Travel" }]} />
      <div className="space-y-4">
        {trips.map((t) => (
          <div key={t.destination} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-semibold text-foreground">{t.destination}</h3>
                <p className="text-muted-foreground text-sm mt-1">{t.hotel}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1"><Calendar className="w-4 h-4" />{t.dates}</div>
              </div>
              <span className={`px-2 py-0.5 text-xs rounded-full ${t.status === "Upcoming" ? "bg-deep-blue/10 text-deep-blue" : "bg-muted text-muted-foreground"}`}>{t.status}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
