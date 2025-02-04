import { z } from "zod";

export const addDetailsSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  requests: z.string().optional(),
});

export const bookingDataSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  time: z.string().min(1, "Time selection is required"),
});
