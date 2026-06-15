import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// FIXED: Swapped ClipboardText for FileText
import { Plus, Eye, X, Calendar, FileText } from "lucide-react";

interface ConciergeService {
  id: string;
  title: string;
  status: "Confirmed" | "In Progress" | "Pending";
  date: string;
}

const INITIAL_SERVICES: ConciergeService[] = [
  { id: "req-1", title: "Private Jet Booking — Dubai to London", status: "In Progress", date: "2026-06-08" },
  { id: "req-2", title: "VIP Table — Annual Gala", status: "Confirmed", date: "2026-12-05" },
  { id: "req-3", title: "Maldives Villa — July 2026", status: "Pending", date: "2026-07-20" },
];

type ModalMode = { type: "idle" } | { type: "view"; data: ConciergeService } | { type: "create" };

export default function PremiumConcierge() {
  const [services, setServices] = useState<ConciergeService[]>(INITIAL_SERVICES);
  const [modal, setModal] = useState<ModalMode>({ type: "idle" });

  // Form Field States
  const [newTitle, setNewTitle] = useState("");
  const [newDate, setNewDate] = useState("");

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate.trim()) return;

    const newRequest: ConciergeService = {
      id: `req-${Date.now()}`,
      title: newTitle.trim(),
      status: "Pending",
      date: newDate,
    };

    setServices((prev) => [newRequest, ...prev]);
    
    // Reset Form & Close Modal
    setNewTitle("");
    setNewDate("");
    setModal({ type: "idle" });
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Concierge Services" 
        description="Your personal requests and arrangements." 
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, 
          { label: "Concierge" }
        ]}
        actions={
          <Button 
            onClick={() => setModal({ type: "create" })}
            className="bg-gold text-royal-black hover:bg-gold/90 font-semibold text-xs h-9"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Request
          </Button>
        } 
      />

      {/* Responsive Table Layout */}
      <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4">Arrangement / Request Title</th>
              <th className="p-4">Target Date</th>
              <th className="p-4">Fulfilment Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-muted/30 transition-colors group">
                <td className="p-4 font-semibold text-foreground max-w-sm truncate">
                  {s.title}
                </td>
                <td className="p-4 text-muted-foreground whitespace-nowrap">
                  {new Date(s.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                    s.status === "Confirmed" 
                      ? "bg-success/10 text-success" 
                      : s.status === "In Progress" 
                      ? "bg-deep-blue/10 text-deep-blue" 
                      : "bg-gold/10 text-gold"
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setModal({ type: "view", data: s })}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-border text-foreground hover:border-gold/40 hover:bg-muted/50 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UNIFIED POPUP SYSTEM */}
      {modal.type !== "idle" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-border p-6 rounded-xl shadow-xl max-w-md w-full relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setModal({ type: "idle" })}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close dialog window"
            >
              <X className="w-4 h-4" />
            </button>

            {/* MODE A: CREATE FORM POPUP */}
            {modal.type === "create" && (
              <form onSubmit={handleCreateRequest} className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground text-lg">New Concierge Request</h4>
                  <p className="text-xs text-muted-foreground">Submit bespoke lifestyle arrangements order.</p>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Arrangement Title</label>
                  <Input 
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g., Luxury Chauffeur Service — Paris" 
                    className="h-9 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Target Date</label>
                  <Input 
                    required
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setModal({ type: "idle" })}
                    className="flex-1 text-xs h-9"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gold text-royal-black hover:bg-gold/90 font-semibold text-xs h-9"
                  >
                    Submit Order
                  </Button>
                </div>
              </form>
            )}

            {/* MODE B: VIEW DETAILS POPUP */}
            {modal.type === "view" && (
              <div className="space-y-4">
                <div>
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full ${
                    modal.data.status === "Confirmed" 
                      ? "bg-success/10 text-success" 
                      : modal.data.status === "In Progress" 
                      ? "bg-deep-blue/10 text-deep-blue" 
                      : "bg-gold/10 text-gold"
                  }`}>
                    {modal.data.status}
                  </span>
                  <h4 className="font-semibold text-foreground text-lg mt-1.5">{modal.data.title}</h4>
                </div>

                <div className="border-t border-b border-border/60 py-3 space-y-2.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {/* FIXED: Using FileText instead of ClipboardText */}
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span><strong>Request ID:</strong> {modal.data.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span><strong>Execution Date:</strong> {new Date(modal.data.date).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your dedicated lifestyle manager is working on this assignment. Real-time logging updates are broadcasted dynamically.
                </p>

                <Button 
                  onClick={() => setModal({ type: "idle" })}
                  className="w-full bg-muted text-foreground hover:bg-muted/80 text-xs h-9 mt-2"
                >
                  Close Record
                </Button>
              </div>
            )}

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}