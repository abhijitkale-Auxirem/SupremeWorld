import { UserRole } from "@/types/auth.types";
import { ROUTES } from "./routes";

export interface SidebarItem {
  label: string;
  icon: string;
  href: string;
  badge?: string;
}

export interface SidebarSection {
  section: string;
  items: SidebarItem[];
}

export const SIDEBAR_CONFIG: Record<UserRole, SidebarSection[]> = {
  entrepreneur: [
    {
      section: "Main",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.ENTREPRENEUR_DASHBOARD },
        { label: "My Businesses", icon: "Building2", href: ROUTES.ENTREPRENEUR_BUSINESSES },
        { label: "Opportunities", icon: "Lightbulb", href: ROUTES.ENTREPRENEUR_OPPORTUNITIES },
        { label: "Investors", icon: "Users", href: ROUTES.ENTREPRENEUR_INVESTORS },
      ],
    },
    {
      section: "Community",
      items: [
        { label: "Communities", icon: "Globe", href: ROUTES.ENTREPRENEUR_COMMUNITIES },
        { label: "Events", icon: "Calendar", href: ROUTES.ENTREPRENEUR_EVENTS },
        { label: "Analytics", icon: "BarChart3", href: ROUTES.ENTREPRENEUR_ANALYTICS },
      ],
    },
  ],
  investor: [
    {
      section: "Main",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.INVESTOR_DASHBOARD },
        { label: "Deal Flow", icon: "TrendingUp", href: ROUTES.INVESTOR_DEAL_FLOW },
        { label: "Startups", icon: "Rocket", href: ROUTES.INVESTOR_STARTUPS },
        { label: "Investments", icon: "DollarSign", href: ROUTES.INVESTOR_INVESTMENTS },
      ],
    },
    {
      section: "Performance",
      items: [
        { label: "Portfolio", icon: "PieChart", href: ROUTES.INVESTOR_PORTFOLIO },
        { label: "Reports", icon: "FileText", href: ROUTES.INVESTOR_REPORTS },
        { label: "Analytics", icon: "BarChart3", href: ROUTES.INVESTOR_ANALYTICS },
      ],
    },
  ],
  business: [
    {
      section: "Main",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.BUSINESS_DASHBOARD },
        { label: "Company Profile", icon: "Building", href: ROUTES.BUSINESS_COMPANY_PROFILE },
        { label: "Leads", icon: "Users", href: ROUTES.BUSINESS_LEADS },
        { label: "Partnerships", icon: "Handshake", href: ROUTES.BUSINESS_PARTNERSHIPS },
      ],
    },
    {
      section: "Growth",
      items: [
        { label: "Marketplace", icon: "ShoppingBag", href: ROUTES.BUSINESS_MARKETPLACE },
        { label: "Opportunities", icon: "Lightbulb", href: ROUTES.BUSINESS_OPPORTUNITIES },
        { label: "Analytics", icon: "BarChart3", href: ROUTES.BUSINESS_ANALYTICS },
      ],
    },
  ],
  professional: [
    {
      section: "Main",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.PROFESSIONAL_DASHBOARD },
        { label: "My Network", icon: "Network", href: ROUTES.PROFESSIONAL_NETWORK },
        { label: "Learning Hub", icon: "BookOpen", href: ROUTES.PROFESSIONAL_LEARNING },
        { label: "Certifications", icon: "Award", href: ROUTES.PROFESSIONAL_CERTIFICATIONS },
      ],
    },
    {
      section: "Growth",
      items: [
        { label: "Career Growth", icon: "TrendingUp", href: ROUTES.PROFESSIONAL_CAREER },
        { label: "Analytics", icon: "BarChart3", href: ROUTES.PROFESSIONAL_ANALYTICS },
      ],
    },
  ],
  creator: [
    {
      section: "Main",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.CREATOR_DASHBOARD },
        { label: "Content Hub", icon: "Video", href: ROUTES.CREATOR_CONTENT },
        { label: "Audience", icon: "Users", href: ROUTES.CREATOR_AUDIENCE },
        { label: "Brand Deals", icon: "Briefcase", href: ROUTES.CREATOR_BRAND_DEALS },
      ],
    },
    {
      section: "Revenue",
      items: [
        { label: "Monetization", icon: "DollarSign", href: ROUTES.CREATOR_MONETIZATION },
        { label: "Analytics", icon: "BarChart3", href: ROUTES.CREATOR_ANALYTICS },
      ],
    },
  ],
  premium: [
    {
      section: "Premium Services",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.PREMIUM_DASHBOARD },
        { label: "Concierge", icon: "Star", href: ROUTES.PREMIUM_CONCIERGE },
        { label: "Luxury Travel", icon: "Plane", href: ROUTES.PREMIUM_TRAVEL },
        { label: "VIP Events", icon: "Crown", href: ROUTES.PREMIUM_EVENTS },
      ],
    },
    {
      section: "Exclusive",
      items: [
        { label: "Executive Club", icon: "Shield", href: ROUTES.PREMIUM_EXECUTIVE_CLUB },
        { label: "Private Groups", icon: "Lock", href: ROUTES.PREMIUM_PRIVATE_GROUPS },
        { label: "My Benefits", icon: "Gift", href: ROUTES.PREMIUM_BENEFITS },
      ],
    },
  ],
  admin: [
    {
      section: "Management",
      items: [
        { label: "Dashboard", icon: "LayoutDashboard", href: ROUTES.ADMIN_DASHBOARD },
        { label: "Users", icon: "Users", href: ROUTES.ADMIN_USERS },
        { label: "Memberships", icon: "CreditCard", href: ROUTES.ADMIN_MEMBERSHIPS },
        { label: "Businesses", icon: "Building2", href: ROUTES.ADMIN_BUSINESSES },
      ],
    },
    {
      section: "Platform",
      items: [
        { label: "Investments", icon: "TrendingUp", href: ROUTES.ADMIN_INVESTMENTS },
        { label: "Communities", icon: "Globe", href: ROUTES.ADMIN_COMMUNITIES },
        { label: "Events", icon: "Calendar", href: ROUTES.ADMIN_EVENTS },
        { label: "Marketplace", icon: "ShoppingBag", href: ROUTES.ADMIN_MARKETPLACE },
      ],
    },
    {
      section: "Analytics",
      items: [
        { label: "Revenue", icon: "DollarSign", href: ROUTES.ADMIN_REVENUE },
        { label: "Compliance", icon: "Shield", href: ROUTES.ADMIN_COMPLIANCE },
        { label: "Reports", icon: "FileText", href: ROUTES.ADMIN_REPORTS },
        { label: "Settings", icon: "Settings", href: ROUTES.ADMIN_SETTINGS },
      ],
    },
  ],
};

export const COMMON_SIDEBAR_ITEMS: SidebarItem[] = [
  { label: "Profile", icon: "User", href: ROUTES.DASHBOARD_PROFILE },
  { label: "Messages", icon: "MessageSquare", href: ROUTES.DASHBOARD_MESSAGES },
  { label: "Notifications", icon: "Bell", href: ROUTES.DASHBOARD_NOTIFICATIONS },
  { label: "AI Assistant", icon: "Bot", href: ROUTES.DASHBOARD_AI },
  { label: "Membership", icon: "Crown", href: ROUTES.DASHBOARD_MEMBERSHIP },
  { label: "Settings", icon: "Settings", href: ROUTES.DASHBOARD_SETTINGS },
  { label: "Security", icon: "Shield", href: ROUTES.DASHBOARD_SECURITY },
];
