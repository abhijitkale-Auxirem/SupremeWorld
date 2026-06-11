import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CATS = [{ value: "fintech", label: "FinTech" }, { value: "healthtech", label: "HealthTech" }, { value: "agritech", label: "AgriTech" }, { value: "deeptech", label: "Deep Tech" }];

const DEALS = [
  { name: "FinTechAfrica", industry: "FinTech", stage: "Series A", ask: "$2.5M", valuation: "$18M", equity: "14%", traction: "120K users", location: "Kenya" },
  { name: "AgriSmart AI", industry: "AgriTech", stage: "Seed", ask: "$800K", valuation: "$6M", equity: "13%", traction: "8K farms", location: "Nigeria" },
  { name: "HealthLink Pro", industry: "HealthTech", stage: "Pre-Seed", ask: "$300K", valuation: "$2M", equity: "15%", traction: "Pilot stage", location: "India" },
  { name: "LogiChain", industry: "Logistics", stage: "Series A", ask: "$3M", valuation: "$22M", equity: "14%", traction: "42 partners", location: "Singapore" },
];

export default function DealFlow() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");

  const filtered = DEALS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (!cat || d.industry.toLowerCase() === cat)
  );

  return (
    <DashboardLayout>
      <PageHeader title="Deal Flow" description="Review and analyze incoming investment opportunities." breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Deal Flow" }]} />
      <div className="space-y-4">
        <SearchBar onSearch={setSearch} placeholder="Search deals..." className="max-w-sm" />
        <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Industry" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <div key={d.name} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
              <div className="flex justify-between mb-3">
                <div>
                  <h3 className="font-display font-semibold text-foreground">{d.name}</h3>
                  <p className="text-sm text-muted-foreground">{d.industry} · {d.location}</p>
                </div>
                <span className="px-2 py-0.5 h-fit bg-muted text-muted-foreground text-xs rounded">{d.stage}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-2 bg-muted/50 rounded text-center"><p className="text-xs text-muted-foreground">Ask</p><p className="font-bold text-gold text-sm">{d.ask}</p></div>
                <div className="p-2 bg-muted/50 rounded text-center"><p className="text-xs text-muted-foreground">Valuation</p><p className="font-bold text-sm">{d.valuation}</p></div>
                <div className="p-2 bg-muted/50 rounded text-center"><p className="text-xs text-muted-foreground">Equity</p><p className="font-bold text-sm">{d.equity}</p></div>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Traction: {d.traction}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs">View Details</Button>
                <Button size="sm" className="flex-1 text-xs bg-gold text-royal-black hover:bg-gold/90">Express Interest</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
