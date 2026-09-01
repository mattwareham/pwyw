import Image from "next/image";
import type { Testimonial } from "@/content/page-content";

/** Up to two initials, used when no headshot has been supplied. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

const AVATAR = 64;

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { quote, name, company, role, image, imageAlt, imageWidth, imageHeight } = testimonial;
  const attribution = [role, company].filter(Boolean).join(", ");

  return (
    <figure
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        height: "100%",
        margin: 0,
        padding: "var(--space-6)",
        background: "var(--bg-surface)",
        border: "var(--border-w-thicc) solid var(--border-1)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sticker-md)",
      }}
    >
      <blockquote style={{ margin: 0, flex: 1 }}>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.5, color: "var(--fg-1)" }}>
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>

      <figcaption style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt || name}
            width={imageWidth ?? AVATAR}
            height={imageHeight ?? AVATAR}
            style={{
              width: AVATAR,
              height: AVATAR,
              objectFit: "cover",
              borderRadius: "var(--radius-pill)",
              border: "var(--border-w-bold) solid var(--border-1)",
              flexShrink: 0,
            }}
          />
        ) : (
          /*
           * No headshot yet. A neutral initials block rather than a stock photo —
           * these are placeholder people and shouldn't be given borrowed faces.
           */
          <span
            aria-hidden
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: AVATAR,
              height: AVATAR,
              flexShrink: 0,
              background: "var(--bg-mute)",
              border: "var(--border-w-bold) dashed var(--fg-muted)",
              borderRadius: "var(--radius-pill)",
              color: "var(--fg-muted)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.02em",
            }}
          >
            {initials(name)}
          </span>
        )}

        <span>
          <cite style={{ display: "block", fontStyle: "normal", fontWeight: 700, fontSize: 17 }}>
            {name}
          </cite>
          {attribution && (
            <span style={{ display: "block", fontSize: 15, color: "var(--fg-3)" }}>
              {attribution}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}
