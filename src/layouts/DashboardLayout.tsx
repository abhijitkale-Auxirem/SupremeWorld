import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Building2, Lightbulb, Users, Globe, Calendar, BarChart3,
  TrendingUp, Rocket, DollarSign, PieChart, FileText, Building, Handshake,
  ShoppingBag, Network, BookOpen, Award, Video, Briefcase, Star, Plane,
  Crown, Shield, Lock, Gift, CreditCard, Settings, Bell, MessageSquare,
  User, Bot, LogOut, Menu, ChevronRight, Camera, ExternalLink, X,
  Home, Newspaper, HelpCircle, Tag, Sparkles, ChevronDown,
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
import { toast } from "sonner";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Building2, Lightbulb, Users, Globe, Calendar, BarChart3,
  TrendingUp, Rocket, DollarSign, PieChart, FileText, Building, Handshake,
  ShoppingBag, Network, BookOpen, Award, Video, Briefcase, Star, Plane,
  Crown, Shield, Lock, Gift, CreditCard, Settings, Bell, MessageSquare,
  User, Bot,
};

/** Public website quick-links shown in topbar dropdown + sidebar */
const WEBSITE_LINKS = [
  { label: "Home", href: ROUTES.HOME, icon: Home },
  { label: "Networking", href: ROUTES.NETWORKING, icon: Network },
  { label: "Investments", href: ROUTES.INVESTMENTS, icon: TrendingUp },
  { label: "Marketplace", href: ROUTES.MARKETPLACE, icon: ShoppingBag },
  { label: "Events", href: ROUTES.EVENTS, icon: Calendar },
  { label: "Education", href: ROUTES.EDUCATION, icon: BookOpen },
  { label: "Communities", href: ROUTES.COMMUNITIES, icon: Users },
  { label: "Travel", href: ROUTES.TRAVEL, icon: Plane },
  { label: "Blog", href: ROUTES.BLOG, icon: Newspaper },
  { label: "Pricing", href: ROUTES.PRICING, icon: Tag },
  { label: "Help Center", href: ROUTES.HELP_CENTER, icon: HelpCircle },
  { label: "Contact", href: ROUTES.CONTACT, icon: MessageSquare },
];

/** Avatar component — shows image if available, otherwise initials */
function UserAvatar({
  avatar,
  name,
  size = "md",
}: {
  avatar?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-16 h-16 text-xl",
  }[size];

  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name ?? "User"}
        className={cn(sizeClass, "rounded-full object-cover border-2 border-gold/40 flex-shrink-0")}
      />
    );
  }
  return (
    <div
      className={cn(
        sizeClass,
        "rounded-full bg-gold/20 border-2 border-gold/40 flex items-center justify-center text-gold font-semibold flex-shrink-0"
      )}
    >
      {name ? getInitials(name) : "U"}
    </div>
  );
}

