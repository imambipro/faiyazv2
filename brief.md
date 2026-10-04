# BRIEF — S M Faiyaz Hossain Author Site

Read this whole file before you write code. This file is the single source of truth for design and content.

---

## 1. Goal

Build a 7-page static author website for S M Faiyaz Hossain, a Sydney-based researcher and writer on South Asian politics and minority rights.

The page structure follows the wireframe at https://imambipro.github.io/faiyaz-wireframe/ (Home, About, Writings, In the Media, Speaking, Insights, Contact). Keep that structure. Replace the wireframe look completely.

All text and images are placeholders. The client will send real assets later. Make each asset easy to replace (see section 6).

Feel: minimal, quiet, literary, serious. Like a well-designed book jacket. Not a startup landing page. Not a generic template.

---

## 2. Tech rules

- Plain HTML, CSS, and vanilla JS. No framework, no build step. It must work on GitHub Pages.
- One shared `css/style.css` and one `js/main.js`.
- Keep `<meta name="robots" content="noindex, nofollow">` on all pages for now.
- Mobile first. Test at 375px, 768px, and 1440px.
- Lighthouse performance and accessibility: 90 or higher.
- Do not use Bootstrap, Tailwind, or any UI kit.

---

## 3. Design system

### Colour
The site is dark, but not pure black and not glossy. It must feel calm and warm, not gloomy.

```css
--bg:          #141416;   /* main background, soft charcoal */
--bg-raised:   #1B1B1E;   /* alternate sections */
--text:        #E9E6E1;   /* warm off-white, never pure #FFF */
--text-muted:  #9A968F;
--red:         #B3262E;   /* primary accent, deep red, not neon */
--red-hover:   #CC2F38;
--line:        rgba(255,255,255,0.08);
```

Add a very light film-grain noise overlay on the body (CSS or a small SVG, opacity about 0.03). This removes the flat "digital black" look.

### Glass panels (key visual element)
Use glass panels for buttons, section headers, highlight cards, the nav bar on scroll, and quote blocks.

The glass is **whitish** (frosted white), not red. Red is only an accent.

```css
.glass {
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.10);
  border-radius: 14px;
}
.glass--strong {           /* for key panels, e.g. Community, quote */
  background: rgba(255,255,255,0.11);
  border: 1px solid rgba(255,255,255,0.20);
}
```

- Glass only works when there is something behind it. Put soft, blurred warm-grey and off-white gradient "glow" shapes (large, low opacity, fixed or slow-moving) behind key sections so the glass has depth. A very faint red glow is allowed in one or two places only.
- Shapes: rounded squares and rounded rectangles only. Radius 12–16px. No circles, no pills, no sharp corners.
- Section headers sit inside a small glass tag, e.g. a rounded-square label "01 — Featured Work" above a large serif heading.

### Buttons
- Primary: red (`--red`) with a glass sheen (semi-transparent red at 0.85 opacity, a 1px light top border, backdrop blur), off-white text, radius 12px, padding 14px 26px. On hover: `--red-hover`, 1px lift, soft red glow shadow.
- Secondary: whitish `.glass` with off-white text and a red border on hover.
- Red is used only for buttons, active links, small labels, and thin accent lines.

### Typography
- Headings: an elegant serif. Use "Cormorant Garamond" or "Playfair Display" from Google Fonts.
- Body and UI: "Inter" or "DM Sans".
- Large headings, generous line height (1.7 for body), wide margins, lots of empty space.
- Small uppercase labels with letter-spacing 0.15em for eyebrow text.

### Motion (subtle, not flashy)
- Sections fade up 20px on scroll (IntersectionObserver), 600–800ms, ease-out, once only.
- Hover states: 200–300ms.
- Slow parallax on the intro portrait (max 15%).
- No bouncing, no spinning, no typing effects, no heavy libraries.
- Respect `prefers-reduced-motion`: turn off all motion.

---

## 4. Home page layout

