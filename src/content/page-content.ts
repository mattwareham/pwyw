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
  { amount: 1, url: "https://buy.stripe.com/7sYaEYaLZ3mCclw4LS9AA04" },
  { amount: 25, url: "https://buy.stripe.com/5kQ3cw2ftcXc3P06U09AA06" },
  { amount: 50, url: "https://buy.stripe.com/5kQ3cw07l8GWgBM2DK9AA05" },
  { amount: 75, url: "https://buy.stripe.com/dRmeVeaLZe1g1GS4LS9AA07" },
  { amount: 100, url: "https://buy.stripe.com/aFa9AU6vJ4qGgBM6U09AA08" },
  { amount: 150, url: "https://buy.stripe.com/3cIaEYf2f6yO99k3HO9AA09" },
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
 * 2. PAGE COPY
 *
 * Ordered the way the page is: hero, then what the session is, then what you
 * leave with, then how it works, then the pay-what-you-like explanation that
 * sits directly above the amounts.
 * ------------------------------------------------------------------------- */

export const meta = {
  title: "Video Kickstart Session — your first video, made in 60 minutes",
  description:
    "Get on a call and record your first video start to finish, before we hang up. Pay what you like.",
};

export const hero = {
  kicker: "Video Kickstart Session",
  headline: "Your first video, made in 60 minutes",
  subhead:
    "Stop planning to do video. Get on a call with me and record one, start to finish, before we hang up.",
  /** Scrolls down to the amounts — it doesn't go to Stripe. */
  ctaLabel: "Choose your amount",
  ctaNote: "Pay what you like. These normally go for £149+VAT.",
};

/** What the session actually is. */
export const session = {
  heading: "You already know video would help",
  paragraphs: [
    "You know it's how people find you, work out what you actually do, and decide they trust you. Knowing that hasn't made it happen.",
    "Maybe you don't know what to say. Maybe you overthink every take. Maybe you posted a few and then quietly stopped. Or maybe \u201cdo some video\u201d has just been sat on the to-do list since spring.",
    "This session exists to break that in an hour. We get on a call, work out exactly what's been stopping you, build a simple approach to video that fits you and your business, and then we record a real video together before the time's up.",
  ],
  /** Rendered with a ✗ marker. */
  notThis: [
    "No course to sit through.",
    "No 47-page strategy you'll never open again.",
    "No leaving the call with \u201cmake a video\u201d still on your list.",
  ],
  /** Rendered with a ✓ marker. */
  butThis: ["We record it, there and then."],
};

/** What you walk away with. */
export const outcome = {
  heading: "And it doesn't stop when the call ends",
  paragraphs: [
    "Afterwards I edit your recording, add subtitles and write the caption to go with it, so your first piece of content is ready to publish rather than sat in a drafts folder.",
    "You'll also get your own Video Roadmap: a personalised webpage with everything we worked out, your approach, your next moves and exactly what to do from here.",
  ],
  listHeading: "You leave with:",
  items: [
    "Your first video, edited, subtitled and captioned, ready to post.",
    "A custom Video Roadmap webpage with your strategy, decisions and next steps.",
  ],
  closingLine:
    "Most consulting calls send you away to go and learn video over the next six weeks. This one just gets it made.",
};

export const howItWorks = {
  heading: "How it works",
  intro: "Three steps, about a minute, no faff.",
  steps: [
    "Choose an amount that feels right.",
    "Pay securely through Stripe.",
    "Land on my calendar and pick a time. Booked.",
  ],
};

/**
 * The blue band. It leads with the amounts — that's the thing people came to do —
 * and the pay-what-you-like explanation sits underneath them.
 */
export const payment = {
  heading: "Choose your amount and book",
  reassurance: "Secure payment via Stripe",

  /** Sits below the amounts. */
  explainer: {
    heading: "About the \u201cpay what you like\u201d part",
    paragraphs: [
      "I set these amounts myself, so whatever you go for it's already a number I'm happy with. That means there's genuinely nothing to apologise for.",
      "I'm spelling that out because a couple of people have previously paid at the lower end and then felt they had to explain themselves. Please don't. It's pay what you can, not pay what you can and then feel guilty you didn't pay more. And if that guilt's already brewing, it's usually the exact reason you needed to book in the first place.",
      "Pick your number, turn up properly, and let's make you a video. That's the whole deal.",
    ],
  },
};

/* -------------------------------------------------------------------------
 * 3. TESTIMONIAL MONTAGE — the square video in the hero
 *
 * It sits inside the yellow hero band: to the right of the headline on desktop,
 * directly below it on mobile. It has no heading of its own — the h1 is right
 * next to it.
 * ------------------------------------------------------------------------- */

export const montage = {
  /**
   * The montage video. **Square (1:1)** — the hero reserves a square frame for it,
   * so a 16:9 file will be letterboxed inside that square.
   *
   * Drop an .mp4 into /public/video/ and set this to "/video/your-file.mp4", or
   * paste a full https:// URL. While this is empty the hero shows a clearly
   * marked square placeholder.
   */
  videoUrl: "", // TODO: add testimonial montage video (square)

  /**
   * Square still image shown before play. Drop a .jpg into /public/images/ and
   * set this to "/images/your-poster.jpg". Optional, but stops the player
   * looking like a black box on load.
   */
  posterUrl: "", // TODO: add montage poster image (square)

  /** Accessible name for the player — it has no visible heading beside it. */
  videoLabel: "Testimonial montage",
};

/* -------------------------------------------------------------------------
 * 4. WALL OF FAME — individual testimonials, lower down the page
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

export const wallOfFame = {
  // PLACEHOLDER copy — the copywriter's notes don't cover this section yet.
  heading: "Wall of Fame",
  intro: "PLACEHOLDER — a short line introducing the people below.",
};

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
