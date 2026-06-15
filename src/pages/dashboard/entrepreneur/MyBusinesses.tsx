import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, Download, Edit3, Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INITIAL_BUSINESSES: Business[] = [
  { id: "b1", ownerId: "u1", name: "TechBridge Solutions", tagline: "Bridging tech talent globally", description: "Connecting world-class African developers with global remote opportunities.", industry: "Technology", stage: "growth", founded: "2022", employees: "11-50", location: "Lagos", country: "Nigeria", tags: ["SaaS", "B2B"], isVerified: true, isFeatured: false, viewsCount: 1240, status: "active", createdAt: "2024-01-15T00:00:00Z", updatedAt: "2026-06-01T00:00:00Z" },
  { id: "b2", ownerId: "u1", name: "GreenFarm AI", tagline: "AI-driven precision agriculture", description: "Optimizing crop yields using IoT soil sensors and predictive AI analysis.", industry: "AgriTech", stage: "startup", founded: "2023", employees: "1-10", location: "Nairobi", country: "Kenya", tags: ["AI", "Agriculture"], isVerified: false, isFeatured: false, viewsCount: 540, status: "active", createdAt: "2024-06-20T00:00:00Z", updatedAt: "2026-05-10T00:00:00Z" },
  { id: "b3", ownerId: "u1", name: "HealthLink Pro", tagline: "Connecting patients and specialists", description: "Telehealth mobile network providing clinical consultations across West Africa.", industry: "HealthTech", stage: "idea", founded: "2025", employees: "1-10", location: "Accra", country: "Ghana", tags: ["Health", "Telehealth"], isVerified: false, isFeatured: false, viewsCount: 120, status: "pending", createdAt: "2025-11-01T00:00:00Z", updatedAt: "2026-04-22T00:00:00Z" },
];

const CATS = [
  { value: "Technology", label: "Technology" },
  { value: "AgriTech", label: "AgriTech" },
  { value: "HealthTech", label: "HealthTech" },
  { value: "Finance", label: "Finance" },
  { value: "Education", label: "Education" },
];

