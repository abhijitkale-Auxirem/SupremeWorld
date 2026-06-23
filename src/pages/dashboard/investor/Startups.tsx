import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { Search, Eye, Building, MapPin, Users, Calendar, X, Rocket, SlidersHorizontal, ArrowUpRight, Briefcase } from "lucide-react";
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

  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [inspectedStartup, setInspectedStartup] = useState<Startup | null>(null);

  const filteredStartups = startups.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.country.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = !selectedIndustry || s.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <DashboardLayout>
      <PageHeader 
        title="Startups Pipeline" 
        description="Browse and analyze vetted ventures seeking investment allocations." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Startups" }]} 
      />

      <div className="space-y-6">
        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-card p-4 rounded-xl border border-border/60 shadow-sm">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search startup or country..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-10 bg-muted/30 border-border focus-visible:ring-gold/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="h-10 rounded-lg border border-border bg-muted/30 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-1 focus:ring-gold/20 cursor-pointer min-w-[150px]"
            >
              <option value="">All Industries</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabular Viewport */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
                  <th className="p-4 pl-6">Company</th>
                  <th className="p-4">Sector</th>
                  <th className="p-4">Stage</th>
                  <th className="p-4">Jurisdiction</th>
                  <th className="p-4 text-center">Team Size</th>
                  <th className="p-4 text-center">Founded</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-medium">
                {filteredStartups.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-16 text-center text-muted-foreground">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Building className="w-8 h-8 text-muted-foreground/30 mx-auto" />
                        <p className="font-semibold text-foreground">No matches found</p>
                        <p className="text-xs">Try refining your keyword search terms or adjusting the industry filter choice.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredStartups.map((s) => (
                    <tr key={s.name} className="hover:bg-muted/20 transition-colors group">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-center text-gold font-bold text-sm">
                            {s.name[0]}
                          </div>
                          <span className="font-semibold text-foreground tracking-tight">{s.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-muted px-2.5 py-1 rounded-md text-xs font-medium text-muted-foreground border border-border/30">
                          {s.industry}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[11px] bg-foreground/5 dark:bg-gold/10 text-foreground dark:text-gold border border-border dark:border-gold/20 font-bold px-2.5 py-0.5 rounded-full">
                          {s.stage}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-muted-foreground/50" />
                          {s.country}
                        </div>
                      </td>
                      <td className="p-4 text-center text-xs text-foreground font-medium">{s.team} builders</td>
                      <td className="p-4 text-center text-xs text-muted-foreground">{s.founded}</td>
                      <td className="p-4 pr-6 text-right">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => setInspectedStartup(s)}
                          className="h-8 text-xs font-semibold border-border hover:border-gold/40 hover:bg-gold/5 transition-all flex items-center gap-1.5 ml-auto"
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

      {/* REFACTORED PREMIUM POPUP MODAL */}
      {inspectedStartup && (
        <div 
          onClick={() => setInspectedStartup(null)}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="bg-card border border-border w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-5 flex justify-between items-start border-b border-border/60">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-lg shadow-sm">
                  {inspectedStartup.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{inspectedStartup.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 capitalize">
                    <Briefcase className="w-3 h-3 text-gold" /> {inspectedStartup.industry} Ecosystem Node
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setInspectedStartup(null)}
                className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Metrics Grid Layout */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 border border-border/50 rounded-xl p-3.5 space-y-1">
                  <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                    <Rocket className="w-3 h-3" /> Allocation Stage
                  </span>
                  <p className="text-sm font-bold text-foreground">{inspectedStartup.stage}</p>
                </div>

                <div className="bg-muted/30 border border-border/50 rounded-xl p-3.5 space-y-1">
                  <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" /> Jurisdiction
                  </span>
                  <p className="text-sm font-bold text-foreground">{inspectedStartup.country}</p>
                </div>

                <div className="bg-muted/30 border border-border/50 rounded-xl p-3.5 space-y-1">
                  <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                    <Users className="w-3 h-3" /> Headcount
                  </span>
                  <p className="text-sm font-bold text-foreground">{inspectedStartup.team} Builders</p>
                </div>

                <div className="bg-muted/30 border border-border/50 rounded-xl p-3.5 space-y-1">
                  <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1.5 uppercase tracking-wider">
                    <Calendar className="w-3 h-3" /> Incorporation
                  </span>
                  <p className="text-sm font-bold text-foreground">{inspectedStartup.founded} A.D.</p>
                </div>
              </div>

              {/* Informative Alert Note */}
              <div className="p-3.5 bg-gold/5 border border-gold/10 rounded-xl text-xs text-muted-foreground leading-relaxed">
                This venture has been completely vetted by platform analysts. Requesting structural access registers your profile node with their corporate relationship desk.
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 bg-muted/40 border-t border-border/60 flex items-center justify-end gap-2.5">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setInspectedStartup(null)}
                className="hover:bg-muted text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Dismiss
              </Button>
              <Button 
                size="sm"
                className="bg-gold text-black hover:bg-gold/90 text-xs font-bold px-4 h-9 shadow-sm shadow-gold/10 flex items-center gap-1"
                onClick={() => alert(`Initiating institutional secure handshake with ${inspectedStartup.name}...`)}
              >
                Enter Deal Room <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}