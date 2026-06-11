import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Gift, Check } from "lucide-react";
export default function PremiumBenefits() {
  const benefits = [
    { title: "Dedicated Relationship Manager", desc: "Your personal account manager available 24/7.", active: true },
    { title: "Full Luxury Concierge", desc: "Travel, events, gifting, and lifestyle management.", active: true },
    { title: "Co-Investment Access", desc: "Join curated co-investment opportunities.", active: true },
    { title: "Priority Event Invitations", desc: "First access to all VIP events and galas.", active: true },
    { title: "Custom Analytics Reports", desc: "Bespoke quarterly performance reports.", active: true },
    { title: "White-Glove Onboarding", desc: "Premium personalized platform setup.", active: true },
  ];
  return (
    <DashboardLayout>
      <PageHeader title="My Benefits" description="Your Elite membership benefits and perks." breadcrumbs={[{ label: "Dashboard", href: ROUTES.PREMIUM_DASHBOARD }, { label: "My Benefits" }]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((b) => (
          <div key={b.title} className="flex gap-4 p-5 rounded-xl border border-border bg-card">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${b.active ? "bg-success/10" : "bg-muted"}`}>
              <Check className={`w-5 h-5 ${b.active ? "text-success" : "text-muted-foreground"}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{b.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
