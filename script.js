/* ═══════════════════════════════════════════════════════════
   Yağızhan Keskin — Personal Site
   Script: theme toggle, mobile nav, scroll reveal, active nav
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Theme Toggle ──────────────────────────────────────────

  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  // Remove no-transition class after first paint
  window.addEventListener('load', function () {
    requestAnimationFrame(function () {
      document.body.classList.remove('no-transition');
    });
  });

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }

  themeToggle.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ── Mobile Navigation ─────────────────────────────────────

  var mobileToggle = document.getElementById('mobile-toggle');
  var navLinks = document.getElementById('nav-links');
  var isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('open', isMenuOpen);
    mobileToggle.setAttribute('aria-expanded', String(isMenuOpen));
    mobileToggle.setAttribute(
      'aria-label',
      isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
    );
  }

  mobileToggle.addEventListener('click', toggleMenu);

  // Close mobile menu when a nav link is clicked
  navLinks.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isMenuOpen) {
      toggleMenu();
      mobileToggle.focus();
    }
  });

  // ── Active Navigation Link ────────────────────────────────

  var sections = document.querySelectorAll('section[id]');
  var navLinkEls = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinkEls.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Throttled scroll listener
  var scrollTicking = false;
  window.addEventListener('scroll', function () {
    if (!scrollTicking) {
      requestAnimationFrame(function () {
        updateActiveLink();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  updateActiveLink();

  // ── Scroll Reveal ─────────────────────────────────────────

  var revealElements = document.querySelectorAll('.reveal');

  // Use IntersectionObserver for performant scroll-triggered reveals
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ── Smooth scroll for anchor links (fallback) ─────────────

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // Update URL without scroll jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
})();
