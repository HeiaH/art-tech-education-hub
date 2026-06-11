# CLAUDE.md — HeiaH Art Tech Education Hub

Complete reference for AI assistants working in this codebase.

---

## Project Overview

Personal portfolio + music education platform for **HeiaH** (Lucien Kreiser).
Live at **heiah.de**, deployed via **Vercel** from the `main` branch on GitHub (`HeiaH/art-tech-education-hub`).

**Stack:** React 18 · TypeScript · Vite · React Router v6 · Tailwind CSS · shadcn/ui · Radix UI

---

## Routes

| Path | Page | Purpose |
|---|---|---|
| `/` | `src/pages/Index.tsx` | Main portfolio (single-page scroll) |
| `/learn` | `src/pages/Learn.tsx` | Music education landing page |
| `/login` | `src/pages/Login.tsx` | Email/password login |
| `/register` | `src/pages/Register.tsx` | Email/password registration |
| `/dashboard` | `src/pages/Dashboard.tsx` | Member dashboard (protected) |
| `/course/:moduleId` | `src/pages/CoursePlayer.tsx` | Course lesson viewer (protected) |
| `/payment/success` | `src/pages/PaymentSuccess.tsx` | Post-checkout success page (sets local purchase marker) |
| `/payment/cancel` | `src/pages/PaymentCancel.tsx` | Checkout cancellation page |
| `*` | `src/pages/NotFound.tsx` | 404 |

`vercel.json` contains a catch-all rewrite to `index.html` so client-side routes work on Vercel.

---

## Directory Structure

```
src/
├── App.tsx                    # Providers + router
├── main.tsx                   # React DOM entry
├── index.css                  # Global styles + CSS variables
├── App.css                    # Component-specific animations
├── pages/
│   ├── Index.tsx              # Portfolio homepage
│   ├── Learn.tsx              # Course landing page
│   ├── Login.tsx              # Auth login page
│   ├── Register.tsx           # Auth registration page
│   ├── Dashboard.tsx          # Member dashboard (protected)
│   ├── CoursePlayer.tsx       # Course lesson viewer (protected)
│   ├── PaymentSuccess.tsx     # Post-checkout success w/ purchase marker
│   ├── PaymentCancel.tsx      # Checkout cancellation page
│   └── NotFound.tsx
├── components/
│   ├── Navigation.tsx         # Portfolio nav (glassmorphic, sticky)
│   ├── Hero.tsx               # Full-screen parallax hero
│   ├── AboutMe.tsx            # Collapsible bio section
│   ├── CoachSection.tsx       # Coaching services + reviews carousel
│   ├── DeveloperSection.tsx   # Project timeline
│   ├── ContactSection.tsx     # Contact form (mailto)
│   ├── InstagramFeed.tsx      # Instagram image grid
│   ├── Footer.tsx             # Social links + scroll-to-top
│   ├── artist/                # Portfolio gallery
│   │   ├── ArtistSection.tsx  # Parent: category switcher + lightbox
│   │   ├── CategorySelector.tsx
│   │   ├── CategoryContent.tsx
│   │   ├── ImageViewer.tsx    # Fullscreen lightbox modal
│   │   └── categories/
│   │       ├── MusicCategory.tsx       # SoundCloud embed
│   │       ├── PhotographyCategory.tsx # Subcategory grid + masonry
│   │       ├── DrawingCategory.tsx     # Subcategory grid
│   │       ├── PaintingCategory.tsx    # 16:9 grid
│   │       └── ProductionCategory.tsx # Video placeholder
│   ├── courses/               # /learn page components
│   │   ├── CourseNav.tsx      # Sticky course nav
│   │   ├── CourseHero.tsx     # Hero section
│   │   ├── CourseFeatures.tsx # 6-feature grid
│   │   ├── CourseCurriculum.tsx # 5-module accordion
│   │   ├── PricingSection.tsx # 3-tier pricing cards
│   │   ├── CourseFAQ.tsx      # FAQ accordion
│   │   └── CourseCTA.tsx      # Final CTA
│   ├── ProtectedRoute.tsx     # Auth guard — redirects to /login
│   └── ui/                    # shadcn/ui primitives (~40 components)
├── hooks/
│   ├── useLanguage.tsx        # EN/DE i18n context
│   ├── useAuth.tsx            # Supabase auth context (user, signIn, signUp, signOut)
│   ├── useSubscription.tsx    # Stripe webhook subscription status check
│   ├── use-mobile.tsx         # Boolean mobile breakpoint (< 768px)
│   └── use-toast.ts           # Toast state management
├── lib/
│   ├── utils.ts               # cn() = clsx + tailwind-merge
│   └── supabase.ts            # Supabase client initialization
└── utils/
    ├── animations.tsx         # useRevealAnimation, useMouseParallax, animateCharacters
    ├── imageHelper.ts         # Image loading with placeholder fallback
    └── translations.ts        # All EN/DE strings (160+ keys)
```

