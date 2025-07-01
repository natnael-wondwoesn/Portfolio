// Modern Animation Utils
const easeOutQuart = (t) => 1 - (--t) * t * t * t;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// Debounce utility for performance
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

// Throttle utility for scroll events
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
    }
}

// Enhanced Mobile Navigation with smooth animations
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.hamburger || !this.navMenu) return;
        
        this.hamburger.addEventListener('click', () => this.toggle());
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
        
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.close();
            }
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
        
        // Animate nav links
        this.navLinks.forEach((link, index) => {
            link.style.animation = `slideInUp 0.3s ease forwards ${index * 0.1}s`;
        });
    }
    
    close() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = '';
        
        this.navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
}

// Enhanced Smooth Scrolling with easing
class SmoothScroller {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e));
        });
    }
    
    handleClick(e) {
        e.preventDefault();
        const target = document.querySelector(e.currentTarget.getAttribute('href'));
        if (!target) return;
        
        const targetPosition = target.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = Math.min(Math.abs(distance) / 2, 1000); // Dynamic duration
        
        this.smoothScrollTo(startPosition, distance, duration);
    }
    
    smoothScrollTo(start, distance, duration) {
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, start + distance * easeInOutCubic(progress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
}

// Enhanced Intersection Observer with advanced animations
class AnimationObserver {
    constructor() {
        this.observerOptions = {
            threshold: [0.1, 0.3, 0.5],
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        const elements = document.querySelectorAll(
            '.timeline-item, .skill-category, .project-card, .stat-item, .hero-text, .about-text'
        );
        
        elements.forEach(el => {
            this.observer.observe(el);
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                this.animateElement(entry.target);
                
                // Special handling for stat counters
                if (entry.target.classList.contains('stat-item')) {
                    this.animateCounter(entry.target);
                }
                
                // Stagger animation for skill cards
                if (entry.target.classList.contains('skill-category')) {
                    this.staggerChildAnimation(entry.target, '.skill-card');
                }
                
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateElement(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('visible');
    }
    
    staggerChildAnimation(parent, childSelector) {
        const children = parent.querySelectorAll(childSelector);
        children.forEach((child, index) => {
            setTimeout(() => {
                child.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                child.style.transform = 'translateY(0)';
                child.style.opacity = '1';
            }, index * 100);
        });
    }
    
    animateCounter(element) {
        const counter = element.querySelector('.stat-number');
        if (!counter) return;
        
        const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
        const duration = 2000;
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(target * easeOutQuart(progress));
            counter.innerText = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
}

// Enhanced Navbar Scroll Effects
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }
    
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateNavbar());
            this.ticking = true;
        }
    }
    
    updateNavbar() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (currentScrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            this.navbar.style.transform = 'translateY(0)';
        }
        
        this.lastScrollY = currentScrollY;
        this.ticking = false;
    }
}

// Enhanced Parallax Controller
class ParallaxController {
    constructor() {
        this.elements = document.querySelectorAll('.shape, .floating-cube');
        this.ticking = false;
        
        this.init();
    }
    
    init() {
        if (this.elements.length === 0) return;
        
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }
    
    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => this.updateParallax());
            this.ticking = true;
        }
    }
    
    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        this.elements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * 0.05;
            
            element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${rotation}deg)`;
        });
        
        this.ticking = false;
    }
}

// Enhanced 3D Tilt Effects
class TiltEffects {
    constructor() {
        this.elements = document.querySelectorAll(
            '.project-card, .skill-category, .profile-card, .timeline-content'
        );
        
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.addEventListener('mouseenter', () => this.handleMouseEnter(element));
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
        });
    }
    
    handleMouseEnter(element) {
        element.style.transition = 'transform 0.1s ease-out';
    }
    
    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        
        element.style.transform = 
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    handleMouseLeave(element) {
        element.style.transition = 'transform 0.3s ease-out';
        element.style.transform = 
            'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
}

// Enhanced Form Handler
class FormHandler {
    constructor() {
        this.form = document.querySelector('.contact-form form');
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }
    
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
        
        this.showFieldStatus(field, isValid, message);
        return isValid;
    }
    
    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    showFieldStatus(field, isValid, message) {
        // Remove existing status
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) existingError.remove();
        
        field.style.borderColor = isValid ? '' : '#ef4444';
        
        if (!isValid && message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = `
                color: #ef4444;
                font-size: 0.8rem;
                margin-top: 0.25rem;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            `;
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }
    
    clearErrors(field) {
        field.style.borderColor = '';
        const error = field.parentNode.querySelector('.field-error');
        if (error) error.remove();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            this.showNotification('Please fix the errors above', 'error');
            return;
        }
        
        this.submitForm();
    }
    
    async submitForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
                <span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                Sending...
            </span>
        `;
        
        // Add CSS animation for spinner
        if (!document.querySelector('#spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }
    
    showNotification(message, type) {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            ${type === 'success' 
                ? 'background: linear-gradient(135deg, #10b981, #059669);' 
                : 'background: linear-gradient(135deg, #ef4444, #dc2626);'
            }
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Enhanced Typing Animation
class TypingAnimation {
    constructor() {
        this.elements = document.querySelectorAll('.hero-title .title-line');
        this.init();
    }
    
    init() {
        if (this.elements.length === 0) return;
        
        this.elements.forEach((element, index) => {
            const text = element.textContent;
            element.textContent = '';
            element.style.opacity = '1';
            
            setTimeout(() => {
                this.typeText(element, text, 80);
            }, index * 600);
        });
    }
    
    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
}

// Enhanced Particle System
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 20;
        this.init();
    }
    
    init() {
        setInterval(() => this.createParticle(), 3000);
        this.animate();
    }
    
    createParticle() {
        if (this.particles.length >= this.maxParticles) return;
        
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            opacity: 0.7;
            filter: blur(0.5px);
        `;
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight + 10;
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: -(Math.random() * 3 + 2),
            life: 1
        });
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.005;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            particle.element.style.opacity = particle.life;
            
            if (particle.life <= 0 || particle.y < -10) {
                particle.element.remove();
                this.particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Theme Controller (for future dark/light mode)
class ThemeController {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Add theme toggle button (if it exists)
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Monitor FPS
        let lastTime = performance.now();
        let frames = 0;
        
        const measureFPS = (currentTime) => {
            frames++;
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                    this.optimizePerformance();
                }
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    optimizePerformance() {
        // Reduce animation complexity on low-end devices
        const elements = document.querySelectorAll('.shape, .floating-cube');
        elements.forEach(el => {
            el.style.animationDuration = '10s'; // Slower animations
        });
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new MobileNavigation();
    new SmoothScroller();
    new AnimationObserver();
    new NavbarController();
    new FormHandler();
    
    // Enhanced effects (only on devices that can handle them)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new ParallaxController();
        new TiltEffects();
        new ParticleSystem();
        // new TypingAnimation(); // Uncomment if you want typing effect
    }
    
    // Utility systems
    new ThemeController();
    new PerformanceMonitor();
});

// Export for potential external use
window.PortfolioApp = {
    MobileNavigation,
    SmoothScroller,
    AnimationObserver,
    NavbarController,
    ParallaxController,
    TiltEffects,
    FormHandler,
    TypingAnimation,
    ParticleSystem,
    ThemeController,
    PerformanceMonitor
};