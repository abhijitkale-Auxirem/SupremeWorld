import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  hours: string;
  enrolled: number;
}

const INITIAL_COURSES: Course[] = [
  { id: "c1", title: "AI for Business Leaders", category: "Tech", progress: 75, hours: "6hr", enrolled: 6100 },
  { id: "c2", title: "Advanced Investment Strategies", category: "Finance", progress: 45, hours: "8hr", enrolled: 2800 },
  { id: "c3", title: "Executive Leadership", category: "Leadership", progress: 90, hours: "10hr", enrolled: 3300 },
  { id: "c4", title: "Global Trade Fundamentals", category: "Business", progress: 0, hours: "7hr", enrolled: 1900 },
];

export default function LearningHub() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  const handleCourseAction = (e: React.MouseEvent, course: Course) => {
    e.preventDefault();
    e.stopPropagation();

    if (course.progress > 0) {
      toast.success(`Continuing "${course.title}"`, {
        description: `You're ${course.progress}% through. Keep it up!`,
        duration: 4000,
      });
    } else {
      setCourses((prev) =>
        prev.map((item) =>
          item.id === course.id ? { ...item, progress: 5, enrolled: item.enrolled + 1 } : item
        )
      );
      toast.success(`Enrolled in "${course.title}"!`, {
        description: "You can now continue this course from your Learning Hub.",
        duration: 4000,
      });
    }
  };

  return (
    <DashboardLayout>
      <PageHeader 
        title="Learning Hub" 
        description="Your enrolled courses and professional development paths." 
        breadcrumbs={[
          { label: "Dashboard", href: ROUTES.PROFESSIONAL_DASHBOARD }, 
          { label: "Learning Hub" }
        ]} 
      />

      <div className="w-full overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider select-none">
              <th className="p-4 pl-6">Course Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Enrolled</th>
              <th className="p-4">Progress</th>
              <th className="p-4 pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-sm font-medium">
            {courses.map((c) => (
              <tr key={c.id} className="hover:bg-muted/20 transition-colors group">
                <td className="p-4 pl-6 font-semibold text-foreground max-w-xs truncate">
                  {c.title}
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border/40">
                    {c.category}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
                    {c.hours}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-muted-foreground/60" />
                    {c.enrolled.toLocaleString()}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex flex-col gap-1 w-32">
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {c.progress > 0 ? `${c.progress}% complete` : "Not started"}
                    </span>
                    <div className="w-full bg-muted dark:bg-muted/50 rounded-full h-1.5">
                      <div 
                        className="h-1.5 rounded-full bg-gold transition-all duration-500" 
                        style={{ width: `${c.progress}%` }} 
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4 pr-6 text-right">
                  {/* FIX 2: Replaced custom tag with global UI Button wrapper */}
                  <Button 
                    size="sm"
                    variant={c.progress > 0 ? "outline" : "default"}
                    onClick={(e) => handleCourseAction(e, c)}
                    className={`h-8 text-xs font-semibold px-3 relative z-20 ${
                      c.progress > 0 
                        ? "border-border hover:border-gold/40 hover:bg-gold/5 text-foreground" 
                        : "bg-gold text-royal-black hover:bg-gold/90"
                    }`}
                  >
                    {c.progress > 0 ? "Continue" : "Enroll"}
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </DashboardLayout>
  );
}