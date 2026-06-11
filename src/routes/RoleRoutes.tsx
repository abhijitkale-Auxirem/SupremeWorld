import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import LoaderSkeleton from "@/components/common/LoaderSkeleton";

// Lazy load all dashboard pages
const EntrepreneurDashboard = lazy(() => import("@/pages/dashboard/entrepreneur/Dashboard"));
const EntrepreneurBusinesses = lazy(() => import("@/pages/dashboard/entrepreneur/MyBusinesses"));
const EntrepreneurOpportunities = lazy(() => import("@/pages/dashboard/entrepreneur/Opportunities"));
const EntrepreneurInvestors = lazy(() => import("@/pages/dashboard/entrepreneur/Investors"));
const EntrepreneurCommunities = lazy(() => import("@/pages/dashboard/entrepreneur/Communities"));
const EntrepreneurEvents = lazy(() => import("@/pages/dashboard/entrepreneur/Events"));
const EntrepreneurAnalytics = lazy(() => import("@/pages/dashboard/entrepreneur/Analytics"));

const InvestorDashboard = lazy(() => import("@/pages/dashboard/investor/Dashboard"));
const InvestorDealFlow = lazy(() => import("@/pages/dashboard/investor/DealFlow"));
const InvestorStartups = lazy(() => import("@/pages/dashboard/investor/Startups"));
const InvestorInvestments = lazy(() => import("@/pages/dashboard/investor/Investments"));
const InvestorPortfolio = lazy(() => import("@/pages/dashboard/investor/Portfolio"));
const InvestorReports = lazy(() => import("@/pages/dashboard/investor/Reports"));
const InvestorAnalytics = lazy(() => import("@/pages/dashboard/investor/Analytics"));

const BusinessDashboard = lazy(() => import("@/pages/dashboard/business/Dashboard"));
const BusinessCompanyProfile = lazy(() => import("@/pages/dashboard/business/CompanyProfile"));
const BusinessLeads = lazy(() => import("@/pages/dashboard/business/Leads"));
const BusinessPartnerships = lazy(() => import("@/pages/dashboard/business/Partnerships"));
const BusinessMarketplace = lazy(() => import("@/pages/dashboard/business/Marketplace"));
const BusinessOpportunities = lazy(() => import("@/pages/dashboard/business/Opportunities"));
const BusinessAnalytics = lazy(() => import("@/pages/dashboard/business/Analytics"));

const ProfessionalDashboard = lazy(() => import("@/pages/dashboard/professional/Dashboard"));
const ProfessionalNetwork = lazy(() => import("@/pages/dashboard/professional/Network"));
const ProfessionalLearning = lazy(() => import("@/pages/dashboard/professional/LearningHub"));
const ProfessionalCertifications = lazy(() => import("@/pages/dashboard/professional/Certifications"));
const ProfessionalCareer = lazy(() => import("@/pages/dashboard/professional/CareerGrowth"));
const ProfessionalAnalytics = lazy(() => import("@/pages/dashboard/professional/Analytics"));

const CreatorDashboard = lazy(() => import("@/pages/dashboard/creator/Dashboard"));
const CreatorContent = lazy(() => import("@/pages/dashboard/creator/ContentHub"));
const CreatorAudience = lazy(() => import("@/pages/dashboard/creator/Audience"));
const CreatorBrandDeals = lazy(() => import("@/pages/dashboard/creator/BrandDeals"));
const CreatorMonetization = lazy(() => import("@/pages/dashboard/creator/Monetization"));
const CreatorAnalytics = lazy(() => import("@/pages/dashboard/creator/Analytics"));

const PremiumDashboard = lazy(() => import("@/pages/dashboard/premium/Dashboard"));
const PremiumConcierge = lazy(() => import("@/pages/dashboard/premium/Concierge"));
const PremiumTravel = lazy(() => import("@/pages/dashboard/premium/LuxuryTravel"));
const PremiumEvents = lazy(() => import("@/pages/dashboard/premium/VIPEvents"));
const PremiumExecutiveClub = lazy(() => import("@/pages/dashboard/premium/ExecutiveClub"));
const PremiumPrivateGroups = lazy(() => import("@/pages/dashboard/premium/PrivateGroups"));
const PremiumBenefits = lazy(() => import("@/pages/dashboard/premium/Benefits"));

