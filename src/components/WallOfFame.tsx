import { testimonials, wallOfFame } from "@/content/page-content";
import { TestimonialCard } from "@/components/TestimonialCard";

/** The individual testimonials. The montage video sits near the top of the page instead. */
export function WallOfFame() {
  if (testimonials.length === 0) return null;

  return (
    <section
      aria-labelledby="wall-of-fame-heading"
      style={{ padding: "var(--space-8) var(--space-5)", background: "var(--bg-app-soft)" }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        {/* Text sits in the same 720 column as every other band, so the page has one left edge. */}
        <div style={{ maxWidth: 720, margin: "0 auto var(--space-7)" }}>
          <h2 id="wall-of-fame-heading" style={{ marginBottom: "var(--space-3)" }}>
            {wallOfFame.heading}
          </h2>
          <p style={{ margin: 0, color: "var(--fg-2)", fontSize: 18 }}>{wallOfFame.intro}</p>
        </div>

        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "var(--space-6)",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <li key={`${testimonial.name}-${index}`} style={{ display: "grid" }}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
