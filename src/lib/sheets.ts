// Server-only. Appends a submission row to the Google Sheet through a
// Google Apps Script web-app endpoint (no service-account keys to manage).
// Configure SHEET_WEBHOOK_URL + SHEET_SHARED_SECRET in .env.local.

type SheetType = "application" | "inquiry";

export async function appendToSheet(
  type: SheetType,
  data: Record<string, string | undefined>
): Promise<{ ok: true; stored: boolean }> {
  const url = process.env.SHEET_WEBHOOK_URL;
  const secret = process.env.SHEET_SHARED_SECRET ?? "";

  const payload = {
    type,
    secret,
    timestamp: new Date().toISOString(),
    ...data,
  };

  // Not wired up yet → log so the form still works end-to-end in dev.
  if (!url) {
    console.warn(
      "[sheets] SHEET_WEBHOOK_URL not set — submission logged only (not stored):",
      JSON.stringify({ ...payload, secret: undefined })
    );
    return { ok: true, stored: false };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Apps Script responds with a redirect to googleusercontent — fetch follows it.
    redirect: "follow",
  });

  if (!res.ok) {
    throw new Error(`Sheet webhook failed: ${res.status} ${res.statusText}`);
  }
  return { ok: true, stored: true };
}
