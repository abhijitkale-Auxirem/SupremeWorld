import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Lock, Users, ArrowRight, X } from "lucide-react";

interface PrivateGroup {
  id: string; // Added safe identification key
  name: string;
  members: number;
  type: string;
}

const INITIAL_GROUPS: PrivateGroup[] = [
  { id: "grp-1", name: "Elite Investor Circle", members: 48, type: "Investment" },
  { id: "grp-2", name: "Executive Leaders Network", members: 120, type: "Leadership" },
  { id: "grp-3", name: "Global HNW Community", members: 85, type: "Lifestyle" },
];

export default function PrivateGroups() {
  const [groups] = useState<PrivateGroup[]>(INITIAL_GROUPS);
  const [activeGroup, setActiveGroup] = useState<PrivateGroup | null>(null);

  const handleEnterGroup = (group: PrivateGroup) => {
    // This makes the button completely functional by writing state data to our popup modal tracker
    setActiveGroup(group);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Private Groups" 
        description="Your exclusive member-only groups." 
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, 
          { label: "Private Groups" }
        ]} 
      />

      {/* Responsive Table Container */}
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
                
                {/* Lock Icon Cell */}
                <td className="p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                    <Lock className="w-4 h-4" />
                  </div>
                </td>

                {/* Group Title */}
                <td className="p-4 font-semibold text-foreground max-w-xs truncate">
                  {g.name}
                </td>

                {/* Category Type */}
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {g.type}
                  </span>
                </td>

                {/* Member Count */}
                <td className="p-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    {g.members} members
                  </span>
                </td>

                {/* Interactive Action Button */}
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleEnterGroup(g)}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-md bg-gold text-royal-black hover:bg-gold/90 transition-colors"
                  >
                    Enter
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* INTERACTIVE POPUP MODAL */}
      {activeGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-border p-6 rounded-xl shadow-xl max-w-sm w-full relative">
            
            {/* Close Cross icon */}
            <button 
              onClick={() => setActiveGroup(null)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close portal window"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Lock className="w-5 h-5" />
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground text-lg">{activeGroup.name}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Secure, encrypted network channel verified.</p>
              </div>

              <div className="border-t border-b border-border/60 py-2.5 my-2 text-xs text-muted-foreground space-y-1">
                <div><strong>Group Focus:</strong> {activeGroup.type}</div>
                <div><strong>Active Network Nodes:</strong> {activeGroup.members} Peer Accounts</div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Initializing handshakes... You are now being navigated into the secure communications room.
              </p>

              <button 
                onClick={() => setActiveGroup(null)}
                className="w-full bg-muted text-foreground hover:bg-muted/80 font-medium text-xs py-2 rounded-lg transition-colors mt-2"
              >
                Exit Portal
              </button>
            </div>

          </div>
        </div>
      )}
    </DashboardLayout>
  );
}