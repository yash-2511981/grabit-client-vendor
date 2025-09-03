import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z.string({ error: "password is required" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

export const registerFormSchema = z.object({
  name: z
    .string({ error: "please enter a valid value" })
    .min(5, { error: "restaurant name is required" }),
  email: z.email({ error: "Enter valid email address" }),
  address: z
    .string()
    .min(60, { error: "there should be atleast 40 chararcters" }),
  category: z.enum(["veg", "non-veg", "both"]),
  phone: z
    .string()
    .length(10, { error: "Enter valid mobile number" })
    .regex(/^\d+$/, { error: "Phone must contain only digits" }),
  pincode: z
    .string()
    .length(6, { error: "Enter valid pincode" })
    .regex(/^\d+$/, { error: "Pincode should only contains digits" }),
  password: z
    .string()
    .min(6, { error: "password should contains at least six characters" }),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
