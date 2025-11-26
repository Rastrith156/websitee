// ===== SMOOTH SCROLLING & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
        });
    });
}

// ===== COUNTER ANIMATION FOR STATISTICS =====
const animateCounters = () => {
    const statCards = document.querySelectorAll('.stat-card h3');

    statCards.forEach(card => {
        const target = parseInt(card.getAttribute('data-target'));
        const increment = Math.ceil(target / 100);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                card.textContent = current;
                setTimeout(updateCounter, 30);
            } else {
                card.textContent = target;
            }
        };

        updateCounter();
    });
};

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';

            // Trigger counter animation when statistics section is visible
            if (entry.target.classList.contains('statistics')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ===== FORM VALIDATION & SUBMISSION =====
const handleFormSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('input[placeholder="Your Full Name"], input[placeholder="Full Name"], input[placeholder="Your Name"]');
    const email = form.querySelector('input[type="email"], input[placeholder*="Email"]');
    const message = form.querySelector('textarea');

    if (!name || !email || !message || !name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert('Please fill out all required fields.');
        return;
    }

    const emailValue = email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        alert('Please enter a valid email address.');
        return;
    }

    form.reset();
    alert('Your message has been sent. Thank you!');
};

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
});

// ===== PARALLAX EFFECT =====
let ticking = false;

const handleParallax = () => {
    const parallaxElements = document.querySelectorAll('[class*="advanced"]');

    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;

        if (scrollPosition + window.innerHeight > elementOffset) {
            const yPos = (scrollPosition - elementOffset) * 0.5;
            if (element.style.backgroundImage) {
                element.style.backgroundPosition = `center ${yPos}px`;
            }
        }
    });

    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleParallax);
        ticking = true;
    }
});

// ===== HOVER EFFECTS FOR CARDS =====
const addHoverEffect = () => {
    const cards = document.querySelectorAll('.academic-card, .facility-item, .contact-box');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
};

// Initialize hover effects
addHoverEffect();

// ===== BUTTON ANIMATIONS =====
document.querySelectorAll('.cta-button, .submit-btn, .tour-link').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';

    // Animate hero content on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'slideUp 0.8s ease-out';
    }
});

// ===== DARK MODE TOGGLE (Optional) =====
const initDarkMode = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkMode && !localStorage.getItem('darkMode')) {
        localStorage.setItem('darkMode', 'true');
    }

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
};

initDarkMode();

// ===== ACTIVE NAV LINK INDICATOR =====
const updateActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('.main-nav a');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    });
};

updateActiveNavLink();

// ===== PRELOAD IMAGES =====
const preloadImages = () => {
    const images = [
        'https://dsu.edu.in/images/logo_white.png'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

preloadImages();

console.log('Dayananda Sagar University Website - Loaded Successfully! ✓');

// ===== HEADER & ANNOUNCEMENT HIDE/SHOW ON SCROLL (rAF throttle) =====
const header = document.querySelector('.header-assembly');
const announcement = document.querySelector('.announcement-bar');
const bodyEl = document.body;
let lastScroll = 0;
let scrollTicking = false;
const hideThreshold = 50;
const originalBodyPaddingTop = parseInt(getComputedStyle(bodyEl).paddingTop, 10) || 160;

function updateHeaderVisibility() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

    // Scrolling down -> hide
    if (scrollTop > lastScroll && scrollTop > hideThreshold) {
        if (header) header.classList.add('header-hidden');
        if (announcement && !announcement.classList.contains('announcement-hidden')) {
            announcement.classList.add('announcement-hidden');
            // adjust body padding so content doesn't jump
            bodyEl.style.paddingTop = Math.max(0, originalBodyPaddingTop - announcement.offsetHeight) + 'px';
        }
    } else { // Scrolling up -> show
        if (header) header.classList.remove('header-hidden');
        if (announcement && announcement.classList.contains('announcement-hidden')) {
            announcement.classList.remove('announcement-hidden');
            bodyEl.style.paddingTop = originalBodyPaddingTop + 'px';
        }
    }

    lastScroll = Math.max(0, scrollTop);
    scrollTicking = false;
}

window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        scrollTicking = true;
    }
}, { passive: true });

// ===== PROGRAMS PAGE INTERACTIVITY =====
document.querySelectorAll('.program-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const programName = this.getAttribute('data-program');
        showProgramNotification(programName);
    });
    btn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') btn.click();
    });
});

function showProgramNotification(programName) {
    const existingToast = document.querySelector('.program-toast');
    if (existingToast) existingToast.remove();
    const toast = document.createElement('div');
    toast.className = 'program-toast';
    toast.innerHTML = `<span class="toast-icon">✓</span><span class="toast-text">Exploring: <strong>${programName}</strong></span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

const programToastStyle = document.createElement('style');
programToastStyle.innerHTML = `
    .program-toast {
        position: fixed; bottom: 20px; right: 20px;
        background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
        color: white; padding: 14px 20px; border-radius: 8px;
        display: flex; align-items: center; gap: 10px;
        font-size: 14px; font-weight: 500;
        box-shadow: 0 8px 24px rgba(0, 102, 204, 0.35);
        opacity: 0; transform: translateX(400px) translateY(100px);
        transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1); z-index: 2000;
    }
    .program-toast.show { opacity: 1; transform: translateX(0) translateY(0); }
    .toast-icon {
        display: flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; background-color: rgba(255,255,255,0.2);
        border-radius: 50%; font-size: 12px; font-weight: bold;
    }
    .toast-text { white-space: nowrap; flex: 1; }
    @media (max-width: 600px) {
        .program-toast { bottom: 10px; right: 10px; left: 10px; padding: 12px 16px; font-size: 13px; }
    }
`;
document.head.appendChild(programToastStyle);
