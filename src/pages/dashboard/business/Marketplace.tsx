import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Star } from "lucide-react";
const PRODUCTS = [
  { title: "Business Strategy Template Pack", price: "$199", sales: 48, rating: 4.9 },
  { title: "B2B CRM Integration Guide", price: "$89", sales: 130, rating: 4.7 },
  { title: "Executive Pitch Deck Bundle", price: "$149", sales: 72, rating: 5.0 },
];
export default function BusinessMarketplace() {
  return (
    <DashboardLayout>
      <PageHeader title="Marketplace" description="Sell your business products and services." breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Marketplace" }]} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <div key={p.title} className="p-5 rounded-xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-1">{p.title}</h3>
            <p className="text-gold font-bold mb-2">{p.price}</p>
            <p className="text-sm text-muted-foreground mb-1">{p.sales} sales</p>
            <div className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-gold fill-gold" /><span className="font-semibold">{p.rating}</span></div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
