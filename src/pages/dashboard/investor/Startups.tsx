import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { Search, Eye, Building, MapPin, Users, Calendar, X, Rocket, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Startup {
  name: string;
  industry: string;
  stage: string;
  country: string;
  team: string;
  founded: string;
}

const INDUSTRIES = ["FinTech", "AgriTech", "CleanTech", "EdTech"];

export default function InvestorStartups() {
  const startups: Startup[] = [
    { name: "FinTechAfrica", industry: "FinTech", stage: "Series A", country: "Kenya", team: "12", founded: "2021" },
    { name: "AgriSmart AI", industry: "AgriTech", stage: "Seed", country: "Nigeria", team: "6", founded: "2023" },
    { name: "GreenBuild Co", industry: "CleanTech", stage: "Series B", country: "UAE", team: "28", founded: "2020" },
    { name: "EduPlatform Global", industry: "EdTech", stage: "Seed", country: "USA", team: "9", founded: "2022" },
  ];

  // State controls for tables
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [inspectedStartup, setInspectedStartup] = useState<Startup | null>(null);

  // Filter Pipeline Engine
  const filteredStartups = startups.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.country.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !selectedIndustry || s.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <DashboardLayout>
      <PageHeader 
        title="Startups" 
        description="Browse vetted startups seeking investment." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Startups" }]} 
      />

      <div className="space-y-6">
        {/* Table Filters Wrapper Row */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-card p-4 rounded-xl border border-border/80">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search startup or country..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-muted/20 border-border focus-visible:ring-gold/30"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="h-10 rounded-lg border border-border bg-muted/20 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-gold/30 cursor-pointer min-w-[140px]"
            >
              <option value="">All Industries</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Premium Tabular Matrix Viewport */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                  <th className="p-4 pl-5">Startup Company</th>
                  <th className="p-4">Sector Industry</th>
                  <th className="p-4">Funding Stage</th>
                  <th className="p-4">Origin / Country</th>
                  <th className="p-4 text-center">Team Size</th>
                  <th className="p-4 text-center">Founded</th>
                  <th className="p-4 pr-5 text-right">Profile Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-medium">
                {filteredStartups.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-muted-foreground select-none">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Building className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                        <p className="font-semibold text-foreground">No ventures match filters</p>
                        <p className="text-xs">Try adjusting your query strings or clearing your industry selector filters.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStartups.map((s) => (
                    <tr key={s.name} className="hover:bg-muted/30 transition-colors group">
                      {/* Name & Avatar Cell */}
                      <td className="p-4 pl-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-xs shadow-inner">
                            {s.name[0]}
                          </div>
                          <span className="font-semibold text-foreground tracking-tight">{s.name}</span>
                        </div>
                      </td>

                      {/* Sector Industry */}
                      <td className="p-4">
                        <span className="bg-muted px-2 py-1 rounded-md text-xs font-semibold text-foreground border border-border/40">
                          {s.industry}
                        </span>
                      </td>

                      {/* Capital Stage */}
                      <td className="p-4">
                        <span className="text-xs bg-slate-900 text-gold border border-gold/20 font-bold px-2.5 py-0.5 rounded-full">
                          {s.stage}
                        </span>
                      </td>

                      {/* Country Origin */}
                      <td className="p-4 text-muted-foreground">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground/70" />
                          {s.country}
                        </div>
                      </td>

                      {/* Internal Team Capital */}
                      <td className="p-4 text-center font-mono text-foreground">{s.team} members</td>

                      {/* Historical Date Tag */}
                      <td className="p-4 text-center font-mono text-muted-foreground">{s.founded}</td>

                      {/* Functional Profile Link Actions */}
                      <td className="p-4 pr-5 text-right">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => setInspectedStartup(s)}
                          className="h-8 text-xs font-bold border-border hover:border-gold/50 hover:bg-gold/5 transition-all flex items-center gap-1.5 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" /> View Profile
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QUICK DRAWER PROFILE PREVIEW DIALOGUE INTERACTIVE MODAL */}
      {inspectedStartup && (
        <div 
          onClick={() => setInspectedStartup(null)}
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-card border border-border w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header Content Section */}
            <div className="p-4 bg-muted/40 border-b border-border flex justify-between items-center select-none">
              <div className="flex items-center gap-2">
                <Rocket className="w-4 h-4 text-gold" />
                <h4 className="font-bold text-sm text-foreground tracking-tight">Vetted Pipeline Evaluation</h4>
              </div>
              <button 
                onClick={() => setInspectedStartup(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Core Statistics Data Maps Loop Container */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-foreground tracking-tight">{inspectedStartup.name}</h3>
                <p className="text-xs text-gold font-bold mt-1 tracking-wider uppercase">{inspectedStartup.industry} Matrix Node</p>
              </div>

              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center text-sm py-2 border-b border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> Venture Allocation Phase</span>
                  <span className="font-bold text-foreground text-xs bg-slate-900 border border-gold/20 text-gold px-2 py-0.5 rounded-md">{inspectedStartup.stage}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Headquarters Jurisdiction</span>
                  <span className="font-semibold text-foreground">{inspectedStartup.country}</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2 border-b border-border/40">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Enterprise Headcount</span>
                  <span className="font-mono font-bold text-foreground">{inspectedStartup.team} Active Builders</span>
                </div>
                <div className="flex justify-between items-center text-sm py-2">
                  <span className="text-muted-foreground flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Incorporation Origin</span>
                  <span className="font-mono text-muted-foreground">{inspectedStartup.founded} A.D.</span>
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions Drawer Strip */}
            <div className="p-4 bg-muted/20 border-t border-border flex justify-end gap-2 select-none">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setInspectedStartup(null)}
                className="hover:bg-muted text-xs font-semibold"
              >
                Dismiss Audit
              </Button>
              <Button 
                size="sm"
                className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold px-4"
                onClick={() => alert(`Connecting securely with founders of ${inspectedStartup.name}...`)}
              >
                Request Deal Room Access
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}