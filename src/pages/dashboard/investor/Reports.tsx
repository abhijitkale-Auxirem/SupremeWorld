import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToPDF } from "@/utils/pdfExporter";

const REPORTS = [
  { id: "r1", title: "Q1 2026 Investment Report", period: "Jan–Mar 2026", total: "$350K invested", ret: "+18%", status: "Published" },
  { id: "r2", title: "Q2 2026 Investment Report", period: "Apr–Jun 2026", total: "$625K invested", ret: "+22%", status: "Draft" },
  { id: "r3", title: "Annual Review 2025", period: "Full Year 2025", total: "$975K invested", ret: "+37%", status: "Published" },
];

export default function InvestorReports() {
  const handleExportPDF = (report: typeof REPORTS[0]) => {
    exportToPDF(report.title, [[report.period, report.total, report.ret, report.status]], ["Period", "Amount", "Return", "Status"], report.title.replace(/\s+/g, "-").toLowerCase());
  };
  return (
    <DashboardLayout>
      <PageHeader title="Reports" description="Investment performance reports." breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Reports" }]} />
      <div className="space-y-4">
        {REPORTS.map((r) => (
          <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-border bg-card gap-4">
            <div>
              <h3 className="font-semibold text-foreground">{r.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{r.period} · {r.total} · Return: <span className="text-success">{r.ret}</span></p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`px-2 py-0.5 text-xs rounded-full ${r.status === "Published" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{r.status}</span>
              <Button size="sm" variant="outline" className="text-xs" onClick={() => handleExportPDF(r)}>
                <Download className="w-3.5 h-3.5 mr-1" />Export PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
