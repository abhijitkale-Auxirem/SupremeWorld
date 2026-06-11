import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { TrendingUp, DollarSign, PieChart, Shield, ArrowRight, BarChart2, Target, Users, Search } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATEGORIES = [
  { value: "startup", label: "Startups" },
  { value: "real-estate", label: "Real Estate" },
  { value: "angel", label: "Angel Deals" },
  { value: "alternative", label: "Alternative Assets" },
  { value: "private-equity", label: "Private Equity" },
];

const FEATURED_DEALS = [
  { id: 1, name: "FinTechAfrica", stage: "Series A", ask: "$2.5M", askNum: 2500000, valuation: "$18M", industry: "FinTech", location: "Kenya", category: "startup", minInvestment: "$25K", roiTarget: "3.2x", traction: "140K users, $2.1M ARR" },
  { id: 2, name: "AgriSmart AI", stage: "Seed", ask: "$800K", askNum: 800000, valuation: "$6M", industry: "AgriTech", location: "Nigeria", category: "startup", minInvestment: "$10K", roiTarget: "4.5x", traction: "32K farmers, $480K ARR" },
  { id: 3, name: "HealthLink Pro", stage: "Pre-Seed", ask: "$300K", askNum: 300000, valuation: "$2M", industry: "HealthTech", location: "India", category: "angel", minInvestment: "$5K", roiTarget: "6x", traction: "8K users, MVP live" },
  { id: 4, name: "GreenBuild Co", stage: "Series B", ask: "$5M", askNum: 5000000, valuation: "$42M", industry: "CleanTech", location: "UAE", category: "private-equity", minInvestment: "$100K", roiTarget: "2.8x", traction: "24 projects, $8.4M revenue" },
  { id: 5, name: "EduPlatform Global", stage: "Seed", ask: "$1.2M", askNum: 1200000, valuation: "$9M", industry: "EdTech", location: "USA", category: "startup", minInvestment: "$15K", roiTarget: "3.8x", traction: "280K learners, $1.8M ARR" },
  { id: 6, name: "LogiChain", stage: "Series A", ask: "$3M", askNum: 3000000, valuation: "$22M", industry: "Logistics", location: "Singapore", category: "startup", minInvestment: "$50K", roiTarget: "3.0x", traction: "180 enterprise clients" },
  { id: 7, name: "Dubai Marina Tower", stage: "Development", ask: "$8M", askNum: 8000000, valuation: "$52M", industry: "Real Estate", location: "UAE", category: "real-estate", minInvestment: "$200K", roiTarget: "2.4x", traction: "72% pre-sold" },
  { id: 8, name: "CryptoVault Protocol", stage: "Series A", ask: "$4M", askNum: 4000000, valuation: "$28M", industry: "Blockchain", location: "USA", category: "alternative", minInvestment: "$50K", roiTarget: "5x", traction: "$120M TVL, 42K wallets" },
  { id: 9, name: "MediScan AI", stage: "Pre-Seed", ask: "$500K", askNum: 500000, valuation: "$3.5M", industry: "HealthTech", location: "UK", category: "angel", minInvestment: "$10K", roiTarget: "7x", traction: "Pilot in 3 NHS trusts" },
];

