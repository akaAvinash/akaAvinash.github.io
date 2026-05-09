# portfolio

My personal corner of the internet. Built it because a CV only tells so much — this shows the actual work.

[![Live Site](https://img.shields.io/badge/Live%20Site-akaAvinash.github.io-00d4ff?style=flat)](https://akaAvinash.github.io/portfolio)
[![Last Commit](https://img.shields.io/github/last-commit/akaAvinash/portfolio?color=00d4ff)](https://github.com/akaAvinash/portfolio/commits)

---

## what's this

Portfolio site for me — Avinash, Chennai. I mostly work with Python, Playwright, Pytest, and recently a lot of Claude API for AI-assisted QA tooling. Wanted the site to reflect that stack visually — dark, terminal-y, a bit techy. No frameworks, no build tools, just HTML/CSS/JS so it deploys straight to GitHub Pages without drama.

Took about 2 days of actual work. Animations are GSAP + Intersection Observer, fonts are JetBrains Mono (for the code aesthetic) paired with Sora, and the glassmorphism cards are pure CSS `backdrop-filter`.

---

## stack

- plain HTML, CSS, JS — intentionally no React/Vite/webpack
- GSAP for scroll animations
- Lucide for icons
- Google Fonts (JetBrains Mono + Sora)
- GitHub Pages for hosting (free)

---

## running locally

```bash
git clone https://github.com/akaAvinash/portfolio.git
cd portfolio
```

No install step. Just open `index.html` in a browser. If you want live reload:

```bash
npx serve .
# or if you have Python
python -m http.server 8000
```

---

## structure

```
portfolio/
├── index.html
├── css/
│   ├── base.css          # variables, reset, type scale
│   ├── layout.css        # sections, spacing, grid
│   ├── components.css    # nav, cards, timeline, badges
│   ├── animations.css    # keyframes
│   └── responsive.css    # mobile breakpoints
├── js/
│   ├── main.js           # nav scroll + init
│   ├── typewriter.js     # hero role cycling
│   ├── animations.js     # IntersectionObserver setup
│   └── particles.js      # background canvas
└── assets/
    └── favicon.svg
```

---

## deploying

Push to `main`, go to repo Settings → Pages, set source to `main / root`. That's it. Builds in ~30 seconds, live at `https://akaAvinash.github.io/portfolio`.

---

## contact

- [linkedin.com/in/avinashkumarks](https://linkedin.com/in/avinashkumarks)
- [github.com/akaAvinash](https://github.com/akaAvinash)