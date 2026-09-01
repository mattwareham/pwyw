# Pay What You Like — Video Kickstart Session

A single public landing page for the Video Kickstart Session. It sells the outcome — your
first video, made in an hour — and the pay-what-you-like pricing sits lower down as the
reason to act. Someone picks an amount, goes straight to the matching Stripe Payment Link,
and Stripe (not this app) redirects them to TidyCal to choose a time.

```
Choose an amount  →  Pay in Stripe  →  Book in TidyCal
```

No database, no auth, no Stripe API keys, no webhooks, no environment variables.

## Everything you'll want to edit is in one file

**`src/content/page-content.ts`** — all copy, links, testimonials and media live there.
You shouldn't need to open any other file.

| What | Where in `src/content/page-content.ts` |
|---|---|
| The six Stripe Payment Links | `paymentOptions` — paste into each `url` |
| TidyCal URL | `tidyCalUrl` |
| Closing note above the calendar link | `closingNote` |
| Page title / meta description | `meta` |
| Hero: kicker, headline, subhead, button label, note under button | `hero` |
| "You already know video would help" — paragraphs, ✗ list, ✓ line | `session` |
| "And it doesn't stop when the call ends" — paragraphs, list, closing line | `outcome` |
| "How it works" — intro and the three steps | `howItWorks` |
| "Choose your amount and book" heading + Stripe reassurance | `payment` |
| "About the pay what you like part" — heading and paragraphs, below the amounts | `payment.explainer` |
| Wall of Fame heading and intro (lower down) | `wallOfFame` |
| Montage video (square, sits in the hero) | `montage.videoUrl` |
| Montage poster image (square) | `montage.posterUrl` |
| Testimonial quotes, names, roles, companies | `testimonials` |
| Testimonial images and alt text | `testimonials[].image` / `.imageAlt` |
| Analytics event name and param names | `analytics` |

The page reads as: green hero → three white bands (what it is, what you leave with, how it
works) → blue pay-what-you-like band containing the six amounts → Wall of Fame testimonial
cards. The testimonial montage lives **inside the hero** — to the right of the headline on
desktop, directly below it under 900px.
The hero button is an anchor that scrolls down to the amounts; it does not go to Stripe.

### Adding the Stripe links

Paste each Payment Link into the matching amount:

```ts
{ amount: 50, url: "https://buy.stripe.com/xxxxxxxxxx" },
```

Each Payment Link's after-payment redirect to TidyCal is set **in the Stripe dashboard** —
that redirect is Stripe's job, not this app's. The `tidyCalUrl` in the content file only
feeds the closing note at the foot of the page, which links straight to the calendar while
making clear a booking isn't confirmed until payment clears. Empty that URL and the whole
closing section disappears.

All six links are live. Any amount left with an empty `url` renders as a visibly disabled
option that can't navigate anywhere, plus a red warning banner and a console warning in
development only — a half-configured page can never send someone to a broken link.

### Adding images and video

- **Testimonial headshots** → drop into `public/images/testimonials/`, reference as
  `"/images/testimonials/filename.jpg"`. Set `imageWidth` / `imageHeight` to the file's real
  dimensions if it isn't square. Leave `image` empty and the card shows a neutral initials
  block instead — no stand-in photos of people who don't exist.
- **Montage video** → **square (1:1)**, in `public/video/`. The hero reserves a square frame
  whether or not a video is set, so nothing reflows when one lands; a non-square file is
  letterboxed rather than cropped. Empty `montage.videoUrl` and the hero shows a clearly
  marked square placeholder instead.

  **Don't commit a full-quality master.** Keep it in `/media` (gitignored) and serve a web
  encode. The current one went from 74MB to 19MB with no visible difference:

  ```bash
  ffmpeg -i "media/YOUR-FILE.mp4" -c:v libx264 -crf 23 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/video/testimonials-montage-square.mp4
  ```

  `-movflags +faststart` matters: it moves the index to the front of the file so playback
  can start before the whole thing has downloaded.

  To change the poster frame, pick a different timestamp:

  ```bash
  ffmpeg -ss 1.5 -i public/video/testimonials-montage-square.mp4 -frames:v 1 -q:v 3 public/images/montage-poster.jpg -y
  ```
- The player uses native controls, never autoplays, and is not muted.

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

```bash
npm run lint
```

```bash
npm run build
```

## Query parameters

Both are optional; neither is required for the page to work.

- `?source=linkedin` — captured and sent with the analytics event. Sanitised to a short
  lowercase slug.
- `?name=Matt` — sanitised by `safeName()` in `src/lib/params.ts`. Deliberately **not** wired
  into the copy yet; the helper is there so personalised copy can be added later without a
  rewrite.

## Analytics

Selecting an amount fires `payment_amount_selected` with `amount` and, when present,
`source`. The selected amount is also written to `sessionStorage` under
`selectedPaymentAmount` before the redirect, in case we later want a custom success page.

`src/lib/analytics.ts` is a thin shim, not a provider — it logs in development and forwards
to `window.dataLayer` or `window.plausible` if one is already on the page, otherwise it does
nothing. When wiring up a real provider, note the event fires immediately before a full-page
navigation, so it needs `navigator.sendBeacon` to survive unload.

## Design

The page uses the existing Content Pal brand system — Outfit variable font, the key
lime / coral / blueberry palette, and the chunky black "sticker" shadow. The tokens in
`src/app/globals.css` are ported from the Campaign Planner project (`cp-client-planner`),
which itself came from the brand's `colors_and_type.css`. Nothing visual is invented here.

**The six amounts are presented as six equal choices.** No recommendation, no highlight on
the highest, no preselection, and the grid is 2- or 3-up so no amount is ever orphaned alone
on a row. That's deliberate — the point is to find out what people genuinely choose.

## Deployment

Next.js App Router on Vercel. Import the repo as a new Vercel project; the framework is
auto-detected and there is nothing to configure. No environment variables.
