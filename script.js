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
    const statCards = document.querySelectorAll('.stat h3');

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

            // Trigger counter animation when hero section is visible
            if (entry.target.id === 'home' || entry.target.classList.contains('hero-3d')) {
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
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
};

// Initialize hover effects
addHoverEffect();

// ===== BUTTON ANIMATIONS =====
document.querySelectorAll('.cta-button, .submit-btn, .tour-link').forEach(button => {
    button.addEventListener('mousedown', function () {
        this.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', function () {
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

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 150) { // Scrolling Down and past the header
        header.classList.add('header-hidden');
    } else { // Scrolling Up
        header.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}, false);

// ===== PROGRAMS PAGE INTERACTIVITY =====
document.querySelectorAll('.program-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const programName = this.getAttribute('data-program') || this.querySelector('span').textContent;
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

// ===== CHATBOT WIDGET LOGIC =====
document.addEventListener('DOMContentLoaded', function () {
    const chatToggleBtn = document.getElementById('chat-toggle-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatCloseBtn = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // Toggle Chat Window
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatToggleBtn.style.display = 'none';
        if (chatMessages.children.length === 0) {
            // Initial Greeting
            setTimeout(() => {
                addBotMessage("Hi there! 👋 I'm the DSU Student Assistant. How can I help you today?");
                showOptions(['Find a Program', 'Admissions Info', 'Campus Facilities', 'Contact Us']);
            }, 500);
        }
    });

    // Close Chat Window
    chatCloseBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        setTimeout(() => {
            chatToggleBtn.style.display = 'flex';
        }, 300);
    });

    // Send Message on Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Send Message on Click
    chatSendBtn.addEventListener('click', handleUserMessage);

    function handleUserMessage() {
        const text = chatInput.value.trim();
        if (text) {
            addUserMessage(text);
            chatInput.value = '';
            processUserMessage(text);
        }
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user';
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot';
        msgDiv.innerHTML = text; // Allow HTML for links
        chatMessages.appendChild(msgDiv);
        scrollToBottom();
    }

    function showOptions(options) {
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'chat-options';

        options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = option;
            btn.addEventListener('click', () => {
                addUserMessage(option);
                processUserMessage(option);
            });
            optionsDiv.appendChild(btn);
        });

        chatMessages.appendChild(optionsDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function processUserMessage(text) {
        // Simple keyword matching logic
        const lowerText = text.toLowerCase();

        // Simulate typing delay
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot';
        typingIndicator.innerHTML = '<span style="animation: blink 1s infinite">.</span><span style="animation: blink 1s infinite 0.2s">.</span><span style="animation: blink 1s infinite 0.4s">.</span>';
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();

        setTimeout(() => {
            typingIndicator.remove();

            if (lowerText.includes('program') || lowerText.includes('course') || lowerText.includes('degree')) {
                addBotMessage("We offer a wide range of programs! Are you interested in Undergraduate or Postgraduate studies?");
                showOptions(['Undergraduate', 'Postgraduate', 'PhD Programs']);
            } else if (lowerText.includes('undergraduate') || lowerText.includes('ug')) {
                addBotMessage("Great! Our popular UG programs include B.Tech (CSE, AI & ML, Aerospace), BBA, B.Com, and more. You can view them all in the 'Programs' section.");
                addBotMessage("<a href='#academics' onclick='document.getElementById(\"academics\").scrollIntoView({behavior: \"smooth\"})'>View UG Programs</a>");
            } else if (lowerText.includes('postgraduate') || lowerText.includes('pg') || lowerText.includes('master')) {
                addBotMessage("Excellent choice! We offer M.Tech, MBA, MCA, and M.Sc programs. Check out the details below:");
                addBotMessage("<a href='#academics' onclick='document.getElementById(\"academics\").scrollIntoView({behavior: \"smooth\"})'>View PG Programs</a>");
            } else if (lowerText.includes('admission') || lowerText.includes('apply') || lowerText.includes('fee')) {
                addBotMessage("Admissions for 2025-26 are open! You can apply online or visit our campus.");
                addBotMessage("For fee structure and eligibility, please visit our <a href='https://dsu.edu.in/admission' target='_blank'>Admissions Page</a>.");
                showOptions(['How to Apply?', 'Entrance Exams', 'Contact Admissions']);
            } else if (lowerText.includes('facility') || lowerText.includes('campus') || lowerText.includes('hostel') || lowerText.includes('library')) {
                addBotMessage("Our campus features state-of-the-art facilities including modern labs, a comprehensive library, sports complex, and comfortable hostels.");
                addBotMessage("<a href='#facilities' onclick='document.getElementById(\"facilities\").scrollIntoView({behavior: \"smooth\"})'>Explore Facilities</a>");
            } else if (lowerText.includes('contact') || lowerText.includes('phone') || lowerText.includes('email') || lowerText.includes('address')) {
                addBotMessage("You can reach us at:<br>📞 080 46461800<br>📧 admissions@dsu.edu.in<br>📍 Main Campus: Harohalli, Kanakapura Road");
                addBotMessage("<a href='#contact' onclick='document.getElementById(\"contact\").scrollIntoView({behavior: \"smooth\"})'>Go to Contact Section</a>");
            } else if (lowerText.includes('exam') || lowerText.includes('test')) {
                addBotMessage("We accept scores from CET, COMED-K, PGCET, and our own DSAT. Do you need specific codes?");
                showOptions(['Yes, show codes', 'No, thanks']);
            } else if (lowerText.includes('code')) {
                addBotMessage("Here are the important codes:<br>CET (B.Tech): E240<br>Comed-K: E182<br>PGCET (MBA): B365MB");
            } else {
                addBotMessage("I'm not sure I understood that completely. Could you try one of these options?");
                showOptions(['Find a Program', 'Admissions Info', 'Campus Facilities', 'Contact Us']);
            }
        }, 1000);
    }
});