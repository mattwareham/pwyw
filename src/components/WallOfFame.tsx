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
        {/* Same 720 reading column as every other band, pinned to the frame's left edge. */}
        <div style={{ maxWidth: 720, marginBottom: "var(--space-7)" }}>
          <h2 id="wall-of-fame-heading">{wallOfFame.heading}</h2>
        </div>

        <ul className="pwyw-testimonial-grid">
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
