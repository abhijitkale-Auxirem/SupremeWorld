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
import { Plus, Pencil, Trash2, Handshake } from "lucide-react";

interface BrandDeal {
  id: string;
  brand: string;
  value: string;
  type: string;
  status: string;
}

const INIT_DEALS: BrandDeal[] = [
  { id: "bd1", brand: "TechGear Pro", value: "$3,500", type: "Sponsored Post", status: "Active" },
  { id: "bd2", brand: "FinanceApp", value: "$8,000", type: "Campaign", status: "Negotiating" },
  { id: "bd3", brand: "LuxeWatch Co", value: "$2,200", type: "Review", status: "Completed" },
];

const STATUS_OPTIONS = ["Active", "Negotiating", "Completed", "Pending", "Cancelled"];
const TYPE_OPTIONS = ["Sponsored Post", "Campaign", "Review", "Ambassador", "Giveaway"];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-success/10 text-success border border-success/20",
  Negotiating: "bg-gold/10 text-gold border border-gold/20",
  Completed: "bg-muted text-muted-foreground border border-border",
  Pending: "bg-deep-blue/10 text-deep-blue border border-deep-blue/20",
  Cancelled: "bg-destructive/10 text-destructive border border-destructive/20",
};

const EMPTY_FORM = { brand: "", value: "", type: "Sponsored Post", status: "Negotiating" };

export default function BrandDeals() {
  const [deals, setDeals] = useLocalStorage<BrandDeal[]>("creator_brand_deals", INIT_DEALS);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const openAdd = () => { setFormData(EMPTY_FORM); setEditId(null); setModalMode("add"); };
  const openEdit = (d: BrandDeal) => {
    setFormData({ brand: d.brand, value: d.value, type: d.type, status: d.status });
    setEditId(d.id);
    setModalMode("edit");
  };
  const closeModal = () => { setModalMode(null); setEditId(null); setFormData(EMPTY_FORM); };

  const handleStatusChange = (id: string, newStatus: string) => {
    setDeals((prev) => prev.map((d) => d.id === id ? { ...d, status: newStatus } : d));
    toast.success("Deal status updated.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.brand) { toast.error("Brand name is required."); return; }
    const formattedValue = formData.value
      ? formData.value.startsWith("$") ? formData.value : `$${formData.value}`
      : "$0";
    if (modalMode === "edit" && editId) {
      setDeals((prev) => prev.map((d) => d.id === editId ? { ...d, ...formData, value: formattedValue } : d));
      toast.success("Deal updated.");
    } else {
      setDeals((prev) => [{ id: `bd_${Date.now()}`, ...formData, value: formattedValue }, ...prev]);
      toast.success("Deal added.");
    }
    closeModal();
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Brand Deals"
        description="Manage your brand partnerships and sponsorships."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Brand Deals" }]}
        actions={
          <Button className="bg-gold text-royal-black hover:bg-gold/90" onClick={openAdd}>
            <Plus className="w-4 h-4 mr-1.5" />Add Deal
          </Button>
        }
      />

      <div className="space-y-3">
        {deals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-xl text-center text-muted-foreground">
            <Handshake className="w-8 h-8 mb-3 opacity-30" />
            <p className="font-semibold text-foreground">No brand deals yet</p>
            <p className="text-sm mt-1">Click "Add Deal" to get started.</p>
          </div>
        )}

        {deals.map((d) => (
          <div key={d.id} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors gap-4">
            {/* Info */}
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{d.brand}</h3>
              <p className="text-sm text-muted-foreground">{d.type}</p>
            </div>

            {/* Value + status + actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="font-bold text-gold text-sm">{d.value}</span>

              <Select value={d.status} onValueChange={(val) => handleStatusChange(d.id, val)}>
                <SelectTrigger className={`h-7 w-32 text-xs font-semibold border rounded-full px-2.5 focus:ring-0 focus:ring-offset-0 ${STATUS_STYLES[d.status] ?? STATUS_STYLES["Pending"]}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>

              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(d)} aria-label="Edit">
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive/60 hover:text-destructive" onClick={() => setDeleteId(d.id)} aria-label="Delete">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={modalMode !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="max-w-md sm:rounded-xl">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="text-xl font-bold">{modalMode === "edit" ? "Edit Deal" : "Add Brand Deal"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Brand Name *</label>
              <Input required value={formData.brand} onChange={(e) => setFormData((f) => ({ ...f, brand: e.target.value }))} placeholder="e.g. TechGear Pro" className="h-10 border-border" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deal Value</label>
              <Input value={formData.value} onChange={(e) => setFormData((f) => ({ ...f, value: e.target.value }))} placeholder="e.g. 3,500" className="h-10 border-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deal Type</label>
                <select value={formData.type} onChange={(e) => setFormData((f) => ({ ...f, type: e.target.value }))} className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer">
                  {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
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
                {modalMode === "edit" ? "Save Changes" : "Add Deal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Deal"
        description="This brand deal will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => { setDeals((p) => p.filter((d) => d.id !== deleteId)); setDeleteId(null); toast.success("Deal deleted."); }}
      />
    </DashboardLayout>
  );
}
