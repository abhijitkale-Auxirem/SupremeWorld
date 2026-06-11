import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { otpSchema, OTPFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function VerifyOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as { email?: string })?.email ?? "";

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
  });

  const onSubmit = async (_data: OTPFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    toast.success("Email verified successfully. Welcome to SupremeWorld!");
    navigate(ROUTES.LOGIN);
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setResending(false);
    toast.success("A new OTP has been sent to your email.");
  };

  return (
    <AuthLayout title="Verify Your Email" subtitle={`Enter the 6-digit code sent to ${email || "your email"}.`}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <Label htmlFor="otp">Verification Code</Label>
          <Input id="otp" placeholder="000000" className="mt-1 text-center text-2xl tracking-widest font-mono" maxLength={6} {...register("otp")} />
          {errors.otp && <p className="text-destructive text-xs mt-1">{errors.otp.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-royal-black text-gold border border-gold hover:bg-royal-black-light font-semibold h-11" disabled={!isValid || isLoading}>
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Verifying...</> : "Verify Email"}
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={handleResend} disabled={resending}>
          {resending ? "Sending..." : "Resend Code"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-4">
        <Link to={ROUTES.LOGIN} className="text-gold hover:text-gold/80">Back to Sign In</Link>
      </p>
      <p className="text-xs text-muted-foreground mt-2 text-center">Demo: any 6-digit code works.</p>
    </AuthLayout>
  );
}
