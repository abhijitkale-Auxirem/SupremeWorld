import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToPDF } from "@/utils/pdfExporter";
const REPORTS = [
  { title: "Platform Growth Report — Q2 2026", period: "Apr–Jun 2026", status: "Published" },
  { title: "Revenue & Membership Analysis — May 2026", period: "May 2026", status: "Published" },
  { title: "Compliance Summary — H1 2026", period: "Jan–Jun 2026", status: "Draft" },
];
export default function AdminReports() {
  return (
    <DashboardLayout>
      <PageHeader title="Reports" description="Platform analytics and reporting." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Reports" }]} />
      <div className="space-y-3">
        {REPORTS.map((r) => (
          <div key={r.title} className="flex items-center justify-between p-5 rounded-xl border border-border bg-card gap-4">
            <div>
              <h3 className="font-semibold text-foreground">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{r.period}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${r.status === "Published" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{r.status}</span>
              <Button size="sm" variant="outline" className="text-xs" onClick={() => exportToPDF(r.title, [[r.period, r.status]], ["Period", "Status"], r.title.toLowerCase().replace(/\s+/g, "-"))}>
                <Download className="w-3.5 h-3.5 mr-1" />Export PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
