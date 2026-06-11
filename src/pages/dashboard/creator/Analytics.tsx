import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const data = [{ month: "Jan", revenue: 5200 }, { month: "Feb", revenue: 6800 }, { month: "Mar", revenue: 7100 }, { month: "Apr", revenue: 6500 }, { month: "May", revenue: 7900 }, { month: "Jun", revenue: 8400 }];
export default function CreatorAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Analytics" breadcrumbs={[{ label: "Dashboard", href: ROUTES.CREATOR_DASHBOARD }, { label: "Analytics" }]} />
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-display font-semibold mb-4">Monthly Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tickFormatter={(v) => `$${v}`} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip formatter={(v) => [`$${v}`, "Revenue"]} contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(43,74%,53%)" strokeWidth={2} dot={{ fill: "hsl(43,74%,53%)" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
