import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
export default function Security() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  return (
    <DashboardLayout>
      <PageHeader title="Security" description="Manage your account security settings." breadcrumbs={[{ label: "Security" }]} />
      <div className="max-w-2xl space-y-6">
        <form onSubmit={(e) => { e.preventDefault(); toast.success("Password updated successfully."); }} className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">Change Password</h3>
          <div>
            <Label>Current Password</Label>
            <div className="relative mt-1">
              <Input type={showCurrent ? "text" : "password"} placeholder="••••••••" className="pr-10" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowCurrent(!showCurrent)} aria-label="Toggle current password">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label>New Password</Label>
            <div className="relative mt-1">
              <Input type={showNew ? "text" : "password"} placeholder="Min 8 chars, uppercase, number, symbol" className="pr-10" />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowNew(!showNew)} aria-label="Toggle new password">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90">Update Password</Button>
        </form>
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">Active Sessions</h3>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div>
              <p className="text-sm font-medium text-foreground">Current Session</p>
              <p className="text-xs text-muted-foreground">Chrome · Windows · Active now</p>
            </div>
            <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">Active</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
