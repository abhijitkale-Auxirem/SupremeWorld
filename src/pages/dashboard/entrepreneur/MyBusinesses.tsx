import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import DataTable from "@/components/common/DataTable";
import { TableColumn } from "@/types/common.types";
import { exportToCSV } from "@/utils/csvExporter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Business } from "@/types/business.types";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { toast } from "sonner";
import { generateId, formatDate } from "@/utils/helpers";

const INITIAL_BUSINESSES: Business[] = [
  { id: "b1", ownerId: "u1", name: "TechBridge Solutions", tagline: "Bridging tech talent globally", description: "", industry: "Technology", stage: "growth", founded: "2022", employees: "11-50", location: "Lagos", country: "Nigeria", tags: ["SaaS", "B2B"], isVerified: true, isFeatured: false, viewsCount: 1240, status: "active", createdAt: "2024-01-15T00:00:00Z", updatedAt: "2026-06-01T00:00:00Z" },
  { id: "b2", ownerId: "u1", name: "GreenFarm AI", tagline: "AI-driven precision agriculture", description: "", industry: "AgriTech", stage: "startup", founded: "2023", employees: "1-10", location: "Nairobi", country: "Kenya", tags: ["AI", "Agriculture"], isVerified: false, isFeatured: false, viewsCount: 540, status: "active", createdAt: "2024-06-20T00:00:00Z", updatedAt: "2026-05-10T00:00:00Z" },
  { id: "b3", ownerId: "u1", name: "HealthLink Pro", tagline: "Connecting patients and specialists", description: "", industry: "HealthTech", stage: "idea", founded: "2025", employees: "1-10", location: "Accra", country: "Ghana", tags: ["Health", "Telehealth"], isVerified: false, isFeatured: false, viewsCount: 120, status: "pending", createdAt: "2025-11-01T00:00:00Z", updatedAt: "2026-04-22T00:00:00Z" },
];

const CATS = [{ value: "Technology", label: "Technology" }, { value: "AgriTech", label: "AgriTech" }, { value: "HealthTech", label: "HealthTech" }];

export default function MyBusinesses() {
  const [businesses, setBusinesses] = useLocalStorage<Business[]>("entrepreneur_businesses", INITIAL_BUSINESSES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = businesses.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.industry.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || b.industry === category;
    return matchSearch && matchCat;
  });

  const columns: TableColumn<Record<string, unknown>>[] = [
    { key: "name", label: "Business Name", sortable: true },
    { key: "industry", label: "Industry", sortable: true },
    { key: "stage", label: "Stage", render: (v) => <span className="capitalize px-2 py-0.5 bg-muted rounded text-xs">{String(v)}</span> },
    { key: "status", label: "Status", sortable: true, render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v === "active" ? "bg-success/10 text-success" : v === "pending" ? "bg-gold/10 text-gold" : "bg-destructive/10 text-destructive"}`}>{String(v)}</span> },
    { key: "viewsCount", label: "Views", sortable: true },
    { key: "createdAt", label: "Created", render: (v) => formatDate(String(v)) },
    { key: "id", label: "Actions", render: (_v, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs">Edit Business</Button>
        <Button size="sm" variant="outline" className="h-7 text-xs text-destructive hover:text-destructive" onClick={() => setDeleteId(String(row.id))}>Delete</Button>
      </div>
    )},
  ];

  const handleDelete = () => {
    setBusinesses((prev) => prev.filter((b) => b.id !== deleteId));
    setDeleteId(null);
    toast.success("Business deleted successfully.");
  };

  const handleExportCSV = () => {
    exportToCSV(businesses, "my-businesses", [
      { key: "name", label: "Business Name" },
      { key: "industry", label: "Industry" },
      { key: "stage", label: "Stage" },
      { key: "status", label: "Status" },
      { key: "viewsCount", label: "Views" },
    ]);
    toast.success("CSV exported successfully.");
  };

  return (
    <DashboardLayout>
      <PageHeader title="My Businesses" description="Manage your business listings and listings." breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "My Businesses" }]}
        actions={<>
          <Button variant="outline" onClick={handleExportCSV}><Download className="w-4 h-4 mr-1.5" />Export CSV</Button>
          <Button className="bg-gold text-royal-black hover:bg-gold/90"><Plus className="w-4 h-4 mr-1.5" />Add Business</Button>
        </>}
      />
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar onSearch={setSearch} placeholder="Search businesses..." className="flex-1" />
        </div>
        <CategorySection categories={CATS} selected={category} onSelect={setCategory} label="Filter by Industry" />
        <DataTable columns={columns} data={filtered as Record<string, unknown>[]} searchQuery={search} />
      </div>
      <ConfirmationModal open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)} title="Delete Business" description="This action cannot be undone. This business and all associated data will be permanently removed." confirmLabel="Delete Business" onConfirm={handleDelete} />
    </DashboardLayout>
  );
}
