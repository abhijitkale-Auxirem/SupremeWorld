import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Calendar, MapPin, Users, ArrowRight, Globe, Video, Star, Clock, Filter } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATS = [
  { value: "summit", label: "Summit" },
  { value: "conference", label: "Conference" },
  { value: "meetup", label: "Meetup" },
  { value: "virtual", label: "Virtual" },
  { value: "gala", label: "Gala" },
  { value: "workshop", label: "Workshop" },
];

const EVENTS = [
  { id: 1, title: "Global Entrepreneur Summit 2026", type: "summit", date: "Aug 15–17, 2026", location: "Dubai, UAE", attendees: 1200, capacity: 1500, isFree: false, price: "$299", featured: true, speakers: 42, description: "Three days of intensive networking, keynotes from global CEOs, and workshop sessions on scaling, funding, and global expansion." },
  { id: 2, title: "SupremeWorld Investor Forum", type: "conference", date: "Sep 8–9, 2026", location: "London, UK", attendees: 800, capacity: 1000, isFree: false, price: "$199", featured: true, speakers: 28, description: "Deal presentations, fund manager panels, LP networking, and portfolio review sessions with leading fund managers." },
  { id: 3, title: "African Tech & Business Meetup", type: "meetup", date: "Jul 22, 2026", location: "Lagos, Nigeria", attendees: 400, capacity: 500, isFree: true, price: "Free", featured: false, speakers: 12, description: "Connect with Africa's fastest-growing tech founders, investors, and ecosystem builders in an intimate networking environment." },
  { id: 4, title: "Executive Leadership Webinar", type: "virtual", date: "Jul 10, 2026", location: "Online", attendees: 3000, capacity: 5000, isFree: true, price: "Free", featured: false, speakers: 6, description: "Live interactive webinar featuring Fortune 500 C-suite leaders sharing insights on leadership in the modern era." },
  { id: 5, title: "SupremeWorld Annual Gala", type: "gala", date: "Dec 5, 2026", location: "Singapore", attendees: 500, capacity: 600, isFree: false, price: "$599", featured: true, speakers: 15, description: "The most exclusive evening in the SupremeWorld calendar. Black-tie networking, awards ceremony, and premium entertainment." },
  { id: 6, title: "Women in Business Summit", type: "conference", date: "Oct 18, 2026", location: "New York, USA", attendees: 650, capacity: 800, isFree: false, price: "$149", featured: false, speakers: 20, description: "Celebrating and empowering women entrepreneurs, investors, and executives driving global business transformation." },
  { id: 7, title: "Asia-Pacific Investment Masterclass", type: "workshop", date: "Aug 28, 2026", location: "Singapore", attendees: 150, capacity: 200, isFree: false, price: "$399", featured: false, speakers: 8, description: "Intensive workshop covering APAC investment landscape, deal sourcing strategies, and due diligence frameworks." },
  { id: 8, title: "Creator Economy Summit", type: "summit", date: "Sep 25, 2026", location: "Los Angeles, USA", attendees: 900, capacity: 1200, isFree: false, price: "$199", featured: false, speakers: 35, description: "The definitive event for content creators, brand marketers, and platform economy professionals." },
  { id: 9, title: "Global Real Estate Forum", type: "conference", date: "Nov 12, 2026", location: "Dubai, UAE", attendees: 600, capacity: 750, isFree: false, price: "$249", featured: false, speakers: 22, description: "International real estate investment trends, commercial development panel, and luxury market outlook." },
];

const PAST_HIGHLIGHTS = [
  { event: "SupremeWorld Annual Summit 2025", outcome: "1,400 attendees, 280 deals initiated, $120M in investment pledges." },
  { event: "Global Investor Forum 2025", outcome: "900 investors, 64 startup presentations, 12 funded within 90 days." },
  { event: "Africa Business Gala 2025", outcome: "500 executives, 3 major partnership announcements, 40 media features." },
];

