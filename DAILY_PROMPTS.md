# 📋 DAILY_PROMPTS.md — Portfolio Build Plan (2 Days)
### Avinash Kumar K S | SDET Portfolio | github.com/akaAvinash

> **For Claude:** Before starting each task, re-read `PROJECT_GOAL.md` to stay aligned.
> After completing a task, mark it ✅ in `PROJECT_GOAL.md` and write the exact commit message listed here.

---

## 🗓️ DAY 1 — Foundation & Hero (8 tasks, ~3.5–4 hrs)

---

### ✦ D1-T1 | Init: Repo structure + README + base HTML shell
**Time estimate:** 20 min
**What to build:**
- Create the full folder structure (`css/`, `js/`, `assets/`)
- `index.html` — semantic HTML5 skeleton with all section `<section>` placeholders (`#hero`, `#about`, `#skills`, `#experience`, `#projects`, `#contact`)
- `README.md` with project title, live URL placeholder, tech stack badges
- `.gitignore` (optional: DS_Store, thumbs)

**Claude prompt:**
```
Read PROJECT_GOAL.md. Create the full folder structure and index.html skeleton for the portfolio.
Include all section placeholders with IDs, semantic HTML5, proper <head> with meta tags,
CDN links for JetBrains Mono font (Google Fonts), Sora font, Lucide icons, and GSAP.
Also create README.md with badges. Use the file structure defined in PROJECT_GOAL.md exactly.
```

**Commit message:**
```
init: scaffold project structure with HTML skeleton and README
```

---

### ✦ D1-T2 | CSS: Design system — variables, reset, typography
**Time estimate:** 25 min
**What to build:**
- `css/base.css` — full CSS custom properties (colors, fonts, spacing, border-radius, transitions)
- CSS reset (box-sizing, margin, scroll-behavior)
- Base typography — headings, body, code elements
- Utility classes: `.container`, `.section-title`, `.badge`, `.glass-card`

**Claude prompt:**
```
Read PROJECT_GOAL.md. Create css/base.css with the complete design system:
CSS variables for all colors, fonts, spacing. Full CSS reset. Typography scale for h1-h6 and body.
Utility classes: .container (max-width 1100px, centered), .section-title (with cyan underline accent),
.badge (code-style tag), .glass-card (glassmorphism: backdrop-filter blur 12px, border rgba cyan).
Use the exact color tokens defined in PROJECT_GOAL.md.
```

**Commit message:**
```
style: add design tokens, CSS reset, and base typography system
```

---

