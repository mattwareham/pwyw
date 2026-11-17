"use client";

import { useRef, useState } from "react";
import { montage } from "@/content/page-content";

/*
 * Square, because that's the shape the montage is cut to. The frame is reserved at
 * 1:1 whether or not a video is set yet, so the hero doesn't reflow when one lands.
 */
const frame = {
  position: "relative",
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
  const videoRef = useRef<HTMLVideoElement>(null);
  /*
   * The overlay is a start affordance only: it covers the poster until playback
   * begins, then hands over to the native controls. Showing it again on every
   * pause would double up with Safari's own centred play button.
   */
  const [hasPlayed, setHasPlayed] = useState(false);

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
          Square video to be added. Set <code>montage.videoUrl</code> in{" "}
          <code>src/content/page-content.ts</code>.
        </span>
      </div>
    );
  }

  function startPlayback() {
    setHasPlayed(true);
    videoRef.current?.play().catch(() => {
      // Playback refused (rare for a click). The native controls are showing by
      // now, so leave the visitor with those rather than trapping them.
    });
  }

  return (
    <div style={frame}>
      {/* Native controls once it's running. No autoplay, no sound on load. */}
      <video
        ref={videoRef}
        controls={hasPlayed}
        preload="metadata"
        playsInline
        poster={montage.posterUrl || undefined}
        aria-label={montage.videoLabel}
        onPlay={() => setHasPlayed(true)}
        style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
      >
        <source src={montage.videoUrl} />
        Your browser can&rsquo;t play this video.
      </video>

      {!hasPlayed && (
        /* Fills the frame, so a click anywhere on the poster starts it. */
        <button
          type="button"
          className="pwyw-play-button"
          onClick={startPlayback}
          aria-label={`Play the ${montage.videoLabel.toLowerCase()}`}
        >
          <span className="pwyw-play-mark" aria-hidden>
            <span className="pwyw-play-ring" />
            <span className="pwyw-play-ring pwyw-play-ring-2" />
            <span className="pwyw-play-circle">
              <svg width="34" height="38" viewBox="0 0 34 38" focusable="false">
                <path d="M32 17.3 3.5 0.8A2 2 0 0 0 0.5 2.5v33a2 2 0 0 0 3 1.7L32 20.7a2 2 0 0 0 0-3.4Z" fill="#fff" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
