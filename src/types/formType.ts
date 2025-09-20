import { z } from "zod";

//only chars and space are allowed validation
const onlyCharsSpace = z
  .string()
  .min(1, { error: "required" })
  .regex(/^[A-Za-z\s]+$/, { error: "only characters and spaces" });

//only numbers are allowed
const onlyNumbers = z
  .string({ error: "required" })
  .regex(/^[0-9]+$/, { error: "only numbers are allowed" });

//only numbers and chars no space
const onlyNumbersAndChars = z
  .string({ error: "invalid value" })
  .regex(/^[A-Z0-9]+$/, { error: "invalid value" });

//image validation
export const imageValidation = z
  .custom<File>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    { error: "only images allowed" }
  )
  .refine(
    (file) => !file || (file instanceof File && file.size < 1024 * 1024 * 2),
    { error: "maximum file size should be 2MB" }
  );

//login form schema
export const loginFormSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z.string({ error: "password is required" }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

//registration form schema
export const registerFormSchema = z.object({
  name: onlyCharsSpace,
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

//add or edit product form schema
export const addProductSchema = z.object({
  photo: imageValidation,
  name: onlyCharsSpace,
  description: z
    .string({ error: "Description is required" })
    .min(20, { error: "At least 20 characters" })
    .max(50, { error: "Description should not be more than 50 chars" })
    .regex(/^[A-Za-z\s]+$/, {
      error: "Description must contain only letters",
    }),

  price: onlyNumbers,

  category: z.enum(["veg", "non-veg"]),
});

export type AddOrEditProductType = z.infer<typeof addProductSchema>;

//add or edit subscription for schema
export const addOrEditSubscriptionSchema = z.object({
  name: onlyCharsSpace,
  duration: z.enum(["1m", "2m", "3m", "4m"], { error: "invalid input" }),
  day1: z.string().min(1, { error: "invalid product" }),
  day2: z.string().min(1, { error: "invalid product" }),
  day3: z.string().min(1, { error: "invalid product" }),
  day4: z.string().min(1, { error: "invalid product" }),
  day5: z.string().min(1, { error: "invalid product" }),
  day6: z.string().min(1, { error: "invalid product" }),
  day7: z.string().min(1, { error: "invalid product" }),
  price: z.string().regex(/^\d+$/, { error: "invalid amount" }),
  mealtime: z.enum(["breakfast", "lunch", "dinner"]),
});

export type addOrEditSubscriptionType = z.infer<
  typeof addOrEditSubscriptionSchema
>;

//profile page forms schemas
export const viewOrEditPersonalDetailsSchema = z.object({
  name: onlyCharsSpace,
  email: z.email({ error: "Enter valid email address" }),
  address: z
    .string()
    .min(60, { error: "there should be atleast 40 chararcters" }),
  category: z.enum(["veg", "non-veg", "both"]),
  phone: z
    .string()
    .length(10, { error: "Enter valid mobile number" })
    .regex(/^[0-9]+$/, { error: "Phone must contain only digits" }),
  pincode: z
    .string()
    .length(6, { error: "Enter valid pincode" })
    .regex(/^[0-9]+$/, { error: "Pincode should only contains digits" }),
});

export type ViewOrEditPersonalDetailsSchema = z.infer<
  typeof viewOrEditPersonalDetailsSchema
>;

export const personalDocumentsFileSchema = z.object({
  foodLicensUrl: imageValidation,
  adharCardUrl: imageValidation,
  panCardUrl: imageValidation,
});

export type PersonalDocumentsFileSchema = z.infer<
  typeof personalDocumentsFileSchema
>;

export const bankDetailsFormSchema = z.object({
  bankName: onlyCharsSpace,
  accountHolderName: onlyCharsSpace,
  accountNo: onlyNumbers,
  ifscCode: onlyNumbersAndChars,
});

export type BankDetailsFormSchema = z.infer<typeof bankDetailsFormSchema>;