### ✦ D1-T3 | Component: Sticky navigation bar
**Time estimate:** 30 min
**What to build:**
- `css/components.css` → nav styles
- `js/main.js` → scroll-aware nav (adds `.scrolled` class after 50px for blur + border)
- Logo: `<AK/>` in monospace, colored
- Links: smooth scroll to sections
- Mobile: hamburger menu toggle (no library, pure JS)
- Active link highlight on scroll position

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the sticky navigation component.
HTML in index.html (inside <header>), styles in css/components.css, JS in js/main.js.
Nav should: be fixed top, start transparent, gain backdrop-filter blur + subtle bottom border
after scrolling 50px. Logo is styled <AK/> in JetBrains Mono with accent-cyan color.
Links scroll smoothly to sections. Include a hamburger for mobile that toggles a dropdown menu.
Highlight the active section link as user scrolls.
```

**Commit message:**
```
feat: add sticky navbar with scroll behavior and mobile hamburger menu
```

---

### ✦ D1-T4 | Section: Hero — layout + typewriter effect
**Time estimate:** 40 min
**What to build:**
- Full-viewport hero section layout
- Left: greeting (`Hi, I'm`), name in large bold type, typewriter subtitle cycling through roles
- Right or below: 2 CTA buttons (`View Projects`, `Download Resume`)
- Social links row: GitHub, LinkedIn icons
- `js/typewriter.js` — custom typewriter class, no library
- Status indicator: green dot + "Open to opportunities"

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the Hero section in index.html + css/layout.css + js/typewriter.js.
Layout: full viewport height, flexbox centered. Left column: "Hi, I'm" in muted text,
"Avinash Kumar K S" in large bold (Sora font), typewriter subtitle that cycles through the roles
listed in PROJECT_GOAL.md (use custom JS class in typewriter.js, cursor blink effect).
Below name: "Open to opportunities" status pill (green pulsing dot + text).
Two CTA buttons: primary "View Projects" (cyan fill), secondary "Download Resume" (outline).
Row of social icon links: GitHub, LinkedIn. No right panel — center-align everything.
```

**Commit message:**
```
feat: hero section with animated typewriter role cycling and CTA buttons
```

---

### ✦ D1-T5 | Effect: Background particle / dot-grid canvas
**Time estimate:** 35 min
**What to build:**
- `js/particles.js` — canvas-based animated background
- Option A (simpler, recommended): CSS dot-grid pattern + subtle radial gradient blobs that slowly animate
- Option B: canvas with 60 particles connected by lines if near each other
- Must be behind all content (z-index), non-interactive, performant

**Claude prompt:**
```
Read PROJECT_GOAL.md. Create an animated background effect for the hero section.
Use a CSS approach first: radial-gradient dot pattern overlay on the dark background,
plus two large blurred color blobs (cyan and blue, 40% opacity, very blurred) that slowly
drift using CSS keyframes. Additionally create js/particles.js that draws a canvas behind
the hero with 50 small dots connected by lines when close — classic particle network.
Keep it subtle and performant. Canvas should resize on window resize.
```

**Commit message:**
```
feat: animated dot-grid background with particle canvas effect
```

---

### ✦ D1-T6 | Section: About — bio + layout
**Time estimate:** 25 min
**What to build:**
- Two-column layout: left text, right a terminal-style card with key stats
- Bio copy from `PROJECT_GOAL.md`
- Terminal card: mock terminal window with `$ whoami`, `$ cat skills.txt` style content
- Stats strip: "5+ Years", "Amazon", "10-member team", "2 AI tools shipped"

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the About section. Two columns:
Left: section label "about_me.txt" in monospace, bio paragraph (use the About Blurb from PROJECT_GOAL.md),
and a row of 4 stat cards (5+ Years Experience | Amazon Dev Center | Led 10-Member Team | 2 AI Tools Shipped).
Right: a fake terminal window card (dark bg, green/cyan text, title bar with 3 dots) showing:
  $ whoami → Avinash Kumar K S
  $ cat role.txt → SDET | QA Lead | AI Test Architect
  $ echo $location → Chennai, India
Style it in css/components.css. Make the terminal card a glassmorphism card.
```

**Commit message:**
```
feat: about section with bio, stats, and terminal card component
```

---

### ✦ D1-T7 | Section: Skills — badge grid + animated bars
**Time estimate:** 35 min
**What to build:**
- `#skills` section with two sub-groups: "Automation & Testing" and "Languages & Tools"
- Badge grid for tools: each badge like a code tag with icon + label
- Animated progress bars for core skills (Python 90%, Playwright 85%, Selenium 90%, Pytest 88%, API Testing 85%, Appium 75%)
- Bars animate in on scroll (width transitions from 0 to % when visible)

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the Skills section with two parts:
1. Badge grid: icon + label badges (code-tag style) for: Python, Pytest, Playwright, Selenium,
   Appium, REST API, Postman, Git, GitHub Actions, AWS, Jira, Linux, AI/Claude API, Allure Reports.
   Use Devicons CDN (https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/) for logos where available.
2. Animated skill bars: horizontal bars for Python(90%), Playwright(85%), Selenium(90%),
   Pytest(88%), REST API Testing(85%), Appium(75%). Bars should start at 0 width and animate
   to their value when scrolled into view using IntersectionObserver (add the observer in js/animations.js).
