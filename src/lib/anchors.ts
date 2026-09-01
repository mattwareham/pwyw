/**
 * In-page anchor ids.
 *
 * Kept out of the client components that use them: a value exported from a
 * "use client" module and imported by a server component arrives as a client
 * reference stub, not the string — which silently produces a broken href.
 */
export const PAYMENT_ANCHOR = "choose-amount";
