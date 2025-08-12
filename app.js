// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initScrollReveal();
    initSmoothScrolling();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('show');
            }
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Header background on scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.backgroundColor = 'rgba(31, 33, 33, 0.98)';
            } else {
                header.style.backgroundColor = 'rgba(31, 33, 33, 0.95)';
            }
        });
    }

    // Active section highlighting
    window.addEventListener('scroll', updateActiveSection);
}

// Smooth scrolling for all navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link');
    const heroButtons = document.querySelectorAll('.hero__buttons .btn');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });
    
    // Handle hero section buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                scrollToSection(href);
            }
        });
    });
}

// Scroll to section function
function scrollToSection(targetId) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const headerHeight = 70;
        const offsetTop = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations and reveals
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.classList.contains('skills__category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll reveal
    const revealElements = document.querySelectorAll('.skills__category, .project__card, .timeline__item, .achievement__item');
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Skill bar animations
function initSkillBars() {
    const skillsSection = document.getElementById('skills');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                setTimeout(() => {
                    animateAllSkillBars();
                }, 500);
            }
        });
    }, { threshold: 0.3 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

function animateAllSkillBars() {
    const skillItems = document.querySelectorAll('.skill__item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
            const progressBar = item.querySelector('.skill__progress');
            if (progressBar) {
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
        }, index * 200);
    });
}

function animateSkillBars(category) {
    const skillItems = category.querySelectorAll('.skill__item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animate');
            const progressBar = item.querySelector('.skill__progress');
            if (progressBar) {
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
        }, index * 150);
    });
}

// Scroll reveal functionality
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.fade-in');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Add staggered animation delays to timeline items
    const timelineItems = document.querySelectorAll('.timeline__item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });

    // Add staggered animation delays to project cards
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Add staggered animation delays to achievement items
    const achievementItems = document.querySelectorAll('.achievement__item');
    achievementItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add input validation and styling
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.classList.remove('error');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Validate form
    const isValid = validateForm(form);
    
    if (isValid) {
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
            // Remove focused class from form groups
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });
            
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    } else {
        showNotification('Please fill in all required fields correctly.', 'error');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}

function validateForm(form) {
    const inputs = form.querySelectorAll('.form-control[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Add error styling if invalid
    if (!isValid) {
        field.classList.add('error');
        field.title = errorMessage;
    } else {
        field.title = '';
    }
    
    return isValid;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const iconClass = type === 'success' ? 'check-circle' : 
                     type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${iconClass}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Apply styles programmatically
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-card-border)',
        borderRadius: 'var(--radius-base)',
        padding: 'var(--space-16)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '1000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-12)'
    });
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderLeft = '4px solid var(--color-success)';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid var(--color-error)';
    } else {
        notification.style.borderLeft = '4px solid var(--color-info)';
    }
    
    // Style the content
    const content = notification.querySelector('.notification__content');
    Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-12)'
    });
    
    // Style the close button
    const closeButton = notification.querySelector('.notification__close');
    Object.assign(closeButton.style, {
        background: 'none',
        border: 'none',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        padding: 'var(--space-4)',
        borderRadius: '50%',
        transition: 'all 0.2s ease'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    closeButton.addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Hover effect for close button
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.background = 'var(--color-secondary)';
        closeButton.style.color = 'var(--color-text)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.background = 'none';
        closeButton.style.color = 'var(--color-text-secondary)';
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    if (notification && notification.parentNode) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            if (navToggle) {
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
        
        // Close notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            closeNotification(notification);
        }
    }
});

// Performance optimization
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

// Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    updateActiveSection();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize on page load
window.addEventListener('load', function() {
    // Ensure all animations are ready
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add error styling for form validation
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-control.error {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1) !important;
    }
    
    .form-control.error:focus {
        border-color: var(--color-error) !important;
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.2) !important;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        html {
            scroll-behavior: auto !important;
        }
    }
`;

document.head.appendChild(errorStyles);