# CTA-Scroll-Target-Audit — heiah.de

**Datum:** 23. Juni 2026
**Projekt:** ~/art-tech-education-hub/

---

## 1. Alle scrollTo/scrollIntoView-Aufrufe (Gesamt: 16)

### src/components/Hero.tsx (1 Aufruf)
| Zeile | Funktion | Ziel |
|---|---|---|
| 22–27 | `scrollToAbout()` | `document.getElementById('about')?.scrollIntoView()` |

### src/components/Footer.tsx (1 Aufruf)
| Zeile | Funktion | Ziel |
|---|---|---|
| 74–76 | `scrollToTop()` | `window.scrollTo({ top: 0 })` |

### src/components/Navigation.tsx (2 Aufrufe)
| Zeile | Funktion | Ziel |
|---|---|---|
| 27–33 | `scrollToSection(id)` | `element.scrollIntoView(...)` — parameterisiert (6×) |
| 45–47 | Logo-Klick | `window.scrollTo({ top: 0 })` |

### src/components/courses/CourseHero.tsx (3 Aufrufe)
| Zeile | Funktion | Ziel |
|---|---|---|
| 13–15 | `scrollTo(id)` | `document.getElementById(id)?.scrollIntoView(...)` |
| 67 | See Pricing CTA | `'pricing'` |
| 74 | View Curriculum CTA | `'curriculum'` |
| 102 | Explore Scroll-Hint | `'features'` |

### src/components/courses/CourseNav.tsx (2 Aufrufe)
| Zeile | Funktion | Ziel |
|---|---|---|
| 22–25 | `scrollTo(href)` | Stripped #, dann `getElementById(id)?.scrollIntoView(...)` |
| 49 | Nav-Links (4×) | `#features`, `#curriculum`, `#pricing`, `#faq` |
| 59 | Enroll Now Button | `scrollTo('#pricing')` → `#pricing` |

### src/components/courses/CourseCTA.tsx (1 Aufruf)
| Zeile | Funktion | Ziel |
|---|---|---|
| 5–7 | `scrollToPricing()` | `document.getElementById('pricing')?.scrollIntoView(...)` |

---

## 2. Mapping-Tabelle

### Portfolio-Seite (`/`)

| Komponente | Button-Label | scrollTo-Ziel | Section-ID | Status |
|---|---|---|---|---|
| Navigation (desktop) | About | `'about'` | `id="about"` (AboutMe.tsx:21) | ✅ EXISTS |
| Navigation (desktop) | Artist | `'artist'` | `id="artist"` (ArtistSection.tsx:49) | ✅ EXISTS |
| Navigation (desktop) | Coach | `'coach'` | `id="coach"` (CoachSection.tsx:154) | ✅ EXISTS |
| Navigation (desktop) | Developer | `'developer'` | `id="developer"` (DeveloperSection.tsx:59) | ✅ EXISTS |
| Navigation (desktop) | Tools | `'tools'` | `id="tools"` (ToolsSection.tsx:33) | ✅ EXISTS |
| Navigation (desktop) | Contact | `'contact'` | `id="contact"` (ContactSection.tsx:86) | ✅ EXISTS |
| Navigation (mobile) | About–Contact | gleiche 6 IDs | s.o. | ✅ EXISTS |
| Hero | Explore | `'about'` | `id="about"` (AboutMe.tsx:21) | ✅ EXISTS |
| Navigation (Logo) | Logo-Klick | `window.scrollTo({top:0})` | — | ✅ (Seitentop) |
| Footer | Back-to-top | `window.scrollTo({top:0})` | — | ✅ (Seitentop) |

### Learn-Seite (`/learn`)

| Komponente | Button-Label | scrollTo-Ziel | Section-ID | Status |
|---|---|---|---|---|
| CourseHero | See Pricing | `'pricing'` | `id="pricing"` (PricingSection.tsx:105) | ✅ EXISTS |
| CourseHero | View Curriculum | `'curriculum'` | `id="curriculum"` (CourseCurriculum.tsx:90) | ✅ EXISTS |
| CourseHero | Explore (Scroll-Hint) | `'features'` | `id="features"` (CourseFeatures.tsx:69) | ✅ EXISTS |
| CourseNav | Features (Nav-Link) | `'#features'` | `id="features"` | ✅ EXISTS |
| CourseNav | Curriculum (Nav-Link) | `'#curriculum'` | `id="curriculum"` | ✅ EXISTS |
| CourseNav | Pricing (Nav-Link) | `'#pricing'` | `id="pricing"` | ✅ EXISTS |
| CourseNav | FAQ (Nav-Link) | `'#faq'` | `id="faq"` (CourseFAQ.tsx:54) | ✅ EXISTS |
| CourseNav | Enroll Now (CTA) | `'#pricing'` | `id="pricing"` | ✅ EXISTS |
| CourseCTA | See Pricing | `'pricing'` | `id="pricing"` | ✅ EXISTS |

---

## 3. Navigation href vs Section-ID — Vollständiger Abgleich

**Navigation.tsx** (ohne `#`-Prefix verwendet — direkte Strings):
| Item | String | Ziel-ID | Match |
|---|---|---|---|
| about | `'about'` | `id="about"` | ✅ |
| artist | `'artist'` | `id="artist"` | ✅ |
| coach | `'coach'` | `id="coach"` | ✅ |
| developer | `'developer'` | `id="developer"` | ✅ |
| tools | `'tools'` | `id="tools"` | ✅ |
| contact | `'contact'` | `id="contact"` | ✅ |

