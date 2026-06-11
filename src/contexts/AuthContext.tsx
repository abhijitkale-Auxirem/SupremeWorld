import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthUser, AuthState, LoginCredentials, SignupData } from "@/types/auth.types";
import { ROLE_DASHBOARD_ROUTES } from "@/constants/roles";
import { toast } from "sonner";

interface AuthContextValue extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "supremeworld_auth";

const DEMO_ACCOUNTS: Array<{ email: string; password: string; user: AuthUser }> = [
  {
    email: "admin@supremeworld.ai",
    password: "Admin@1234",
    user: {
      id: "demo_admin",
      email: "admin@supremeworld.ai",
      name: "Supreme Admin",
      username: "supremeadmin",
      role: "admin",
      isVerified: true,
      membershipTier: "elite",
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "entrepreneur@supremeworld.ai",
    password: "Entrepreneur@1",
    user: {
      id: "demo_entrepreneur",
      email: "entrepreneur@supremeworld.ai",
      name: "James Okafor",
      username: "jamesokafor",
      role: "entrepreneur",
      isVerified: true,
      membershipTier: "executive",
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "investor@supremeworld.ai",
    password: "Investor@123",
    user: {
      id: "demo_investor",
      email: "investor@supremeworld.ai",
      name: "Faisal Al-Rashid",
      username: "faisalrashid",
      role: "investor",
      isVerified: true,
      membershipTier: "elite",
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "business@supremeworld.ai",
    password: "Business@123",
    user: {
      id: "demo_business",
      email: "business@supremeworld.ai",
      name: "Sarah Mitchell",
      username: "sarahmitchell",
      role: "business",
      isVerified: true,
      membershipTier: "executive",
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "professional@supremeworld.ai",
    password: "Professional@1",
    user: {
      id: "demo_professional",
      email: "professional@supremeworld.ai",
      name: "Priya Sharma",
      username: "priyasharma",
      role: "professional",
      isVerified: true,
      membershipTier: "networker",
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "creator@supremeworld.ai",
    password: "Creator@1234",
    user: {
      id: "demo_creator",
      email: "creator@supremeworld.ai",
      name: "Sana Al-Farsi",
      username: "sanafarsi",
      role: "creator",
      isVerified: true,
      membershipTier: "networker",
      createdAt: new Date().toISOString(),
    },
  },
  {
    email: "premium@supremeworld.ai",
    password: "Premium@1234",
    user: {
      id: "demo_premium",
      email: "premium@supremeworld.ai",
      name: "Carlos Rivera",
      username: "carlosrivera",
      role: "premium",
      isVerified: true,
      membershipTier: "elite",
      createdAt: new Date().toISOString(),
    },
  },
];

function generateMockUser(data: SignupData): AuthUser {
  return {
    id: `user_${Date.now()}`,
    email: data.email,
    name: data.name,
    username: data.username,
    role: data.role,
    phone: data.phone,
    countryCode: data.countryCode,
    isVerified: false,
    membershipTier: "free",
    createdAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const user: AuthUser = JSON.parse(stored);
        setState({ user, isAuthenticated: true, isLoading: false });
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    // Check demo accounts first
    const demoMatch = DEMO_ACCOUNTS.find(
      (a) => a.email === credentials.email && a.password === credentials.password
    );
    if (demoMatch) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoMatch.user));
      setState({ user: demoMatch.user, isAuthenticated: true, isLoading: false });
      return true;
    }

    // Check stored registered users (password not enforced on mock)
    const allUsers = getStoredUsers();
    const found = allUsers.find((u) => u.email === credentials.email);
    if (found) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      setState({ user: found, isAuthenticated: true, isLoading: false });
      return true;
    }

    return false;
  }, []);

  const signup = useCallback(async (data: SignupData): Promise<boolean> => {
    const allUsers = getStoredUsers();
    const emailExists = allUsers.some((u) => u.email === data.email);
    const usernameExists = allUsers.some((u) => u.username === data.username);

    if (emailExists) {
      toast.error("An account with this email already exists.");
      return false;
    }
    if (usernameExists) {
      toast.error("This username is already taken.");
      return false;
    }

    const newUser = generateMockUser(data);
    const updatedUsers = [...allUsers, newUser];
    localStorage.setItem("supremeworld_users", JSON.stringify(updatedUsers));
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  const updateUser = useCallback((updates: Partial<AuthUser>) => {
    setState((prev) => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { ...prev, user: updated };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function getStoredUsers(): AuthUser[] {
  try {
    const stored = localStorage.getItem("supremeworld_users");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export { ROLE_DASHBOARD_ROUTES };
