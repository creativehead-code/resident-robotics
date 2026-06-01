import { z } from "zod";

const phone = z
  .string()
  .trim()
  .regex(/^[+]?[\d\s\-()]{7,16}$/, "Enter a valid phone number");

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  phone,
  city: z.string().trim().min(2, "Which city are you in?").max(60),
  background: z.string().trim().min(2, "Tell us your college / background").max(120),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  source: z.string().trim().max(80).optional().or(z.literal("")),
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email")),
  message: z.string().trim().min(5, "What would you like to ask?").max(800),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;

/** Collapse a ZodError into a { field: message } map (first error per field). */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
