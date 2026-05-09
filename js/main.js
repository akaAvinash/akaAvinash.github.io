// main.js — site init: nav, scroll state, smooth scroll, active link tracking,
// custom cursor (lerp follower), scroll-to-top button, email clipboard fallback,
// toast helper, and final lucide.createIcons() pass.

(function () {
  'use strict';

  const SCROLL_THRESHOLD     = 50;   // px before nav gains the blur background
  const SCROLL_TOP_VISIBLE   = 300;  // px before the scroll-to-top button appears
  const CURSOR_LERP          = 0.18; // how aggressively the cursor catches up

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav__toggle');
  const menu   = document.getElementById('nav-menu');
  const links  = Array.from(document.querySelectorAll('.nav__link'));

  /* =====================================================================
     Nav: scrolled state
     ===================================================================== */
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

  /* =====================================================================
     Nav: mobile menu toggle
     ===================================================================== */
  function setMenuOpen(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  links.forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });

  document.addEventListener('click', (e) => {
    if (!menu?.classList.contains('is-open')) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (menu.contains(target) || toggle?.contains(target)) return;
    setMenuOpen(false);
  });

  const mq = window.matchMedia('(min-width: 769px)');
  const handleMq = (e) => { if (e.matches) setMenuOpen(false); };
  mq.addEventListener?.('change', handleMq);

  /* =====================================================================
     Smooth scroll for in-page anchors
     ===================================================================== */
  function smoothScrollTo(hash) {
    const el = document.querySelector(hash);
    if (!el) return;
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

  /* =====================================================================
     Active nav link highlighting
     ===================================================================== */
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
    linkBySectionId.get(id)?.classList.add('is-active');
  }

  if ('IntersectionObserver' in window && sections.length) {
    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
    ) || 72;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        rootMargin: `-${navHeight}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* =====================================================================
     Footer year (graceful no-op if the element was removed)
     ===================================================================== */
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* =====================================================================
     Toast helper (used by the email clipboard fallback)
     ===================================================================== */
  let toastEl = null;
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    // Force reflow so the transition runs even on a freshly-inserted node
    void toastEl.offsetWidth;
    toastEl.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, 2400);
  }

  /* =====================================================================
     Email button: clipboard fallback
     ---------------------------------------------------------------------
     The button still uses href="mailto:..." so a configured mail client
     opens normally. On systems with no mail handler (common on Windows
     without Outlook/Mail set as default), the click otherwise feels dead.
     This handler ALSO writes the address to the clipboard and shows a
     toast — so the click always produces visible feedback.
     ===================================================================== */
  const emailBtn = document.querySelector('.contact__actions a[href^="mailto:"]');
  if (emailBtn) {
    emailBtn.addEventListener('click', async () => {
      const href = emailBtn.getAttribute('href') || '';
      const email = href.replace(/^mailto:/i, '').split('?')[0];
      if (!email) return;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(email);
          showToast(`Copied ${email}`);
        } catch {
          // Permission denied or insecure context — silent fallback to mailto
        }
      }
      // Don't preventDefault: the browser still attempts the mailto: handler.
    });
  }

  /* =====================================================================
     Scroll-to-top button
     ===================================================================== */
  const scrollTopBtn = document.getElementById('scroll-top');
  if (scrollTopBtn) {
    function syncScrollTop() {
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > SCROLL_TOP_VISIBLE);
    }
    window.addEventListener('scroll', syncScrollTop, { passive: true });
    syncScrollTop();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    });
  }

  /* =====================================================================
     Custom cursor (desktop, fine-pointer only)
     ---------------------------------------------------------------------
     8px cyan dot that lerps toward the actual mouse position. Grows when
     hovering interactive elements. Touch / coarse-pointer / reduced-motion
     users keep their native cursor (CSS handles the visibility gating).
     ===================================================================== */
  if (isFinePointer && !reduceMotion) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);
    document.documentElement.classList.add('cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function loop() {
      cursorX += (mouseX - cursorX) * CURSOR_LERP;
      cursorY += (mouseY - cursorY) * CURSOR_LERP;
      cursor.style.transform =
        `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Grow on interactive hover
    const hoverables = 'a, button, [role="button"], input, textarea, select, label';
    document.querySelectorAll(hoverables).forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
    });

    // Hide while leaving the document, restore on entry
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });
  }

  /* =====================================================================
     Lucide icons — final pass
     ---------------------------------------------------------------------
     Vendor scripts (lucide included) load with `defer` and execute in
     document order before this file. Calling createIcons() here replaces
     every <i data-lucide="..."> in the parsed DOM with the matching SVG.
     ===================================================================== */
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
})();
