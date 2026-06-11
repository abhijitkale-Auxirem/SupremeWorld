import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Plane, MapPin, Globe, Shield, ArrowRight, Clock, Star, Check } from "lucide-react";
import CategorySection from "@/components/common/CategorySection";
import SearchBar from "@/components/common/SearchBar";
import EmptyState from "@/components/common/EmptyState";
import PublicLayout from "@/layouts/PublicLayout";
import { useDebounce } from "@/hooks/useDebounce";

const CATS = [
  { value: "business-hub", label: "Business Hubs" },
  { value: "luxury", label: "Luxury Destinations" },
  { value: "relocation", label: "Relocation" },
  { value: "events", label: "Event Cities" },
];

const DESTINATIONS = [
  { id: 1, city: "Dubai", country: "UAE", type: "business-hub", tag: "Global Business Hub", rating: 4.9, visaEase: "E-Visa Available", avgStay: "5–7 days", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", highlights: ["DIFC Finance District", "Expo City", "Free Zone Setup", "Elite Networking Events"] },
  { id: 2, city: "Singapore", country: "Singapore", type: "business-hub", tag: "Innovation Capital", rating: 4.9, visaEase: "Visa-Free (many passports)", avgStay: "5–7 days", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80", highlights: ["Marina Bay Sands", "Fintech Hub", "APAC HQ City", "Startup Ecosystem"] },
  { id: 3, city: "London", country: "UK", type: "business-hub", tag: "Financial Centre", rating: 4.8, visaEase: "eTA / Visa Required", avgStay: "7–10 days", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", highlights: ["City of London", "Tech City (Shoreditch)", "Private Equity Hub", "Global Law Firms"] },
  { id: 4, city: "New York", country: "USA", type: "business-hub", tag: "Tech & Finance", rating: 4.8, visaEase: "ESTA / Visa Required", avgStay: "7–10 days", img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80", highlights: ["Wall Street", "Silicon Alley", "Midtown HQs", "Investor Network"] },
  { id: 5, city: "Tokyo", country: "Japan", type: "luxury", tag: "Innovation & Luxury", rating: 4.8, visaEase: "E-Visa Available", avgStay: "7–12 days", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", highlights: ["Roppongi Hills", "Shinjuku Business District", "Premium Hotels", "Cultural Experiences"] },
  { id: 6, city: "Lagos", country: "Nigeria", type: "business-hub", tag: "Africa's Tech City", rating: 4.6, visaEase: "Visa on Arrival", avgStay: "4–7 days", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", highlights: ["Victoria Island", "Eko Atlantic", "Yaba Tech Hub", "Emerging Market Leaders"] },
  { id: 7, city: "Zurich", country: "Switzerland", type: "luxury", tag: "Wealth Management Hub", rating: 4.9, visaEase: "Schengen Visa", avgStay: "3–5 days", img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&q=80", highlights: ["Private Banking District", "Lake Zurich", "World Economic Forum", "Family Office Network"] },
  { id: 8, city: "Nairobi", country: "Kenya", type: "relocation", tag: "East Africa Gateway", rating: 4.7, visaEase: "E-Visa Available", avgStay: "7–14 days", img: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=600&q=80", highlights: ["Silicon Savannah", "WTO / UN HQ", "East Africa HQ City", "Tech Ecosystem"] },
  { id: 9, city: "Paris", country: "France", type: "events", tag: "Luxury & Commerce", rating: 4.8, visaEase: "Schengen Visa", avgStay: "5–8 days", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", highlights: ["La Défense Business District", "Fashion Week HQ", "LVMH & Luxury Brands", "Major Summits"] },
];

const SERVICES = [
  { icon: Plane, title: "Private Jet Booking", desc: "Point-to-point private aviation globally with vetted operators and dedicated concierge coordination." },
  { icon: Globe, title: "Visa Assistance", desc: "Expert guidance on business and residence visas, work permits, and international relocation." },
  { icon: Shield, title: "Travel Insurance", desc: "Premium international health and trip protection tailored for frequent executive travelers." },
  { icon: MapPin, title: "Relocation Services", desc: "Full-service destination setup for executives relocating globally — housing, schools, legal, and banking." },
  { icon: Star, title: "VIP Transfers", desc: "Chauffeur-driven airport transfers, luxury vehicle hire, and yacht charters in key cities." },
  { icon: Clock, title: "Itinerary Planning", desc: "Bespoke multi-city business trip planning with meetings coordination and cultural briefings." },
];

export default function Travel() {
  const [cat, setCat] = useState("");
  const [searchRaw, setSearchRaw] = useState("");
  const search = useDebounce(searchRaw, 300);

  const filtered = DESTINATIONS.filter((d) => {
    const matchCat = !cat || d.type === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || d.city.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Plane className="w-3.5 h-3.5" />
              Luxury Travel for Global Executives
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Travel & <span className="text-gold">Global Mobility</span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              Luxury travel planning, private aviation, visa assistance, and executive relocation — everything the world's most mobile professionals need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.SIGNUP}>
                  Plan Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.CONCIERGE}>Concierge Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Travel Services</h2>
            <p className="text-muted-foreground">Premium travel support for every aspect of executive mobility.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="flex gap-4 p-5 rounded-xl bg-card border border-border hover:border-gold/40 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="mb-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Top Business Destinations</h2>
              <p className="text-muted-foreground text-sm mt-1">Handpicked cities for executive travel, business events, and relocation.</p>
            </div>
            <SearchBar onSearch={setSearchRaw} placeholder="Search destinations..." className="max-w-xs" />
          </div>
          <div className="mb-6">
            <CategorySection categories={CATS} selected={cat} onSelect={setCat} label="Destination Type" />
          </div>

          {filtered.length === 0 ? (
            <EmptyState type="search" title="No Destinations Found" description={`No destinations match "${search}". Try a different search term.`} actionLabel="Clear Search" onAction={() => { setSearchRaw(""); setCat(""); }} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((d) => (
                <div key={d.city} className="rounded-xl overflow-hidden border border-border bg-card hover:shadow-lg hover:border-gold/40 transition-all group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={d.img} alt={d.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <p className="text-white font-display font-bold text-xl">{d.city}</p>
                      <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {d.country}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 bg-black/60 text-gold text-xs font-semibold rounded">{d.tag}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                        <span className="font-semibold text-foreground">{d.rating}</span>
                      </span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{d.avgStay}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded">{d.visaEase}</span>
                    </div>
                    <ul className="space-y-1 mb-4">
                      {d.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-3 h-3 text-success flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <Button size="sm" variant="outline" className="w-full flex items-center gap-2 hover:border-gold/50" asChild>
                      <Link to={ROUTES.SIGNUP}>
                        <Plane className="w-3.5 h-3.5" />
                        Plan Trip to {d.city}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Travel guide */}
      <section className="py-16 bg-royal-black">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-white mb-3">Why SupremeWorld Travel?</h2>
            <p className="text-white/50">We handle every detail so you can focus on business.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Dedicated Travel Concierge", desc: "Assigned travel manager available 24/7 for all bookings, changes, and emergency support." },
              { title: "100+ Airline Partnerships", desc: "Preferential rates and upgrade priority across major international carriers and private operators." },
              { title: "Global Property Network", desc: "Access to 4,000+ luxury hotels, private villas, and executive serviced apartments worldwide." },
            ].map((t) => (
              <div key={t.title} className="glass-card p-6 rounded-xl">
                <h3 className="font-display font-semibold text-white mb-2">{t.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Travel Like an <span className="text-gold">Executive</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Access premium travel planning, private aviation, and global mobility services as an Executive or Elite member.
          </p>
          <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-10" asChild>
            <Link to={ROUTES.SIGNUP}>
              Access Travel Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
