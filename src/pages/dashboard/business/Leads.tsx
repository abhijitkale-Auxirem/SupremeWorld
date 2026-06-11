import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { exportToCSV } from "@/utils/csvExporter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Lead } from "@/types/business.types";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { toast } from "sonner";
import { formatDate, generateId } from "@/utils/helpers";

const INITIAL_LEADS: Lead[] = [
  { id: "l1", businessId: "b1", name: "John Mensah", email: "john@corp.com", company: "Mensah Corp", source: "SupremeWorld", status: "qualified", value: "$45,000", createdAt: "2026-05-10T00:00:00Z", updatedAt: "2026-06-01T00:00:00Z" },
  { id: "l2", businessId: "b1", name: "Sarah Obi", email: "sarah@techbridge.ng", company: "TechBridge", source: "Referral", status: "negotiating", value: "$120,000", createdAt: "2026-05-22T00:00:00Z", updatedAt: "2026-06-08T00:00:00Z" },
  { id: "l3", businessId: "b1", name: "Mark Liu", email: "mliu@global.sg", company: "Global Trade SG", source: "SupremeWorld", status: "new", value: "$28,000", createdAt: "2026-06-05T00:00:00Z", updatedAt: "2026-06-05T00:00:00Z" },
  { id: "l4", businessId: "b1", name: "Amara Diallo", email: "amara@ivorytech.ci", company: "IvoryTech", source: "Event", status: "contacted", value: "$75,000", createdAt: "2026-04-18T00:00:00Z", updatedAt: "2026-05-30T00:00:00Z" },
];

const STATUS_CATS = [{ value: "new", label: "New" }, { value: "contacted", label: "Contacted" }, { value: "qualified", label: "Qualified" }, { value: "negotiating", label: "Negotiating" }, { value: "closed-won", label: "Closed Won" }];

export default function BusinessLeads() {
  const [leads, setLeads] = useLocalStorage<Lead[]>("business_leads", INITIAL_LEADS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = leads.filter((l) =>
    (l.name.toLowerCase().includes(search.toLowerCase()) || l.company?.toLowerCase().includes(search.toLowerCase())) &&
    (!status || l.status === status)
  );

  const cols: TableColumn<Record<string, unknown>>[] = [
    { key: "name", label: "Contact", sortable: true },
    { key: "company", label: "Company" },
    { key: "source", label: "Source" },
    { key: "value", label: "Value", render: (v) => <span className="font-semibold text-gold">{String(v)}</span> },
    { key: "status", label: "Status", render: (v) => {
      const colors: Record<string, string> = { new: "bg-deep-blue/10 text-deep-blue", contacted: "bg-muted text-muted-foreground", qualified: "bg-success/10 text-success", negotiating: "bg-gold/10 text-gold", "closed-won": "bg-success/20 text-success" };
      return <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors[String(v)] ?? ""}`}>{String(v)}</span>;
    }},
    { key: "createdAt", label: "Added", render: (v) => formatDate(String(v)) },
    { key: "id", label: "Actions", render: (_v, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs">Edit Lead</Button>
        <Button size="sm" variant="outline" className="h-7 text-xs text-destructive" onClick={() => setDeleteId(String(row.id))}>Delete</Button>
      </div>
    )},
  ];

  return (
    <DashboardLayout>
      <PageHeader title="Leads" description="Manage your sales pipeline." breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Leads" }]}
        actions={<>
          <Button variant="outline" onClick={() => { exportToCSV(leads, "leads"); toast.success("Leads exported as CSV."); }}><Download className="w-4 h-4 mr-1.5" />Export CSV</Button>
          <Button className="bg-gold text-royal-black hover:bg-gold/90"><Plus className="w-4 h-4 mr-1.5" />Add Lead</Button>
        </>}
      />
      <div className="space-y-4">
        <SearchBar onSearch={setSearch} placeholder="Search leads..." className="max-w-sm" />
        <CategorySection categories={STATUS_CATS} selected={status} onSelect={setStatus} label="Filter by Status" />
        <DataTable columns={cols} data={filtered as Record<string, unknown>[]} searchQuery={search} />
      </div>
      <ConfirmationModal open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} title="Delete Lead" description="This lead record will be permanently deleted." confirmLabel="Delete Lead" onConfirm={() => { setLeads((p) => p.filter((l) => l.id !== deleteId)); setDeleteId(null); toast.success("Lead deleted."); }} />
    </DashboardLayout>
  );
}
