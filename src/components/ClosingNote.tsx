import { closingNote, tidyCalUrl } from "@/content/page-content";

/**
 * A quiet footnote linking straight to TidyCal, for anyone who wants to see times
 * before committing. Intentionally not styled as a button — paying first is still
 * the route the page is built around, and the caveat about unconfirmed bookings is
 * part of the sentence rather than small print beneath it.
 */
export function ClosingNote() {
  if (!tidyCalUrl.trim().startsWith("https://")) return null;

  return (
    <section
      aria-label="Booking directly"
      style={{
        padding: "var(--space-7) var(--space-5)",
        background: "var(--bg-app)",
        borderTop: "var(--border-w-thicc) solid var(--border-1)",
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <p style={{ maxWidth: 720, margin: 0, fontSize: 17, color: "var(--fg-2)" }}>
          {closingNote.before}
          <a href={tidyCalUrl} style={{ color: "var(--fg-1)", fontWeight: 700 }}>
            {closingNote.linkText}
          </a>
          {closingNote.after}
        </p>
      </div>
    </section>
  );
}
