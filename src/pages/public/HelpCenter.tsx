import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search, BookOpen, Shield, CreditCard, Globe, Users, Zap, MessageSquare, HelpCircle, ArrowRight } from "lucide-react";
import PublicLayout from "@/layouts/PublicLayout";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import EmptyState from "@/components/common/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

const CATEGORIES = [
  { icon: Users, label: "Account & Profile", count: 12 },
  { icon: CreditCard, label: "Billing & Membership", count: 8 },
  { icon: Globe, label: "Networking & Connections", count: 10 },
  { icon: Shield, label: "Security & Privacy", count: 7 },
  { icon: Zap, label: "Platform Features", count: 15 },
  { icon: MessageSquare, label: "Messaging & Community", count: 9 },
];

const FAQS = [
  { id: 1, q: "How do I create my SupremeWorld account?", a: "Click 'Join SupremeWorld' on the homepage. Choose your membership type, complete the registration form with your professional information, and verify your email. Identity verification is processed within 24 hours.", category: "Account & Profile" },
  { id: 2, q: "What are the different membership tiers?", a: "Explorer (Free): Browse the platform, build a basic profile, join up to 3 communities. Networker ($49/mo): Unlimited connections, messaging, and learning hub. Executive ($149/mo): AI assistant, deal rooms, investor matching, analytics, verified badge. Elite ($499/mo): Dedicated relationship manager, full concierge services, private groups, co-investment access, and white-glove support.", category: "Billing & Membership" },
  { id: 3, q: "How does the AI investor matching work?", a: "Our AI engine analyzes your investor profile — including preferred sectors, cheque sizes, geographic focus, and investment thesis — and cross-references this against verified startup and deal listings. You receive curated deal suggestions ranked by match score daily.", category: "Platform Features" },
  { id: 4, q: "Can I upgrade or downgrade my membership?", a: "Yes. Membership changes take effect at the start of your next billing cycle. You can manage your plan from Dashboard > Membership. Downgrades take effect immediately at the end of the current billing period with no pro-rata refund.", category: "Billing & Membership" },
  { id: 5, q: "How do I contact concierge services?", a: "Concierge services are available to Executive (basic) and Elite (full) members. Once subscribed, you can submit requests via Dashboard > Concierge or contact your dedicated relationship manager (Elite only) directly. Requests are acknowledged within 4 hours.", category: "Account & Profile" },
  { id: 6, q: "Is my data secure on SupremeWorld?", a: "Yes. We use AES-256 encryption at rest and TLS 1.3 in transit. All member data is stored in ISO 27001-certified data centres. We are fully GDPR compliant, and your data is never sold to third parties. You can request a full data export or deletion at any time.", category: "Security & Privacy" },
  { id: 7, q: "How do deal rooms work?", a: "Deal rooms are private, secure spaces where investors and founders can share documents, financials, pitch materials, and communicate confidentially. Available to Executive and Elite members. Founders can invite up to 20 investors per deal room.", category: "Platform Features" },
  { id: 8, q: "How do I verify my professional identity?", a: "Submit a government-issued ID and one supporting document (LinkedIn profile, business registration, or professional licence) through Dashboard > Security. Verification is typically completed within 48 hours. Verified members receive a blue verified badge.", category: "Security & Privacy" },
  { id: 9, q: "Can I cancel my subscription at any time?", a: "Yes. You can cancel at any time from Dashboard > Settings > Billing. Your access continues until the end of the current billing period. We do not offer partial refunds for unused time, except where required by law. Please review our Refund Policy for full details.", category: "Billing & Membership" },
  { id: 10, q: "How do communities work?", a: "Communities are curated discussion groups organised by industry, role, or interest. Free members can join up to 3. Networker+ members have unlimited access. Executive and Elite members can create and moderate their own communities. Content is moderated by our community team and by designated community managers.", category: "Messaging & Community" },
  { id: 11, q: "What is the SupremeWorld AI Assistant?", a: "The AI Supreme Assistant (available to Executive and Elite members) provides intelligent business guidance, opportunity discovery, investment insights, networking recommendations, and personalised goal tracking. It is accessible from any dashboard page.", category: "Platform Features" },
  { id: 12, q: "How do I connect with another member?", a: "Visit a member profile and click 'Connect'. If they accept, you will be added to each other's networks. You can then exchange private messages, share resources, and collaborate on deals. Connection request notifications are sent by email and in-platform.", category: "Networking & Connections" },
  { id: 13, q: "Are events included in membership?", a: "Free virtual events and webinars are open to all members. In-person events and summits are priced per event, with 10–30% discounts for Executive and Elite members. Some events are exclusive to specific membership tiers.", category: "Platform Features" },
  { id: 14, q: "How does messaging work on the platform?", a: "All members can send and receive messages from their connections. Direct messaging is available on Networker+ plans. Messages are end-to-end encrypted. Group chats within communities are available to all members. File sharing is supported for documents under 50MB.", category: "Messaging & Community" },
];

