'use strict';

// ============================================
// GREENER INDIA - Scroll Animations & Interactions
// ============================================

(function() {
    let observer;

    function init() {
        initScrollAnimations();
        initFillInBlanks();
        initActionCards();
        initPledge();
    }

    // ============================================
    // Scroll Animations with IntersectionObserver
    // ============================================

    function initScrollAnimations() {
        // Create observer
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('calculator-card')) {
                        animateCard(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections and cards
        const sections = document.querySelectorAll('.section');
        const cards = document.querySelectorAll('.calculator-card, .action-card, .question-card');
        
        sections.forEach(section => observer.observe(section));
        cards.forEach(card => observer.observe(card));
    }

    function animateCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    // ============================================
    // Fill-in-the-Blanks Learning Section
    // ============================================

    const LEARN_QUESTIONS = [
        {
            question: 'The main greenhouse gas released by vehicles is ___.',
            answer: 'carbon dioxide',
            explanation: 'Carbon dioxide (CO₂) is the primary greenhouse gas emitted by vehicles. It traps heat in the atmosphere, contributing to climate change.'
        },
        {
            question: 'The river most affected by plastic pollution in India is ___.',
            answer: 'ganga',
            explanation: 'The Ganga (Ganges) river faces severe plastic pollution, with millions of tonnes of waste entering it annually.'
        },
        {
            question: 'Solar energy is a ___ energy source.',
            answer: 'renewable',
            explanation: 'Solar energy is renewable because it comes from the sun, which will continue to shine for billions of years.'
        },
        {
            question: 'LED bulbs use ___% less energy than traditional bulbs.',
            answer: '80',
            explanation: 'LED bulbs are highly energy-efficient, using about 80% less electricity than incandescent bulbs while lasting much longer.'
        },
        {
            question: 'Composting helps reduce ___ waste.',
            answer: 'organic',
            explanation: 'Composting turns organic waste (like kitchen scraps) into nutrient-rich soil, reducing landfill waste.'
        },
        {
            question: 'Public transport can reduce emissions by up to ___%.',
            answer: '70',
            explanation: 'Using buses and metros instead of private vehicles can reduce carbon emissions by 70% or more per passenger.'
        }
    ];

    let currentLearnIndex = 0;
    let learnScore = 0;

    function initFillInBlanks() {
        const checkBtn = document.getElementById('learn-check');
        const nextBtn = document.getElementById('learn-next');
        const answerInput = document.getElementById('learn-answer');

        if (!checkBtn) return;

        // Load first question
        loadLearnQuestion();

        checkBtn.addEventListener('click', checkAnswer);
        nextBtn.addEventListener('click', nextQuestion);

        // Allow Enter key to check answer
        if (answerInput) {
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    checkAnswer();
                }
            });
        }
    }

    function loadLearnQuestion() {
        if (currentLearnIndex >= LEARN_QUESTIONS.length) {
            showLearnComplete();
            return;
        }

        const question = LEARN_QUESTIONS[currentLearnIndex];
        const questionText = document.getElementById('learn-question');
        const currentNum = document.getElementById('learn-current');
        const totalNum = document.getElementById('learn-total');
        const answerInput = document.getElementById('learn-answer');
        const feedbackContainer = document.getElementById('learn-feedback');
        const nextBtn = document.getElementById('learn-next');
        const checkBtn = document.getElementById('learn-check');

        if (questionText) questionText.textContent = question.question;
        if (currentNum) currentNum.textContent = currentLearnIndex + 1;
        if (totalNum) totalNum.textContent = LEARN_QUESTIONS.length;
        if (answerInput) {
            answerInput.value = '';
            answerInput.focus();
        }
        if (feedbackContainer) {
            feedbackContainer.classList.remove('show', 'correct', 'incorrect');
            feedbackContainer.textContent = '';
        }
        if (nextBtn) nextBtn.classList.add('hidden');
        if (checkBtn) checkBtn.classList.remove('hidden');

        // Update progress
        updateLearnProgress();
    }

    function checkAnswer() {
        const question = LEARN_QUESTIONS[currentLearnIndex];
        const answerInput = document.getElementById('learn-answer');
        const feedbackContainer = document.getElementById('learn-feedback');
        const checkBtn = document.getElementById('learn-check');
        const nextBtn = document.getElementById('learn-next');

        if (!answerInput || !feedbackContainer) return;

        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = question.answer.toLowerCase();

        // Check if answer is correct (allow partial matches)
        const isCorrect = userAnswer === correctAnswer || 
                         correctAnswer.includes(userAnswer) || 
                         userAnswer.includes(correctAnswer);

        feedbackContainer.textContent = question.explanation;
        feedbackContainer.classList.add('show');

        if (isCorrect) {
            feedbackContainer.classList.add('correct');
            feedbackContainer.classList.remove('incorrect');
            learnScore++;
            
            // Confetti effect
            createConfetti();
        } else {
            feedbackContainer.classList.add('incorrect');
            feedbackContainer.classList.remove('correct');
            
            // Shake animation
            if (answerInput) {
                answerInput.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    answerInput.style.animation = '';
                }, 500);
            }
        }

        if (checkBtn) checkBtn.classList.add('hidden');
        if (nextBtn) nextBtn.classList.remove('hidden');
    }

    function nextQuestion() {
        currentLearnIndex++;
        loadLearnQuestion();
    }

    function updateLearnProgress() {
        const progress = ((currentLearnIndex) / LEARN_QUESTIONS.length) * 100;
        const progressFill = document.getElementById('learn-progress');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    }

    function showLearnComplete() {
        const container = document.querySelector('.learn-container');
        if (container) {
            container.innerHTML = `
                <div class="quiz-score">
                    <div class="score-badge">🌿</div>
                    <h2 class="score-message">Great Learning!</h2>
                    <p>You completed all ${LEARN_QUESTIONS.length} questions!</p>
                    <button class="retake-btn" onclick="location.reload()">Start Over</button>
                </div>
            `;
        }
    }

    function createConfetti() {
        const confettiContainer = document.querySelector('.learn-container');
        if (!confettiContainer) return;

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'confetti-particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = '0';
                particle.style.background = ['#4CAF76', '#2ECC71', '#F5C842'][Math.floor(Math.random() * 3)];
                particle.style.animationDelay = Math.random() * 0.5 + 's';
                
                confettiContainer.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 3000);
            }, i * 50);
        }
    }

    // ============================================
    // Action Cards Flip Effect
    // ============================================

    function initActionCards() {
        const actionCards = document.querySelectorAll('[data-flip]');
        
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }

    // ============================================
    // Green Pledge
    // ============================================

    function initPledge() {
        const submitBtn = document.getElementById('pledge-submit');
        const overlay = document.getElementById('pledge-overlay');
        const closeOverlayBtn = document.getElementById('close-overlay');
        const checkboxes = document.querySelectorAll('.pledge-checkbox');

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                const checked = Array.from(checkboxes).filter(cb => cb.checked);
                
                if (checked.length === 0) {
                    alert('Please select at least one pledge!');
                    return;
                }

                // Save to localStorage
                localStorage.setItem('greenPledge', JSON.stringify({
                    items: checked.map(cb => cb.value),
                    date: new Date().toISOString()
                }));

                showPledgeSuccess();
            });
        }

        if (closeOverlayBtn) {
            closeOverlayBtn.addEventListener('click', () => {
                if (overlay) {
                    overlay.classList.remove('show');
                    setTimeout(() => {
                        overlay.classList.add('hidden');
                    }, 300);
                }
            });
        }
    }

    function showPledgeSuccess() {
        const overlay = document.getElementById('pledge-overlay');
        const confettiContainer = document.getElementById('confetti');

        if (overlay) {
            overlay.classList.remove('hidden');
            setTimeout(() => {
                overlay.classList.add('show');
            }, 10);
        }

        // Create confetti
        if (confettiContainer) {
            createPledgeConfetti(confettiContainer);
        }
    }

    function createPledgeConfetti(container) {
        const leafSymbols = ['🌿', '🍃', '🌱', '🌾'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'confetti-particle';
                particle.textContent = leafSymbols[Math.floor(Math.random() * leafSymbols.length)];
                particle.style.fontSize = '20px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = '-10px';
                particle.style.animation = 'confettiFall ' + (2 + Math.random() * 2) + 's ease forwards';
                particle.style.animationDelay = Math.random() * 0.5 + 's';
                
                container.appendChild(particle);

                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 4000);
            }, i * 30);
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export
    window.GreenerIndia = window.GreenerIndia || {};
    window.GreenerIndia.Animations = {
        initScrollAnimations,
        createConfetti
    };
})();
