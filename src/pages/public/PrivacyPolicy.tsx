import PublicLayout from "@/layouts/PublicLayout";
import { Shield, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";

const SECTIONS = [
  { id: "information-we-collect", title: "1. Information We Collect", content: `We collect information you provide directly to us, such as when you create an account, update your profile, make a transaction, or communicate with us. This includes:

**Account Information**: Full name, email address, mobile number, date of birth, country of residence, and password.

**Professional Information**: Job title, company name, industry, professional experience, investment preferences, and business interests.

**Identity Verification**: Government-issued ID documents and supporting professional documents submitted during verification.

**Financial Information**: Payment details processed securely by Stripe. We do not store full card numbers.

**Communications**: Messages, posts, community contributions, and support interactions on the platform.

**Usage Data**: How you interact with our platform, features you use, content you view, searches you perform, and time spent on the platform.

**Device and Technical Data**: IP address, browser type and version, device identifiers, operating system, referral source, and cookies.` },

  { id: "how-we-use-information", title: "2. How We Use Your Information", content: `We use the information we collect to:

- Provide, operate, and improve the SupremeWorld platform and services
- Create and manage your account and membership
- Process transactions and send related communications
- Facilitate networking, investment matching, and connection recommendations
- Power the AI Supreme Assistant and personalised opportunity discovery
- Send administrative emails, service notifications, and security alerts
- Communicate about new features, events, and relevant opportunities
- Verify your identity and professional credentials
- Ensure platform security and prevent fraudulent activity
- Comply with legal obligations and enforce our Terms and Conditions
- Conduct analytics and research to improve our services` },

  { id: "information-sharing", title: "3. Information Sharing", content: `We do not sell your personal data to third parties. We may share information in the following circumstances:

**With Other Members**: Certain profile information is visible to other verified members based on your privacy settings.

**With Service Providers**: We share data with vetted third-party providers who assist in operating our platform (cloud hosting, payment processing, email delivery, analytics). These providers are bound by data processing agreements.

**For Business Transfers**: If SupremeWorld is acquired, merged, or undergoes a significant asset transfer, member data may be transferred as part of the transaction.

**For Legal Compliance**: We may disclose information when required by law, court order, or regulatory authority.

**With Your Consent**: We may share data for purposes not listed here with your explicit consent.` },

  { id: "data-retention", title: "4. Data Retention", content: `We retain your personal data for as long as your account is active or as needed to provide services. If you close your account:

- Profile and activity data is retained for 12 months before full deletion
- Transaction records are retained for 7 years as required by financial regulations
- Anonymised, aggregated analytics data may be retained indefinitely

You can request deletion of your account and associated data at any time via Dashboard > Settings > Account or by contacting privacy@supremeworld.ai. We will complete valid deletion requests within 30 days.` },

  { id: "your-rights", title: "5. Your Rights", content: `Depending on your jurisdiction, you may have the following rights regarding your personal data:

**Access**: Request a copy of the personal data we hold about you.

**Correction**: Request correction of inaccurate or incomplete data.

**Deletion**: Request deletion of your personal data (subject to legal retention requirements).

**Portability**: Request transfer of your data in a machine-readable format.

**Restriction**: Request that we restrict processing of your data in certain circumstances.

**Objection**: Object to processing based on legitimate interests or for direct marketing.

**Withdraw Consent**: Where processing is based on consent, withdraw that consent at any time.

To exercise any of these rights, contact privacy@supremeworld.ai. EU and UK residents may lodge complaints with their local data protection authority.` },

  { id: "cookies", title: "6. Cookies and Tracking", content: `We use cookies and similar technologies to operate our platform and improve user experience. Types of cookies we use:

**Essential Cookies**: Required for authentication, security, and core platform functionality. Cannot be disabled.

**Analytics Cookies**: Help us understand how members use the platform, which features are popular, and how to improve performance.

**Preference Cookies**: Remember your settings and preferences across sessions.

**Marketing Cookies**: Used to serve relevant advertisements (only with consent where required by law).

You can manage cookie preferences in your browser settings. Disabling non-essential cookies may affect some platform functionality. See our Cookie Policy for full details.` },

  { id: "security", title: "7. Security", content: `We implement industry-standard security measures to protect your personal data:

- AES-256 encryption for data at rest
- TLS 1.3 encryption for data in transit
- Multi-factor authentication for account access
- Regular third-party security audits and penetration testing
- ISO 27001-certified data centre hosting
- 24/7 security monitoring and incident response
- Employee access controls and training

Despite these measures, no system is completely secure. In the event of a data breach affecting your rights, we will notify you within 72 hours as required by applicable law.` },

  { id: "international-transfers", title: "8. International Data Transfers", content: `SupremeWorld operates globally. Your data may be transferred to and processed in countries other than your country of residence. When transferring data outside the EEA, UK, or other jurisdictions with adequate data protection laws, we implement appropriate safeguards including Standard Contractual Clauses approved by the European Commission and equivalent protections for UK data subjects.` },

  { id: "children", title: "9. Children's Privacy", content: `SupremeWorld is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children under 18. If we become aware that a user is under 18, we will delete their account and associated data promptly. If you believe a minor has registered, please contact us at privacy@supremeworld.ai.` },

  { id: "contact", title: "10. Contact & Data Protection Officer", content: `For any privacy-related questions, requests, or concerns, contact:

**Data Protection Officer**
SupremeWorld Limited
DIFC, Level 14, Gate Building, Dubai, UAE

Email: privacy@supremeworld.ai

For UK/EU residents, our EU representative can be contacted at eu-privacy@supremeworld.ai.

We aim to respond to all privacy inquiries within 30 days.` },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("information-we-collect");

  return (
    <PublicLayout>
      <div className="py-16 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-4">
            <Shield className="w-3.5 h-3.5" />
            Last Updated: June 1, 2026
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Privacy <span className="text-gold">Policy</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We take your privacy seriously. This policy explains what data we collect, how we use it, and your rights.
          </p>
        </div>
      </div>

      <div className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky TOC */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 p-5 rounded-xl border border-border bg-card">
                <h3 className="font-display font-semibold text-foreground mb-4 text-sm">Contents</h3>
                <ul className="space-y-1">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => { setActiveSection(s.id); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                        className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${activeSection === s.id ? "bg-gold/10 text-gold font-medium" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                      >
                        <ChevronRight className="w-3 h-3 flex-shrink-0" />
                        {s.title.replace(/^\d+\.\s/, "")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Content */}
            <main className="lg:col-span-3 space-y-10">
              <div className="p-5 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground">
                This Privacy Policy applies to SupremeWorld Limited and its services. By using SupremeWorld, you agree to the terms of this policy. If you have questions, contact <a href="mailto:privacy@supremeworld.ai" className="text-gold hover:underline">privacy@supremeworld.ai</a>.
              </div>
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">{s.title}</h2>
                  <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                    {s.content.split("\n\n").map((para, i) => (
                      <p key={i} className={para.startsWith("**") ? "font-medium text-foreground" : ""}>{para.replace(/\*\*/g, "")}</p>
                    ))}
                  </div>
                </section>
              ))}
              <div className="flex flex-wrap gap-4 pt-8 border-t border-border text-sm">
                <Link to={ROUTES.TERMS_CONDITIONS} className="text-gold hover:underline">Terms &amp; Conditions</Link>
                <Link to={ROUTES.COOKIE_POLICY} className="text-gold hover:underline">Cookie Policy</Link>
                <Link to={ROUTES.CONTACT} className="text-gold hover:underline">Contact Us</Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