**CourseNav.tsx** (mit `#`-Prefix — im Handler gestrippt):
| Item | href | ID (nach Strip) | Ziel-ID | Match |
|---|---|---|---|---|
| Features | `'#features'` | `features` | `id="features"` | ✅ |
| Curriculum | `'#curriculum'` | `curriculum` | `id="curriculum"` | ✅ |
| Pricing | `'#pricing'` | `pricing` | `id="pricing"` | ✅ |
| FAQ | `'#faq'` | `faq` | `id="faq"` | ✅ |

**Ergebnis: 10/10 Navigation-Links korrekt → 10/10 Section-IDs vorhanden.** ✅

---

## 4. Copy-Paste-Bug-Check

### Lebende Seite — CourseHero (Zeilen 60–79)
Drei benachbarte Buttons:

| Button | Ziel | Position |
|---|---|---|
| "See Pricing" | `'pricing'` | Primary CTA (oben) |
| "View Curriculum" | `'curriculum'` | Secondary CTA |
| "Explore" (scroll-hint) | `'features'` | Darunter |

**→ Drei verschiedene Ziele — kein Bug.** ✅

### Mehrfach-Scrolls zu `#pricing` — INTENDED DESIGN
| Button | Komponente | Zeile |
|---|---|---|
| "See Pricing" | CourseHero (primary CTA) | 67 |
| "Enroll Now" | CourseNav (sticky nav CTA) | 59 |
| "See Pricing" | CourseCTA (bottom section) | 23 |

→ Drei **unterschiedliche CTAs an unterschiedlichen Positionen**, die alle zur Pricing-Section führen. Das ist UX-gewollt.

### Portfolio-Navigation — Desktop/Mobile-Duplizierung
Desktop (Zeile 72) und Mobile (Zeile 140) haben identische 6 sectionIds. Responsive-Duplizierung — bewusst, kein Bug. ✅

**→ Keine Copy-Paste-Bugs gefunden.** ✅

---

## 5. Ziel-Element-Existenzprüfung

| scrollTo-Ziel | Definiert in | Zeile | Existiert? |
|---|---|---|---|
| `'about'` | `AboutMe.tsx` | 21 | ✅ |
| `'artist'` | `ArtistSection.tsx` | 49 | ✅ |
| `'coach'` | `CoachSection.tsx` | 154 | ✅ |
| `'developer'` | `DeveloperSection.tsx` | 59 | ✅ |
| `'tools'` | `ToolsSection.tsx` | 33 | ✅ |
| `'contact'` | `ContactSection.tsx` | 86 | ✅ |
| `'features'` | `CourseFeatures.tsx` | 69 | ✅ |
| `'curriculum'` | `CourseCurriculum.tsx` | 90 | ✅ |
| `'pricing'` | `PricingSection.tsx` | 105 | ✅ |
| `'faq'` | `CourseFAQ.tsx` | 54 | ✅ |

**→ 10/10 Ziel-Elementen existieren.** ✅

---

## 6. Footer-Placeholder-Links

**Datei:** `src/components/Footer.tsx`

| Zeile | Link-Text | href | Problem |
|---|---|---|---|
| 158 | `{t('privacy')}` (≈ "Privacy Policy") | `href="#"` | ❌ **Placeholder** — kein Ziel |
| 159 | `{t('imprint')}` (≈ "Impressum") | `href="#"` | ❌ **Placeholder** — kein Ziel |
| 160 | `{t('terms')}` (≈ "AGB") | `href="#"` | ❌ **Placeholder** — kein Ziel |

**3 Footer-Lücken** — keine echten Zielseiten hinterlegt.

---

## Zusammenfassung

| Prüfpunkt | Ergebnis |
|---|---|
| **Gesamt scrollTo/scrollIntoView-Aufrufe** | **16** (über alle Komponenten) |
| **Einzigartige Ziele** | **10** (about, artist, coach, developer, tools, contact, features, curriculum, pricing, faq) + 2× top-of-page |
| **Copy-Paste-Bugs** | **0** |
| **Nicht-existente Ziel-Elemente** | **0** (alle 10 IDs vorhanden) |
| **Navigation href → ID-Matches** | **10/10** |
| **Footer-Placeholder-Links (`href="#"`)** | **3** (Privacy, Imprint, Terms) |

### Kritische Issues: 0
### Medium Issues: 0

### Empfehlungen (Low):

1. **Footer-Placeholder-Links (3× `href="#"`)**: Privacy Policy, Impressum und AGB haben keine Zielseiten. Sollten auf `/privacy`, `/imprint`, `/terms` Routen verweisen, sobald diese existieren.

2. **Scroll-Margin für Sticky-Nav-Overlap (CourseNav + Navigation)**: Beide Navigationsleisten sind fixed/sticky. Bei scrollTo-Springen (vor allem auf der Learn-Seite) läuft der obere Teil der Ziel-Section Gefahr, unter der Nav-Bar zu verschwinden. Empfehlung: Tailwind `scroll-mt-20` auf den `<section id="...">`-Elementen (80px Offset für die Nav-Höhe).
