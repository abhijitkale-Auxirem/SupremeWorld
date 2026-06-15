import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Search, Send, CheckCircle2, Star, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

interface Investor {
  name: string;
  firm: string;
  focus: string;
  ticket: string;
  country: string;
  introStatus?: "none" | "requested";
}

const INITIAL_INVESTORS: Investor[] = [
  { name: "James Thornton", firm: "Apex Capital", focus: "FinTech, SaaS", ticket: "$250K–$2M", country: "UK" },
  { name: "Amara Nwosu", firm: "Lagos Ventures", focus: "AgriTech, HealthTech", ticket: "$50K–$500K", country: "Nigeria" },
  { name: "Mei Lin Zhang", firm: "SingaTech Fund", focus: "Deep Tech, AI", ticket: "$500K–$5M", country: "Singapore" },
  { name: "Carlos Rivera", firm: "LatAm Angels", focus: "Commerce, Logistics", ticket: "$100K–$1M", country: "Mexico" },
  { name: "Elena Rostova", firm: "Berlin Alpha", focus: "SaaS, CleanTech", ticket: "$300K–$1.5M", country: "Germany" },
  { name: "Tariq Al-Mansoor", firm: "Gulf Capital Partners", focus: "FinTech, Logistics", ticket: "$1M–$10M", country: "UAE" },
];

const SECTORS = ["All", "FinTech", "SaaS", "AgriTech", "HealthTech", "AI", "Logistics", "CleanTech"];

export default function EntrepreneurInvestors() {
  const [investors, setInvestors] = useLocalStorage<Investor[]>("entrepreneur_investors_state", INITIAL_INVESTORS);
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  // Request Modal State
  const [requestTarget, setRequestTarget] = useState<Investor | null>(null);
  const [elevatorPitch, setElevatorPitch] = useState("");

  const filtered = investors.filter((inv) => {
    const matchSearch =
      inv.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.firm.toLowerCase().includes(search.toLowerCase()) ||
      inv.country.toLowerCase().includes(search.toLowerCase());
    
    const matchSector = selectedSector === "All" || inv.focus.toLowerCase().includes(selectedSector.toLowerCase());

    return matchSearch && matchSector;
  });

  const handleOpenRequest = (inv: Investor) => {
    setRequestTarget(inv);
    setElevatorPitch("");
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTarget) return;

    if (elevatorPitch.trim().length < 20) {
      toast.error("Please provide a pitch summary of at least 20 characters.");
      return;
    }

    setInvestors((prev) =>
      prev.map((i) => {
        if (i.name === requestTarget.name) {
          return { ...i, introStatus: "requested" };
        }
        return i;
      })
    );

    toast.success(`Introduction request sent to ${requestTarget.name} at ${requestTarget.firm}.`);
    setRequestTarget(null);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Investors" 
        description="Browse profiles, filter target ticket size focus sectors, and request direct warm introductions." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Investors" }]} 
      />

      {/* Search and filter bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, firm, or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background border-border text-xs h-9"
            />
          </div>
        </div>

        {/* Focus sector filters */}
        <div className="flex flex-wrap border-b border-border pt-1 gap-1">
          {SECTORS.map((sector) => {
            const count = sector === "All" 
              ? investors.length 
              : investors.filter((i) => i.focus.toLowerCase().includes(sector.toLowerCase())).length;

            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`text-xs px-4 py-2 border-b-2 font-medium transition-all duration-200 -mb-[2px] ${
                  selectedSector === sector
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {sector} <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card border border-border border-dashed rounded-xl">
            <ShieldAlert className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">No matching investors found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your search query or focus sector tab.</p>
          </div>
        ) : (
          filtered.map((inv) => (
            <div 
              key={inv.name} 
              className="p-5 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-gold/30 transition-all duration-300 hover:shadow-sm"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm flex items-center gap-1.5">
                      {inv.name}
                      <span className="inline-flex items-center gap-0.5 bg-gold/10 text-gold text-[9px] font-bold px-1.5 py-0.5 rounded">
                        <Star className="w-2.5 h-2.5 fill-gold text-gold" /> Verified
                      </span>
                    </h3>
                    <p className="text-muted-foreground text-xs mt-0.5">{inv.firm} · {inv.country}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Average Ticket</span>
                    <span className="text-gold font-bold text-sm mt-0.5">{inv.ticket}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border/60">
                  <span className="font-semibold text-foreground">Investment Focus:</span> {inv.focus}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                {inv.introStatus === "requested" ? (
                  <Button 
                    className="w-full text-xs h-9 bg-success/15 border border-success/30 text-success hover:bg-success/15 cursor-default font-semibold"
                    disabled
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Introduction Requested
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    className="w-full text-xs h-9 border-gold/40 text-gold hover:bg-gold/10 hover:text-gold"
                    onClick={() => handleOpenRequest(inv)}
                  >
                    Request Introduction
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Introduction Request Form Dialog */}
      <Dialog open={!!requestTarget} onOpenChange={(open) => !open && setRequestTarget(null)}>
        {requestTarget && (
          <DialogContent className="max-w-md bg-card text-foreground border-border">
            <form onSubmit={handleSubmitRequest}>
              <DialogHeader>
                <DialogTitle className="font-display font-bold text-lg flex items-center gap-2">
                  Request Introduction
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Send a connection message to <strong>{requestTarget.name}</strong> from <strong>{requestTarget.firm}</strong>.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3.5 my-4">
                <div className="p-3 bg-muted/40 border border-border/80 rounded-xl space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investment Ticket Range:</span>
                    <span className="font-semibold text-foreground">{requestTarget.ticket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Focus Sectors:</span>
                    <span className="font-semibold text-foreground">{requestTarget.focus}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="pitch" className="text-xs text-muted-foreground font-semibold">Elevator Pitch & Message *</Label>
                  <textarea
                    id="pitch"
                    value={elevatorPitch}
                    onChange={(e) => setElevatorPitch(e.target.value)}
                    placeholder="Introduce yourself, your startup name, current ARR/stage, and specify why this investor is a good match for your business..."
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring h-24"
                    required
                  />
                  <p className="text-[10px] text-muted-foreground">Must be at least 20 characters to send.</p>
                </div>
              </div>

              <DialogFooter className="border-t border-border pt-3">
                <Button type="button" variant="outline" size="sm" className="text-xs h-9" onClick={() => setRequestTarget(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs h-9 bg-gold text-royal-black hover:bg-gold/90 flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Send Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        )}
      </Dialog>
    </DashboardLayout>
  );
}