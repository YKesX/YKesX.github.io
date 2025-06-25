/* ================================================
   Portfolio Website - Main JavaScript
   Core functionality and interactivity
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initThemeToggle();
    initMobileNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollEffects();
    initParticles();
    
    console.log('Portfolio website initialized ✨');
});

/* ================================================
   THEME TOGGLE FUNCTIONALITY
   ================================================ */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 150);
    });
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'light' ? '#f9fafb' : '#0a0a0a');
        }
    }
}

/* ================================================
   MOBILE NAVIGATION
   ================================================ */
function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileMenuToggle || !navLinks) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        const isOpen = navLinks.classList.contains('mobile-open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on a nav link
    navLinks.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link')) {
            closeMobileMenu();
        }
    });
    
    function openMobileMenu() {
        navLinks.classList.add('mobile-open');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger lines
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }
    
    function closeMobileMenu() {
        navLinks.classList.remove('mobile-open');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger lines
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

/* ================================================
   SMOOTH SCROLLING
   ================================================ */
function initSmoothScrolling() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================================
   CONTACT FORM FUNCTIONALITY
   ================================================ */
function initContactForm() {
    // Email copy functionality
    const copyEmailButtons = document.querySelectorAll('.copy-email');
    
    copyEmailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const email = this.getAttribute('data-email');
            
            if (navigator.clipboard && window.isSecureContext) {
                // Use modern clipboard API
                navigator.clipboard.writeText(email).then(() => {
                    showCopyConfirmation(this);
                }).catch(() => {
                    fallbackCopyEmail(email, this);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyEmail(email, this);
            }
        });
    });
    
    function showCopyConfirmation(button) {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'var(--color-accent)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }
    
    function fallbackCopyEmail(email, button) {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyConfirmation(button);
        } catch (err) {
            console.error('Fallback copy failed:', err);
            // Show manual copy prompt
            prompt('Copy this email address:', email);
        }
        
        document.body.removeChild(textArea);
    }
}

/* ================================================
   SCROLL EFFECTS
   ================================================ */
function initScrollEffects() {
    // Navbar background on scroll
    const navbar = document.querySelector('.nav-container');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.glass-card, .project-card, .floating-card, .timeline-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/* ================================================
   BASIC PARTICLE SYSTEM
   ================================================ */
function initParticles() {
    const particlesContainers = document.querySelectorAll('.particles-container');
    
    particlesContainers.forEach(container => {
        createParticles(container);
    });
    
    function createParticles(container) {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Random delay
            const delay = Math.random() * 20;
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${duration}s linear infinite;
                animation-delay: ${delay}s;
                opacity: 0.7;
            `;
            
            container.appendChild(particle);
        }
    }
}

/* ================================================
   UTILITY FUNCTIONS
   ================================================ */

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth number counting animation
function animateCounter(element, start, end, duration = 2000) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/* ================================================
   PERFORMANCE OPTIMIZATIONS
   ================================================ */

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

/* ================================================
   ERROR HANDLING
   ================================================ */
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an analytics service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an analytics service
});

/* ================================================
   ACCESSIBILITY ENHANCEMENTS
   ================================================ */

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks && navLinks.classList.contains('mobile-open')) {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            if (mobileMenuToggle) {
                mobileMenuToggle.click();
            }
        }
    }
    
    // Space or Enter activates theme toggle
    if ((e.key === ' ' || e.key === 'Enter') && e.target.id === 'themeToggle') {
        e.preventDefault();
        e.target.click();
    }
});

// Reduce motion for users who prefer it
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
} 