export default function Events() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = EVENTS.filter((e) => {
    const matchCat = !cat || e.type === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.type.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const spotsPct = (a: number, c: number) => Math.round((a / c) * 100);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Calendar className="w-3.5 h-3.5" />
              1,200+ Events Hosted Globally
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Events Built for <span className="text-gold">Global Leaders</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              World-class summits, exclusive galas, investor forums, and workshops designed to accelerate your network, deals, and growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Register for Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.MEMBERSHIP}>VIP Event Access</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-3xl mx-auto">
            {[
              { v: "1,200+", l: "Events Hosted" },
              { v: "28", l: "Countries" },
              { v: "180K+", l: "Total Attendees" },
              { v: "4.9/5", l: "Avg. Rating" },
            ].map((s) => (
              <div key={s.l} className="text-center py-4 px-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured events (large cards) */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">Flagship Events 2026</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {EVENTS.filter((e) => e.featured).map((ev) => (
              <div key={ev.id} className="rounded-xl border border-gold/30 bg-card ring-1 ring-gold/10 shadow-md hover:shadow-lg transition-all flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold rounded capitalize">{ev.type}</span>
                    <span className={`text-sm font-bold ${ev.isFree ? "text-success" : "text-gold"}`}>{ev.price}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-3 leading-snug text-lg">{ev.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{ev.description}</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />{ev.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{ev.location}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" />{ev.attendees.toLocaleString()} / {ev.capacity.toLocaleString()} registered</div>
                    <div className="flex items-center gap-2"><Star className="w-4 h-4 text-gold" />{ev.speakers} confirmed speakers</div>
                  </div>
                  {/* capacity bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>Registration</span>
                      <span>{spotsPct(ev.attendees, ev.capacity)}% filled</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-muted">
                      <div className="h-1.5 rounded-full bg-gold" style={{ width: `${spotsPct(ev.attendees, ev.capacity)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Button size="sm" className="w-full bg-gold text-royal-black hover:bg-gold/90 font-semibold" asChild>
                    <Link to={ROUTES.SIGNUP}>Register Now</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* All Events */}
          <div className="mb-8 mt-14 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">All Upcoming Events</h2>
              <p className="text-muted-foreground text-sm mt-1">Showing {filtered.length} events</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search events..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Event Type" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Events Found" description={`No events match "${search}". Try a different search or reset the filter.`} actionLabel="Reset Filters" onAction={() => { setSearchRaw(""); setCat(""); }} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((ev) => (
                <div key={ev.id} className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-semibold rounded capitalize">{ev.type}</span>
                    <span className={`text-sm font-bold ${ev.isFree ? "text-success" : "text-gold"}`}>{ev.price}</span>
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-3 leading-snug flex-1">{ev.title}</h3>
                  <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" />{ev.date}</div>
                    <div className="flex items-center gap-2">
                      {ev.location === "Online" ? <Video className="w-3.5 h-3.5 text-deep-blue" /> : <MapPin className="w-3.5 h-3.5" />}
                      {ev.location}
                    </div>
                    <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" />{ev.attendees.toLocaleString()} attending</div>
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />{ev.speakers} speakers</div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-auto hover:border-gold/50" asChild>
                    <Link to={ROUTES.SIGNUP}>Register Now</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past highlights */}
      <section className="py-20 bg-royal-black">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white mb-2">Event Highlights</h2>
            <p className="text-white/50">Outcomes from our most recent signature events.</p>
          </div>
          <div className="space-y-4">
            {PAST_HIGHLIGHTS.map((h) => (
              <div key={h.event} className="glass-card p-5 rounded-xl flex flex-col sm:flex-row gap-4">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white">{h.event}</p>
                  <p className="text-white/60 text-sm mt-1">{h.outcome}</p>
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
            Your Next Breakthrough <span className="text-gold">Starts at an Event</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">Register for upcoming events and connect with leaders who are building the future.</p>
          <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-10" asChild>
            <Link to={ROUTES.SIGNUP}>
              Browse All Events
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
