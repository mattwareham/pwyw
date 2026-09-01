import { hero, howItWorks, outcome, session } from "@/content/page-content";
import { HeroVideo } from "@/components/HeroVideo";
import { PaymentOptions } from "@/components/PaymentOptions";
import { WallOfFame } from "@/components/WallOfFame";
import { PAYMENT_ANCHOR } from "@/lib/anchors";

/* The three white sections read as one continuous band, split by hairlines. */
const whiteBand = {
  padding: "var(--space-8) var(--space-5)",
  background: "var(--bg-surface)",
} as const;

/*
 * Every band shares this pair: a 1040 frame the hero's two columns and the
 * testimonial cards can fill, and a 720 reading column pinned to its left edge.
 * That's what gives the whole page a single left edge, hero included.
 */
const frame = { maxWidth: 1040, margin: "0 auto" } as const;
const textColumn = { maxWidth: 720 } as const;

const bodyText = { fontSize: 18, color: "var(--fg-2)" } as const;

export default function PayWhatYouLikePage() {
  return (
    <main>
      {/* Hero — the outcome, with the montage alongside it */}
      <section
        aria-labelledby="hero-heading"
        style={{ padding: "var(--space-8) var(--space-5)", background: "var(--bg-app)" }}
      >
        <div style={frame}>
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size brand logo, matches the planner's Logo component */}
          <img
            src="/logo-primary.png"
            alt="Content Pal"
            width={168}
            height={48}
            style={{ height: 48, width: "auto", display: "block", marginBottom: "var(--space-7)" }}
          />

          <div className="pwyw-hero-grid">
            <div>
              <p style={kickerStyle}>{hero.kicker}</p>

              <h1 id="hero-heading" style={{ marginBottom: "var(--space-5)" }}>
                {hero.headline}
              </h1>

              <p style={{ fontSize: "clamp(19px, 2.2vw, 23px)", maxWidth: "34ch", color: "var(--fg-1)" }}>
                {hero.subhead}
              </p>

              <a href={`#${PAYMENT_ANCHOR}`} className="pwyw-cta" style={{ marginTop: "var(--space-4)" }}>
                {hero.ctaLabel}
              </a>

              <p style={{ margin: "var(--space-4) 0 0", fontSize: 15, color: "var(--fg-2)" }}>
                {hero.ctaNote}
              </p>
            </div>

            <HeroVideo />
          </div>
        </div>
      </section>

      {/* What the session actually is */}
      <section
        aria-labelledby="session-heading"
        style={{ ...whiteBand, borderTop: "var(--border-w-thicc) solid var(--border-1)" }}
      >
        <div style={frame}>
          <div style={textColumn}>
            <h2 id="session-heading" style={{ marginBottom: "var(--space-5)" }}>
              {session.heading}
            </h2>

            {session.paragraphs.map((paragraph) => (
              <p key={paragraph} style={bodyText}>
                {paragraph}
              </p>
            ))}

            <ul style={{ ...listReset, marginTop: "var(--space-6)", gap: "var(--space-3)" }}>
              {session.notThis.map((item) => (
                <li key={item} style={markerRow}>
                  <span aria-hidden style={{ ...marker, color: "var(--cp-ogre-odor)" }}>
                    ✗
                  </span>
                  <span className="sr-only">Not: </span>
                  <span style={bodyText}>{item}</span>
                </li>
              ))}
              {session.butThis.map((item) => (
                <li key={item} style={markerRow}>
                  <span aria-hidden style={{ ...marker, color: "var(--fg-positive)" }}>
                    ✓
                  </span>
                  <span className="sr-only">Instead: </span>
                  <span style={{ ...bodyText, color: "var(--fg-1)", fontWeight: 700 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What you walk away with */}
      <section
        aria-labelledby="outcome-heading"
        style={{ ...whiteBand, borderTop: "var(--border-w-hair) solid var(--border-2)" }}
      >
        <div style={frame}>
          <div style={textColumn}>
            <h2 id="outcome-heading" style={{ marginBottom: "var(--space-5)" }}>
              {outcome.heading}
            </h2>

            {outcome.paragraphs.map((paragraph) => (
              <p key={paragraph} style={bodyText}>
                {paragraph}
              </p>
            ))}

            <p style={{ ...bodyText, color: "var(--fg-1)", fontWeight: 700, margin: "var(--space-6) 0 var(--space-4)" }}>
              {outcome.listHeading}
            </p>

            <ul style={{ ...listReset, gap: "var(--space-3)" }}>
              {outcome.items.map((item) => (
                <li key={item} style={markerRow}>
                  <span aria-hidden style={{ ...marker, color: "var(--fg-positive)" }}>
                    ✓
                  </span>
                  <span style={bodyText}>{item}</span>
                </li>
              ))}
            </ul>

            <p style={{ ...bodyText, marginTop: "var(--space-6)" }}>{outcome.closingLine}</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        aria-labelledby="how-heading"
        style={{ ...whiteBand, borderTop: "var(--border-w-hair) solid var(--border-2)" }}
      >
        <div style={frame}>
          <div style={textColumn}>
            <h2 id="how-heading" style={{ marginBottom: "var(--space-3)" }}>
              {howItWorks.heading}
            </h2>
            <p style={bodyText}>{howItWorks.intro}</p>

            <ol style={{ ...listReset, marginTop: "var(--space-6)", gap: "var(--space-4)" }}>
              {howItWorks.steps.map((step, index) => (
                <li key={step} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
                  <span aria-hidden style={stepNumberStyle}>
                    {index + 1}
                  </span>
                  <span style={{ ...bodyText, paddingTop: 4 }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The pay-what-you-like explanation, then the six amounts */}
      <PaymentOptions />

      <WallOfFame />
    </main>
  );
}

const kickerStyle = {
  margin: "0 0 var(--space-4)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--fg-2)",
} as const;

const listReset = {
  display: "grid",
  listStyle: "none",
  margin: 0,
  padding: 0,
} as const;

const markerRow = { display: "flex", alignItems: "flex-start", gap: "var(--space-3)" } as const;

const marker = {
  flexShrink: 0,
  fontSize: 20,
  fontWeight: 800,
  lineHeight: 1.5,
  width: "1.2em",
} as const;

const stepNumberStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 36,
  height: 36,
  background: "var(--bg-brand)",
  color: "var(--fg-on-brand)",
  border: "var(--border-w-bold) solid var(--border-1)",
  borderRadius: "var(--radius-pill)",
  fontFamily: "var(--font-display)",
  fontWeight: 800,
  fontSize: 17,
  lineHeight: 1,
} as const;
