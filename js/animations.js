// animations.js — IntersectionObserver-driven scroll reveals + skill bar fills
//
// Watches:
//   - `.fade-in`     → adds `.is-visible` (CSS transition handles the rest)
//   - `.skill-bar`   → sets `--progress` from data-progress, counts the % up,
//                       adds `.is-visible`
//
// Each element is unobserved after first activation (one-shot reveal).

(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Percentage counter ---------- */
  function animateCount(el, target, duration) {
    if (reduceMotion) {
      el.textContent = target + '%';
      return;
    }
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * ease(t)) + '%';
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Skill bar activation ---------- */
  function activateSkillBar(bar) {
    const value = parseInt(bar.dataset.progress || '0', 10);
    bar.style.setProperty('--progress', value + '%');

    const valueEl = bar.querySelector('.skill-bar__value');
    if (valueEl) animateCount(valueEl, value, 1200);

    bar.classList.add('is-visible');
  }

  /* ---------- Init ---------- */
  function init() {
    const fadeEls   = document.querySelectorAll('.fade-in');
    const skillBars = document.querySelectorAll('.skill-bar');

    // No IO support OR reduced motion: activate everything immediately
    if (!('IntersectionObserver' in window) || reduceMotion) {
      fadeEls.forEach((el) => el.classList.add('is-visible'));
      skillBars.forEach((bar) => activateSkillBar(bar));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          if (el.classList.contains('skill-bar')) {
            activateSkillBar(el);
          } else {
            el.classList.add('is-visible');
          }
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    fadeEls.forEach((el)  => io.observe(el));
    skillBars.forEach((b) => io.observe(b));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
