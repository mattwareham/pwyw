import { legal } from "@/content/page-content";

/** Company registration details. Small, white on black, below everything else. */
export function SiteFooter() {
  return (
    <footer
      style={{
        padding: "var(--space-6) var(--space-5)",
        background: "var(--bg-inverse)",
        color: "var(--fg-on-inverse)",
        borderTop: "var(--border-w-thicc) solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p style={{ maxWidth: 720, margin: 0, fontSize: 13, lineHeight: 1.6, color: "var(--fg-on-inverse)" }}>
          {legal.copyright} {legal.registration} {legal.registeredOffice}
        </p>
      </div>
    </footer>
  );
}
