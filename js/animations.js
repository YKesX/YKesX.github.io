/* ================================================
   Portfolio Website - Advanced Animations
   Particle effects, transitions, and visual enhancements
   ================================================ */

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedAnimations();
    initScrollAnimations();
    initInteractiveEffects();
    console.log('Advanced animations initialized 🎨');
});

/* ================================================
   ADVANCED PARTICLE SYSTEM
   ================================================ */
function initParticleSystem() {
    const particlesContainers = document.querySelectorAll('.particles-container');
    
    particlesContainers.forEach(container => {
        createAdvancedParticles(container);
        createFloatingOrbs(container);
    });
}

function createAdvancedParticles(container) {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random properties
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 6 + 4; // Bigger particles: 4-10px instead of 2-6px
        const duration = Math.random() * 12 + 8; // Slightly faster: 8-20s instead of 10-25s
        const delay = Math.random() * 5; // Start earlier: 0-5s instead of 0-10s
        const opacity = Math.random() * 0.5 + 0.2;
        
        // Random color from our Web3 palette
        const colors = [
            'rgba(59, 130, 246, 0.6)',   // Blue
            'rgba(139, 92, 246, 0.6)',   // Purple
            'rgba(16, 185, 129, 0.6)',   // Green
            'rgba(245, 158, 11, 0.6)'    // Amber
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, ${color}, transparent);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${opacity};
            animation: particleFloat ${duration}s linear infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
    }
}

function createFloatingOrbs(container) {
    const orbCount = 3;
    
    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = `floating-orb orb-${i + 1}`;
        
        const size = Math.random() * 200 + 100;
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        const duration = Math.random() * 20 + 15;
        const delay = i * 5;
        
        orb.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: var(--orb-gradient-${i + 1});
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.3;
            filter: blur(60px);
            animation: orbFloat ${duration}s ease-in-out infinite;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(orb);
    }
}

/* ================================================
   SCROLL-TRIGGERED ANIMATIONS
   ================================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.classList.contains('glass-card')) {
                    entry.target.classList.add('slide-up');
                }
                if (entry.target.classList.contains('project-card')) {
                    entry.target.classList.add('fade-in-scale');
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    document.querySelectorAll('.glass-card, .project-card, .floating-card').forEach(el => {
        observer.observe(el);
    });
}

/* ================================================
   LOADING ANIMATIONS
   ================================================ */
function initLoadingAnimations() {
    // Animate hero elements on load
    const heroElements = document.querySelectorAll('.hero-name .name-part');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('fade-in-up');
    });
    
    // Animate navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('fade-in-down');
    });
    
    // Animate buttons
    const buttons = document.querySelectorAll('.hero-buttons .btn');
    buttons.forEach((button, index) => {
        button.style.animationDelay = `${0.8 + index * 0.1}s`;
        button.classList.add('fade-in-up');
    });
}

/* ================================================
   INTERACTIVE EFFECTS
   ================================================ */
function initInteractiveEffects() {
    // Cursor trail effect
    createCursorTrail();
    
    // Card hover effects
    initCardHoverEffects();
    
    // Button ripple effects
    initButtonRippleEffects();
    
    // Magnetic effect for interactive elements
    initMagneticEffect();
}

function createCursorTrail() {
    const trail = [];
    const trailLength = 8;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, ${0.8 - i * 0.1});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = mouseX + 'px';
                dot.style.top = mouseY + 'px';
                dot.style.opacity = '1';
            }, index * 50);
        });
    });
    
    document.addEventListener('mouseleave', () => {
        trail.forEach(dot => {
            dot.style.opacity = '0';
        });
    });
}

function initCardHoverEffects() {
    const cards = document.querySelectorAll('.glass-card, .project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add parallax effect to card content
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * -10;
            
            this.style.transform = `
                translateY(-10px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale(1.02)
            `;
        });
    });
}

function initButtonRippleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-primary, .theme-toggle, .nav-logo');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.1;
            const moveY = y * 0.1;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

/* ================================================
   CUSTOM CSS ANIMATIONS (Injected via JavaScript)
   ================================================ */
function initAdvancedAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        /* Particle animations */
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes orbFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
            }
            25% {
                transform: translate(20px, -30px) scale(1.1);
            }
            50% {
                transform: translate(-15px, 20px) scale(0.9);
            }
            75% {
                transform: translate(30px, 10px) scale(1.05);
            }
        }
        
        /* Element entrance animations */
        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fade-in-down {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slide-up {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fade-in-scale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes pop-in {
            0% {
                opacity: 0;
                transform: scale(0.5) rotate(-5deg);
            }
            60% {
                transform: scale(1.1) rotate(2deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }
        
        @keyframes slide-in-left {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Apply animations */
        .fade-in-up {
            animation: fade-in-up 0.8s ease-out both;
        }
        
        .fade-in-down {
            animation: fade-in-down 0.6s ease-out both;
        }
        
        .slide-up {
            animation: slide-up 0.6s ease-out both;
        }
        
        .fade-in-scale {
            animation: fade-in-scale 0.5s ease-out both;
        }
        
        .pop-in {
            animation: pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
        }
        
        .slide-in-left {
            animation: slide-in-left 0.6s ease-out both;
        }
        
        /* Enhanced mobile navigation */
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: var(--nav-height);
                left: 0;
                right: 0;
                background: var(--glass-bg);
                backdrop-filter: var(--glass-backdrop);
                border-top: 1px solid var(--glass-border);
                padding: var(--spacing-xl);
                flex-direction: column;
                gap: var(--spacing-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.mobile-open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                padding: var(--spacing-lg);
                text-align: center;
                border-radius: var(--radius-lg);
                font-size: var(--font-size-lg);
            }
        }
        
        /* Smooth scroll behavior */
        html {
            scroll-behavior: smooth;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .floating-particle,
            .floating-orb,
            .cursor-trail {
                display: none !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

/* ================================================
   PERFORMANCE OPTIMIZATIONS
   ================================================ */

// Throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize particle rendering
function optimizeParticles() {
    const particles = document.querySelectorAll('.floating-particle, .floating-orb');
    
    // Use requestAnimationFrame for smooth animations
    function updateParticles() {
        particles.forEach(particle => {
            // Only update visible particles
            const rect = particle.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                // Particle is visible, continue animation
                particle.style.visibility = 'visible';
            } else {
                // Particle is off-screen, hide to save resources
                particle.style.visibility = 'hidden';
            }
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    requestAnimationFrame(updateParticles);
}

// Initialize optimizations
optimizeParticles(); 