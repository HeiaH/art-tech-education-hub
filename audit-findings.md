# Code Audit Findings — heiah.de (art-tech-education-hub)

Generated: 2026-06-18 (updated)
Previous: 2026-06-15

---

## AUDIT 1 — CTA-Scroll-Target-Audit (systematisch)

### 1) ALLE Komponenten-Dateien mit scrollTo/scrollIntoView

Grep nach `scrollTo\(|scrollIntoView` in `src/**/*.{tsx,ts}` (exkl. audit-findings.md):

| # | Datei | Pfad | Aufrufe |
|---|-------|------|---------|
| 1 | **Navigation.tsx** | `src/components/Navigation.tsx` | 2 |
| 2 | **Footer.tsx** | `src/components/Footer.tsx` | 1 |
| 3 | **Hero.tsx** | `src/components/Hero.tsx` | 1 |
| 4 | **CourseNav.tsx** | `src/components/courses/CourseNav.tsx` | 3 |
| 5 | **CourseHero.tsx** | `src/components/courses/CourseHero.tsx` | 4 |
| 6 | **CourseCTA.tsx** | `src/components/courses/CourseCTA.tsx` | 1 |
| | **Total** | | **12** |

### 2) Mapping: Button-Label → scrollTo-Ziel → Section-ID

#### Portfolio Page (/) — Index.tsx

| Button-Label | Datei:Zeile | Funktion | scrollTo-Ziel | Section-ID (Datei:Zeile) | ✅ Existiert |
|---|---|---|---|---|---|
| Logo "HeiaH" → top | Navigation.tsx:47 | `window.scrollTo({top:0})` | `top (0)` | (keine ID nötig) | ✅ |
| About (t('about')) | Navigation.tsx:72 (desk) / :141 (mob) | `scrollToSection('about')` | `#about` | `id="about"` (AboutMe.tsx:21) | ✅ |
| Artist (t('artist')) | Navigation.tsx:72 / :141 | `scrollToSection('artist')` | `#artist` | `id="artist"` (ArtistSection.tsx:49) | ✅ |
| Coach (t('coach')) | Navigation.tsx:72 / :141 | `scrollToSection('coach')` | `#coach` | `id="coach"` (CoachSection.tsx:154) | ✅ |
| Developer (t('developer')) | Navigation.tsx:72 / :141 | `scrollToSection('developer')` | `#developer` | `id="developer"` (DeveloperSection.tsx:59) | ✅ |
| Tools (t('tools')) | Navigation.tsx:72 / :141 | `scrollToSection('tools')` | `#tools` | `id="tools"` (ToolsSection.tsx:33) | ✅ |
| Contact (t('contact')) | Navigation.tsx:72 / :141 | `scrollToSection('contact')` | `#contact` | `id="contact"` (ContactSection.tsx:86) | ✅ |
| Explore | Hero.tsx:62 | `scrollToAbout()` | `#about` | `id="about"` (AboutMe.tsx:21) | ✅ |
| ↑ Back to top | Footer.tsx:84 | `scrollToTop()` | `top (0)` | (keine ID nötig) | ✅ |

#### /learn Page — Learn.tsx

| Button-Label | Datei:Zeile | Funktion | scrollTo-Ziel | Section-ID (Datei:Zeile) | ✅ Existiert |
|---|---|---|---|---|---|
| Features | CourseNav.tsx:47 | `scrollTo('#features')` | `#features` | `id="features"` (CourseFeatures.tsx:69) | ✅ |
| Curriculum | CourseNav.tsx:47 | `scrollTo('#curriculum')` | `#curriculum` | `id="curriculum"` (CourseCurriculum.tsx:90) | ✅ |
| Pricing | CourseNav.tsx:47 | `scrollTo('#pricing')` | `#pricing` | `id="pricing"` (PricingSection.tsx:105) | ✅ |
| FAQ | CourseNav.tsx:47 | `scrollTo('#faq')` | `#faq` | `id="faq"` (CourseFAQ.tsx:54) | ✅ |
| Enroll Now | CourseNav.tsx:59 | `scrollTo('#pricing')` | `#pricing` | `id="pricing"` (PricingSection.tsx:105) | ✅ |
| See Pricing | CourseHero.tsx:67 | `scrollTo('pricing')` | `#pricing` | `id="pricing"` (PricingSection.tsx:105) | ✅ |
| View Curriculum | CourseHero.tsx:74 | `scrollTo('curriculum')` | `#curriculum` | `id="curriculum"` (CourseCurriculum.tsx:90) | ✅ |
| Explore (↓ hint) | CourseHero.tsx:102 | `scrollTo('features')` | `#features` | `id="features"` (CourseFeatures.tsx:69) | ✅ |
| See Pricing | CourseCTA.tsx:23 | `scrollToPricing()` | `#pricing` | `id="pricing"` (PricingSection.tsx:105) | ✅ |

