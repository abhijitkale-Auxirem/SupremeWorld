import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROLE_DASHBOARD_ROUTES } from "@/constants/roles";
import { ROUTES } from "@/constants/routes";

export function useAuth() {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    if (auth.user) {
      const route = ROLE_DASHBOARD_ROUTES[auth.user.role];
      navigate(route);
    }
  };

  const redirectToHome = () => {
    navigate(ROUTES.HOME);
  };

  const getDashboardRoute = () => {
    if (!auth.user) return ROUTES.LOGIN;
    return ROLE_DASHBOARD_ROUTES[auth.user.role];
  };

  return {
    ...auth,
    redirectToDashboard,
    redirectToHome,
    getDashboardRoute,
  };
}
