/**
 * ============================================
 * DURGESH SHARMA - PORTFOLIO JAVASCRIPT
 * Professional Portfolio Website Script
 * ============================================
 */

'use strict';

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================
const CONFIG = {
    emailJS: {
        serviceID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        templateID: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        publicKey: 'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    },
    typing: {
        texts: [
            'Full Stack Developer',
            'DSA Problem Solver',
            'MERN Stack Developer',
            'UI/UX Enthusiast',
            'Open Source Contributor',
            'Tech Enthusiast'
        ],
        typeSpeed: 100,
        deleteSpeed: 50,
        pauseTime: 2000
    },
    animation: {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    },
    particles: {
        count: 50
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================
const Utils = {
    // Debounce function
    debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit = 100) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Get element by selector
    $(selector) {
        return document.querySelector(selector);
    },

    // Get all elements by selector
    $$(selector) {
        return document.querySelectorAll(selector);
    },

    // Add event listener
    on(element, event, handler, options = false) {
        if (element) {
            element.addEventListener(event, handler, options);
        }
    },

    // Remove event listener
    off(element, event, handler, options = false) {
        if (element) {
            element.removeEventListener(event, handler, options);
        }
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Lerp function for smooth animations
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    // Clamp value between min and max
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    // Random number between min and max
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    // Validate email
    isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },

    // Sleep function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// ============================================
// PRELOADER
// ============================================
class Preloader {
    constructor() {
        this.preloader = Utils.$('.preloader');
        this.progress = Utils.$('.preloader-progress');
        this.init();
    }

    init() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                this.hide();
            }
            if (this.progress) {
                this.progress.style.width = `${progress}%`;
            }
        }, 100);

        // Fallback hide after 3 seconds
        setTimeout(() => this.hide(), 3000);
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
        }
    }
}

