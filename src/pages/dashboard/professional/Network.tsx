import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, MessageSquare, UserCheck, UserPlus } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/common/DataTable";
import SearchBar from "@/components/common/SearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ROUTES } from "@/constants/routes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cn } from "@/lib/utils";
import { TableColumn } from "@/types/common.types";

type ConnectionStatus = "connected" | "pending" | "suggested";

interface ProfessionalConnection extends Record<string, unknown> {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  industry: string;
  mutual: number;
  lastActive: string;
  status: ConnectionStatus;
}

const INITIAL_CONNECTIONS: ProfessionalConnection[] = [
  { id: "net-1", name: "David Osei", role: "VC Partner", company: "Apex Capital", location: "London, UK", industry: "Venture Capital", mutual: 12, lastActive: "2026-06-12", status: "connected" },
  { id: "net-2", name: "Priya Nair", role: "Startup Advisor", company: "StartupHub", location: "Bengaluru, India", industry: "Startup Advisory", mutual: 8, lastActive: "2026-06-11", status: "suggested" },
  { id: "net-3", name: "Tom Eriksson", role: "CFO", company: "Nordic Finance", location: "Stockholm, Sweden", industry: "Finance", mutual: 5, lastActive: "2026-06-09", status: "pending" },
  { id: "net-4", name: "Aisha Kamara", role: "Business Strategist", company: "StrategyLab", location: "Accra, Ghana", industry: "Strategy", mutual: 15, lastActive: "2026-06-10", status: "connected" },
  { id: "net-5", name: "Mateo Silva", role: "Partnerships Lead", company: "BridgeWorks", location: "Sao Paulo, Brazil", industry: "Partnerships", mutual: 6, lastActive: "2026-06-08", status: "suggested" },
];

const STATUS_FILTERS: { value: "all" | ConnectionStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "connected", label: "Connected" },
  { value: "pending", label: "Pending" },
  { value: "suggested", label: "Suggested" },
];

const statusStyles: Record<ConnectionStatus, string> = {
  connected: "border-success/30 bg-success/10 text-success",
  pending: "border-gold/30 bg-gold/10 text-gold",
  suggested: "border-deep-blue/30 bg-deep-blue/10 text-deep-blue",
};

