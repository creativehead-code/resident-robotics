// Shared form-state shape. Kept OUT of the "use server" actions file,
// which may only export async functions.

export type FormState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { ok: false };
