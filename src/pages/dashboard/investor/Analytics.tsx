import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 850000 }, { month: "Feb", value: 920000 }, { month: "Mar", value: 880000 },
  { month: "Apr", value: 1050000 }, { month: "May", value: 1180000 }, { month: "Jun", value: 1338500 },
];

export default function InvestorAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Analytics" description="Portfolio performance over time." breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Analytics" }]} />
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-display font-semibold mb-4">Portfolio Value Over Time</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gold-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(43,74%,53%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(43,74%,53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "Portfolio Value"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            <Area type="monotone" dataKey="value" stroke="hsl(43,74%,53%)" fill="url(#gold-grad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