Style glassmorphism card containers for each group.
```

**Commit message:**
```
feat: skills section with icon badge grid and scroll-animated progress bars
```

---

### ✦ D1-T8 | Fix: Mobile responsiveness pass + hero polish
**Time estimate:** 20 min
**What to build:**
- `css/responsive.css` — breakpoints at 768px and 480px
- Fix nav, hero, about, skills for mobile
- Hero: ensure typewriter doesn't overflow on small screens
- Adjust font sizes, padding, grid → single column on mobile

**Claude prompt:**
```
Read PROJECT_GOAL.md. Create css/responsive.css with mobile-first breakpoints.
At 768px: collapse hero to single column, stack about columns, make skills badges wrap naturally,
nav hamburger visible. At 480px: reduce heading sizes, tighten padding.
Also do a hero polish pass: add a subtle cyan text-shadow glow to the name heading,
ensure the CTA buttons have hover states with a lift transform + glow.
```

**Commit message:**
```
fix: mobile responsive layout and hero polish pass
```

---

## 🗓️ DAY 2 — Projects, Animations, Deploy (8 tasks, ~3.5–4 hrs)

---

### ✦ D2-T1 | Section: Experience timeline
**Time estimate:** 35 min
**What to build:**
- Vertical timeline component — single entry (Amazon, Aug 2020–Present)
- Timeline line + animated dot connector
- Company logo placeholder + role, date, location
- 4–5 impact bullet points (from PROJECT_GOAL.md key metrics)
- Sub-roles or phases: QA Engineer → QA Lead (optional expand)

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the Experience section as a vertical timeline.
Single main entry: Amazon Development Center, Chennai | Aug 2020 – Present | QA Engineer / SDET.
Timeline: left vertical line with a glowing cyan dot at the entry point.
Content card (glassmorphism): role title, company, date range, location tag.
Bullet points:
  • Led 10-member QA team across high-scale service validation
  • Built AI-powered test report analyzer (NLP defect pattern detection) — Ace of Innovation award
  • Developed AI-assisted image validation system — Quarterback Champion award
  • Architected self-healing Playwright framework with Claude API integration
  • Drove automation coverage for Echo device testing at 100-device fleet scale
Style the timeline in css/components.css. Add a subtle pulse animation to the active dot.
```

**Commit message:**
```
feat: experience timeline with Amazon entry and impact bullets
```

---

### ✦ D2-T2 | Section: Projects — glassmorphism cards
**Time estimate:** 40 min
**What to build:**
- 4 project cards in a CSS Grid (2×2 on desktop, 1 col on mobile)
- Each card: project name, tech stack tags, description, GitHub link button
- Hover: card lifts, border glows cyan, subtle inner highlight
- Featured badge on top 2 projects

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the Projects section with 4 glassmorphism cards in a 2-column grid.
Use the 4 projects defined in PROJECT_GOAL.md (Projects to showcase section).
Each card structure:
  - "FEATURED" badge (top-left, for card 1 and 2 only) in cyan
  - Project title (JetBrains Mono)
  - 1-line description
  - Tech stack: inline code badges (e.g. Python, Playwright, Claude API)
  - GitHub link button with arrow icon
Card hover state: translateY(-6px), box-shadow cyan glow, border opacity increase.
Cards animate in with staggered fade-up on scroll.
GitHub links for card 1: https://github.com/akaAvinash (placeholder until real repos exist).
```

**Commit message:**
```
feat: projects grid with glassmorphism cards and hover interactions
```

---

### ✦ D2-T3 | JS: Scroll animations — Intersection Observer
**Time estimate:** 30 min
**What to build:**
- `js/animations.js` — unified scroll animation controller
- Classes: `.fade-up`, `.fade-in`, `.slide-left`, `.slide-right` added via `data-animate` attributes
- Staggered children: `data-stagger` on parent, applies delay to each child
- Skill bars: trigger on scroll
- Section titles: fade-up on enter

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build js/animations.js as the central scroll animation controller.
Use IntersectionObserver with threshold 0.15.
Support: [data-animate="fade-up"], [data-animate="fade-in"], [data-animate="slide-left"].
On elements with [data-stagger], apply increasing animation-delay (0ms, 100ms, 200ms...) to direct children.
In css/animations.css, define the keyframes and initial hidden states for each animation type.
Add data-animate attributes to all section titles, cards, timeline entries, badge grids, stat numbers.
Also animate the stat numbers in the About section counting up from 0 to their value on scroll (vanilla JS).
```

