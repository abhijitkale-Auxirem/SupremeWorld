import { z } from "zod";
import { VALIDATION_RULES } from "@/constants/validationRules";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(VALIDATION_RULES.NAME.MIN, `Name must be at least ${VALIDATION_RULES.NAME.MIN} characters.`)
      .max(VALIDATION_RULES.NAME.MAX, `Name must not exceed ${VALIDATION_RULES.NAME.MAX} characters.`),
    username: z
      .string()
      .min(VALIDATION_RULES.USERNAME.MIN, `Username must be at least ${VALIDATION_RULES.USERNAME.MIN} characters.`)
      .max(VALIDATION_RULES.USERNAME.MAX, `Username must not exceed ${VALIDATION_RULES.USERNAME.MAX} characters.`)
      .regex(VALIDATION_RULES.USERNAME.PATTERN, VALIDATION_RULES.USERNAME.MESSAGE),
    email: z.string().email("Please enter a valid email address."),
    countryCode: z.string().min(1, "Please select a country code."),
    phone: z.string().regex(VALIDATION_RULES.PHONE.PATTERN, VALIDATION_RULES.PHONE.MESSAGE),
    role: z.enum(["entrepreneur", "investor", "business", "professional", "creator", "premium"]),
    password: z
      .string()
      .regex(VALIDATION_RULES.PASSWORD.PATTERN, VALIDATION_RULES.PASSWORD.MESSAGE),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Terms and Conditions." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const otpSchema = z.object({
  otp: z.string().regex(VALIDATION_RULES.OTP.PATTERN, "OTP must be exactly 6 digits."),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(VALIDATION_RULES.PASSWORD.PATTERN, VALIDATION_RULES.PASSWORD.MESSAGE),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  name: z.string().min(2).max(60),
  username: z
    .string()
    .min(VALIDATION_RULES.USERNAME.MIN)
    .max(VALIDATION_RULES.USERNAME.MAX)
    .regex(VALIDATION_RULES.USERNAME.PATTERN, VALIDATION_RULES.USERNAME.MESSAGE),
  bio: z.string().max(VALIDATION_RULES.BIO.MAX, `Bio must not exceed ${VALIDATION_RULES.BIO.MAX} characters.`).optional(),
  location: z.string().optional(),
  website: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  industry: z.string().optional(),
});

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required.").max(100),
  description: z.string().max(300).optional(),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
export type TodoFormData = z.infer<typeof todoSchema>;
