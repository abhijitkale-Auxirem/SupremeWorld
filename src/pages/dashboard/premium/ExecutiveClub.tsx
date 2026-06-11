import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Shield } from "lucide-react";
export default function ExecutiveClub() {
  return (
    <DashboardLayout>
      <PageHeader title="Executive Club" description="Exclusive benefits for Elite members." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "Executive Club" }]} />
      <div className="p-8 rounded-2xl border border-gold/30 bg-royal-black text-center mb-6">
        <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold text-white mb-2">Elite Executive Member</h2>
        <p className="text-white/60">You have access to all exclusive Executive Club benefits.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["Priority Relationship Manager", "Co-Investment Opportunities", "Private Group Access", "Custom Analytics Reports", "Global Club Access", "White-Glove Support"].map((b) => (
          <div key={b} className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card">
            <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0" />
            <span className="text-foreground text-sm">{b}</span>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
