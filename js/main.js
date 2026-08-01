/* ============================================================
   TECHNEXA — Main JavaScript
   Core interactions, animations, cursor, navbar, counters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Smooth Techie Page Transitions ───────────────────────── */
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = '';
      }, 800);
    });
  }

  // Intercept internal page links for smooth Techie transition
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel') && !link.getAttribute('target')) {
      link.addEventListener('click', (e) => {
        if (loadingScreen) {
          e.preventDefault();
          loadingScreen.classList.remove('hidden');
          setTimeout(() => {
            window.location.href = href;
          }, 450);
        }
      });
    }
  });

  /* ── Init Particle System ────────────────────────────────── */
  if (typeof ParticleSystem !== 'undefined') {
    new ParticleSystem('particle-canvas');
  }

  /* ── Custom Cursor (Snappy & Responsive) ───────────────── */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    // Ring follows instantly with high responsive factor
    const animRing = () => {
      rx += (mx - rx) * 0.55;
      ry += (my - ry) * 0.55;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    };
    animRing();
    // Hover state
    document.body.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, input, select, textarea, .techie-prop, .event-card, .btn')) {
        dot.classList.add('active'); ring.classList.add('active');
      } else {
        dot.classList.remove('active'); ring.classList.remove('active');
      }
    });
  }

  /* ── Techie Robot Mascot Interactive Widget Injection ───────── */
  if (!document.getElementById('techie-widget')) {
    const widget = document.createElement('div');
    widget.id = 'techie-widget';
    widget.className = 'techie-widget-container';
    widget.innerHTML = `
      <div class="techie-chat-box" id="techie-chat">
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">
          <span style="font-weight:700;color:var(--accent);font-size:0.9rem;">🤖 Techie — Festival Guide</span>
          <button id="techie-close" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1rem;">✕</button>
        </div>
        <p style="font-size:0.825rem;color:var(--text-muted);line-height:1.5;" id="techie-msg">
          Hi! I'm Techie! Welcome to TECHNEXA 2026. Need help exploring the festival?
        </p>
        <div style="display:flex;flex-direction:column;gap:6px;">
          <a href="events.html" class="btn btn-primary btn-sm" style="font-size:0.75rem;padding:6px 12px;justify-content:center;">🏆 Explore 20+ Events</a>
          <a href="schedule.html" class="btn btn-outline btn-sm" style="font-size:0.75rem;padding:6px 12px;justify-content:center;">📅 View Schedule</a>
          <a href="contact.html" class="btn btn-ghost btn-sm" style="font-size:0.75rem;padding:6px 12px;justify-content:center;">💬 Contact Team</a>
        </div>
      </div>
      <div style="position:relative;">
        <div class="techie-bubble" id="techie-peek-bubble">Hi there! 👋</div>
        <img src="assets/techie.png" alt="Techie Mascot" class="techie-widget-avatar" id="techie-avatar-btn" />
      </div>
    `;
    document.body.appendChild(widget);

    const chatBox = document.getElementById('techie-chat');
    const avatarBtn = document.getElementById('techie-avatar-btn');
    const closeBtn = document.getElementById('techie-close');
    const peekBubble = document.getElementById('techie-peek-bubble');

    const phrases = [
      "Hi! I'm Techie! 👋",
      "Ready to win ₹5L+ Prizes? 🏆",
      "Check out HackNova 24H! 💻",
      "RoboWar is epic! 🤖",
      "Need any help? Click me!"
    ];
    let phraseIdx = 0;

    if (peekBubble) {
      setInterval(() => {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        peekBubble.textContent = phrases[phraseIdx];
      }, 5000);
    }

    avatarBtn?.addEventListener('click', () => {
      chatBox.classList.toggle('active');
    });

    closeBtn?.addEventListener('click', () => {
      chatBox.classList.remove('active');
    });
  }

  /* ── Sticky Navbar ───────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ── Mobile Nav ──────────────────────────────────────────── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Active Nav Link ─────────────────────────────────────── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      a.classList.add('active');
    }
  });

  /* ── Scroll Reveal ───────────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '50px 0px 50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  /* ── Animated Counters ───────────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2000;
    const startTime = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(easeOut(progress) * target);
      el.textContent = prefix + value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = '1';
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

  /* ── Countdown Timer ─────────────────────────────────────── */
  const countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    // Target: September 11, 2026
    const target = new Date('2026-09-11T09:00:00');
    const update = () => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        countdownEl.innerHTML = '<span style="color:var(--accent);font-family:var(--font-display);font-size:1.5rem;font-weight:700;">LIVE NOW! 🔥</span>';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = v => String(v).padStart(2, '0');
      if (document.getElementById('cd-days')) document.getElementById('cd-days').textContent = pad(d);
      if (document.getElementById('cd-hours')) document.getElementById('cd-hours').textContent = pad(h);
      if (document.getElementById('cd-mins')) document.getElementById('cd-mins').textContent = pad(m);
      if (document.getElementById('cd-secs')) document.getElementById('cd-secs').textContent = pad(s);
    };
    update();
    setInterval(update, 1000);
  }

  /* ── 3D Interactive Card Mouse Tilt Effect ───────────────── */
  document.querySelectorAll('.event-card, .speaker-card, .glass-card, .card-3d').forEach(card => {
    card.classList.add('card-3d');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -8;
      const rotY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.015)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Back to Top ─────────────────────────────────────────── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Parallax Orbs ───────────────────────────────────────── */
  document.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
    const dx = (x - cx) / cx, dy = (y - cy) / cy;
    document.querySelectorAll('.parallax-orb').forEach((orb, i) => {
      const depth = (i % 3 + 1) * 8;
      orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  });

  /* ── FAQ Accordion ───────────────────────────────────────── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close others
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── Schedule Tabs ───────────────────────────────────────── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const panel = document.getElementById(target);
      if (panel) panel.style.display = '';
    });
  });
  // Show first tab by default
  const firstTab = document.querySelector('.tab-btn');
  if (firstTab) {
    document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
    firstTab.classList.add('active');
    const firstPanel = document.getElementById(firstTab.dataset.tab);
    if (firstPanel) firstPanel.style.display = '';
  }

  /* ── Button Ripple ───────────────────────────────────────── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.25);
        width:10px; height:10px;
        top:${e.clientY - rect.top - 5}px;
        left:${e.clientX - rect.left - 5}px;
        transform:scale(0); pointer-events:none;
        animation: ripple-anim 0.6s ease forwards;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  /* ── Gallery Lightbox ────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.src;
        lightbox.classList.add('open');
      });
    });
    document.getElementById('lightbox-close')?.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  /* ── Contact Form ────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type=submit]');
      const original = btn.textContent;
      btn.textContent = '✅ Message Sent!';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; contactForm.reset(); }, 3000);
    });
  }

  /* ── Newsletter ──────────────────────────────────────────── */
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      btn.textContent = '✅';
      input.value = '';
      setTimeout(() => { btn.textContent = '→'; }, 2000);
    });
  });

  /* ── Smooth anchor scrolling ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Ripple keyframe injection ───────────────────────────── */
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `
      @keyframes ripple-anim {
        to { transform: scale(30); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

  /* ── Production Security & Source View Protection ──────────────── */
  document.addEventListener('contextmenu', (e) => {
    if (!window.location.pathname.includes('admin.html')) {
      e.preventDefault();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (window.location.pathname.includes('admin.html')) return;
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
      (e.ctrlKey && (e.key === 'U' || e.key === 'u'))
    ) {
      e.preventDefault();
    }
  });

  }

});