### 3) Navigation href='#...' gegen tatsächliche id='...'

**Ergebnis: ✅ KEINE `href="#section-id"`-Links im gesamten Codebase.**

Alle `href="#"`-Vorkommen (4 Stück):
- **Navigation.tsx:44** — Logo-Link, verwendet `e.preventDefault()` + `window.scrollTo({top:0})` → kein echter Anchor-Scroll
- **Footer.tsx:158-160** — `href="#"` für Platzhalter Privacy/Imprint/Terms → keine Section-ID, keine Scroll-Funktion

Da alle Navigation über onClick + JavaScript läuft, gibt es **keine href-vs-id-Diskrepanzen**.

### 4) Copy-Paste-Bug-Fokus: Zwei benachbarte Buttons gleiches Ziel?

| Ziel | Anvisiert von | Gleiche Komponente? | Befund |
|---|---|---|---|
| **#pricing** | CourseNav nav-link "Pricing" + CourseNav "Enroll Now" + CourseHero "See Pricing" + CourseCTA "See Pricing" | CourseNav: ja (2 Buttons) | ✅ **INTENDED DESIGN** — "Pricing" als Nav-Eintrag + "Enroll Now" als separater CTA-Button in derselben Navbar mit unterschiedlichen Labels |
| **#curriculum** | CourseNav nav-link "Curriculum" + CourseHero "View Curriculum" | Nein | ✅ Unterschiedliche Komponenten, unterschiedliche Labels |
| **#features** | CourseNav nav-link "Features" + CourseHero scroll hint "Explore" | Nein | ✅ Unterschiedliche Komponenten |
| **#about** | Navigation nav-link "About" + Hero "Explore" | Nein | ✅ Unterschiedliche Komponenten, unterschiedliche Labels |

**KEINE Copy-Paste-Bugs gefunden.** Alle mehrfach anvisierten Ziele sind bewusste redundante Einstiegspunkte.

### 5) Ziel-Element-Existenz-Prüfung

| Ziel | id-Attribut gefunden in | Zeile | ✅ |
|---|---|---|---|
| `about` | AboutMe.tsx | :21 | ✅ |
| `artist` | ArtistSection.tsx | :49 | ✅ |
| `coach` | CoachSection.tsx | :154 | ✅ |
| `developer` | DeveloperSection.tsx | :59 | ✅ |
| `tools` | ToolsSection.tsx | :33 | ✅ |
| `contact` | ContactSection.tsx | :86 | ✅ |
| `features` | CourseFeatures.tsx | :69 | ✅ |
| `curriculum` | CourseCurriculum.tsx | :90 | ✅ |
| `pricing` | PricingSection.tsx | :105 | ✅ |
| `faq` | CourseFAQ.tsx | :54 | ✅ |

**STATUS: ✅ ALLE 10 Section-IDs existieren in den Komponenten. Keine dangling targets.**

### 6) Zählung

| Metrik | Anzahl |
|---|---|
| **scrollTo/scrollIntoView Aufrufe** (im Quellcode) | **12** |
| **Dateien mit scrollTo/scrollIntoView** | **6** |
| **Section-IDs (id="...") in Komponenten** | **10** |
| **Unique Ziele (distinct IDs)** | **9** (about, artist, coach, developer, tools, contact, features, curriculum, pricing, faq + top) |
| **Meist anvisiertes Ziel** | `#pricing` (5 Aufrufe) |
| **Zweit-meist anvisiertes Ziel** | `#curriculum` (2 Aufrufe) |

