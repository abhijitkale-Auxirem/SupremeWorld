import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
const COMMS = [
  { name: "Global Founders Network", category: "Entrepreneur", members: 8400, isPrivate: false, status: "active" },
  { name: "Angel Investor Circle", category: "Investor", members: 3200, isPrivate: true, status: "active" },
  { name: "Africa Tech Leaders", category: "Tech", members: 5600, isPrivate: false, status: "active" },
  { name: "Women in Finance", category: "Finance", members: 4100, isPrivate: false, status: "active" },
];
const cols: TableColumn<Record<string, unknown>>[] = [
  { key: "name", label: "Community", sortable: true },
  { key: "category", label: "Category" },
  { key: "members", label: "Members", sortable: true },
  { key: "isPrivate", label: "Type", render: (v) => <span className="text-xs">{v ? "Private" : "Public"}</span> },
  { key: "status", label: "Status", render: (v) => <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">{String(v)}</span> },
];
export default function AdminCommunities() {
  return (
    <DashboardLayout>
      <PageHeader title="Communities" description="Manage platform communities." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Communities" }]} />
      <DataTable columns={cols} data={COMMS as Record<string, unknown>[]} />
    </DashboardLayout>
  );
}
