/**
 * Shared helpers for the single-password /admin gate. Runs in both the Edge
 * middleware and Node route handlers, so it uses Web Crypto (globalThis.crypto)
 * only — no node:crypto import.
 *
 * The cookie never stores the raw password: it stores SHA-256("tws::<password>").
 * Middleware recomputes the same digest from ADMIN_PASSWORD and compares.
 */

export const ADMIN_COOKIE = "tws_admin";

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The token a valid session cookie must hold, or null if no password is set. */
export async function expectedToken(): Promise<string | null> {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return sha256Hex(`tws::${pw}`);
}
