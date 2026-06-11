export const VALIDATION_RULES = {
  NAME: {
    MIN: 2,
    MAX: 60,
  },
  USERNAME: {
    MIN: 3,
    MAX: 20,
    PATTERN: /^[a-zA-Z]+$/,
    MESSAGE: "Username must contain alphabetical characters only, between 3 and 20 characters.",
  },
  PASSWORD: {
    MIN: 8,
    MAX: 16,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/,
    MESSAGE:
      "Password must be 8–16 characters with at least one uppercase, lowercase, number, and special character.",
  },
  PHONE: {
    DIGITS: 10,
    PATTERN: /^\d{10}$/,
    MESSAGE: "Phone number must be exactly 10 digits.",
  },
  OTP: {
    LENGTH: 6,
    PATTERN: /^\d{6}$/,
  },
  BIO: {
    MAX: 500,
  },
  SEARCH_DEBOUNCE_MS: 350,
  IMAGE_MAX_SIZE_MB: 5,
  ACCEPTED_IMAGE_TYPES: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
} as const;

export const COUNTRY_CODES = [
  { code: "+1", country: "USA / Canada", flag: "US" },
  { code: "+44", country: "United Kingdom", flag: "GB" },
  { code: "+91", country: "India", flag: "IN" },
  { code: "+971", country: "UAE", flag: "AE" },
  { code: "+966", country: "Saudi Arabia", flag: "SA" },
  { code: "+65", country: "Singapore", flag: "SG" },
  { code: "+61", country: "Australia", flag: "AU" },
  { code: "+49", country: "Germany", flag: "DE" },
  { code: "+33", country: "France", flag: "FR" },
  { code: "+81", country: "Japan", flag: "JP" },
  { code: "+86", country: "China", flag: "CN" },
  { code: "+55", country: "Brazil", flag: "BR" },
  { code: "+27", country: "South Africa", flag: "ZA" },
  { code: "+234", country: "Nigeria", flag: "NG" },
  { code: "+254", country: "Kenya", flag: "KE" },
  { code: "+20", country: "Egypt", flag: "EG" },
  { code: "+212", country: "Morocco", flag: "MA" },
  { code: "+7", country: "Russia", flag: "RU" },
  { code: "+82", country: "South Korea", flag: "KR" },
  { code: "+52", country: "Mexico", flag: "MX" },
] as const;