**Commit message:**
```
feat: scroll-triggered animations with IntersectionObserver and stagger support
```

---

### ✦ D2-T4 | Section: Contact + Footer
**Time estimate:** 25 min
**What to build:**
- Contact section: centered, minimal — headline + 3 link buttons (Email, LinkedIn, GitHub)
- Availability status pill (reuse from hero)
- Footer: minimal one-liner with name + "Built with ☕ and Python" + year

**Claude prompt:**
```
Read PROJECT_GOAL.md. Build the Contact section and Footer.
Contact: centered layout, headline "Let's Build Something Reliable", subtext about open to roles
(India / UAE), 3 icon+label buttons: Email (mailto:), LinkedIn (linkedin.com/in/avinashkumarks),
GitHub (github.com/akaAvinash). Buttons styled like the hero CTAs. Availability pill: "Open to Opportunities".
Footer: single row — left: "Avinash Kumar K S", center: "Built with ☕ and Python",
right: "© 2025". All in muted text, thin top border, bg slightly lighter than page bg.
```

**Commit message:**
```
feat: contact section with links and minimal footer
```

---

### ✦ D2-T5 | Performance: Font loading, lazy load, Lighthouse pass
**Time estimate:** 25 min
**What to build:**
- Add `font-display: swap` to font imports
- Add `loading="lazy"` to any images
- Defer non-critical JS with `defer` attribute
- Add `will-change: transform` to animated elements
- Check for any layout shift (CLS) issues
- Target Lighthouse Performance 90+

**Claude prompt:**
```
Read PROJECT_GOAL.md. Do a performance pass on index.html and all CSS/JS files.
Checklist to fix:
  1. Add rel="preconnect" for Google Fonts CDN in <head>
  2. All <script> tags must have defer attribute
  3. Add font-display:swap to @font-face or Google Fonts URL param
  4. Add will-change:transform to .glass-card and animated elements
  5. Ensure canvas in particles.js uses requestAnimationFrame correctly
  6. Add <meta> Open Graph tags: og:title, og:description, og:image placeholder
  7. Add a simple favicon.svg (stylized AK monogram in cyan)
Output updated index.html and any changed files.
```

**Commit message:**
```
perf: font preconnect, script defer, will-change, OG meta tags, favicon
```

---

### ✦ D2-T6 | Deploy: GitHub Pages config + README polish
**Time estimate:** 20 min
**What to build:**
- Update `README.md`: add live site badge, screenshots placeholder section, setup instructions
- Create `CNAME` file (empty, for future custom domain)
- Verify all file paths are relative (not absolute) for GitHub Pages compatibility
- Add `.nojekyll` file to bypass GitHub's Jekyll processing

**Claude prompt:**
```
Read PROJECT_GOAL.md. Prepare the project for GitHub Pages deployment.
1. Update README.md: Add shields.io badge for "Live Site" (placeholder URL https://akaAvinash.github.io/portfolio),
   tech stack badges (HTML5, CSS3, JavaScript, GSAP), a "Getting Started" section (just clone and open index.html),
   and a "Screenshots" section with placeholder text.
2. Create .nojekyll file (empty) at root to prevent Jekyll interference.
3. Create CNAME file (empty, placeholder for custom domain later).
4. Review index.html: ensure ALL asset src and href paths are relative (./css/, ./js/, ./assets/).
5. Output the deployment steps as a comment block at the bottom of README.md.
```

**Commit message:**
```
deploy: add .nojekyll, CNAME stub, update README with live badge and deploy steps
```

---

### ✦ D2-T7 | QA: Cross-browser + mobile + accessibility check
**Time estimate:** 25 min
**What to build:**
- Manually review checklist items
- Fix any issues found
- Add `aria-label` to icon-only buttons/links
- Ensure color contrast is WCAG AA (4.5:1)
- Test hamburger menu on mobile viewport
- Verify smooth scroll works, no jank

