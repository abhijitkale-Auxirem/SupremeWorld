import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";

const INVESTORS = [
  { name: "James Thornton", firm: "Apex Capital", focus: "FinTech, SaaS", ticket: "$250K–$2M", country: "UK" },
  { name: "Amara Nwosu", firm: "Lagos Ventures", focus: "AgriTech, HealthTech", ticket: "$50K–$500K", country: "Nigeria" },
  { name: "Mei Lin Zhang", firm: "SingaTech Fund", focus: "Deep Tech, AI", ticket: "$500K–$5M", country: "Singapore" },
  { name: "Carlos Rivera", firm: "LatAm Angels", focus: "Commerce, Logistics", ticket: "$100K–$1M", country: "Mexico" },
];

export default function EntrepreneurInvestors() {
  return (
    <DashboardLayout>
      <PageHeader title="Investors" description="Connect with investors matching your profile." breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Investors" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INVESTORS.map((inv) => (
          <div key={inv.name} className="p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{inv.name}</h3>
                <p className="text-muted-foreground text-sm">{inv.firm} · {inv.country}</p>
              </div>
              <span className="text-gold font-semibold text-sm">{inv.ticket}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">Focus: {inv.focus}</p>
            <button className="w-full text-sm border border-border rounded-lg py-2 hover:border-gold/40 transition-colors text-foreground/80">Request Introduction</button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
