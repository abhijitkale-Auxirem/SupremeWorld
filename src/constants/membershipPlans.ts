export interface MembershipPlan {
  id: string;
  tier: "free" | "networker" | "executive" | "elite";
  name: string;
  price: number;
  billingPeriod: "monthly" | "annual";
  description: string;
  features: string[];
  isPopular?: boolean;
  color: string;
}

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "free",
    tier: "free",
    name: "Explorer",
    price: 0,
    billingPeriod: "monthly",
    description: "Start your journey on SupremeWorld at no cost.",
    features: [
      "Basic profile creation",
      "Browse public listings",
      "Join 3 communities",
      "Access public events",
      "Limited messaging (10/month)",
      "Basic search and discovery",
    ],
    color: "border-border",
  },
  {
    id: "networker",
    tier: "networker",
    name: "Networker",
    price: 49,
    billingPeriod: "monthly",
    description: "For professionals ready to expand their network.",
    features: [
      "Everything in Explorer",
      "Unlimited connections",
      "Advanced profile customization",
      "Join unlimited communities",
      "Priority event access",
      "Unlimited messaging",
      "Business opportunity listings",
      "Investment deal browsing",
      "Learning hub access",
    ],
    color: "border-deep-blue",
  },
  {
    id: "executive",
    tier: "executive",
    name: "Executive",
    price: 149,
    billingPeriod: "monthly",
    description: "For executives and serious business leaders.",
    features: [
      "Everything in Networker",
      "AI Supreme Assistant",
      "Deal room access",
      "Investor matching",
      "Premium marketplace access",
      "Analytics dashboard",
      "Concierge services (basic)",
      "VIP event invitations",
      "Verified badge",
    ],
    isPopular: true,
    color: "border-gold",
  },
  {
    id: "elite",
    tier: "elite",
    name: "Elite",
    price: 499,
    billingPeriod: "monthly",
    description: "The ultimate premium experience for HNW individuals.",
    features: [
      "Everything in Executive",
      "Dedicated relationship manager",
      "Full luxury concierge services",
      "Exclusive private groups",
      "Co-investment opportunities",
      "Global executive club access",
      "Priority travel & lifestyle",
      "White-glove onboarding",
      "Custom analytics reports",
    ],
    color: "border-gold",
  },
];
