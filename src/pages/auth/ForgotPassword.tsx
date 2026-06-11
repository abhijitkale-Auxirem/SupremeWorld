import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validations";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (_data: ForgotPasswordFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSent(true);
    toast.success("Password reset instructions have been sent to your email.");
  };

  return (
    <AuthLayout title="Reset Your Password" subtitle="Enter your email and we'll send you reset instructions.">
      {sent ? (
        <div className="text-center space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="font-display font-semibold text-foreground">Check Your Email</h2>
          <p className="text-muted-foreground text-sm">Reset instructions have been sent. Please check your inbox.</p>
          <Button variant="outline" className="w-full" asChild><Link to={ROUTES.LOGIN}>Back to Sign In</Link></Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="john@example.com" className="mt-1" {...register("email")} />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full bg-royal-black text-gold border border-gold hover:bg-royal-black-light h-11" disabled={!isValid || isLoading}>
            {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending...</> : "Send Reset Instructions"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to={ROUTES.LOGIN} className="text-gold hover:text-gold/80">Back to Sign In</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
