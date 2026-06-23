import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import LoaderSkeleton from "@/components/common/LoaderSkeleton";
import { getRoleRoutes } from "./RoleRoutes";
import NotFound from "@/pages/NotFound";
import { useAuthContext } from "@/contexts/AuthContext";
import { ROLE_DASHBOARD_ROUTES } from "@/constants/roles";

// Public pages
const Home = lazy(() => import("@/pages/public/Home"));
const About = lazy(() => import("@/pages/public/About"));
const Networking = lazy(() => import("@/pages/public/Networking"));
const Investments = lazy(() => import("@/pages/public/Investments"));
const Education = lazy(() => import("@/pages/public/Education"));
const Travel = lazy(() => import("@/pages/public/Travel"));
const Marketplace = lazy(() => import("@/pages/public/Marketplace"));
const Events = lazy(() => import("@/pages/public/Events"));
const Communities = lazy(() => import("@/pages/public/Communities"));
const Concierge = lazy(() => import("@/pages/public/Concierge"));
const Membership = lazy(() => import("@/pages/public/Membership"));
const Pricing = lazy(() => import("@/pages/public/Pricing"));
const Blog = lazy(() => import("@/pages/public/Blog"));
const BlogArticle = lazy(() => import("@/pages/public/BlogArticle"));
const Careers = lazy(() => import("@/pages/public/Careers"));
const Contact = lazy(() => import("@/pages/public/Contact"));
const HelpCenter = lazy(() => import("@/pages/public/HelpCenter"));
const PrivacyPolicy = lazy(() => import("@/pages/public/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/public/TermsAndConditions"));
const CookiePolicy = lazy(() => import("@/pages/public/CookiePolicy"));
const RefundPolicy = lazy(() => import("@/pages/public/RefundPolicy"));

// Auth pages
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const VerifyOTP = lazy(() => import("@/pages/auth/VerifyOTP"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const CompleteProfile = lazy(() => import("@/pages/auth/CompleteProfile"));
const AdminLogin = lazy(() => import("@/pages/auth/AdminLogin"));

const Wrap = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoaderSkeleton />}>{children}</Suspense>
);

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path={ROUTES.HOME} element={<Wrap><Home /></Wrap>} />
      <Route path="/home" element={<Wrap><Home /></Wrap>} />
      <Route path={ROUTES.ABOUT} element={<Wrap><About /></Wrap>} />
      <Route path={ROUTES.NETWORKING} element={<Wrap><Networking /></Wrap>} />
      <Route path={ROUTES.INVESTMENTS} element={<Wrap><Investments /></Wrap>} />
      <Route path={ROUTES.EDUCATION} element={<Wrap><Education /></Wrap>} />
      <Route path={ROUTES.TRAVEL} element={<Wrap><Travel /></Wrap>} />
      <Route path={ROUTES.MARKETPLACE} element={<Wrap><Marketplace /></Wrap>} />
      <Route path={ROUTES.EVENTS} element={<Wrap><Events /></Wrap>} />
      <Route path={ROUTES.COMMUNITIES} element={<Wrap><Communities /></Wrap>} />
      <Route path={ROUTES.CONCIERGE} element={<Wrap><Concierge /></Wrap>} />
      <Route path={ROUTES.MEMBERSHIP} element={<Wrap><Membership /></Wrap>} />
      <Route path={ROUTES.PRICING} element={<Wrap><Pricing /></Wrap>} />
      <Route path={ROUTES.BLOG} element={<Wrap><Blog /></Wrap>} />
      <Route path={ROUTES.BLOG_ARTICLE} element={<Wrap><BlogArticle /></Wrap>} />
      <Route path={ROUTES.CAREERS} element={<Wrap><Careers /></Wrap>} />
      <Route path={ROUTES.CONTACT} element={<Wrap><Contact /></Wrap>} />
      <Route path={ROUTES.HELP_CENTER} element={<Wrap><HelpCenter /></Wrap>} />
      <Route path={ROUTES.PRIVACY_POLICY} element={<Wrap><PrivacyPolicy /></Wrap>} />
      <Route path={ROUTES.TERMS_CONDITIONS} element={<Wrap><TermsAndConditions /></Wrap>} />
      <Route path={ROUTES.COOKIE_POLICY} element={<Wrap><CookiePolicy /></Wrap>} />
      <Route path={ROUTES.REFUND_POLICY} element={<Wrap><RefundPolicy /></Wrap>} />

      {/* Auth */}
      <Route path={ROUTES.LOGIN} element={<PublicRoute restricted><Wrap><Login /></Wrap></PublicRoute>} />
      <Route path={ROUTES.SIGNUP} element={<PublicRoute restricted><Wrap><Signup /></Wrap></PublicRoute>} />
      <Route path={ROUTES.VERIFY_OTP} element={<Wrap><VerifyOTP /></Wrap>} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<PublicRoute restricted><Wrap><ForgotPassword /></Wrap></PublicRoute>} />
      <Route path={ROUTES.COMPLETE_PROFILE} element={<ProtectedRoute><Wrap><CompleteProfile /></Wrap></ProtectedRoute>} />
      <Route path={ROUTES.ADMIN_LOGIN} element={<PublicRoute restricted><Wrap><AdminLogin /></Wrap></PublicRoute>} />

      {/* Dashboard (role-based) */}
      {getRoleRoutes()}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
