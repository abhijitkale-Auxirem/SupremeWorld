import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, redirectToDashboard } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const success = await login(data);
    setIsLoading(false);
    if (success) {
      toast.success("Welcome back to SupremeWorld.");
      redirectToDashboard();
    } else {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your SupremeWorld account.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" className="mt-1" {...register("email")} aria-describedby={errors.email ? "email-err" : undefined} />
          {errors.email && <p id="email-err" className="text-destructive text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password">Password</Label>
            <Link to={ROUTES.FORGOT_PASSWORD} className="text-xs text-gold hover:text-gold/80 transition-colors">Forgot password?</Link>
          </div>
          <div className="relative">
            <Input id="password" type={showPwd ? "text" : "password"} placeholder="••••••••" className="pr-10" {...register("password")} aria-describedby={errors.password ? "pwd-err" : undefined} />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPwd(!showPwd)} aria-label={showPwd ? "Hide password" : "Show password"}>
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p id="pwd-err" className="text-destructive text-xs mt-1">{errors.password.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-royal-black text-gold border border-gold hover:bg-royal-black-light font-semibold h-11" disabled={!isValid || isLoading}>
          {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing In...</> : "Sign In"}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <Link to={ROUTES.SIGNUP} className="text-gold hover:text-gold/80 font-medium transition-colors">Create Account</Link>
      </p>
      <div className="mt-6 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
        <p className="font-semibold mb-1">Demo Credentials</p>
        <p>Admin: admin@supremeworld.ai / Admin@1234</p>
        <p className="mt-1">Or register a new account via Sign Up.</p>
      </div>
    </AuthLayout>
  );
}
