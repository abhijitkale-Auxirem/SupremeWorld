import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { Calendar, MapPin, Ticket, CheckCircle2 } from "lucide-react";

interface VIPEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  ticket: string;
  rsvp: "attending" | "interested" | "none";
}

const INIT_EVENTS: VIPEvent[] = [
  { id: "e1", title: "SupremeWorld Annual Gala", date: "Dec 5, 2026", location: "Singapore", type: "Gala", ticket: "VIP Table", rsvp: "attending" },
  { id: "e2", title: "Global Entrepreneur Summit", date: "Aug 15, 2026", location: "Dubai", type: "Summit", ticket: "VIP Pass", rsvp: "none" },
  { id: "e3", title: "Executive Networking Dinner", date: "Jul 18, 2026", location: "London", type: "Private Dinner", ticket: "Invited", rsvp: "interested" },
];

const RSVP_STYLES: Record<string, string> = {
  attending: "bg-success/10 text-success border border-success/20",
  interested: "bg-gold/10 text-gold border border-gold/20",
  none: "bg-muted text-muted-foreground border border-border",
};

const RSVP_LABELS: Record<string, string> = {
  attending: "Attending ✓",
  interested: "Interested",
  none: "RSVP",
};

export default function VIPEvents() {
  const [events, setEvents] = useLocalStorage<VIPEvent[]>("premium_vip_events", INIT_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<VIPEvent | null>(null);

  const handleRSVP = (eventId: string, status: VIPEvent["rsvp"]) => {
    setEvents((prev) => prev.map((e) => e.id === eventId ? { ...e, rsvp: status } : e));
    const ev = events.find((e) => e.id === eventId);
    if (status === "attending") {
      toast.success(`You're attending "${ev?.title}"!`, { description: "Your seat has been reserved." });
    } else if (status === "interested") {
      toast.info(`Marked as interested in "${ev?.title}".`);
    } else {
      toast.success("RSVP cancelled.");
    }
    setSelectedEvent(null);
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="VIP Events"
        description="Exclusive events and invitations."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "VIP Events" }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div key={ev.id} className="p-5 rounded-xl border border-gold/30 bg-card hover:border-gold/60 transition-colors">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-gold">{ev.type}</span>
              <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">{ev.ticket}</span>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{ev.title}</h3>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{ev.date}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{ev.location}</span>
            </div>

            <div className="flex items-center justify-between">
              {/* Current RSVP badge */}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${RSVP_STYLES[ev.rsvp]}`}>
                {RSVP_LABELS[ev.rsvp]}
              </span>
              {/* Action button */}
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-gold/30 hover:bg-gold/10 hover:border-gold/60 text-gold"
                onClick={() => setSelectedEvent(ev)}
              >
                <Ticket className="w-3.5 h-3.5 mr-1" />
                Manage RSVP
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-sm sm:rounded-xl">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-lg font-bold">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>

          {selectedEvent && (
            <div className="py-4 space-y-4">
              <div className="text-sm text-muted-foreground space-y-1">
                <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedEvent.date}</p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {selectedEvent.location}</p>
                <p className="flex items-center gap-2"><Ticket className="w-4 h-4" /> {selectedEvent.ticket}</p>
              </div>

              <p className="text-xs text-muted-foreground">Update your attendance for this event:</p>

              <div className="flex flex-col gap-2">
                <Button
                  className="bg-success hover:bg-success/90 text-white justify-start gap-2"
                  onClick={() => handleRSVP(selectedEvent.id, "attending")}
                  size="sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Attending — Reserve My Seat
                </Button>
                <Button
                  variant="outline"
                  className="border-gold/30 text-gold hover:bg-gold/10 justify-start gap-2"
                  onClick={() => handleRSVP(selectedEvent.id, "interested")}
                  size="sm"
                >
                  <Ticket className="w-4 h-4" />
                  Interested — Maybe Attending
                </Button>
                <Button
                  variant="ghost"
                  className="text-muted-foreground justify-start gap-2 text-xs"
                  onClick={() => handleRSVP(selectedEvent.id, "none")}
                  size="sm"
                >
                  Cancel RSVP
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
