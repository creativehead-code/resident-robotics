"use server";

import { headers } from "next/headers";
import { applicationSchema, inquirySchema, fieldErrors } from "@/lib/forms";
import { appendToSheet } from "@/lib/sheets";
import type { FormState } from "@/lib/formState";

// Basic in-memory rate limit (per server instance). Good enough for a
// landing page; resets on redeploy.
const hits = new Map<string, number[]>();
function rateLimited(key: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now);
  hits.set(key, arr);
  return arr.length > max;
}

async function clientKey(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function submitApplication(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot — bots fill hidden fields. Pretend success, store nothing.
  if (formData.get("company")) return { ok: true };

  if (rateLimited(`apply:${await clientKey()}`)) {
    return { ok: false, message: "Too many attempts. Please try again in a minute." };
  }

  const parsed = applicationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      errors: fieldErrors(parsed.error),
      message: "Please fix the highlighted fields.",
    };
  }

  try {
    await appendToSheet("application", parsed.data);
    return {
      ok: true,
      message: "Application received — our onboarding team will reach out shortly.",
    };
  } catch (err) {
    console.error("[submitApplication]", err);
    return {
      ok: false,
      message:
        "Something went wrong on our end. Please try again, or email partnerships@myequation.in.",
    };
  }
}

export async function submitInquiry(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  if (formData.get("company")) return { ok: true };

  if (rateLimited(`inquire:${await clientKey()}`)) {
    return { ok: false, message: "Too many attempts. Please try again in a minute." };
  }

  const parsed = inquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return {
      ok: false,
      errors: fieldErrors(parsed.error),
      message: "Please fix the highlighted fields.",
    };
  }

  try {
    await appendToSheet("inquiry", parsed.data);
    return { ok: true, message: "Thanks! We'll get back to you soon." };
  } catch (err) {
    console.error("[submitInquiry]", err);
    return {
      ok: false,
      message:
        "Something went wrong on our end. Please try again, or email partnerships@myequation.in.",
    };
  }
}
