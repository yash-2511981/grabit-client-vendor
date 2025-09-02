import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Email is required" }) || undefined,
  password: z.string({ error: "password is required" }) || undefined,
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