const STATS = [
  { icon: DollarSign, value: "$2.4B+", label: "Total Investments Facilitated" },
  { icon: BarChart2, value: "4,800+", label: "Deals Closed" },
  { icon: Users, value: "18,000+", label: "Active Investors" },
  { icon: TrendingUp, value: "3.6x", label: "Average Portfolio ROI" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Create Investor Profile", desc: "Define your investment thesis, preferred sectors, cheque size, and geographic focus." },
  { step: "02", title: "Browse Curated Deal Flow", desc: "Access verified startups, real estate opportunities, and alternative assets matched to your profile." },
  { step: "03", title: "Enter Deal Rooms", desc: "Engage directly with founders in private deal rooms. Review financials, pitch decks, and data rooms." },
  { step: "04", title: "Invest & Track", desc: "Complete investments securely and monitor portfolio performance through your live dashboard." },
];

const ASSET_CLASSES = [
  { icon: TrendingUp, title: "Startup Equity", desc: "Pre-seed to Series B investment rounds across technology, health, fintech, and emerging sectors.", dealCount: 240 },
  { icon: PieChart, title: "Real Estate", desc: "Premium commercial and residential development projects in tier-1 global markets.", dealCount: 48 },
  { icon: DollarSign, title: "Angel Deals", desc: "Early-stage opportunities with high-growth potential, often founder-direct.", dealCount: 180 },
  { icon: Target, title: "Alternative Assets", desc: "Tokenized assets, commodities, funds, and structured products.", dealCount: 65 },
  { icon: BarChart2, title: "Private Equity", desc: "Growth equity and buyout opportunities in established businesses.", dealCount: 32 },
  { icon: Shield, title: "Debt Instruments", desc: "Revenue-based financing, convertible notes, and secured lending.", dealCount: 58 },
];

export default function Investments() {
  const [category, setCategory] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = FEATURED_DEALS.filter((d) => {
    const matchCat = !category || d.category === category;
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.industry.toLowerCase().includes(q) || d.location.toLowerCase().includes(q) || d.stage.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const stageColor: Record<string, string> = {
    "Pre-Seed": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Seed": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "Series A": "bg-deep-blue/10 text-deep-blue",
    "Series B": "bg-gold/10 text-gold",
    "Development": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <TrendingUp className="w-3.5 h-3.5" />
              $2.4B+ in Facilitated Investments
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The World's Premium <span className="text-gold">Investment Ecosystem</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Discover high-growth startups, real estate, and alternative investment opportunities curated for accredited investors and institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Access Full Deal Flow
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.MEMBERSHIP}>Investor Memberships</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center py-5 px-3 rounded-xl bg-white/5 border border-white/10">
                <s.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-gold">{s.value}</p>
                <p className="text-white/50 text-xs mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset classes */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Investment Categories</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Diversify across 6 asset classes, all verified and curated by our investment team.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ASSET_CLASSES.map((a) => (
              <div key={a.title} className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <a.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-xs text-muted-foreground">{a.dealCount} active deals</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{a.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Flow */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Featured Investment Opportunities</h2>
              <p className="text-muted-foreground text-sm mt-1">Verified deals across startups, real estate, and alternative assets.</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search deals, sectors, locations..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={CATEGORIES} selected={category} onSelect={setCategory} label="Asset Class" />
          </div>
          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Deals Found" description={`No investment opportunities match "${search}". Adjust your search or reset filters.`} actionLabel="Reset Filters" onAction={() => { setSearchRaw(""); setCategory(""); }} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((deal) => (
                <div key={deal.id} className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{deal.name}</h3>
                      <p className="text-muted-foreground text-sm">{deal.industry} · {deal.location}</p>
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded ${stageColor[deal.stage] ?? "bg-muted text-muted-foreground"}`}>{deal.stage}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Asking</p>
                      <p className="font-bold text-gold">{deal.ask}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Valuation</p>
                      <p className="font-bold text-foreground">{deal.valuation}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">Min. Investment</p>
                      <p className="font-semibold text-foreground text-sm">{deal.minInvestment}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground">ROI Target</p>
                      <p className="font-semibold text-deep-blue text-sm">{deal.roiTarget}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4 bg-muted/30 px-3 py-2 rounded-lg">
                    <span className="font-medium">Traction:</span> {deal.traction}
                  </p>
                  <Button size="sm" variant="outline" className="w-full mt-auto hover:border-gold/50" asChild>
                    <Link to={ROUTES.SIGNUP}>View Full Deal</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
              <Link to={ROUTES.SIGNUP}>
                Unlock All 500+ Deals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-royal-black">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-3">How Investment Works</h2>
            <p className="text-white/50 max-w-xl mx-auto">From discovering opportunities to managing your portfolio — everything in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((h) => (
              <div key={h.step} className="glass-card p-6 rounded-xl">
                <div className="font-display text-3xl font-bold text-gold/30 mb-3">{h.step}</div>
                <h3 className="font-display font-semibold text-white mb-2">{h.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Start Building Your <span className="text-gold">Investment Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join 18,000+ active investors accessing exclusive deal flow on SupremeWorld.
          </p>
          <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-10" asChild>
            <Link to={ROUTES.SIGNUP}>
              Create Investor Profile
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
