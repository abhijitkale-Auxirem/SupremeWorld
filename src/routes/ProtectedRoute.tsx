import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth.types";
import { ROUTES } from "@/constants/routes";
import LoaderSkeleton from "@/components/common/LoaderSkeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowableRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowableRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const location = useLocation();

  if (isLoading) {
    return <LoaderSkeleton />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowableRoles && user && !allowableRoles.includes(user.role)) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}