const AdminDashboard = lazy(() => import("@/pages/dashboard/admin/Dashboard"));
const AdminUsers = lazy(() => import("@/pages/dashboard/admin/Users"));
const AdminMemberships = lazy(() => import("@/pages/dashboard/admin/Memberships"));
const AdminBusinesses = lazy(() => import("@/pages/dashboard/admin/Businesses"));
const AdminInvestments = lazy(() => import("@/pages/dashboard/admin/Investments"));
const AdminCommunities = lazy(() => import("@/pages/dashboard/admin/Communities"));
const AdminEvents = lazy(() => import("@/pages/dashboard/admin/Events"));
const AdminMarketplace = lazy(() => import("@/pages/dashboard/admin/Marketplace"));
const AdminRevenue = lazy(() => import("@/pages/dashboard/admin/RevenueAnalytics"));
const AdminCompliance = lazy(() => import("@/pages/dashboard/admin/Compliance"));
const AdminReports = lazy(() => import("@/pages/dashboard/admin/Reports"));
const AdminSettings = lazy(() => import("@/pages/dashboard/admin/PlatformSettings"));

// Common Dashboard Pages
const DashboardProfile = lazy(() => import("@/pages/dashboard/common/Profile"));
const DashboardMessages = lazy(() => import("@/pages/dashboard/common/Messages"));
const DashboardNotifications = lazy(() => import("@/pages/dashboard/common/Notifications"));
const DashboardSettings = lazy(() => import("@/pages/dashboard/common/Settings"));
const DashboardSecurity = lazy(() => import("@/pages/dashboard/common/Security"));
const DashboardMembership = lazy(() => import("@/pages/dashboard/common/Membership"));
const DashboardAI = lazy(() => import("@/pages/dashboard/common/AIAssistant"));

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoaderSkeleton />}>{children}</Suspense>
);

