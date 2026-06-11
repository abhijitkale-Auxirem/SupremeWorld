import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const data = [{ month: "Jan", connections: 680 }, { month: "Feb", connections: 720 }, { month: "Mar", connections: 740 }, { month: "Apr", connections: 790 }, { month: "May", connections: 810 }, { month: "Jun", connections: 842 }];
export default function ProfessionalAnalytics() {
  return (
    <DashboardLayout>
      <PageHeader title="Analytics" breadcrumbs={[{ label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, { label: "Analytics" }]} />
      <div className="p-6 rounded-xl border border-border bg-card">
        <h3 className="font-display font-semibold mb-4">Network Growth</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
            <Bar dataKey="connections" fill="hsl(var(--gold))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
}
