import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { Crown, Star, Plane, Calendar, Gift, Shield, ArrowRight, Clock, Phone, Check } from "lucide-react";
import PublicLayout from "@/layouts/PublicLayout";

const SERVICES = [
  { icon: Plane, title: "Private Aviation", desc: "Point-to-point private jet bookings via our vetted operator network. Same-day confirmation on most routes.", tag: "Elite Members" },
  { icon: Calendar, title: "VIP Event Access", desc: "Front-row tickets, VIP tables, and private sections at exclusive summits, galas, and cultural events worldwide.", tag: "Executive+" },
  { icon: Shield, title: "Personal Assistant", desc: "Dedicated 24/7 personal assistant for business logistics, scheduling, vendor coordination, and lifestyle requests.", tag: "Elite Members" },
  { icon: Gift, title: "Corporate Gifting", desc: "Curated luxury gift curation and worldwide delivery for clients, investors, and partners — with personalisation.", tag: "Executive+" },
  { icon: Star, title: "Lifestyle Curation", desc: "Bespoke restaurant reservations, wellness retreats, cultural experiences, and luxury wellness packages.", tag: "Executive+" },
  { icon: Crown, title: "Executive Club", desc: "Access to 120+ private members clubs and business lounges in 40 cities globally. 24/7 club concierge.", tag: "Elite Members" },
  { icon: Clock, title: "Priority Booking", desc: "Guaranteed reservations at fully-booked hotels, restaurants, and venues through our relationships network.", tag: "Executive+" },
  { icon: Phone, title: "Emergency Support", desc: "Round-the-clock emergency assistance for medical, legal, travel disruption, and business crises anywhere.", tag: "All Members" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Request Service", desc: "Submit your request through the dashboard or contact your dedicated relationship manager directly." },
  { step: "02", title: "Concierge Confirms", desc: "Your relationship manager assesses the request and confirms availability within 4 hours (2 hours for Elite)." },
  { step: "03", title: "Execution", desc: "Our global partner network handles every detail of delivery with complete white-glove care." },
  { step: "04", title: "Post-Service Review", desc: "Rate your experience and provide feedback to ensure continuous improvement of our service delivery." },
];

const TESTIMONIALS = [
  { name: "Lord James Thornton", role: "Managing Partner, Apex Capital", quote: "My relationship manager arranged a last-minute private flight to Geneva, a dinner at Michelin-starred Michel Roux, and a meeting room at a private club — all in 6 hours. Extraordinary.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=james_c&backgroundColor=b6e3f4" },
  { name: "Priya Kapoor", role: "CEO, TechBridge Asia", quote: "The corporate gifting service is impeccable. Personalised luxury hampers arrived at 12 partner offices across 5 countries simultaneously for our company anniversary.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya_c&backgroundColor=ffd5dc" },
  { name: "Faisal Al-Rashid", role: "Family Office Director", quote: "SupremeWorld Concierge manages my entire executive schedule, travel coordination, and lifestyle calendar. It's as if I have a world-class chief of staff.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=faisal_c&backgroundColor=d1d4f9" },
];

const MEMBERSHIP_CTA = [
  { plan: "Executive", price: "$149/mo", features: ["Basic concierge services", "VIP event access", "Corporate gifting", "Priority booking", "Lifestyle curation"] },
  { plan: "Elite", price: "$499/mo", features: ["Dedicated relationship manager", "Private aviation booking", "24/7 personal assistant", "Emergency support", "Executive club access", "Full white-glove service"] },
];

export default function Concierge() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 bg-royal-black">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
              <Crown className="w-3.5 h-3.5" />
              White-Glove Lifestyle Management
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Premium <span className="text-gold">Concierge</span><br />Services
            </h1>
            <p className="text-white/60 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Exclusive white-glove lifestyle and business support for high-net-worth individuals and executives. Every detail, perfectly handled.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8" asChild>
                <Link to={ROUTES.MEMBERSHIP}>
                  Unlock Concierge Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <Link to={ROUTES.PRICING}>Compare Plans</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {[
              { v: "4,200+", l: "Requests Fulfilled" },
              { v: "98%", l: "Satisfaction Rate" },
              { v: "4-hr", l: "Avg. Response Time" },
              { v: "120+", l: "Global Partners" },
            ].map((s) => (
              <div key={s.l} className="text-center py-4 px-2 rounded-xl bg-white/5 border border-white/10">
                <p className="font-display text-2xl font-bold text-gold">{s.v}</p>
                <p className="text-white/50 text-xs mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Concierge Services</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A comprehensive portfolio of luxury and business support services available to Executive and Elite members.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <s.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
                <span className={`mt-3 self-start text-xs px-2 py-0.5 rounded-full font-medium ${s.tag === "Elite Members" ? "bg-gold/10 text-gold" : s.tag === "Executive+" ? "bg-deep-blue/10 text-deep-blue" : "bg-success/10 text-success"}`}>{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">How Concierge Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A seamless process from request to fulfilment — handled by professionals you can trust.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((h) => (
              <div key={h.step} className="p-6 rounded-xl border border-border bg-card text-center">
                <div className="font-display text-3xl font-bold text-gold/40 mb-3">{h.step}</div>
                <h3 className="font-display font-semibold text-foreground mb-2">{h.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-2">What Elite Members Say</h2>
            <p className="text-white/40">First-hand accounts from our premium concierge clients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card p-6 rounded-xl flex flex-col">
                <p className="text-white/80 text-sm leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/10">
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

      {/* Membership tiers for concierge */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Access Concierge Services</h2>
            <p className="text-muted-foreground">Available to Executive and Elite membership tiers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MEMBERSHIP_CTA.map((m, i) => (
              <div key={m.plan} className={`p-6 rounded-xl border-2 ${i === 1 ? "border-gold bg-card ring-1 ring-gold/20 shadow-lg" : "border-border bg-card"}`}>
                {i === 1 && (
                  <div className="inline-block px-3 py-0.5 bg-gold text-royal-black text-xs font-bold rounded-full mb-3">Full Concierge</div>
                )}
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{m.plan}</h3>
                <p className="font-display text-2xl font-bold text-gold mb-4">{m.price}</p>
                <ul className="space-y-2 mb-6">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={`w-full font-semibold ${i === 1 ? "bg-gold text-royal-black hover:bg-gold/90" : ""}`} variant={i === 1 ? "default" : "outline"} asChild>
                  <Link to={ROUTES.SIGNUP}>Start {m.plan} Plan</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
