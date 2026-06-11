import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
const DEALS = [
  { startup: "FinTechAfrica", stage: "Series A", ask: "$2.5M", valuation: "$18M", status: "Open", country: "Kenya" },
  { startup: "AgriSmart AI", stage: "Seed", ask: "$800K", valuation: "$6M", status: "Funded", country: "Nigeria" },
  { startup: "LogiChain", stage: "Series A", ask: "$3M", valuation: "$22M", status: "Open", country: "Singapore" },
];
const cols: TableColumn<Record<string, unknown>>[] = [
  { key: "startup", label: "Startup", sortable: true },
  { key: "stage", label: "Round" },
  { key: "ask", label: "Ask" },
  { key: "valuation", label: "Valuation" },
  { key: "country", label: "Country" },
  { key: "status", label: "Status", render: (v) => <span className={`text-xs px-2 py-0.5 rounded-full ${v === "Funded" ? "bg-success/10 text-success" : "bg-deep-blue/10 text-deep-blue"}`}>{String(v)}</span> },
];
export default function AdminInvestments() {
  return (
    <DashboardLayout>
      <PageHeader title="Investments" description="Investment deals on the platform." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Investments" }]} />
      <DataTable columns={cols} data={DEALS as Record<string, unknown>[]} />
    </DashboardLayout>
  );
}
