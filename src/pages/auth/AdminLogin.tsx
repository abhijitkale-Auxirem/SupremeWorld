import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, LoginFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import logoMark from "@/assets/images/logo-mark.png";

export default function AdminLogin() {
  const [showPwd, setShowPwd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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
      toast.success("Admin access granted.");
      navigate(ROUTES.ADMIN_DASHBOARD);
    } else {
      toast.error("Invalid administrator credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-royal-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoMark} alt="SupremeWorld" className="h-12 w-12 rounded mx-auto mb-3" />
          <div className="flex items-center justify-center gap-2 text-gold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Admin Portal</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Secure Access</h1>
          <p className="text-white/50 text-sm mt-1">Authorized personnel only</p>
        </div>
        <div className="bg-royal-black-light rounded-2xl p-8 border border-royal-black-lighter">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white/70">Admin Email</Label>
              <Input id="email" type="email" placeholder="admin@supremeworld.ai" className="mt-1 bg-royal-black border-royal-black-lighter text-white placeholder:text-white/30" {...register("email")} />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password" className="text-white/70">Admin Password</Label>
              <div className="relative mt-1">
                <Input id="password" type={showPwd ? "text" : "password"} placeholder="••••••••" className="pr-10 bg-royal-black border-royal-black-lighter text-white placeholder:text-white/30" {...register("password")} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70" onClick={() => setShowPwd(!showPwd)} aria-label="Toggle password visibility">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-xs mt-1">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-gold text-royal-black hover:bg-gold/90 font-semibold h-11" disabled={!isValid || isLoading}>
              {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Authenticating...</> : "Access Admin Panel"}
            </Button>
          </form>
          <p className="text-center text-xs text-white/30 mt-4">Demo: admin@supremeworld.ai / Admin@1234</p>
        </div>
      </div>
    </div>
  );
}
