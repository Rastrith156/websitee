// ===== SMOOTH SCROLLING & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
    const name = form.querySelector('input[placeholder="Your Name"]') || form.querySelector('input[placeholder="Full Name"]');
    const email = form.querySelector('input[placeholder="Your Email"], input[placeholder="Email Address"]');
    const message = form.querySelector('textarea');

    if (!name?.value || !email?.value || !message?.value) {
        alert('Please fill in all fields');
        return;
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.textContent = '✓ Message Sent!';
    button.style.background = '#22c55e';

    // Reset form
    form.reset();

    // Restore button after 3 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 3000);
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

// ===== HEADER HIDE/SHOW ON SCROLL =====
const header = document.querySelector('.header-assembly');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 150) { // Scrolling Down and past the header
        header.classList.add('header-hidden');
    } else { // Scrolling Up
        header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);
