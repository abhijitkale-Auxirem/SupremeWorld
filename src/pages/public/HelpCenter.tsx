import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronRight, ChevronDown, Search, BookOpen, Shield, CreditCard, Globe, Users,
  Zap, MessageSquare, HelpCircle, ArrowRight, CheckCircle, AlertCircle,
  Lock, UserCheck, Bell, Settings, Headphones, Star,
} from "lucide-react";
import PublicLayout from "@/layouts/PublicLayout";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

/* ─── Article data ─────────────────────────────────────────────────────────── */
interface Article {
  id: number;
  question: string;
  category: string;
  readTime: string;
  sections: Array<{ heading?: string; body: string; list?: string[] }>;
}

const ARTICLES: Article[] = [
  /* ── Account & Profile ────────────────────────────────────────────────── */
  {
    id: 1,
    question: "How do I create my SupremeWorld account?",
    category: "Account & Profile",
    readTime: "2 min",
    sections: [
      {
        body: "Creating your SupremeWorld account takes less than five minutes. Follow the steps below to get started.",
      },
      {
        heading: "Step 1 — Visit the Sign Up page",
        body: "Click the 'Join SupremeWorld' button on the homepage, or navigate directly to supremeworld.ai/signup. You will see a role selection screen — choose the role that best describes your primary purpose on the platform (Entrepreneur, Investor, Business, Professional, Creator, or Premium Member).",
      },
      {
        heading: "Step 2 — Complete the registration form",
        body: "Fill in your full name, a unique username (3–20 characters, letters only), email address, mobile number, and a strong password. Your password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      },
      {
        heading: "Step 3 — Verify your email",
        body: "A six-digit OTP will be sent to your registered email address. Enter it on the verification screen within 10 minutes. If you did not receive it, check your spam folder or request a new code.",
      },
      {
        heading: "Step 4 — Identity verification",
        body: "To protect all members, we verify professional identity within 24 hours of account creation. Submit a government-issued ID and one supporting document (LinkedIn profile URL, business registration certificate, or professional licence) from your Dashboard > Security page. Verified accounts receive a blue verified badge.",
      },
      {
        list: [
          "Use a professional email address rather than a personal one for faster approval",
          "Ensure your profile photo is a clear, professional headshot",
          "Complete your professional summary immediately — profiles with 80%+ completion receive 4x more connection requests",
        ],
      },
    ],
  },
  {
    id: 2,
    question: "How do I update my profile information?",
    category: "Account & Profile",
    readTime: "2 min",
    sections: [
      {
        body: "Your profile is your professional identity on SupremeWorld. Keeping it accurate and complete maximises your visibility and connection quality.",
      },
      {
        heading: "Accessing your profile settings",
        body: "Navigate to Dashboard > Profile from the left sidebar or click your avatar in the top-right corner of any dashboard page. You will see the Profile edit form.",
      },
      {
        heading: "What you can update",
        body: "You can update your display name, username, professional bio, location, industry, and website URL at any time. Changes take effect immediately and are visible across the platform.",
      },
      {
        heading: "Updating your profile photo",
        body: "Click the camera icon on your current profile photo or use the 'Upload Photo' button. Supported formats: JPG, PNG, GIF, WebP. Maximum file size: 5MB. The image is compressed and stored securely. Your new photo appears across all platform touchpoints within seconds.",
      },
      {
        heading: "Username changes",
        body: "You can change your username once every 30 days. Your previous username becomes available for other members after 14 days. All existing connections and mentions are automatically updated.",
      },
    ],
  },
  {
    id: 3,
    question: "How do I contact concierge services?",
    category: "Account & Profile",
    readTime: "2 min",
    sections: [
      {
        body: "SupremeWorld Concierge is a white-glove service available to Executive and Elite members. It handles travel, events, business research, introductions, and personal lifestyle requests.",
      },
      {
        heading: "Accessing Concierge",
        body: "From your dashboard, navigate to Concierge from the left sidebar. You will see the request submission form. Describe your request in detail — the more context you provide, the faster and more precisely we can fulfil it.",
      },
      {
        heading: "Response times",
        list: [
          "Executive members: requests acknowledged within 4 business hours",
          "Elite members: dedicated relationship manager, direct WhatsApp or Signal contact, acknowledgement within 1 hour",
          "Emergency requests (travel disruptions, urgent event access): Elite members only, 24/7 availability",
        ],
      },
      {
        heading: "What Concierge can do",
        list: [
          "Private aviation booking and coordination",
          "Hotel and resort reservations at exclusive properties",
          "Restaurant reservations including normally unavailable tables",
          "VIP event tickets and access",
          "Business research and due diligence support",
          "Executive gift procurement and delivery",
          "Personal travel itinerary planning",
        ],
      },
    ],
  },
  /* ── Billing & Membership ─────────────────────────────────────────────── */
  {
    id: 4,
    question: "What are the different membership tiers?",
    category: "Billing & Membership",
    readTime: "3 min",
    sections: [
      {
        body: "SupremeWorld offers four membership tiers designed to match different professional needs and ambitions. Each tier builds upon the last.",
      },
      {
        heading: "Explorer — Free",
        body: "Create a full professional profile, browse all public platform pages, join up to 3 communities, and access public learning content. The Explorer tier is ideal for those exploring the platform before committing to a paid plan.",
      },
      {
        heading: "Networker — $49/month",
        body: "Everything in Explorer plus unlimited connection requests, private messaging with all connections, access to the full Learning Hub library, participation in unlimited communities, and the Networking Intelligence feed showing recommended connections.",
      },
      {
        heading: "Executive — $149/month",
        body: "Everything in Networker plus: AI Supreme Assistant for business intelligence and recommendations, Deal Rooms for confidential founder-investor collaboration, Investor Matching with ranked daily deal suggestions, full analytics dashboard, verified badge, priority event access, and basic Concierge request support.",
      },
      {
        heading: "Elite — $499/month",
        body: "Everything in Executive plus: dedicated relationship manager, full white-glove Concierge services (travel, lifestyle, business), private group creation and moderation, co-investment access to curated deal syndications, VIP event seating, and direct 24/7 relationship manager contact.",
      },
      {
        list: [
          "All paid plans are billed monthly with no minimum commitment",
          "Annual billing offers a 20% discount across all tiers",
          "Upgrades take effect immediately; downgrades at the end of the current billing period",
        ],
      },
    ],
  },
  {
    id: 5,
    question: "Can I upgrade or downgrade my membership?",
    category: "Billing & Membership",
    readTime: "2 min",
    sections: [
      {
        body: "You have full flexibility to change your membership tier at any time from your dashboard.",
      },
      {
        heading: "Upgrading your plan",
        body: "Upgrades take effect immediately. You are billed a pro-rated amount for the remainder of your current billing cycle, then the full new tier price from the next cycle. Access to new features is unlocked within 60 seconds of upgrade confirmation.",
      },
      {
        heading: "Downgrading your plan",
        body: "Downgrade requests take effect at the end of your current billing period. You retain full access to your current tier until that date. No pro-rata refund is issued for unused time. Features removed on downgrade are listed on the plan comparison page before confirmation.",
      },
      {
        heading: "How to change your plan",
        list: [
          "Go to Dashboard > Membership",
          "Click 'Change Plan' or 'Upgrade / Downgrade'",
          "Select your desired tier",
          "Confirm payment details and changes",
          "You will receive a confirmation email immediately",
        ],
      },
    ],
  },
  {
    id: 6,
    question: "Can I cancel my subscription at any time?",
    category: "Billing & Membership",
    readTime: "2 min",
    sections: [
      {
        body: "Yes. There are no long-term contracts and no cancellation fees. You can cancel your paid membership at any time.",
      },
      {
        heading: "How to cancel",
        list: [
          "Go to Dashboard > Settings > Billing",
          "Click 'Cancel Subscription'",
          "Confirm cancellation — you will receive an email confirmation",
        ],
      },
      {
        heading: "What happens after cancellation",
        body: "Your paid access continues until the end of your current billing period. After that date, your account reverts to the Explorer (Free) tier automatically. Your profile, connections, and community memberships are preserved — however features exclusive to paid tiers (AI, Deal Rooms, unlimited messaging) become unavailable.",
      },
      {
        heading: "Refund policy",
        body: "We do not offer partial refunds for unused portions of a billing period, except where required by applicable law. Please review our full Refund Policy for details specific to your region.",
      },
    ],
  },
  /* ── Networking & Connections ─────────────────────────────────────────── */
  {
    id: 7,
    question: "How do I connect with another member?",
    category: "Networking & Connections",
    readTime: "2 min",
    sections: [
      {
        body: "Connections on SupremeWorld are bilateral — both parties must accept before a connection is formed. This ensures high-quality, intentional networks rather than superficial volume.",
      },
      {
        heading: "Sending a connection request",
        body: "Visit the profile of the member you wish to connect with and click the 'Connect' button. You can optionally include a personalised note (recommended — it increases acceptance rates by 3x). The request is delivered by in-platform notification and email.",
      },
      {
        heading: "Managing requests",
        body: "View all pending sent and received connection requests from Dashboard > Network > Requests. Requests expire after 14 days if not accepted. You can withdraw a sent request at any time.",
      },
      {
        heading: "After connecting",
        body: "Once connected, you can exchange direct messages, share resources, collaborate on deals, and refer each other to your networks. Both parties are notified of the new connection with a brief profile summary.",
      },
      {
        heading: "Connection limits",
        list: [
          "Explorer: Up to 50 connections",
          "Networker: Up to 500 connections",
          "Executive and Elite: Unlimited connections",
        ],
      },
    ],
  },
  {
    id: 8,
    question: "How does AI investor matching work?",
    category: "Networking & Connections",
    readTime: "3 min",
    sections: [
      {
        body: "SupremeWorld's AI investor matching is available to Executive and Elite members. It continuously analyses your profile and preferences to surface the most relevant investment opportunities or investor relationships.",
      },
      {
        heading: "How the algorithm works",
        body: "The matching engine uses semantic analysis rather than simple keyword matching. It processes your investment thesis, sector preferences, geographic focus, deal size parameters, and past interaction history to generate a daily shortlist ranked by match probability.",
      },
      {
        heading: "For investors",
        list: [
          "Define your thesis: preferred sectors, cheque size range, stage focus, geographic markets",
          "Specify deal structures you consider (equity, SAFE, convertible note, debt)",
          "The AI surfaces vetted founder profiles ranked by alignment to your stated parameters",
          "Each match includes a match score and a one-paragraph rationale",
        ],
      },
      {
        heading: "For founders",
        list: [
          "Ensure your profile clearly states your funding stage, sector, and traction metrics",
          "The AI matches you with investors whose recent deal history and stated thesis aligns with your profile",
          "Warm introduction pathways are highlighted when mutual connections exist",
        ],
      },
      {
        heading: "Improving your match quality",
        body: "Match quality improves as you use the platform. Engaging with recommendations, accepting or passing with reasons, and updating your profile regularly all refine the AI's understanding of your preferences.",
      },
    ],
  },
  /* ── Security & Privacy ───────────────────────────────────────────────── */
  {
    id: 9,
    question: "Is my data secure on SupremeWorld?",
    category: "Security & Privacy",
    readTime: "3 min",
    sections: [
      {
        body: "Data security and privacy are foundational to SupremeWorld. We apply enterprise-grade security practices across every layer of the platform.",
      },
      {
        heading: "Encryption",
        list: [
          "Data at rest: AES-256 encryption across all stored data",
          "Data in transit: TLS 1.3 for all connections between your device and our servers",
          "Messages: End-to-end encryption for all direct messages",
          "Files: Encrypted at rest and scanned for malware on upload",
        ],
      },
      {
        heading: "Infrastructure",
        body: "SupremeWorld's infrastructure is hosted in ISO 27001-certified data centres with SOC 2 Type II compliance. We use geographic redundancy across multiple regions to ensure availability and resilience.",
      },
      {
        heading: "GDPR & Privacy",
        body: "We are fully GDPR compliant. Your data is never sold to third parties. We collect only what is necessary for platform operation. You can request a complete data export or full account deletion at any time from Dashboard > Settings > Privacy.",
      },
      {
        heading: "Your account security controls",
        list: [
          "Two-factor authentication (2FA) via authenticator app or SMS",
          "Session management: view and revoke all active sessions",
          "Login notifications for new devices or locations",
          "Password strength enforcement with breach detection",
        ],
      },
    ],
  },
  {
    id: 10,
    question: "How do I verify my professional identity?",
    category: "Security & Privacy",
    readTime: "2 min",
    sections: [
      {
        body: "Identity verification is optional but strongly recommended. Verified members receive a blue verified badge and are trusted 5x more by other members in connection decisions.",
      },
      {
        heading: "Submitting verification",
        list: [
          "Go to Dashboard > Security > Identity Verification",
          "Upload a clear photo of your government-issued ID (passport, national ID, or driving licence)",
          "Upload one supporting professional document: LinkedIn profile URL, business registration certificate, or professional licence",
          "Submit — verification is typically completed within 48 hours",
        ],
      },
      {
        heading: "What gets verified",
        body: "We verify your name, identity document authenticity, and the consistency between your stated professional role and your supporting document. We do not store raw identity documents after verification — they are processed and immediately deleted.",
      },
      {
        heading: "After verification",
        body: "You receive a verified badge displayed prominently on your profile, in search results, and in all connection requests you send. Verified status also unlocks higher limits on deal room access and community creation.",
      },
    ],
  },
  /* ── Platform Features ────────────────────────────────────────────────── */
  {
    id: 11,
    question: "How do deal rooms work?",
    category: "Platform Features",
    readTime: "3 min",
    sections: [
      {
        body: "Deal Rooms are private, secure collaboration spaces for confidential transactions between founders and investors. They are available to Executive and Elite members.",
      },
      {
        heading: "Creating a deal room",
        body: "From your Entrepreneur or Investor Dashboard, navigate to Deal Rooms and click 'Create New Room'. Set a title, description, and access level. You can make a room invite-only (founders invite specific investors) or discovery-mode (visible to matched investors).",
      },
      {
        heading: "What deal rooms include",
        list: [
          "Secure document repository for pitch decks, financials, and legal documents",
          "Version-controlled document updates with viewer tracking",
          "Encrypted messaging thread between room participants",
          "NDA management: digital signature and storage within the room",
          "Due diligence checklist with completion tracking",
          "Q&A module for structured investor questions",
        ],
      },
      {
        heading: "Participant limits",
        list: [
          "Executive members: up to 10 investors per deal room, up to 5 active rooms simultaneously",
          "Elite members: up to 30 investors per deal room, unlimited active rooms",
        ],
      },
      {
        heading: "Security in deal rooms",
        body: "All documents are watermarked with the viewer's name and timestamp when accessed. Screen capture detection is active on supported browsers. Access is revocable at any time by the room owner.",
      },
    ],
  },
  {
    id: 12,
    question: "What is the SupremeWorld AI Assistant?",
    category: "Platform Features",
    readTime: "3 min",
    sections: [
      {
        body: "The AI Supreme Assistant is SupremeWorld's integrated artificial intelligence system, available to Executive and Elite members. It is designed to actively support your business and investment objectives.",
      },
      {
        heading: "Core capabilities",
        list: [
          "Opportunity discovery: surfaces deals, partnerships, and connections relevant to your goals",
          "Business intelligence: answers complex questions about markets, competitors, and trends",
          "Investment analysis: assists with company research, sector analysis, and deal comparisons",
          "Networking recommendations: identifies who in the SupremeWorld network you should connect with and why",
          "Goal tracking: maintains context across sessions to track progress toward your stated objectives",
          "Document drafting: assists with investor updates, pitch summaries, and professional communications",
        ],
      },
      {
        heading: "How to access it",
        body: "The AI Assistant is accessible from any dashboard page via the 'AI Assistant' link in the left sidebar, or through the floating AI button on supported pages.",
      },
      {
        heading: "Data and privacy",
        body: "The AI processes your questions and platform context in real-time but does not permanently store conversation history beyond your current session unless you save a thread explicitly. Your data is never used to train models.",
      },
    ],
  },
  {
    id: 13,
    question: "Are events included in my membership?",
    category: "Platform Features",
    readTime: "2 min",
    sections: [
      {
        body: "SupremeWorld hosts a full calendar of virtual and in-person events throughout the year, ranging from webinars to global summits.",
      },
      {
        heading: "What is included by tier",
        list: [
          "Explorer (Free): Access to free virtual events and public webinars",
          "Networker: All Explorer benefits plus 10% discount on paid virtual events",
          "Executive: All Networker benefits plus 20% discount on all events, early access registration, and priority seating at in-person events",
          "Elite: All Executive benefits plus 30% discount, guaranteed VIP seating, exclusive Elite-only pre-event networking sessions, and complimentary tickets to select flagship events",
        ],
      },
      {
        heading: "Types of events",
        list: [
          "Weekly educational webinars (free for all members)",
          "Monthly investment deal showcases (Executive+)",
          "Quarterly regional summits (all members, tiered pricing)",
          "Annual SupremeWorld Global Summit (all members, tiered pricing and access)",
          "Private networking dinners (Elite only, invitation-based)",
        ],
      },
    ],
  },
  /* ── Messaging & Community ─────────────────────────────────────────────── */
  {
    id: 14,
    question: "How does messaging work on the platform?",
    category: "Messaging & Community",
    readTime: "2 min",
    sections: [
      {
        body: "SupremeWorld's messaging system is designed for professional communication with security and reliability at its core.",
      },
      {
        heading: "Direct messaging",
        body: "Direct messages are available between all connected members on Networker, Executive, and Elite plans. Messages are end-to-end encrypted in transit. All members on any plan can receive messages from their connections.",
      },
      {
        heading: "File sharing",
        body: "You can share files up to 50MB per message. Supported formats include PDF, DOC, XLSX, PPT, PNG, JPG, and MP4. Files are scanned for malware before delivery. Shared files are stored for 90 days.",
      },
      {
        heading: "Community group messages",
        body: "Communities have shared discussion threads accessible to all community members. These are moderated by community managers. You can mute specific threads or receive real-time notifications per your preferences.",
      },
      {
        heading: "Message notifications",
        list: [
          "Real-time in-platform notifications for all received messages",
          "Email digest (hourly, daily, or off) — configurable in Dashboard > Settings > Notifications",
          "Mobile push notifications when the SupremeWorld app is installed",
          "Do Not Disturb mode available for focused work periods",
        ],
      },
    ],
  },
  {
    id: 15,
    question: "How do communities work?",
    category: "Messaging & Community",
    readTime: "3 min",
    sections: [
      {
        body: "Communities are curated professional groups organised around shared industries, roles, interests, or geographies. They are among the most active and valuable spaces on SupremeWorld.",
      },
      {
        heading: "Joining communities",
        list: [
          "Explorer: Join up to 3 communities",
          "Networker: Join unlimited communities",
          "Executive and Elite: Join unlimited communities and create your own",
        ],
      },
      {
        heading: "What happens inside a community",
        body: "Communities have a discussion feed, an events calendar, a resource library, and a members directory. Community managers can post featured announcements, host AMAs, and organise subgroups.",
      },
      {
        heading: "Creating a community (Executive and Elite)",
        list: [
          "Go to Dashboard > Communities > Create New Community",
          "Choose community type: Open (anyone can join), Curated (manager approves members), or Private (invite-only)",
          "Define the community topic, guidelines, and membership criteria",
          "Invite founding members from your connections",
          "Publish and promote through the SupremeWorld discovery page",
        ],
      },
      {
        heading: "Community moderation",
        body: "All communities are moderated by designated community managers. SupremeWorld's Trust & Safety team reviews flagged content within 24 hours. Repeated violations result in account-level consequences up to permanent suspension.",
      },
    ],
  },
];

/* ─── Category config ───────────────────────────────────────────────────────── */
const CATEGORIES = [
  { icon: Users, label: "Account & Profile", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: CreditCard, label: "Billing & Membership", color: "text-green-500", bg: "bg-green-500/10" },
  { icon: Globe, label: "Networking & Connections", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Shield, label: "Security & Privacy", color: "text-red-500", bg: "bg-red-500/10" },
  { icon: Zap, label: "Platform Features", color: "text-gold", bg: "bg-gold/10" },
  { icon: MessageSquare, label: "Messaging & Community", color: "text-teal-500", bg: "bg-teal-500/10" },
];

/* ─── Sub-components ───────────────────────────────────────────────────────── */
function ArticleCard({ article, defaultOpen = false }: { article: Article; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const cat = CATEGORIES.find((c) => c.label === article.category);

  return (
    <div className={cn("rounded-xl border bg-card overflow-hidden transition-all duration-200", open ? "border-gold/40 shadow-md" : "border-border hover:border-gold/20")}>
      {/* Header / toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/40 transition-colors"
        aria-expanded={open}
      >
        {cat && (
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", cat.bg)}>
            <cat.icon className={cn("w-4 h-4", cat.color)} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm leading-snug">{article.question}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="text-xs text-muted-foreground">{article.category}</span>
            <span className="text-muted-foreground/40 text-xs">·</span>
            <span className="text-xs text-muted-foreground">{article.readTime} read</span>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-200",
            open && "rotate-180 text-gold"
          )}
        />
      </button>

      {/* Article body */}
      {open && (
        <div className="px-5 pb-6 border-t border-border animate-fade-in">
          <div className="mt-5 space-y-5">
            {article.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    {section.heading}
                  </h4>
                )}
                {section.body && (
                  <p className="text-muted-foreground text-sm leading-relaxed">{section.body}</p>
                )}
                {section.list && (
                  <ul className="mt-2 space-y-2">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────────────── */
export default function HelpCenter() {
  const [searchRaw, setSearchRaw] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const search = useDebounce(searchRaw, 300);

  /* Filter articles */
  const filtered = ARTICLES.filter((a) => {
    const matchCat = !activeCategory || a.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      a.question.toLowerCase().includes(q) ||
      a.sections.some(
        (s) =>
          s.body?.toLowerCase().includes(q) ||
          s.heading?.toLowerCase().includes(q) ||
          s.list?.some((l) => l.toLowerCase().includes(q))
      );
    return matchCat && matchSearch;
  });

  const handleCategoryClick = (label: string) => {
    setActiveCategory((prev) => (prev === label ? null : label));
    setSearchRaw("");
  };

  const clearAll = () => {
    setSearchRaw("");
    setActiveCategory(null);
  };

  const isFiltered = !!search || !!activeCategory;

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
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Find detailed answers to every question about SupremeWorld — membership, features, security, and more.
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none" />
            <Input
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              placeholder="Search articles..."
              className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/15 focus:border-gold/50"
            />
            {searchRaw && (
              <button
                onClick={() => setSearchRaw("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-white/40 text-sm mt-3">
            {ARTICLES.length} detailed articles · Step-by-step guides for every feature
          </p>
        </div>
      </section>

      {/* Quick stats bar */}
      <div className="bg-muted/50 border-b border-border py-4">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: BookOpen, label: `${ARTICLES.length} Articles`, sub: "Fully detailed" },
              { icon: Star, label: "6 Categories", sub: "Organised topics" },
              { icon: Headphones, label: "Live Chat", sub: "9am–9pm GMT" },
              { icon: Bell, label: "24h Response", sub: "Email support" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{label}</p>
                  <p className="text-muted-foreground text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category navigation */}
      <section className="py-10 bg-background border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display text-lg font-bold text-foreground">Browse by Category</h2>
            {activeCategory && (
              <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1">
                <ChevronRight className="w-3 h-3 rotate-180" /> All categories
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map((c) => {
              const count = ARTICLES.filter((a) => a.category === c.label).length;
              const isActive = activeCategory === c.label;
              return (
                <button
                  key={c.label}
                  onClick={() => handleCategoryClick(c.label)}
                  className={cn(
                    "p-4 rounded-xl border transition-all text-center group",
                    isActive
                      ? "border-gold bg-gold/10 shadow-md"
                      : "border-border bg-card hover:border-gold/40 hover:shadow-md"
                  )}
                  aria-pressed={isActive}
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2 transition-colors", isActive ? "bg-gold/20" : c.bg, "group-hover:scale-110 transition-transform")}>
                    <c.icon className={cn("w-5 h-5", isActive ? "text-gold" : c.color)} />
                  </div>
                  <p className={cn("font-medium text-xs leading-snug", isActive ? "text-gold" : "text-foreground")}>
                    {c.label}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">{count} articles</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles list */}
      <section className="py-14 bg-background">
        <div className="container max-w-3xl mx-auto">

          {/* Result header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              {isFiltered ? (
                <>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {activeCategory ? activeCategory : `Results for "${search}"`}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
                  </p>
                </>
              ) : (
                <h2 className="font-display text-xl font-bold text-foreground">
                  All Help Articles
                </h2>
              )}
            </div>
            {isFiltered && (
              <button
                onClick={clearAll}
                className="text-xs text-muted-foreground hover:text-gold border border-border hover:border-gold/40 px-3 py-1.5 rounded-lg transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">No Articles Found</h3>
              <p className="text-muted-foreground text-sm mb-5">
                No articles match &ldquo;{search}&rdquo;. Try a different search term or browse by category.
              </p>
              <Button variant="outline" onClick={clearAll} className="hover:border-gold/40">
                Clear Search
              </Button>
            </div>
          )}

          {/* Articles */}
          {filtered.length > 0 && (
            <div className="space-y-3">
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular articles highlight */}
      {!isFiltered && (
        <section className="py-12 bg-muted/30 border-t border-border">
          <div className="container max-w-3xl mx-auto">
            <h2 className="font-display text-lg font-bold text-foreground mb-5 flex items-center gap-2">
              <Star className="w-4 h-4 text-gold" />
              Most Read Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARTICLES.slice(0, 6).map((a) => {
                const cat = CATEGORIES.find((c) => c.label === a.category);
                return (
                  <button
                    key={a.id}
                    onClick={() => setActiveCategory(a.category)}
                    className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-gold/40 hover:shadow-sm transition-all text-left group"
                  >
                    {cat && (
                      <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", cat.bg)}>
                        <cat.icon className={cn("w-3.5 h-3.5", cat.color)} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-gold transition-colors leading-snug line-clamp-2">
                        {a.question}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{a.readTime} read</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Still need help */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Still Need Help?</h2>
            <p className="text-muted-foreground">Our support team is here for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-xl border border-border bg-card text-center hover:border-gold/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
              <p className="text-muted-foreground text-sm mb-4">Instant answers from our support team.</p>
              <p className="text-xs text-muted-foreground mb-3">Mon–Fri, 9am–9pm GMT</p>
              <Button variant="outline" className="w-full hover:border-gold/40 hover:text-gold" size="sm">
                Start Chat
              </Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center hover:border-gold/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-4">Detailed response within 24 business hours.</p>
              <p className="text-xs text-muted-foreground mb-3">Always available</p>
              <Button variant="outline" className="w-full hover:border-gold/40 hover:text-gold" size="sm" asChild>
                <Link to={ROUTES.CONTACT}>Send Message <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
              </Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card text-center hover:border-gold/40 hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Relationship Manager</h3>
              <p className="text-muted-foreground text-sm mb-4">Dedicated support for Elite members.</p>
              <p className="text-xs text-muted-foreground mb-3">24/7 availability</p>
              <Button variant="outline" className="w-full hover:border-gold/40 hover:text-gold" size="sm" asChild>
                <Link to={ROUTES.PRICING}>View Elite Plan <ArrowRight className="w-3.5 h-3.5 ml-1.5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
