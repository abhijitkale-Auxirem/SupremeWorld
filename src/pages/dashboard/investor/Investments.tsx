import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar, Building, Landmark, Percent } from "lucide-react";
import { exportToCSV } from "@/utils/csvExporter";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface InvestmentPosition {
  id: string;
  startupName: string;
  amount: number;
  round: string;
  equity: string;
  currentValue: number;
  status: string;
  investedAt: string;
}

const INVESTMENTS: InvestmentPosition[] = [
  { id: "i1", startupName: "FinTechAfrica", amount: 250000, round: "Series A", equity: "14%", currentValue: 330000, status: "active", investedAt: "2025-03-10" },
  { id: "i2", startupName: "AgriSmart AI", amount: 75000, round: "Seed", equity: "13%", currentValue: 88500, status: "active", investedAt: "2025-07-22" },
  { id: "i3", startupName: "LogiChain", amount: 500000, round: "Series A", equity: "11%", currentValue: 780000, status: "active", investedAt: "2024-11-05" },
  { id: "i4", startupName: "EduPlatform", amount: 150000, round: "Seed", equity: "18%", currentValue: 140000, status: "active", investedAt: "2025-01-18" },
];

export default function InvestorInvestments() {
  const [query, setQuery] = useState("");

  const filteredInvestments = INVESTMENTS.filter((inv) =>
    inv.startupName.toLowerCase().includes(query.toLowerCase())
  );

  // Dynamic Portfolio Macro Aggregators
  const absoluteTotalCost = INVESTMENTS.reduce((sum, item) => sum + item.amount, 0);
  const aggregateCurrentAssetValue = INVESTMENTS.reduce((sum, item) => sum + item.currentValue, 0);
  const macroRoiPercentage = ((aggregateCurrentAssetValue - absoluteTotalCost) / absoluteTotalCost) * 100;

  const handleExport = () => {
    exportToCSV(INVESTMENTS as unknown as Record<string, unknown>[], "investments", [
      { key: "startupName", label: "Company" },
      { key: "round", label: "Round" },
      { key: "amount", label: "Invested" },
      { key: "equity", label: "Equity" },
      { key: "currentValue", label: "Current Value" },
    ]);
    toast.success("Investments ledger exported successfully as CSV.");
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="My Investments" 
        description="Track all your investment positions." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Investments" }]}
        actions={
          <Button variant="outline" onClick={handleExport} className="border-border/80 hover:bg-muted font-bold text-xs">
            <Download className="w-4 h-4 mr-1.5 stroke-[2.5]" /> Export CSV
          </Button>
        } 
      />

      <div className="space-y-6">
        {/* Metric Overview Summary Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5 text-muted-foreground" /> Total Principal Invested
            </p>
            <p className="text-2xl font-mono font-black text-foreground">${absoluteTotalCost.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gold" /> Assets Under Management
            </p>
            <p className="text-2xl font-mono font-black text-foreground">${aggregateCurrentAssetValue.toLocaleString()}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card shadow-sm">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1.5">
              {macroRoiPercentage >= 0 ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <TrendingDown className="w-3.5 h-3.5 text-destructive" />} Net Portfolio Gain
            </p>
            <p className={`text-2xl font-mono font-black ${macroRoiPercentage >= 0 ? "text-emerald-500" : "text-destructive"}`}>
              {macroRoiPercentage >= 0 ? "+" : ""}{macroRoiPercentage.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Input Navigation Utilities */}
        <div className="flex bg-card p-3 rounded-xl border border-border/80 max-w-sm">
          <Input 
            type="text"
            placeholder="Search company positions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 bg-muted/20 border-border focus-visible:ring-gold/30 text-sm font-medium"
          />
        </div>

        {/* Premium Ledger Matrix Layout Frame */}
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                  <th className="p-4 pl-5">Asset / Company</th>
                  <th className="p-4">Investment Phase</th>
                  <th className="p-4 text-right">Principal Amount</th>
                  <th className="p-4 text-center">Equity Ownership</th>
                  <th className="p-4 text-right">Current Valuation</th>
                  <th className="p-4 text-center">Net Yield Delta</th>
                  <th className="p-4 text-center">State Allocation</th>
                  <th className="p-4 pr-5 text-right">Deployment Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 font-medium">
                {filteredInvestments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-12 text-center text-muted-foreground select-none">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Building className="w-8 h-8 text-muted-foreground/40 mx-auto" />
                        <p className="font-semibold text-foreground">No asset lines discovered</p>
                        <p className="text-xs">Adjust your lookup tags to fetch portfolio vectors.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredInvestments.map((inv) => {
                    const trackingVarianceYield = inv.currentValue - inv.amount;
                    const trackingVariancePct = (trackingVarianceYield / inv.amount) * 100;
                    
                    return (
                      <tr key={inv.id} className="hover:bg-muted/30 transition-colors group">
                        {/* Company Node Metadata Header */}
                        <td className="p-4 pl-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-xs shadow-inner">
                              {inv.startupName[0]}
                            </div>
                            <span className="font-bold text-foreground tracking-tight">{inv.startupName}</span>
                          </div>
                        </td>

                        {/* Financial Round Allocation Identification */}
                        <td className="p-4">
                          <span className="text-xs bg-slate-900 border border-gold/20 text-gold font-black px-2.5 py-0.5 rounded-full">
                            {inv.round}
                          </span>
                        </td>

                        {/* Base Capital Injection Allocation */}
                        <td className="p-4 text-right font-mono font-bold text-foreground">
                          ${inv.amount.toLocaleString()}
                        </td>

                        {/* Fixed Equity Percentage */}
                        <td className="p-4 text-center text-muted-foreground font-mono font-semibold">
                          <span className="inline-flex items-center gap-0.5 text-foreground">
                            {inv.equity} <Percent className="w-2.5 h-2.5 text-muted-foreground/60" />
                          </span>
                        </td>

                        {/* Audited Current Fair Market Value Ledger Line */}
                        <td className="p-4 text-right font-mono font-black text-foreground">
                          ${inv.currentValue.toLocaleString()}
                        </td>

                        {/* Real-time Dynamic Delta Fluctuations Yield Tracker */}
                        <td className="p-4 text-center font-mono text-xs">
                          <span className={`inline-flex items-center gap-1 font-bold ${
                            trackingVarianceYield >= 0 ? "text-emerald-500" : "text-destructive"
                          }`}>
                            {trackingVarianceYield >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {trackingVarianceYield >= 0 ? "+" : ""}{trackingVariancePct.toFixed(0)}%
                          </span>
                        </td>

                        {/* System Process Status Badges */}
                        <td className="p-4 text-center">
                          <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold rounded-full capitalize">
                            {inv.status}
                          </span>
                        </td>

                        {/* Historical Timestamp Deployment Date */}
                        <td className="p-4 pr-5 text-right text-xs font-mono text-muted-foreground">
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar className="w-3 h-3 opacity-60" /> {inv.investedAt}
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
    </DashboardLayout>
  );
}