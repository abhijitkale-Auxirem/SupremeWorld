import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { exportToCSV } from "@/utils/csvExporter";
import { toast } from "sonner";

const INVESTMENTS = [
  { id: "i1", startupName: "FinTechAfrica", amount: 250000, round: "Series A", equity: "14%", currentValue: 330000, status: "active", investedAt: "2025-03-10" },
  { id: "i2", startupName: "AgriSmart AI", amount: 75000, round: "Seed", equity: "13%", currentValue: 88500, status: "active", investedAt: "2025-07-22" },
  { id: "i3", startupName: "LogiChain", amount: 500000, round: "Series A", equity: "11%", currentValue: 780000, status: "active", investedAt: "2024-11-05" },
  { id: "i4", startupName: "EduPlatform", amount: 150000, round: "Seed", equity: "18%", currentValue: 140000, status: "active", investedAt: "2025-01-18" },
];

const cols: TableColumn<Record<string, unknown>>[] = [
  { key: "startupName", label: "Company", sortable: true },
  { key: "round", label: "Round" },
  { key: "amount", label: "Invested", sortable: true, render: (v) => `$${Number(v).toLocaleString()}` },
  { key: "equity", label: "Equity" },
  { key: "currentValue", label: "Current Value", sortable: true, render: (v) => `$${Number(v).toLocaleString()}` },
  { key: "status", label: "Status", render: (v) => <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full capitalize">{String(v)}</span> },
  { key: "investedAt", label: "Date" },
];

export default function InvestorInvestments() {
  const handleExport = () => {
    exportToCSV(INVESTMENTS, "investments", [
      { key: "startupName", label: "Company" },
      { key: "round", label: "Round" },
      { key: "amount", label: "Invested" },
      { key: "equity", label: "Equity" },
      { key: "currentValue", label: "Current Value" },
    ]);
    toast.success("Investments exported as CSV.");
  };
  return (
    <DashboardLayout>
      <PageHeader title="My Investments" description="Track all your investment positions." breadcrumbs={[{ label: "Dashboard", href: ROUTES.INVESTOR_DASHBOARD }, { label: "Investments" }]}
        actions={<Button variant="outline" onClick={handleExport}><Download className="w-4 h-4 mr-1.5" />Export CSV</Button>} />
      <DataTable columns={cols} data={INVESTMENTS as Record<string, unknown>[]} />
    </DashboardLayout>
  );
}