export default function ProfessionalNetwork() {
  const navigate = useNavigate();
  const [connections, setConnections] = useLocalStorage<ProfessionalConnection[]>("professional_network", INITIAL_CONNECTIONS);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | ConnectionStatus>("all");
  const [sort, setSort] = useState<{ key: string; order: "asc" | "desc" }>({ key: "name", order: "asc" });
  const [selectedConnection, setSelectedConnection] = useState<ProfessionalConnection | null>(null);

  const filteredConnections = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...connections]
      .filter((connection) => {
        const matchesSearch =
          !query ||
          [connection.name, connection.role, connection.company, connection.location, connection.industry]
            .some((value) => value.toLowerCase().includes(query));
        const matchesStatus = status === "all" || connection.status === status;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const first = a[sort.key];
        const second = b[sort.key];
        const direction = sort.order === "asc" ? 1 : -1;

        if (typeof first === "number" && typeof second === "number") {
          return (first - second) * direction;
        }

        return String(first ?? "").localeCompare(String(second ?? "")) * direction;
      });
  }, [connections, search, sort, status]);

  const updateStatus = (id: string, nextStatus: ConnectionStatus) => {
    setConnections((current) =>
      current.map((connection) =>
        connection.id === id ? { ...connection, status: nextStatus } : connection
      )
    );
  };

  const handleConnect = (connection: ProfessionalConnection) => {
    updateStatus(connection.id, "pending");
    toast.success(`Connection request sent to ${connection.name}.`);
  };

  const handleMessage = (connection: ProfessionalConnection) => {
    // Navigate to Messages page and open/create a conversation with this contact
    navigate(`${ROUTES.DASHBOARD_MESSAGES}?contact=${encodeURIComponent(connection.name)}&role=${encodeURIComponent(connection.role)}`);
  };

  const columns: TableColumn<ProfessionalConnection>[] = [
    {
      key: "name",
      label: "Connection",
      sortable: true,
      render: (_value, row) => (
        <div className="flex items-center gap-3 min-w-52">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
            {row.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.role}</p>
          </div>
        </div>
      ),
    },
    { key: "company", label: "Company", sortable: true },
    { key: "industry", label: "Industry", sortable: true },
    { key: "location", label: "Location" },
    {
      key: "mutual",
      label: "Mutual",
      sortable: true,
      render: (value) => <span className="font-medium text-foreground">{String(value)} connections</span>,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => {
        const connectionStatus = value as ConnectionStatus;
        return (
          <Badge variant="outline" className={cn("capitalize", statusStyles[connectionStatus])}>
            {connectionStatus}
          </Badge>
        );
      },
    },
    {
      key: "id",
      label: "Actions",
      render: (_value, row) => (
        <div className="flex min-w-44 items-center gap-2">
          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setSelectedConnection(row)} aria-label={`View ${row.name}`}>
            <Eye className="h-4 w-4" />
          </Button>
          {row.status === "suggested" ? (
            <Button size="sm" className="h-8 bg-gold text-royal-black hover:bg-gold/90" onClick={() => handleConnect(row)}>
              <UserPlus className="mr-1.5 h-3.5 w-3.5" />
              Connect
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="h-8" onClick={() => handleMessage(row)} disabled={row.status === "pending"}>
              <MessageSquare className="mr-1.5 h-3.5 w-3.5" />
              {row.status === "pending" ? "Pending" : "Message"}
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="My Network"
        description="Manage professional connections, review suggested contacts, and open profile details."
        breadcrumbs={[{ label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, { label: "My Network" }]}
      />

      <div className="space-y-4">
        <div className="flex flex-col gap-3 border-b border-border pb-3 lg:flex-row lg:items-center lg:justify-between">
          <SearchBar onSearch={setSearch} placeholder="Search network..." className="w-full lg:max-w-sm" />
          <div className="flex flex-wrap gap-1">
            {STATUS_FILTERS.map((filter) => {
              const count = filter.value === "all"
                ? connections.length
                : connections.filter((connection) => connection.status === filter.value).length;

              return (
                <Button
                  key={filter.value}
                  type="button"
                  variant={status === filter.value ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 text-xs",
                    status === filter.value && "bg-royal-black text-gold hover:bg-royal-black/90"
                  )}
                  onClick={() => setStatus(filter.value)}
                >
                  {filter.label}
                  <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredConnections}
          onSort={(key, order) => setSort({ key, order })}
          searchQuery={search}
        />
      </div>

      <Dialog open={!!selectedConnection} onOpenChange={(open) => !open && setSelectedConnection(null)}>
        {selectedConnection && (
          <DialogContent className="bg-card text-foreground sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-sm font-semibold text-gold">
                  {selectedConnection.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </span>
                {selectedConnection.name}
              </DialogTitle>
              <DialogDescription>
                {selectedConnection.role} at {selectedConnection.company}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 rounded-lg border border-border bg-muted/30 p-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">Industry</p>
                <p className="font-medium text-foreground">{selectedConnection.industry}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{selectedConnection.location}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mutual Connections</p>
                <p className="font-medium text-foreground">{selectedConnection.mutual}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Last Active</p>
                <p className="font-medium text-foreground">{selectedConnection.lastActive}</p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedConnection(null)}>
                Close
              </Button>
              {selectedConnection.status === "suggested" ? (
                <Button
                  className="bg-gold text-royal-black hover:bg-gold/90"
                  onClick={() => {
                    handleConnect(selectedConnection);
                    setSelectedConnection((current) => current ? { ...current, status: "pending" } : current);
                  }}
                >
                  <UserPlus className="mr-1.5 h-4 w-4" />
                  Connect
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled={selectedConnection.status === "pending"}
                  onClick={() => handleMessage(selectedConnection)}
                >
                  <UserCheck className="mr-1.5 h-4 w-4" />
                  {selectedConnection.status === "pending" ? "Request Pending" : "Message"}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </DashboardLayout>
  );
}