export function getRoleRoutes() {
  return (
    <>
      {/* Common */}
      <Route path={ROUTES.DASHBOARD_PROFILE} element={<ProtectedRoute><Wrap><DashboardProfile /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD_MESSAGES} element={<ProtectedRoute><Wrap><DashboardMessages /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD_NOTIFICATIONS} element={<ProtectedRoute><Wrap><DashboardNotifications /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD_SETTINGS} element={<ProtectedRoute><Wrap><DashboardSettings /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD_SECURITY} element={<ProtectedRoute><Wrap><DashboardSecurity /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD_MEMBERSHIP} element={<ProtectedRoute><Wrap><DashboardMembership /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.DASHBOARD_AI} element={<ProtectedRoute><Wrap><DashboardAI /></Wrap></ProtectedRoute>} />

      {/* Entrepreneur */}
      <Route path={ROUTES.ENTREPRENEUR_DASHBOARD} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ENTREPRENEUR_BUSINESSES} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurBusinesses /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ENTREPRENEUR_OPPORTUNITIES} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurOpportunities /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ENTREPRENEUR_INVESTORS} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurInvestors /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ENTREPRENEUR_COMMUNITIES} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurCommunities /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ENTREPRENEUR_EVENTS} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurEvents /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ENTREPRENEUR_ANALYTICS} element={<ProtectedRoute allowableRoles={["entrepreneur"]}><Wrap><EntrepreneurAnalytics /></Wrap></ProtectedRoute>} />

      {/* Investor */}
      <Route path={ROUTES.INVESTOR_DASHBOARD} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.INVESTOR_DEAL_FLOW} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorDealFlow /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.INVESTOR_STARTUPS} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorStartups /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.INVESTOR_INVESTMENTS} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorInvestments /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.INVESTOR_PORTFOLIO} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorPortfolio /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.INVESTOR_REPORTS} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorReports /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.INVESTOR_ANALYTICS} element={<ProtectedRoute allowableRoles={["investor"]}><Wrap><InvestorAnalytics /></Wrap></ProtectedRoute>} />

      {/* Business */}
      <Route path={ROUTES.BUSINESS_DASHBOARD} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.BUSINESS_COMPANY_PROFILE} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessCompanyProfile /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.BUSINESS_LEADS} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessLeads /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.BUSINESS_PARTNERSHIPS} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessPartnerships /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.BUSINESS_MARKETPLACE} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessMarketplace /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.BUSINESS_OPPORTUNITIES} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessOpportunities /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.BUSINESS_ANALYTICS} element={<ProtectedRoute allowableRoles={["business"]}><Wrap><BusinessAnalytics /></Wrap></ProtectedRoute>} />

      {/* Professional */}
      <Route path={ROUTES.PROFESSIONAL_DASHBOARD} element={<ProtectedRoute allowableRoles={["professional"]}><Wrap><ProfessionalDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PROFESSIONAL_NETWORK} element={<ProtectedRoute allowableRoles={["professional"]}><Wrap><ProfessionalNetwork /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PROFESSIONAL_LEARNING} element={<ProtectedRoute allowableRoles={["professional"]}><Wrap><ProfessionalLearning /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PROFESSIONAL_CERTIFICATIONS} element={<ProtectedRoute allowableRoles={["professional"]}><Wrap><ProfessionalCertifications /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PROFESSIONAL_CAREER} element={<ProtectedRoute allowableRoles={["professional"]}><Wrap><ProfessionalCareer /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PROFESSIONAL_ANALYTICS} element={<ProtectedRoute allowableRoles={["professional"]}><Wrap><ProfessionalAnalytics /></Wrap></ProtectedRoute>} />

      {/* Creator */}
      <Route path={ROUTES.CREATOR_DASHBOARD} element={<ProtectedRoute allowableRoles={["creator"]}><Wrap><CreatorDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.CREATOR_CONTENT} element={<ProtectedRoute allowableRoles={["creator"]}><Wrap><CreatorContent /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.CREATOR_AUDIENCE} element={<ProtectedRoute allowableRoles={["creator"]}><Wrap><CreatorAudience /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.CREATOR_BRAND_DEALS} element={<ProtectedRoute allowableRoles={["creator"]}><Wrap><CreatorBrandDeals /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.CREATOR_MONETIZATION} element={<ProtectedRoute allowableRoles={["creator"]}><Wrap><CreatorMonetization /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.CREATOR_ANALYTICS} element={<ProtectedRoute allowableRoles={["creator"]}><Wrap><CreatorAnalytics /></Wrap></ProtectedRoute>} />

      {/* Premium */}
      <Route path={ROUTES.PREMIUM_DASHBOARD} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PREMIUM_CONCIERGE} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumConcierge /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PREMIUM_TRAVEL} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumTravel /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PREMIUM_EVENTS} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumEvents /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PREMIUM_EXECUTIVE_CLUB} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumExecutiveClub /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PREMIUM_PRIVATE_GROUPS} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumPrivateGroups /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.PREMIUM_BENEFITS} element={<ProtectedRoute allowableRoles={["premium"]}><Wrap><PremiumBenefits /></Wrap></ProtectedRoute>} />

      {/* Admin */}
      <Route path={ROUTES.ADMIN_DASHBOARD} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminDashboard /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_USERS} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminUsers /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_MEMBERSHIPS} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminMemberships /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_BUSINESSES} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminBusinesses /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_INVESTMENTS} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminInvestments /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_COMMUNITIES} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminCommunities /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_EVENTS} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminEvents /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_MARKETPLACE} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminMarketplace /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_REVENUE} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminRevenue /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_COMPLIANCE} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminCompliance /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_REPORTS} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminReports /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_SETTINGS} element={<ProtectedRoute allowableRoles={["admin"]}><Wrap><AdminSettings /></Wrap></ProtectedRoute>} />
    </>
  );
}
