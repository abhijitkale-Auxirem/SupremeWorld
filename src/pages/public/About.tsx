import { Link } from "react-router-dom";
import { Globe, Target, Users, Zap, Award, TrendingUp, Heart, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PublicLayout from "@/layouts/PublicLayout";
import { ROUTES } from "@/constants/routes";
import heroBg from "@/assets/images/hero-bg.jpg";

const VALUES = [
  { icon: Globe, title: "Global Reach", desc: "We believe borders should never limit ambition. Our platform spans 80+ countries, connecting minds that change the world." },
  { icon: Target, title: "Precision Matchmaking", desc: "AI-powered intelligence matches you with the right people, deals, and opportunities based on your unique goals." },
  { icon: Users, title: "Curated Community", desc: "Every member is verified. Quality over quantity — we build relationships, not just connections." },
  { icon: Zap, title: "Real Outcomes", desc: "From $2.4B+ in facilitated investments to thousands of partnerships — we measure success by yours." },
  { icon: Heart, title: "Member First", desc: "Every feature, every update, every decision starts with one question: Does this genuinely help our members?" },
  { icon: Shield, title: "Trust & Security", desc: "Enterprise-grade security, GDPR compliance, and rigorous member verification protect your data and relationships." },
];

const TEAM = [
  { name: "Kwame Asante", role: "Co-Founder & CEO", region: "Ghana / UAE", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=kwame_ceo&backgroundColor=b6e3f4" },
  { name: "Mei Lin Zhang", role: "Chief Technology Officer", region: "Singapore", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=meilin_cto&backgroundColor=d1d4f9" },
  { name: "Sarah Mitchell", role: "Chief Operating Officer", region: "London, UK", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah_coo&backgroundColor=c0aede" },
  { name: "Faisal Al-Rashid", role: "Chief Investment Officer", region: "Dubai, UAE", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=faisal_cio&backgroundColor=ffd5dc" },
  { name: "Priya Sharma", role: "VP of Global Partnerships", region: "Mumbai, India", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya_vp&backgroundColor=b6e3f4" },
  { name: "Marcus Thompson", role: "VP of Product", region: "New York, USA", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus_vp&backgroundColor=d1d4f9" },
];

const MILESTONES = [
  { year: "2021", title: "Founded", desc: "SupremeWorld launched as a premium networking platform connecting entrepreneurs and investors." },
  { year: "2022", title: "Global Expansion", desc: "Expanded to 40+ countries. Crossed 10,000 verified members. First $100M in investment facilitated." },
  { year: "2023", title: "Investment Ecosystem", desc: "Launched the Investment Hub with deal rooms, portfolio tracking, and AI-powered matching." },
  { year: "2024", title: "Super Platform", desc: "Education, Travel, and Concierge verticals launched. Series B raised. 80,000 members milestone." },
  { year: "2025", title: "AI Integration", desc: "AI Supreme Assistant launched. Marketplace and full lifestyle services go live. 120,000+ members." },
  { year: "2026", title: "150K+ Global Members", desc: "$2.4B+ investments facilitated. Expanded to 80 countries. Industry's most comprehensive super-platform." },
];

const STATS = [
  { value: "150K+", label: "Verified Members" },
  { value: "$2.4B+", label: "Investments Facilitated" },
  { value: "80+", label: "Countries" },
  { value: "1,200+", label: "Events Hosted" },
  { value: "96%", label: "Member Satisfaction" },
  { value: "4,800+", label: "Deals Closed" },
];

const PRESS = [
  { outlet: "Forbes", headline: "SupremeWorld is redefining global business networking for HNW individuals.", year: "2026" },
  { outlet: "Bloomberg", headline: "The LinkedIn for the ultra-wealthy — SupremeWorld facilitates $2.4B in deals.", year: "2025" },
  { outlet: "TechCrunch", headline: "SupremeWorld's AI-powered matching engine is changing how founders find investors.", year: "2025" },
  { outlet: "Financial Times", headline: "Inside the exclusive platform connecting the world's most ambitious entrepreneurs.", year: "2024" },
];

export default function About() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center top" }}
      >
        <div className="absolute inset-0 bg-royal-black/82" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-float" />
        </div>
        <div className="container relative z-10 text-center">
          <div className="animate-fade-in-down delay-100 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
            <Globe className="w-3.5 h-3.5" />
            Our Story
          </div>
          <h1 className="animate-hero-text delay-200 font-display text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Built for the World's <span className="gold-text-shimmer">Most Ambitious</span>
          </h1><br></br><br></br><br></br><br></br><br></br>
          <p className="animate-fade-in delay-400 text-stone-200 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
  SupremeWorld was born from a simple belief: the world's most capable people deserve an ecosystem as extraordinary as their vision.
</p>
          <div className="animate-fade-in delay-500 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gold text-royal-black hover:bg-gold/90 font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20" asChild>
              <Link to={ROUTES.SIGNUP}>
                Join SupremeWorld
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 transition-all duration-300" asChild>
              <Link to={ROUTES.PRICING}>View Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-royal-black border-b border-white/10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-white/10 stagger-children">
            {STATS.map((s) => (
              <div key={s.label} className="py-8 px-4 text-center animate-count-up">
                <p className="font-display text-2xl lg:text-3xl font-bold text-gold">{s.value}</p>
                <p className="text-white/50 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <div className="w-12 h-1 bg-gold mb-6 rounded-full" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                SupremeWorld exists to remove every barrier between ambition and achievement. We unify networking,
                capital, knowledge, travel, commerce, and lifestyle into a single premium operating system — so
                the world's most capable people can focus entirely on building greatness.
              </p>
            </div>
            <div>
              <div className="w-12 h-1 bg-deep-blue mb-6 rounded-full" />
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To become the definitive global operating system for business, wealth, and lifestyle — where
                every entrepreneur, investor, professional, and leader can access opportunity, knowledge, and
                human connection in one exclusive, AI-powered ecosystem, from any corner of the globe.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">What We Stand For</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Six principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {VALUES.map((v) => (
              <div key={v.title} className="animate-fade-in-up hover-lift p-6 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <v.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Our Journey</h2>
            <p className="text-muted-foreground">Five years of building the world's most exclusive professional ecosystem.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-0.5" />
            <div className="space-y-8 stagger-children">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className={`animate-fade-in-up relative flex gap-6 md:items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-background md:-translate-x-1.5 mt-1.5 md:mt-0 z-10 animate-pulse-gold" />
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}>
                    <div className="hover-lift p-5 rounded-xl border border-border bg-card hover:border-gold/30 transition-all duration-300">
                      <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-bold rounded mb-2">{m.year}</span>
                      <h3 className="font-display font-semibold text-foreground mb-1">{m.title}</h3>
                      <p className="text-muted-foreground text-sm">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Press */}
      <section className="py-20 bg-royal-black">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-white mb-3">As Seen In</h2>
            <p className="text-white/50">Recognised by the world's leading business and technology publications.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {PRESS.map((p) => (
              <div key={p.outlet} className="glass-card p-6 rounded-xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-20 h-8 flex items-center justify-center rounded bg-white/10">
                    <span className="font-display font-bold text-white text-sm">{p.outlet}</span>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm italic leading-relaxed">&ldquo;{p.headline}&rdquo;</p>
                    <p className="text-white/40 text-xs mt-2">{p.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-muted/30">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">Awards & Recognition</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Best Business Platform 2025", org: "Global Tech Awards" },
              { title: "Top 50 Startups to Watch", org: "Forbes Africa 2024" },
              { title: "Innovation in FinTech", org: "GITEX Awards 2025" },
              { title: "Excellence in Networking", org: "World Business Council" },
            ].map((a) => (
              <div key={a.title} className="p-5 rounded-xl border border-border bg-card text-center">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <p className="font-semibold text-foreground text-sm">{a.title}</p>
                <p className="text-muted-foreground text-xs mt-1">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-foreground mb-4">
            Ready to Join the <span className="text-gold">Supreme Community?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            150,000+ entrepreneurs, investors, and leaders are already building the future on SupremeWorld.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-royal-black text-gold border border-gold hover:bg-royal-black-light px-8" asChild>
              <Link to={ROUTES.SIGNUP}>
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8" asChild>
              <Link to={ROUTES.CONTACT}>Contact Our Team</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-8 text-sm text-muted-foreground">
            {["No credit card required", "Free to join", "Upgrade anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-success" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
