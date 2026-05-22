# TWS South Florida — Landing Page

ICRA-led lead-capture landing page for the Temporary Wall Systems franchise covering the Treasure Coast through the Florida Keys.

**Stack:** Next.js 15 · React 19 · Tailwind v4 · Geist (next/font) · OKLCH design tokens

---

## Run it

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

For production:

```bash
npm run build
npm run start
```

---

## Contact info — wired

| Field | Value |
| --- | --- |
| Phone | `(561) 777-4958` |
| Email | `nick.thomson@tempwallsystems.com` |
| Office | 2240 W Woolbright Road, Suite #416 · Boynton Beach, FL 33426 |
| Logo | `public/tws-logo.webp` |
| Service area | Treasure Coast → Florida Keys (Vero Beach to Key West) |

## Remaining placeholders to swap before launch

| Placeholder | Where it lives | What to replace with |
| --- | --- | --- |
| `[VIDEO PLACEHOLDER]` | `VideoBand.tsx` | Swap the placeholder `<div>` for a real `<video>` element or YouTube/Vimeo `<iframe>`. The 16:9 container is already in place. |
| `[PHOTO PLACEHOLDER]` (ICRA spike) | `Industries.tsx` | Drop a real photo into `public/icra-corridor.jpg` and replace the gradient `<div>` with `<Image src="/icra-corridor.jpg" alt="..." fill />` |
| `[PHOTO 1..6]` (Gallery) | `Gallery.tsx` | Six real project photos. Captions, locations, and industries in the `ITEMS` array are sample placeholders; replace with real jobs. |
| Testimonials | `Testimonials.tsx` (top of file) | Replace the `QUOTES` array with real client-approved quotes. **Per Hallmark honest-copy rule, no invented quotes ship by default** — the page renders a labelled empty state until you fill these in. |
| Partner logos | `Partners.tsx` | Replace each text `<span>` with an `<img src="/partners/foo.svg" alt="..." />`. Drop logos in `public/partners/`. |
| Form handler | `LeadForm.tsx` (`onSubmit`) | Wire to your real endpoint — Formspree, HubSpot, Make.com webhook, custom API route. Currently simulates a 700ms delay and shows success. |
| `metadataBase` URL | `app/layout.tsx` | Replace `https://twssouthflorida.com` with the real production domain. |

---

## Design system

The design tokens live at `tokens.css` (root) and are the source of truth. Page styles in `app/globals.css` reference them by name; **don't inline raw OKLCH/hex values anywhere — lift to a token instead.**

**Brand anchors:**

- Paper: `oklch(100% 0 0)` — pure white
- Accent: `oklch(60% 0.17 35)` — brick-orange (CTA only)
- Ink: `oklch(22% 0.12 280)` — TWS deep navy (headings, footer)
- Type: Geist (display + body) + Geist Mono (technical micro-labels)
- Radii: 2px buttons / 3px cards/inputs (sharper than parent brand, per user design preference)

The Hallmark macrostructure stamp lives at the top of `app/globals.css`. The build log lives at `.hallmark/log.json`.

---

## Architecture

```
app/
  layout.tsx           Geist fonts + metadata
  page.tsx             Section composition
  globals.css          Hallmark stamp + Tailwind v4 + utility classes
components/
  Nav.tsx              Sticky nav (utility bar + main nav)
  Hero.tsx             Split hero with form-in-fold
  LeadForm.tsx         Reusable form (hero + section variants)
  VideoBand.tsx        Dark band with 16:9 video placeholder
  Industries.tsx       ICRA spike + compact secondary strip
  Gallery.tsx          Asymmetric 12-column project grid
  Testimonials.tsx     Labelled placeholder until real quotes
  Partners.tsx         Partner logo row
  CTABand.tsx          Final CTA with contact rows + full form
  Footer.tsx           Brand row + 5-region service-area list
tokens.css             Canonical OKLCH/font/space/motion tokens
```

---

## Notes on the structural choices

- **Form lives in the hero**, not buried at the bottom. Biggest conversion lift available for a B2B services LP.
- **ICRA gets a dedicated feature row**, not equal-weighted with the other 8 industries. Honors the stated specialty.
- **Section eyebrows use `01 / …` mono labels** to add the technical/audited voice that distinguishes this page from the parent's marketing tone.
- **Service-area list groups by region** (Treasure Coast → Palm Beach → Broward → Miami-Dade → Keys), 5-column on desktop, collapses cleanly on mobile.
- **Testimonials ship as a labelled placeholder** — no invented social proof.

---

## Hallmark provenance

This build was generated with the [Hallmark anti-AI-slop design skill](https://github.com/together-ai/hallmark). Studied DNA from `tempwallsystems.com` + `twssocal.com` informed the brand tokens; the structure was deliberately differentiated from the parent's H1 Marquee macrostructure.

To re-run Hallmark on this project (e.g. for a follow-up page like `/projects` or `/contact`), it will read `.hallmark/log.json` and pick a different macrostructure to avoid templated repetition across pages.
