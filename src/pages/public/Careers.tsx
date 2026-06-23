import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { MapPin, Clock, Briefcase, ArrowRight, Search, Users, Globe, Zap, Heart, Upload, X, CheckCircle } from "lucide-react";
import PublicLayout from "@/layouts/PublicLayout";
import SearchBar from "@/components/common/SearchBar";
import CategorySection from "@/components/common/CategorySection";
import EmptyState from "@/components/common/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

const DEPT_CATS = [
  { value: "engineering", label: "Engineering" },
  { value: "product", label: "Product" },
  { value: "design", label: "Design" },
  { value: "business", label: "Business Development" },
  { value: "investments", label: "Investments" },
  { value: "community", label: "Community & Networking" },
  { value: "education", label: "Education & Learning" },
  { value: "commerce", label: "Commerce & Marketplace" },
];

const JOBS = [
  { id: 1, title: "Startup Ecosystem Manager", department: "business", location: "Remote / Dubai", type: "Full-time", level: "Senior", posted: "2 days ago", description: "Manage startup onboarding, founder engagement, business opportunities, and strategic growth initiatives across the platform." },
  { id: 2, title: "Senior Frontend Engineer (React/TypeScript)", department: "engineering", location: "Remote", type: "Full-time", level: "Senior", posted: "4 days ago", description: "Develop scalable, responsive, and premium user interfaces for networking, investments, and marketplace modules." },
  { id: 3, title: "Backend Engineer (Node.js)", department: "engineering", location: "Remote / Singapore", type: "Full-time", level: "Mid-Senior", posted: "3 days ago", description: "Build secure APIs, authentication systems, investment workflows, and enterprise-grade platform services." },
  { id: 4, title: "Investment Analyst", department: "investments", location: "London / Remote", type: "Full-time", level: "Mid", posted: "1 week ago", description: "Evaluate startups, manage deal flow, analyze investment opportunities, and support investor relations." },
  { id: 5, title: "Community & Networking Manager", department: "community", location: "Remote", type: "Full-time", level: "Mid", posted: "3 days ago", description: "Build and grow entrepreneur, investor, and professional communities through engagement programs and networking initiatives." },
  { id: 6, title: "AI/ML Engineer", department: "engineering", location: "Remote", type: "Full-time", level: "Senior", posted: "5 days ago", description: "Develop AI-powered matchmaking, recommendation engines, networking suggestions, and the Supreme AI Assistant." },
  { id: 7, title: "Product Manager", department: "product", location: "Remote", type: "Full-time", level: "Senior", posted: "1 week ago", description: "Lead product strategy, roadmap planning, and execution for networking, commerce, education, and investment products." },
  { id: 8, title: "Business Development Manager", department: "business", location: "Dubai / London", type: "Full-time", level: "Senior", posted: "4 days ago", description: "Drive strategic partnerships, corporate collaborations, investor relations, and global business expansion." },
  { id: 9, title: "UX/UI Designer", department: "design", location: "Remote", type: "Full-time", level: "Mid", posted: "2 days ago", description: "Design premium user experiences across dashboards, communities, events, and lifestyle services." },
  { id: 10, title: "Content & Brand Strategist", department: "marketing", location: "Remote", type: "Contract", level: "Mid", posted: "1 week ago", description: "Create thought leadership content, platform campaigns, investor communications, and brand storytelling." },
  { id: 11, title: "Events & Summit Coordinator", department: "operations", location: "Dubai / Remote", type: "Full-time", level: "Mid", posted: "5 days ago", description: "Plan and manage business summits, networking events, leadership conferences, and VIP experiences." },
  { id: 12, title: "Luxury Travel & Concierge Specialist", department: "premium", location: "Remote", type: "Full-time", level: "Mid", posted: "6 days ago", description: "Manage premium travel experiences, concierge requests, executive services, and VIP member support." },
  { id: 13, title: "Learning & Certification Manager", department: "education", location: "Remote", type: "Full-time", level: "Mid", posted: "1 week ago", description: "Develop professional learning programs, certifications, mentorship initiatives, and executive education content." },
  { id: 14, title: "Marketplace Operations Manager", department: "commerce", location: "Remote", type: "Full-time", level: "Mid-Senior", posted: "3 days ago", description: "Oversee digital products, premium services, seller onboarding, transactions, and marketplace operations." },
  { id: 15, title: "Data Analyst", department: "analytics", location: "Remote", type: "Full-time", level: "Mid", posted: "1 week ago", description: "Analyze networking trends, investment performance, user engagement, and platform growth metrics." }
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

  // Application Form States
  const [activeApplicationJob, setActiveApplicationJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", linkedin: "", message: "" });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const openApplicationForm = (e: React.MouseEvent, jobTitle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveApplicationJob(jobTitle);
    setFormStatus("idle");
    setFormData({ fullName: "", email: "", phone: "", linkedin: "", message: "" });
    setAttachedFile(null);
  };

  // Inline filter ensures users can only type digits and caps input length at 10
  const handlePhoneChange = (val: string) => {
    const digitsOnly = val.replace(/[^\d]/g, "");
    if (digitsOnly.length <= 10) {
      setFormData({ ...formData, phone: digitsOnly });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size surpasses our 5MB allocation limit.");
        return;
      }
      setAttachedFile(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict Verification: Explicitly require exactly 10 digits
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!attachedFile) {
      alert("Please upload your system Resume/CV file before hitting dispatch.");
      return;
    }

    setFormStatus("submitting");

    const payload = new FormData();
    payload.append("jobTitle", activeApplicationJob || "Open Application");
    payload.append("fullName", formData.fullName);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("linkedin", formData.linkedin);
    payload.append("message", formData.message);
    payload.append("resume", attachedFile);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
    } catch (err) {
      setFormStatus("error");
    }
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
                <div key={j.id} className={`p-5 rounded-xl border bg-card hover:border-gold/40 transition-all border-border`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div 
                      className="flex-1 cursor-pointer select-none"
                      onClick={() => setSelectedJob(selectedJob?.id === j.id ? null : j)}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground hover:text-gold transition-colors">{j.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[j.level] ?? "bg-muted text-muted-foreground"}`}>{j.level}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 capitalize"><Briefcase className="w-3.5 h-3.5" />{j.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{j.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{j.type}</span>
                        <span className="text-xs text-muted-foreground/70">Posted {j.posted}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="shrink-0 hover:border-gold/50 cursor-pointer relative z-10" 
                      onClick={(e) => openApplicationForm(e, j.title)}
                    >
                      Apply Now
                    </Button>
                  </div>
                  {selectedJob?.id === j.id && (
                    <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-1 duration-200">
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{j.description}</p>
                      <Button 
                        size="sm" 
                        className="bg-gold text-royal-black hover:bg-gold/90 font-semibold cursor-pointer relative z-10"
                        onClick={(e) => openApplicationForm(e, j.title)}
                      >
                        Apply for This Role
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Application Form Overlay Modal */}
      {activeApplicationJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-royal-black text-white rounded-2xl border border-gold/20 p-6 md:p-8 shadow-2xl relative">
            <button 
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              onClick={() => setActiveApplicationJob(null)}
            >
              <X className="w-6 h-6" />
            </button>

            {formStatus === "success" ? (
              <div className="text-center py-8 animate-in zoom-in-95 duration-200">
                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Application Received</h3>
                <p className="text-white/60 text-sm max-w-sm mx-auto mb-6">
                  Thank you for applying for the **{activeApplicationJob}** role. Our Talent Team will evaluate your credentials shortly.
                </p>
                <Button className="bg-gold text-royal-black hover:bg-gold/90" onClick={() => setActiveApplicationJob(null)}>
                  Close Portal Window
                </Button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <span className="text-xs font-semibold text-gold tracking-wider uppercase">Application Form</span>
                  <h3 className="text-xl md:text-2xl font-bold mt-1 text-white truncate">🚀 {activeApplicationJob}</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">Full Name *</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50" placeholder="John Doe" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Email Address *</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Phone Number (10 Digits) *</label>
                      <input 
                        required 
                        type="text" 
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50" 
                        placeholder="e.g. 9876543210" 
                        value={formData.phone} 
                        onChange={(e) => handlePhoneChange(e.target.value)} 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">LinkedIn Profile Link</label>
                    <input type="url" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50" placeholder="https://linkedin.com/in/username" value={formData.linkedin} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Attach System Resume / CV (PDF, DOCX up to 5MB) *</label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    
                    {!attachedFile ? (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border border-dashed border-white/20 hover:border-gold/50 rounded-xl p-5 text-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                      >
                        <Upload className="w-6 h-6 text-white/40 group-hover:text-gold mx-auto mb-2 transition-colors" />
                        <p className="text-xs text-white/80 font-medium">Click to select files from system browser</p>
                        <p className="text-[11px] text-white/40 mt-1">Supports PDF, DOC, DOCX up to 5MB max file limits</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3.5">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold shrink-0 text-xs font-bold">
                            {attachedFile.name.split('.').pop()?.toUpperCase()}
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-medium text-white truncate">{attachedFile.name}</p>
                            <p className="text-[10px] text-white/40">{(attachedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all"
                          onClick={() => setAttachedFile(null)}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">Cover Note / Introduction</label>
                    <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/50 resize-none" placeholder="Tell us about yourself..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" type="button" className="text-white hover:bg-white/5 hover:text-white" onClick={() => setActiveApplicationJob(null)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={formStatus === "submitting"} className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-6 min-w-[120px]">
                    {formStatus === "submitting" ? "Transmitting..." : "Submit Profile"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 bg-royal-black">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Do not see the right role?</h2>
          <p className="text-white/60 mb-6">Send us your CV and tell us how you would contribute to SupremeWorld's mission.</p>
          <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold/10 px-8" onClick={(e) => openApplicationForm(e, "Open General Application Strategy")}>
            Send Open Application
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}