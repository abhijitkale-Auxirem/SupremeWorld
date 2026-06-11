import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { MapPin, Clock, Briefcase, ArrowRight, Search, Users, Globe, Zap, Heart } from "lucide-react";
import PublicLayout from "@/layouts/PublicLayout";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import EmptyState from "@/components/common/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

const DEPT_CATS = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "investments", label: "Investments" },
  { value: "community", label: "Community" },
  { value: "operations", label: "Operations" },
];

const JOBS = [
  { id: 1, title: "Senior Product Designer", department: "design", location: "Remote / Dubai", type: "Full-time", level: "Senior", posted: "2 days ago", description: "Lead the design of new platform features, from discovery and prototyping to final implementation." },
  { id: 2, title: "Backend Engineer (Node.js / TypeScript)", department: "engineering", location: "Singapore / Remote", type: "Full-time", level: "Mid-Senior", posted: "4 days ago", description: "Build and scale the core platform APIs, real-time data pipelines, and microservice architecture." },
  { id: 3, title: "Growth Marketing Manager", department: "marketing", location: "London", type: "Full-time", level: "Senior", posted: "1 week ago", description: "Lead member acquisition campaigns across paid, organic, partnerships, and content channels." },
  { id: 4, title: "Investment Relations Specialist", department: "investments", location: "New York", type: "Full-time", level: "Mid", posted: "1 week ago", description: "Curate and manage the investment deal flow pipeline, working with founders and investors across the platform." },
  { id: 5, title: "Community Manager (APAC)", department: "community", location: "Singapore / Remote", type: "Full-time", level: "Mid", posted: "3 days ago", description: "Build, moderate, and grow the SupremeWorld community across South-East Asia and the Pacific." },
  { id: 6, title: "AI/ML Engineer", department: "engineering", location: "Remote", type: "Full-time", level: "Senior", posted: "5 days ago", description: "Develop and improve AI matching models, recommendation engines, and the Supreme AI Assistant." },
  { id: 7, title: "Senior Frontend Engineer (React/TypeScript)", department: "engineering", location: "Remote", type: "Full-time", level: "Senior", posted: "1 week ago", description: "Build responsive, accessible, and performance-optimized user interfaces for 150,000+ members." },
  { id: 8, title: "Head of Strategic Partnerships", department: "operations", location: "Dubai / London", type: "Full-time", level: "Director", posted: "2 weeks ago", description: "Develop and manage high-value partnerships with global financial institutions, governments, and corporations." },
  { id: 9, title: "UX Researcher", department: "design", location: "Remote", type: "Full-time", level: "Mid", posted: "3 days ago", description: "Conduct qualitative and quantitative research to drive evidence-based product and design decisions." },
  { id: 10, title: "Brand Content Writer", department: "marketing", location: "Remote", type: "Contract", level: "Mid", posted: "1 week ago", description: "Create premium editorial content, thought leadership pieces, and platform communications." },
  { id: 11, title: "Customer Success Manager (EMEA)", department: "operations", location: "London / Remote", type: "Full-time", level: "Mid-Senior", posted: "5 days ago", description: "Manage the onboarding and success of Executive and Elite members across Europe, Middle East and Africa." },
  { id: 12, title: "Data Analyst", department: "engineering", location: "Remote", type: "Full-time", level: "Mid", posted: "1 week ago", description: "Analyse platform usage data, member behaviour, and investment metrics to guide strategic decisions." },
];

const PERKS = [
  { icon: Globe, title: "Remote-First Culture", desc: "Work from anywhere. We have hubs in Dubai, London, Singapore, and New York — and support fully remote roles globally." },
  { icon: Zap, title: "Equity Participation", desc: "Competitive equity packages for all full-time employees. You build it, you own it." },
  { icon: Users, title: "Elite Network Access", desc: "All employees receive Elite membership — full access to our global network, events, and lifestyle services." },
  { icon: Heart, title: "Premium Health Benefits", desc: "Comprehensive health, dental, and wellness coverage including mental health support and gym allowances." },
  { icon: Briefcase, title: "Learning Allowance", desc: "$2,000 annual learning and development budget for courses, conferences, and certifications." },
  { icon: ArrowRight, title: "Fast Growth", desc: "We are scaling rapidly. Career progression is fast for high performers who want to take ownership." },
];

export default function Careers() {
  const [dept, setDept] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);
  const [selectedJob, setSelectedJob] = useState<typeof JOBS[0] | null>(null);

  const filtered = JOBS.filter((j) => {
    const matchDept = !dept || j.department === dept;
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.department.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
    return matchDept && matchSearch;
  });

  const levelColor: Record<string, string> = {
    "Senior": "bg-deep-blue/10 text-deep-blue",
    "Mid-Senior": "bg-gold/10 text-gold",
    "Mid": "bg-muted text-muted-foreground",
    "Director": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              {JOBS.length} Open Positions · 4 Global Offices
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Build the Future <span className="text-gold">With Us</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Join the team building the world's most ambitious global business, investment, and lifestyle super-platform.
            </p>
            <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-10" onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}>
              View Open Roles
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Why Join SupremeWorld?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We are a mission-driven team building technology that genuinely changes how the world's most capable people connect and grow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((p) => (
              <div key={p.title} className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-gold/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section id="open-roles" className="py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Open Positions</h2>
              <p className="text-muted-foreground text-sm mt-1">{filtered.length} role{filtered.length !== 1 ? "s" : ""} available</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search roles or locations..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={DEPT_CATS} selected={dept} onSelect={setDept} label="Department" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Roles Found" description={`No open positions match "${search}". Try a different keyword or clear the department filter.`} actionLabel="Clear Filters" onAction={() => { setSearchRaw(""); setDept(""); }} />
          ) : (
            <div className="space-y-3">
              {filtered.map((j) => (
                <div key={j.id} className={`p-5 rounded-xl border bg-card hover:border-gold/40 transition-all cursor-pointer ${selectedJob?.id === j.id ? "border-gold ring-1 ring-gold/20" : "border-border"}`} onClick={() => setSelectedJob(selectedJob?.id === j.id ? null : j)}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{j.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[j.level] ?? "bg-muted text-muted-foreground"}`}>{j.level}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 capitalize"><Briefcase className="w-3.5 h-3.5" />{j.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{j.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{j.type}</span>
                        <span className="text-xs text-muted-foreground/70">Posted {j.posted}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0 hover:border-gold/50" onClick={(e) => { e.stopPropagation(); }}>Apply Now</Button>
                  </div>
                  {selectedJob?.id === j.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{j.description}</p>
                      <Button size="sm" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold">Apply for This Role</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-royal-black">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Do not see the right role?
          </h2>
          <p className="text-white/60 mb-6">Send us your CV and tell us how you would contribute to SupremeWorld's mission.</p>
          <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 px-8" asChild>
            <Link to={ROUTES.CONTACT}>Send Open Application</Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
