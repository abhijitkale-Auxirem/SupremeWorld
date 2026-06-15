import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/AuthLayout";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { LoginCredentials } from "@/types/auth.types";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DEMO_ACCOUNTS = [
  {
    role: "Admin",
    label: "Platform Admin",
    email: "admin@supremeworld.ai",
    password: "Admin@1234",
    color: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
  {
    role: "Entrepreneur",
    label: "Entrepreneur",
    email: "entrepreneur@supremeworld.ai",
    password: "Entrepreneur@1",
    color: "bg-gold/10 border-gold/30 text-gold",
    dot: "bg-gold",
  },
  {
    role: "Investor",
    label: "Investor",
    email: "investor@supremeworld.ai",
    password: "Investor@123",
    color: "bg-deep-blue/10 border-deep-blue/30 text-deep-blue",
    dot: "bg-deep-blue",
  },
  {
    role: "Business",
    label: "Business Owner",
    email: "business@supremeworld.ai",
    password: "Business@123",
    color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    role: "Professional",
    label: "Professional",
    email: "professional@supremeworld.ai",
    password: "Professional@1",
    color: "bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400",
    dot: "bg-purple-500",
  },
  {
    role: "Creator",
    label: "Creator",
    email: "creator@supremeworld.ai",
    password: "Creator@1234",
    color: "bg-pink-500/10 border-pink-500/30 text-pink-600 dark:text-pink-400",
    dot: "bg-pink-500",
  },
  {
    role: "Premium",
    label: "Premium Member",
    email: "premium@supremeworld.ai",
    password: "Premium@1234",
    color: "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
];

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const { login, redirectToDashboard } = useAuth();

  const { register, handleSubmit, setValue, trigger, formState: { errors, isValid } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const success = await login(data as LoginCredentials);
    setIsLoading(false);
    if (success) {
      toast.success("Welcome back to SupremeWorld.");
      redirectToDashboard();
    } else {
      toast.error("Invalid credentials. Please use a demo account or register.");
    }
  };

  const fillDemo = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setActiveDemo(account.role);
    setValue("email", account.email, { shouldValidate: true });
    setValue("password", account.password, { shouldValidate: true });
    await trigger();
    toast.success(`Demo credentials loaded — ${account.label}`);
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your SupremeWorld account.">
      {/* Demo credentials panel */}
      <div className="mb-5 rounded-xl border border-gold/20 bg-gold/5 overflow-hidden">
        <button
          type="button"
          onClick={() => setDemoOpen(!demoOpen)}
          className="w-full flex items-center justify-between px-4 py-3 hover:bg-gold/10 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-foreground">Try Demo Accounts</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-gold/15 text-gold font-medium">
              {DEMO_ACCOUNTS.length} roles
            </span>
          </div>
          {demoOpen
            ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
            : <ChevronDown className="w-4 h-4 text-muted-foreground" />
          }
        </button>

        {demoOpen && (
          <div className="px-4 pb-4 pt-1 border-t border-gold/10">
            <p className="text-xs text-muted-foreground mb-3">
              Click any role card to auto-fill credentials, then hit Sign In.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
                    acc.color,
                    activeDemo === acc.role
                      ? "ring-2 ring-offset-1 ring-offset-background shadow-md"
                      : "hover:shadow-sm"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", acc.dot)} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold leading-tight truncate">{acc.label}</p>
                    <p className="text-[10px] opacity-70 truncate">{acc.email.split("@")[0]}</p>
                  </div>
                  {activeDemo === acc.role && (
                    <span className="ml-auto text-[10px] font-bold opacity-80 flex-shrink-0">Active</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="mt-1"
            {...register("email")}
            aria-describedby={errors.email ? "email-err" : undefined}
          />
          {errors.email && (
            <p id="email-err" className="text-destructive text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <Label htmlFor="password">Password</Label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-gold hover:text-gold/80 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              className="pr-10"
              {...register("password")}
              aria-describedby={errors.password ? "pwd-err" : undefined}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPwd(!showPwd)}
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="pwd-err" className="text-destructive text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-royal-black text-gold border border-gold hover:bg-royal-black-light font-semibold h-11 transition-all duration-200 hover:scale-[1.01]"
          disabled={!isValid || isLoading}
        >
          {isLoading
            ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Signing In...</>
            : "Sign In"
          }
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Don't have an account?{" "}
        <Link to={ROUTES.SIGNUP} className="text-gold hover:text-gold/80 font-medium transition-colors">
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
}