### 4.1 Intro screen (first thing the visitor sees)
- Full viewport (100svh). A full-bleed black-and-white portrait of the writer.
- Dark gradient overlay from the bottom and left so the text is readable.
- A large serif quote over the image, inside a subtle glass panel or free on the image:

  > "A nation is measured not by how it treats its majority, but by what it lets happen to its few."
  > — S M Faiyaz Hossain

- A small "Scroll" indicator at the bottom (thin line that animates slowly).
- No nav buttons on this screen except a minimal logo text top-left and a menu icon top-right.
- When the user scrolls, the portrait slowly scales down and fades, and the home content rises over it. The sticky glass nav bar appears after the intro.

### 4.2 Then the wireframe sections, in order
1. **Hero statement** — name, one-line role, two buttons (Join Community = red glass; Hindus After Hasina = secondary glass).
2. **Credibility strip** — "As seen in", 5 outlet names as muted text logos in a row, in a thin glass bar.
3. **Featured work** — book cover on the left, text on the right, inside a large glass card. Build the placeholder book cover with CSS (dark red cover, serif title, author names) instead of a random photo.
4. **Highlights** — 3 glass cards: Latest Essay, Latest Press, Next Event. Each links to its page.
5. **Join the Community** — a `.glass--strong` whitish panel with three short benefits and one red button.
6. **Footer** — nav links, social icons (X, Facebook, Instagram), email, copyright.

### 4.3 Other pages
Reuse the same components. Each page starts with a short page header (glass label + large serif title + one-line intro) over a soft glow. No full-screen intro on inner pages.

---

## 5. Dummy content

Mark all dummy content with an HTML comment `<!-- PLACEHOLDER -->` so it is easy to find later.

### Global
- Site name: S M Faiyaz Hossain
- Tagline: Researcher and writer on South Asian politics and minority rights.
- Email: contact@faiyazhossain.com
- Nav: Home, About, Writings, In the Media, Speaking, Insights, Contact
- Nav button: Join Community
- Footer line: © 2026 S M Faiyaz Hossain. All rights reserved.

### Home
- Hero heading: Writing about the people history forgets to count.
- Hero sub: Faiyaz Hossain is a Sydney-based researcher and writer on South Asian politics, democracy, and the rights of minorities.
- As seen in: The Daily Ledger · South Asia Review · Pacific Current · The Policy Desk · Asia Voices Radio
- Featured work label: 01 — Featured Work
- Book title: Hindus After Hasina
- Book authors: S M Faiyaz Hossain & Anindya Banerjee
- Book text: A documented account of what changed for Bangladesh's Hindu minority after a political transition. Built on field reports, interviews, and public records, the book asks a simple question with difficult answers: who protects a minority when the state steps back?
- Book button: Visit the book site →
- Highlights label: 02 — From the Site
  - Latest Essay: "The Quiet Exodus: Counting What Official Data Leaves Out" — 12 September 2026
  - Latest Press: Interview with South Asia Review — 3 September 2026
  - Next Event: Book launch, Western Sydney — November 2026
- Community heading: Join the Community
- Community benefits: Updates on new research and writing · Direct access to Faiyaz · Thoughtful discussion with other readers
- Community button: Join Community

### About
- Title: About Faiyaz
- Intro: Researcher. Writer. Observer of the spaces between policy and people.
- Bio (3 paragraphs):
  1. S M Faiyaz Hossain is a Sydney-based researcher and writer whose work focuses on South Asian politics, democratic change, and the rights of religious and ethnic minorities.
  2. His writing combines field research with close reading of public records and media. He is interested in what happens to vulnerable communities during political transitions, and in how those stories are told, or not told, across borders.
  3. He is the co-author, with journalist Anindya Banerjee, of *Hindus After Hasina*. He writes essays, speaks at academic and community events, and contributes commentary to international media.
- Focus areas (3 glass cards): South Asian Politics · Minority Rights · Media and Memory
- Portrait: second image, smaller, rounded-square frame.

