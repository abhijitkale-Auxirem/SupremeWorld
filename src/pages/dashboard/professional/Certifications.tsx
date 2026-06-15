import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Award, Eye, Play, X } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  status: "Earned" | "In Progress";
}

const CERTS: Certification[] = [
  { id: "cert-1", title: "Business Leadership Certification", issuer: "SupremeWorld Academy", date: "Apr 2026", status: "Earned" },
  { id: "cert-2", title: "Advanced Financial Modeling", issuer: "SupremeWorld Academy", date: "Jan 2026", status: "Earned" },
  { id: "cert-3", title: "AI Business Strategy", issuer: "SupremeWorld Academy", date: "In Progress", status: "In Progress" },
];

export default function Certifications() {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleAction = (cert: Certification) => {
    if (cert.status === "Earned") {
      setPopupMessage(`Opening credential file for "${cert.title}". secure link verified.`);
    } else {
      setPopupMessage(`Redirecting to your classroom modules for "${cert.title}".`);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Certifications" 
        description="Your earned and in-progress certifications." 
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, 
          { label: "Certifications" }
        ]} 
      />

      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4 w-12 text-center">Status</th>
              <th className="p-4">Certification Title</th>
              <th className="p-4">Issuer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Progress Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {CERTS.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors group">
                {/* Status Icon */}
                <td className="p-4 text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                    c.status === "Earned" ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"
                  }`}>
                    <Award className="w-4 h-4" />
                  </div>
                </td>

                {/* Title */}
                <td className="p-4 font-semibold text-foreground max-w-xs truncate">
                  {c.title}
                </td>

                {/* Issuer */}
                <td className="p-4 text-muted-foreground">
                  {c.issuer}
                </td>

                {/* Date */}
                <td className="p-4 text-muted-foreground whitespace-nowrap">
                  {c.date}
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full ${
                    c.status === "Earned" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"
                  }`}>
                    {c.status}
                  </span>
                </td>

                {/* Operational Action Trigger */}
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleAction(c)}
                    className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      c.status === "Earned" 
                        ? "border border-border text-foreground hover:border-gold/40 hover:bg-muted/50" 
                        : "bg-gold text-royal-black hover:bg-gold/90 font-semibold"
                    }`}
                  >
                    {c.status === "Earned" ? (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Resume
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notification Message Popup Overlay */}
      {popupMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border p-6 rounded-xl shadow-xl max-w-sm w-full relative">
            <button 
              onClick={() => setPopupMessage(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close message panel"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-semibold text-foreground text-base mb-2">Certification Desk</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {popupMessage}
            </p>
            <button 
              onClick={() => setPopupMessage(null)}
              className="w-full bg-gold text-royal-black font-semibold text-xs py-2 rounded-lg hover:bg-gold/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}