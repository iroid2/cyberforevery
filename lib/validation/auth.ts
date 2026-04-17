import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password is too long");

export const registerParentSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("A valid email is required").transform((value) => value.toLowerCase()),
  password: passwordSchema,
});

export const passwordSetupSchema = z.object({
  token: z.string().min(32, "Invalid setup token"),
  password: passwordSchema,
});
