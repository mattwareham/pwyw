/**
 * Helpers for the optional query parameters this page understands:
 * `?source=linkedin` (attribution) and `?name=Matt` (personalisation).
 *
 * Neither is required. React escapes anything rendered into JSX, so these
 * functions exist to keep the values sane and bounded rather than to prevent
 * script injection — a `source` of 300 characters or a `name` full of markup
 * should never reach an analytics payload or the copy.
 */

/** Attribution source, lowercased and reduced to a safe slug. Empty string if absent. */
export function safeSource(raw: string | null): string {
  if (!raw) return "";
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 40);
}

/** A person's first name for personalised copy. Empty string if absent or unusable. */
export function safeName(raw: string | null): string {
  if (!raw) return "";
  return raw
    .replace(/[^\p{L}\s'-]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}
