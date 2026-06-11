import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ROUTES } from "@/constants/routes";
import logoMark from "@/assets/images/logo-mark.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-royal-black flex flex-col items-center justify-center text-center p-8">
      <img src={logoMark} alt="SupremeWorld" className="h-12 w-12 rounded mb-6" />
      <h1 className="font-display text-7xl font-bold text-gold mb-4">404</h1>
      <h2 className="font-display text-2xl font-semibold text-white mb-3">Page Not Found</h2>
      <p className="text-white/50 mb-8 max-w-sm">The page you are looking for does not exist or has been moved.</p>
      <Link to={ROUTES.HOME} className="inline-flex items-center justify-center px-6 py-3 bg-gold text-royal-black font-semibold rounded-lg hover:bg-gold/90 transition-colors">
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
