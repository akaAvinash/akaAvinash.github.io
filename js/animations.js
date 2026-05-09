// animations.js — central scroll-animation controller
//
// Powers four behaviors via a single IntersectionObserver:
//
//   [data-animate="fade-up" | "fade-in" | "slide-left"]
//     Adds `.is-visible` once the element crosses the threshold.
//     Initial hidden states + keyframes live in css/animations.css.
//
//   [data-stagger]
//     Direct children get an incrementing `animation-delay` so they
//     reveal in sequence (0ms, 100ms, 200ms, ...).
//
//   [data-count]
//     Numeric count-up from 0 to the data-count value. Optional
//     [data-count-suffix] is appended to every frame ("+", "%", etc.).
//
//   .skill-bar
//     Sets `--progress` from data-progress and counts the % up.
//
// All triggers are one-shot — elements are unobserved after activation.

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STAGGER_STEP_MS = 100;
  const IO_THRESHOLD    = 0.15;
  const IO_ROOT_MARGIN  = '0px 0px -8% 0px';

  /* ---------- Numeric count-up ---------- */
  function animateCount(el, target, duration, suffix) {
    suffix = suffix || '';
    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * ease(t)) + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Skill bar activation ---------- */
  function activateSkillBar(bar) {
    const value = parseInt(bar.dataset.progress || '0', 10);
    bar.style.setProperty('--progress', value + '%');

    const valueEl = bar.querySelector('.skill-bar__value');
    if (valueEl) animateCount(valueEl, value, 1200, '%');

    bar.classList.add('is-visible');
  }

  /* ---------- Numeric counter activation ---------- */
  function activateCounter(el) {
    const target = parseInt(el.dataset.count || '0', 10);
    const suffix = el.dataset.countSuffix || '';
    animateCount(el, target, 1100, suffix);
  }

  /* ---------- Stagger: pre-set animation-delay on direct children ---------- */
  function applyStagger() {
    document.querySelectorAll('[data-stagger]').forEach((parent) => {
      const children = Array.from(parent.children);
      children.forEach((child, i) => {
        child.style.animationDelay = (i * STAGGER_STEP_MS) + 'ms';
      });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    applyStagger();

    const animateEls = document.querySelectorAll('[data-animate]');
    const counterEls = document.querySelectorAll('[data-count]');
    const skillBars  = document.querySelectorAll('.skill-bar');

    // No IO support OR reduced motion: activate everything immediately.
    if (!('IntersectionObserver' in window) || reduceMotion) {
      animateEls.forEach((el) => el.classList.add('is-visible'));
      counterEls.forEach((el) => activateCounter(el));
      skillBars.forEach((b)  => activateSkillBar(b));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;

          if (el.classList.contains('skill-bar')) {
            activateSkillBar(el);
          } else if (el.hasAttribute('data-count')) {
            activateCounter(el);
          } else {
            el.classList.add('is-visible');
          }
          observer.unobserve(el);
        }
      },
      { threshold: IO_THRESHOLD, rootMargin: IO_ROOT_MARGIN }
    );

    animateEls.forEach((el) => io.observe(el));
    counterEls.forEach((el) => io.observe(el));
    skillBars.forEach((b)  => io.observe(b));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
