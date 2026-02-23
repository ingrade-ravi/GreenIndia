'use strict';

// ============================================
// GREENER INDIA - Calculators
// ============================================

(function() {
    // Emission factors (kg CO₂ per unit)
    const EMISSION_FACTORS = {
        electricity: {
            home: 0.82,      // kg CO₂ per kWh (Indian grid average)
            hostel: 0.82,
            office: 0.82
        },
        transport: {
            bike: 0,         // No emissions
            car: 0.21,       // kg CO₂ per km (average Indian car)
            bus: 0.05,       // kg CO₂ per km (per passenger)
            metro: 0.03      // kg CO₂ per km (per passenger)
        }
    };

    // Water usage constants
    const WATER_PER_BUCKET = 20; // litres
    const WATER_PER_SHOWER_MIN = 10; // litres per minute
    const AVERAGE_INDIAN_HOUSEHOLD = 135; // litres per person per day

    function init() {
        initElectricityCalculator();
        initWaterCalculator();
        initTransportCalculator();
        initCardTilt();
    }

    // ============================================
    // Electricity Calculator
    // ============================================

    function initElectricityCalculator() {
        const calculateBtn = document.querySelector('[data-calc="electricity"]');
        const toggleButtons = document.querySelectorAll('[data-type]');
        let selectedType = 'home';

        // Toggle button handlers
        toggleButtons.forEach(btn => {
            if (btn.dataset.type) {
                btn.addEventListener('click', () => {
                    toggleButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    selectedType = btn.dataset.type;
                });
            }
        });

        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                const unitsInput = document.getElementById('electricity-units');
                const units = parseFloat(unitsInput.value) || 0;

                if (units <= 0) {
                    alert('Please enter a valid number of units');
                    return;
                }

                calculateElectricity(units, selectedType);
            });
        }
    }

    function calculateElectricity(units, type) {
        const factor = EMISSION_FACTORS.electricity[type];
        const emissions = units * factor;
        
        const resultContainer = document.querySelector('[data-calc="electricity"]').closest('.calculator-card').querySelector('.result-container');
        const resultNumber = document.getElementById('electricity-result');
        const gaugeFill = resultContainer.querySelector('.gauge-fill');
        const gaugeValue = resultContainer.querySelector('.gauge-value');
        const adviceCard = document.getElementById('electricity-advice');

        // Animate number count-up
        animateCountUp(resultNumber, emissions, 'kg/month');

        // Update gauge (0-100% based on emissions, max at 200kg)
        const maxEmissions = 200;
        const percentage = Math.min((emissions / maxEmissions) * 100, 100);
        const circumference = 251.2; // 2 * PI * 40
        const offset = circumference - (percentage / 100) * circumference;

        if (gaugeFill) {
            gaugeFill.style.strokeDashoffset = offset;
        }

        if (gaugeValue) {
            gaugeValue.textContent = Math.round(emissions);
        }

        // Show result
        resultContainer.classList.add('show');

        // Show advice
        let advice = '';
        if (emissions > 150) {
            advice = '⚠️ Your emissions are high. Consider switching to LED bulbs and using energy-efficient appliances.';
        } else if (emissions > 100) {
            advice = '💡 Switching to LEDs could reduce this by ~15%. Also try using fans instead of AC when possible.';
        } else {
            advice = '✅ Good job! Keep using energy-efficient appliances and natural light when possible.';
        }

        if (adviceCard) {
            adviceCard.textContent = advice;
            adviceCard.classList.add('show');
        }
    }

    // ============================================
    // Water Calculator
    // ============================================

    function initWaterCalculator() {
        const calculateBtn = document.querySelector('[data-calc="water"]');
        const modeButtons = document.querySelectorAll('[data-mode]');
        const bucketsInput = document.getElementById('water-input-buckets');
        const showerInput = document.getElementById('water-input-shower');
        const familySlider = document.getElementById('water-family');
        const sliderValue = familySlider?.nextElementSibling;

        let currentMode = 'buckets';

        // Mode toggle
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentMode = btn.dataset.mode;

                if (currentMode === 'buckets') {
                    bucketsInput?.classList.remove('hidden');
                    showerInput?.classList.add('hidden');
                } else {
                    bucketsInput?.classList.add('hidden');
                    showerInput?.classList.remove('hidden');
                }
            });
        });

        // Family size slider
        if (familySlider && sliderValue) {
            familySlider.addEventListener('input', (e) => {
                sliderValue.textContent = e.target.value;
            });
        }

        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                const familySize = parseInt(familySlider?.value) || 4;
                let dailyUsage = 0;

                if (currentMode === 'buckets') {
                    const buckets = parseFloat(document.getElementById('water-buckets')?.value) || 0;
                    dailyUsage = buckets * WATER_PER_BUCKET * familySize;
                } else {
                    const minutes = parseFloat(document.getElementById('water-shower')?.value) || 0;
                    dailyUsage = minutes * WATER_PER_SHOWER_MIN * familySize;
                }

                if (dailyUsage <= 0) {
                    alert('Please enter valid water usage data');
                    return;
                }

                calculateWater(dailyUsage, familySize);
            });
        }
    }

    function calculateWater(dailyUsage, familySize) {
        const monthlyUsage = dailyUsage * 30;
        const averageDaily = AVERAGE_INDIAN_HOUSEHOLD * familySize;
        const averageMonthly = averageDaily * 30;

        const resultNumber = document.getElementById('water-result');
        const userBar = document.getElementById('water-chart-user');
        const avgBar = document.getElementById('water-chart-avg');

        // Animate count-up
        animateCountUp(resultNumber, monthlyUsage, 'litres');

        // Animate chart bars
        const percentage = (monthlyUsage / averageMonthly) * 100;
        
        setTimeout(() => {
            if (userBar) {
                userBar.style.width = Math.min(percentage, 100) + '%';
                userBar.textContent = Math.round(monthlyUsage) + 'L';
            }
        }, 100);

        // Show result container
        const resultContainer = userBar?.closest('.result-container');
        if (resultContainer) {
            resultContainer.classList.add('show');
        }
    }

    // ============================================
    // Transport Calculator
    // ============================================

    function initTransportCalculator() {
        const calculateBtn = document.querySelector('[data-calc="transport"]');
        const modeButtons = document.querySelectorAll('.mode-btn');
        let selectedMode = 'bike';

        // Mode selection
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedMode = btn.dataset.mode;
            });
        });

        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                const distanceInput = document.getElementById('transport-distance');
                const distance = parseFloat(distanceInput.value) || 0;

                if (distance <= 0) {
                    alert('Please enter a valid distance');
                    return;
                }

                calculateTransport(distance, selectedMode);
            });
        }
    }

    function calculateTransport(distance, mode) {
        const factor = EMISSION_FACTORS.transport[mode];
        const dailyEmissions = distance * factor;
        const monthlyEmissions = dailyEmissions * 30;

        const resultNumber = document.getElementById('transport-result');
        const comparisonCard = document.getElementById('transport-comparison');

        // Animate count-up
        animateCountUp(resultNumber, monthlyEmissions, 'kg/month');

        // Find best alternative
        const alternatives = Object.entries(EMISSION_FACTORS.transport)
            .filter(([m]) => m !== mode)
            .sort((a, b) => a[1] - b[1]);

        const bestAlternative = alternatives[0];
        const bestModeName = bestAlternative[0];
        const bestFactor = bestAlternative[1];
        const bestMonthlyEmissions = distance * bestFactor * 30;
        const savings = monthlyEmissions - bestMonthlyEmissions;

        // Show comparison
        if (comparisonCard) {
            const modeNames = {
                bike: '🚲 Bike',
                car: '🚗 Car',
                bus: '🚌 Bus',
                metro: '🚇 Metro'
            };

            let message = '';
            if (savings > 0) {
                message = `💚 Switch to ${modeNames[bestModeName]} and save ${Math.round(savings)} kg CO₂/month!`;
            } else {
                message = `✅ ${modeNames[mode]} is already a great choice!`;
            }

            comparisonCard.textContent = message;
            comparisonCard.classList.add('show');
        }

        // Show result container
        const resultContainer = resultNumber?.closest('.result-container');
        if (resultContainer) {
            resultContainer.classList.add('show');
        }
    }

    // ============================================
    // Helper Functions
    // ============================================

    function animateCountUp(element, targetValue, unit) {
        if (!element) return;

        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (targetValue - startValue) * easeOutCubic;

            element.textContent = Math.round(currentValue) + ' ' + unit;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = Math.round(targetValue) + ' ' + unit;
            }
        }

        requestAnimationFrame(update);
    }

    // ============================================
    // 3D Card Tilt Effect
    // ============================================

    function initCardTilt() {
        const cards = document.querySelectorAll('[data-tilt]');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Export
    window.GreenerIndia = window.GreenerIndia || {};
    window.GreenerIndia.Calculators = {
        calculateElectricity,
        calculateWater,
        calculateTransport
    };
})();
