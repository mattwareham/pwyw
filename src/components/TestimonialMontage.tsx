import { montage } from "@/content/page-content";

const frame = {
  aspectRatio: "16 / 9",
  width: "100%",
  background: "var(--cp-black)",
  border: "var(--border-w-thicc) solid var(--border-1)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-sticker-lg)",
  overflow: "hidden",
} as const;

function Player() {
  const hasVideo = montage.videoUrl.trim().length > 0;

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

/**
 * Sits directly under the hero. The proof that this works belongs near the top,
 * before the pitch — the individual testimonial cards stay lower down.
 */
export function TestimonialMontage() {
  return (
    <section
      aria-labelledby="montage-heading"
      style={{
        padding: "var(--space-8) var(--space-5)",
        background: "var(--bg-app-soft)",
        borderTop: "var(--border-w-thicc) solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        {/* Text sits in the same 720 column as every other band, so the page has one left edge. */}
        <div style={{ maxWidth: 720, margin: "0 auto var(--space-6)" }}>
          <h2 id="montage-heading" style={{ marginBottom: "var(--space-3)" }}>
            {montage.heading}
          </h2>
          <p style={{ margin: 0, color: "var(--fg-2)", fontSize: 18 }}>{montage.intro}</p>
        </div>

        <Player />
      </div>
    </section>
  );
}
