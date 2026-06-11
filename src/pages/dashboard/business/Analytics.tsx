import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const data = [{ month: "Jan", revenue: 18000 }, { month: "Feb", revenue: 22000 }, { month: "Mar", revenue: 19500 }, { month: "Apr", revenue: 26000 }, { month: "May", revenue: 31000 }, { month: "Jun", revenue: 24800 }];
export default function BusinessAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Analytics" breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Analytics" }]} />
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-display font-semibold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            <Bar dataKey="revenue" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
