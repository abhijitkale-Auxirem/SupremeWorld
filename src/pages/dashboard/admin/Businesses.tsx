import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
const BIZ = [
  { name: "TechBridge Solutions", industry: "Technology", stage: "Growth", status: "active", country: "Nigeria", verified: true },
  { name: "GreenFarm AI", industry: "AgriTech", stage: "Startup", status: "active", country: "Kenya", verified: false },
  { name: "FinFlow Ltd", industry: "FinTech", stage: "Established", status: "active", country: "UK", verified: true },
  { name: "LogiChain Global", industry: "Logistics", stage: "Growth", status: "pending", country: "Singapore", verified: false },
];
const cols: TableColumn<Record<string, unknown>>[] = [
  { key: "name", label: "Business", sortable: true },
  { key: "industry", label: "Industry" },
  { key: "stage", label: "Stage" },
  { key: "country", label: "Country" },
  { key: "verified", label: "Verified", render: (v) => <span className={`text-xs px-2 py-0.5 rounded-full ${v ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>{v ? "Verified" : "Pending"}</span> },
  { key: "status", label: "Status", render: (v) => <span className={`text-xs px-2 py-0.5 rounded-full ${v === "active" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{String(v)}</span> },
  { key: "name", label: "Actions", render: () => <button className="text-xs border border-border rounded px-2 py-1 hover:border-gold/40">Review</button> },
];
export default function AdminBusinesses() {
  return (
    <DashboardLayout>
      <PageHeader title="Businesses" description="Manage platform business listings." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Businesses" }]} />
      <DataTable columns={cols} data={BIZ as Record<string, unknown>[]} />
    </DashboardLayout>
  );
}
