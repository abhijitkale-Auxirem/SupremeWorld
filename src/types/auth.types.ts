export type UserRole =
  | "entrepreneur"
  | "investor"
  | "business"
  | "professional"
  | "creator"
  | "premium"
  | "admin";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  countryCode?: string;
  isVerified: boolean;
  membershipTier: "free" | "networker" | "executive" | "elite";
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  username: string;
  email: string;
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  agreeToTerms: boolean;
}

export interface OTPVerification {
  email: string;
  otp: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