---

## Design System

### Colors (Tailwind custom)

| Token | Hex | Usage |
|---|---|---|
| `heieh-dark` | `#121212` | Primary background |
| `heieh-gray` | `#1a1a1a` | Secondary background / cards |
| `heieh-neon-green` | `#1DB954` | Primary accent (CTAs, active states) |
| `heieh-neon-blue` | `#1a73e8` | Secondary accent |

CSS variables also defined for all shadcn tokens — see `src/index.css`.

### Global CSS Classes (src/index.css)

| Class | Effect |
|---|---|
| `.neumorph` | Neumorphic card shadow (dark raised) |
| `.neumorph-hover` | Inset shadow on hover |
| `.glassmorphism` | Frosted glass (blur + dark bg) — used on nav |
| `.neon-text-green` | `#1DB954` with green glow text-shadow |
| `.neon-text-blue` | `#1a73e8` with blue glow text-shadow |
| `.appear-animation` | Start state for scroll reveals (opacity 0, translateY 30px) |
| `.reveal-animation` | End state (opacity 1, translateY 0) |
| `.section-padding` | py-24 (desktop) / py-16 (mobile) |
| `.logo-container` | Logo wrapper — hover scales logo to 1.05x (no rotation) |

### Animations (Tailwind config)

- `animate-float` — gentle vertical oscillation (6s)
- `animate-float-slow` — slower float (8s)
- `animate-fade-in` — opacity 0→1 + translateY 20→0
- `animate-scale-in` — opacity 0→1 + scale 0.95→1
- `bg-grid-pattern` — dot grid overlay
- `bg-gradient-radial` — radial neon glow

### Fonts

- `font-sans` → Inter
- `font-heading` → Poppins
- Montserrat also imported

---

## Providers (App.tsx)

Wrapping order (outermost first):

1. `QueryClientProvider` — React Query
2. `TooltipProvider` — Radix tooltip context
3. `LanguageProvider` — EN/DE i18n
4. `BrowserRouter` — routing
5. `AuthProvider` — Supabase auth context
6. `Toaster` + `Sonner` — notifications

---

## Internationalisation

- Hook: `const { t, language, setLanguage } = useLanguage()`
- Languages: `'en' | 'de'`
- Detection: `navigator.language`, persisted to localStorage
- All strings in `src/utils/translations.ts`
- Fallback: English if key missing

---

## Animation Pattern

All scroll-reveal animations follow the same pattern:

```tsx
const [visible, setVisible] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true); },
    { threshold: 0.1 }
  );
  if (ref.current) observer.observe(ref.current);
  return () => observer.disconnect();
}, []);

// On element:
className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
```

For staggered children, add `style={{ transitionDelay: `${i * 80}ms` }}`.

The portfolio page (`Index.tsx`) uses a different global approach: adds `.reveal-animation` to all `.appear-animation` elements via a single IntersectionObserver.

---

## Image System

Images live in `public/images/` with this structure:

```
public/images/
├── profile/meSunset.jpg
├── photography/portrait/ urban/ nature/ lightpainting/
├── drawing/watercolor/ pen_ink/ digital/
├── painting/
├── production/
└── instagram/
```

Loading utility: `src/utils/imageHelper.ts`
- `getCategoryImages(category, subcategory?)` — loads from folder, falls back to `placeholder.svg`
- `getPlaceholderImages(category, subcategory?, count)` — always returns placeholders
- Uploaded images also in `public/lovable-uploads/` (e.g. logo)

---

## /learn — Course Landing Page

Built for a music education product. All components in `src/components/courses/`.

### Page composition (Learn.tsx)

```
CourseNav       — sticky, glassy on scroll, links scroll to section IDs
CourseHero      — full-screen hero, animated badge + headline + dual CTA
CourseFeatures  — 6-card grid (id="features")
CourseCurriculum — 5-module accordion (id="curriculum")
PricingSection  — 3-tier pricing (id="pricing")
CourseFAQ       — 7-item FAQ (id="faq")
CourseCTA       — final push with arrow CTA
Footer          — copyright + links
```

### Pricing Tiers

| Tier | Price | ID |
|---|---|---|
| Songwriting Course | $97 one-time | `course` |
| Creator Membership | $29/month | `membership` |
| 1:1 Coaching | $150/session | `coaching` |

