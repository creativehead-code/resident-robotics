"use client";

import { useActionState, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import { submitApplication } from "@/app/actions";
import { initialFormState, type FormState } from "@/lib/formState";
import Reveal, { RevealWords } from "@/components/ui/Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

/** First-touch lead attribution: prefer UTM tags (your ad links), else the
 *  referring site, else "direct". Captured once and kept for the session. */
function getAttribution(): string {
  if (typeof window === "undefined") return "";
  try {
    const saved = sessionStorage.getItem("rr_source");
    if (saved) return saved;
  } catch {}

  const p = new URLSearchParams(window.location.search);
  const utm = [
    p.get("utm_source"),
    p.get("utm_medium"),
    p.get("utm_campaign"),
    p.get("utm_content"),
    p.get("utm_term"),
  ]
    .filter(Boolean)
    .join(" / ");

  let source = utm;
  if (!source) {
    const ref = document.referrer;
    if (ref) {
      try {
        const host = new URL(ref).hostname.replace(/^www\./, "");
        if (host && host !== window.location.hostname) source = host;
      } catch {}
    }
  }
  source = source || "direct";

  try {
    sessionStorage.setItem("rr_source", source);
  } catch {}
  return source;
}

const inputBase =
  "w-full rounded-lg border bg-[var(--bg-2)] px-4 py-3 text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-faint)] focus:border-[var(--brand-blue)]";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  textarea,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const cls = `${inputBase} ${error ? "border-[#ff6a4d]" : "border-[var(--line)]"}`;
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--fg-faint)]">
        {label}
        {required && <span style={{ color: "var(--orange)" }}> *</span>}
      </span>
      {textarea ? (
        <textarea name={name} rows={4} placeholder={placeholder} className={`${cls} resize-none`} />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={cls}
        />
      )}
      {error && <span className="mt-1 block text-xs text-[#ff8466]">{error}</span>}
    </label>
  );
}

// Hidden honeypot — real users never fill it; bots do.
function Honeypot() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  );
}

function SubmitButton({ pending, label }: { pending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-orange mt-2 w-full justify-center !py-3.5 disabled:opacity-70"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          Sending…
        </span>
      ) : (
        <>
          <span>{label}</span>
          <span className="btn-arrow" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h9M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </>
      )}
    </button>
  );
}

function Success({ state, onReset }: { state: FormState; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <span
        className="grid h-16 w-16 place-items-center rounded-full"
        style={{ background: "rgba(47,107,255,0.15)", border: "1px solid var(--brand-blue)" }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--brand-blue)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5l5 5L20 6" />
        </svg>
      </span>
      <h3 className="h3">You&apos;re in the pipeline.</h3>
      <p className="body-text max-w-sm">{state.message}</p>
      <button onClick={onReset} className="btn btn-ghost mt-2">
        Submit another
      </button>
    </motion.div>
  );
}

export default function ApplySection() {
  const [source, setSource] = useState("");
  useEffect(() => setSource(getAttribution()), []);
  const [appState, applyAction, applyPending] = useActionState(submitApplication, initialFormState);

  // GA4 conversion event on successful submit.
  useEffect(() => {
    if (appState.ok) sendGAEvent("event", "generate_lead", { form_type: "application", source });
  }, [appState.ok, source]);

  const ae = appState.errors ?? {};

  return (
    <section id="apply" className="section relative">
      <div className="container-rr">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Limited Seats · Ahmedabad</span>
          <h2 className="h2 mt-4">
            <RevealWords text="Ready to Build Your Future?" />
          </h2>
          <p className="lead mt-4">
            Apply for the residency — our onboarding team replies fast.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto max-w-2xl">
          <div className="card overflow-hidden p-6 sm:p-8">
            {appState.ok ? (
              <Success state={appState} onReset={() => window.location.reload()} />
            ) : (
              <form action={applyAction} className="relative grid gap-4">
                <Honeypot />
                <input type="hidden" name="source" value={source} readOnly />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="fullName" required error={ae.fullName} autoComplete="name" />
                  <Field label="Email" name="email" type="email" required error={ae.email} autoComplete="email" />
                  <Field label="Phone" name="phone" type="tel" required error={ae.phone} autoComplete="tel" />
                  <Field label="City" name="city" required error={ae.city} placeholder="e.g. Ahmedabad" />
                </div>
                <Field label="College / background" name="background" required error={ae.background} placeholder="e.g. 3rd-year Mechanical, GTU" />
                <Field label="Why do you want to join?" name="message" textarea error={ae.message} placeholder="Optional — tell us what you want to build" />
                {appState.message && !appState.ok && (
                  <p className="text-sm text-[#ff8466]">{appState.message}</p>
                )}
                <SubmitButton pending={applyPending} label="Submit Application" />
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
