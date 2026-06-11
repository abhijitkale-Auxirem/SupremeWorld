import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, Lightbulb, Users, Globe, Calendar, BarChart3,
  TrendingUp, Rocket, DollarSign, PieChart, FileText, Building, Handshake,
  ShoppingBag, Network, BookOpen, Award, Video, Briefcase, Star, Plane,
  Crown, Shield, Lock, Gift, CreditCard, Settings, Bell, MessageSquare,
  User, Bot, LogOut, Menu, X, ChevronRight,
} from "lucide-react";
import { SIDEBAR_CONFIG, COMMON_SIDEBAR_ITEMS } from "@/constants/sidebarConfig";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNotificationContext } from "@/contexts/NotificationContext";
import { ROUTES } from "@/constants/routes";
import { ROLE_LABELS, ROLE_DASHBOARD_ROUTES } from "@/constants/roles";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import { getInitials } from "@/utils/helpers";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/images/logo-mark.png";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Building2, Lightbulb, Users, Globe, Calendar, BarChart3,
  TrendingUp, Rocket, DollarSign, PieChart, FileText, Building, Handshake,
  ShoppingBag, Network, BookOpen, Award, Video, Briefcase, Star, Plane,
  Crown, Shield, Lock, Gift, CreditCard, Settings, Bell, MessageSquare,
  User, Bot,
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { user, logout } = useAuthContext();
  const { unreadCount } = useNotificationContext();
  const location = useLocation();
  const navigate = useNavigate();

  const roleSections = user ? SIDEBAR_CONFIG[user.role] : [];

  const handleLogoClick = () => {
    if (user) {
      navigate(ROLE_DASHBOARD_ROUTES[user.role]);
    }
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <button onClick={handleLogoClick} className="flex items-center gap-2 w-full">
          <img src={logoMark} alt="SupremeWorld" className="h-8 w-8 rounded" />
          <span className="font-display font-bold text-lg text-sidebar-foreground">
            Supreme<span className="text-gold">World</span>
          </span>
        </button>
      </div>

      {/* User info */}
      {user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-semibold text-sm flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sidebar-foreground text-sm font-medium truncate">{user.name}</p>
              <p className="text-gold text-xs truncate">{ROLE_LABELS[user.role]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-4">
        {roleSections.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40 px-2 mb-1">
              {section.section}
            </p>
            {section.items.map((item) => {
              const Icon = ICON_MAP[item.icon];
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-gold/15 text-gold"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {Icon && (
                    <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-gold" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70")} />
                  )}
                  {item.label}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-gold/60" />}
                </Link>
              );
            })}
          </div>
        ))}

        {/* Common items */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40 px-2 mb-1">
            Account
          </p>
          {COMMON_SIDEBAR_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive = location.pathname === item.href;
            const isNotif = item.icon === "Bell";
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gold/15 text-gold"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon && (
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-gold" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70")} />
                )}
                {item.label}
                {isNotif && unreadCount > 0 && (
                  <span className="ml-auto bg-gold text-royal-black text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setLogoutModal(true)}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar border-r border-sidebar-border animate-fade-in-left">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1 lg:flex-none" />

          <div className="flex items-center gap-2">
            <Link
              to={ROUTES.DASHBOARD_NOTIFICATIONS}
              className="relative p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold text-royal-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
            <Link
              to={ROUTES.DASHBOARD_MESSAGES}
              className="p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Messages"
            >
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              to={ROUTES.DASHBOARD_PROFILE}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Profile"
            >
              <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-semibold text-xs">
                {user ? getInitials(user.name) : "U"}
              </div>
              <span className="hidden sm:block text-sm font-medium text-foreground/80 max-w-[120px] truncate">
                {user?.name}
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 scrollbar-thin animate-fade-in">
          {children}
        </main>
      </div>

      <ConfirmationModal
        open={logoutModal}
        onOpenChange={setLogoutModal}
        title="Sign Out of SupremeWorld"
        description="Are you sure you want to sign out? Your session data will be cleared."
        confirmLabel="Sign Out"
        cancelLabel="Stay Signed In"
        variant="warning"
        onConfirm={handleLogout}
      />
    </div>
  );
}
