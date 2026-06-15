import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Eye, Sparkles, Building, Globe, MapPin, TrendingUp, DollarSign, X, CheckCircle2 } from "lucide-react";

interface Deal {
  name: string;
  industry: string;
  stage: string;
  ask: string;
  valuation: string;
  equity: string;
  traction: string;
  location: string;
}

const CATS = [
  { value: "fintech", label: "FinTech" }, 
  { value: "healthtech", label: "HealthTech" }, 
  { value: "agritech", label: "AgriTech" }, 
  { value: "deeptech", label: "Deep Tech" },
  { value: "logistics", label: "Logistics" }
];

const DEALS: Deal[] = [
  { name: "FinTechAfrica", industry: "FinTech", stage: "Series A", ask: "$2.5M", valuation: "$18M", equity: "14%", traction: "120K users", location: "Kenya" },
  { name: "AgriSmart AI", industry: "AgriTech", stage: "Seed", ask: "$800K", valuation: "$6M", equity: "13%", traction: "8K farms", location: "Nigeria" },
  { name: "HealthLink Pro", industry: "HealthTech", stage: "Pre-Seed", ask: "$300K", valuation: "$2M", equity: "15%", traction: "Pilot stage", location: "India" },
  { name: "LogiChain", industry: "Logistics", stage: "Series A", ask: "$3M", valuation: "$22M", equity: "14%", traction: "42 partners", location: "Singapore" },
];

