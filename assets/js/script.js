/* ============================================================
   script.js  —  Global JS for all pages
   (Navigation, hamburger menu, animations, UI interactions)
   ============================================================ */

/* ============================================================
   main.js  —  Combined script for all pages
   Merges: script.js (nav, animations, UI) + about.js (timeline)
   ============================================================ */

/* ─────────────────────────────────────────────────────────────
   SECTION 1: Navigation & UI (from script.js)
───────────────────────────────────────────────────────────── */

// Navigation highlighting
document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(15px)';
    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  }
});

// Scroll-triggered animations (IntersectionObserver)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
  const animateElements = document.querySelectorAll(
    '.highlight-card, .research-item, .publication-item, .presentation-item, .teaching-item'
  );
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
});

// Button click feedback + card hover effects
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });

  document.querySelectorAll('.highlight-card, .research-item, .publication-item, .presentation-item').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.boxShadow = '';
    });
  });
});

// Preload profile image
window.addEventListener('load', function () {
  const profileImg = document.querySelector('.profile-img');
  if (profileImg && profileImg.src) {
    const img = new Image();
    img.src = profileImg.src;
  }
  // Performance monitoring
  console.log(`Page loaded in ${performance.now().toFixed(2)}ms`);
});

// Abstract toggle
function toggleAbstract(button) {
  const abstract = button.closest('.publication-item').querySelector('.abstract-content');
  if (abstract.classList.contains('show')) {
    abstract.classList.remove('show');
    button.textContent = 'Abstract';
  } else {
    abstract.classList.add('show');
    button.textContent = 'Hide Abstract';
  }
}

// Mobile menu toggle — on window so inline onclick works even before DOMContentLoaded
window.toggleMobileMenu = function () {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  if (navLinks) navLinks.classList.toggle('mobile-active');
  if (hamburger) hamburger.classList.toggle('active');
};

// Close mobile menu when clicking outside.
// Use capture:true so this runs BEFORE the hamburger's own onclick,
// but only act when the click is genuinely outside the nav.
document.addEventListener('click', function (event) {
  const nav = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  if (!nav || !navLinks) return;
  // If the click is on the hamburger itself, let toggleMobileMenu handle it
  if (hamburger && hamburger.contains(event.target)) return;
  if (!nav.contains(event.target) && navLinks.classList.contains('mobile-active')) {
    navLinks.classList.remove('mobile-active');
    if (hamburger) hamburger.classList.remove('active');
  }
});

// Research accordion
function toggleResearch(card) {
  const isOpen = card.classList.contains('open');
  document.querySelectorAll('.research-item.open').forEach(function (openCard) {
    if (openCard !== card) openCard.classList.remove('open');
  });
  card.classList.toggle('open', !isOpen);
}
