"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  analytics,
  currency,
  payment,
  paymentOptions,
  type PaymentOption,
} from "@/content/page-content";
import { trackEvent } from "@/lib/analytics";
import { safeSource } from "@/lib/params";

/** A link is usable only if it's actually been filled in with an https URL. */
function isConfigured(option: PaymentOption): boolean {
  return option.url.trim().startsWith("https://");
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/*
 * Every option shares this one style object. That is the point: the six amounts are
 * presented as six equal choices, so nothing here may vary by amount — no accent on
 * the highest, no "most popular" treatment, no preselection. If you find yourself
 * adding a conditional to this object, that's the thing to question.
 */
const optionStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 88,
  padding: "var(--space-5) var(--space-4)",
  background: "var(--bg-surface)",
  color: "var(--fg-1)",
  border: "var(--border-w-thicc) solid var(--border-1)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-sticker-md)",
  fontFamily: "var(--font-display)",
  fontSize: "clamp(28px, 3.6vw, 40px)",
  fontWeight: 900,
  letterSpacing: "-0.03em",
  lineHeight: 1,
  textDecoration: "none",
  cursor: "pointer",
  transition: "background var(--dur-fast) var(--easing-out)",
};

const disabledStyle: CSSProperties = {
  ...optionStyle,
  flexDirection: "column",
  gap: "var(--space-2)",
  background: "var(--bg-mute)",
  color: "var(--fg-muted)",
  borderStyle: "dashed",
  boxShadow: "none",
  cursor: "not-allowed",
};

function AmountButton({ option }: { option: PaymentOption }) {
  const [hover, setHover] = useState(false);
  const label = formatAmount(option.amount);

  if (!isConfigured(option)) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${label} — payment link not set up yet`}
        style={disabledStyle}
      >
        <span>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0 }}>Not available yet</span>
      </button>
    );
  }

  function handleClick() {
    /*
     * Read ?source= here rather than with useSearchParams(). useSearchParams forces this
     * whole grid behind a Suspense boundary that only fills in after hydration — meaning
     * the one thing the page exists for wouldn't be a real link until JavaScript arrives.
     * Reading location at click time keeps the anchors server-rendered and clickable
     * immediately; if JS never loads, the link still goes to Stripe and we simply lose
     * the analytics event.
     */
    const source = safeSource(new URLSearchParams(window.location.search).get(analytics.sourceParam));

    trackEvent(analytics.amountSelectedEvent, {
      amount: option.amount,
      ...(source ? { source } : {}),
    });

    try {
      sessionStorage.setItem(analytics.sessionStorageKey, String(option.amount));
    } catch {
      // Private browsing can throw on write — never block the redirect for this.
    }

    // No preventDefault: the browser does a normal same-tab navigation to Stripe.
  }

  return (
    <a
      href={option.url}
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Pay ${label} and book your session`}
      style={{
        ...optionStyle,
        background: hover ? "var(--cp-key-lime)" : "var(--bg-surface)",
      }}
    >
      {label}
    </a>
  );
}

/** Development-only nudge so a half-configured page is impossible to miss locally. */
function MissingLinksNotice() {
  const missing = paymentOptions.filter((option) => !isConfigured(option));
  const isDev = process.env.NODE_ENV !== "production";

  useEffect(() => {
    if (isDev && missing.length > 0) {
      console.warn(
        `[pwyw] ${missing.length} payment link(s) not configured: ` +
          `${missing.map((option) => `£${option.amount}`).join(", ")}. ` +
          "Add them in src/content/page-content.ts.",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- config is static; warn once per load
  }, []);

  if (!isDev || missing.length === 0) return null;

  return (
    <p
      role="status"
      style={{
        margin: "0 0 var(--space-5)",
        padding: "var(--space-3) var(--space-4)",
        background: "var(--cp-ogre-odor-100)",
        border: "var(--border-w-bold) solid var(--cp-ogre-odor)",
        borderRadius: "var(--radius-sm)",
        color: "var(--cp-ogre-odor-700)",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      Development only: no Stripe Payment Link for{" "}
      {missing.map((option) => formatAmount(option.amount)).join(", ")}. Add them in{" "}
      <code>src/content/page-content.ts</code>.
    </p>
  );
}

export function PaymentOptions() {
  return (
    <section
      aria-labelledby="payment-heading"
      style={{
        padding: "var(--space-8) var(--space-5)",
        background: "var(--bg-alt)",
        borderTop: "var(--border-w-thicc) solid var(--border-1)",
        borderBottom: "var(--border-w-thicc) solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h2 id="payment-heading" style={{ marginBottom: "var(--space-2)" }}>
          {payment.heading}
        </h2>
        <p style={{ marginBottom: "var(--space-6)", color: "var(--fg-2)", fontSize: 18 }}>
          {payment.supportingLine}
        </p>

        <MissingLinksNotice />

        <ul className="pwyw-amount-grid">
          {paymentOptions.map((option) => (
            <li key={option.amount} style={{ display: "grid" }}>
              <AmountButton option={option} />
            </li>
          ))}
        </ul>

        <p
          style={{
            margin: "var(--space-6) 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "var(--space-2)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--fg-2)",
          }}
        >
          <LockIcon />
          {payment.reassurance}
        </p>
      </div>
    </section>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2.2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
