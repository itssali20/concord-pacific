# Concord Pacific, Corp. — Website

Cinematic luxury real-estate website for **Concord Pacific, Corp.** (Beverly Hills, California), built from the Complete Website Storyboard.

**Stack:** React 18 · Vite 5 · React Router 6 · GSAP 3 (ScrollTrigger + SplitText) · Lenis smooth scroll · self-hosted fonts (Cormorant Garamond, Manrope, Montserrat).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the build
```

## Deploy to Vercel
1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. In Vercel → **Add New Project** → import the repo. Framework is auto-detected as **Vite** (build `npm run build`, output `dist`).
3. `vercel.json` already contains the SPA rewrite so deep links like `/developments/the-summit` work on refresh.

### Environment variables (optional — Vercel → Settings → Environment Variables)
| Name | Purpose |
|---|---|
| `VITE_FORM_ENDPOINT` | Form POST endpoint (e.g. Formspree `https://formspree.io/f/xxxx`). If empty, forms open the visitor's email app. |
| `VITE_CONTACT_EMAIL` | Public inquiry email (placeholder: inquiries@concordpacificcorp.com) |
| `VITE_CONTACT_PHONE` | Public phone number (placeholder: +1 (310) 000-0000) |

## Pages
| Route | Page |
|---|---|
| `/` | Home — preloader, cinematic hero (auto slideshow + scroll-pinned "architectural window"), intro, locations, horizontal featured developments, pinned dark "Standard", international team, interiors parallax, California reveal, company, opportunities |
| `/developments` | Filterable portfolio (All / Beverly Hills / Bel-Air / Los Angeles / Completed / In Development / Coming Soon) |
| `/developments/:slug` | Microsite-style project page: Vision, Architecture, Residences, Interiors, Details, Location, Team, Inquiries |
| `/signature-residences` | Magazine layout + filterable galleries with lightbox |
| `/design-and-materials` | Design & Materials — Kitchens, Bathrooms, Windows & Glazing, Natural Stone, Millwork & Closets, Lighting & Technology, Wine/Theater/Wellness, Pools & Landscape |
| `/our-vision` | Stacked sticky vision cards |
| `/international-team` | Team intro, CEO Roman Alexander profile, studio & construction photos, disciplines, Plan → Design → Build → Deliver process |
| `/company` | Company profile |
| `/opportunities` | Owners / Brokers / Investors / Joint Ventures + confidential submission form |
| `/contact` | Contact + inquiry form |

## Editing content
- **Projects:** `src/data/developments.js` (name, area, status, stats, features, images, copy). A new entry automatically gets its own page.
- **Site copy, nav, contact, galleries, materials categories (`MATERIALS`), CEO bio (`CEO`), process (`PROCESS`):** `src/data/site.js`
- **Images:** `public/images/*.webp` — reference by file name without extension. Replace with final photography at the same names, or add new files.
- **Colors / type:** CSS variables at the top of `src/styles/global.css`.

## Animation system
`src/lib/useReveal.js` adds scroll animations declaratively:
`data-split` (masked line reveal), `data-words` (word-by-word brighten), `data-fade`, `data-stagger`, `data-img="up|left|right|center"` (architectural clip reveal), `data-parallax="12"`, `data-line`.
All motion respects `prefers-reduced-motion`.

## Notes before launch
- Replace the placeholder email/phone.
- Project specs and descriptions were drafted from the supplied renderings — confirm them with the client.
- Current images are the supplied renderings (some cropped from collages); swap in full-resolution photography for best quality.
