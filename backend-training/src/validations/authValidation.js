import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "User name too short")
    .max(20, "User name too long"),
  password: z.string().min(6, "Password too short"),
  //role: z.enum(["admin", "user"]).default("user"),
  email: z.email("Invalid email"),
  //isVerified: z.boolean().optional().default("false"),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email"),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(72, "Password is too long")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});
