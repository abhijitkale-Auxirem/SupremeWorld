import { UserRole } from "@/types/auth.types";
import { ROUTES } from "./routes";

export const ROLES: Record<string, UserRole> = {
  ENTREPRENEUR: "entrepreneur",
  INVESTOR: "investor",
  BUSINESS: "business",
  PROFESSIONAL: "professional",
  CREATOR: "creator",
  PREMIUM: "premium",
  ADMIN: "admin",
};

export const ROLE_LABELS: Record<UserRole, string> = {
  entrepreneur: "Entrepreneur",
  investor: "Investor",
  business: "Business Owner",
  professional: "Professional",
  creator: "Creator / Influencer",
  premium: "Premium Member",
  admin: "Administrator",
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  entrepreneur:
    "Launch and scale your startup, connect with investors, and discover opportunities.",
  investor:
    "Discover high-potential deals, manage your portfolio, and track returns.",
  business:
    "Grow your business globally, generate leads, and form strategic partnerships.",
  professional:
    "Build your network, advance your career, and develop new skills.",
  creator:
    "Grow your audience, monetize your content, and collaborate with brands.",
  premium:
    "Access exclusive concierge services, VIP events, and luxury lifestyle benefits.",
  admin:
    "Manage the SupremeWorld ecosystem, users, and platform operations.",
};

export const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  entrepreneur: ROUTES.ENTREPRENEUR_DASHBOARD,
  investor: ROUTES.INVESTOR_DASHBOARD,
  business: ROUTES.BUSINESS_DASHBOARD,
  professional: ROUTES.PROFESSIONAL_DASHBOARD,
  creator: ROUTES.CREATOR_DASHBOARD,
  premium: ROUTES.PREMIUM_DASHBOARD,
  admin: ROUTES.ADMIN_DASHBOARD,
};

export const ALL_ROLES: UserRole[] = [
  "entrepreneur",
  "investor",
  "business",
  "professional",
  "creator",
  "premium",
  "admin",
];

export const PROTECTED_ROLES: UserRole[] = [
  "entrepreneur",
  "investor",
  "business",
  "professional",
  "creator",
  "premium",
];
