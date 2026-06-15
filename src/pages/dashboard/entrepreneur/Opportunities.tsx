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
import { Briefcase, Plus, Search, ArrowUpRight, CheckCircle2, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { generateId } from "@/utils/helpers";

interface Opportunity {
  id: string;
  title: string;
  type: "Partnership" | "Collaboration" | "Distribution" | "Investment" | string;
  status: "Open" | "Closed" | "In Progress" | string;
  budget: string;
  description: string;
  company: string;
  applied?: boolean;
}

const INITIAL_OPPORTUNITIES: Opportunity[] = [
  { id: "op-1", title: "Strategic B2B Partnership — TechHub Africa", type: "Partnership", status: "Open", budget: "$50K USD", description: "Looking for software distribution partners and local integration specialists in East Africa.", company: "TechBridge Solutions" },
  { id: "op-2", title: "Co-founder Wanted — FinApp Tech", type: "Collaboration", status: "Open", budget: "Equity (15-20%)", description: "Seeking a technical co-founder with background in Web3 and mobile payments.", company: "FinApp Ltd" },
  { id: "op-3", title: "Distribution Deal — West Africa Retail", type: "Distribution", status: "In Progress", budget: "$120K / year", description: "Expanding retail FMCG logistics platform lines into Ghana and Ivory Coast.", company: "GreenFarm AI" },
  { id: "op-4", title: "Seed Funding Round — Serie A Prep", type: "Investment", status: "Open", budget: "$500K Equity", description: "Securing capital for Series A scaling of IoT agricultural sensor manufacturing.", company: "GreenFarm AI" },
];

export default function EntrepreneurOpportunities() {
  const [opps, setOpps] = useLocalStorage<Opportunity[]>("entrepreneur_opportunities", INITIAL_OPPORTUNITIES);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState("Partnership");
  const [formBudget, setFormBudget] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCompany, setFormCompany] = useState("");

  const filtered = opps.filter((o) => {
    const matchSearch =
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company.toLowerCase().includes(search.toLowerCase()) ||
      o.description.toLowerCase().includes(search.toLowerCase());
    
    const matchType = filterType === "All" || o.type === filterType;
    return matchSearch && matchType;
  });

  const handleApply = (id: string, title: string) => {
    setOpps((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          return { ...o, applied: !o.applied };
        }
        return o;
      })
    );

    const target = opps.find((o) => o.id === id);
    if (target?.applied) {
      toast.info(`Withdrew application for: ${title}`);
    } else {
      toast.success(`Successfully applied for: ${title}! The publisher will contact you soon.`);
    }
  };

  const handleSaveOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCompany.trim() || !formBudget.trim()) {
      toast.error("Please fill in all required fields (Title, Company, Budget/Equity).");
      return;
    }

    const newOpp: Opportunity = {
      id: generateId(),
      title: formTitle,
      type: formType,
      status: "Open",
      budget: formBudget,
      description: formDescription,
      company: formCompany,
      applied: false,
    };

    setOpps((prev) => [newOpp, ...prev]);
    toast.success("Opportunity published successfully to the SupremeWorld network.");
    setIsFormOpen(false);

    // Reset
    setFormTitle("");
    setFormType("Partnership");
    setFormBudget("");
    setFormDescription("");
    setFormCompany("");
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Opportunities" 
        description="Discover, post, and apply for strategic partnerships, funding rounds, and distributions." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Opportunities" }]}
        actions={
          <Button className="bg-gold text-royal-black hover:bg-gold/90 text-xs h-9" onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />Create Opportunity
          </Button>
        }
      />

      {/* Filter and Search */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background border-border text-xs h-9"
            />
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap border-b border-border pt-1 gap-1">
          {["All", "Partnership", "Collaboration", "Distribution", "Investment"].map((type) => {
            const count = type === "All" ? opps.length : opps.filter((o) => o.type === type).length;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs px-4 py-2 border-b-2 font-medium transition-all duration-200 -mb-[2px] ${
                  filterType === type
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {type} <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card border border-border border-dashed rounded-xl">
            <Briefcase className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">No opportunities discovered</p>
            <p className="text-xs text-muted-foreground mt-1">Adjust search parameters or create a new opportunity listing.</p>
          </div>
        ) : (
          filtered.map((o) => (
            <div 
              key={o.id} 
              className="p-5 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-gold/30 transition-all duration-300 hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gold/10 text-gold">
                    {o.type}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${o.status === "Open" ? "bg-success/10 text-success" : "bg-deep-blue/10 text-deep-blue"}`}>
                    {o.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-foreground mt-3 text-base leading-snug">{o.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-semibold">{o.company}</p>
                <p className="text-xs text-muted-foreground/90 mt-2 line-clamp-3 leading-relaxed">
                  {o.description}
                </p>
              </div>

              <div className="border-t border-border mt-4 pt-4 flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Budget / Equity</span>
                  <span className="text-gold font-bold text-sm mt-0.5">{o.budget}</span>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className={`h-8 text-xs border-gold/40 text-gold hover:bg-gold/10 hover:text-gold ${
                    o.applied ? "bg-success/15 border-success/30 text-success hover:bg-success/20 hover:text-success" : ""
                  }`}
                  onClick={() => handleApply(o.id, o.title)}
                >
                  {o.applied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Applied
                    </>
                  ) : (
                    <>
                      Apply <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Publish Form Dialog Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-md bg-card text-foreground border-border">
          <form onSubmit={handleSaveOpportunity}>
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-lg">Create New Opportunity</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Advertise partnerships, collaborations, equity stakes, or contracts to the SupremeWorld network.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 my-4">
              <div className="space-y-1">
                <Label htmlFor="o-title" className="text-xs text-muted-foreground font-semibold">Opportunity Title *</Label>
                <Input
                  id="o-title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Seeking Local Distributer for Fintech SDK"
                  className="bg-background border-border text-xs h-9"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="o-company" className="text-xs text-muted-foreground font-semibold">Publishing Company *</Label>
                  <Input
                    id="o-company"
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    placeholder="e.g. GreenFarm AI"
                    className="bg-background border-border text-xs h-9"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="o-type" className="text-xs text-muted-foreground font-semibold">Classification Type</Label>
                  <select
                    id="o-type"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring h-9"
                  >
                    <option value="Partnership">Partnership</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Distribution">Distribution</option>
                    <option value="Investment">Investment</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="o-budget" className="text-xs text-muted-foreground font-semibold">Offering / Budget Allocation *</Label>
                <Input
                  id="o-budget"
                  value={formBudget}
                  onChange={(e) => setFormBudget(e.target.value)}
                  placeholder="e.g. $40,000 USD or 10% Equity"
                  className="bg-background border-border text-xs h-9"
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="o-desc" className="text-xs text-muted-foreground font-semibold">Description *</Label>
                <textarea
                  id="o-desc"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide parameters, requirements, and benefits of this strategic connection line..."
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring h-20"
                  required
                />
              </div>
            </div>

            <DialogFooter className="border-t border-border pt-3">
              <Button type="button" variant="outline" size="sm" className="text-xs h-9" onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs h-9 bg-gold text-royal-black hover:bg-gold/90">
                Publish Opportunity
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
