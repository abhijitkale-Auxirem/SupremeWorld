import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Search,
  FileText,
  Calendar,
  User,
  ArrowUpRight,
  ShieldCheck,
  Building,
  DollarSign,
  AlertOctagon,
  TrendingDown,
} from "lucide-react";
import { toast } from "sonner";

interface AuditLog {
  date: string;
  action: string;
  actor: string;
  notes: string;
}

interface ComplianceItem {
  id: string;
  type: string;
  user: string;
  email: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "Under Review" | "Escalated" | "Resolved";
  submittedAt: string;
  description: string;
  evidenceType: string;
  evidenceValue: string;
  additionalDetails?: Record<string, string>;
  history: AuditLog[];
}

const INITIAL_COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    id: "c-101",
    type: "Identity Verification",
    user: "John Smith",
    email: "john.smith@domain.com",
    priority: "High",
    status: "Pending",
    submittedAt: "2026-06-11",
    description: "User uploaded passport for verification of their investor profile. Selfie matches passport picture. Verification of name and citizenship required to complete high-tier investing permission.",
    evidenceType: "Document Upload (Passport)",
    evidenceValue: "Passport_John_Smith_USA.jpg",
    additionalDetails: {
      "Document Number": "US-58291039",
      "Nationality": "United States",
      "Expiry Date": "2032-11-15",
      "Selfie Match Confidence": "94.2%",
    },
    history: [
      { date: "2026-06-11 09:12", action: "Case Created", actor: "System Auth", notes: "Automated KYC trigger on account creation." }
    ]
  },
  {
    id: "c-102",
    type: "Content Moderation",
    user: "Community Post #8821",
    email: "creator.alex@domain.com",
    priority: "Medium",
    status: "Under Review",
    submittedAt: "2026-06-10",
    description: "Community post flagged by multiple users for potential spam and promotion of unregistered cryptocurrency schemes in the public startup feeding channel.",
    evidenceType: "Post Content",
    evidenceValue: "Learn how I made 1000% returns in 3 days using this secret link! Sign up now to be part of the future! #crypto #free #investing",
    additionalDetails: {
      "Flag Count": "5 Flags",
      "Flag Reason": "Spam/Deceptive Advertising",
      "Poster Handle": "@alex_innovator",
      "Account Standing": "Good (0 previous flags)",
    },
    history: [
      { date: "2026-06-10 14:35", action: "Case Created", actor: "System Moderator", notes: "Automatically flagged after exceeding 3 user reports." },
      { date: "2026-06-10 16:00", action: "Status Changed to Under Review", actor: "Admin Team", notes: "Assigned for manual content review." }
    ]
  },
  {
    id: "c-103",
    type: "Payment Dispute",
    user: "Invoice #4892",
    email: "finance@apexcorp.com",
    priority: "High",
    status: "Escalated",
    submittedAt: "2026-06-08",
    description: "A billing dispute was raised by ApexCorp regarding an enterprise subscription payment. The user claims double charge for the monthly premium membership tier.",
    evidenceType: "Stripe Transaction ID",
    evidenceValue: "ch_3M1t9BLkdF042M9x0sZ9K2aP",
    additionalDetails: {
      "Disputed Amount": "$1,250.00 USD",
      "Billing Period": "June 2026",
      "Customer ID": "cus_N829103aP",
      "Dispute Category": "Duplicate Billing",
    },
    history: [
      { date: "2026-06-08 11:20", action: "Dispute Logged", actor: "ApexCorp Billing", notes: "Customer filed dispute in billing dashboard." },
      { date: "2026-06-09 10:15", action: "Escalated to Finance Lead", actor: "Billing Assistant", notes: "Need senior authorization for subscription reversal." }
    ]
  },
  {
    id: "c-104",
    type: "Data Request (GDPR)",
    user: "Sarah Connor",
    email: "sarah.connor@domain.com",
    priority: "Medium",
    status: "Pending",
    submittedAt: "2026-06-09",
    description: "Customer requested a full export of their personal profile data, messaging history, and platform activity details under GDPR Article 15 regulations.",
    evidenceType: "Data Export Request",
    evidenceValue: "GDPR_Request_Sarah_Connor_2026.json",
    additionalDetails: {
      "User ID": "u_94829104",
      "Country of Residence": "Germany (EU)",
      "Time Left for Resolution": "27 Days remaining",
      "Request Type": "Right of Access (Data Portability)",
    },
    history: [
      { date: "2026-06-09 08:30", action: "GDPR Request Submitted", actor: "Sarah Connor", notes: "Submitted via privacy dashboard." }
    ]
  },
  {
    id: "c-105",
    type: "Terms Violation",
    user: "Crypto Ventures Ltd",
    email: "invest@cryptoventures.io",
    priority: "High",
    status: "Pending",
    submittedAt: "2026-06-12",
    description: "User is marketing high-yield guaranteed investment programs (HYIP) which violate section 4.2 of SupremeWorld platform rules regarding unregistered financial advisory.",
    evidenceType: "Flagged Profile Bio",
    evidenceValue: "Direct investment pool. Guaranteed 15% return monthly. No risk. Private message to sign up now.",
    additionalDetails: {
      "Company Entity": "Crypto Ventures Ltd",
      "Platform Tier": "Premium Member",
      "Joined Date": "2026-05-01",
      "Verified Business": "No (Pending approval)",
    },
    history: [
      { date: "2026-06-12 11:00", action: "Case Created", actor: "Platform Auditor", notes: "Manual flag during profile compliance audit." }
    ]
  },
  {
    id: "c-106",
    type: "Identity Verification",
    user: "Hassan Diop",
    email: "hassan.diop@senegal.tech",
    priority: "Low",
    status: "Resolved",
    submittedAt: "2026-06-07",
    description: "Verification of business address documentation for Diop Tech Hub. Uploaded utility bill from Senegal Senelec.",
    evidenceType: "Address Utility Bill",
    evidenceValue: "Senelec_Bill_Diop_Tech_Hub.pdf",
    additionalDetails: {
      "Business Name": "Diop Tech Hub",
      "Address": "Rue 10, Fann Residence, Dakar",
      "Verification Status": "Passed",
      "Verifier": "Compliance System Automated",
    },
    history: [
      { date: "2026-06-07 14:00", action: "Case Created", actor: "Hassan Diop", notes: "Address uploaded." },
      { date: "2026-06-08 09:30", action: "Approved & Resolved", actor: "Admin Jane", notes: "Document clear and address matches registrations." }
    ]
  }
];

