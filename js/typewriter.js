// typewriter.js — cycling-role typewriter for the hero subtitle
//
// Reads roles from a `data-roles` JSON attribute on the target element,
// or falls back to the roles defined in PROJECT_GOAL.md. The blinking
// cursor is a sibling element styled in CSS via the `blink` keyframe.

(function () {
  'use strict';

  const FALLBACK_ROLES = [
    'QA Engineer @ Amazon',
    'SDET | 5+ Years',
    'Python Automation Engineer',
    'AI-Powered Test Architect',
    'Playwright | Selenium | Pytest',
  ];

  class Typewriter {
    /**
     * @param {HTMLElement} el      Target element to receive textContent updates
     * @param {Object}      options
     * @param {string[]}    options.roles
     * @param {number}     [options.typeSpeed=70]    avg ms per char while typing
     * @param {number}     [options.deleteSpeed=35]  ms per char while deleting
     * @param {number}     [options.holdAfterType=1600]  pause once a role is fully typed
     * @param {number}     [options.holdBeforeNext=350]  pause after deleting before next role
     */
    constructor(el, options) {
      this.el = el;
      this.roles = options.roles;
      this.typeSpeed = options.typeSpeed ?? 70;
      this.deleteSpeed = options.deleteSpeed ?? 35;
      this.holdAfterType = options.holdAfterType ?? 1600;
      this.holdBeforeNext = options.holdBeforeNext ?? 350;

      this.roleIndex = 0;
      this.charIndex = 0;
      this.deleting = false;
      this.timer = null;
    }

    start() {
      this.stop();
      this.tick();
    }

    stop() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    }

    tick() {
      const role = this.roles[this.roleIndex];

      if (!this.deleting) {
        this.charIndex++;
        this.el.textContent = role.slice(0, this.charIndex);

        if (this.charIndex >= role.length) {
          this.deleting = true;
          this.timer = setTimeout(() => this.tick(), this.holdAfterType);
          return;
        }
        // Slight randomness for organic feel
        const jitter = Math.random() * 50;
        this.timer = setTimeout(() => this.tick(), this.typeSpeed + jitter);
      } else {
        this.charIndex--;
        this.el.textContent = role.slice(0, Math.max(this.charIndex, 0));

        if (this.charIndex <= 0) {
          this.deleting = false;
          this.charIndex = 0;
          this.roleIndex = (this.roleIndex + 1) % this.roles.length;
          this.timer = setTimeout(() => this.tick(), this.holdBeforeNext);
          return;
        }
        this.timer = setTimeout(() => this.tick(), this.deleteSpeed);
      }
    }
  }

  function init() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    let roles = FALLBACK_ROLES;
    if (el.dataset.roles) {
      try {
        const parsed = JSON.parse(el.dataset.roles);
        if (Array.isArray(parsed) && parsed.length) roles = parsed;
      } catch {
        // keep fallback
      }
    }

    // Reduced motion: show the first role statically, no animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = roles[0];
      return;
    }

    const writer = new Typewriter(el, { roles });
    writer.start();

    // Pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) writer.stop();
      else writer.start();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
