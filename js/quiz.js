'use strict';

// ============================================
// GREENER INDIA - Quiz System
// ============================================

(function() {
    const QUIZ_DATA = {
        beginner: {
            title: 'Beginner Green Quiz',
            questions: [
                {
                    question: 'What is the main greenhouse gas released by vehicles?',
                    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'],
                    correct: 1
                },
                {
                    question: 'Which of these is a renewable energy source?',
                    options: ['Coal', 'Solar Power', 'Natural Gas', 'Petroleum'],
                    correct: 1
                },
                {
                    question: 'How can you reduce plastic waste?',
                    options: ['Use single-use bags', 'Carry a reusable bag', 'Buy more bottled water', 'Use disposable cutlery'],
                    correct: 1
                },
                {
                    question: 'What percentage of Earth\'s water is fresh and available?',
                    options: ['50%', '25%', '3%', '10%'],
                    correct: 2
                },
                {
                    question: 'Which action helps reduce carbon footprint?',
                    options: ['Driving alone daily', 'Using public transport', 'Leaving lights on', 'Using AC constantly'],
                    correct: 1
                }
            ]
        },
        habits: {
            title: 'Daily Eco Habits Quiz',
            questions: [
                {
                    question: 'How long should you shower to save water?',
                    options: ['30 minutes', '5-10 minutes', '1 hour', 'As long as you want'],
                    correct: 1
                },
                {
                    question: 'What is the best way to dispose of kitchen waste?',
                    options: ['Throw in regular trash', 'Compost it', 'Burn it', 'Flush it'],
                    correct: 1
                },
                {
                    question: 'When should you turn off electronic devices?',
                    options: ['Never', 'Only at night', 'When not in use', 'Only on weekends'],
                    correct: 2
                },
                {
                    question: 'Which is better for the environment?',
                    options: ['Buying new items frequently', 'Repairing and reusing', 'Throwing away old items', 'Using disposable products'],
                    correct: 1
                },
                {
                    question: 'What helps reduce air pollution?',
                    options: ['Burning waste', 'Using public transport', 'Driving alone', 'Using diesel vehicles'],
                    correct: 1
                }
            ]
        },
        india: {
            title: 'India Environment Quiz',
            questions: [
                {
                    question: 'Which river is most affected by plastic pollution in India?',
                    options: ['Yamuna', 'Ganga', 'Godavari', 'Krishna'],
                    correct: 1
                },
                {
                    question: 'What is the main source of air pollution in Indian cities?',
                    options: ['Factories only', 'Vehicles and industries', 'Natural causes', 'Agriculture only'],
                    correct: 1
                },
                {
                    question: 'Which Indian state has the highest solar power capacity?',
                    options: ['Rajasthan', 'Gujarat', 'Karnataka', 'Tamil Nadu'],
                    correct: 0
                },
                {
                    question: 'What is the main cause of water scarcity in India?',
                    options: ['Lack of rainfall', 'Overuse and pollution', 'Too many rivers', 'High population only'],
                    correct: 1
                },
                {
                    question: 'Which tree is commonly planted in India for environmental benefits?',
                    options: ['Eucalyptus', 'Neem', 'Palm', 'Bamboo'],
                    correct: 1
                }
            ]
        }
    };

    let currentQuiz = null;
    let currentQuestionIndex = 0;
    let score = 0;
    let selectedAnswer = null;

    function init() {
        initQuizTabs();
    }

    function initQuizTabs() {
        const tabs = document.querySelectorAll('.quiz-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const quizType = tab.dataset.quiz;
                startQuiz(quizType);
            });
        });
    }

    function startQuiz(quizType) {
        currentQuiz = QUIZ_DATA[quizType];
        if (!currentQuiz) return;

        currentQuestionIndex = 0;
        score = 0;
        selectedAnswer = null;

        const container = document.getElementById('quiz-container');
        if (container) {
            container.innerHTML = '';
            showQuestion();
        }
    }

    function showQuestion() {
        if (!currentQuiz) return;

        const question = currentQuiz.questions[currentQuestionIndex];
        const container = document.getElementById('quiz-container');

        if (!container || !question) {
            showScore();
            return;
        }

        const questionHTML = `
            <div class="quiz-card">
                <div class="quiz-question-number">Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</div>
                <h3 class="quiz-question">${question.question}</h3>
                <div class="quiz-options">
                    ${question.options.map((option, index) => `
                        <button class="quiz-option" data-index="${index}">${option}</button>
                    `).join('')}
                </div>
            </div>
        `;

        container.innerHTML = questionHTML;

        // Add click handlers
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (selectedAnswer !== null) return; // Already answered

                selectedAnswer = parseInt(option.dataset.index);
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                // Show correct/incorrect
                setTimeout(() => {
                    options.forEach((opt, idx) => {
                        if (idx === question.correct) {
                            opt.classList.add('correct');
                        } else if (idx === selectedAnswer && idx !== question.correct) {
                            opt.classList.add('incorrect');
                        }
                    });

                    // Move to next question after delay
                    setTimeout(() => {
                        if (selectedAnswer === question.correct) {
                            score++;
                        }
                        currentQuestionIndex++;
                        selectedAnswer = null;

                        if (currentQuestionIndex < currentQuiz.questions.length) {
                            showQuestion();
                        } else {
                            showScore();
                        }
                    }, 1500);
                }, 500);
            });
        });
    }

    function showScore() {
        const container = document.getElementById('quiz-container');
        if (!container) return;

        const totalQuestions = currentQuiz.questions.length;
        const percentage = (score / totalQuestions) * 100;

        let badge = '🌱';
        let message = 'Keep Learning 🌱';

        if (percentage === 100) {
            badge = '🏆';
            message = 'Green Champion 🏆';
        } else if (percentage >= 60) {
            badge = '🌿';
            message = 'Eco Explorer 🌿';
        }

        const scoreHTML = `
            <div class="quiz-score">
                <div class="score-badge">${badge}</div>
                <h2 class="score-message">${message}</h2>
                <p>You scored ${score} out of ${totalQuestions}</p>
                <button class="retake-btn" onclick="window.GreenerIndia.Quiz.retakeQuiz()">
                    <span>🔄</span> Retake Quiz
                </button>
            </div>
        `;

        container.innerHTML = scoreHTML;
    }

    function retakeQuiz() {
        // Find which quiz tab is active
        const activeTab = document.querySelector('.quiz-tab.active');
        if (activeTab) {
            const quizType = activeTab.dataset.quiz;
            startQuiz(quizType);
        } else if (currentQuiz) {
            // Fallback: find by title
            const quizType = Object.keys(QUIZ_DATA).find(key => 
                QUIZ_DATA[key].title === currentQuiz.title
            );
            if (quizType) {
                startQuiz(quizType);
            }
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
    window.GreenerIndia.Quiz = {
        startQuiz,
        retakeQuiz
    };
})();