export default function MyBusinesses() {
  const [businesses, setBusinesses] = useLocalStorage<Business[]>("entrepreneur_businesses", INITIAL_BUSINESSES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editItem, setEditItem] = useState<Business | null>(null);
  const [formName, setFormName] = useState("");
  const [formTagline, setFormTagline] = useState("");
  const [formIndustry, setFormIndustry] = useState("Technology");
  const [formStage, setFormStage] = useState<Business["stage"]>("idea");
  const [formFounded, setFormFounded] = useState("2026");
  const [formEmployees, setFormEmployees] = useState("1-10");
  const [formLocation, setFormLocation] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formTags, setFormTags] = useState("");

  const filtered = businesses.filter((b) => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.industry.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || b.industry === category;
    return matchSearch && matchCat;
  });

  const handleOpenForm = (item: Business | null = null) => {
    if (item) {
      setEditItem(item);
      setFormName(item.name);
      setFormTagline(item.tagline);
      setFormIndustry(item.industry);
      setFormStage(item.stage);
      setFormFounded(item.founded);
      setFormEmployees(item.employees);
      setFormLocation(item.location);
      setFormCountry(item.country);
      setFormTags(item.tags.join(", "));
    } else {
      setEditItem(null);
      setFormName("");
      setFormTagline("");
      setFormIndustry("Technology");
      setFormStage("idea");
      setFormFounded(new Date().getFullYear().toString());
      setFormEmployees("1-10");
      setFormLocation("");
      setFormCountry("");
      setFormTags("");
    }
    setIsFormOpen(true);
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formLocation.trim() || !formCountry.trim()) {
      toast.error("Please fill in all required fields (Name, Location, Country).");
      return;
    }

    const tagsArr = formTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editItem) {
      // Edit mode
      setBusinesses((prev) =>
        prev.map((b) => {
          if (b.id === editItem.id) {
            return {
              ...b,
              name: formName,
              tagline: formTagline,
              industry: formIndustry,
              stage: formStage,
              founded: formFounded,
              employees: formEmployees,
              location: formLocation,
              country: formCountry,
              tags: tagsArr,
              updatedAt: new Date().toISOString(),
            };
          }
          return b;
        })
      );
      toast.success("Business profile updated successfully.");
    } else {
      // Create mode
      const newBusiness: Business = {
        id: generateId(),
        ownerId: "u1",
        name: formName,
        tagline: formTagline,
        description: "",
        industry: formIndustry,
        stage: formStage,
        founded: formFounded,
        employees: formEmployees,
        location: formLocation,
        country: formCountry,
        tags: tagsArr,
        isVerified: false,
        isFeatured: false,
        viewsCount: 0,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setBusinesses((prev) => [newBusiness, ...prev]);
      toast.success("New business added successfully. Verification is pending.");
    }

    setIsFormOpen(false);
  };

  const columns: TableColumn<Record<string, unknown>>[] = [
    { key: "name", label: "Business Name", sortable: true },
    { key: "industry", label: "Industry", sortable: true },
    { key: "stage", label: "Stage", render: (v) => <span className="capitalize px-2 py-0.5 bg-muted rounded text-xs">{String(v)}</span> },
    { key: "status", label: "Status", sortable: true, render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${v === "active" ? "bg-success/10 text-success" : v === "pending" ? "bg-gold/10 text-gold" : "bg-destructive/10 text-destructive"}`}>{String(v)}</span> },
    { key: "viewsCount", label: "Views", sortable: true },
    { key: "createdAt", label: "Created", render: (v) => formatDate(String(v)) },
    { key: "id", label: "Actions", render: (_v, row) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs flex items-center gap-1 border-border/80" onClick={() => handleOpenForm(row as unknown as Business)}>
          <Edit3 className="w-3 h-3" /> Edit
        </Button>
        <Button size="sm" variant="outline" className="h-7 text-xs text-destructive hover:text-destructive flex items-center gap-1 border-destructive/20" onClick={() => setDeleteId(String(row.id))}>
          <Trash2 className="w-3 h-3" /> Delete
        </Button>
      </div>
    )},
  ];

  const handleDelete = () => {
    setBusinesses((prev) => prev.filter((b) => b.id !== deleteId));
    setDeleteId(null);
    toast.success("Business deleted successfully.");
  };

  const handleExportCSV = () => {
    exportToCSV(businesses as unknown as Record<string, unknown>[], "my-businesses", [
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
      <PageHeader 
        title="My Businesses" 
        description="Manage your business listings, pitches, and verifications." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "My Businesses" }]}
        actions={<>
          <Button variant="outline" onClick={handleExportCSV} className="border-border/80 hover:bg-muted text-xs h-9">
            <Download className="w-4 h-4 mr-1.5" />Export CSV
          </Button>
          <Button className="bg-gold text-royal-black hover:bg-gold/90 text-xs h-9" onClick={() => handleOpenForm(null)}>
            <Plus className="w-4 h-4 mr-1.5" />Add Business
          </Button>
        </>}
      />
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar onSearch={setSearch} placeholder="Search businesses..." className="flex-1" />
        </div>
        <CategorySection categories={CATS} selected={category} onSelect={setCategory} label="Filter by Industry" />
        <DataTable columns={columns} data={filtered as unknown as Record<string, unknown>[]} searchQuery={search} />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal 
        open={!!deleteId} 
        onOpenChange={(o) => !o && setDeleteId(null)} 
        title="Delete Business" 
        description="This action cannot be undone. This business listing and all associated opportunities will be permanently removed." 
        confirmLabel="Delete Business" 
        onConfirm={handleDelete} 
      />

      {/* Add / Edit Form Dialog Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <form onSubmit={handleSaveBusiness}>
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-lg">
                {editItem ? "Edit Business Profile" : "Register New Business"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Enter your startup or business parameters. Profile details will be searchable by verified platform investors.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-4">
              <div className="space-y-1">
                <Label htmlFor="b-name" className="text-xs text-muted-foreground font-semibold">Business / Startup Name *</Label>
                <Input id="b-name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Apex Tech Ventures" className="bg-background border-border text-xs h-9" required />
              </div>

              <div className="space-y-1">
                <Label htmlFor="b-tagline" className="text-xs text-muted-foreground font-semibold">One-sentence Tagline</Label>
                <Input id="b-tagline" value={formTagline} onChange={(e) => setFormTagline(e.target.value)} placeholder="e.g. Next-generation payment rails for SMEs" className="bg-background border-border text-xs h-9" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="b-industry" className="text-xs text-muted-foreground font-semibold">Industry Sector</Label>
                  <select id="b-industry" value={formIndustry} onChange={(e) => setFormIndustry(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring h-9">
                    {CATS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="b-stage" className="text-xs text-muted-foreground font-semibold">Company Stage</Label>
                  <select id="b-stage" value={formStage} onChange={(e) => setFormStage(e.target.value as Business["stage"])} className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring h-9">
                    <option value="idea">Idea / Pre-seed</option>
                    <option value="startup">Seed Stage</option>
                    <option value="growth">Series A/B (Growth)</option>
                    <option value="established">Established</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="b-founded" className="text-xs text-muted-foreground font-semibold">Year Founded</Label>
                  <Input id="b-founded" type="number" min="1900" max="2030" value={formFounded} onChange={(e) => setFormFounded(e.target.value)} className="bg-background border-border text-xs h-9" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="b-employees" className="text-xs text-muted-foreground font-semibold">Employees</Label>
                  <select id="b-employees" value={formEmployees} onChange={(e) => setFormEmployees(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring h-9">
                    <option value="1-10">1 - 10</option>
                    <option value="11-50">11 - 50</option>
                    <option value="51-200">51 - 200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="b-location" className="text-xs text-muted-foreground font-semibold">City Headquarters *</Label>
                  <Input id="b-location" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} placeholder="e.g. Nairobi" className="bg-background border-border text-xs h-9" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="b-country" className="text-xs text-muted-foreground font-semibold">Country *</Label>
                  <Input id="b-country" value={formCountry} onChange={(e) => setFormCountry(e.target.value)} placeholder="e.g. Kenya" className="bg-background border-border text-xs h-9" required />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="b-tags" className="text-xs text-muted-foreground font-semibold">Search Tags (Comma separated)</Label>
                <Input id="b-tags" value={formTags} onChange={(e) => setFormTags(e.target.value)} placeholder="e.g. SaaS, Fintech, AI" className="bg-background border-border text-xs h-9" />
              </div>
            </div>

            <DialogFooter className="border-t border-border pt-3">
              <Button type="button" variant="outline" size="sm" className="text-xs h-9" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs h-9 bg-gold text-royal-black hover:bg-gold/90">
                {editItem ? "Save Changes" : "Submit Listing"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}