// ============================================
// CUSTOM CURSOR
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = Utils.$('.cursor');
        this.follower = Utils.$('.cursor-follower');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.15;
        this.init();
    }

    init() {
        if (!this.cursor || !this.follower) return;

        Utils.on(document, 'mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Immediate cursor position
            this.cursor.style.left = `${e.clientX}px`;
            this.cursor.style.top = `${e.clientY}px`;
        });

        // Smooth follower animation
        this.animate();

        // Hover effects
        const hoverElements = Utils.$$('a, button, .skill-card, .project-card, .social-link, .nav-link');
        hoverElements.forEach(el => {
            Utils.on(el, 'mouseenter', () => this.follower.classList.add('hover'));
            Utils.on(el, 'mouseleave', () => this.follower.classList.remove('hover'));
        });

        // Click effect
        Utils.on(document, 'mousedown', () => this.follower.classList.add('click'));
        Utils.on(document, 'mouseup', () => this.follower.classList.remove('click'));
    }

    animate() {
        this.pos.x = Utils.lerp(this.pos.x, this.mouse.x, this.speed);
        this.pos.y = Utils.lerp(this.pos.y, this.mouse.y, this.speed);

        this.follower.style.left = `${this.pos.x}px`;
        this.follower.style.top = `${this.pos.y}px`;

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// PARTICLES BACKGROUND
// ============================================
class Particles {
    constructor() {
        this.container = Utils.$('#particles');
        this.init();
    }

    init() {
        if (!this.container) return;

        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Utils.random(2, 6);
        const posX = Utils.random(0, 100);
        const duration = Utils.random(10, 25);
        const delay = Utils.random(0, 15);
        const opacity = Utils.random(0.2, 0.6);

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${opacity};
        `;

        this.container.appendChild(particle);
    }
}

// ============================================
// NAVIGATION
// ============================================
class Navigation {
    constructor() {
        this.navbar = Utils.$('#navbar');
        this.navToggle = Utils.$('#nav-toggle');
        this.navMenu = Utils.$('#nav-menu');
        this.navLinks = Utils.$$('.nav-link');
        this.overlay = Utils.$('#mobile-overlay');
        this.sections = Utils.$$('section[id]');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        // Scroll event
        Utils.on(window, 'scroll', Utils.throttle(() => this.onScroll(), 100));

        // Mobile toggle
        Utils.on(this.navToggle, 'click', () => this.toggleMenu());
        Utils.on(this.overlay, 'click', () => this.closeMenu());

        // Smooth scroll
        this.navLinks.forEach(link => {
            Utils.on(link, 'click', (e) => this.smoothScroll(e, link));
        });

        // Close menu on escape
        Utils.on(document, 'keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });

        // Initial check
        this.onScroll();
    }

    onScroll() {
        const scrollY = window.scrollY;

        // Add scrolled class
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        // Update active link
        this.updateActiveLink();

        this.lastScroll = scrollY;
    }

    updateActiveLink() {
        const scrollY = window.scrollY;
        
        this.sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    toggleMenu() {
        this.navToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    closeMenu() {
        this.navToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    smoothScroll(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = Utils.$(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        this.closeMenu();
    }
}

// ============================================
// TYPING EFFECT
// ============================================
class TypingEffect {
    constructor() {
        this.element = Utils.$('#typed-text');
        this.texts = CONFIG.typing.texts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (!this.element) return;
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? CONFIG.typing.deleteSpeed : CONFIG.typing.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = CONFIG.typing.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// COUNTER ANIMATION
// ============================================
class CounterAnimation {
    constructor() {
        this.counters = Utils.$$('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        if (this.counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateCounters();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = Utils.$('.hero-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateCounters() {
        this.counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
    constructor() {
        this.elements = Utils.$$('.animate-on-scroll');
        this.skillCards = Utils.$$('.skill-card');
        this.init();
    }

    init() {
        if (this.elements.length === 0) return;

        const observerOptions = {
            threshold: CONFIG.animation.threshold,
            rootMargin: CONFIG.animation.rootMargin
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Animate skill bars
                    if (entry.target.classList.contains('skill-category')) {
                        const skillCards = entry.target.querySelectorAll('.skill-card');
                        skillCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('animated');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// PROJECT FILTERS
// ============================================
class ProjectFilters {
    constructor() {
        this.filterBtns = Utils.$$('.filter-btn');
        this.projectCards = Utils.$$('.project-card');
        this.init();
    }

    init() {
        if (this.filterBtns.length === 0) return;

        this.filterBtns.forEach(btn => {
            Utils.on(btn, 'click', () => this.filterProjects(btn));
        });
    }

    filterProjects(activeBtn) {
        const filter = activeBtn.getAttribute('data-filter');

        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');

        // Filter projects with animation
        this.projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================
class ContactForm {
    constructor() {
        this.form = Utils.$('#contact-form');
        this.submitBtn = Utils.$('#submit-btn');
        this.formStatus = Utils.$('#form-status');
        this.init();
    }

    init() {
        if (!this.form) return;

        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(CONFIG.emailJS.publicKey);
        }

        Utils.on(this.form, 'submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('.form-input');
        inputs.forEach(input => {
            Utils.on(input, 'blur', () => this.validateField(input));
            Utils.on(input, 'input', () => this.clearError(input));
        });
    }

    validateField(input) {
        const name = input.name;
        const value = input.value.trim();
        const errorElement = Utils.$(`#${name}-error`);

        let error = '';

        switch (name) {
            case 'name':
                if (!value) {
                    error = 'Name is required';
                } else if (value.length < 2) {
                    error = 'Name must be at least 2 characters';
                }
                break;
            case 'email':
                if (!value) {
                    error = 'Email is required';
                } else if (!Utils.isValidEmail(value)) {
                    error = 'Please enter a valid email';
                }
                break;
            case 'message':
                if (!value) {
                    error = 'Message is required';
                } else if (value.length < 10) {
                    error = 'Message must be at least 10 characters';
                }
                break;
        }

        if (errorElement) {
            errorElement.textContent = error;
        }

        if (error) {
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        return !error;
    }

    clearError(input) {
        const errorElement = Utils.$(`#${input.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        input.classList.remove('error');
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('.form-input[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showToast('error', 'Validation Error', 'Please fill in all required fields correctly.');
            return;
        }

        this.setLoading(true);

        const formData = new FormData(this.form);
        const data = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject') || 'Portfolio Contact',
            message: formData.get('message'),
            to_email: 'durgesharma1208@gmail.com'
        };

        try {
            // If EmailJS is configured
            if (typeof emailjs !== 'undefined' && CONFIG.emailJS.serviceID !== 'YOUR_SERVICE_ID') {
                await emailjs.send(
                    CONFIG.emailJS.serviceID,
                    CONFIG.emailJS.templateID,
                    data
                );
            } else {
                // Simulate sending for demo
                await Utils.sleep(2000);
            }

            this.showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            this.showToast('success', 'Success!', 'Your message has been sent successfully.');
            this.form.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            this.showStatus('error', 'Failed to send message. Please try again or email directly.');
            this.showToast('error', 'Error', 'Failed to send message. Please try again.');
        }

        this.setLoading(false);
    }

    setLoading(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showStatus(type, message) {
        this.formStatus.className = `form-status ${type}`;
        this.formStatus.querySelector('.status-text').textContent = message;
        
        setTimeout(() => {
            this.formStatus.className = 'form-status';
        }, 5000);
    }

    showToast(type, title, message) {
        const toastContainer = Utils.$('#toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            </div>
            <div class="toast-content">
                <span class="toast-title">${title}</span>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Close button
        const closeBtn = toast.querySelector('.toast-close');
        Utils.on(closeBtn, 'click', () => this.removeToast(toast));

        // Auto remove after 5 seconds
        setTimeout(() => this.removeToast(toast), 5000);
    }

    removeToast(toast) {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================
class BackToTop {
    constructor() {
        this.button = Utils.$('#back-to-top');
        this.progressCircle = Utils.$('.progress-ring-circle');
        this.init();
    }

    init() {
        if (!this.button) return;

        Utils.on(window, 'scroll', Utils.throttle(() => this.onScroll(), 100));
        Utils.on(this.button, 'click', (e) => this.scrollToTop(e));
    }

    onScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollY / docHeight) * 100;

        // Show/hide button
        if (scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }

        // Update progress ring
        if (this.progressCircle) {
            const circumference = 125.6; // 2 * PI * 20
            const offset = circumference - (scrollPercent / 100) * circumference;
            this.progressCircle.style.strokeDashoffset = offset;
        }
    }

    scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ============================================
// SMOOTH SCROLL FOR ALL ANCHOR LINKS
// ============================================
class SmoothScroll {
    constructor() {
        this.links = Utils.$$('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            Utils.on(link, 'click', (e) => {
                const href = link.getAttribute('href');
                if (href.length > 1) {
                    e.preventDefault();
                    const target = Utils.$(href);
                    if (target) {
                        const offsetTop = target.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }
}

// ============================================
// IMAGE LAZY LOADING
// ============================================
class LazyLoad {
    constructor() {
        this.images = Utils.$$('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// ============================================
// TILT EFFECT
// ============================================
class TiltEffect {
    constructor() {
        this.cards = Utils.$$('.project-card, .skill-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            Utils.on(card, 'mousemove', (e) => this.handleMove(e, card));
            Utils.on(card, 'mouseleave', () => this.handleLeave(card));
        });
    }

    handleMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }

    handleLeave(card) {
        card.style.transform = '';
    }
}

// ============================================
// RIPPLE EFFECT
// ============================================
class RippleEffect {
    constructor() {
        this.buttons = Utils.$$('.btn, .filter-btn, .project-btn');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.classList.add('ripple');
            Utils.on(btn, 'click', (e) => this.createRipple(e, btn));
        });
    }

    createRipple(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
class MagneticButtons {
    constructor() {
        this.buttons = Utils.$$('.btn-primary, .social-link');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.classList.add('magnetic-btn');
            Utils.on(btn, 'mousemove', (e) => this.handleMove(e, btn));
            Utils.on(btn, 'mouseleave', () => this.handleLeave(btn));
        });
    }

    handleMove(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }

    handleLeave(button) {
        button.style.transform = '';
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================
class ParallaxEffect {
    constructor() {
        this.elements = Utils.$$('.gradient-orb');
        this.init();
    }

    init() {
        Utils.on(window, 'scroll', Utils.throttle(() => this.onScroll(), 50));
    }

    onScroll() {
        const scrollY = window.scrollY;

        this.elements.forEach((el, index) => {
            const speed = 0.05 * (index + 1);
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
}

// ============================================
// CURRENT YEAR
// ============================================
class CurrentYear {
    constructor() {
        this.element = Utils.$('#current-year');
        this.init();
    }

    init() {
        if (this.element) {
            this.element.textContent = new Date().getFullYear();
        }
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
class KeyboardNavigation {
    constructor() {
        this.init();
    }

    init() {
        Utils.on(document, 'keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = Utils.$('#nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                Utils.$('#nav-toggle').click();
            }
        }

        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
class PerformanceOptimization {
    constructor() {
        this.init();
    }

    init() {
        // Passive event listeners
        this.addPassiveListeners();
        
        // Reduce animations on low-end devices
        this.checkReducedMotion();
    }

    addPassiveListeners() {
        // Add passive flag to scroll and touch events
        const options = { passive: true };
        
        Utils.on(window, 'scroll', () => {}, options);
        Utils.on(window, 'touchstart', () => {}, options);
        Utils.on(window, 'touchmove', () => {}, options);
    }

    checkReducedMotion() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }
}

// ============================================
// RESUME DOWNLOAD
// ============================================
// ============================================
// RESUME DOWNLOAD
// ============================================
class ResumeDownload {
    constructor() {
        this.buttons = Utils.$$('#resumeBtn, #downloadCV');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            Utils.on(btn, 'click', (e) => {
                e.preventDefault();
                
                // ============================================
                // CHANGE THE FILE NAME BELOW TO YOUR RESUME
                // ============================================
                const resumeFileName = 'Durgesh_Sharma_Resume.pdf';
                // ============================================
                
                // Create and trigger download
                const link = document.createElement('a');
                link.href = resumeFileName;
                link.download = resumeFileName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Show success message
                const toastContainer = Utils.$('#toast-container');
                if (toastContainer) {
                    const toast = document.createElement('div');
                    toast.className = 'toast success';
                    toast.innerHTML = `
                        <div class="toast-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="toast-content">
                            <span class="toast-title">Download Started!</span>
                            <span class="toast-message">Your resume is being downloaded.</span>
                        </div>
                        <button class="toast-close">
                            <i class="fas fa-times"></i>
                        </button>
                    `;

                    toastContainer.appendChild(toast);

                    const closeBtn = toast.querySelector('.toast-close');
                    Utils.on(closeBtn, 'click', () => {
                        toast.classList.add('hiding');
                        setTimeout(() => toast.remove(), 300);
                    });

                    setTimeout(() => {
                        if (toast.parentNode) {
                            toast.classList.add('hiding');
                            setTimeout(() => toast.remove(), 300);
                        }
                    }, 4000);
                }
            });
        });
    }
}

// ============================================
// SCROLL PROGRESS
// ============================================
class ScrollProgress {
    constructor() {
        this.createProgressBar();
        this.init();
    }

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
        
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background: transparent;
                z-index: 9999;
            }
            .scroll-progress-bar {
                height: 100%;
                width: 0%;
                background: linear-gradient(135deg, #00d4ff, #7c3aed);
                transition: width 0.1s ease;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(progressBar);
        
        this.progressBar = progressBar.querySelector('.scroll-progress-bar');
    }

    init() {
        Utils.on(window, 'scroll', Utils.throttle(() => this.updateProgress(), 50));
    }

    updateProgress() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;
        
        if (this.progressBar) {
            this.progressBar.style.width = `${progress}%`;
        }
    }
}

// ============================================
// HERO IMAGE FALLBACK
// ============================================
class HeroImageFallback {
    constructor() {
        this.images = Utils.$$('img[src="durgeshimage"]');
        this.init();
    }

    init() {
        this.images.forEach(img => {
            img.onerror = () => this.handleError(img);
            
            // Create fallback content
            if (!img.complete || img.naturalWidth === 0) {
                this.handleError(img);
            }
        });
    }

    handleError(img) {
        const wrapper = img.parentElement;
        if (wrapper) {
            wrapper.innerHTML = `
                <div class="image-fallback" style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #1a1a24, #12121a);
                    border-radius: inherit;
                ">
                    <span style="
                        font-size: 5rem;
                        font-weight: 800;
                        background: linear-gradient(135deg, #00d4ff, #7c3aed);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    ">DS</span>
                </div>
            `;
        }
    }
}

// ============================================
// THEME PERSISTENCE (Optional Dark/Light)
// ============================================
class ThemePersistence {
    constructor() {
        // Currently dark theme only, but structure for future light theme
        this.init();
    }

    init() {
        // Set theme attribute
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
class ConsoleEasterEgg {
    constructor() {
        this.init();
    }

    init() {
        const styles = [
            'color: #00d4ff',
            'background: #0a0a0f',
            'font-size: 14px',
            'padding: 10px 20px',
            'border-radius: 5px',
            'font-weight: bold'
        ].join(';');

        console.log('%c👋 Hey there, curious developer!', styles);
        console.log('%c🚀 This portfolio was crafted with passion by Durgesh Sharma', styles);
        console.log('%c💼 Looking to hire? Email: durgesharma1208@gmail.com', styles);
        console.log('%c🔗 GitHub: https://github.com/durgesharma1208', styles);
        console.log('%c📱 LinkedIn: https://www.linkedin.com/in/durgesh-sharma-64260b33b', styles);
    }
}

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================
class AnalyticsTracking {
    constructor() {
        this.init();
    }

    init() {
        // Track page views
        this.trackPageView();
        
        // Track section views
        this.trackSectionViews();
        
        // Track button clicks
        this.trackClicks();
    }

    trackPageView() {
        // Placeholder for analytics integration
        console.log('Page view tracked');
    }

    trackSectionViews() {
        const sections = Utils.$$('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    console.log(`Section viewed: ${sectionId}`);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
    }

    trackClicks() {
        const trackedElements = Utils.$$('[data-track]');
        
        trackedElements.forEach(el => {
            Utils.on(el, 'click', () => {
                const trackValue = el.dataset.track;
                console.log(`Click tracked: ${trackValue}`);
            });
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initModules());
        } else {
            this.initModules();
        }
    }

    initModules() {
        try {
            // Core modules
            new Preloader();
            new CustomCursor();
            new Particles();
            new Navigation();
            new TypingEffect();
            new CounterAnimation();
            new ScrollAnimations();
            new ProjectFilters();
            new ContactForm();
            new BackToTop();
            new SmoothScroll();
            new LazyLoad();
            new CurrentYear();
            new KeyboardNavigation();
            new PerformanceOptimization();
            new ResumeDownload();
            new ScrollProgress();
            new HeroImageFallback();
            new ThemePersistence();
            new ConsoleEasterEgg();
            
            // Optional enhancements
            if (window.innerWidth > 768) {
                new TiltEffect();
                new MagneticButtons();
                new ParallaxEffect();
            }
            
            new RippleEffect();
            
            console.log('✅ Portfolio initialized successfully!');
            
        } catch (error) {
            console.error('❌ Error initializing portfolio:', error);
        }
    }
}

// Start the application
new App();

// ============================================
// SERVICE WORKER REGISTRATION (Optional PWA)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('ServiceWorker registration failed:', error);
        //     });
    });
}

// ============================================
// GLOBAL ERROR HANDLER
// ============================================
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error:', { message, source, lineno, colno, error });
    return false;
};

// ============================================
// UNHANDLED PROMISE REJECTION HANDLER
// ============================================
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// ============================================
// END OF SCRIPT
// ============================================
