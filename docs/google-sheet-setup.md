# Google Sheet submissions — setup (~3 min)

Form submissions (Applications + Inquiries) append rows to a Google Sheet via a
small Apps Script web app. No service-account keys, no GCP project.

## Steps

1. **Create a Google Sheet** (in the `design@myequation.in` / partnerships Workspace).
   Name it e.g. "Resident Robotics — Submissions". You don't need to add tabs;
   the script creates `Applications` and `Inquiries` automatically.

2. **Open the script editor:** in the Sheet, **Extensions → Apps Script**.

3. **Paste the code** from `docs/google-apps-script.gs` into the editor
   (replace the default `myFunction`).

4. **Set the secret:** change `const SECRET = "CHANGE_ME_to_a_long_random_string"`
   to a long random string. Keep it handy.

5. **Deploy:** **Deploy → New deployment → ⚙ → Web app**.
   - Description: `submissions`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**, authorize when prompted, and **copy the Web app URL**
     (ends in `/exec`).

6. **Wire the app:** put both values in `.env.local`:
   ```
   SHEET_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
   SHEET_SHARED_SECRET=<the same long random string>
   ```
   Then restart the dev server (`npm run dev`).

That's it — submit a test from the site and a row appears in the Sheet.

## Notes
- Until `SHEET_WEBHOOK_URL` is set, the form still works end-to-end but rows are
  only **logged to the server console** (not stored). You'll see them in the
  `npm run dev` terminal.
- To change the secret later, update it in **both** the Apps Script and `.env.local`,
  and create a **new deployment** (Deploy → Manage deployments → edit → new version).
- The endpoint validates the shared secret and a honeypot field; basic rate
  limiting lives in the app's server action.
