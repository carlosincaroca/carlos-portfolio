# Language Selector + Full i18n — Design

**Date:** 2026-06-01
**Status:** Approved (design), pending implementation plan

## Goal

Add a language selector (globe dropdown, like Anthropic's) that fully translates the
BIO MECH portfolio into **6 languages**:

| Code | Display label        |
|------|----------------------|
| `en` | English (US) — default |
| `ja` | 日本語 (Japan)        |
| `de` | Deutsch (Germany)    |
| `fr` | Français (France)    |
| `ko` | 한국어 (South Korea)  |
| `es` | Español (España)     |

Selecting a language re-renders the **entire site** (hero, nav, intro, about, profile,
specializations, project index, and all 6 case studies) in that language. Choice persists.

## Translation source

AI-generated (by Claude) for all non-English languages, including technical/medical copy.
Native proofread recommended before professional reliance. (Noted as a known limitation.)

## Architecture: per-language content objects

All translatable copy is centralized into `window.CONTENT`, keyed by language, each entry
mirroring the existing data shapes already used in the code:

```
window.CONTENT = {
  en: { nav, hero, intro, about, spec, projects: [...6], caseStudy },
  ja: { ...same shape... },
  de: {...}, fr: {...}, ko: {...}, es: {...},
}
```

- New file `content.jsx` (loaded before `app2.jsx`) defines `window.CONTENT` and
  `window.LANGS` (ordered list of `{ code, label }` for the dropdown).
- New file `i18n.jsx` defines `window.LangContext` (React context) and a `useLang()` hook
  returning `{ lang, setLang, c }` where `c = CONTENT[lang]`.
- `App` owns `lang` state (init from `localStorage.lang`, fallback `en`), wraps its tree in
  `LangContext.Provider`, and threads `c` (the active language's content) into all sections
  and case studies via props.
- Components read `c.hero.tagline`, `c.projects[i].title`, etc., instead of hardcoded text.

### Translate vs. preserve

- **Translate:** all prose, headings, labels, button text, status words, captions, eyebrows.
- **Preserve (identical across languages):** proper nouns (Brigham Young University), the
  `BIO•MECH` brand, units/values/numbers (`94.2%`, `Ti-6Al-4V`, `50kg`, `25cmH₂O`, `150°`),
  acronyms used as identifiers (ISO/ASTM/FDA codes, `RTG`, `CPAP`).

## Content inventory (what gets translated), by source file

- **navigation.jsx** — `INDEX OF WORKS`, drawer link labels (HOME/INTRO/ABOUT/SKILLS/INDEX),
  theme toggle (`Dark mode`/`Light mode`), pill-nav labels (HOME/INTRO/ABOUT/SKILLS/WORK).
- **app2.jsx (hero + projects[])** — hero eyebrow tagline, `SCROLL TO EXPLORE PROJECTS`,
  each project's `title`, `category`, `flow`, and the `detail` block
  (`statusLabel`, `statusSub`, `lead`, `metrics[].lbl`, `modeA/B {label,title,desc,items[]}`,
  `protocols[].{name,detail,status}`). Metric **values** stay; metric **labels** translate.
- **about-sections.jsx** — intro section heading/body, about/profile heading + bio +
  field labels (Institution/Degree/Track/Status) with translated values where appropriate,
  specializations eyebrow/title (`CORE COMPETENCIES`), `10 DISCIPLINES`, discipline list.
- **project-index.jsx** — `VIEW SPECS`, `INDEX OF WORKS`, `PROJECTS`/`SYSTEMS` meta labels.
- **case-study*.jsx (shared `dl-` layout)** — `BACK TO INDEX`, section labels
  (`Mode`, `Tech stack`, `Project phases`, `Indexed`), mode toggle button labels,
  control dock (`Explode`/`Assemble`, `Model View`/`Exit View`), `View 3D`/`Dim`,
  figure captions, and all per-project `detail` content (sourced from `c.projects[i]`).

## Component: LanguageSelector

`window.LanguageSelector` — console-aesthetic dropdown (mono type, hairline borders, matches
nav/drawer). Two render variants via prop:

- `variant="bar"` (desktop nav + mobile top bar): trigger button.
  - Desktop: globe icon + current label + chevron; opens a panel listing all 6 languages.
  - Mobile: compact globe icon only (no label, to fit the slim bar); same panel on tap.
- The panel: list of `LANGS`, current one marked active (red), click sets language + closes.
- Closes on outside-click / Escape. Sets `document.documentElement.lang` on change.

Placement:
- **Desktop**: in `.nav-desktop` cluster, before/after the theme toggle.
- **Mobile**: globe icon in `.nav-mobile`, before the theme icon. **Not** in the drawer.

## Fonts (CJK support)

Inter / JetBrains Mono lack JA/KO glyphs. Add **Noto Sans JP** + **Noto Sans KR** (Google
Fonts) and append to the relevant `font-family` stacks so `ja`/`ko` text renders cleanly.
CJK headings fall back to Noto bold (acceptable; Inter has no CJK).

## Persistence & a11y

- `localStorage.lang` stores the choice; read on load (mirrors the existing theme pattern).
- `<html lang="…">` updated on change.
- Selector buttons have `aria-label`; panel uses appropriate roles.

## Files touched

- **New:** `content.jsx` (the 6-language content), `i18n.jsx` (context + hook + selector).
- **Edited:** `index.html` (load new scripts + Noto fonts + cache bump), `app2.jsx`,
  `navigation.jsx`, `about-sections.jsx`, `project-index.jsx`, `case-study.jsx`,
  `case-study-dl.jsx`, `case-study-mars.jsx`, `case-study-spine.jsx`,
  `case-study-respiratory.jsx`, `styles.css` (selector styles + font stacks).

## Verification

- Switch through all 6 languages; confirm every section + all 6 case studies render
  translated copy with values/proper nouns preserved.
- JA/KO render in Noto (no tofu); layout doesn't overflow (re-check the mobile overflow work).
- Choice persists across reload; `<html lang>` updates; desktop dropdown + mobile globe both work.
- Light/dark unaffected; no horizontal scroll regressions at 320/360/390/430.

## Out of scope

- Professional/native translation review.
- Translating image/3D-asset content or alt text beyond existing strings.
- RTL languages (none of the 6 are RTL).
