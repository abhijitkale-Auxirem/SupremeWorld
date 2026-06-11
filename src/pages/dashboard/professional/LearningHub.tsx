import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { BookOpen, Clock, Users } from "lucide-react";
const COURSES = [
  { title: "AI for Business Leaders", category: "Tech", progress: 75, hours: "6hr", enrolled: 6100 },
  { title: "Advanced Investment Strategies", category: "Finance", progress: 45, hours: "8hr", enrolled: 2800 },
  { title: "Executive Leadership", category: "Leadership", progress: 90, hours: "10hr", enrolled: 3300 },
  { title: "Global Trade Fundamentals", category: "Business", progress: 0, hours: "7hr", enrolled: 1900 },
];
export default function LearningHub() {
  return (
    <DashboardLayout>
      <PageHeader title="Learning Hub" description="Your enrolled courses and programs." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, { label: "Learning Hub" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COURSES.map((c) => (
          <div key={c.title} className="p-5 rounded-xl border border-border bg-card">
            <div className="flex justify-between mb-2"><span className="text-xs font-semibold text-muted-foreground">{c.category}</span>{c.progress > 0 && <span className="text-xs text-gold font-semibold">{c.progress}% complete</span>}</div>
            <h3 className="font-semibold text-foreground mb-2">{c.title}</h3>
            <div className="flex gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{c.hours}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" />{c.enrolled.toLocaleString()}</span>
            </div>
            {c.progress > 0 && <div className="w-full bg-muted rounded-full h-1.5 mb-3"><div className="h-1.5 rounded-full bg-gold" style={{ width: `${c.progress}%` }} /></div>}
            <button className={`w-full text-sm rounded-lg py-2 transition-colors ${c.progress > 0 ? "border border-border hover:border-gold/40" : "bg-gold text-royal-black hover:bg-gold/90"}`}>
              {c.progress > 0 ? "Continue Learning" : "Enroll Now"}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
