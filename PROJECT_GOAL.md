# 🎯 PROJECT_GOAL.md — Avinash Kumar K S | Portfolio Website

> **Claude: Read this file at the START of every session before doing anything.**
> Update the `## ✅ Progress Tracker` section after every completed task.

---

## 👤 Owner

- **Name:** Avinash Kumar K S
- **Role:** QA Engineer / SDET | 5+ years @ Amazon Development Center, Chennai
- **GitHub:** [github.com/akaAvinash](https://github.com/akaAvinash)
- **LinkedIn:** [linkedin.com/in/avinashkumarks](https://linkedin.com/in/avinashkumarks)
- **Target Roles:** Senior SDET / QA Automation Engineer (India / UAE)
- **Tech Stack:** Python, Pytest, Playwright, Selenium, Appium, REST API, AI-powered QA tooling

---

## 🎯 Project Goal

Build a **modern, techy, animated portfolio website** hosted for free (GitHub Pages) that:

1. Positions Avinash as a **Senior SDET / AI-enabled QA Engineer**
2. Looks **visually elite** — dark theme, glassmorphism cards, terminal/code aesthetics, smooth scroll animations
3. Highlights **Amazon impact** — AI test report analyzer, image validation system, 10-member team lead
4. Showcases **GitHub projects** — self-healing test framework, tech trends PDF agent, career-ops automation
5. Has a **realistic commit history** — spread across 2 days, human-paced, granular commits

---

## 🏗️ Tech Stack for the Website

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Vanilla HTML + CSS + JS (no build tool) | Zero config, GitHub Pages ready |
| Animations | GSAP (CDN) + CSS transitions | Smooth, performant |
| Icons | Lucide Icons / Devicons (CDN) | Techy, clean |
| Fonts | JetBrains Mono (code) + Sora or Outfit (body) | Developer aesthetic |
| Hosting | GitHub Pages (`gh-pages` branch) | Free, custom domain ready |
| Theme | Dark base (#0a0a0f) + cyan/electric blue accents (#00d4ff) | Hacker/terminal vibe |

---

## 📐 Site Structure / Sections

```
/ index.html
├── [NAV]          Sticky, blur-backdrop, logo + links
├── [HERO]         Animated typewriter role titles, particle/grid background, CTA buttons
├── [ABOUT]        Short bio, Amazon tenure, philosophy
├── [SKILLS]       Animated skill bars / badge grid — Python, Playwright, Selenium, Pytest, AI/ML tooling
├── [EXPERIENCE]   Timeline — Amazon (2020–present), key impact bullets
├── [PROJECTS]     Glassmorphism cards — self-healing framework, AI test analyzer, career-ops bot
├── [CERTIFICATIONS] Badges section
├── [CONTACT]      Links, email, LinkedIn, GitHub
└── [FOOTER]       Minimal
```

---

## 🎨 Design System

```css
/* Colors */
--bg-primary:    #0a0a0f;
--bg-secondary:  #0f0f1a;
--glass-bg:      rgba(255, 255, 255, 0.04);
--glass-border:  rgba(0, 212, 255, 0.15);
--accent-cyan:   #00d4ff;
--accent-blue:   #4f8ef7;
--text-primary:  #e8eaf6;
--text-muted:    #6b7280;

/* Fonts */
--font-mono:     'JetBrains Mono', monospace;
--font-body:     'Sora', sans-serif;
```

**Key visual elements:**
- Terminal-style hero with typewriter text cycling through roles
- Glassmorphism cards with `backdrop-filter: blur(12px)` + cyan glow border on hover
- Grid/dot pattern background overlay (CSS `radial-gradient`)
- Scroll-triggered fade-in animations (Intersection Observer)
- Skill badges styled like `<code>` tags
- Experience as a vertical timeline with animated connector lines
- Cursor glow effect (subtle)

---

## 📁 File Structure

```
portfolio/
├── index.html
├── css/
│   ├── base.css          # reset, variables, typography
│   ├── layout.css        # grid, sections, spacing
│   ├── components.css    # cards, badges, timeline, nav
│   ├── animations.css    # keyframes, scroll triggers
│   └── responsive.css    # breakpoints, mobile
├── js/
│   ├── main.js           # init, nav scroll behavior
│   ├── typewriter.js     # hero typewriter effect
│   ├── animations.js     # Intersection Observer, GSAP init
│   └── particles.js      # background particle/grid effect
├── assets/
│   ├── favicon.svg
│   └── og-image.png      # optional social preview
└── README.md
```

---

## 🚀 Hosting Plan

1. Create GitHub repo: `avinashkumarks.github.io` (or `portfolio`)
2. Push all files to `main` branch
3. Enable GitHub Pages → Source: `main` / `root`
4. Live at: `https://akaAvinash.github.io/portfolio`
5. Optional later: custom domain via Namecheap/Cloudflare (free SSL)

---

## ✅ Progress Tracker

> Claude updates this section after each completed task. Format: `[DATE] ✅ Task description`

### Day 1
- [ ] D1-T1: Init repo structure, README, base HTML skeleton
- [ ] D1-T2: Design system — CSS variables, typography, base reset
- [ ] D1-T3: Navigation component — sticky blur navbar
- [ ] D1-T4: Hero section — layout + typewriter JS
- [ ] D1-T5: Background effect — dot grid / particle canvas
- [ ] D1-T6: About section — bio copy + layout
- [ ] D1-T7: Skills section — badge grid + animated bars
- [ ] D1-T8: Fix: mobile nav + hero responsive pass

### Day 2
- [ ] D2-T1: Experience timeline component
- [ ] D2-T2: Projects section — glassmorphism cards
- [ ] D2-T3: Scroll animations — Intersection Observer setup
- [ ] D2-T4: Contact section + footer
- [ ] D2-T5: Performance pass — image opt, font loading, Lighthouse
- [ ] D2-T6: GitHub Pages deploy config + README polish
- [ ] D2-T7: Final QA — cross-browser, mobile, accessibility
- [ ] D2-T8: Meta tags, OG image, favicon

---

## 📌 Content Blocks (Pre-written for Claude to use)

### Hero Typewriter Roles (cycle through):
```
QA Engineer @ Amazon
SDET | 5+ Years
Python Automation Engineer
AI-Powered Test Architect
Playwright | Selenium | Pytest
```

### About Blurb:
```
I build test systems that don't just catch bugs — they think.
5+ years at Amazon Development Center, Chennai, leading QA for high-scale services.
I've shipped AI-powered test analyzers, self-healing automation frameworks,
and tools that make quality engineering measurably smarter.
```

### Projects to showcase:
1. **Self-Healing Test Framework** — Python + Playwright + Claude API | Auto-repairs broken selectors using AI
2. **AI Test Report Analyzer** — Internal Amazon tool | NLP-powered defect pattern detection (Ace of Innovation award)
3. **Career Ops Bot** — Python + CrewAI + Telegram | Automated job hunting agent with multi-portal scraping
4. **Tech Trends PDF Agent** — GitHub Actions + Telegram | Weekly AI-curated tech digest

### Key Amazon Metrics:
- Led 10-member QA team
- Built AI image validation system (Quarterback Champion award)
- 5+ years, Amazon Development Center Chennai (Aug 2020 – present)

---

## ⚠️ Constraints

- **No React, no build tools** — keep it plain HTML/CSS/JS so GitHub Pages works instantly
- **No paid assets** — only free CDN fonts, icons, libraries
- **Commit messages must sound human** — see `DAILY_PROMPTS.md` for realistic commit log
- **Mobile-first** — must look good on phone (recruiter might check on mobile)
- **Performance** — target Lighthouse score 90+ (no heavy unoptimized assets)

---

*Last updated by Claude: [SESSION DATE] after completing [TASK]*