**Claude prompt:**
```
Read PROJECT_GOAL.md. Do a full accessibility and cross-browser QA pass on the portfolio.
Fix these specific items:
  1. Add aria-label to all icon-only links (GitHub icon, LinkedIn icon, hamburger button)
  2. Add role="navigation" to <nav> and aria-expanded to hamburger button
  3. Check all text on glass-card backgrounds has sufficient contrast — adjust text color to #e8eaf6 if needed
  4. Add :focus-visible styles for keyboard navigation on all interactive elements
  5. Ensure all section IDs match nav href anchors exactly
  6. Add a <noscript> fallback message for JS-dependent animations
  7. Verify the typewriter cursor blink animation respects prefers-reduced-motion media query
Output the corrected index.html and css/base.css.
```

**Commit message:**
```
fix: accessibility pass — aria labels, focus styles, reduced-motion support
```

---

### ✦ D2-T8 | Polish: Final visual refinements + micro-interactions
**Time estimate:** 20 min
**What to build:**
- Custom cursor: small cyan dot that follows mouse (JS + CSS)
- Skill badge hover: subtle glow pulse
- Nav links: underline slide-in on hover (CSS only)
- Section transitions: ensure no abrupt jumps
- Scroll-to-top button (appears after 300px scroll)

**Claude prompt:**
```
Read PROJECT_GOAL.md. Add final polish micro-interactions.
1. Custom cursor: JS-driven small (8px) cyan circle that follows mouse with slight lag (lerp).
   Hide default cursor on desktop (cursor:none on body). Keep default on mobile.
2. Scroll-to-top button: fixed bottom-right, appears after 300px scroll, smooth scroll to top on click.
   Style: 40px circle, cyan border, arrow-up icon, fade in/out.
3. Nav link hover: CSS underline that slides in from left (width 0 → 100% on hover, 2px cyan line).
4. Tech badge hover: translateY(-2px) + box-shadow cyan glow.
5. Ensure the overall page scroll is smooth (scroll-behavior: smooth on html element).
This is the final task — output a clean, complete version of the changed files.
```

**Commit message:**
```
polish: custom cursor, scroll-to-top, nav hover underline, badge micro-interactions
```

---

## 🔁 How to Use This File

1. **Start a session** → Tell Claude: *"Read PROJECT_GOAL.md and DAILY_PROMPTS.md. Let's do D1-T3."*
2. **Claude builds** the task using the prompt in that task's block
3. **You copy the commit message** and commit with it in your local repo
4. **Claude marks the task done** in `PROJECT_GOAL.md`'s Progress Tracker

---

## 📅 Realistic Commit Timeline

To make the history look human, spread commits across these time windows:

**Day 1 (morning → evening):**
```
09:12  init: scaffold project structure with HTML skeleton and README
10:08  style: add design tokens, CSS reset, and base typography system
11:35  feat: add sticky navbar with scroll behavior and mobile hamburger menu
13:22  feat: hero section with animated typewriter role cycling and CTA buttons
14:47  feat: animated dot-grid background with particle canvas effect
16:10  feat: about section with bio, stats, and terminal card component
17:45  feat: skills section with icon badge grid and scroll-animated progress bars
19:30  fix: mobile responsive layout and hero polish pass
```

**Day 2 (morning → evening):**
```
09:05  feat: experience timeline with Amazon entry and impact bullets
10:40  feat: projects grid with glassmorphism cards and hover interactions
12:15  feat: scroll-triggered animations with IntersectionObserver and stagger support
14:00  feat: contact section with links and minimal footer
15:20  perf: font preconnect, script defer, will-change, OG meta tags, favicon
16:35  deploy: add .nojekyll, CNAME stub, update README with live badge and deploy steps
17:50  fix: accessibility pass — aria labels, focus styles, reduced-motion support
19:10  polish: custom cursor, scroll-to-top, nav hover underline, badge micro-interactions
```

> **Tip:** Use `git commit --date="2025-05-09T09:12:00"` to set the exact timestamp if needed.

---

## 🔖 Reference Links

- GSAP CDN: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- Devicons: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/`
- JetBrains Mono: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap`
- Sora: `https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&display=swap`
- Lucide Icons: `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- GitHub Pages docs: `https://docs.github.com/en/pages`

---

*This file was generated for Avinash Kumar K S | Portfolio build: May 2025*
