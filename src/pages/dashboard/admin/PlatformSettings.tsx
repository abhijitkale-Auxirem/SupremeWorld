import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
export default function PlatformSettings() {
  return (
    <DashboardLayout>
      <PageHeader title="Platform Settings" description="Global platform configuration." breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Settings" }]} />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Platform settings saved."); }} className="max-w-2xl space-y-6">
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">General Settings</h3>
          <div><Label>Platform Name</Label><Input className="mt-1" defaultValue="SupremeWorld" /></div>
          <div><Label>Support Email</Label><Input className="mt-1" defaultValue="support@supremeworld.ai" /></div>
          <div><Label>Default Membership</Label><Input className="mt-1" defaultValue="free" /></div>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">Feature Flags</h3>
          {[
            { label: "AI Assistant", id: "ai", default: true },
            { label: "Concierge Services", id: "concierge", default: true },
            { label: "Investment Marketplace", id: "invest", default: true },
            { label: "Maintenance Mode", id: "maintenance", default: false },
          ].map((f) => (
            <div key={f.id} className="flex items-center justify-between">
              <Label htmlFor={f.id}>{f.label}</Label>
              <Switch id={f.id} defaultChecked={f.default} />
            </div>
          ))}
        </div>
        <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90">Save Platform Settings</Button>
      </form>
    </DashboardLayout>
  );
}