/** Topbar dropdown — "Visit Website" button with popover menu */
function VisitWebsiteDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open
            ? "bg-gold text-royal-black border-gold"
            : "border-gold/40 text-gold hover:bg-gold/10"
        )}
        aria-label="Visit public website"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">Visit Website</span>
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-xl shadow-2xl z-50 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-gold/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold text-foreground">Explore SupremeWorld</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted transition-colors">
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>

          {/* Grid of links */}
          <div className="p-3 grid grid-cols-2 gap-1">
            {WEBSITE_LINKS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-muted hover:text-foreground transition-colors group"
              >
                <Icon className="w-3.5 h-3.5 text-gold/70 group-hover:text-gold flex-shrink-0 transition-colors" />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="px-3 pb-3">
            <Link
              to={ROUTES.HOME}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-gold/10 border border-gold/30 text-gold text-sm font-medium hover:bg-gold/20 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Full Website
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/** First-login welcome banner with quick website navigation */
function WelcomeBanner({ name, onDismiss }: { name: string; onDismiss: () => void }) {
  return (
    <div className="mx-4 mt-4 lg:mx-6 lg:mt-6 mb-0 rounded-xl border border-gold/30 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent p-4 flex items-start gap-4 animate-fade-in-up relative overflow-hidden">
      {/* Decorative shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent -translate-x-full animate-[shimmer_2.5s_ease-in-out_0.5s_1_forwards]" />

      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-gold" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-foreground font-semibold text-sm">
          Welcome back, {name.split(" ")[0]}!
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">
          You are now in your personal dashboard. Explore the public platform pages below.
        </p>

        {/* Quick links row */}
        <div className="flex flex-wrap gap-2 mt-3">
          {[
            { label: "Home", href: ROUTES.HOME },
            { label: "Networking", href: ROUTES.NETWORKING },
            { label: "Investments", href: ROUTES.INVESTMENTS },
            { label: "Marketplace", href: ROUTES.MARKETPLACE },
            { label: "Events", href: ROUTES.EVENTS },
            { label: "Blog", href: ROUTES.BLOG },
          ].map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gold/10 text-gold border border-gold/20 hover:bg-gold/20 transition-colors"
            >
              <ExternalLink className="w-2.5 h-2.5" />
              {label}
            </Link>
          ))}
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border hover:bg-muted/80 transition-colors"
          >
            <Globe className="w-2.5 h-2.5" />
            All Pages
          </Link>
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="flex-shrink-0 p-1.5 rounded-lg hover:bg-muted transition-colors"
        aria-label="Dismiss welcome banner"
      >
        <X className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [showWebsiteLinks, setShowWebsiteLinks] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { user, logout, updateAvatar } = useAuthContext();
  const { unreadCount } = useNotificationContext();
  const location = useLocation();
  const navigate = useNavigate();

  // Show welcome banner on first login per session
  const bannerKey = user ? `sw_welcome_dismissed_${user.id}` : null;
  const [showBanner, setShowBanner] = useState(() => {
    if (!bannerKey) return false;
    return !sessionStorage.getItem(bannerKey);
  });

  const dismissBanner = () => {
    if (bannerKey) sessionStorage.setItem(bannerKey, "1");
    setShowBanner(false);
  };

  const roleSections = user ? SIDEBAR_CONFIG[user.role] : [];

  const handleLogoClick = () => {
    if (user) navigate(ROLE_DASHBOARD_ROUTES[user.role]);
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 256;
        const ratio = Math.min(MAX / img.width, MAX / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", 0.82);
        updateAvatar(compressed);
        toast.success("Profile picture updated.");
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <button onClick={handleLogoClick} className="flex items-center gap-2 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded">
          <img src={logoMark} alt="SupremeWorld" className="h-8 w-8 rounded" />
          <span className="font-display font-bold text-lg text-sidebar-foreground">
            Supreme<span className="text-gold">World</span>
          </span>
        </button>
      </div>

      {/* User info with avatar upload */}
      {user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="relative group flex-shrink-0">
              <UserAvatar avatar={user.avatar} name={user.name} size="md" />
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                aria-label="Change profile picture"
              >
                <Camera className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-sidebar-foreground text-sm font-medium truncate">{user.name}</p>
              <p className="text-gold text-xs truncate">{ROLE_LABELS[user.role]}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="mt-2 text-xs text-sidebar-foreground/40 hover:text-gold transition-colors flex items-center gap-1"
          >
            <Camera className="w-3 h-3" />
            Change photo
          </button>
        </div>
      )}

      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
        aria-label="Upload profile picture"
      />

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

        {/* ── Explore Website section ── */}
        <div>
          <button
            onClick={() => setShowWebsiteLinks((v) => !v)}
            className="flex items-center justify-between w-full px-2 mb-1 group"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40 group-hover:text-gold/70 transition-colors">
              Explore Website
            </p>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-sidebar-foreground/30 group-hover:text-gold/60 transition-all duration-200",
                showWebsiteLinks && "rotate-180 text-gold/60"
              )}
            />
          </button>

          {showWebsiteLinks && (
            <div className="space-y-0.5 animate-fade-in">
              {WEBSITE_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-150 group"
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0 text-gold/40 group-hover:text-gold/70 transition-colors" />
                  {label}
                  <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
                </Link>
              ))}
            </div>
          )}

          {/* Always-visible quick link */}
          <Link
            to={ROUTES.HOME}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg text-sm font-medium border border-gold/20 text-gold/80 hover:bg-gold/10 hover:text-gold hover:border-gold/40 transition-all duration-200 group"
          >
            <Globe className="w-4 h-4" />
            Visit Public Site
            <ExternalLink className="w-3.5 h-3.5 ml-auto text-gold/40 group-hover:text-gold/70 transition-colors" />
          </Link>
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
            {/* Visit Website dropdown */}
            <VisitWebsiteDropdown />

            <div className="w-px h-6 bg-border mx-1" />

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
              <UserAvatar avatar={user?.avatar} name={user?.name} size="sm" />
              <span className="hidden sm:block text-sm font-medium text-foreground/80 max-w-[120px] truncate">
                {user?.name}
              </span>
            </Link>
          </div>
        </header>

        {/* Welcome banner — shown once per session */}
        {showBanner && user && (
          <WelcomeBanner name={user.name} onDismiss={dismissBanner} />
        )}

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
