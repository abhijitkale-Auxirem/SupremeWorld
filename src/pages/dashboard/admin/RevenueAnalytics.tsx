import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const data = [
  { month: "Jan", revenue: 1400000 }, { month: "Feb", revenue: 1650000 }, { month: "Mar", revenue: 1580000 },
  { month: "Apr", revenue: 1820000 }, { month: "May", revenue: 1960000 }, { month: "Jun", revenue: 2100000 },
];
export default function RevenueAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Revenue Analytics" description="Platform revenue performance." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Revenue" }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "MRR", value: "$2.1M", change: "+18%" },
          { label: "ARR (Projected)", value: "$25.2M", change: "+22%" },
          { label: "Avg Revenue per User", value: "$13.70", change: "+8%" },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="font-display text-2xl font-bold text-gold mt-1">{s.value}</p>
            <p className="text-success text-sm mt-1">{s.change} vs last period</p>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-display font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            <Bar dataKey="revenue" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