**Not yet wired:** Stripe checkout URLs (stubbed in `PricingSection.tsx` `handleCTA`).
**Wired:** Coaching CTA opens `https://cal.com/heiah/coaching` in a new tab.

### Curriculum (5 modules)

1. The Architecture of a Song
2. Melody & Hook Writing
3. Lyric Writing That Lands
4. Chord Progressions & Harmony
5. From Demo to Finished Song

---

## Key Dependencies

```json
"react": "18.3.1",
"react-router-dom": "6.26.2",
"@tanstack/react-query": "5.56.2",
"react-hook-form": "7.53.0",
"zod": "3.23.8",
"tailwindcss": "3.4.11",
"lucide-react": "latest",
"embla-carousel-react": "latest",
"recharts": "2.12.7",
"date-fns": "latest",
"next-themes": "latest",
"sonner": "latest",
"@iconify/react": "5.2.0"
```

All Radix UI primitives available via `@radix-ui/*`.

---

## What Is NOT Built Yet

The following is planned but not implemented:

- **Cal.com integration** — booking embed (currently just an external link)
- **Course player** — interactive lesson viewer with progress tracking
- **Exercises system** — interactive exercises within lessons
- ~~**Stripe payments**~~ — **DONE**: checkout redirect, success/cancel pages, client-side purchase marker via localStorage
- **Stripe <-> Supabase webhook** — see below

---

## Stripe Payments — Implementation Status

### ✅ Done
- `src/lib/stripe.ts` — `redirectToCheckout()` with price IDs from `.env`, dynamic success/cancel URLs
- `src/components/courses/PricingSection.tsx` — CTA buttons call `redirectToCheckout('course'|'membership')`
- `src/pages/PaymentSuccess.tsx` — thanks page, sets `localStorage.heiah_purchases` marker
- `src/pages/PaymentCancel.tsx` — cancellation page
- Routes in `App.tsx`: `/payment/success`, `/payment/cancel`

### 🔴 Open: Stripe Webhook + Supabase User Sync

**Problem:** After a successful Stripe checkout, the purchased user's Supabase `subscriptions` table needs to be updated to grant course/membership/coaching access on the server side.

**Status: Webhook handler deployed on Hetzner ✅**

The webhook handler is now live at `POST https://api.heiah.de/api/stripe-webhook`:
- `webhook/stripe_webhook.py` on Hetzner (FastAPI route in heiah-engine)
- Verifies Stripe webhook signature
- Maps price IDs to tiers (`course`/`membership`/`coaching`)
- Upserts Supabase `subscriptions` table via service_role key
- Fallback endpoints: `GET /api/subscription-status?email=...`

**What's still needed to activate:**

| Step | What | Status |
|------|------|--------|
| 1 | Supabase project re-create or re-activate | 🔴 **Blocked** — `cxtppyoxnhoyamaksapo.supabase.co` resolves NXDOMAIN |
| 2 | Run SQL migration `supabase-migration-stripe-webhook.sql` | 🔴 Blocked by step 1 |
| 3 | Set `STRIPE_WEBHOOK_SECRET` in `/opt/heiah/.env` | 🔴 Needs Stripe Dashboard → Webhooks |
| 4 | Set `SUPABASE_SERVICE_ROLE_KEY` in `/opt/heiah/.env` | 🔴 Blocked by step 1 |
| 5 | Register webhook URL in Stripe Dashboard → Webhooks | ⏳ After step 3 |
| 6 | Set `SUPABASE_URL` in `/opt/heiah/.env` | 🔴 Blocked by step 1 |

**Client-side fallback (current):**
- `src/hooks/useSubscription.ts` — fetches from `/api/subscription-status`, falls back to localStorage
- `src/pages/Dashboard.tsx` — shows subscription status indicator and access information
- localStorage `heiah_purchases` is still the stopgap until webhook is fully configured

**Required env vars on Hetzner (`/opt/heiah/.env`):**
```env
STRIPE_WEBHOOK_SECRET=***          # Stripe Dashboard → Webhooks → signing secret
SUPABASE_SERVICE_ROLE_KEY=***      # Supabase Dashboard → Settings → API
SUPABASE_URL=https://xxx.supabase.co
```

---

## Dev Commands

```bash
npm run dev        # Dev server at localhost:8080
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint
```

---

## Deployment

- **Host:** Vercel
- **Repo:** `git@github.com:HeiaH/art-tech-education-hub.git`
- **Branch:** `main` (auto-deploy on push)
- **SPA routing:** `vercel.json` rewrites all paths to `index.html`
- **SSH key** configured on this machine at `~/.ssh/id_ed25519`

To deploy: `git add`, `git commit`, `git push origin main` — Vercel handles the rest.
