import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function BusinessCompanyProfile() {
  return (
    <DashboardLayout>
      <PageHeader title="Company Profile" description="Manage your public business profile." breadcrumbs={[{ label: "Dashboard", href: ROUTES.BUSINESS_DASHBOARD }, { label: "Company Profile" }]} />
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Company profile updated."); }} className="max-w-2xl space-y-4">
        <div><Label>Company Name</Label><Input className="mt-1" defaultValue="Acme Global Ltd" /></div>
        <div><Label>Tagline</Label><Input className="mt-1" defaultValue="Connecting businesses globally." /></div>
        <div><Label>Description</Label><Textarea className="mt-1 min-h-[100px]" defaultValue="We specialize in cross-border B2B solutions." /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Industry</Label><Input className="mt-1" defaultValue="Technology" /></div>
          <div><Label>Website</Label><Input className="mt-1" defaultValue="https://acme.com" /></div>
        </div>
        <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90">Save Company Profile</Button>
      </form>
    </DashboardLayout>
  );
}