### Writings
- Title: Writings
- Intro: Books, long-form essays, and research.
- Book card: Hindus After Hasina (2026), co-authored with Anindya Banerjee. Button: Visit the book site.
- Essays list (title — publication — year):
  - The Quiet Exodus: Counting What Official Data Leaves Out — South Asia Review — 2026
  - After the Transition: Five Questions for Bangladesh's Minorities — The Policy Desk — 2026
  - Borders of Belonging: Diaspora and the Politics of Memory — Pacific Current — 2025
  - When Headlines Fade: Reporting on Communal Violence — The Daily Ledger — 2025

### In the Media
- Title: In the Media
- Intro: Interviews, features, and commentary.
- Items (outlet — type — title — date):
  - South Asia Review — Interview — "Why minority rights are a test of democracy" — Sep 2026
  - Asia Voices Radio — Podcast — "Behind the book: Hindus After Hasina" — Aug 2026
  - The Daily Ledger — Op-ed — "Silence is also a policy" — Jul 2026
  - Pacific Current — Feature — "The diaspora is listening" — Jun 2026
- Media kit block: Press kit, bio, and high-resolution photos available on request. Button: Request Media Kit.

### Speaking
- Title: Speaking
- Intro: Talks, panels, and guest appearances.
- Upcoming:
  - Book Launch — Western Sydney University — November 2026
  - Panel: Minorities in Transition — Online — December 2026
- Past:
  - Guest lecture: Democracy and Its Margins — Sydney — 2026
  - Community forum: Diaspora Voices — Melbourne — 2025
- Topics he speaks on: Minority rights in South Asia · Political transitions and their human cost · Diaspora, media, and memory
- Button: Invite Faiyaz to Speak

### Insights
- Title: Insights
- Intro: Short notes, analysis, and reflections.
- Posts (title — date — 1-line excerpt):
  - The Numbers We Do Not Have — 20 Sep 2026 — Why missing data is itself a finding.
  - Reading the News From Two Countries — 8 Sep 2026 — The same event, told in two very different ways.
  - A Note on Sources — 25 Aug 2026 — How this research separates reports from rumours.
  - Why I Wrote This Book — 10 Aug 2026 — The question that would not leave me alone.
- Filter tags (glass chips, rounded squares): All · Politics · Minority Rights · Media · Research Notes

### Contact
- Title: Contact
- Intro: For media, speaking, and research enquiries.
- Form fields: Name, Email, Enquiry type (Media / Speaking / Research / Other), Message. Button: Send Message. (Front-end only for now. Show a success message on submit.)
- Side glass card: contact@faiyazhossain.com · Based in Sydney, Australia · Social links

---

## 6. Placeholder images

- Every image is in `assets/img/` with these exact names. If a file is missing, show a neutral dark rounded-square placeholder with the file name in small text (do not break the layout).

| File | Page / section | Size |
|---|---|---|
| `portrait-hero.jpg` | Home intro, full screen | 1920×1080 (landscape) |
| `portrait-hero-mobile.jpg` | Home intro on phones | 1080×1920 (portrait) |
| `portrait-about.jpg` | About | 1200×1600 |
| `portrait-casual.jpg` | Contact side card | 1000×1000 |
| `speaking.jpg` | Speaking page header (optional, free stock photo) | 1600×900 |
| `og-image.jpg` | Social share preview (crop of portrait-hero) | 1200×630 |

- Essay, Insights, Media, and Highlights cards are **text-only** glass cards. No images. Use typography, a small glass label (type + date), and a thin red line to make them look good. This keeps the site minimal and literary.
- The book cover is built with CSS until the real cover arrives.
- Outlet names in the credibility strip are text, not logos.
- Do not use a background texture image. Use CSS gradient glows and the CSS/SVG film grain.
- All photos: grayscale with a slight warm tint via CSS, so they fit the palette.

---

## 7. Build order (stop and wait for review after each step)

1. Design system (`style.css` tokens, glass, buttons, type, nav, footer) + Home page with the intro screen. **Stop.**
2. After approval: the other 6 pages using the same components. **Stop.**
3. Final pass: responsiveness, accessibility, reduced motion, meta tags, favicon.

Do not add features, sections, or pages that are not in this brief.
