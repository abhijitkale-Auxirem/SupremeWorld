import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Users, CheckCircle2, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Community {
  name: string;
  members: number;
  joined: boolean;
  category: string;
}

const INITIAL_COMMUNITIES: Community[] = [
  { name: "Global Founders Network", members: 8400, joined: true, category: "Founders" },
  { name: "Africa Tech Leaders", members: 5600, joined: true, category: "Leadership" },
  { name: "Series A Founders Club", members: 1800, joined: false, category: "Scaleup" },
  { name: "FinTech Disruptors", members: 6300, joined: false, category: "FinTech" },
  { name: "AgriTech Innovators", members: 2400, joined: false, category: "Agriculture" },
  { name: "AI Builder Coalition", members: 4200, joined: false, category: "AI" },
];

export default function EntrepreneurCommunities() {
  const [communities, setCommunities] = useState<Community[]>(() => {
    try {
      const stored = localStorage.getItem("entrepreneur_communities_state");
      return stored ? JSON.parse(stored) : INITIAL_COMMUNITIES;
    } catch {
      return INITIAL_COMMUNITIES;
    }
  });

  const handleToggleJoin = (name: string) => {
    const updated = communities.map((c) => {
      if (c.name === name) {
        const nextState = !c.joined;
        if (nextState) {
          toast.success(`Joined ${name}! Welcome to the group.`);
        } else {
          toast.info(`Left ${name}.`);
        }
        return { ...c, joined: nextState };
      }
      return c;
    });
    setCommunities(updated);
    localStorage.setItem("entrepreneur_communities_state", JSON.stringify(updated));
  };

  const handleViewCommunity = (name: string) => {
    toast.info(`Entering community workspace for ${name}...`);
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Communities" 
        description="Engage in discussion channels, resource hubs, and industry circles." 
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD }, { label: "Communities" }]} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
        {communities.map((c) => (
          <div key={c.name} className="p-5 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-gold/30 transition-all duration-300 hover:shadow-sm">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  {c.category}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-sm mt-3">{c.name}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1.5 mb-4">
                <Users className="w-3.5 h-3.5 text-muted-foreground" />
                {c.members.toLocaleString()} members
              </p>
            </div>
            
            <div className="flex gap-2">
              {c.joined ? (
                <>
                  <Button 
                    className="flex-1 text-xs h-8 bg-muted text-muted-foreground hover:bg-muted/80"
                    onClick={() => handleViewCommunity(c.name)}
                  >
                    View Group
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive border-border/80" 
                    onClick={() => handleToggleJoin(c.name)}
                    aria-label="Leave community"
                  >
                    ×
                  </Button>
                </>
              ) : (
                <Button 
                  className="w-full text-xs h-8 bg-gold text-royal-black hover:bg-gold/90 flex items-center justify-center gap-1"
                  onClick={() => handleToggleJoin(c.name)}
                >
                  <Plus className="w-3.5 h-3.5" /> Join Community
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
