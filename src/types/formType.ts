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

//product related schemas
export const addProductSchema = z.object({
  photo: z
    .custom<File>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      { error: "Please upload only images" }
    )
    .refine((file) => file && file.size <= 1024 * 1024 * 2, {
      error: "File size should b less than or equal to 2 MB",
    }),
  name: z
    .string({ error: "Name is required" })
    .min(5, { error: "Name must be at least 5 characters" })
    .regex(/^[A-Za-z\s]+$/, { error: "Name must contain only letters" }),

  description: z
    .string({ error: "Description is required" })
    .min(20, { error: "At least 20 characters" })
    .max(50, { error: "Description should not be more than 50 chars" })
    .regex(/^[A-Za-z\s]+$/, {
      error: "Description must contain only letters",
    }),

  price: z
    .string({ error: "Price is required" })
    .regex(/^[0-9]+$/, { error: "Price must contain only numbers" }),

  category: z.enum(["veg", "non-veg"]),
});

export type AddOrEditProductType = z.infer<typeof addProductSchema>;
