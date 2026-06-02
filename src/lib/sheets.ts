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
    // Apps Script returns a 302 → script.googleusercontent.com on SUCCESS
    // (doPost has already run + appended the row before redirecting). The
    // redirect target isn't reliably readable server-to-server, so we treat
    // the 302 itself as success and do NOT follow it.
    redirect: "manual",
  });

  // 2xx or any 3xx redirect = doPost executed successfully.
  if (res.status >= 200 && res.status < 400) {
    return { ok: true, stored: true };
  }
  throw new Error(`Sheet webhook failed: ${res.status} ${res.statusText}`);
}
