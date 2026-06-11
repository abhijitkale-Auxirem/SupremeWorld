import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { AlertTriangle } from "lucide-react";
const ITEMS = [
  { id: "c1", type: "Identity Verification", user: "John Smith", priority: "High", status: "Pending" },
  { id: "c2", type: "Content Moderation", user: "Community Post #8821", priority: "Medium", status: "Under Review" },
  { id: "c3", type: "Payment Dispute", user: "Invoice #4892", priority: "High", status: "Escalated" },
  { id: "c4", type: "Data Request (GDPR)", user: "user@domain.com", priority: "Medium", status: "Pending" },
];
export default function Compliance() {
  return (
    <DashboardLayout>
      <PageHeader title="Compliance" description="Review compliance and governance items." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Compliance" }]} />
      <div className="space-y-3">
        {ITEMS.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
            <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${item.priority === "High" ? "text-destructive" : "text-gold"}`} />
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.type}</p>
              <p className="text-sm text-muted-foreground">{item.user}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.priority === "High" ? "bg-destructive/10 text-destructive" : "bg-gold/10 text-gold"}`}>{item.priority}</span>
              <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{item.status}</span>
              <button className="text-xs border border-border rounded px-2 py-1 hover:border-gold/40">Review</button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
