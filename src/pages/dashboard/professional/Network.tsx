import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
const CONNECTIONS = [
  { name: "David Osei", role: "VC Partner", company: "Apex Capital", mutual: 12 },
  { name: "Priya Nair", role: "Startup Advisor", company: "StartupHub", mutual: 8 },
  { name: "Tom Eriksson", role: "CFO", company: "Nordic Finance", mutual: 5 },
  { name: "Aisha Kamara", role: "Business Strategist", company: "StrategyLab", mutual: 15 },
];
export default function ProfessionalNetwork() {
  return (
    <DashboardLayout>
      <PageHeader title="My Network" description="Manage your professional connections." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, { label: "My Network" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CONNECTIONS.map((c) => (
          <div key={c.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
            <div className="w-11 h-11 rounded-full bg-gold/10 flex items-center justify-center text-gold font-semibold">{c.name[0]}</div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{c.name}</p>
              <p className="text-sm text-muted-foreground">{c.role} · {c.company}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.mutual} mutual connections</p>
            </div>
            <button className="text-sm text-gold hover:text-gold/80 transition-colors whitespace-nowrap">View Profile</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
