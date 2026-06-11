import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import AuthLayout from "@/layouts/AuthLayout";
import { signupSchema, SignupFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { ROLE_DESCRIPTIONS, ROLE_LABELS, PROTECTED_ROLES } from "@/constants/roles";
import { COUNTRY_CODES } from "@/constants/validationRules";
import { UserRole } from "@/types/auth.types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Signup() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: { countryCode: "+1", role: "entrepreneur", agreeToTerms: true },
  });

  const selectedRole = watch("role");
  const agreedToTerms = watch("agreeToTerms");

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const success = await signup(data);
    setIsLoading(false);
    if (success) {
      toast.success("Account created! Please verify your email.");
      navigate(ROUTES.VERIFY_OTP, { state: { email: data.email } });
    }
  };

  return (
    <AuthLayout title="Create Your Account" subtitle="Join 150,000+ members building the future.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Role Selection */}
        <div>
          <Label>I am joining as a...</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {PROTECTED_ROLES.map((role) => (
              <button key={role} type="button" onClick={() => setValue("role", role as UserRole, { shouldValidate: true })}
                className={cn("p-2.5 rounded-lg border text-left transition-all text-sm", selectedRole === role ? "border-gold bg-gold/5 text-foreground" : "border-border text-muted-foreground hover:border-border/60")}>
                <span className="font-medium block">{ROLE_LABELS[role as UserRole]}</span>
              </button>
            ))}
          </div>
          {selectedRole && <p className="text-xs text-muted-foreground mt-1.5">{ROLE_DESCRIPTIONS[selectedRole as UserRole]}</p>}
          {errors.role && <p className="text-destructive text-xs mt-1">{errors.role.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Smith" className="mt-1" {...register("name")} />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="johnsmith" className="mt-1" {...register("username")} />
            {errors.username && <p className="text-destructive text-xs mt-1">{errors.username.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" className="mt-1" {...register("email")} />
          {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex gap-2 mt-1">
            <select {...register("countryCode")} className="w-28 rounded-md border border-input bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {COUNTRY_CODES.map((c) => <option key={c.code} value={c.code}>{c.code} {c.flag}</option>)}
            </select>
            <Input id="phone" placeholder="1234567890" {...register("phone")} />
          </div>
          {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Input id="password" type={showPwd ? "text" : "password"} placeholder="Min 8 chars" className="pr-10" {...register("password")} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowPwd(!showPwd)} aria-label="Toggle password">
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirm">Confirm Password</Label>
          <div className="relative mt-1">
            <Input id="confirm" type={showConfirm ? "text" : "password"} placeholder="Repeat password" className="pr-10" {...register("confirmPassword")} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle confirm password">
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-destructive text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="terms" checked={!!agreedToTerms} onCheckedChange={(v) => setValue("agreeToTerms", v === true, { shouldValidate: true })} />
          <Label htmlFor="terms" className="text-sm font-normal leading-snug cursor-pointer">
            I agree to the{" "}
            <Link to={ROUTES.TERMS_CONDITIONS} className="text-gold hover:underline" target="_blank">Terms & Conditions</Link>{" "}
            and{" "}
            <Link to={ROUTES.PRIVACY_POLICY} className="text-gold hover:underline" target="_blank">Privacy Policy</Link>
          </Label>
        </div>
        {errors.agreeToTerms && <p className="text-destructive text-xs">{errors.agreeToTerms.message}</p>}

        <Button type="submit" className="w-full bg-gold text-royal-black hover:bg-gold/90 font-semibold h-11" disabled={!isValid || isLoading}>
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating Account...</> : "Create My Account"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="text-gold hover:text-gold/80 font-medium">Sign In</Link>
      </p>
    </AuthLayout>
  );
}
