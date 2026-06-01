/**
 * Resident Robotics — form submissions → Google Sheet.
 * Paste this into Extensions → Apps Script of your Google Sheet, set SECRET,
 * then Deploy → New deployment → Web app (Execute as: Me, Access: Anyone).
 * Copy the /exec URL into SHEET_WEBHOOK_URL and the SECRET into
 * SHEET_SHARED_SECRET in the app's .env.local.
 */

const SECRET = "CHANGE_ME_to_a_long_random_string"; // must match SHEET_SHARED_SECRET

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const isInquiry = body.type === "inquiry";
    const name = isInquiry ? "Inquiries" : "Applications";
    let sheet = ss.getSheetByName(name) || ss.insertSheet(name);

    if (isInquiry) {
      ensureHeader(sheet, ["Timestamp", "Name", "Email", "Message"]);
      sheet.appendRow([body.timestamp, body.name, body.email, body.message]);
    } else {
      ensureHeader(sheet, [
        "Timestamp", "Name", "Email", "Phone", "City", "Background", "Message", "Source",
      ]);
      sheet.appendRow([
        body.timestamp, body.fullName, body.email, body.phone,
        body.city, body.background, body.message || "", body.source || "",
      ]);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function ensureHeader(sheet, header) {
  if (sheet.getLastRow() === 0) sheet.appendRow(header);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
