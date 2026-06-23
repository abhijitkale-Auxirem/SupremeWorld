import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Plus } from "lucide-react";
import { exportToCSV } from "@/utils/csvExporter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Lead } from "@/types/business.types";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { toast } from "sonner";
import { formatDate, generateId } from "@/utils/helpers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogPortal } from "@/components/ui/dialog";

// 1. Define an explicit interface for form tracking to prevent type-widening to plain strings
interface LeadFormData {
  name: string;
  email: string;
  company: string;
  value: string;
  status: Lead["status"]; 
  source: string;
}

const INITIAL_LEADS: Lead[] = [
  { id: "l1", businessId: "b1", name: "John Mensah", email: "john@corp.com", company: "Mensah Corp", source: "SupremeWorld", status: "qualified", value: "$45,000", createdAt: "2026-05-10T00:00:00Z", updatedAt: "2026-06-01T00:00:00Z" },
  { id: "l2", businessId: "b1", name: "Sarah Obi", email: "sarah@techbridge.ng", company: "TechBridge", source: "Referral", status: "negotiating", value: "$120,000", createdAt: "2026-05-22T00:00:00Z", updatedAt: "2026-06-08T00:00:00Z" },
  { id: "l3", businessId: "b1", name: "Mark Liu", email: "mliu@global.sg", company: "Global Trade SG", source: "SupremeWorld", status: "new", value: "$28,000", createdAt: "2026-06-05T00:00:00Z", updatedAt: "2026-06-05T00:00:00Z" },
  { id: "l4", businessId: "b1", name: "Amara Diallo", email: "amara@ivorytech.ci", company: "IvoryTech", source: "Event", status: "contacted", value: "$75,000", createdAt: "2026-04-18T00:00:00Z", updatedAt: "2026-05-30T00:00:00Z" },
];

const STATUS_CATS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "negotiating", label: "Negotiating" },
  { value: "closed-won", label: "Closed Won" },
];

const EMPTY_FORM: LeadFormData = { name: "", email: "", company: "", value: "", status: "new", source: "Manual Input" };

