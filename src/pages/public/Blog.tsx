import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Clock, User, Tag, ArrowRight, BookOpen, TrendingUp, Search, Calendar, ChevronRight } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATS = [
  { value: "business", label: "Business" },
  { value: "investment", label: "Investment" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "tech", label: "Technology" },
  { value: "leadership", label: "Leadership" },
];

const POSTS = [
  { id: 1, title: "The Future of Global Networking in the AI Era", category: "business", author: "SupremeWorld Editorial", date: "Jun 8, 2026", readTime: "6 min", excerpt: "How artificial intelligence is transforming the way entrepreneurs and investors forge meaningful cross-border connections.", featured: true, img: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop` },
  { id: 2, title: "10 Investment Opportunities Emerging in Africa 2026", category: "investment", author: "David Osei", date: "Jun 5, 2026", readTime: "8 min", excerpt: "A deep dive into the most promising sectors for capital deployment across the African continent this year.", featured: true, img: `https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=800&q=80&auto=format&fit=crop` },
  { id: 3, title: "Building Your Personal Brand as an Executive", category: "leadership", author: "Priya Sharma", date: "Jun 1, 2026", readTime: "5 min", excerpt: "Proven strategies for positioning yourself as a sought-after thought leader and authority in your field.", featured: true, img: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop` },
  { id: 4, title: "Luxury Travel Trends for HNW Professionals in 2026", category: "lifestyle", author: "Concierge Team", date: "May 28, 2026", readTime: "4 min", excerpt: "The destinations, experiences, and private aviation routes defining premium executive travel this year.", featured: false, img: `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop` },
  { id: 5, title: "How Blockchain is Reshaping Alternative Investments", category: "tech", author: "Tech Desk", date: "May 22, 2026", readTime: "7 min", excerpt: "Understanding tokenized assets, on-chain real estate, and their expanding role in sophisticated investment portfolios.", featured: false, img: `https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80&auto=format&fit=crop` },
  { id: 6, title: "The Art of Strategic Partnership Formation", category: "business", author: "James Thornton", date: "May 18, 2026", readTime: "6 min", excerpt: "A proven framework for identifying, approaching, and securing transformative business partnerships across borders.", featured: false, img: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop` },
  { id: 7, title: "VC Fundraising Playbook: Series A in 2026", category: "investment", author: "Carlos Rivera", date: "May 12, 2026", readTime: "10 min", excerpt: "What investors are actually looking for in 2026, and how to structure your round for maximum traction.", featured: false, img: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop` },
  { id: 8, title: "AI Tools Every Executive Should Be Using", category: "tech", author: "SupremeWorld Editorial", date: "May 8, 2026", readTime: "5 min", excerpt: "From decision intelligence to automated research, the AI stack transforming executive productivity in 2026.", featured: false, img: `https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop` },
  { id: 9, title: "The Rise of the Creator Economy in B2B", category: "business", author: "Sana Al-Farsi", date: "Apr 30, 2026", readTime: "6 min", excerpt: "How thought leadership content is becoming the most efficient lead generation tool for B2B businesses in 2026.", featured: false, img: `https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&auto=format&fit=crop` },
];

export default function Blog() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = POSTS.filter((p) => {
    const matchCat = !cat || p.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = POSTS.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Business Intelligence & Insights
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              SupremeWorld <span className="text-gold">Insights</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-6">
              Business intelligence, investment trends, executive leadership, and lifestyle editorial from our global community of practitioners.
            </p>
            <SearchBar onSearch={setSearchRaw} placeholder="Search articles, topics, authors..." className="max-w-md mx-auto" />
          </div>
        </div>
      </section>

      {/* Featured articles */}
      {!search && !cat && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Large featured */}
              <article className="lg:col-span-2 rounded-xl overflow-hidden border border-gold/20 bg-card hover:shadow-lg transition-all group cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img src={featured[0].img} alt={featured[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute top-4 left-4 px-2 py-0.5 bg-gold/90 text-royal-black text-xs font-bold rounded capitalize">{featured[0].category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 leading-snug">{featured[0].title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{featured[0].excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{featured[0].author}</span>
                    <span className="flex items-center gap-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured[0].date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured[0].readTime}</span>
                    </span>
                  </div>
                  <Button size="sm" variant="outline" className="mt-4 hover:border-gold/50" asChild>
                    <Link to={ROUTES.SIGNUP}>Read Article <ChevronRight className="w-3.5 h-3.5 ml-1" /></Link>
                  </Button>
                </div>
              </article>

              {/* Side featured stack */}
              <div className="space-y-5">
                {featured.slice(1, 3).map((p) => (
                  <article key={p.id} className="rounded-xl overflow-hidden border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group cursor-pointer flex flex-col">
                    <div className="relative h-32 overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-2 left-3 px-2 py-0.5 bg-black/60 text-gold text-xs font-semibold rounded capitalize">{p.category}</span>
                    </div>
                    <div className="p-4 flex-1">
                      <h3 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug">{p.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center gap-1"><User className="w-3 h-3" />{p.author}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All articles */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                {search ? `Results for "${search}"` : "All Articles"}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Topics" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Articles Found" description={`No articles match "${search}". Try a different keyword or clear the topic filter.`} actionLabel="Clear Filters" onAction={() => { setSearchRaw(""); setCat(""); }} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(search || cat ? filtered : regular).map((p) => (
                <article key={p.id} className="rounded-xl overflow-hidden border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group cursor-pointer flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-gold text-xs font-semibold rounded capitalize">{p.category}</span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display font-semibold text-foreground mb-2 leading-snug flex-1">{p.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">{p.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{p.author}</span>
                      <span className="flex items-center gap-2">
                        <span>{p.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.readTime}</span>
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" className="mt-3 self-start h-8 px-2 text-gold hover:text-gold hover:bg-gold/10 -ml-2" asChild>
                      <Link to={ROUTES.SIGNUP}>Read More <ChevronRight className="w-3.5 h-3.5 ml-0.5" /></Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-2xl mx-auto text-center">
          <TrendingUp className="w-10 h-10 text-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Stay Ahead of the Curve</h2>
          <p className="text-muted-foreground mb-6">Join 48,000+ professionals receiving our weekly business intelligence digest — investment trends, platform updates, and curated reads.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light whitespace-nowrap">Subscribe</Button>
          </div>
          <p className="text-muted-foreground text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </PublicLayout>
  );
}
