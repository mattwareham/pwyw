/* =========================================================================
 * PAY WHAT YOU LIKE — ALL EDITABLE CONTENT LIVES IN THIS FILE.
 *
 * If you want to change something on the page, it should be in here. You should
 * not need to open any other file to update copy, links, testimonials or media.
 *
 * Everything below marked "PLACEHOLDER" or "TODO" still needs replacing.
 * ========================================================================= */

/* -------------------------------------------------------------------------
 * 1. STRIPE PAYMENT LINKS  ← paste the six URLs here
 *
 * Each amount points at its own Stripe Payment Link. Nothing else in the
 * codebase knows about these URLs.
 *
 * The post-payment redirect to TidyCal is configured inside Stripe, on each
 * Payment Link ("After payment" → "Don't show confirmation page" → redirect
 * to the TidyCal URL below). This app does not handle that redirect.
 *
 * An amount with an empty url renders as a visibly disabled option, so a
 * half-configured page can never send someone to a broken link.
 * ------------------------------------------------------------------------- */

export interface PaymentOption {
  /** Amount in whole pounds. */
  amount: number;
  /** Full Stripe Payment Link, e.g. "https://buy.stripe.com/xxxxxxxx". */
  url: string;
}

export const paymentOptions: PaymentOption[] = [
  { amount: 1, url: "" }, // TODO: paste Stripe Payment Link for £1
  { amount: 25, url: "" }, // TODO: paste Stripe Payment Link for £25
  { amount: 50, url: "" }, // TODO: paste Stripe Payment Link for £50
  { amount: 75, url: "" }, // TODO: paste Stripe Payment Link for £75
  { amount: 100, url: "" }, // TODO: paste Stripe Payment Link for £100
  { amount: 150, url: "" }, // TODO: paste Stripe Payment Link for £150
];

/**
 * The TidyCal booking page people land on after paying.
 *
 * This is recorded here for reference and for any future success page — the
 * live redirect is set on each Stripe Payment Link, not by this app.
 */
export const tidyCalUrl = ""; // TODO: paste TidyCal booking URL

/** How amounts are shown. British pounds, no decimals. */
export const currency = { locale: "en-GB", code: "GBP" } as const;

/* -------------------------------------------------------------------------
 * 2. PAGE COPY — all placeholder, all safe to rewrite
 * ------------------------------------------------------------------------- */

export const meta = {
  // PLACEHOLDER metadata
  title: "Pay What You Like Session",
  description: "Choose what you would like to pay, then book your session.",
};

export const hero = {
  // PLACEHOLDER copy
  eyebrow: "VIDEO KICKSTART SESSION",
  headline: "Pay what you like",
  intro: "There's no fixed price for this session. Choose whatever feels right for you.",
  supporting: "You'll pay securely through Stripe, then choose a time for your session.",
};

/** The short "how this works" explanation. Steps render as an ordered list. */
export const explanation = {
  // PLACEHOLDER copy
  heading: "How this works",
  body: "Pick an amount, pay through Stripe, and you'll be sent straight to my calendar to choose a time. That's the whole thing.",
  steps: [
    "Choose an amount that feels right to you.",
    "Pay securely through Stripe.",
    "Pick a time that suits you and we're booked in.",
  ],
};

export const payment = {
  // PLACEHOLDER copy
  heading: "What would you like to pay?",
  supportingLine: "Seriously. Pick whatever feels right.",
  reassurance: "Secure payment via Stripe",
};

/* -------------------------------------------------------------------------
 * 3. WALL OF FAME — testimonial montage video
 * ------------------------------------------------------------------------- */

export const montage = {
  // PLACEHOLDER heading/caption
  heading: "Wall of Fame",
  intro: "PLACEHOLDER — a short line introducing the montage and the people below.",

  /**
   * The montage video. Drop an .mp4 into /public/video/ and set this to
   * "/video/your-file.mp4", or paste a full https:// URL.
   * While this is empty the page shows a clearly marked placeholder box.
   */
  videoUrl: "", // TODO: add testimonial montage video

  /**
   * Still image shown before play. Drop a .jpg into /public/images/ and set
   * this to "/images/your-poster.jpg". Optional but stops the player looking
   * blank on load.
   */
  posterUrl: "", // TODO: add montage poster image

  /** Accessible label for the video player. */
  videoLabel: "Testimonial montage",
};

/* -------------------------------------------------------------------------
 * 4. WALL OF FAME — individual testimonials
 *
 * Add or remove entries freely; the grid adapts to any number of them.
 * Headshots go in /public/images/testimonials/ and are referenced as
 * "/images/testimonials/filename.jpg".
 *
 * Leave `image` empty and the card shows a neutral initials block instead —
 * no broken images, no stand-in stock photos of people who don't exist.
 * ------------------------------------------------------------------------- */

export interface Testimonial {
  quote: string;
  name: string;
  /** Optional — omit if the person has no company to name. */
  company?: string;
  /** Optional — job title. */
  role?: string;
  /** Optional — path or URL to a headshot. Empty means "show initials". */
  image?: string;
  /** Optional — falls back to the person's name. */
  imageAlt?: string;
  /** Native image dimensions, used to reserve space and avoid layout shift. */
  imageWidth?: number;
  imageHeight?: number;
}

export const testimonials: Testimonial[] = [
  // PLACEHOLDER testimonials — replace all of these with real ones.
  // These are deliberately obvious stand-ins, not invented customers.
  {
    quote: "PLACEHOLDER TESTIMONIAL — replace this with a real quote from a real person.",
    name: "Placeholder Name One",
    company: "Placeholder Company",
    role: "Placeholder Job Title",
    image: "",
    imageAlt: "",
  },
  {
    quote: "PLACEHOLDER TESTIMONIAL — replace this with a real quote from a real person.",
    name: "Placeholder Name Two",
    company: "Placeholder Company",
    role: "Placeholder Job Title",
    image: "",
    imageAlt: "",
  },
  {
    quote: "PLACEHOLDER TESTIMONIAL — replace this with a real quote from a real person.",
    name: "Placeholder Name Three",
    company: "Placeholder Company",
    role: "Placeholder Job Title",
    image: "",
    imageAlt: "",
  },
];

/* -------------------------------------------------------------------------
 * 5. ANALYTICS
 * ------------------------------------------------------------------------- */

export const analytics = {
  /** Event fired when someone picks an amount. */
  amountSelectedEvent: "payment_amount_selected",
  /** Query parameter carried through for attribution, e.g. ?source=linkedin. */
  sourceParam: "source",
  /** Optional personalisation parameter, e.g. ?name=Matt. */
  nameParam: "name",
  /** sessionStorage key holding the amount someone chose, set before redirect. */
  sessionStorageKey: "selectedPaymentAmount",
};
