import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Calendar, MapPin, Search, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface PlatformEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  registered: boolean;
  type: "Online" | "In-Person";
  description: string;
}

const INITIAL_EVENTS: PlatformEvent[] = [
  { id: "e-1", title: "Global Entrepreneur Summit 2026", date: "Aug 15, 2026", location: "Dubai World Trade Centre", registered: true, type: "In-Person", description: "Flagship annual business convergence for top founders, institutional investors, and political representatives." },
  { id: "e-2", title: "Africa Tech & Business Meetup", date: "Jul 22, 2026", location: "Lagos, Nigeria", registered: false, type: "In-Person", description: "Bimonthly networking assembly covering regulatory compliance and regional expansion pathways." },
  { id: "e-3", title: "Investor Pitch Day", date: "Jul 5, 2026", location: "Online (Zoom)", registered: true, type: "Online", description: "Virtual demo day where vetted scaleups present pitch decks to the apex investment syndicate." },
  { id: "e-4", title: "AI Integration Workshop for Startups", date: "Jun 28, 2026", location: "Online (Meet)", registered: false, type: "Online", description: "Technical workshop demonstrating local model training frameworks and cost reduction strategies." },
];

export default function EntrepreneurEvents() {
  const [events, setEvents] = useState<PlatformEvent[]>(() => {
    try {
      const stored = localStorage.getItem("entrepreneur_events_state");
      return stored ? JSON.parse(stored) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const handleToggleRegister = (id: string, title: string) => {
    const updated = events.map((ev) => {
      if (ev.id === id) {
        const nextState = !ev.registered;
        if (nextState) {
          toast.success(`Successfully registered for ${title}! Ticket sent to your email.`);
        } else {
          toast.info(`Cancelled registration for ${title}.`);
        }
        return { ...ev, registered: nextState };
      }
      return ev;
    });
    setEvents(updated);
    localStorage.setItem("entrepreneur_events_state", JSON.stringify(updated));
  };

  const filtered = events.filter((ev) => {
    const matchSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    
    const matchType = filterType === "All" || ev.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <DashboardLayout>
      <PageHeader 
        title="Events" 
        description="Discover and reserve tickets for upcoming summits, pitching assemblies, and technical workshops." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Events" }]} 
      />

      {/* Filter and search bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, location, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background border-border text-xs h-9"
            />
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap border-b border-border pt-1 gap-1">
          {["All", "Online", "In-Person"].map((type) => {
            const count = type === "All" ? events.length : events.filter((e) => e.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs px-4 py-2 border-b-2 font-medium transition-all duration-200 -mb-[2px] ${
                  filterType === type
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {type} <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4 animate-fade-in">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border border-dashed rounded-xl">
            <AlertCircle className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">No events found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting search tags or filters.</p>
          </div>
        ) : (
          filtered.map((ev) => (
            <div 
              key={ev.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-border bg-card gap-4 hover:border-gold/30 transition-all duration-300 hover:shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    ev.type === "Online" ? "bg-deep-blue/15 text-deep-blue" : "bg-gold/15 text-gold"
                  }`}>
                    {ev.type}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">{ev.id}</span>
                </div>
                <h3 className="font-semibold text-foreground text-sm leading-snug">{ev.title}</h3>
                <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">{ev.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {ev.location}
                  </span>
                </div>
              </div>

              <div className="shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-border">
                {ev.registered ? (
                  <Button 
                    className="w-full sm:w-auto h-9 text-xs bg-success/15 border border-success/30 text-success hover:bg-destructive/15 hover:text-destructive hover:border-destructive/20 font-semibold group flex items-center gap-1"
                    onClick={() => handleToggleRegister(ev.id, ev.title)}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 group-hover:hidden" />
                    <span className="group-hover:hidden">Registered</span>
                    <span className="hidden group-hover:inline">Unregister</span>
                  </Button>
                ) : (
                  <Button 
                    className="w-full sm:w-auto h-9 text-xs bg-gold text-royal-black hover:bg-gold/90 font-semibold"
                    onClick={() => handleToggleRegister(ev.id, ev.title)}
                  >
                    Register Now
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
