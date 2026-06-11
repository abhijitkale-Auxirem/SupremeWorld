import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import logoMark from "@/assets/images/logo-mark.png";
import heroBg from "@/assets/images/hero-bg.jpg";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel — decorative */}
      <div
        className="hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-royal-black/80" />
        <div className="relative z-10">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <img src={logoMark} alt="SupremeWorld" className="h-9 w-9 rounded" />
            <span className="font-display font-bold text-2xl text-white">
              Supreme<span className="text-gold">World</span>
            </span>
          </Link>
        </div>
        <div className="relative z-10 space-y-6">
          <h2 className="font-display text-4xl font-bold text-white leading-tight">
            The World's Most
            <br />
            <span className="text-gold">Exclusive</span> Network
          </h2>
          <p className="text-white/70 text-lg leading-relaxed max-w-md">
            Join entrepreneurs, investors, business leaders, and premium members from across the globe in one unified ecosystem.
          </p>
          <div className="flex gap-8">
            {[
              { value: "150K+", label: "Members" },
              { value: "$2.4B+", label: "Investments Facilitated" },
              { value: "80+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-bold text-gold">{stat.value}</p>
                <p className="text-white/60 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10">
          <p className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} SupremeWorld. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 bg-background overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <img src={logoMark} alt="SupremeWorld" className="h-8 w-8 rounded" />
              <span className="font-display font-bold text-xl text-foreground">
                Supreme<span className="text-gold">World</span>
              </span>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
