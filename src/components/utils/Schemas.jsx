import { z } from "zod";

export const passwordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const userRegistrationSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    country_code: z.string().min(1, "Country code is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    language: z.enum(["en", "es"]),
    display_mode: z.enum(["light", "dark"]),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const employeeSchema = z.object({
  user_name: z.string().min(1).max(255),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  role: z.enum(["Admin", "Employee"]),
  phone_number: z.string().max(50).optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export const guestSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  date_of_birth: z.preprocess(
    (value) => {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return null;
      }

      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    },
    z
      .date({
        required_error: "Date of Birth is required",
        invalid_type_error: "Please specify a valid date",
      })
      .refine((date) => date <= new Date(), {
        message: "Date cannot be in the future",
      }),
  ),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone_number: z.string().min(1, "Phone Number is required"),
  identification_number: z.string().min(1, "Identification Number is required"),
  address: z.object({
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postal_code: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  emergency_contact: z.object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    phone_number: z.string().min(1, "Phone Number is required"),
  }),
  vehicle: z.object({
    make: z.string().optional(),
    model: z.string().optional(),
    plate_number: z.string().optional(),
  }),
});

export const additionalGuestSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.preprocess(
    (value) => {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return null;
      }

      const date = new Date(value);
      return isNaN(date.getTime()) ? null : date;
    },
    z
      .date({
        required_error: "Date of Birth is required",
        invalid_type_error: "Please specify a valid date",
      })
      .refine((date) => date <= new Date(), {
        message: "Date cannot be in the future",
      }),
  ),
  nationality: z.string().min(1, "Nationality is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  identification_number: z.string().min(1, "Identification number is required"),
});

export const reservationSchema = z.object({
  check_in: z.date(),
  check_out: z.date(),
  payment_method: z.string().min(1, "Must provide payment method"),
  total_amount: z.string().min(1, "Must provide total amount due"),
  payment_status: z.string().min(1, "Must provide payment status"),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const emailSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});
