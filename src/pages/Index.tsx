import { Navigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext";
import { ROLE_DASHBOARD_ROUTES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

const Index = () => {
  const { isAuthenticated, user } = useAuthContext();
  if (isAuthenticated && user) {
    return <Navigate to={ROLE_DASHBOARD_ROUTES[user.role]} replace />;
  }
  return <Navigate to={ROUTES.HOME} replace />;
};

export default Index;
