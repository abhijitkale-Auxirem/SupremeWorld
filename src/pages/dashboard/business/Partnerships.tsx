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

interface Partnership {
  id: string;
  partner: string;
  type: string;
  status: string;
  since: string;
}

const INIT_DATA: Partnership[] = [
  { id: "p1", partner: "TechHub Africa", type: "Distribution", status: "Active", since: "Mar 2026" },
  { id: "p2", partner: "GlobalTrade SG", type: "Joint Venture", status: "Negotiating", since: "May 2026" },
  { id: "p3", partner: "FinFlow Ltd", type: "Technology", status: "Active", since: "Jan 2026" },
];

const STATUS_OPTIONS = ["Active", "Negotiating", "On Hold", "Inactive"];

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-success/10 text-success border border-success/20",
  Negotiating: "bg-gold/10 text-gold border border-gold/20",
  "On Hold": "bg-muted text-muted-foreground border border-border",
  Inactive: "bg-destructive/10 text-destructive border border-destructive/20",
};

const EMPTY_FORM = { partner: "", type: "", status: "Active", since: "" };

export default function BusinessPartnerships() {
  const [partnerships, setPartnerships] = useLocalStorage<Partnership[]>("business_partnerships", INIT_DATA);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const openAdd = () => {
    setFormData(EMPTY_FORM);
    setEditId(null);
    setModalMode("add");
  };

  const openEdit = (p: Partnership) => {
    setFormData({ partner: p.partner, type: p.type, status: p.status, since: p.since });
    setEditId(p.id);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditId(null);
    setFormData(EMPTY_FORM);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setPartnerships((prev) => prev.map((p) => p.id === id ? { ...p, status: newStatus } : p));
    toast.success("Partnership status updated.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partner || !formData.type) {
      toast.error("Partner name and type are required.");
      return;
    }
    if (modalMode === "edit" && editId) {
      setPartnerships((prev) => prev.map((p) => p.id === editId ? { ...p, ...formData } : p));
      toast.success("Partnership updated.");
    } else {
      setPartnerships((prev) => [
        { id: `p_${Date.now()}`, ...formData },
        ...prev,
      ]);
      toast.success("New partnership added.");
    }
    closeModal();
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Partnerships"
        description="Manage strategic partnerships."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Partnerships" }]}
        actions={
          <Button className="bg-gold text-royal-black hover:bg-gold/90" onClick={openAdd}>
            <Plus className="w-4 h-4 mr-1.5" />Add Partnership
          </Button>
        }
      />

      <div className="space-y-3">
        {partnerships.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground border border-dashed border-border rounded-xl">
            <Handshake className="w-8 h-8 mb-3 opacity-30" />
            <p className="font-semibold text-foreground">No partnerships yet</p>
            <p className="text-sm mt-1">Click "Add Partnership" to get started.</p>
          </div>
        )}

        {partnerships.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors gap-4"
          >
            {/* Info */}
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate">{p.partner}</h3>
              <p className="text-sm text-muted-foreground">{p.type} · Since {p.since}</p>
            </div>

            {/* Status dropdown + actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Editable status select */}
              <Select value={p.status} onValueChange={(val) => handleStatusChange(p.id, val)}>
                <SelectTrigger
                  className={`h-7 w-32 text-xs font-semibold border rounded-full px-2.5 focus:ring-0 focus:ring-offset-0 ${STATUS_STYLES[p.status] ?? STATUS_STYLES["On Hold"]}`}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Edit */}
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-muted-foreground hover:text-foreground"
                onClick={() => openEdit(p)}
                aria-label="Edit partnership"
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>

              {/* Delete */}
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive/60 hover:text-destructive"
                onClick={() => setDeleteId(p.id)}
                aria-label="Delete partnership"
              >
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
            <DialogTitle className="text-xl font-bold">
              {modalMode === "edit" ? "Edit Partnership" : "Add Partnership"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Partner Name *</label>
              <Input
                required
                value={formData.partner}
                onChange={(e) => setFormData((f) => ({ ...f, partner: e.target.value }))}
                placeholder="e.g. TechHub Africa"
                className="h-10 border-border"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Partnership Type *</label>
              <Input
                required
                value={formData.type}
                onChange={(e) => setFormData((f) => ({ ...f, type: e.target.value }))}
                placeholder="e.g. Distribution, Joint Venture"
                className="h-10 border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Since</label>
                <Input
                  value={formData.since}
                  onChange={(e) => setFormData((f) => ({ ...f, since: e.target.value }))}
                  placeholder="e.g. Jan 2026"
                  className="h-10 border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData((f) => ({ ...f, status: e.target.value }))}
                  className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-4 border-t border-border/60">
              <Button type="button" variant="ghost" onClick={closeModal} className="text-xs font-semibold">Cancel</Button>
              <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold px-5">
                {modalMode === "edit" ? "Save Changes" : "Add Partnership"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Remove Partnership"
        description="This partnership record will be permanently deleted."
        confirmLabel="Remove"
        onConfirm={() => {
          setPartnerships((prev) => prev.filter((p) => p.id !== deleteId));
          setDeleteId(null);
          toast.success("Partnership removed.");
        }}
      />
    </DashboardLayout>
  );
}
