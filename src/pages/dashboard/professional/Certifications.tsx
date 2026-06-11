import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Award } from "lucide-react";
const CERTS = [
  { title: "Business Leadership Certification", issuer: "SupremeWorld Academy", date: "Apr 2026", status: "Earned" },
  { title: "Advanced Financial Modeling", issuer: "SupremeWorld Academy", date: "Jan 2026", status: "Earned" },
  { title: "AI Business Strategy", issuer: "SupremeWorld Academy", date: "In Progress", status: "In Progress" },
];
export default function Certifications() {
  return (
    <DashboardLayout>
      <PageHeader title="Certifications" description="Your earned and in-progress certifications." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, { label: "Certifications" }]} />
      <div className="space-y-3">
        {CERTS.map((c) => (
          <div key={c.title} className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${c.status === "Earned" ? "bg-gold/10" : "bg-muted"}`}>
              <Award className={`w-6 h-6 ${c.status === "Earned" ? "text-gold" : "text-muted-foreground"}`} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{c.title}</p>
              <p className="text-sm text-muted-foreground">{c.issuer} · {c.date}</p>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${c.status === "Earned" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{c.status}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