### Fazit

**STATUS: ✅ ALLE SCROLL TARGETS VALID — No broken or dangling scroll targets.**

- **12 scrollTo/scrollIntoView-Aufrufe** verteilt auf 6 Komponenten
- **10 Section-IDs** existieren nachweislich
- **9 unique Scroll-Ziele** (10 IDs minus Pricing-Dopplung)
- **0 Copy-Paste-Bugs**
- **0 href-vs-id-Diskrepanzen** (keine `href="#..."` Links im Einsatz)
- **0 dangling/dead targets**
- Häufigstes Ziel `#pricing` (5x) ist **intentional**: redundante CTAs auf einer langen Sales-Page sind UX-Standard (F-Pattern / Conversion-Funnel)

---

## AUDIT 2 — CSS Residues

### Scope
1. All `animate-*` classes used in `src/**/*.{tsx,ts}` compared against `tailwind.config.ts` animation keyframes
2. Unused keyframes in config
3. Stale 3D transforms (`perspective`, `rotate-y`, `preserve-3d`, `backface-visibility`, `transform-style`)

### Custom `animate-*` classes used vs. defined

| Class Used | In Config? | Locations |
|---|---|---|
| `animate-fade-in` | ✅ `fade-in` keyframe defined | InstagramFeed, ToolsSection, DeveloperSection, ContactSection, CoachSection, MusicCategory, PaintingCategory, DrawingCategory, PhotographyCategory |
| `animate-float` | ✅ `float` keyframe defined | Hero.tsx, CourseHero.tsx |
| `animate-float-slow` | ✅ `float-slow` keyframe defined | Hero.tsx, CourseHero.tsx |
| `animate-scale-in` | ✅ `scale-in` keyframe defined | PaymentCancel.tsx, PaymentSuccess.tsx |
| `animate-accordion-down` | ✅ `accordion-down` keyframe defined | ui/accordion.tsx |
| `animate-accordion-up` | ✅ `accordion-up` keyframe defined | ui/accordion.tsx |
| `animate-spin` | ⚡ Tailwind built-in (not custom) | ProtectedRoute, Login, Register, Dashboard, InstagramFeed, PricingSection |
| `animate-pulse` | ⚡ Tailwind built-in (not custom) | PricingSection, ToolsSection, ContactSection |

### Keyframes defined in `tailwind.config.ts`

| Keyframe | Used by animation | In Use? |
|---|---|---|
| `accordion-down` | `animate-accordion-down` | ✅ ui/accordion.tsx |
| `accordion-up` | `animate-accordion-up` | ✅ ui/accordion.tsx |
| `fade-in` | `animate-fade-in` | ✅ 10+ components |
| `scale-in` | `animate-scale-in` | ✅ PaymentCancel, PaymentSuccess |
| `float` | `animate-float` | ✅ Hero, CourseHero |
| `float-slow` | `animate-float-slow` | ✅ Hero, CourseHero |

### `animate-caret-blink` (input-otp.tsx)
Used in `src/components/ui/input-otp.tsx:51` — supplied by the `tailwindcss-animate` plugin (shadcn/ui dependency). Not a custom animation. No issue.

### 3D transform residues

**STATUS: ✅ NONE FOUND.** Grep for `perspective`, `rotate-y`, `preserve-3d`, `backface-visibility`, `transform-style` returned zero results in any component/CSS file. The only `translateY` appearances are in scroll-reveal animation patterns (standard opacity + translateY), not CSS 3D transforms.

### Findings

**STATUS: ✅ CLEAN — No residues detected.**
- All custom `animate-*` classes have corresponding keyframes in `tailwind.config.ts`.
- No unused keyframes in config.
- `animate-spin` and `animate-pulse` are Tailwind built-ins, correctly used without custom config.
- No stale 3D transform properties found anywhere.

---

## AUDIT 3 — /learn Conversion Check

### Page structure (Learn.tsx)
```
CourseNav → CourseHero → CourseFeatures → CourseCurriculum → PricingSection → CourseFAQ → CourseCTA → Footer
```
Components read: CourseNav.tsx, CourseHero.tsx, CourseFeatures.tsx, CourseCurriculum.tsx, PricingSection.tsx, CourseFAQ.tsx, CourseCTA.tsx.

