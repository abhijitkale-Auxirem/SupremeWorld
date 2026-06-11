import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
const EVENTS = [
  { title: "Global Entrepreneur Summit", type: "Summit", date: "Aug 15, 2026", location: "Dubai", registered: 1200, status: "upcoming" },
  { title: "Investor Forum", type: "Conference", date: "Sep 8, 2026", location: "London", registered: 800, status: "upcoming" },
  { title: "Africa Tech Meetup", type: "Meetup", date: "Jul 22, 2026", location: "Lagos", registered: 400, status: "upcoming" },
];
const cols: TableColumn<Record<string, unknown>>[] = [
  { key: "title", label: "Event", sortable: true },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "location", label: "Location" },
  { key: "registered", label: "Registrations", sortable: true },
  { key: "status", label: "Status", render: (v) => <span className="text-xs px-2 py-0.5 bg-deep-blue/10 text-deep-blue rounded-full capitalize">{String(v)}</span> },
];
export default function AdminEvents() {
  return (
    <DashboardLayout>
      <PageHeader title="Events" description="Manage platform events and registrations." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Events" }]} />
      <DataTable columns={cols} data={EVENTS as Record<string, unknown>[]} />
    </DashboardLayout>
  );
}
