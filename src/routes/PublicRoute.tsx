import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { ROLE_DASHBOARD_ROUTES } from "@/constants/roles";

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

export default function PublicRoute({ children, restricted = false }: PublicRouteProps) {
  const { isAuthenticated, user } = useAuthContext();

  if (restricted && isAuthenticated && user) {
    return <Navigate to={ROLE_DASHBOARD_ROUTES[user.role]} replace />;
  }

  return <>{children}</>;
}
