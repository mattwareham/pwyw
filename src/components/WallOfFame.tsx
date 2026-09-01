import { montage, testimonials } from "@/content/page-content";
import { TestimonialCard } from "@/components/TestimonialCard";

function Montage() {
  const hasVideo = montage.videoUrl.trim().length > 0;

  const frame = {
    aspectRatio: "16 / 9",
    width: "100%",
    background: "var(--cp-black)",
    border: "var(--border-w-thicc) solid var(--border-1)",
    borderRadius: "var(--radius-md)",
    boxShadow: "var(--shadow-sticker-lg)",
    overflow: "hidden",
  } as const;

  if (!hasVideo) {
    return (
      <div
        style={{
          ...frame,
          background: "var(--bg-mute)",
          borderStyle: "dashed",
          boxShadow: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-2)",
          padding: "var(--space-5)",
          textAlign: "center",
          color: "var(--fg-3)",
        }}
      >
        <strong style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800 }}>
          Testimonial montage
        </strong>
        <span style={{ fontSize: 15 }}>
          Video to be added — set <code>montage.videoUrl</code> in{" "}
          <code>src/content/page-content.ts</code>.
        </span>
      </div>
    );
  }

  return (
    /* Native controls, no autoplay, no sound on load. */
    <video
      controls
      preload="metadata"
      playsInline
      poster={montage.posterUrl || undefined}
      aria-label={montage.videoLabel}
      style={{ ...frame, display: "block" }}
    >
      <source src={montage.videoUrl} />
      Your browser can&rsquo;t play this video.
    </video>
  );
}

export function WallOfFame() {
  return (
    <section
      aria-labelledby="wall-of-fame-heading"
      style={{ padding: "var(--space-8) var(--space-5)", background: "var(--bg-app-soft)" }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <h2 id="wall-of-fame-heading" style={{ marginBottom: "var(--space-3)" }}>
          {montage.heading}
        </h2>
        <p style={{ marginBottom: "var(--space-7)", maxWidth: "60ch", color: "var(--fg-2)", fontSize: 18 }}>
          {montage.intro}
        </p>

        <Montage />

        {testimonials.length > 0 && (
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-6)",
              listStyle: "none",
              margin: "var(--space-8) 0 0",
              padding: 0,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <li key={`${testimonial.name}-${index}`} style={{ display: "grid" }}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
