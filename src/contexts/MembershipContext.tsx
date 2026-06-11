import React, { createContext, useContext, useMemo } from "react";
import { useAuthContext } from "./AuthContext";

type MembershipTier = "free" | "standard" | "premium" | "elite";

interface MembershipContextValue {
  tier: MembershipTier;
  isFree: boolean;
  isStandard: boolean;
  isPremium: boolean;
  isElite: boolean;
  hasFeature: (feature: string) => boolean;
  tierLabel: string;
}

const TIER_FEATURES: Record<MembershipTier, string[]> = {
  free: ["browse", "basic-profile", "3-communities", "public-events"],
  standard: [
    "browse",
    "basic-profile",
    "3-communities",
    "public-events",
    "unlimited-connections",
    "unlimited-messaging",
    "business-listings",
    "investment-browsing",
    "learning-hub",
  ],
  premium: [
    "browse",
    "basic-profile",
    "3-communities",
    "public-events",
    "unlimited-connections",
    "unlimited-messaging",
    "business-listings",
    "investment-browsing",
    "learning-hub",
    "ai-assistant",
    "deal-rooms",
    "investor-matching",
    "premium-marketplace",
    "analytics",
    "basic-concierge",
    "vip-events",
    "verified-badge",
  ],
  elite: [
    "browse",
    "basic-profile",
    "3-communities",
    "public-events",
    "unlimited-connections",
    "unlimited-messaging",
    "business-listings",
    "investment-browsing",
    "learning-hub",
    "ai-assistant",
    "deal-rooms",
    "investor-matching",
    "premium-marketplace",
    "analytics",
    "basic-concierge",
    "vip-events",
    "verified-badge",
    "relationship-manager",
    "full-concierge",
    "private-groups",
    "co-investments",
    "executive-club",
    "priority-travel",
    "white-glove",
    "custom-reports",
  ],
};

const TIER_LABELS: Record<MembershipTier, string> = {
  free: "Explorer",
  standard: "Networker",
  premium: "Executive",
  elite: "Elite",
};

const MembershipContext = createContext<MembershipContextValue | null>(null);

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const tier: MembershipTier = user?.membershipTier ?? "free";

  const value = useMemo<MembershipContextValue>(() => ({
    tier,
    isFree: tier === "free",
    isStandard: tier === "standard",
    isPremium: tier === "premium",
    isElite: tier === "elite",
    hasFeature: (feature: string) => TIER_FEATURES[tier].includes(feature),
    tierLabel: TIER_LABELS[tier],
  }), [tier]);

  return (
    <MembershipContext.Provider value={value}>
      {children}
    </MembershipContext.Provider>
  );
}

export function useMembershipContext(): MembershipContextValue {
  const ctx = useContext(MembershipContext);
  if (!ctx) throw new Error("useMembershipContext must be used within MembershipProvider");
  return ctx;
}
