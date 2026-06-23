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
import { Plus, Pencil, Trash2, FileText } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  date: string;
}

const INIT_ITEMS: ContentItem[] = [
  { id: "ci1", title: "How I Built a $1M Network", type: "Video", status: "Published", date: "Jun 8" },
  { id: "ci2", title: "Top 5 Business Tools", type: "Article", status: "Published", date: "Jun 3" },
  { id: "ci3", title: "Creator Economy Deep Dive", type: "Podcast", status: "Draft", date: "Jun 1" },
  { id: "ci4", title: "Brand Partnership Guide", type: "Article", status: "Scheduled", date: "Jun 15" },
];

const STATUS_OPTIONS = ["Published", "Draft", "Scheduled", "Archived"];
const TYPE_OPTIONS = ["Video", "Article", "Podcast", "Reel", "Newsletter"];

const STATUS_STYLES: Record<string, string> = {
  Published: "bg-success/10 text-success border border-success/20",
  Draft: "bg-muted text-muted-foreground border border-border",
  Scheduled: "bg-gold/10 text-gold border border-gold/20",
  Archived: "bg-destructive/10 text-destructive border border-destructive/20",
};

const EMPTY_FORM = { title: "", type: "Article", status: "Draft", date: "" };

export default function ContentHub() {
  const [items, setItems] = useLocalStorage<ContentItem[]>("creator_content_hub", INIT_ITEMS);
  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const openAdd = () => { setFormData(EMPTY_FORM); setEditId(null); setModalMode("add"); };
  const openEdit = (item: ContentItem) => {
    setFormData({ title: item.title, type: item.type, status: item.status, date: item.date });
    setEditId(item.id);
    setModalMode("edit");
  };
  const closeModal = () => { setModalMode(null); setEditId(null); setFormData(EMPTY_FORM); };

  const handleStatusChange = (id: string, newStatus: string) => {
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, status: newStatus } : i));
    toast.success("Status updated.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) { toast.error("Title is required."); return; }
    if (modalMode === "edit" && editId) {
      setItems((prev) => prev.map((i) => i.id === editId ? { ...i, ...formData } : i));
      toast.success("Content updated.");
    } else {
      setItems((prev) => [{ id: `ci_${Date.now()}`, ...formData }, ...prev]);
      toast.success("Content added.");
    }
    closeModal();
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Content Hub"
        description="Your published and in-progress content."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Content Hub" }]}
        actions={
          <Button className="bg-gold text-royal-black hover:bg-gold/90" onClick={openAdd}>
            <Plus className="w-4 h-4 mr-1.5" />Add Content
          </Button>
        }
      />

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border rounded-xl text-center text-muted-foreground">
            <FileText className="w-8 h-8 mb-3 opacity-30" />
            <p className="font-semibold text-foreground">No content yet</p>
            <p className="text-sm mt-1">Click "Add Content" to get started.</p>
          </div>
        )}

        {items.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors gap-4">
            {/* Info */}
            <div className="min-w-0">
              <p className="font-semibold text-foreground truncate">{c.title}</p>
              <p className="text-sm text-muted-foreground">{c.type} · {c.date}</p>
            </div>

            {/* Status + actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Select value={c.status} onValueChange={(val) => handleStatusChange(c.id, val)}>
                <SelectTrigger className={`h-7 w-32 text-xs font-semibold border rounded-full px-2.5 focus:ring-0 focus:ring-offset-0 ${STATUS_STYLES[c.status] ?? STATUS_STYLES["Draft"]}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>

              <Button size="icon" variant="ghost" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(c)} aria-label="Edit">
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive/60 hover:text-destructive" onClick={() => setDeleteId(c.id)} aria-label="Delete">
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
            <DialogTitle className="text-xl font-bold">{modalMode === "edit" ? "Edit Content" : "Add Content"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title *</label>
              <Input required value={formData.title} onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. How I Built a $1M Network" className="h-10 border-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Type</label>
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
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Date</label>
              <Input value={formData.date} onChange={(e) => setFormData((f) => ({ ...f, date: e.target.value }))} placeholder="e.g. Jun 8" className="h-10 border-border" />
            </div>
            <div className="flex justify-end gap-2.5 pt-4 border-t border-border/60">
              <Button type="button" variant="ghost" onClick={closeModal} className="text-xs font-semibold">Cancel</Button>
              <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold px-5">
                {modalMode === "edit" ? "Save Changes" : "Add Content"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmationModal
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Content"
        description="This content item will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={() => { setItems((p) => p.filter((i) => i.id !== deleteId)); setDeleteId(null); toast.success("Content deleted."); }}
      />
    </DashboardLayout>
  );
}
