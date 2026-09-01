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
 * The live post-payment redirect is configured on each Stripe Payment Link, not
 * by this app. This URL is used for the closing note at the foot of the page,
 * and is here for any future success page.
 */
export const tidyCalUrl = "https://tidycal.com/3qrd8lm/video-kickstart-session-1x6o89p";

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
  title: "Video Kickstart Session: your first video, made in 60 minutes",
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
    "Maybe you don't know what to say. Maybe you overthink every take. Maybe you posted a few and then quietly stopped. Or maybe \u201cdo some video\u201d has just been sat on the to-do list forever.",
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
    "Land on my calendar and pick a time.",
  ],
};

/**
 * The blue band. It leads with the amounts — that's the thing people came to do —
 * and the pay-what-you-like explanation sits underneath them.
 */
export const payment = {
  heading: "Choose your amount and book",
  /** Small line under the amount on every button. */
  buttonSubLabel: "Book now",
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
   * so a non-square file is letterboxed inside that square.
   *
   * The served file is a web encode (1080x1080, ~19MB). The full-quality master
   * lives in /media, which is gitignored — re-encode from there if the montage
   * changes, rather than serving the master directly. See the README.
   */
  videoUrl: "/video/testimonials-montage-square.mp4",

  /**
   * Square still shown before play, pulled from 1.5s into the montage. Swap the
   * file, or grab a different moment (see the README) if you'd rather open on
   * another frame.
   */
  posterUrl: "/images/montage-poster.jpg",

  /** Accessible name for the player — it has no visible heading beside it. */
  videoLabel: "Testimonial montage",
};

/* -------------------------------------------------------------------------
 * 4. WALL OF FAME — individual testimonials, lower down the page
 *
 * These are real people and real words, lightly trimmed from the session
 * recordings: fillers and repetitions removed, cuts marked with an ellipsis.
 * Nothing has been paraphrased. Two small repairs to spoken stumbles are noted
 *
 * Add or remove entries freely; the grid adapts to any number of them.
 * Headshots live in /public/images/testimonials/. Leave `image` empty and the
 * card shows a neutral initials block instead.
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
  heading: "Wall of Fame",
};

export const testimonials: Testimonial[] = [
  {
    // "and" and "a" added to repair a spoken stumble ("is also great first step").
    quote:
      "It's been so brilliant to talk through something that's felt like such a blockage for me\u2026 and to actually do it is a great first step.",
    name: "Jess O'Connor",
    company: "Firebowl",
    image: "/images/testimonials/jessica.webp",
  },
  {
    quote:
      "It's not just about the videos\u2026 you've also helped cement in my mind a bit of a plan for the whole content.",
    name: "Phil Duffin",
    company: "PA Duffin",
    image: "/images/testimonials/phil.webp",
  },
  {
    quote:
      "I needed a bit of structure: what the hook was, the middle bit, and the call to action\u2026 You showed me a kind of halfway house that could work more effectively, something that I can take away and use for future videos.",
    name: "Vaishali Shah",
    company: "Creative ID",
    image: "/images/testimonials/vaishali.webp",
  },
  {
    // "you not trying" corrected to "you're not trying".
    quote:
      "I like that you're not trying to put a one-size-fits-all approach on everybody, but actually look at what each individual does and how videos could benefit specifically what they do.",
    name: "Vanda Varga",
    company: "Vanda Varga Training",
    image: "/images/testimonials/vanda.webp",
  },
];

/* -------------------------------------------------------------------------
 * 5. LEGAL FOOTER
 * ------------------------------------------------------------------------- */

export const legal = {
  copyright: "Copyright \u00a9 2026 Depictar Limited.",
  registration:
    "Depictar Limited is a limited company registered in England and Wales, company number 13912768.",
  registeredOffice:
    "Registered office: Bank Gallery, High Street, Kenilworth, Warwickshire, England, CV8 1LY.",
};

/* -------------------------------------------------------------------------
 * 6. CLOSING NOTE — the direct calendar link at the foot of the page
 *
 * Deliberately quiet: a text link, not a second call to action. Paying first is
 * still the route we want people to take, which is why the caveat is part of the
 * sentence rather than small print underneath it.
 * ------------------------------------------------------------------------- */

export const closingNote = {
  // Copy here hasn't been through the copywriter.
  before: "Want to look at times first? You can go straight to ",
  linkText: "my calendar",
  after:
    ", but a booking isn't confirmed until payment has gone through, so you'll still need to pick an amount above.",
};

/* -------------------------------------------------------------------------
 * 7. ANALYTICS
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