export default function HelpCenter() {
  const [searchRaw, setSearchRaw] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);
  const search = useDebounce(searchRaw, 300);

  const filtered = FAQS.filter((f) =>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()) || f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PublicLayout>
      {/* Hero search */}
      <section className="py-20 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            How can we help?
          </div>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
            Help <span className="text-gold">Center</span>
          </h1>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Find answers to common questions about membership, features, security, and more.</p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            <Input
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              placeholder="Search for answers..."
              className="pl-11 h-13 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15"
            />
            {searchRaw && (
              <button onClick={() => setSearchRaw("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs">
                Clear
              </button>
            )}
          </div>
          <p className="text-white/40 text-sm mt-3">{FAQS.length} articles available · Most questions answered instantly</p>
        </div>
      </section>

      {/* Categories (shown when no search) */}
      {!search && (
        <section className="py-12 bg-muted/30 border-b border-border">
          <div className="container">
            <h2 className="font-display text-xl font-bold text-foreground mb-6 text-center">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSearchRaw(c.label)}
                  className="p-4 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-md transition-all text-center group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-gold/20 transition-colors">
                    <c.icon className="w-5 h-5 text-gold" />
                  </div>
                  <p className="font-medium text-foreground text-xs leading-snug">{c.label}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{c.count} articles</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl mx-auto">
          {search && (
            <div className="mb-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-1">
                Results for &ldquo;{search}&rdquo;
              </h2>
              <p className="text-muted-foreground text-sm">{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</p>
            </div>
          )}
          {!search && (
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              type="search"
              title="No Results Found"
              description={`No articles match "${search}". Try a different search term or browse by category above.`}
              actionLabel="Clear Search"
              onAction={() => setSearchRaw("")}
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((f) => (
                <div key={f.id} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenId(openId === f.id ? null : f.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                    aria-expanded={openId === f.id}
                  >
                    <div className="flex-1 pr-4">
                      <p className="font-semibold text-foreground text-sm leading-snug">{f.q}</p>
                      {search && <p className="text-xs text-muted-foreground mt-1">{f.category}</p>}
                    </div>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openId === f.id ? "rotate-90" : ""}`} />
                  </button>
                  {openId === f.id && (
                    <div className="px-5 pb-5 border-t border-border">
                      <p className="text-muted-foreground text-sm leading-relaxed mt-4">{f.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still need help CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <MessageSquare className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Live Chat Support</h3>
              <p className="text-muted-foreground text-sm mb-4">Connect instantly with our support team. Available 9am–9pm GMT.</p>
              <Button variant="outline" className="w-full">Start Live Chat</Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center">
              <BookOpen className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-2">Contact Our Team</h3>
              <p className="text-muted-foreground text-sm mb-4">Send a detailed message and we will respond within 24 business hours.</p>
              <Button variant="outline" className="w-full" asChild>
                <Link to={ROUTES.CONTACT}>
                  Send a Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
