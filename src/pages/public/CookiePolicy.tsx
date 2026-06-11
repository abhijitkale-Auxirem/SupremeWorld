import PublicLayout from "@/layouts/PublicLayout";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const COOKIE_TYPES = [
  { name: "Strictly Necessary Cookies", required: true, desc: "These cookies are essential for the platform to function. They enable authentication, session management, security features, and core platform operations. Without these cookies, the platform cannot work properly.", examples: ["Session authentication token", "CSRF protection token", "Load balancer routing cookie", "Consent preferences storage"] },
  { name: "Performance & Analytics Cookies", required: false, desc: "These cookies help us understand how members interact with the platform, which features are used most frequently, and where users encounter difficulties. This information helps us improve the platform.", examples: ["Page view tracking", "Feature usage analytics", "Error and performance monitoring", "A/B test assignment"] },
  { name: "Functional Cookies", required: false, desc: "These cookies remember your preferences and settings to provide a more personalised experience across sessions, such as your language preference, dashboard layout, and notification settings.", examples: ["Language and region preferences", "Dashboard layout settings", "Notification preferences", "Last viewed content"] },
  { name: "Marketing & Targeting Cookies", required: false, desc: "These cookies are used to deliver relevant advertisements and content about SupremeWorld services on third-party platforms. They track your engagement with our marketing and help us measure campaign effectiveness.", examples: ["LinkedIn Insight Tag", "Meta Pixel (Facebook)", "Google Ads conversion tracking", "Retargeting audience membership"] },
];

export default function CookiePolicy() {
  return (
    <PublicLayout>
      <div className="py-16 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-4">
            <Cookie className="w-3.5 h-3.5" />
            Last Updated: June 1, 2026
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Cookie <span className="text-gold">Policy</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            How we use cookies and similar tracking technologies on the SupremeWorld platform.
          </p>
        </div>
      </div>
      <div className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div className="p-5 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground leading-relaxed">
            SupremeWorld uses cookies and similar technologies to provide a secure, personalised, and functional experience on our platform. This policy explains what cookies we use, why we use them, and how you can manage your preferences. For full details on how we handle your personal data, see our <Link to={ROUTES.PRIVACY_POLICY} className="text-gold hover:underline">Privacy Policy</Link>.
          </div>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">What Are Cookies?</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites work more efficiently and to provide information to site owners. Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (retained until they expire or you delete them). We may also use similar technologies such as web beacons, pixels, and local storage.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Types of Cookies We Use</h2>
            <div className="space-y-5">
              {COOKIE_TYPES.map((ct) => (
                <div key={ct.name} className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display font-semibold text-foreground">{ct.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ct.required ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                      {ct.required ? "Always Active" : "Optional"}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{ct.desc}</p>
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1.5">Examples:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {ct.examples.map((ex) => (
                        <li key={ex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/50 flex-shrink-0" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Third-Party Cookies</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Some cookies on our platform are set by third-party services we use. These third parties have their own privacy and cookie policies. Key third parties include:
            </p>
            <ul className="space-y-2">
              {[
                { name: "Stripe", purpose: "Payment processing and fraud prevention" },
                { name: "Google Analytics", purpose: "Platform usage analytics and performance monitoring" },
                { name: "Intercom", purpose: "In-platform support chat and onboarding" },
                { name: "LinkedIn Insight", purpose: "Professional audience analytics and ad targeting" },
              ].map((tp) => (
                <li key={tp.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 text-sm">
                  <span className="font-medium text-foreground w-28 flex-shrink-0">{tp.name}</span>
                  <span className="text-muted-foreground">{tp.purpose}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Managing Your Cookie Preferences</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              When you first visit SupremeWorld, you will be presented with a cookie consent banner allowing you to accept or decline optional cookies. You can change your preferences at any time from:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Dashboard &gt; Settings &gt; Privacy &gt; Cookie Preferences (for logged-in members)</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Your browser settings — most browsers allow you to block or delete cookies</li>
              <li className="flex items-start gap-2"><span className="text-gold mt-0.5">•</span> Opt-out links provided by third-party advertising networks</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Please note: disabling strictly necessary cookies will prevent the platform from functioning correctly. Disabling analytics cookies will not affect your access to features but will limit our ability to improve the platform.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Contact Us</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For questions about our use of cookies, contact <a href="mailto:privacy@supremeworld.ai" className="text-gold hover:underline">privacy@supremeworld.ai</a>.
            </p>
          </section>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-border text-sm">
            <Link to={ROUTES.PRIVACY_POLICY} className="text-gold hover:underline">Privacy Policy</Link>
            <Link to={ROUTES.TERMS_CONDITIONS} className="text-gold hover:underline">Terms &amp; Conditions</Link>
            <Link to={ROUTES.CONTACT} className="text-gold hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
