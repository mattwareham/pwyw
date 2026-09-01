/**
 * Tiny analytics shim.
 *
 * Deliberately not a provider: this page shouldn't drag in an analytics vendor of
 * its own. `trackEvent` logs in development and, in production, hands the event to
 * whichever provider happens to already be on the page (GTM's dataLayer or
 * Plausible). If neither exists it is a no-op — nothing breaks, nothing is sent.
 *
 * When a real provider is wired up, note that `payment_amount_selected` fires
 * immediately before a full-page navigation to Stripe, so the request needs to
 * survive unload — use `navigator.sendBeacon` (or the provider's equivalent)
 * rather than a plain `fetch`.
 */

type EventProps = Record<string, unknown>;

interface AnalyticsWindow extends Window {
  dataLayer?: unknown[];
  plausible?: (event: string, options?: { props?: EventProps }) => void;
}

export function trackEvent(name: string, props: EventProps = {}): void {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", name, props);
  }

  const w = window as AnalyticsWindow;

  try {
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...props });
    }
    if (typeof w.plausible === "function") {
      w.plausible(name, { props });
    }
  } catch {
    // Analytics must never break the journey to Stripe.
  }
}
