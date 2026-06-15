import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useAuthContext } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";
import { toast } from "sonner";
export default function Settings() {
  const { user } = useAuthContext();
  const { theme, toggleTheme } = useThemeContext();
  return (
    <DashboardLayout>
      <PageHeader title="Settings" description="Manage your account preferences." breadcrumbs={[{ label: "Settings" }]} />
      <div className="max-w-2xl space-y-6">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved."); }} className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">Account Settings</h3>
          <div><Label>Display Name</Label><Input className="mt-1" defaultValue={user?.name} /></div>
          <div><Label>Email Address</Label><Input className="mt-1" defaultValue={user?.email} type="email" /></div>
          <div><Label>Username</Label><Input className="mt-1" defaultValue={user?.username} /></div>
          <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90">Save Changes</Button>
        </form>
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">Preferences</h3>
          {/* <div className="flex items-center justify-between">
            <div><Label>Dark Mode</Label><p className="text-xs text-muted-foreground mt-0.5">Toggle light/dark theme</p></div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div> */}
          <div className="flex items-center justify-between">
            <div><Label>Email Notifications</Label><p className="text-xs text-muted-foreground mt-0.5">Receive email alerts</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>Profile Visibility</Label><p className="text-xs text-muted-foreground mt-0.5">Make profile public</p></div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
