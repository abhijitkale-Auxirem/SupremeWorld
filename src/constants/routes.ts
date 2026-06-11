export const ROUTES = {
  // Public
  HOME: "/",
  ABOUT: "/about",
  NETWORKING: "/networking",
  INVESTMENTS: "/investments",
  EDUCATION: "/education",
  TRAVEL: "/travel",
  MARKETPLACE: "/marketplace",
  EVENTS: "/events",
  COMMUNITIES: "/communities",
  CONCIERGE: "/concierge",
  MEMBERSHIP: "/membership",
  PRICING: "/pricing",
  BLOG: "/blog",
  CAREERS: "/careers",
  CONTACT: "/contact",
  HELP_CENTER: "/help",

  // Legal
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_CONDITIONS: "/terms-and-conditions",
  COOKIE_POLICY: "/cookie-policy",
  REFUND_POLICY: "/refund-policy",

  // Auth
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_OTP: "/verify-otp",
  FORGOT_PASSWORD: "/forgot-password",
  COMPLETE_PROFILE: "/complete-profile",
  ADMIN_LOGIN: "/secure-admin-access",

  // Dashboard - Common
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_MESSAGES: "/dashboard/messages",
  DASHBOARD_NOTIFICATIONS: "/dashboard/notifications",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  DASHBOARD_SECURITY: "/dashboard/security",
  DASHBOARD_MEMBERSHIP: "/dashboard/membership",
  DASHBOARD_AI: "/dashboard/ai-assistant",

  // Dashboard - Entrepreneur
  ENTREPRENEUR_DASHBOARD: "/dashboard/entrepreneur",
  ENTREPRENEUR_BUSINESSES: "/dashboard/entrepreneur/businesses",
  ENTREPRENEUR_OPPORTUNITIES: "/dashboard/entrepreneur/opportunities",
  ENTREPRENEUR_INVESTORS: "/dashboard/entrepreneur/investors",
  ENTREPRENEUR_COMMUNITIES: "/dashboard/entrepreneur/communities",
  ENTREPRENEUR_EVENTS: "/dashboard/entrepreneur/events",
  ENTREPRENEUR_ANALYTICS: "/dashboard/entrepreneur/analytics",

  // Dashboard - Investor
  INVESTOR_DASHBOARD: "/dashboard/investor",
  INVESTOR_DEAL_FLOW: "/dashboard/investor/deal-flow",
  INVESTOR_STARTUPS: "/dashboard/investor/startups",
  INVESTOR_INVESTMENTS: "/dashboard/investor/investments",
  INVESTOR_PORTFOLIO: "/dashboard/investor/portfolio",
  INVESTOR_REPORTS: "/dashboard/investor/reports",
  INVESTOR_ANALYTICS: "/dashboard/investor/analytics",

  // Dashboard - Business
  BUSINESS_DASHBOARD: "/dashboard/business",
  BUSINESS_COMPANY_PROFILE: "/dashboard/business/company-profile",
  BUSINESS_LEADS: "/dashboard/business/leads",
  BUSINESS_PARTNERSHIPS: "/dashboard/business/partnerships",
  BUSINESS_MARKETPLACE: "/dashboard/business/marketplace",
  BUSINESS_OPPORTUNITIES: "/dashboard/business/opportunities",
  BUSINESS_ANALYTICS: "/dashboard/business/analytics",

  // Dashboard - Professional
  PROFESSIONAL_DASHBOARD: "/dashboard/professional",
  PROFESSIONAL_NETWORK: "/dashboard/professional/network",
  PROFESSIONAL_LEARNING: "/dashboard/professional/learning",
  PROFESSIONAL_CERTIFICATIONS: "/dashboard/professional/certifications",
  PROFESSIONAL_CAREER: "/dashboard/professional/career",
  PROFESSIONAL_ANALYTICS: "/dashboard/professional/analytics",

  // Dashboard - Creator
  CREATOR_DASHBOARD: "/dashboard/creator",
  CREATOR_CONTENT: "/dashboard/creator/content",
  CREATOR_AUDIENCE: "/dashboard/creator/audience",
  CREATOR_BRAND_DEALS: "/dashboard/creator/brand-deals",
  CREATOR_MONETIZATION: "/dashboard/creator/monetization",
  CREATOR_ANALYTICS: "/dashboard/creator/analytics",

  // Dashboard - Premium
  PREMIUM_DASHBOARD: "/dashboard/premium",
  PREMIUM_CONCIERGE: "/dashboard/premium/concierge",
  PREMIUM_TRAVEL: "/dashboard/premium/travel",
  PREMIUM_EVENTS: "/dashboard/premium/events",
  PREMIUM_EXECUTIVE_CLUB: "/dashboard/premium/executive-club",
  PREMIUM_PRIVATE_GROUPS: "/dashboard/premium/private-groups",
  PREMIUM_BENEFITS: "/dashboard/premium/benefits",

  // Dashboard - Admin
  ADMIN_DASHBOARD: "/dashboard/admin",
  ADMIN_USERS: "/dashboard/admin/users",
  ADMIN_MEMBERSHIPS: "/dashboard/admin/memberships",
  ADMIN_BUSINESSES: "/dashboard/admin/businesses",
  ADMIN_INVESTMENTS: "/dashboard/admin/investments",
  ADMIN_COMMUNITIES: "/dashboard/admin/communities",
  ADMIN_EVENTS: "/dashboard/admin/events",
  ADMIN_MARKETPLACE: "/dashboard/admin/marketplace",
  ADMIN_REVENUE: "/dashboard/admin/revenue",
  ADMIN_COMPLIANCE: "/dashboard/admin/compliance",
  ADMIN_REPORTS: "/dashboard/admin/reports",
  ADMIN_SETTINGS: "/dashboard/admin/platform-settings",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
