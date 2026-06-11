import PublicLayout from "@/layouts/PublicLayout";
import { FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms", content: `By accessing or using SupremeWorld ("the Platform"), you agree to be bound by these Terms and Conditions ("Terms"), our Privacy Policy, and any other policies incorporated by reference. If you do not agree to these Terms, you may not access or use the Platform.

These Terms constitute a legally binding agreement between you and SupremeWorld Limited ("SupremeWorld", "we", "our", "us"), a company registered in the Dubai International Financial Centre (DIFC), UAE.` },

  { id: "eligibility", title: "2. Eligibility", content: `You must be at least 18 years of age to use the Platform. By using SupremeWorld, you represent and warrant that:

- You are at least 18 years old
- You have the legal capacity to enter into these Terms
- You will comply with all applicable laws and regulations
- Any information you provide is accurate, current, and complete
- You are not prohibited from accessing the Platform under applicable law` },

  { id: "accounts", title: "3. Accounts and Registration", content: `To access most features of the Platform, you must create an account. You are responsible for:

- Maintaining the confidentiality of your login credentials
- All activities that occur under your account
- Notifying us immediately of any unauthorised access

You may not share your account with others, create multiple accounts, or impersonate another person. We reserve the right to terminate accounts that violate these Terms.

SupremeWorld may require identity verification for certain features. You agree to provide accurate information and not attempt to circumvent verification processes.` },

  { id: "membership", title: "4. Membership and Billing", content: `SupremeWorld offers tiered membership plans. By subscribing to a paid membership:

- You authorise us to charge the payment method on file on a recurring basis
- Subscriptions auto-renew unless cancelled before the renewal date
- Annual subscriptions are billed upfront for 12 months
- Price changes will be communicated 30 days in advance
- Cancellations take effect at the end of the current billing period
- We do not offer prorated refunds for unused time, except where required by law

All prices are in USD. Applicable taxes may be added based on your jurisdiction.` },

  { id: "acceptable-use", title: "5. Acceptable Use Policy", content: `You agree not to use the Platform to:

- Post false, misleading, or fraudulent information
- Harass, threaten, or harm other members
- Spam, solicit, or conduct unsolicited commercial outreach
- Scrape, crawl, or extract data from the platform without authorisation
- Circumvent security, access controls, or verification systems
- Post content that infringes intellectual property rights
- Conduct illegal activities including money laundering or fraud
- Impersonate SupremeWorld staff or verified members
- Introduce malware, viruses, or harmful code
- Attempt to reverse-engineer any portion of the platform

Violations may result in immediate account suspension or termination without refund.` },

  { id: "content", title: "6. User-Generated Content", content: `You retain ownership of content you post on the Platform. By posting content, you grant SupremeWorld a non-exclusive, worldwide, royalty-free licence to use, reproduce, display, and distribute that content in connection with operating and improving the Platform.

You are solely responsible for the content you post. You represent that you have all necessary rights to post such content and that it does not violate any third-party rights or applicable laws.

SupremeWorld does not verify, endorse, or take responsibility for user-generated content. We reserve the right to remove any content that violates these Terms or our community standards.` },

  { id: "investment-disclaimer", title: "7. Investment and Financial Disclaimer", content: `SupremeWorld is a platform that facilitates connections between investors and entrepreneurs. We are not a registered investment advisor, broker-dealer, or financial institution.

Nothing on the Platform constitutes financial, investment, legal, or tax advice. All investment opportunities listed are provided for informational purposes only.

Investing involves risk, including the potential loss of principal. Past performance does not guarantee future results. You should conduct your own due diligence and consult with qualified professionals before making any investment decisions.

SupremeWorld does not guarantee any returns or outcomes from investments facilitated through the Platform.` },

  { id: "limitation", title: "8. Limitation of Liability", content: `To the maximum extent permitted by applicable law, SupremeWorld and its directors, officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.

Our total liability to you for any claims arising from these Terms or your use of the Platform shall not exceed the greater of (a) the fees paid by you in the 12 months preceding the claim, or (b) USD $100.

Some jurisdictions do not allow exclusion of certain warranties or limitations of liability. In such jurisdictions, our liability is limited to the extent permitted by law.` },

  { id: "termination", title: "9. Termination", content: `We may suspend or terminate your account at any time for violation of these Terms, suspected fraud, illegal activity, or for any other reason at our sole discretion. You may terminate your account at any time from Dashboard > Settings > Account.

Upon termination, your right to access the Platform ceases immediately. Provisions that by their nature should survive termination (including dispute resolution, limitation of liability, and intellectual property terms) shall survive.` },

  { id: "governing-law", title: "10. Governing Law and Disputes", content: `These Terms shall be governed by and construed in accordance with the laws of the Dubai International Financial Centre (DIFC), UAE, without regard to conflict of law provisions.

Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the DIFC Courts.

Before initiating formal proceedings, you agree to contact us at legal@supremeworld.ai to attempt to resolve the dispute informally. We will make reasonable efforts to resolve disputes within 30 days.` },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("acceptance");

  return (
    <PublicLayout>
      <div className="py-16 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-4">
            <FileText className="w-3.5 h-3.5" />
            Last Updated: June 1, 2026
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Terms &amp; <span className="text-gold">Conditions</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Please read these terms carefully before using the SupremeWorld platform.</p>
        </div>
      </div>
      <div className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="sticky top-24 p-5 rounded-xl border border-border bg-card">
                <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Contents</h3>
                <ul className="space-y-1">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <button onClick={() => { setActiveSection(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeSection === s.id ? "bg-gold/10 text-gold font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        {s.title.replace(/^\d+\.\s/, "")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            <main className="lg:col-span-3 space-y-10">
              <div className="p-5 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground">
                These Terms govern your use of SupremeWorld. By creating an account, you accept these Terms in full. Questions? Contact <a href="mailto:legal@supremeworld.ai" className="text-gold hover:underline">legal@supremeworld.ai</a>.
              </div>
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">{s.title}</h2>
                  <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                    {s.content.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}
              <div className="flex flex-wrap gap-4 pt-8 border-t border-border text-sm">
                <Link to={ROUTES.PRIVACY_POLICY} className="text-gold hover:underline">Privacy Policy</Link>
                <Link to={ROUTES.COOKIE_POLICY} className="text-gold hover:underline">Cookie Policy</Link>
                <Link to={ROUTES.REFUND_POLICY} className="text-gold hover:underline">Refund Policy</Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