export default function BusinessLeads() {
  const [leads, setLeads] = useLocalStorage<Lead[]>("business_leads", INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  
  // 2. Attach the strict type here
  const [formData, setFormData] = useState<LeadFormData>(EMPTY_FORM);

  const filtered = leads.filter((l) =>
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.company?.toLowerCase().includes(search.toLowerCase())) &&
    (!status || l.status === status)
  );

  // 3. Keep handlers safe using explicit type-assertion constraints
  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ 
      ...prev, 
      [field]: field === "status" ? (value as Lead["status"]) : value 
    }));
  };

  const openAddModal = () => {
    setFormData(EMPTY_FORM);
    setEditId(null);
    setModalMode("add");
  };

  const openEditModal = (lead: Lead) => {
    const rawNumericalValue = lead.value ? lead.value.replace(/[$,]/g, "") : "";
    setFormData({
      name: lead.name,
      email: lead.email,
      company: lead.company ?? "",
      value: rawNumericalValue,
      status: lead.status,
      source: lead.source ?? "Manual Input",
    });
    setEditId(lead.id);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setEditId(null);
    setFormData(EMPTY_FORM);
  };

  const formatCurrency = (val: string) => {
    if (!val) return "$0";
    const numeric = val.replace(/[^\d.]/g, "");
    if (!numeric) return "$0";
    const parsed = parseFloat(numeric);
    return isNaN(parsed) 
      ? "$0" 
      : `$${parsed.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formattedValue = formatCurrency(formData.value);

    if (modalMode === "edit" && editId) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editId
            ? { ...l, ...formData, value: formattedValue, updatedAt: new Date().toISOString() }
            : l
        )
      );
      toast.success("Lead updated successfully.");
    } else {
      const newLead: Lead = {
        id: generateId ? generateId() : `l_${Date.now()}`,
        businessId: "b1",
        name: formData.name,
        email: formData.email,
        company: formData.company,
        source: formData.source,
        status: formData.status,
        value: formattedValue,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLeads((prev) => [newLead, ...prev]);
      toast.success("New lead added to pipeline.");
    }
    closeModal();
  };

  const cols: TableColumn<Record<string, unknown>>[] = [
    { key: "name", label: "Contact", sortable: true },
    { key: "company", label: "Company" },
    { key: "source", label: "Source" },
    { key: "value", label: "Value", render: (v) => <span className="font-semibold text-gold">{String(v)}</span> },
    {
      key: "status", label: "Status", render: (v) => {
        const colors: Record<string, string> = { 
          new: "bg-deep-blue/10 text-deep-blue", 
          contacted: "bg-muted text-muted-foreground", 
          qualified: "bg-success/10 text-success", 
          negotiating: "bg-gold/10 text-gold", 
          "closed-won": "bg-success/20 text-success" 
        };
        return <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors[String(v)] ?? ""}`}>{String(v)}</span>;
      }
    },
    { key: "createdAt", label: "Added", render: (v) => formatDate(String(v)) },
    {
      key: "id", label: "Actions", render: (_v, row) => {
        const lead = leads.find((l) => l.id === String(row.id));
        return (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (lead) openEditModal(lead);
              }}
            >
              Edit Lead
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs text-destructive"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDeleteId(String(row.id));
              }}
            >
              Delete
            </Button>
          </div>
        );
      }
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Leads"
        description="Manage your sales pipeline."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Leads" }]}
        actions={
          <>
            <Button variant="outline" onClick={() => { exportToCSV(leads as unknown as Record<string, unknown>[], "leads"); toast.success("Leads exported as CSV."); }}>
              <Download className="w-4 h-4 mr-1.5" />Export CSV
            </Button>
            <Button className="bg-gold text-royal-black hover:bg-gold/90" onClick={openAddModal}>
              <Plus className="w-4 h-4 mr-1.5" />Add Lead
            </Button>
          </>
        }
      />

      <div className="space-y-4">
        <SearchBar onSearch={setSearch} placeholder="Search leads..." className="max-w-sm" />
        <CategorySection categories={STATUS_CATS} selected={status} onSelect={setStatus} label="Filter by Status" />
        <DataTable columns={cols} data={filtered as unknown as Record<string, unknown>[]} searchQuery={search} />
      </div>

      <ConfirmationModal
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete Lead"
        description="This lead record will be permanently deleted."
        confirmLabel="Delete Lead"
        onConfirm={() => { setLeads((p) => p.filter((l) => l.id !== deleteId)); setDeleteId(null); toast.success("Lead deleted."); }}
      />

      {/* Add / Edit Lead Dialog */}
      <Dialog open={modalMode !== null} onOpenChange={(open) => !open && closeModal()}>
        <DialogPortal>
          <DialogContent className="max-w-md sm:rounded-xl">
            <DialogHeader className="border-b pb-3">
              <DialogTitle className="text-xl font-bold">
                {modalMode === "edit" ? "Edit Lead" : "Add Pipeline Lead"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact Name *</label>
                <Input required type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="e.g. John Doe" className="h-10 border-border" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Contact Email *</label>
                <Input required type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="e.g. john@company.com" className="h-10 border-border" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Company *</label>
                <Input required type="text" value={formData.company} onChange={(e) => handleInputChange("company", e.target.value)} placeholder="e.g. Acme Industries" className="h-10 border-border" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deal Value ($)</label>
                  <Input type="text" value={formData.value} onChange={(e) => handleInputChange("value", e.target.value)} placeholder="e.g. 50000" className="h-10 border-border" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pipeline Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="w-full h-10 px-3 text-sm rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer"
                  >
                    {STATUS_CATS.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-border/60">
                <Button type="button" variant="ghost" onClick={closeModal} className="text-xs font-semibold">
                  Cancel
                </Button>
                <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold px-5">
                  {modalMode === "edit" ? "Save Changes" : "Save Lead Record"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </DashboardLayout>
  );
}