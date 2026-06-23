import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { toast } from "sonner";
import { Calendar, Plane, Plus, Pencil, Trash2 } from "lucide-react";

interface Trip {
  id: string;
  destination: string;
  hotel: string;
  dates: string;
  status: string;
}

const INIT_TRIPS: Trip[] = [
  { id: "t1", destination: "Maldives", hotel: "Four Seasons Resort", dates: "Jul 20–27, 2026", status: "Upcoming" },
  { id: "t2", destination: "Dubai", hotel: "Burj Al Arab", dates: "Sep 5–10, 2026", status: "Upcoming" },
  { id: "t3", destination: "Monaco", hotel: "Hotel de Paris", dates: "Apr 8–12, 2026", status: "Completed" },
];

const STATUS_OPTIONS = ["Upcoming", "In Progress", "Completed", "Cancelled"];

const STATUS_STYLES: Record<string, string> = {
  Upcoming: "bg-deep-blue/10 text-deep-blue border border-deep-blue/20",
  "In Progress": "bg-gold/10 text-gold border border-gold/20",
  Completed: "bg-muted text-muted-foreground border border-border",
  Cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
};

const EMPTY_FORM = { destination: "", hotel: "", dates: "", status: "Upcoming" };

export default function LuxuryTravel() {
  const [trips, setTrips] = useLocalStorage<Trip[]>("premium_luxury_travel", INIT_TRIPS);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const openAdd = () => { setFormData(EMPTY_FORM); setEditId(null); setModalMode("add"); };
  const openEdit = (t: Trip) => {
    setFormData({ destination: t.destination, hotel: t.hotel, dates: t.dates, status: t.status });
    setEditId(t.id);
    setModalMode("edit");
  };
  const closeModal = () => { setModalMode(null); setEditId(null); setFormData(EMPTY_FORM); };

  const handleStatusChange = (id: string, newStatus: string) => {
    setTrips((prev) => prev.map((t) => t.id === id ? { ...t, status: newStatus } : t));
    toast.success("Travel status updated.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.destination) { toast.error("Destination is required."); return; }
    if (modalMode === "edit" && editId) {
      setTrips((prev) => prev.map((t) => t.id === editId ? { ...t, ...formData } : t));
      toast.success("Trip updated.");
    } else {
      setTrips((prev) => [{ id: `t_${Date.now()}`, ...formData }, ...prev]);
      toast.success("Trip added.");
    }
    closeModal();
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Luxury Travel"
        description="Your travel arrangements and itineraries."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "Luxury Travel" }]}
        actions={
          <Button className="bg-gold text-royal-black hover:bg-gold/90" onClick={openAdd}>
            <Plus className="w-4 h-4 mr-1.5" />Add Trip
          </Button>
        }
      />

      <div className="space-y-4">
        {trips.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-xl text-center text-muted-foreground">
            <Plane className="w-8 h-8 mb-3 opacity-30" />
            <p className="font-semibold text-foreground">No trips yet</p>
            <p className="text-sm mt-1">Click "Add Trip" to plan your next journey.</p>
          </div>
        )}

        {trips.map((t) => (
          <div key={t.id} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <div className="flex justify-between items-start gap-4">
              <div className="min-w-0">
                <h3 className="font-display font-semibold text-foreground">{t.destination}</h3>
                <p className="text-muted-foreground text-sm mt-1">{t.hotel}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />{t.dates}
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Select value={t.status} onValueChange={(val) => handleStatusChange(t.id, val)}>
                  <SelectTrigger className={`h-7 w-32 text-xs font-semibold border rounded-full px-2.5 focus:ring-0 focus:ring-offset-0 ${STATUS_STYLES[t.status] ?? STATUS_STYLES["Upcoming"]}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(t)}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive/60 hover:text-destructive" onClick={() => setDeleteId(t.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={modalMode !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md sm:rounded-xl">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-xl font-bold">{modalMode === "edit" ? "Edit Trip" : "Add Trip"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Destination *</label>
              <Input required value={formData.destination} onChange={(e) => setFormData((f) => ({ ...f, destination: e.target.value }))} placeholder="e.g. Maldives" className="h-10 border-border" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Hotel / Resort</label>
              <Input value={formData.hotel} onChange={(e) => setFormData((f) => ({ ...f, hotel: e.target.value }))} placeholder="e.g. Four Seasons Resort" className="h-10 border-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Dates</label>
                <Input value={formData.dates} onChange={(e) => setFormData((f) => ({ ...f, dates: e.target.value }))} placeholder="e.g. Jul 20–27, 2026" className="h-10 border-border" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</label>
                <select value={formData.status} onChange={(e) => setFormData((f) => ({ ...f, status: e.target.value }))} className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer">
                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2.5 pt-4 border-t border-border/60">
              <Button type="button" variant="ghost" onClick={closeModal} className="text-xs font-semibold">Cancel</Button>
              <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold px-5">
                {modalMode === "edit" ? "Save Changes" : "Add Trip"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Remove Trip"
        description="This trip will be permanently removed."
        confirmLabel="Remove"
        onConfirm={() => { setTrips((p) => p.filter((t) => t.id !== deleteId)); setDeleteId(null); toast.success("Trip removed."); }}
      />
    </DashboardLayout>
  );
}
