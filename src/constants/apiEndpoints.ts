// All API endpoint constants — components must import from here, never hardcode
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  VERIFY_OTP: `${API_BASE_URL}/auth/verify-otp`,
  RESEND_OTP: `${API_BASE_URL}/auth/resend-otp`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  ME: `${API_BASE_URL}/auth/me`,
} as const;

export const USER_ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/users/profile`,
  CONNECTIONS: `${API_BASE_URL}/users/connections`,
  NOTIFICATIONS: `${API_BASE_URL}/users/notifications`,
  MESSAGES: `${API_BASE_URL}/users/messages`,
} as const;

export const BUSINESS_ENDPOINTS = {
  LIST: `${API_BASE_URL}/businesses`,
  CREATE: `${API_BASE_URL}/businesses`,
  UPDATE: (id: string) => `${API_BASE_URL}/businesses/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/businesses/${id}`,
  OPPORTUNITIES: `${API_BASE_URL}/businesses/opportunities`,
  LEADS: `${API_BASE_URL}/businesses/leads`,
  PARTNERSHIPS: `${API_BASE_URL}/businesses/partnerships`,
} as const;

export const INVESTMENT_ENDPOINTS = {
  DEALS: `${API_BASE_URL}/investments/deals`,
  PORTFOLIO: `${API_BASE_URL}/investments/portfolio`,
  INVESTMENTS: `${API_BASE_URL}/investments`,
  REPORTS: `${API_BASE_URL}/investments/reports`,
} as const;

export const EVENT_ENDPOINTS = {
  LIST: `${API_BASE_URL}/events`,
  CREATE: `${API_BASE_URL}/events`,
  UPDATE: (id: string) => `${API_BASE_URL}/events/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/events/${id}`,
  REGISTER: (id: string) => `${API_BASE_URL}/events/${id}/register`,
  REGISTRATIONS: `${API_BASE_URL}/events/registrations`,
} as const;

export const COMMUNITY_ENDPOINTS = {
  LIST: `${API_BASE_URL}/communities`,
  JOIN: (id: string) => `${API_BASE_URL}/communities/${id}/join`,
  LEAVE: (id: string) => `${API_BASE_URL}/communities/${id}/leave`,
} as const;

export const MARKETPLACE_ENDPOINTS = {
  PRODUCTS: `${API_BASE_URL}/marketplace/products`,
  ORDERS: `${API_BASE_URL}/marketplace/orders`,
  CREATE_PRODUCT: `${API_BASE_URL}/marketplace/products`,
  UPDATE_PRODUCT: (id: string) => `${API_BASE_URL}/marketplace/products/${id}`,
  DELETE_PRODUCT: (id: string) => `${API_BASE_URL}/marketplace/products/${id}`,
} as const;
