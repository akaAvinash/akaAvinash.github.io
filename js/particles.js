// particles.js — subtle particle network behind the hero
//
// 50 dots, lines drawn between any two dots within LINK_DISTANCE.
// DPR-aware, pauses when tab hidden or hero off-screen, respects
// prefers-reduced-motion.

(function () {
  'use strict';

  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tunables ---------- */
  const COUNT          = 50;
  const LINK_DISTANCE  = 130;     // px between dots to connect
  const DOT_RADIUS     = 1.6;
  const SPEED          = 0.18;    // base velocity (px / frame at 60fps)
  const DOT_COLOR      = 'rgba(0, 212, 255, 0.55)';
  const LINE_COLOR     = '0, 212, 255'; // alpha applied per-segment

  let width  = 0;
  let height = 0;
  let dpr    = Math.max(1, window.devicePixelRatio || 1);
  let particles = [];
  let rafId = null;
  let running = false;

  /* ---------- Sizing ---------- */
  function resize() {
    const rect = canvas.getBoundingClientRect();
    width  = rect.width;
    height = rect.height;
    dpr    = Math.max(1, window.devicePixelRatio || 1);

    canvas.width  = Math.floor(width  * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  /* ---------- Particles ---------- */
  function rand(min, max) { return Math.random() * (max - min) + min; }

  function createParticles() {
    particles = new Array(COUNT).fill(0).map(() => ({
      x: rand(0, width),
      y: rand(0, height),
      vx: rand(-SPEED, SPEED),
      vy: rand(-SPEED, SPEED),
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // Update positions
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges (cleaner than bouncing)
      if (p.x < -10) p.x = width + 10;
      else if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      else if (p.y > height + 10) p.y = -10;
    }

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < LINK_DISTANCE * LINK_DISTANCE) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / LINK_DISTANCE) * 0.35;
          ctx.strokeStyle = `rgba(${LINE_COLOR}, ${alpha.toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw dots
    ctx.fillStyle = DOT_COLOR;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }

    rafId = requestAnimationFrame(step);
  }

  /* ---------- Static frame (reduced motion) ---------- */
  function drawStatic() {
    // Just render dots once, no animation, no lines — keeps it tasteful.
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = DOT_COLOR;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ---------- Lifecycle ---------- */
  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  /* ---------- Resize handling (debounced) ---------- */
  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      createParticles();
      if (reduceMotion) drawStatic();
    }, 120);
  }

  /* ---------- Visibility / viewport gating ---------- */
  function setupGating() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else if (!reduceMotion) start();
    });

    const hero = document.getElementById('hero');
    if (hero && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              if (!reduceMotion) start();
            } else {
              stop();
            }
          }
        },
        { threshold: 0 }
      );
      io.observe(hero);
    }
  }

  /* ---------- Init ---------- */
  resize();
  createParticles();

  if (reduceMotion) {
    drawStatic();
  } else {
    start();
  }

  window.addEventListener('resize', onResize, { passive: true });
  setupGating();
})();
