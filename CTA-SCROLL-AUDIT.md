# CTA → Scroll-Target → Section-ID Audit

> Generated: $(date "+%Y-%m-%d %H:%M")
> Scope: `~/art-tech-education-hub/src/` + `~/mission-control/src/`

---

## ◈ heiah.de — Portfolio Page (`/`)

### 1. Hero.tsx

| Button / CTA | scrollTo-Aufruf | Ziel-ID | Existiert in DOM? |
|---|---|---|---|
| "Explore" (↓ Arrow) | `document.getElementById('about')` → `.scrollIntoView()` | `about` | ✅ AboutMe.tsx:21 |

**Copy-Paste-Bug?** ✅ Nein — nur eine CTA.

---

### 2. Navigation.tsx

| Trigger | scrollTo-Aufruf | Ziel-ID | Existiert in DOM? |
|---|---|---|---|
| Logo-Klick | `window.scrollTo({ top: 0 })` | — (top) | ✅ immer |
| Nav-Desktop: "about" | `document.getElementById('about')` → `.scrollIntoView()` | `about` | ✅ AboutMe.tsx:21 |
| Nav-Desktop: "artist" | `document.getElementById('artist')` → `.scrollIntoView()` | `artist` | ✅ ArtistSection.tsx:49 |
| Nav-Desktop: "coach" | `document.getElementById('coach')` → `.scrollIntoView()` | `coach` | ✅ CoachSection.tsx:154 |
| Nav-Desktop: "developer" | `document.getElementById('developer')` → `.scrollIntoView()` | `developer` | ✅ DeveloperSection.tsx:59 |
| Nav-Desktop: "tools" | `document.getElementById('tools')` → `.scrollIntoView()` | `tools` | ✅ ToolsSection.tsx:33 |
| Nav-Desktop: "contact" | `document.getElementById('contact')` → `.scrollIntoView()` | `contact` | ✅ ContactSection.tsx:86 |
| Nav-Mobile: "about"–"contact" | gleicher Code wie Desktop | selbe IDs | ✅ alle |
| Nav-Mobile: Login/Dashboard | `Link to="/login"` (Router, kein scroll) | — | — |

**Copy-Paste-Bug?** ✅ Nein — 6 eindeutige Section-IDs, keine Duplikate.

---

### 3. Footer.tsx

| Button / CTA | scrollTo-Aufruf | Ziel |
|---|---|---|
| ↑ Arrow (aria-label="Back to top") | `window.scrollTo({ top: 0, behavior: 'smooth' })` | Seitenanfang |

**Copy-Paste-Bug?** ✅ Nein — einziger scrollTo.

---

## ◈ heiah.de — Course Landing Page (`/learn`)

### 4. CourseHero.tsx

| Button / CTA | scrollTo(id) | Ziel-ID | DOM vorhanden? |
|---|---|---|---|
| "See Pricing" | `scrollTo('pricing')` | `pricing` | ✅ PricingSection.tsx:105 |
| "View Curriculum" | `scrollTo('curriculum')` | `curriculum` | ✅ CourseCurriculum.tsx:90 |
| "Explore" (↓ Scroll-Hinweis) | `scrollTo('features')` | `features` | ✅ CourseFeatures.tsx:69 |

**Copy-Paste-Bug?** ✅ Nein — alle 3 Ziele unterschiedlich.

---

### 5. CourseNav.tsx

| Link-Text | href-Attribut | extrahierte ID | DOM vorhanden? |
|---|---|---|---|
| "Features" | `#features` | `features` | ✅ CourseFeatures.tsx:69 |
| "Curriculum" | `#curriculum` | `curriculum` | ✅ CourseCurriculum.tsx:90 |
| "Pricing" | `#pricing` | `pricing` | ✅ PricingSection.tsx:105 |
| "FAQ" | `#faq` | `faq` | ✅ CourseFAQ.tsx:54 |
| "Enroll Now" (CTA Button) | `#pricing` | `pricing` | ✅ PricingSection.tsx:105 |

**Navigation href → Section-ID Konsistenz?** ✅ Alle `href="#…"` stimmen mit tatsächlichen `id="…"` Attributen überein.

**Copy-Paste-Bug?** ✅ Nein — 5 eindeutige Links, "Pricing" und "Enroll Now" scrollen gezielt beide zu `#pricing` (intentional — zwei CTAs gleiches Ziel auf einer Unterseite).

---

### 6. CourseCTA.tsx

| Button | scrollTo-Aufruf | Ziel-ID | DOM vorhanden? |
|---|---|---|---|
| "See Pricing" | `document.getElementById('pricing')` → `.scrollIntoView()` | `pricing` | ✅ PricingSection.tsx:105 |

**Copy-Paste-Bug?** ✅ Nein — einzige CTA.

---

## ◈ Mission Control (`~/mission-control/src/`)

### 7. ChatPanel.tsx

| Trigger | scrollTo-Aufruf | Zweck |
|---|---|---|
| `useEffect([messages])` | `scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })` | Auto-Scroll Chat beim Empfang neuer Nachrichten |

**Bewertung:** Standard Chat-Auto-Scroll — kein Bug, kein fehlendes Ziel, kein Copy-Paste-Problem.

**Copy-Paste-Bug?** ✅ Nein.

---

## ◈ Zusammenfassung / Fazit

| Kriterium | Status |
|---|---|
| **Gefundene scrollTo/scrollIntoView Aufrufe** | **14 Stellen** (heiah.de: 13 + Mission Control: 1) |
| **Button-Label → scrollTo-Ziel → Section-ID** | ✅ 100% konsistent |
| **Navigation href="#…" gegen tatsächliche id="…"** | ✅ Alle 4 CourseNav-Links + Pricing-CTA passen |
| **Copy-Paste-Bug (2 benachbarte Buttons → gleiches Ziel)** | ✅ **Kein Bug gefunden** — alle benachbarten Buttons scrollen zu unterschiedlichen Section-IDs |
| **Ziel-Element existiert wirklich?** | ✅ Jede referenzierte ID (`about`, `artist`, `coach`, `developer`, `tools`, `contact`, `features`, `curriculum`, `pricing`, `faq`) ist im DOM verankert |
| **window.scrollTo({ top: 0 }) Duplikate** | 2x (Navigation Logo + Footer) — intentional, unterschiedliche Kontexte |

### Keine Handlungsbedarf

Der Audit hat **keine Fehler, keine toten Links und keine Copy-Paste-Bugs** gefunden. Die Scroll-Architektur ist sauber implementiert.

