import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Star, ShoppingBag, ArrowRight, Shield, TrendingUp, Package, Tag, Search } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATS = [
  { value: "digital", label: "Digital Products" },
  { value: "service", label: "Services" },
  { value: "luxury", label: "Luxury Goods" },
  { value: "subscription", label: "Subscriptions" },
  { value: "template", label: "Templates" },
];

const PRODUCTS = [
  { id: 1, title: "Executive Pitch Deck Template Suite", category: "template", price: 149, priceLabel: "$149", rating: 4.9, reviews: 214, seller: "PitchPro Agency", badge: "Best Seller", desc: "50+ slide templates used by funded founders. Includes financial model sheets." },
  { id: 2, title: "Brand Strategy Consultation (3hr)", category: "service", price: 499, priceLabel: "$499", rating: 5.0, reviews: 87, seller: "StrategyLab", badge: "Top Rated", desc: "3-hour deep-dive brand positioning session with a senior strategist." },
  { id: 3, title: "Business Valuation Report", category: "digital", price: 299, priceLabel: "$299", rating: 4.7, reviews: 156, seller: "FinancialEdge", badge: null, desc: "Detailed DCF and comparable analysis report for your business or startup." },
  { id: 4, title: "AI Marketing Automation Suite", category: "subscription", price: 99, priceLabel: "$99/mo", rating: 4.8, reviews: 342, seller: "AutoMark AI", badge: "New", desc: "Full marketing automation: email sequences, social scheduling, and analytics." },
  { id: 5, title: "Premium Business Card Design", category: "service", price: 75, priceLabel: "$75", rating: 4.6, reviews: 512, seller: "DesignElite", badge: null, desc: "Custom luxury business card design with 3 concepts and unlimited revisions." },
  { id: 6, title: "Luxury Corporate Gift Package", category: "luxury", price: 350, priceLabel: "$350", rating: 4.9, reviews: 63, seller: "LuxeGifts", badge: "Premium", desc: "Curated premium gift sets for clients and partners — worldwide delivery." },
  { id: 7, title: "Investor Outreach Email Templates", category: "template", price: 89, priceLabel: "$89", rating: 4.7, reviews: 198, seller: "FundingEdge", badge: null, desc: "Battle-tested cold outreach templates proven to generate investor meetings." },
  { id: 8, title: "CRM & Sales Pipeline Setup", category: "service", price: 599, priceLabel: "$599", rating: 4.9, reviews: 44, seller: "ScaleOps", badge: "Top Rated", desc: "Professional CRM configuration, pipeline design, and team training session." },
  { id: 9, title: "Luxury Leather Executive Briefcase", category: "luxury", price: 890, priceLabel: "$890", rating: 4.8, reviews: 27, seller: "LuxeGifts", badge: "Limited", desc: "Hand-stitched full-grain leather executive briefcase with name engraving." },
  { id: 10, title: "Startup Legal Docs Bundle", category: "digital", price: 249, priceLabel: "$249", rating: 4.6, reviews: 89, seller: "LegallyFounded", badge: null, desc: "Co-founder agreement, SAFE note, NDA, advisory agreement, and more." },
  { id: 11, title: "Social Media Growth Membership", category: "subscription", price: 49, priceLabel: "$49/mo", rating: 4.5, reviews: 621, seller: "GrowthHive", badge: "Popular", desc: "Monthly content calendar, caption templates, and analytics reporting." },
  { id: 12, title: "Executive Coaching Session (90min)", category: "service", price: 450, priceLabel: "$450", rating: 5.0, reviews: 31, seller: "PeakPerform", badge: "Top Rated", desc: "One-on-one executive coaching with a certified C-suite leadership coach." },
];

const TRUST_FEATURES = [
  { icon: Shield, title: "Verified Sellers", desc: "Every seller is background-verified before listing on the marketplace." },
  { icon: Star, title: "Buyer Protection", desc: "100% refund guarantee if the delivered product does not meet the description." },
  { icon: TrendingUp, title: "Secure Transactions", desc: "Bank-grade encryption and escrow payment protection on every order." },
  { icon: Package, title: "Fast Delivery", desc: "Digital products delivered instantly. Physical goods shipped globally within 72 hours." },
];

export default function Marketplace() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");

  let filtered = PRODUCTS.filter((p) => {
    const matchCat = !cat || p.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.seller.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  const badgeColor: Record<string, string> = {
    "Best Seller": "bg-gold/10 text-gold",
    "Top Rated": "bg-success/10 text-success",
    "New": "bg-deep-blue/10 text-deep-blue",
    "Premium": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "Limited": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    "Popular": "bg-gold/10 text-gold",
  };

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <ShoppingBag className="w-3.5 h-3.5" />
              2,400+ Verified Products & Services
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              The <span className="text-gold">Premium Marketplace</span><br />for Business Excellence
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Buy and sell premium digital products, professional services, luxury goods, and subscriptions with verified global sellers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.SIGNUP}>Become a Seller</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
            {[
              { v: "2,400+", l: "Products Listed" },
              { v: "840+", l: "Verified Sellers" },
              { v: "28K+", l: "Orders Completed" },
              { v: "4.8/5", l: "Avg. Rating" },
            ].map((s) => (
              <div key={s.l} className="text-center py-4 px-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust features */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{f.title}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">All Products & Services</h2>
              <p className="text-muted-foreground text-sm mt-1">Showing {filtered.length} results</p>
            </div>
            <div className="flex gap-3 flex-wrap items-center">
              <SearchBar onSearch={setSearchRaw} placeholder="Search marketplace..." className="max-w-xs" />
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm text-muted-foreground">
                <Tag className="w-3.5 h-3.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="bg-transparent text-sm text-foreground focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Category" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Products Found" description={`No products match "${search}". Try a different keyword or clear the filters.`} actionLabel="Clear Filters" onAction={() => { setSearchRaw(""); setCat(""); }} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => (
                <div key={p.id} className="p-5 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all flex flex-col group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded capitalize">{p.category}</span>
                    {p.badge && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[p.badge] ?? "bg-muted text-muted-foreground"}`}>{p.badge}</span>}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1.5 leading-snug flex-1 text-sm">{p.title}</h3>
                  <p className="text-muted-foreground text-xs mb-2 leading-relaxed line-clamp-2">{p.desc}</p>
                  <p className="text-muted-foreground text-xs mb-3">by <span className="text-foreground font-medium">{p.seller}</span></p>
                  <div className="flex items-center gap-1 text-sm mb-3">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span className="font-semibold text-foreground">{p.rating}</span>
                    <span className="text-muted-foreground text-xs">({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-gold text-base">{p.priceLabel}</span>
                    <Button size="sm" variant="outline" className="h-8 text-xs hover:border-gold/50" asChild>
                      <Link to={ROUTES.SIGNUP}>Buy Now</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
              <Link to={ROUTES.SIGNUP}>
                Explore Full Marketplace
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seller CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Sell to 150,000+ Global Buyers</h2>
            <p className="text-muted-foreground mb-6">List your products, services, or expertise and reach a premium audience of entrepreneurs, investors, and executives.</p>
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light" asChild>
              <Link to={ROUTES.SIGNUP}>
                Become a Seller
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
