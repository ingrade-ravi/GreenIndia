'use strict';

// ============================================
// GREENER INDIA - EcoBuddy Chatbot
// ============================================

(function() {
    const RESPONSES = {
        plastic: {
            message: 'Start with these 3 steps:\n\n1. Carry a cloth bag when shopping\n2. Avoid bottled water - use a reusable bottle\n3. Say no to plastic straws and cutlery\n\nEvery small step counts! 🌱',
            delay: 100
        },
        electricity: {
            message: 'Save electricity with these tips:\n\n1. Switch to LED bulbs (saves 80% energy)\n2. Use natural light during day\n3. Unplug devices when not in use\n4. Use fans instead of AC when possible\n\nYou\'ll save money and the planet! 💡',
            delay: 100
        },
        water: {
            message: 'Water conservation tips:\n\n1. Take shorter showers (5-10 minutes)\n2. Fix leaks immediately\n3. Use a bucket instead of shower when possible\n4. Collect rainwater for plants\n5. Turn off tap while brushing\n\nEvery drop matters! 💧',
            delay: 100
        },
        transport: {
            message: 'Green transport options:\n\n1. Use public transport (bus/metro)\n2. Walk or cycle for short distances\n3. Carpool when possible\n4. Plan routes to reduce trips\n\nReduce emissions by 70% with public transport! 🚌',
            delay: 100
        },
        composting: {
            message: 'Composting at home:\n\n1. Use kitchen waste (vegetable peels, etc.)\n2. Layer green and brown waste\n3. Turn the pile weekly\n4. Keep it moist but not wet\n\nTurn waste into nutrient-rich soil! 🌾',
            delay: 100
        }
    };

    let isOpen = false;
    let messagesContainer, chatbotPanel, chatbotBubble, closeBtn;

    function init() {
        chatbotBubble = document.getElementById('chatbot-bubble');
        chatbotPanel = document.getElementById('chatbot-panel');
        messagesContainer = document.getElementById('chatbot-messages');
        closeBtn = document.getElementById('chatbot-close');

        if (chatbotBubble) {
            chatbotBubble.addEventListener('click', toggleChatbot);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeChatbot);
        }

        // Initialize chip buttons
        const chipButtons = document.querySelectorAll('.chip-btn');
        chipButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const topic = btn.dataset.topic;
                handleChipClick(topic);
            });
        });
    }

    function toggleChatbot() {
        if (!chatbotPanel) return;

        isOpen = !isOpen;
        if (isOpen) {
            openChatbot();
        } else {
            closeChatbot();
        }
    }

    function openChatbot() {
        if (chatbotPanel) {
            chatbotPanel.classList.remove('hidden');
            chatbotPanel.classList.add('show');
            isOpen = true;
        }
    }

    function closeChatbot() {
        if (chatbotPanel) {
            chatbotPanel.classList.remove('show');
            setTimeout(() => {
                chatbotPanel.classList.add('hidden');
            }, 300);
            isOpen = false;
        }
    }

    function handleChipClick(topic) {
        const response = RESPONSES[topic];
        if (!response || !messagesContainer) return;

        // Add user message
        addMessage('You clicked: ' + document.querySelector(`[data-topic="${topic}"]`).textContent, 'user');

        // Add bot response with typewriter effect
        setTimeout(() => {
            addTypedMessage(response.message, 'bot');
        }, 500);
    }

    function addMessage(text, type) {
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const paragraphs = text.split('\n\n');
        paragraphs.forEach(para => {
            const p = document.createElement('p');
            p.textContent = para;
            messageDiv.appendChild(p);
        });

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Animate avatar
        animateAvatar();
    }

    function addTypedMessage(text, type) {
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messagesContainer.appendChild(messageDiv);

        const fullText = text;
        let currentIndex = 0;
        const typingSpeed = 30;

        function typeChar() {
            if (currentIndex < fullText.length) {
                const char = fullText[currentIndex];
                if (char === '\n') {
                    messageDiv.innerHTML += '<br>';
                } else {
                    messageDiv.textContent += char;
                }
                currentIndex++;
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Format the message properly with line breaks
                messageDiv.innerHTML = fullText.split('\n\n').map(para => 
                    `<p>${para.replace(/\n/g, '<br>')}</p>`
                ).join('');
            }
        }

        typeChar();
        animateAvatar();
    }

    function animateAvatar() {
        const avatar = document.querySelector('.avatar-svg');
        if (avatar) {
            avatar.style.animation = 'none';
            setTimeout(() => {
                avatar.style.animation = 'pulse 0.5s ease';
            }, 10);
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
    window.GreenerIndia.Chatbot = {
        toggleChatbot,
        openChatbot,
        closeChatbot
    };
})();
