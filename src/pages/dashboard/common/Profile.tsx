import { useState, useRef } from "react";
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
import { Camera, Trash2, Upload, CheckCircle, Mail, Briefcase, MapPin, Globe, AtSign } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { user, updateUser, updateAvatar } = useAuthContext();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatar ?? null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      bio: "",
      location: "",
      website: "",
      industry: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ProfileFormData) => {
    updateUser({ name: data.name, username: data.username });
    toast.success("Profile updated successfully.");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, GIF, WebP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setAvatarLoading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      // Compress via canvas
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 400;
        const ratio = Math.min(MAX / img.width, MAX / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.85);
        setAvatarPreview(compressed);
        updateAvatar(compressed);
        setAvatarLoading(false);
        toast.success("Profile picture updated. Changes are reflected across the platform.");
      };
      img.onerror = () => {
        toast.error("Failed to process image. Please try another file.");
        setAvatarLoading(false);
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    updateAvatar("");
    toast.success("Profile picture removed.");
  };

  const profileStats = [
    { label: "Role", value: user ? ROLE_LABELS[user.role] : "—", icon: Briefcase },
    { label: "Member Since", value: user ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—", icon: CheckCircle },
    { label: "Membership", value: user?.membershipTier ? (user.membershipTier.charAt(0).toUpperCase() + user.membershipTier.slice(1)) : "—", icon: Globe },
    { label: "Verified", value: user?.isVerified ? "Verified" : "Pending", icon: CheckCircle },
  ];

  return (
    <DashboardLayout>
      <PageHeader
        title="My Profile"
        description="Manage your public profile information and profile picture."
        breadcrumbs={[{ label: "Profile" }]}
      />

      <div className="max-w-3xl space-y-6">

        {/* Profile card with avatar upload */}
        <div className="p-6 rounded-xl border border-border bg-card">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Avatar upload zone */}
            <div className="relative flex-shrink-0">
              {/* Avatar display */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gold/30 shadow-md relative">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={user?.name ?? "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gold/10 flex items-center justify-center text-gold font-display text-3xl font-bold">
                    {user ? getInitials(user.name) : "U"}
                  </div>
                )}
                {avatarLoading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Camera overlay button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gold text-royal-black flex items-center justify-center shadow-md hover:bg-gold/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Upload profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>

              {/* Hidden input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Upload profile picture file"
              />
            </div>

            {/* User info + upload actions */}
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-xl text-foreground truncate">{user?.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5 mb-1">
                <span className="text-gold text-sm font-medium">{user ? ROLE_LABELS[user.role] : ""}</span>
                {user?.isVerified && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>
              {user?.username && (
                <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
                  <AtSign className="w-3 h-3 flex-shrink-0" />
                  <span>{user.username}</span>
                </div>
              )}

              {/* Upload/remove actions */}
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs gap-1.5 hover:border-gold/50 hover:text-gold"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload Photo
                </Button>
                {avatarPreview && (
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleRemoveAvatar}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground text-xs mt-2">
                JPG, PNG, GIF or WebP · Max 5MB · Displayed across all SupremeWorld pages
              </p>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border">
            {profileStats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-xs text-muted-foreground mb-0.5">{s.label}</p>
                <p className={cn("text-sm font-semibold", s.label === "Verified" && s.value === "Verified" ? "text-success" : "text-foreground")}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Edit profile form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 rounded-xl border border-border bg-card space-y-5">
          <div>
            <h3 className="font-display font-semibold text-foreground">Edit Profile</h3>
            <p className="text-muted-foreground text-sm mt-0.5">Update your public-facing profile information.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" className="mt-1" placeholder="Your full name" {...register("name")} />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <div className="relative mt-1">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input id="username" className="pl-9" placeholder="yourhandle" {...register("username")} />
              </div>
              {errors.username && <p className="text-destructive text-xs mt-1">{errors.username.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              className="mt-1 resize-none"
              rows={3}
              placeholder="Tell the SupremeWorld community about yourself..."
              {...register("bio")}
            />
            {errors.bio && <p className="text-destructive text-xs mt-1">{errors.bio.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input id="location" className="pl-9" placeholder="City, Country" {...register("location")} />
              </div>
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <div className="relative mt-1">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input id="industry" className="pl-9" placeholder="e.g. Technology" {...register("industry")} />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <div className="relative mt-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input id="website" className="pl-9" placeholder="https://yoursite.com" {...register("website")} />
            </div>
            {errors.website && <p className="text-destructive text-xs mt-1">{errors.website.message}</p>}
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <p className="text-muted-foreground text-xs">Changes are saved immediately and reflected across the platform.</p>
            <Button
              type="submit"
              className="bg-gold text-royal-black hover:bg-gold/90 font-semibold"
              disabled={!isValid || !isDirty}
            >
              Save Changes
            </Button>
          </div>
        </form>

      </div>
    </DashboardLayout>
  );
}
