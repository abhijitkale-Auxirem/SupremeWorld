import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Clock, Users, ArrowRight, X } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  hours: string;
  enrolled: number;
}

const COURSES: Course[] = [
  { id: "c1", title: "AI for Business Leaders", category: "Tech", progress: 75, hours: "6hr", enrolled: 6100 },
  { id: "c2", title: "Advanced Investment Strategies", category: "Finance", progress: 45, hours: "8hr", enrolled: 2800 },
  { id: "c3", title: "Executive Leadership", category: "Leadership", progress: 90, hours: "10hr", enrolled: 3300 },
  { id: "c4", title: "Global Trade Fundamentals", category: "Business", progress: 0, hours: "7hr", enrolled: 1900 },
];

export default function LearningHub() {
  // State to manage the popup message text
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const handleCourseAction = (course: Course) => {
    if (course.progress > 0) {
      setPopupMessage(`Resuming your progress in "${course.title}". Redirecting to classroom...`);
    } else {
      setPopupMessage(`Congratulations! You have successfully enrolled in "${course.title}".`);
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Learning Hub" 
        description="Your enrolled courses and programs." 
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, 
          { label: "Learning Hub" }
        ]} 
      />

      <div className="w-full overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th className="p-4">Course Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Enrolled</th>
              <th className="p-4">Progress</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-sm">
            {COURSES.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors group">
                <td className="p-4 font-medium text-foreground max-w-xs truncate">
                  {c.title}
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {c.category}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {c.hours}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {c.enrolled.toLocaleString()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 w-32">
                    <span className="text-xs font-medium text-foreground">
                      {c.progress > 0 ? `${c.progress}% complete` : "Not started"}
                    </span>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-gold transition-all duration-300" 
                        style={{ width: `${c.progress}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleCourseAction(c)}
                    className={`inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                      c.progress > 0 
                        ? "border border-border text-foreground hover:border-gold/40 hover:bg-muted/50" 
                        : "bg-gold text-royal-black hover:bg-gold/90 font-semibold"
                    }`}
                  >
                    {c.progress > 0 ? "Continue" : "Enroll"}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline Popup / Modal Window */}
      {popupMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border p-6 rounded-xl shadow-xl max-w-sm w-full relative">
            <button 
              onClick={() => setPopupMessage(null)}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close layout info popup"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-semibold text-foreground text-base mb-2">Notification</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {popupMessage}
            </p>
            <button 
              onClick={() => setPopupMessage(null)}
              className="w-full bg-gold text-royal-black font-medium text-xs py-2 rounded-lg hover:bg-gold/90 transition-colors"
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}