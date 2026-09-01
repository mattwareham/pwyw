import { montage } from "@/content/page-content";

/*
 * Square, because that's the shape the montage is cut to. The frame is reserved at
 * 1:1 whether or not a video is set yet, so the hero doesn't reflow when one lands.
 */
const frame = {
  aspectRatio: "1 / 1",
  width: "100%",
  background: "var(--cp-black)",
  border: "var(--border-w-thicc) solid var(--border-1)",
  borderRadius: "var(--radius-md)",
  boxShadow: "var(--shadow-sticker-lg)",
  overflow: "hidden",
} as const;

/** The montage player that sits inside the hero band. */
export function HeroVideo() {
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
        <strong style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800 }}>
          Testimonial montage
        </strong>
        <span style={{ fontSize: 14 }}>
          Square video to be added — set <code>montage.videoUrl</code> in{" "}
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
      style={{ ...frame, display: "block", objectFit: "contain" }}
    >
      <source src={montage.videoUrl} />
      Your browser can&rsquo;t play this video.
    </video>
  );
}
