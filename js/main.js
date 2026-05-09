// main.js — nav scroll state, mobile toggle, smooth scroll, active link tracking

(function () {
  'use strict';

  const SCROLL_THRESHOLD = 50;

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.getElementById('nav-menu');
  const links  = Array.from(document.querySelectorAll('.nav__link'));

  /* ---------- Scrolled state on header ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      header?.classList.toggle('is-scrolled', scrolled);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  function setMenuOpen(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  // Close menu when a link is clicked (mobile)
  links.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  // Close when clicking outside the nav
  document.addEventListener('click', (e) => {
    if (!menu?.classList.contains('is-open')) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (menu.contains(target) || toggle?.contains(target)) return;
    setMenuOpen(false);
  });

  // Reset menu state on resize past breakpoint
  const mq = window.matchMedia('(min-width: 769px)');
  const handleMq = (e) => { if (e.matches) setMenuOpen(false); };
  mq.addEventListener?.('change', handleMq);

  /* ---------- Smooth scroll for in-page anchors ----------
     CSS already provides smooth scrolling; this guards prefers-reduced-motion
     and ensures focus moves to the target for keyboard users. */
  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(href);
      history.pushState(null, '', href);
    });
  });

  /* ---------- Active section highlighting ---------- */
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href') || ''))
    .filter((el) => el instanceof Element);

  const linkBySectionId = new Map();
  links.forEach((link) => {
    const id = (link.getAttribute('href') || '').replace('#', '');
    if (id) linkBySectionId.set(id, link);
  });

  function setActive(id) {
    links.forEach((l) => l.classList.remove('is-active'));
    const active = linkBySectionId.get(id);
    active?.classList.add('is-active');
  }

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        // Account for sticky nav: trigger when section crosses ~35% from top
        rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
