import PublicLayout from "@/layouts/PublicLayout";
import { RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const REFUND_SCENARIOS = [
  { icon: CheckCircle, color: "text-success bg-success/10", title: "Eligible for Refund", items: ["Technical issues preventing access to paid features for more than 72 hours where we are unable to resolve", "Duplicate charges due to a billing error on our end", "Membership charges processed after a valid cancellation request was submitted", "Required by applicable consumer protection law in your jurisdiction"] },
  { icon: XCircle, color: "text-destructive bg-destructive/10", title: "Not Eligible for Refund", items: ["Unused portion of a monthly or annual subscription period", "Change of mind after subscribing", "Not using the platform or its features", "Cancellation before the end of a billing period (access continues until end of period)", "Violation of Terms resulting in account termination"] },
  { icon: AlertCircle, color: "text-gold bg-gold/10", title: "Case-by-Case Review", items: ["First-time subscribers requesting a refund within 7 days of initial subscription", "Exceptional circumstances at our sole discretion", "Regulatory requirements in specific jurisdictions", "Billing disputes submitted through your payment provider"] },
];

export default function RefundPolicy() {
  return (
    <PublicLayout>
      <div className="py-16 bg-royal-black">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-4">
            <RefreshCw className="w-3.5 h-3.5" />
            Last Updated: June 1, 2026
          </div>
          <h1 className="font-display text-5xl font-bold text-white mb-4">Refund <span className="text-gold">Policy</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our refund and cancellation policy for SupremeWorld membership subscriptions.
          </p>
        </div>
      </div>
      <div className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto space-y-10">
          <div className="p-5 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground leading-relaxed">
            This Refund Policy applies to paid membership subscriptions on SupremeWorld. By subscribing, you acknowledge and agree to the terms of this policy. For general platform terms, see our <Link to={ROUTES.TERMS_CONDITIONS} className="text-gold hover:underline">Terms &amp; Conditions</Link>.
          </div>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">General Policy</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              SupremeWorld offers subscription-based membership plans that are billed monthly or annually. As a general rule, subscription fees are non-refundable once a billing period has commenced. When you cancel a subscription, you retain access to paid features until the end of the current billing period.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Annual subscriptions are billed upfront. If you cancel an annual subscription, you retain access until the end of the annual period but are not entitled to a prorated refund for unused months, except in the specific circumstances outlined below.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">Refund Eligibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {REFUND_SCENARIOS.map((s) => (
                <div key={s.title} className="p-5 rounded-xl border border-border bg-card">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-3">{s.title}</h3>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="text-muted-foreground text-xs leading-relaxed flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">How to Request a Refund</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              To request a refund, please submit a request within 30 days of the charge in question. Requests submitted after this period will not be reviewed unless required by law.
            </p>
            <ol className="space-y-3">
              {[
                { step: "01", text: "Log in to your account and navigate to Dashboard > Settings > Billing." },
                { step: "02", text: "Locate the charge in question and click 'Request Refund' or 'Dispute Charge'." },
                { step: "03", text: "Provide a description of the issue and attach any supporting documentation." },
                { step: "04", text: "Our billing team will review your request and respond within 5 business days." },
                { step: "05", text: "Approved refunds are processed to the original payment method within 5–10 business days." },
              ].map((s) => (
                <li key={s.step} className="flex gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <span className="font-display text-2xl font-bold text-gold/30 flex-shrink-0">{s.step}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed self-center">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Chargebacks and Payment Disputes</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              If you initiate a chargeback with your bank or payment provider without first contacting us, we reserve the right to permanently suspend your account. We encourage you to contact us directly first at billing@supremeworld.ai — we resolve most billing issues within 24 hours.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              If we determine that a chargeback was submitted in bad faith, we reserve the right to pursue recovery of the disputed amount plus any fees incurred.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Consumer Rights</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This policy does not override any rights you may have under applicable consumer protection laws in your jurisdiction. Consumers in the European Union, United Kingdom, and other jurisdictions with mandatory cooling-off periods may be entitled to additional rights. If you believe applicable law entitles you to a refund not covered by this policy, contact billing@supremeworld.ai with details of the relevant legislation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-foreground mb-3">Contact</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              For all billing and refund enquiries: <a href="mailto:billing@supremeworld.ai" className="text-gold hover:underline">billing@supremeworld.ai</a>
            </p>
          </section>

          <div className="flex flex-wrap gap-4 pt-4 border-t border-border text-sm">
            <Link to={ROUTES.TERMS_CONDITIONS} className="text-gold hover:underline">Terms &amp; Conditions</Link>
            <Link to={ROUTES.PRIVACY_POLICY} className="text-gold hover:underline">Privacy Policy</Link>
            <Link to={ROUTES.CONTACT} className="text-gold hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
