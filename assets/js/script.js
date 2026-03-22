// Navigation highlighting
document.addEventListener('DOMContentLoaded', function() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Update active navigation link
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

// Smooth scrolling for anchor links (if any are added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
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

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
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

// Mobile menu toggle functionality (basic implementation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Add click event listeners for better user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add loading effect for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add hover effects for cards
    const cards = document.querySelectorAll('.highlight-card, .research-item, .publication-item, .presentation-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});

// Preload critical resources
window.addEventListener('load', function() {
    // Preload profile image if it exists
    const profileImg = document.querySelector('.profile-img');
    if (profileImg && profileImg.src) {
        const img = new Image();
        img.src = profileImg.src;
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Enable keyboard navigation for main navigation links
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('nav-links')) {
            focusedElement.style.outline = '2px solid #3498db';
        }
    }
});

// Add performance monitoring
window.addEventListener('load', function() {
    // Log page load time for performance monitoring
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// function toggleAbstract(button) {
//     var abstract = button.closest('.publication-item').querySelector('.abstract-content');
    
//     // Different max heights for mobile vs desktop
//     var maxAllowedHeight = window.innerWidth <= 768 ? 200 : 600;
    
//     if (abstract.classList.contains('show')) {
//         // Hide abstract
//         abstract.style.maxHeight = abstract.scrollHeight + 'px';
//         abstract.offsetHeight; // Force reflow
//         abstract.style.maxHeight = '0';
//         abstract.style.overflowY = 'hidden';
//         abstract.style.opacity = '0';
//         abstract.style.transform = 'translateY(-5px)';
        
//         setTimeout(() => {
//             abstract.classList.remove('show');
//             abstract.style.overflowY = '';
//         }, 600);
        
//         button.textContent = 'Abstract';
//     } else {
//         // Show abstract
//         abstract.classList.add('show');
//         abstract.style.maxHeight = '0';
//         abstract.style.opacity = '0';
//         abstract.style.transform = 'translateY(-5px)';
//         abstract.style.overflowY = 'hidden';
        
//         abstract.offsetHeight; // Force reflow
//         abstract.style.maxHeight = maxAllowedHeight + 'px';
//         abstract.style.overflowY = 'auto';
//         abstract.style.opacity = '1';
//         abstract.style.transform = 'translateY(0)';
        
//         button.textContent = 'Hide Abstract';
//     }
// }

function toggleAbstract(button) {
    var abstract = button.closest('.publication-item').querySelector('.abstract-content');

    if (abstract.classList.contains('show')) {
        abstract.classList.remove('show');
        button.textContent = 'Abstract';
    } else {
        abstract.classList.add('show');
        button.textContent = 'Hide Abstract';
    }
}

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (!nav.contains(event.target) && navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        hamburger.classList.remove('active');
    }
});

// Research area expand/collapse (accordion)
function toggleResearch(card) {
    const isOpen = card.classList.contains('open');

    // Close all other open cards
    document.querySelectorAll('.research-item.open').forEach(function(openCard) {
        if (openCard !== card) {
            openCard.classList.remove('open');
        }
    });

    // Toggle this card
    card.classList.toggle('open', !isOpen);
}