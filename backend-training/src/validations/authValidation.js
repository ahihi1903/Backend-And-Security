import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "User name too short")
    .max(20, "User name too long"),
  password: z.string().min(6, "Password too short"),
  role: z.enum(["admin", "user"]).default("user"),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
