import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { BookOpen, Award, Clock, Users, ArrowRight, Star, TrendingUp, Video, FileText, Mic } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATS = [
  { value: "business", label: "Business" },
  { value: "finance", label: "Finance" },
  { value: "tech", label: "Technology" },
  { value: "leadership", label: "Leadership" },
  { value: "investing", label: "Investing" },
  { value: "marketing", label: "Marketing" },
];

const COURSES = [
  { id: 1, title: "Startup to Scale: The Entrepreneur Blueprint", category: "business", duration: "12 hrs", enrolled: 4200, level: "Intermediate", rating: 4.9, instructor: "James Okafor", format: "video", isFeatured: true, price: "Executive+" },
  { id: 2, title: "Advanced Investment Strategies for HNWIs", category: "finance", duration: "8 hrs", enrolled: 2800, level: "Advanced", rating: 4.8, instructor: "Faisal Al-Rashid", format: "video", isFeatured: false, price: "Executive+" },
  { id: 3, title: "AI for Business Leaders", category: "tech", duration: "6 hrs", enrolled: 6100, level: "Beginner", rating: 4.7, instructor: "Mei Lin Zhang", format: "video", isFeatured: true, price: "Free" },
  { id: 4, title: "Executive Leadership Masterclass", category: "leadership", duration: "10 hrs", enrolled: 3300, level: "Advanced", rating: 4.9, instructor: "Sarah Mitchell", format: "video", isFeatured: false, price: "Executive+" },
  { id: 5, title: "Global Trade and Commerce Fundamentals", category: "business", duration: "7 hrs", enrolled: 1900, level: "Beginner", rating: 4.6, instructor: "SupremeWorld Faculty", format: "text", isFeatured: false, price: "Networker+" },
  { id: 6, title: "Financial Modeling and Valuation", category: "finance", duration: "9 hrs", enrolled: 2400, level: "Intermediate", rating: 4.8, instructor: "David Osei", format: "video", isFeatured: false, price: "Executive+" },
  { id: 7, title: "Venture Capital and Startup Funding", category: "investing", duration: "11 hrs", enrolled: 3800, level: "Intermediate", rating: 4.9, instructor: "Carlos Rivera", format: "video", isFeatured: true, price: "Executive+" },
  { id: 8, title: "Digital Marketing Mastery", category: "marketing", duration: "8 hrs", enrolled: 5200, level: "Beginner", rating: 4.6, instructor: "Priya Nair", format: "video", isFeatured: false, price: "Networker+" },
  { id: 9, title: "Blockchain and Web3 for Executives", category: "tech", duration: "5 hrs", enrolled: 2100, level: "Intermediate", rating: 4.7, instructor: "Tech Desk", format: "video", isFeatured: false, price: "Executive+" },
  { id: 10, title: "Board Governance & Corporate Strategy", category: "leadership", duration: "6 hrs", enrolled: 1400, level: "Advanced", rating: 4.8, instructor: "Hiroshi Tanaka", format: "live", isFeatured: false, price: "Elite" },
  { id: 11, title: "Real Estate Investment Fundamentals", category: "investing", duration: "7 hrs", enrolled: 2900, level: "Beginner", rating: 4.7, instructor: "SupremeWorld Faculty", format: "video", isFeatured: false, price: "Networker+" },
  { id: 12, title: "Personal Branding for Executives", category: "marketing", duration: "4 hrs", enrolled: 7600, level: "Beginner", rating: 4.5, instructor: "Priya Sharma", format: "video", isFeatured: false, price: "Free" },
];

const FORMAT_ICONS: Record<string, React.ElementType> = {
  video: Video,
  text: FileText,
  live: Mic,
};

const LEARNING_PATHS = [
  { title: "Entrepreneur Track", desc: "From idea to Series A — the complete startup founder curriculum.", courses: 8, duration: "60 hrs", badge: "Entrepreneur Certification" },
  { title: "Investor Track", desc: "Master deal sourcing, due diligence, and portfolio management.", courses: 6, duration: "44 hrs", badge: "Investment Analyst Badge" },
  { title: "Executive Leadership", desc: "Elevate your leadership effectiveness and strategic thinking.", courses: 5, duration: "36 hrs", badge: "Executive Leader Certificate" },
  { title: "Finance & Wealth", desc: "Advanced financial literacy, wealth management, and capital allocation.", courses: 7, duration: "52 hrs", badge: "Financial Excellence Badge" },
];