export default function Compliance() {
  const [items, setItems] = useLocalStorage<ComplianceItem[]>(
    "admin_compliance_cases",
    INITIAL_COMPLIANCE_ITEMS
  );
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  
  // Review inputs
  const [decision, setDecision] = useState<string>("Resolve");
  const [notes, setNotes] = useState<string>("");

  // Statistics
  const totalCases = items.length;
  const pendingCases = items.filter((i) => i.status === "Pending").length;
  const escalatedCases = items.filter((i) => i.status === "Escalated").length;
  const resolvedCases = items.filter((i) => i.status === "Resolved").length;
  const highPriorityCases = items.filter((i) => i.priority === "High" && i.status !== "Resolved").length;

  // Filter logic
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.type.toLowerCase().includes(search.toLowerCase()) ||
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || item.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleOpenReview = (item: ComplianceItem) => {
    setSelectedItem(item);
    setNotes("");
    // Pre-populate decision select based on current status
    if (item.status === "Pending") setDecision("Under Review");
    else if (item.status === "Under Review") setDecision("Resolve");
    else if (item.status === "Escalated") setDecision("Resolve");
    else setDecision("Resolve");
  };

  const handleSubmitDecision = () => {
    if (!selectedItem) return;
    if (!notes.trim()) {
      toast.error("Please add audit comments detailing your decision.");
      return;
    }

    const dateStr = new Date().toISOString().replace("T", " ").substring(0, 16);
    
    let nextStatus: ComplianceItem["status"] = "Pending";
    let actionLabel = "";
    
    switch (decision) {
      case "Resolve":
        nextStatus = "Resolved";
        actionLabel = "Case Resolved / Approved";
        break;
      case "Decline":
        nextStatus = "Resolved";
        actionLabel = "Case Rejected / Declined";
        break;
      case "Under Review":
        nextStatus = "Under Review";
        actionLabel = "Status Updated to Under Review";
        break;
      case "Escalate":
        nextStatus = "Escalated";
        actionLabel = "Case Escalated";
        break;
    }

    const newHistoryLog: AuditLog = {
      date: dateStr,
      action: actionLabel,
      actor: "Senior Compliance Administrator",
      notes: notes,
    };

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === selectedItem.id) {
          return {
            ...item,
            status: nextStatus,
            history: [newHistoryLog, ...item.history],
          };
        }
        return item;
      })
    );

    toast.success(`Compliance case ${selectedItem.id} updated to ${nextStatus}.`);
    setSelectedItem(null);
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive border border-destructive/20";
      case "Medium":
        return "bg-gold/10 text-gold border border-gold/20";
      default:
        return "bg-success/10 text-success border border-success/20";
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-gold/10 text-gold border border-gold/20";
      case "Under Review":
        return "bg-deep-blue/10 text-deep-blue border border-deep-blue/20";
      case "Escalated":
        return "bg-destructive/10 text-destructive border border-destructive/20";
      case "Resolved":
        return "bg-success/10 text-success border border-success/20";
      default:
        return "bg-muted text-muted-foreground border border-border";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "Identity Verification":
        return <User className="w-5 h-5 text-gold flex-shrink-0" />;
      case "Payment Dispute":
        return <DollarSign className="w-5 h-5 text-destructive flex-shrink-0" />;
      case "Content Moderation":
        return <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0" />;
      case "Terms Violation":
        return <AlertOctagon className="w-5 h-5 text-destructive flex-shrink-0" />;
      case "Data Request (GDPR)":
        return <FileText className="w-5 h-5 text-deep-blue flex-shrink-0" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-muted-foreground flex-shrink-0" />;
    }
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Compliance & Governance"
        description="Review identity checks, reported content, disputes, and compliance triggers."
        breadcrumbs={[
          { label: "Admin", href: ROUTES.ADMIN_DASHBOARD },
          { label: "Compliance" },
        ]}
      />

      {/* Statistics Dashboard Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl border border-border bg-card/45 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Active Cases</p>
            <p className="text-2xl font-bold mt-1 text-foreground">
              {pendingCases + escalatedCases + (items.filter(i => i.status === "Under Review").length)}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Out of {totalCases} total logs</p>
          </div>
          <div className="p-3 bg-muted rounded-xl">
            <ShieldAlert className="w-5 h-5 text-gold" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card/45 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">High Priority</p>
            <p className="text-2xl font-bold mt-1 text-destructive">
              {highPriorityCases}
            </p>
            <p className="text-xs text-destructive/70 mt-0.5 font-medium">Requires immediate action</p>
          </div>
          <div className="p-3 bg-destructive/10 rounded-xl">
            <AlertOctagon className="w-5 h-5 text-destructive" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card/45 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Pending Audit</p>
            <p className="text-2xl font-bold mt-1 text-gold">
              {pendingCases}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Awaiting initial review</p>
          </div>
          <div className="p-3 bg-gold/10 rounded-xl">
            <Clock className="w-5 h-5 text-gold" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-card/45 backdrop-blur-md flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Resolved Cases</p>
            <p className="text-2xl font-bold mt-1 text-success">
              {resolvedCases}
            </p>
            <p className="text-xs text-success/80 mt-0.5 font-medium">100% resolution completion</p>
          </div>
          <div className="p-3 bg-success/10 rounded-xl">
            <CheckCircle2 className="w-5 h-5 text-success" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, user, email, or request type..."
              className="pl-9 bg-background border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium">Priority:</span>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-32 bg-background border-border text-xs h-9">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap border-b border-border pt-1 gap-1">
          {["All", "Pending", "Under Review", "Escalated", "Resolved"].map((status) => {
            const count = status === "All" 
              ? items.length 
              : items.filter(i => i.status === status).length;

            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`text-xs px-4 py-2 border-b-2 font-medium transition-all duration-200 -mb-[2px] ${
                  statusFilter === status
                    ? "border-gold text-gold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {status} <span className="ml-1 text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cases List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-card border border-border border-dashed rounded-xl">
            <ShieldAlert className="w-10 h-10 text-muted-foreground/60 mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground">No compliance cases found</p>
            <p className="text-xs text-muted-foreground mt-1">Try adjusting your search criteria or status filters.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border bg-card transition-all duration-300 hover:border-gold/30 hover:shadow-sm relative overflow-hidden`}
            >
              {/* Left edge priority indicator bar */}
              <div 
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  item.priority === "High" 
                    ? "bg-destructive" 
                    : item.priority === "Medium" 
                    ? "bg-gold" 
                    : "bg-success"
                }`} 
              />
              
              <div className="flex items-start gap-3 flex-1 pl-1">
                <div className="p-2.5 bg-muted rounded-lg mt-0.5 flex-shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-foreground text-sm truncate">{item.type}</span>
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {item.id}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-3 gap-y-1">
                    <span className="flex items-center gap-1 font-medium text-foreground">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                      {item.user} ({item.email})
                    </span>
                    <span className="hidden sm:inline text-muted-foreground/40">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      Submitted {item.submittedAt}
                    </span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1 pr-4">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Status Badges & Action */}
              <div className="flex items-center gap-2 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${getPriorityBadgeClass(item.priority)}`}>
                    {item.priority}
                  </span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                <Button 
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs border-gold/40 text-gold hover:bg-gold/10 hover:text-gold"
                  onClick={() => handleOpenReview(item)}
                >
                  Review Case
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Case Review Detailed Dialog Modal */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        {selectedItem && (
          <DialogContent className="max-w-2xl border-border bg-card text-foreground">
            <DialogHeader>
              <div className="flex items-center gap-2.5">
                <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${getPriorityBadgeClass(selectedItem.priority)}`}>
                  {selectedItem.priority} Priority
                </span>
                <span className={`text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded ${getStatusBadgeClass(selectedItem.status)}`}>
                  {selectedItem.status}
                </span>
              </div>
              <DialogTitle className="text-lg font-bold font-display mt-2 flex items-center gap-2">
                {selectedItem.type} Review
                <span className="text-xs font-mono font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded">
                  {selectedItem.id}
                </span>
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Submitted by {selectedItem.user} on {selectedItem.submittedAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 my-2 text-sm leading-relaxed overflow-y-auto max-h-[60vh] pr-1">
              {/* Case Details Block */}
              <div className="bg-muted/30 border border-border/80 rounded-xl p-3.5 space-y-2.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-muted-foreground block">User Profile / Entity</span>
                    <span className="font-semibold text-foreground">{selectedItem.user}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Contact Email</span>
                    <span className="font-semibold text-foreground">{selectedItem.email}</span>
                  </div>
                </div>
                <div className="border-t border-border pt-2.5 mt-1.5">
                  <span className="text-xs text-muted-foreground block mb-0.5">Trigger Description</span>
                  <p className="text-xs text-foreground/90">{selectedItem.description}</p>
                </div>
              </div>

              {/* Evidence details Block */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Evidence & Verification Data</h4>
                <div className="bg-background border border-border rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-border">
                    <span className="text-muted-foreground">Evidence File / Log Value</span>
                    <span className="font-mono text-gold font-medium break-all text-right ml-4">
                      {selectedItem.evidenceValue}
                    </span>
                  </div>
                  {selectedItem.additionalDetails && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs pt-1">
                      {Object.entries(selectedItem.additionalDetails).map(([key, val]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}</span>
                          <span className="font-semibold text-foreground text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* History Trail Block */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Audit History</h4>
                <div className="border border-border rounded-xl divide-y divide-border overflow-hidden bg-background">
                  {selectedItem.history.map((log, index) => (
                    <div key={index} className="p-3 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-foreground">{log.action}</span>
                        <span className="text-[10px] text-muted-foreground">{log.date}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        Actor: <span className="font-medium text-foreground">{log.actor}</span>
                      </div>
                      <p className="text-muted-foreground mt-1 italic">"{log.notes}"</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Decision Block */}
              {selectedItem.status !== "Resolved" && (
                <div className="border-t border-border pt-4 mt-2 space-y-3.5">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Submit Review Decision</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground font-medium">Next Status / Action</label>
                      <Select value={decision} onValueChange={setDecision}>
                        <SelectTrigger className="w-full bg-background border-border text-xs h-9">
                          <SelectValue placeholder="Select Action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Resolve">Approve / Resolve Case</SelectItem>
                          <SelectItem value="Under Review">Move to Under Review</SelectItem>
                          <SelectItem value="Escalate">Escalate Case</SelectItem>
                          <SelectItem value="Decline">Decline / Reject Case</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">Audit Notes & Comments (Required)</label>
                    <Textarea 
                      placeholder="Detail why this decision is made, findings of utility audit, or reasons for escalation/rejection..."
                      className="bg-background border-border text-xs"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="border-t border-border pt-3 mt-1">
              <Button 
                variant="outline"
                size="sm"
                className="text-xs border-border"
                onClick={() => setSelectedItem(null)}
              >
                Close View
              </Button>
              {selectedItem.status !== "Resolved" && (
                <Button 
                  size="sm"
                  className="text-xs bg-gold text-royal-black hover:bg-gold-dark"
                  onClick={handleSubmitDecision}
                >
                  Save Decision
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </DashboardLayout>
  );
}