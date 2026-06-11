import DashboardLayout from "./DashboardLayout";

// Admin uses the same layout with admin-specific sidebar config
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
