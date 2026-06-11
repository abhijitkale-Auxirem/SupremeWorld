import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function CompleteProfile() {
  const { user, updateUser, redirectToDashboard } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    updateUser({ name: fd.get("name") as string });
    toast.success("Profile updated successfully.");
    redirectToDashboard();
  };

  return (
    <AuthLayout title="Complete Your Profile" subtitle="Add details to personalize your SupremeWorld experience.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" defaultValue={user?.name} placeholder="Your full name" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" name="bio" placeholder="Tell the community about yourself..." className="mt-1 min-h-[100px]" />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="City, Country" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" name="industry" placeholder="e.g. Technology, Finance..." className="mt-1" />
        </div>
        <Button type="submit" className="w-full bg-gold text-royal-black hover:bg-gold/90 h-11 font-semibold">
          Complete Profile
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={redirectToDashboard}>
          Skip for Now
        </Button>
      </form>
    </AuthLayout>
  );
}