### Conversion element checklist

#### ✅ Social Proof under Hero
**PRESENT** in CourseHero.tsx (lines 81–98):
- "100+ songwriters enrolled" (quantity social proof)
- "30-day money-back" (risk reversal)
- "Start in 5 min" (low-friction onboarding)
- Styled as a subtle row below CTAs, fades in with delay.

#### ⚠️ Pricing Urgency
**WEAK** in PricingSection.tsx:
- Bottom of pricing: "42 students enrolled this month — learning never stops" (line 216)
  - Static number, small text, white/20 opacity — easily missed
  - No countdown timer, no "only X spots left", no limited-time offer
  - No "enrollment closing soon" messaging
  - `animate-pulse` on a green dot next to the enrollment text adds minor attention but the content itself is weak

#### ⚠️ Trust Signals
**PARTIAL COVERAGE**:
- ✅ "Payments processed securely by Stripe" — PricingSection line 212
- ✅ "No subscriptions required / No hidden fees" — section header
- ✅ "Lifetime Access" / "All future updates" — feature lists
- ✅ Community Discord (peer validation)
- ❌ **No student testimonials or reviews** — no quotes, no star ratings, no video testimonials anywhere
- ❌ **No instructor credentials/bio** within the learn path (visible on portfolio but not connected in the /learn funnel)
- ❌ **No "as seen on" / press logos**
- ❌ **Money-back guarantee only in hero + FAQ** — not repeated at pricing where the purchase decision happens

#### ⚠️ CTA Text Strength

| Location | CTA Text | Assessment |
|---|---|---|
| CourseNav (sticky) | "Enroll Now" | ✅ Strong, action-oriented |
| CourseHero primary | "See Pricing" | ⚠️ Weak — informational, not purchase-directing |
| CourseHero secondary | "View Curriculum" | ⚠️ Informational (acceptable for secondary) |
| Pricing – Course tier | "Get Lifetime Access" | ✅ Strong |
| Pricing – Membership | "Start Membership" | ✅ Strong |
| Pricing – Coaching | "Book a Session" | ✅ Strong |
| CourseCTA (final) | "See Pricing" | ❌ Weak — repeats hero; should be "Enroll Now" or direct purchase |

#### ❌ Missing Conversion Elements

1. **No direct "Buy Now" / "Enroll Now" in hero** — Only "See Pricing". Adding a direct purchase CTA in the hero could capture impulse buyers.
2. **No scarcity/urgency mechanism** — No countdown, limited spots, or time-based offer.
3. **No video preview/trailer** — No embedded demo or "watch a sample lesson".
4. **No student testimonials/reviews** — The single biggest conversion gap.
5. **No comparison table** — No "course vs. free YouTube" or "this course vs. others" comparison.
6. **No email capture / lead magnet** — No "get a free lesson" opt-in to build an email list.
7. **No money-back guarantee at point of sale** — Mentioned in hero and FAQ accordion, but absent from the pricing card itself.
8. **CourseCTA is redundant** — "See Pricing" again sends users back to pricing they may have already seen. Should offer a direct purchase path or a specific incentive.
9. **No social proof at pricing cards** — No "X students have taken this" or rating next to each tier.
10. **No risk reversal in pricing** — The "30-day money-back" is in hero only, not reiterated near the checkout button.

### Conversion Score: 5.5/10

**What's working well:**
- 3-tier pricing with "Most Popular" anchoring
- Social proof row in hero (quantity + money-back + low friction)
- Clean, dark-themed trust-focused design
- FAQ addresses common objections well
- Community Discord as value-add + social proof
- Lifetime Access messaging

**Priority improvements:**
1. **Add student testimonials** — 1–3 quotes near pricing or as a dedicated section between curriculum and pricing
2. **Strengthen hero CTA** — "See Pricing" → "Enroll Now — $97" or "Start Learning Today"
3. **Surface money-back guarantee at pricing** — Add badge/callout on the pricing card itself
4. **CourseCTA needs stronger text** — "See Pricing" → "Get Lifetime Access" or "Enroll Now"
5. **Add scarcity signal** — Even "Limited enrollment — next cohort opens [date]" would help
