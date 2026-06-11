import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Users, Lock, Globe, TrendingUp, ArrowRight, Shield, MessageSquare, Search } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATS = [
  { value: "entrepreneur", label: "Entrepreneurs" },
  { value: "investor", label: "Investors" },
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "creator", label: "Creators" },
  { value: "executive", label: "Executives" },
];

const COMMUNITIES = [
  { id: 1, name: "Global Founders Network", category: "entrepreneur", members: 8400, isPrivate: false, activity: "Very Active", description: "Connect with startup founders from seed stage to post-Series B. Share learnings, find co-founders, and get introductions." },
  { id: 2, name: "Angel Investor Circle", category: "investor", members: 3200, isPrivate: true, activity: "Active", description: "Private network for accredited angel investors sharing deal flow, co-investment opportunities, and market intelligence." },
  { id: 3, name: "Africa Tech Leaders", category: "tech", members: 5600, isPrivate: false, activity: "Very Active", description: "Africa's largest curated tech community connecting engineers, founders, and operators building on the continent." },
  { id: 4, name: "Women in Finance", category: "finance", members: 4100, isPrivate: false, activity: "Active", description: "Empowering women in investment banking, private equity, venture capital, and financial services globally." },
  { id: 5, name: "Series A Founders Club", category: "entrepreneur", members: 1800, isPrivate: true, activity: "Active", description: "Exclusive community for founders who have raised Series A+. Peer support, investor intros, and growth frameworks." },
  { id: 6, name: "FinTech Disruptors", category: "tech", members: 6300, isPrivate: false, activity: "Very Active", description: "The community for payments, lending, crypto, and insurtech founders and practitioners transforming financial services." },
  { id: 7, name: "Real Estate Investors Network", category: "investor", members: 2900, isPrivate: false, activity: "Active", description: "Residential, commercial, and REITs investors sharing market data, deal opportunities, and investment theses." },
  { id: 8, name: "Executive Leaders Forum", category: "executive", members: 3800, isPrivate: true, activity: "Active", description: "Senior executives (C-suite and VP+) discussing leadership, strategy, and navigating complex global business challenges." },
  { id: 9, name: "Creator Economy Collective", category: "creator", members: 7200, isPrivate: false, activity: "Very Active", description: "Influencers, YouTubers, podcasters, and digital creators sharing monetization, brand deal, and growth strategies." },
  { id: 10, name: "Climate Tech Alliance", category: "tech", members: 2400, isPrivate: false, activity: "Active", description: "Founders and investors focused on clean energy, carbon markets, and sustainable technology solutions." },
  { id: 11, name: "Global Supply Chain Masters", category: "entrepreneur", members: 1600, isPrivate: false, activity: "Moderate", description: "Sourcing, logistics, and operations professionals optimizing global supply chains across industries." },
  { id: 12, name: "Healthcare Innovators", category: "tech", members: 3100, isPrivate: false, activity: "Active", description: "Medtech founders, hospital administrators, and health investors reimagining global healthcare delivery." },
];

const COMMUNITY_BENEFITS = [
  { icon: MessageSquare, title: "Group Discussions", desc: "Structured threads, polls, and Q&A formats to drive meaningful conversations." },
  { icon: Globe, title: "Global Member Base", desc: "Communities spanning every continent with members across 80+ countries." },
  { icon: Shield, title: "Moderated Quality", desc: "Every community is professionally moderated to maintain the highest standards." },
  { icon: TrendingUp, title: "Resource Libraries", desc: "Curated documents, templates, and guides exclusive to each community." },
  { icon: Users, title: "Sub-Groups", desc: "Regional chapters and niche sub-groups within each primary community." },
  { icon: Lock, title: "Private Spaces", desc: "Closed community options for sensitive deal discussions and strategic planning." },
];

export default function Communities() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = COMMUNITIES.filter((c) => {
    const matchCat = !cat || c.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const activityColor: Record<string, string> = {
    "Very Active": "text-success",
    "Active": "text-gold",
    "Moderate": "text-muted-foreground",
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Users className="w-3.5 h-3.5" />
              240+ Communities · 80+ Countries
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your <span className="text-gold">Global Tribe</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Join curated communities of entrepreneurs, investors, creators, and executives that share your industry, goals, and ambition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Join Communities
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.NETWORKING}>Explore Networking</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
            {[
              { v: "240+", l: "Communities" },
              { v: "96K+", l: "Community Members" },
              { v: "12K+", l: "Daily Messages" },
              { v: "18", l: "Industry Verticals" },
            ].map((s) => (
              <div key={s.l} className="text-center py-4 px-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Why SupremeWorld Communities?</h2>
            <p className="text-muted-foreground">Not just groups — purpose-built professional ecosystems.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMUNITY_BENEFITS.map((b) => (
              <div key={b.title} className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-0.5">{b.title}</h3>
                  <p className="text-muted-foreground text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities listing */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Browse Communities</h2>
              <p className="text-muted-foreground text-sm mt-1">Showing {filtered.length} of {COMMUNITIES.length} communities</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search communities..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Community Type" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Communities Found" description={`No communities match "${search}". Try a different keyword or clear filters.`} actionLabel="Clear Filters" onAction={() => { setSearchRaw(""); setCat(""); }} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <div key={c.id} className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all flex flex-col group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-semibold rounded capitalize">{c.category}</span>
                    <div className="flex items-center gap-1.5">
                      {c.isPrivate && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Lock className="w-3 h-3" />Private
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 leading-snug">{c.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-2">{c.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      {c.members.toLocaleString()} members
                    </span>
                    <span className={`text-xs font-medium ${activityColor[c.activity]}`}>{c.activity}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full group-hover:border-gold/50 transition-colors" asChild>
                    <Link to={ROUTES.SIGNUP}>
                      {c.isPrivate ? "Request Access" : "Join Community"}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
              <Link to={ROUTES.SIGNUP}>
                Explore All 240+ Communities
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Create community CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Start Your Own Community</h2>
          <p className="text-muted-foreground mb-6">Launch a private or public community around your niche. Executive and Elite members can create and moderate communities.</p>
          <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
            <Link to={ROUTES.MEMBERSHIP}>
              Become an Executive Member
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
