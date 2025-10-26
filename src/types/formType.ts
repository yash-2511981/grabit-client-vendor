import { z } from "zod";

//only chars and space are allowed validation
const onlyCharsSpace = z
  .string({ error: "invalid input" })
  .min(1, { error: "required" })
  .regex(/^[A-Za-z\s]+$/, { error: "only characters and spaces" });

//only numbers are allowed
const onlyNumbers = z
  .string({ error: "required" })
  .regex(/^[0-9]+$/, { error: "invalid input" });

//only numbers and chars no space
// const onlyNumbersAndChars = z
//   .string({ error: "invalid value" })
//   .regex(/^[A-Z0-9]+$/, { error: "invalid value" });

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

//pdf validations
export const fileValidations = z
  .custom<File | undefined>()
  .refine((file) => !file || file instanceof File, {
    message: "File is required",
  })
  .refine((file) => !file || file.type === "application/pdf", {
    message: "Only PDF files are allowed",
  })
  .refine((file) => !file || file.size <= 1024 * 1024, {
    message: "Maximum file size should be 1MB",
  });

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
  _id: z.string().optional(),
  name: onlyCharsSpace,
  duration: z.enum(["1m", "3m", "6m", "12m"], { message: "invalid input" }),

  weeklyMenu: z
    .array(z.string().min(1, { message: "invalid product" }))
    .length(7, { message: "select product for all day" }),
    
  price: z
    .string({ error: "enter price" })
    .regex(/^\d+$/, { message: "invalid amount" }),
  save: z.number({ error: "failed to calculate the saving amount" }),
  mealTime: z.enum(["breakfast", "lunch", "dinner"], {
    error: "select mealtime",
  }),
  category: z.enum(["veg", "non-veg", "both"], { error: "invalid category" }),
});

export type AddOrEditSubscriptionType = z.infer<
  typeof addOrEditSubscriptionSchema
>;

//profile page forms schemas
export const viewOrEditPersonalDetailsSchema = z.object({
  name: onlyCharsSpace,
  email: z.email({ error: "invalid email" }),
  address: z
    .string({ error: "invalid input" })
    .min(40, {
      error: "There should be at least 40 characters",
    })
    .regex(/^[A-Za-z\s0-9,]+$/, { error: "no special chars are allowed" }),
  category: z.enum(["veg", "non-veg", "both"]),
  phone: z
    .string()
    .length(10, { error: "Enter valid mobile number" })
    .regex(/^[0-9]+$/, { error: "Phone must contain only digits" }),
  pincode: onlyNumbers.length(6, { error: "invalid" }),
  ownerName: onlyCharsSpace.max(30, { error: "max 30 chars" }),
  ownerEmail: z.email({ error: "invalid email" }),
  ownerContact: onlyNumbers.length(10, { error: "invalid" }),
});

export type ViewOrEditPersonalDetailsSchema = z.infer<
  typeof viewOrEditPersonalDetailsSchema
>;

//personal document model schemas
export const foodLicensModalSchema = z.object({
  foodLicens: fileValidations,
  foodLicensIssueDate: z.string().min(1, { error: "invalid date" }),
  foodLicensExpiryDate: z.string().min(1, { error: "invalid date" }),
});

export type FoodLicensModelType = z.infer<typeof foodLicensModalSchema>;

export const aadharCardModalSchema = z.object({
  aadharCard: fileValidations,
  aadharNumber: onlyNumbers
    .min(12, { error: "Invalid value" })
    .max(12, { error: "Invalid value" }),
});

export type AadharCardModalType = z.infer<typeof aadharCardModalSchema>;

export const panCardModalSchema = z.object({
  panCard: fileValidations,
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, { message: "Invalid PAN number format" }),
});

export type PanCardModalType = z.infer<typeof panCardModalSchema>;

export const updatePasswordModalSchema = z.object({
  oldPassword: z.string().min(1, { error: "invalid value" }),
  newPassword: z
    .string()
    .min(6, { error: "password should contains at least six characters" }),
});

export type UpdatePasswordModalType = z.infer<typeof updatePasswordModalSchema>;

export const bankDetailsFormSchema = z.object({
  _id: z.string().optional(),
  bankName: onlyCharsSpace,
  branchName: z.string({ error: "invalid valueF" }),
  accountHolderName: onlyCharsSpace,
  accountNo: onlyNumbers,
  ifscCode: z
    .string({ error: "invalid input" })
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
});

export type BankDetailsFormSchema = z.infer<typeof bankDetailsFormSchema>;
