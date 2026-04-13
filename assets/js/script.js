/* ============================================================
   script.js  —  Global JS for all pages
   ============================================================ */

// ── Navigation active link highlighting ──────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// ── Navbar scroll effect ─────────────────────────────────────
window.addEventListener('scroll', function () {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
    navbar.style.backdropFilter = 'blur(15px)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    navbar.style.backdropFilter = 'blur(10px)';
  }
});

// ── Scroll-triggered animations ──────────────────────────────
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll(
    '.highlight-card, .research-item, .publication-item, .presentation-item, .teaching-item'
  ).forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
});

// ── Button press feedback ────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      var self = this;
      setTimeout(function () { self.style.transform = ''; }, 150);
    });
  });
});

// ── Abstract toggle (publications page) ──────────────────────
window.toggleAbstract = function (button) {
  var abstract = button.closest('.publication-item').querySelector('.abstract-content');
  if (abstract.classList.contains('show')) {
    abstract.classList.remove('show');
    button.textContent = 'Abstract';
  } else {
    abstract.classList.add('show');
    button.textContent = 'Hide Abstract';
  }
};

// ── Research accordion (research page) ───────────────────────
window.toggleResearch = function (card) {
  var isOpen = card.classList.contains('open');
  document.querySelectorAll('.research-item.open').forEach(function (openCard) {
    if (openCard !== card) openCard.classList.remove('open');
  });
  card.classList.toggle('open', !isOpen);
};

// ── Mobile menu ───────────────────────────────────────────────
// Uses a dedicated full-screen overlay to catch outside taps —
// avoids the touch-event race where document 'click' fires on
// the same touch that opened the menu and closes it immediately.

document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navLinks  = document.querySelector('.nav-links');
  var navbar    = document.querySelector('.nav-container');
  if (!hamburger || !navLinks) return;

  // Create invisible overlay that sits behind the open menu
  var overlay = document.createElement('div');
  overlay.id = 'nav-overlay';
  overlay.style.cssText = [
    'display:none',
    'position:fixed',
    'inset:0',
    'z-index:998',   /* below nav z-index:9999 but above page content */
    'background:transparent'
  ].join(';');
  document.body.appendChild(overlay);

  function openMenu() {
    navLinks.classList.add('mobile-active');
    hamburger.classList.add('active');
    overlay.style.display = 'block';
  }

  function closeMenu() {
    navLinks.classList.remove('mobile-active');
    hamburger.classList.remove('active');
    overlay.style.display = 'none';
  }

  function toggleMenu() {
    if (navLinks.classList.contains('mobile-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // Hamburger button — handle both click (desktop) and touchend (mobile)
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Overlay tap closes the menu
  overlay.addEventListener('click', closeMenu);

  // Also close when a nav link is tapped (so menu closes on navigation)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Remove the inline onclick from hamburger div to avoid double-firing
  hamburger.removeAttribute('onclick');

  // Expose globally as fallback (in case any HTML still has onclick)
  window.toggleMobileMenu = toggleMenu;
});

// ── Preload profile image ─────────────────────────────────────
window.addEventListener('load', function () {
  var profileImg = document.querySelector('.profile-img');
  if (profileImg && profileImg.src) {
    var img = new Image();
    img.src = profileImg.src;
  }
});