export default function DealFlow() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("");
  
  // Interactive Tracker Hooks
  const [inspectedDeal, setInspectedDeal] = useState<Deal | null>(null);
  const [expressedInterests, setExpressedInterests] = useState<Record<string, boolean>>({});

  const filtered = DEALS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (!cat || d.industry.toLowerCase() === cat.toLowerCase())
  );

  // ACTION: Express Interest handling pipeline
  const handleExpressInterest = (dealName: string) => {
    setExpressedInterests(prev => ({
      ...prev,
      [dealName]: !prev[dealName] // Toggle state
    }));
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Deal Flow" 
        description="Review and analyze incoming investment opportunities." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Deal Flow" }]} 
      />
      
      <div className="space-y-6">
        {/* Controls Layout Utility Stack */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-xl border border-border/80">
          <SearchBar onSearch={setSearch} placeholder="Search opportunities..." className="max-w-xs w-full" />
          <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Filter Industry" />
        </div>

        {/* Tabular Matrix Framework Wrapper */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                  <th className="p-4 pl-5">Asset / Company</th>
                  <th className="p-4">Industry</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4 text-center">Funding Ask</th>
                  <th className="p-4 text-center">Valuation</th>
                  <th className="p-4 text-center">Equity Offer</th>
                  <th className="p-4 hidden lg:table-cell">Traction Metric</th>
                  <th className="p-4 pr-5 text-right">Actions Matrix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-muted-foreground select-none">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Building className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                        <p className="font-semibold text-foreground">No matching investments found</p>
                        <p className="text-xs">Adjust your lookup values or select a different industry classification.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((d) => {
                    const hasExpressed = expressedInterests[d.name];
                    return (
                      <tr key={d.name} className="hover:bg-muted/30 transition-colors group">
                        {/* Company Identity Cell */}
                        <td className="p-4 pl-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-xs shadow-inner">
                              {d.name[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground tracking-tight">{d.name}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3" /> {d.location}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        {/* Sector Tag */}
                        <td className="p-4 text-muted-foreground">
                          <span className="bg-muted px-2 py-1 rounded-md text-xs font-semibold text-foreground border border-border/40">
                            {d.industry}
                          </span>
                        </td>
                        
                        {/* Stage Flag Tag */}
                        <td className="p-4">
                          <span className="text-xs bg-slate-900 text-gold border border-gold/20 font-bold px-2 py-0.5 rounded-full">
                            {d.stage}
                          </span>
                        </td>
                        
                        {/* Numeric Metrics Matrix Blocks */}
                        <td className="p-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-500">{d.ask}</td>
                        <td className="p-4 text-center font-mono font-semibold text-foreground">{d.valuation}</td>
                        <td className="p-4 text-center font-mono font-semibold text-foreground">{d.equity}</td>
                        
                        {/* Hidden Layout Cell elements */}
                        <td className="p-4 text-xs text-muted-foreground hidden lg:table-cell max-w-[140px] truncate">
                          {d.traction}
                        </td>
                        
                        {/* Dynamic Functional Table Actions Elements */}
                        <td className="p-4 pr-5 text-right">
                          <div className="flex gap-2 justify-end items-center">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => setInspectedDeal(d)}
                              className="h-8 w-8 p-0 rounded-lg opacity-80 group-hover:opacity-100 hover:bg-muted"
                              title="Inspect Ledger Details"
                            >
                              <Eye className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                            </Button>
                            
                            <Button 
                              size="sm"
                              onClick={() => handleExpressInterest(d.name)}
                              className={`h-8 px-3 text-xs font-bold rounded-lg transition-all border ${
                                hasExpressed 
                                  ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/20" 
                                  : "bg-gold text-royal-black border-transparent hover:bg-gold/90 shadow-sm"
                              }`}
                            >
                              {hasExpressed ? (
                                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Expressed</span>
                              ) : (
                                "Express Interest"
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* DETAILED DEAL ANALYTICS INSPECTOR OVERLAY PANEL MODAL */}
      {inspectedDeal && (
        <div 
          onClick={() => setInspectedDeal(null)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header banner area */}
            <div className="p-4 bg-muted/40 border-b border-border flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                <h4 className="font-bold text-sm text-foreground tracking-tight">Investment Node Audit Profile</h4>
              </div>
              <button 
                onClick={() => setInspectedDeal(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core data visualization matrix array lists */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">{inspectedDeal.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {inspectedDeal.industry}</span>
                  <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" /> {inspectedDeal.location}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-muted/40 border border-border/60 rounded-xl">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 flex items-center gap-1"><DollarSign className="w-3 h-3 text-emerald-500" /> Capital Allocation Ask</div>
                  <div className="text-base font-mono font-black text-emerald-600 dark:text-emerald-500">{inspectedDeal.ask}</div>
                </div>
                <div className="p-3 bg-muted/40 border border-border/60 rounded-xl">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-gold" /> System Valuation</div>
                  <div className="text-base font-mono font-black text-foreground">{inspectedDeal.valuation}</div>
                </div>
                <div className="p-3 bg-muted/40 border border-border/60 rounded-xl">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Equity Position Pool</div>
                  <div className="text-base font-mono font-black text-foreground">{inspectedDeal.equity}</div>
                </div>
                <div className="p-3 bg-muted/40 border border-border/60 rounded-xl">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Velocity Funding Phase</div>
                  <div className="text-base font-bold text-slate-400">{inspectedDeal.stage}</div>
                </div>
              </div>

              <div className="p-4 bg-gold/5 border border-gold/10 rounded-xl">
                <div className="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">Audited Traction Performance</div>
                <p className="text-sm font-medium text-foreground leading-relaxed">{inspectedDeal.traction}</p>
              </div>
            </div>

            {/* Bottom Modal Actions Bar */}
            <div className="p-4 bg-muted/20 border-t border-border flex justify-end gap-2 select-none">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setInspectedDeal(null)}
                className="hover:bg-muted text-xs font-semibold"
              >
                Close Audit
              </Button>
              <Button 
                size="sm"
                onClick={() => {
                  handleExpressInterest(inspectedDeal.name);
                  setInspectedDeal(null);
                }}
                className={`text-xs font-bold px-4 ${
                  expressedInterests[inspectedDeal.name]
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gold text-royal-black hover:bg-gold/90"
                }`}
              >
                {expressedInterests[inspectedDeal.name] ? "Retract Interest" : "Express Interest"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}