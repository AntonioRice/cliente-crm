import { z } from "zod";

export const guestSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  date_of_birth: z.string().min(1, "Date of Birth is required"),
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
