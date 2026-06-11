import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/utils/helpers";

const portfolio = { totalInvested: 975000, currentValue: 1338500, totalReturn: 363500, returnPct: 37.3 };
const allocation = [
  { name: "FinTech", value: 35, amount: 341250 },
  { name: "AgriTech", value: 20, amount: 195000 },
  { name: "Logistics", value: 30, amount: 292500 },
  { name: "EdTech", value: 15, amount: 146250 },
];
const COLORS = ["hsl(43,74%,53%)", "hsl(217,91%,38%)", "hsl(158,64%,40%)", "hsl(220,26%,40%)"];

export default function InvestorPortfolio() {
  return (
    <DashboardLayout>
      <PageHeader title="Portfolio" description="Investment portfolio overview and allocation." breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Portfolio" }]} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Invested", value: formatCurrency(portfolio.totalInvested) },
          { label: "Current Value", value: formatCurrency(portfolio.currentValue) },
          { label: "Total Return", value: formatCurrency(portfolio.totalReturn) },
          { label: "ROI", value: `+${portfolio.returnPct}%` },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl font-bold text-gold mt-1">{s.value}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-display font-semibold mb-4">Portfolio Allocation</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={allocation} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {allocation.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-display font-semibold mb-4">Sector Breakdown</h3>
          <div className="space-y-3">
            {allocation.map((a, i) => (
              <div key={a.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="text-sm text-foreground">{a.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(a.amount)}</p>
                  <p className="text-xs text-muted-foreground">{a.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
