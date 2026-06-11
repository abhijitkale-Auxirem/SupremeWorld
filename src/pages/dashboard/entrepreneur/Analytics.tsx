import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Jan", connections: 12, opportunities: 3 },
  { month: "Feb", connections: 19, opportunities: 5 },
  { month: "Mar", connections: 8, opportunities: 2 },
  { month: "Apr", connections: 24, opportunities: 7 },
  { month: "May", connections: 31, opportunities: 9 },
  { month: "Jun", connections: 47, opportunities: 12 },
];

export default function EntrepreneurAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Analytics" description="Track your growth and performance." breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Analytics" }]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Network Connections</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="connections" stroke="hsl(var(--gold))" strokeWidth={2} dot={{ fill: "hsl(var(--gold))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Opportunities</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
              <Bar dataKey="opportunities" fill="hsl(var(--deep-blue))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
