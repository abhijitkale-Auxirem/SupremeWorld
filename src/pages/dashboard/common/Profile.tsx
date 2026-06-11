import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import PageHeader from "@/components/common/PageHeader";
import { useAuthContext } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, ProfileFormData } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getInitials } from "@/utils/helpers";
import { ROLE_LABELS } from "@/constants/roles";

export default function Profile() {
  const { user, updateUser } = useAuthContext();
  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? "", username: user?.username ?? "", bio: "", location: "", website: "", industry: "" },
    mode: "onChange",
  });

  const onSubmit = (data: ProfileFormData) => {
    updateUser({ name: data.name, username: data.username });
    toast.success("Profile updated successfully.");
  };

  return (
    <DashboardLayout>
      <PageHeader title="My Profile" description="Manage your public profile information." breadcrumbs={[{ label: "Profile" }]} />
      <div className="max-w-2xl space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-5 p-6 rounded-xl border border-border bg-card">
          <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center text-gold font-display text-2xl font-bold">
            {user ? getInitials(user.name) : "U"}
          </div>
          <div>
            <p className="font-display font-bold text-lg text-foreground">{user?.name}</p>
            <p className="text-gold text-sm">{user ? ROLE_LABELS[user.role] : ""}</p>
            <p className="text-muted-foreground text-sm mt-0.5">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-xl border border-border bg-card space-y-4">
          <h3 className="font-display font-semibold">Edit Profile</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Full Name</Label><Input className="mt-1" {...register("name")} />{errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}</div>
            <div><Label>Username</Label><Input className="mt-1" {...register("username")} />{errors.username && <p className="text-destructive text-xs mt-1">{errors.username.message}</p>}</div>
          </div>
          <div><Label>Bio</Label><Textarea className="mt-1" placeholder="Tell people about yourself..." {...register("bio")} />{errors.bio && <p className="text-destructive text-xs mt-1">{errors.bio.message}</p>}</div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Location</Label><Input className="mt-1" placeholder="City, Country" {...register("location")} /></div>
            <div><Label>Industry</Label><Input className="mt-1" placeholder="e.g. Technology" {...register("industry")} /></div>
          </div>
          <div><Label>Website</Label><Input className="mt-1" placeholder="https://yoursite.com" {...register("website")} />{errors.website && <p className="text-destructive text-xs mt-1">{errors.website.message}</p>}</div>
          <Button type="submit" className="bg-gold text-royal-black hover:bg-gold/90" disabled={!isValid || !isDirty}>Save Profile</Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
