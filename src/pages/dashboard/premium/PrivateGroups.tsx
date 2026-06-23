import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Lock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface PrivateGroup {
  id: string;
  name: string;
  members: number;
  type: string;
  joined: boolean;
}

const INITIAL_GROUPS: PrivateGroup[] = [
  { id: "grp-1", name: "Elite Investor Circle", members: 48, type: "Investment", joined: true },
  { id: "grp-2", name: "Executive Leaders Network", members: 120, type: "Leadership", joined: true },
  { id: "grp-3", name: "Global HNW Community", members: 85, type: "Lifestyle", joined: false },
];

export default function PrivateGroups() {
  const [groups, setGroups] = useLocalStorage<PrivateGroup[]>("premium_private_groups", INITIAL_GROUPS);
  const [activeGroup, setActiveGroup] = useState<PrivateGroup | null>(null);

  const handleEnterGroup = (group: PrivateGroup) => {
    setActiveGroup(group);
  };

  const handleJoin = (group: PrivateGroup) => {
    setGroups((prev) => prev.map((g) => g.id === group.id ? { ...g, joined: true, members: g.members + 1 } : g));
    setActiveGroup(null);
    toast.success(`You joined "${group.name}"!`, {
      description: "Welcome to the group. Your access is now active.",
    });
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Private Groups"
        description="Your exclusive member-only groups."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "Private Groups" }]}
      />

      <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4 w-12 text-center">Access</th>
              <th className="p-4">Group Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Member Count</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {groups.map((g) => (
              <tr key={g.id} className="hover:bg-muted/30 transition-colors group">
                <td className="p-4 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${g.joined ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"}`}>
                    <Lock className="w-4 h-4" />
                  </div>
                </td>
                <td className="p-4 font-semibold text-foreground max-w-xs truncate">{g.name}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">{g.type}</span>
                </td>
                <td className="p-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-muted-foreground" />{g.members} members
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button
                    size="sm"
                    onClick={() => handleEnterGroup(g)}
                    className="bg-gold text-royal-black hover:bg-gold/90 h-8 text-xs font-semibold gap-1"
                  >
                    {g.joined ? "Enter" : "Request Access"}
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Group Detail Dialog */}
      <Dialog open={!!activeGroup} onOpenChange={(open) => !open && setActiveGroup(null)}>
        <DialogContent className="max-w-sm sm:rounded-xl">
          <DialogHeader className="border-b pb-3">
            <DialogTitle className="flex items-center gap-2 text-lg font-bold">
              <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              {activeGroup?.name}
            </DialogTitle>
          </DialogHeader>

          {activeGroup && (
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm bg-muted/30 p-4 rounded-lg border">
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-semibold text-foreground">{activeGroup.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Members</p>
                  <p className="font-semibold text-foreground">{activeGroup.members} peers</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Access Status</p>
                  <p className={`font-semibold ${activeGroup.joined ? "text-success" : "text-gold"}`}>
                    {activeGroup.joined ? "✓ Active Member" : "Not yet joined"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {activeGroup.joined
                  ? "You are an active member of this group. All communications and resources are available."
                  : "Request access to join this exclusive group. Your premium membership qualifies you."}
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
                <Button variant="ghost" size="sm" className="text-xs" onClick={() => setActiveGroup(null)}>Close</Button>
                {!activeGroup.joined ? (
                  <Button
                    size="sm"
                    className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold"
                    onClick={() => handleJoin(activeGroup)}
                  >
                    Join Group
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-gold text-royal-black hover:bg-gold/90 text-xs font-bold"
                    onClick={() => {
                      setActiveGroup(null);
                      toast.success(`Entering "${activeGroup.name}"`, { description: "Your secure session is now active." });
                    }}
                  >
                    Enter Group →
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}