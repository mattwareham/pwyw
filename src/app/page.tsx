import { explanation, hero } from "@/content/page-content";
import { PaymentOptions } from "@/components/PaymentOptions";
import { WallOfFame } from "@/components/WallOfFame";

export default function PayWhatYouLikePage() {
  return (
    <main>
      {/* 1. Hero */}
      <section
        aria-labelledby="hero-heading"
        style={{
          padding: "var(--space-8) var(--space-5) var(--space-7)",
          background: "var(--bg-app)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- fixed-size brand logo, matches the planner's Logo component */}
          <img
            src="/logo-primary.png"
            alt="Content Pal"
            width={168}
            height={48}
            style={{ height: 48, width: "auto", display: "block", marginBottom: "var(--space-7)" }}
          />

          <p style={eyebrowStyle}>
            {hero.eyebrow}
          </p>

          <h1 id="hero-heading" style={{ marginBottom: "var(--space-5)" }}>
            {hero.headline}
          </h1>

          <p style={{ fontSize: "clamp(19px, 2.2vw, 24px)", maxWidth: "34ch", color: "var(--fg-1)" }}>
            {hero.intro}
          </p>
          <p style={{ fontSize: 18, maxWidth: "46ch", color: "var(--fg-2)", margin: 0 }}>
            {hero.supporting}
          </p>
        </div>
      </section>

      {/* 2. What pay-what-you-like actually means */}
      <section
        aria-labelledby="explanation-heading"
        style={{
          padding: "var(--space-8) var(--space-5)",
          background: "var(--bg-surface)",
          borderTop: "var(--border-w-thicc) solid var(--border-1)",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 id="explanation-heading" style={{ marginBottom: "var(--space-4)" }}>
            {explanation.heading}
          </h2>
          <p style={{ fontSize: 18, maxWidth: "60ch", color: "var(--fg-2)" }}>{explanation.body}</p>

          <ol style={{ margin: "var(--space-6) 0 0", padding: 0, listStyle: "none", display: "grid", gap: "var(--space-4)" }}>
            {explanation.steps.map((step, index) => (
              <li key={step} style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-4)" }}>
                <span aria-hidden style={stepNumberStyle}>
                  {index + 1}
                </span>
                <span style={{ fontSize: 18, paddingTop: 4 }}>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3 + 4. Amounts, then the Stripe reassurance line */}
      <PaymentOptions />

      {/* 5. Wall of Fame */}
      <WallOfFame />
    </main>
  );
}

const eyebrowStyle = {
  margin: "0 0 var(--space-4)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--fg-2)",
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
