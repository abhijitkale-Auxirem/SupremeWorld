import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, Globe, Layers, ShieldCheck, ShieldAlert, Tag } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Business {
  name: string;
  industry: string;
  stage: string;
  status: string;
  country: string;
  verified: boolean;
  [key: string]: string | boolean | undefined;
}

const INIT_BIZ: Business[] = [
  { name: "TechBridge Solutions", industry: "Technology", stage: "Growth", status: "active", country: "Nigeria", verified: true },
  { name: "GreenFarm AI", industry: "AgriTech", stage: "Startup", status: "active", country: "Kenya", verified: false },
  { name: "FinFlow Ltd", industry: "FinTech", stage: "Established", status: "active", country: "UK", verified: true },
  { name: "LogiChain Global", industry: "Logistics", stage: "Growth", status: "pending", country: "Singapore", verified: false },
];

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useLocalStorage<Business[]>("admin_businesses", INIT_BIZ);
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const selectedBiz = businesses.find((b) => b.name === selectedName) ?? null;

  const handleVerify = (name: string) => {
    setBusinesses((prev) =>
      prev.map((b) => b.name === name ? { ...b, verified: true, status: "active" } : b)
    );
    toast.success(`${name} has been verified.`);
    setSelectedName(null);
  };

  const handleSuspend = (name: string) => {
    setBusinesses((prev) =>
      prev.map((b) => b.name === name ? { ...b, status: "suspended" } : b)
    );
    toast.warning(`${name} has been suspended.`);
    setSelectedName(null);
  };

  const cols: TableColumn<Record<string, unknown>>[] = [
    { key: "name", label: "Business", sortable: true },
    { key: "industry", label: "Industry" },
    { key: "stage", label: "Stage" },
    { key: "country", label: "Country" },
    {
      key: "verified", label: "Verified",
      render: (v) => (
        <span className={`text-xs px-2 py-0.5 rounded-full ${v ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
          {v ? "Verified" : "Pending"}
        </span>
      ),
    },
    {
      key: "status", label: "Status",
      render: (v) => (
        <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${v === "active" ? "bg-success/10 text-success" : v === "suspended" ? "bg-destructive/10 text-destructive" : "bg-gold/10 text-gold"}`}>
          {String(v)}
        </span>
      ),
    },
    {
      key: "name", label: "Actions",
      render: (v) => {
        const bizName = String(v ?? "");
        return (
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (bizName) setSelectedName(bizName);
            }}
          >
            Review
          </Button>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="Businesses"
        description="Manage platform business listings."
        breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Businesses" }]}
      />
      <DataTable columns={cols} data={businesses as unknown as Record<string, unknown>[]} />

      {/* Business Review Dialog */}
      <Dialog open={!!selectedName} onOpenChange={(open) => !open && setSelectedName(null)}>
        <DialogContent className="max-w-[440px] sm:rounded-xl">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-bold">Business Review</DialogTitle>
          </DialogHeader>

          {selectedBiz ? (
            <div className="py-4 space-y-5">
              {/* Business name + industry */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedBiz.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedBiz.industry} · {selectedBiz.stage}</p>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 gap-3 text-sm bg-muted/30 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4 text-foreground/60" />
                  <span className="font-medium text-foreground">Country:</span> {selectedBiz.country}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Layers className="w-4 h-4 text-foreground/60" />
                  <span className="font-medium text-foreground">Stage:</span> {selectedBiz.stage}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="w-4 h-4 text-foreground/60" />
                  <span className="font-medium text-foreground">Status:</span>
                  <span className={`capitalize font-semibold ${selectedBiz.status === "active" ? "text-success" : selectedBiz.status === "suspended" ? "text-destructive" : "text-gold"}`}>
                    {selectedBiz.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ShieldCheck className="w-4 h-4 text-foreground/60" />
                  <span className="font-medium text-foreground">Verified:</span>
                  <span className={`font-semibold ${selectedBiz.verified ? "text-success" : "text-gold"}`}>
                    {selectedBiz.verified ? "Yes" : "Not yet"}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {!selectedBiz.verified && (
                  <Button
                    size="sm"
                    className="bg-success hover:bg-success/90 text-white gap-1.5"
                    onClick={() => handleVerify(selectedBiz.name)}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verify Business
                  </Button>
                )}
                {selectedBiz.status !== "suspended" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="gap-1.5"
                    onClick={() => handleSuspend(selectedBiz.name)}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Suspend
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  className="ml-auto"
                  onClick={() => setSelectedName(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Loading business details...
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
