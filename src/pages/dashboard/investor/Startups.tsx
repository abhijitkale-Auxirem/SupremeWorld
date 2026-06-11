import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
export default function InvestorStartups() {
  const startups = [
    { name: "FinTechAfrica", industry: "FinTech", stage: "Series A", country: "Kenya", team: "12", founded: "2021" },
    { name: "AgriSmart AI", industry: "AgriTech", stage: "Seed", country: "Nigeria", team: "6", founded: "2023" },
    { name: "GreenBuild Co", industry: "CleanTech", stage: "Series B", country: "UAE", team: "28", founded: "2020" },
    { name: "EduPlatform Global", industry: "EdTech", stage: "Seed", country: "USA", team: "9", founded: "2022" },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="Startups" description="Browse vetted startups seeking investment." breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Startups" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {startups.map((s) => (
          <div key={s.name} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold text-foreground">{s.name}</h3>
              <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded">{s.stage}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{s.industry} · {s.country} · Founded {s.founded}</p>
            <p className="text-sm text-muted-foreground mb-4">Team size: {s.team}</p>
            <button className="w-full text-sm border border-border rounded-lg py-2 hover:border-gold/40 transition-colors">View Startup Profile</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
