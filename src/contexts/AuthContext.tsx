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

const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@supremeworld.ai",
  password: "Admin@1234",
};

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
    // Check admin credentials
    if (
      credentials.email === MOCK_ADMIN_CREDENTIALS.email &&
      credentials.password === MOCK_ADMIN_CREDENTIALS.password
    ) {
      const adminUser: AuthUser = {
        id: "admin_001",
        email: credentials.email,
        name: "Supreme Admin",
        username: "supremeadmin",
        role: "admin",
        isVerified: true,
        membershipTier: "elite",
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
      setState({ user: adminUser, isAuthenticated: true, isLoading: false });
      return true;
    }

    // Check stored users
    const allUsers = getStoredUsers();
    const found = allUsers.find(
      (u) => u.email === credentials.email
    );

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
