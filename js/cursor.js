'use strict';

// ============================================
// GREENER INDIA - Custom Cursor
// ============================================

(function() {
    let cursorOuter, cursorInner, particlesContainer;
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let isHovering = false;

    // Initialize cursor
    function init() {
        // Check if touch device
        if (window.matchMedia('(pointer: coarse)').matches) {
            return; // Don't initialize custom cursor on touch devices
        }

        cursorOuter = document.querySelector('.cursor-outer');
        cursorInner = document.querySelector('.cursor-inner');
        particlesContainer = document.querySelector('.cursor-particles');

        if (!cursorOuter || !cursorInner) return;

        // Track mouse movement
        document.addEventListener('mousemove', handleMouseMove);
        
        // Track clicks for particle effects
        document.addEventListener('click', handleClick);
        
        // Track hover states
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [data-tilt], .calculator-card, .action-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                el.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                isHovering = false;
                el.classList.remove('cursor-hover');
            });
        });

        // Start animation loop
        animateCursor();
    }

    function handleMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Inner cursor snaps instantly
        if (cursorInner) {
            cursorInner.style.left = mouseX + 'px';
            cursorInner.style.top = mouseY + 'px';
        }
    }

    function animateCursor() {
        // Smooth follow for outer cursor using lerp
        const lerp = 0.15; // Lower = more lag
        outerX += (mouseX - outerX) * lerp;
        outerY += (mouseY - outerY) * lerp;

        if (cursorOuter) {
            cursorOuter.style.left = outerX + 'px';
            cursorOuter.style.top = outerY + 'px';
        }

        requestAnimationFrame(animateCursor);
    }

    function handleClick(e) {
        if (!particlesContainer) return;

        // Create particle burst effect
        const particleCount = 8;
        const colors = ['#4CAF76', '#2ECC71', '#F5C842'];

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                createParticle(e.clientX, e.clientY, colors[Math.floor(Math.random() * colors.length)]);
            }, i * 20);
        }
    }

    function createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;

        // Random direction
        const angle = (Math.PI * 2 * Math.random());
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        particlesContainer.appendChild(particle);

        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 600);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export for external use
    window.GreenerIndia = window.GreenerIndia || {};
    window.GreenerIndia.Cursor = {
        createParticle
    };
})();
