import { useAuthContext } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth.types";

export function usePermissions() {
  const { user, isAuthenticated } = useAuthContext();

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) return role.includes(user.role);
    return user.role === role;
  };

  const isAdmin = user?.role === "admin";
  const isEntrepreneur = user?.role === "entrepreneur";
  const isInvestor = user?.role === "investor";
  const isBusiness = user?.role === "business";
  const isProfessional = user?.role === "professional";
  const isCreator = user?.role === "creator";
  const isPremium = user?.role === "premium";

  const canAccessDashboard = isAuthenticated;
  const canManageUsers = isAdmin;
  const canViewAnalytics = isAuthenticated;
  const canPostBusiness = isEntrepreneur || isBusiness;
  const canInvest = isInvestor;
  const canAccessConcierge = isPremium || user?.membershipTier === "elite";

  return {
    user,
    isAuthenticated,
    hasRole,
    isAdmin,
    isEntrepreneur,
    isInvestor,
    isBusiness,
    isProfessional,
    isCreator,
    isPremium,
    canAccessDashboard,
    canManageUsers,
    canViewAnalytics,
    canPostBusiness,
    canInvest,
    canAccessConcierge,
  };
}
