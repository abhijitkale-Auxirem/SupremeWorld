import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
const PRODUCTS = [
  { title: "Executive Pitch Deck Template", category: "Digital", price: "$149", sales: 48, status: "active" },
  { title: "Brand Strategy Consultation", category: "Service", price: "$499", sales: 87, status: "active" },
  { title: "AI Marketing Suite", category: "Subscription", price: "$99/mo", sales: 342, status: "active" },
  { title: "Business Valuation Report", category: "Digital", price: "$299", sales: 156, status: "active" },
];
const cols: TableColumn<Record<string, unknown>>[] = [
  { key: "title", label: "Product", sortable: true },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "sales", label: "Sales", sortable: true },
  { key: "status", label: "Status", render: (v) => <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">{String(v)}</span> },
];
export default function AdminMarketplace() {
  return (
    <DashboardLayout>
      <PageHeader title="Marketplace" description="Manage marketplace products and services." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Marketplace" }]} />
      <DataTable columns={cols} data={PRODUCTS as Record<string, unknown>[]} />
    </DashboardLayout>
  );
}