const INSTRUCTORS = [
  { name: "James Okafor", bio: "Serial entrepreneur, 3 exits, $180M raised", courses: 4, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=james_edu&backgroundColor=b6e3f4" },
  { name: "Faisal Al-Rashid", bio: "CIO, 20+ years in private equity and venture", courses: 3, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=faisal_edu&backgroundColor=d1d4f9" },
  { name: "Priya Sharma", bio: "HR Director Fortune 500, executive coach", courses: 2, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya_edu&backgroundColor=ffd5dc" },
  { name: "David Osei", bio: "VC partner, 40+ startup investments", courses: 5, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=david_edu&backgroundColor=c0aede" },
];

export default function Education() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = COURSES.filter((c) => {
    const matchCat = !cat || c.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q) || c.level.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const levelColor: Record<string, string> = {
    Beginner: "text-success",
    Intermediate: "text-gold",
    Advanced: "text-deep-blue",
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-fade-in-down delay-100 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              200+ Expert-Led Programs
            </div>
            <h1 className="animate-hero-text delay-200 font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              World-Class <span className="gold-text-shimmer">Business Education</span>
            </h1>
            <p className="animate-fade-in delay-400 text-white/60 text-xl leading-relaxed mb-8">
              Executive programs, certifications, and mentorship designed for entrepreneurs, investors, and global professionals.
            </p>
            <div className="animate-fade-in delay-500 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8 transition-all duration-300 hover:scale-105" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Browse All Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.PRICING}>View Learning Plans</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto stagger-children">
            {[
              { v: "200+", l: "Courses" },
              { v: "48K+", l: "Enrolled" },
              { v: "40+", l: "Expert Instructors" },
              { v: "12", l: "Certifications" },
            ].map((s) => (
              <div key={s.l} className="animate-count-up text-center py-4 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold/20 transition-colors">
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Structured Learning Paths</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Curated programs designed for specific career objectives and professional growth goals.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {LEARNING_PATHS.map((lp) => (
              <div key={lp.title} className="animate-fade-in-up hover-lift p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <TrendingUp className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{lp.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{lp.desc}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{lp.courses} courses</span>
                  <span>{lp.duration}</span>
                </div>
                <div className="px-3 py-2 rounded-lg bg-gold/5 border border-gold/20 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-gold" />
                    <span className="text-xs text-gold font-medium">{lp.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Course Catalog</h2>
              <p className="text-muted-foreground text-sm mt-1">Showing {filtered.length} of {COURSES.length} available programs.</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search courses or instructors..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Subject Area" />
          </div>
          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Courses Found" description={`No courses match "${search}". Try a different keyword or clear the filters.`} actionLabel="Clear Filters" onAction={() => { setSearchRaw(""); setCat(""); }} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filtered.map((c) => {
                const FmtIcon = FORMAT_ICONS[c.format] ?? Video;
                return (
                  <div key={c.id} className={`animate-fade-in-up hover-lift p-6 rounded-xl border bg-card hover:shadow-md transition-all flex flex-col ${c.isFeatured ? "border-gold/40 ring-1 ring-gold/20" : "border-border hover:border-gold/40"}`}>
                    {c.isFeatured && (
                      <div className="flex items-center gap-1.5 mb-3">
                        <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        <span className="text-xs text-gold font-semibold">Featured Program</span>
                      </div>
                    )}
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded capitalize">{c.category}</span>
                      <span className={`text-xs font-medium ${levelColor[c.level]}`}>{c.level}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 leading-snug flex-1">{c.title}</h3>
                    <p className="text-muted-foreground text-xs mb-3">by {c.instructor}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {c.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {c.enrolled.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FmtIcon className="w-3.5 h-3.5" />
                        <span className="capitalize">{c.format}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        <span className="text-sm font-semibold">{c.rating}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.price === "Free" ? "bg-success/10 text-success" : "bg-gold/10 text-gold"}`}>{c.price}</span>
                    </div>
                    <Button size="sm" variant="outline" className="w-full hover:border-gold/50" asChild>
                      <Link to={ROUTES.SIGNUP}>Enroll Now</Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Expert Instructors</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Learn directly from practitioners with proven real-world experience.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {INSTRUCTORS.map((ins) => (
              <div key={ins.name} className="animate-scale-in hover-lift p-6 rounded-xl border border-border bg-card text-center hover:border-gold/40 hover:shadow-md transition-all group">
                <img src={ins.img} alt={ins.name} className="w-16 h-16 rounded-full mx-auto mb-3 bg-gold/10 transition-transform duration-300 group-hover:scale-110" />
                <h3 className="font-display font-semibold text-foreground">{ins.name}</h3>
                <p className="text-muted-foreground text-xs mt-1 mb-2">{ins.bio}</p>
                <span className="text-xs text-gold">{ins.courses} courses</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-royal-black">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Invest in Your <span className="text-gold">Most Important Asset</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Access 200+ programs and earn certifications recognised by global employers and investors.
          </p>
          <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-10" asChild>
            <Link to={ROUTES.SIGNUP}>
              Start Learning Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
