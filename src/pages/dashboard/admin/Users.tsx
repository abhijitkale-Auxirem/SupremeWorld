import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import { ROUTES } from "@/constants/routes";
import { TableColumn } from "@/types/common.types";
import { Button } from "@/components/ui/button";
import { Download, Mail, Globe, Shield, Calendar } from "lucide-react";
import { exportToCSV } from "@/utils/csvExporter";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  country: string;
  status: string;
  membershipTier: string;
  joinedAt: string;
  [key: string]: string | number | boolean | undefined; 
}

const INIT_USERS: User[] = [
  { id: "u1", name: "Kwame Asante", email: "kwame@example.com", role: "entrepreneur", country: "Ghana", status: "active", membershipTier: "standard", joinedAt: "2026-04-10" },
  { id: "u2", name: "Lisa Wang", email: "lisa@example.com", role: "investor", country: "China", status: "active", membershipTier: "premium", joinedAt: "2026-05-22" },
  { id: "u3", name: "Marcus Bell", email: "marcus@example.com", role: "professional", country: "USA", status: "active", membershipTier: "free", joinedAt: "2026-06-10" },
  { id: "u4", name: "Fatima Al-Hassan", email: "fatima@example.com", role: "business", country: "Saudi Arabia", status: "pending", membershipTier: "standard", joinedAt: "2026-06-10" },
  { id: "u5", name: "James Thornton", email: "james@apex.com", role: "investor", country: "UK", status: "active", membershipTier: "elite", joinedAt: "2025-11-08" },
];

const ROLE_CATS = [
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "investor", label: "Investor" },
  { value: "business", label: "Business" },
  { value: "professional", label: "Professional" },
  { value: "creator", label: "Creator" },
];

export default function AdminUsers() {
  const [users, setUsers] = useLocalStorage<User[]>("admin_users", INIT_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  // FIX 1: Store just the string ID of the active profile instead of the row object
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  const filtered = users.filter((u) =>
    (u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (!roleFilter || u.role === roleFilter)
  );

  // FIX 2: Look up the user directly from the state array safely
  const selectedUser = users.find((u) => u.id === activeProfileId) || null;

  const cols: TableColumn<Record<string, unknown>>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (v) => <span className="capitalize text-xs px-2 py-0.5 bg-muted rounded">{String(v)}</span> },
    { key: "country", label: "Country" },
    { key: "membershipTier", label: "Tier", render: (v) => <span className={`capitalize text-xs px-2 py-0.5 rounded-full ${v === "elite" ? "bg-gold/10 text-gold" : v === "premium" ? "bg-deep-blue/10 text-deep-blue" : "bg-muted text-muted-foreground"}`}>{String(v)}</span> },
    { key: "status", label: "Status", render: (v) => <span className={`text-xs px-2 py-0.5 rounded-full ${v === "active" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{String(v)}</span> },
    { key: "joinedAt", label: "Joined" },
    { key: "id", label: "Actions", render: (v, row) => {
      // Safely access the user ID regardless of row formatting variations
      const userId = String(v || row?.id || "");
      
      return (
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 text-xs relative z-30" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (userId) {
                setActiveProfileId(userId);
              } else {
                toast.error("Could not trace user ID from table row.");
              }
            }}
          >
            View Profile
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-7 text-xs text-destructive relative z-30" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (userId) setDeleteId(userId);
            }}
          >
            Remove User
          </Button>
        </div>
      );
    }},
  ];

  return (
    <DashboardLayout>
      <PageHeader 
        title="User Management" 
        description="Manage all platform members." 
        breadcrumbs={[{ label: "Admin", href: ROUTES.ADMIN_DASHBOARD }, { label: "Users" }]}
        actions={
          <Button variant="outline" onClick={() => { exportToCSV(users as unknown as Record<string, unknown>[], "users"); toast.success("Users exported."); }}>
            <Download className="w-4 h-4 mr-1.5" />Export CSV
          </Button>
        } 
      />
      
      <div className="space-y-4">
        <SearchBar onSearch={setSearch} placeholder="Search users..." className="max-w-sm" />
        <CategorySection categories={ROLE_CATS} selected={roleFilter} onSelect={setRoleFilter} label="Filter by Role" />
        <DataTable columns={cols} data={filtered as unknown as Record<string, unknown>[]} searchQuery={search} />
      </div>

      <ConfirmationModal 
        open={!!deleteId} 
        onOpenChange={(o) => !o && setDeleteId(null)} 
        title="Remove User" 
        description="This user will be permanently removed from the platform." 
        confirmLabel="Remove User" 
        onConfirm={() => { 
          setUsers((p) => p.filter((u) => u.id !== deleteId)); 
          setDeleteId(null); 
          toast.success("User removed."); 
        }} 
      />

      {/* User Profile Dialog */}
      <Dialog open={!!activeProfileId} onOpenChange={(open) => !open && setActiveProfileId(null)}>
        <DialogContent className="max-w-[425px] sm:rounded-xl">
          <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b">
            <DialogTitle className="text-xl font-bold">User Profile Summary</DialogTitle>
          </DialogHeader>

          {selectedUser ? (
            <div className="py-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-full text-xl font-semibold tracking-wider text-muted-foreground uppercase">
                  {selectedUser.name ? selectedUser.name.split(" ").map(n => n[0]).join("") : "U"}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{selectedUser.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm bg-muted/30 p-4 rounded-lg border">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-foreground/70" />
                  <span className="font-medium text-foreground">Email:</span> {selectedUser.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="w-4 h-4 text-foreground/70" />
                  <span className="font-medium text-foreground">Country:</span> {selectedUser.country}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4 text-foreground/70" />
                  <span className="font-medium text-foreground">Tier:</span>
                  <span className="capitalize font-semibold">{selectedUser.membershipTier}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-foreground/70" />
                  <span className="font-medium text-foreground">Joined:</span> {selectedUser.joinedAt}
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Loading profile...
            </div>
          )}

          <div className="flex justify-end pt-2 border-t">
            <Button variant="secondary" onClick={() => setActiveProfileId(null)}>
              Close View
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}