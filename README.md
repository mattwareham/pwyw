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
| Page title / meta description | `meta` |
| Hero: kicker, headline, subhead, button label, note under button | `hero` |
| "You already know video would help" — paragraphs, ✗ list, ✓ line | `session` |
| "And it doesn't stop when the call ends" — paragraphs, list, closing line | `outcome` |
| "How it works" — intro and the three steps | `howItWorks` |
| "About the pay what you like part" — paragraphs, the heading above the amounts, Stripe reassurance | `payment` |
| Wall of Fame heading and intro | `montage.heading` / `montage.intro` |
| Montage video | `montage.videoUrl` |
| Montage poster image | `montage.posterUrl` |
| Testimonial quotes, names, roles, companies | `testimonials` |
| Testimonial images and alt text | `testimonials[].image` / `.imageAlt` |
| Analytics event name and param names | `analytics` |

The page reads as five bands: green hero → three white bands (what it is, what you leave
with, how it works) → blue pay-what-you-like band containing the six amounts → Wall of Fame.
The hero button is an anchor that scrolls down to the amounts; it does not go to Stripe.

### Adding the Stripe links

Paste each Payment Link into the matching amount:

```ts
{ amount: 50, url: "https://buy.stripe.com/xxxxxxxxxx" },
```

Then, **in the Stripe dashboard**, set each Payment Link's after-payment behaviour to
redirect to your TidyCal URL. That redirect is Stripe's job, not this app's.

Any amount left with an empty `url` renders as a visibly disabled option that can't
navigate anywhere, plus a red warning banner and a console warning in development only.
A half-configured page can never send someone to a broken link.

### Adding images and video

- **Testimonial headshots** → drop into `public/images/testimonials/`, reference as
  `"/images/testimonials/filename.jpg"`. Set `imageWidth` / `imageHeight` to the file's real
  dimensions if it isn't square. Leave `image` empty and the card shows a neutral initials
  block instead — no stand-in photos of people who don't exist.
- **Montage video** → drop into `public/video/`, reference as `"/video/filename.mp4"`, or
  paste a full `https://` URL. While it's empty the page shows a clearly marked placeholder
  box of the right shape.
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
