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
import { POSTS } from "./BlogArticle";

const CATS = [
  { value: "business", label: "Business" },
  { value: "investment", label: "Investment" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "tech", label: "Technology" },
  { value: "leadership", label: "Leadership" },
];

export default function Blog() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = POSTS.filter((p) => {
    const matchCat = !cat || p.category === cat;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q);
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
            <div className="animate-fade-in-down delay-100 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              Business Intelligence & Insights
            </div>
            <h1 className="animate-hero-text delay-200 font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              SupremeWorld <span className="gold-text-shimmer">Insights</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-6">
              Business intelligence, investment trends, executive leadership, and lifestyle editorial from our global community of practitioners.
            </p>
            <SearchBar
              onSearch={setSearchRaw}
              placeholder="Search articles, topics, authors..."
              className="max-w-md mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Featured articles */}
      {!search && !cat && (
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Large featured */}
              <article className="lg:col-span-2 animate-fade-in-left hover-lift rounded-xl overflow-hidden border border-gold/20 bg-card hover:shadow-xl transition-all group">
                <Link to={`/blog/${featured[0].id}`} className="block">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={featured[0].img}
                      alt={featured[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute top-4 left-4 px-2 py-0.5 bg-gold/90 text-royal-black text-xs font-bold rounded capitalize">
                      {featured[0].category}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2 leading-snug group-hover:text-gold transition-colors">
                      {featured[0].title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {featured[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {featured[0].author}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {featured[0].date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featured[0].readTime}
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-5">
                  <Button size="sm" variant="outline" className="hover:border-gold/50 hover:text-gold" asChild>
                    <Link to={`/blog/${featured[0].id}`}>
                      Read Full Article <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </article>

              {/* Side featured stack */}
              <div className="space-y-5 stagger-children">
                {featured.slice(1, 3).map((p) => (
                  <article
                    key={p.id}
                    className="animate-fade-in-right hover-lift rounded-xl overflow-hidden border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group flex flex-col"
                  >
                    <Link to={`/blog/${p.id}`} className="block">
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <span className="absolute top-2 left-3 px-2 py-0.5 bg-black/60 text-gold text-xs font-semibold rounded capitalize">
                          {p.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-display font-semibold text-foreground text-sm mb-1 leading-snug group-hover:text-gold transition-colors">
                          {p.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {p.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {p.readTime}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <Button size="sm" variant="ghost" className="h-7 px-2 text-xs text-gold hover:text-gold hover:bg-gold/10 -ml-2" asChild>
                        <Link to={`/blog/${p.id}`}>Read Article <ArrowRight className="w-3 h-3 ml-0.5" /></Link>
                      </Button>
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
              <p className="text-muted-foreground text-sm mt-1">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Topics" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              type="search"
              title="No Articles Found"
              description={`No articles match "${search}". Try a different keyword or clear the topic filter.`}
              actionLabel="Clear Filters"
              onAction={() => {
                setSearchRaw("");
                setCat("");
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
              {(search || cat ? filtered : regular).map((p) => (
                <article
                  key={p.id}
                  className="animate-fade-in-up hover-lift rounded-xl overflow-hidden border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group flex flex-col"
                >
                  <Link to={`/blog/${p.id}`} className="block">
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 text-gold text-xs font-semibold rounded capitalize">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-foreground mb-2 leading-snug group-hover:text-gold transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
                        {p.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {p.author}
                        </span>
                        <span className="flex items-center gap-2">
                          <span>{p.date}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {p.readTime}
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-5 pb-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2 text-gold hover:text-gold hover:bg-gold/10 -ml-2"
                      asChild
                    >
                      <Link to={`/blog/${p.id}`}>
                        Read Full Article <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </Link>
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
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">
            Stay Ahead of the Curve
          </h2>
          <p className="text-muted-foreground mb-6">
            Join 48,000+ professionals receiving our weekly business intelligence digest — investment trends, platform updates, and curated reads.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button className="bg-royal-black text-gold border border-gold hover:bg-royal-black/90 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-muted-foreground text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </PublicLayout>
  );
}
