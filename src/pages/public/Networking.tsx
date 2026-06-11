import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Users, MessageSquare, Video, Globe, Zap, Search, ArrowRight, Shield, TrendingUp, Star } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATEGORIES = [
  { value: "entrepreneurs", label: "Entrepreneurs" },
  { value: "investors", label: "Investors" },
  { value: "executives", label: "Executives" },
  { value: "professionals", label: "Professionals" },
  { value: "creators", label: "Creators" },
];

const FEATURED_MEMBERS = [
  { name: "David Osei", role: "Venture Capitalist", country: "Ghana", connections: 2400, industry: "FinTech", type: "investors", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=david_vc&backgroundColor=b6e3f4" },
  { name: "Mei Lin Zhang", role: "Tech Founder", country: "Singapore", connections: 1800, industry: "AI/ML", type: "entrepreneurs", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=mei_founder&backgroundColor=d1d4f9" },
  { name: "Carlos Rivera", role: "Angel Investor", country: "Mexico", connections: 3100, industry: "Real Estate", type: "investors", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos_angel&backgroundColor=c0aede" },
  { name: "Aisha Kamara", role: "Business Strategist", country: "Nigeria", connections: 1200, industry: "Consulting", type: "professionals", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha_strat&backgroundColor=ffd5dc" },
  { name: "Tom Eriksson", role: "Private Equity", country: "Sweden", connections: 2700, industry: "Finance", type: "investors", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom_pe&backgroundColor=b6e3f4" },
  { name: "Priya Nair", role: "Startup Advisor", country: "India", connections: 980, industry: "EdTech", type: "professionals", verified: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya2_adv&backgroundColor=d1d4f9" },
  { name: "James Okafor", role: "Serial Entrepreneur", country: "UK", connections: 4200, industry: "SaaS", type: "entrepreneurs", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=james_ent&backgroundColor=c0aede" },
  { name: "Sana Al-Farsi", role: "Content Creator", country: "UAE", connections: 890, industry: "Media", type: "creators", verified: false, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=sana_creator&backgroundColor=ffd5dc" },
  { name: "Hiroshi Tanaka", role: "Corporate Executive", country: "Japan", connections: 1600, industry: "Manufacturing", type: "executives", verified: true, img: "https://api.dicebear.com/7.x/avataaars/svg?seed=hiroshi_exec&backgroundColor=b6e3f4" },
];

const TOOLS = [
  { icon: Zap, title: "AI-Powered Matching", desc: "Our AI analyzes your profile, goals, and industry to surface the most relevant connections across 80+ countries." },
  { icon: MessageSquare, title: "Private Encrypted Messaging", desc: "Secure, end-to-end encrypted direct messaging with read receipts and file sharing." },
  { icon: Video, title: "Virtual Networking Rooms", desc: "Host or join live video sessions, industry panels, and private boardroom meetings." },
  { icon: Globe, title: "Industry Communities", desc: "Join curated groups aligned with your sector, investment thesis, or professional focus." },
  { icon: Shield, title: "Verified Profiles", desc: "Every member is identity-verified, ensuring trust and quality in every connection." },
  { icon: TrendingUp, title: "Network Analytics", desc: "Track your connection growth, engagement metrics, and relationship strength over time." },
];

const TESTIMONIALS = [
  { name: "Amara Nwosu", role: "Founder, TechBridge Africa", quote: "I closed a $1.2M seed round within 3 months of joining. The quality of investor connections here is unmatched.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=amara_test&backgroundColor=b6e3f4" },
  { name: "James Thornton", role: "Managing Partner, Apex Capital", quote: "The deal flow quality is exceptional. The AI matching found me three founders I would never have discovered otherwise.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=james_test&backgroundColor=d1d4f9" },
  { name: "Priya Sharma", role: "Global HR Director, Fortune 500", quote: "My executive network expanded by 300% in one year. The networking tools here are genuinely premium.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya_test&backgroundColor=ffd5dc" },
];

export default function Networking() {
  const [category, setCategory] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = FEATURED_MEMBERS.filter((m) => {
    const matchCat = !category || m.type === category;
    const q = search.toLowerCase();
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q) || m.industry.toLowerCase().includes(q) || m.country.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-fade-in-down delay-100 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Globe className="w-3.5 h-3.5" />
              150,000+ Verified Members · 80+ Countries
            </div>
            <h1 className="animate-hero-text delay-200 font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Global <span className="gold-text-shimmer">Networking</span><br />Without Borders
            </h1>
            <p className="animate-fade-in delay-400 text-white/60 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Connect with the world's most accomplished entrepreneurs, investors, executives, and professionals through AI-powered relationship intelligence.
            </p>
            <div className="animate-fade-in delay-500 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8 transition-all duration-300 hover:scale-105" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Start Connecting
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.MEMBERSHIP}>View Membership Plans</Link>
              </Button>
            </div>
          </div>
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto stagger-children">
            {[
              { v: "150K+", l: "Members" },
              { v: "80+", l: "Countries" },
              { v: "2.8M+", l: "Connections Made" },
              { v: "94%", l: "Connection Rate" },
            ].map((s) => (
              <div key={s.l} className="animate-count-up text-center py-4 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold/20 transition-colors">
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Featured Members</h2>
              <p className="text-muted-foreground text-sm mt-1">Verified professionals from every sector and continent.</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search by name, role, or industry..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={CATEGORIES} selected={category} onSelect={setCategory} label="Filter by Member Type" />
          </div>
          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Members Found" description={`No members match "${search}". Try a different search term or reset the filters.`} actionLabel="Reset Search" onAction={() => { setSearchRaw(""); setCategory(""); }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {filtered.map((m) => (
                <div key={m.name} className="animate-fade-in-up hover-lift p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img src={m.img} alt={m.name} className="w-14 h-14 rounded-full bg-gold/10" />
                      {m.verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-deep-blue flex items-center justify-center border-2 border-card">
                          <Shield className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{m.name}</p>
                      <p className="text-muted-foreground text-sm truncate">{m.role}</p>
                      <p className="text-gold text-xs">{m.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {m.connections.toLocaleString()} connections
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded">{m.industry}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full group-hover:border-gold/50 transition-colors" asChild>
                    <Link to={ROUTES.SIGNUP}>Connect</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
              <Link to={ROUTES.SIGNUP}>
                View All 150,000+ Members
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">World-Class Networking Tools</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Purpose-built for executive-level relationship building — not generic social media.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {TOOLS.map((t) => (
              <div key={t.title} className="animate-fade-in-up hover-lift p-6 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <t.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{t.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Real Results from <span className="text-gold">Real Members</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto stagger-children">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="animate-scale-in hover-lift glass-card p-6 rounded-xl space-y-4">
                <div className="flex gap-0.5 mb-1">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full bg-gold/20" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gold/70 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Your Next Strategic <span className="text-gold">Connection</span> Awaits
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join 150,000+ professionals already building meaningful global relationships on SupremeWorld.
          </p>
          <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-10" asChild>
            <Link to={ROUTES.SIGNUP}>
              Create Your Free Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
