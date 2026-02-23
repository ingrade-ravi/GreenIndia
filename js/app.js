'use strict';

// ============================================
// GREENER INDIA - Main App Initialization
// ============================================

(function() {
    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initTheme();
        initNavigation();
        initSmoothScroll();
        initParticles();
    }

    // ============================================
    // Theme Management
    // ============================================

    function initTheme() {
        const themeToggle = document.querySelector('.theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        const html = document.documentElement;
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme, themeIcon);

        // Theme toggle handler
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                // Disable transitions temporarily for smooth theme switch
                html.classList.add('no-transition');
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(newTheme, themeIcon);
                
                setTimeout(() => {
                    html.classList.remove('no-transition');
                }, 300);
            });
        }
    }

    function updateThemeIcon(theme, iconElement) {
        if (iconElement) {
            iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // ============================================
    // Navigation
    // ============================================

    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ============================================
    // Smooth Scroll for CTA Buttons
    // ============================================

    function initSmoothScroll() {
        const ctaButtons = document.querySelectorAll('[data-scroll]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-scroll');
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                } else if (targetId === 'chatbot') {
                    // Open chatbot if it's the target
                    const chatbotBubble = document.getElementById('chatbot-bubble');
                    if (chatbotBubble) {
                        chatbotBubble.click();
                    }
                }
            });
        });
    }

    // ============================================
    // Hero Particle Background
    // ============================================

    function initParticles() {
        const particleField = document.querySelector('.particle-field');
        if (!particleField) return;

        // Create floating leaf particles
        for (let i = 0; i < 15; i++) {
            createParticle(particleField);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random size and position
        const size = Math.random() * 15 + 10;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startX + '%';
        particle.style.top = startY + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        // Create leaf shape using CSS
        particle.style.background = 'var(--color-primary)';
        particle.style.borderRadius = '50% 0 50% 0';
        particle.style.opacity = '0.2';
        particle.style.position = 'absolute';
        particle.style.animation = 'float 20s infinite';
        
        container.appendChild(particle);
    }

    // Export functions for use in other modules
    window.GreenerIndia = window.GreenerIndia || {};
    window.GreenerIndia.App = {
        initTheme,
        initNavigation
    };
})();
