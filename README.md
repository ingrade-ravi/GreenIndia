# 🌍 Greener India - Environmental Awareness Platform

A fully frontend-only environmental awareness web application built with HTML5, CSS3, and Vanilla JavaScript. This platform empowers everyday Indians to understand and reduce their environmental impact through interactive calculators, quizzes, and educational tools.

## ✨ Features

### 🏠 Hero Section
- Animated word-by-word headline reveal
- Floating particle background
- Smooth scroll CTAs
- Stats ticker with marquee animation

### 🌿 Calculators
1. **Electricity Footprint Calculator**
   - Calculate CO₂ emissions from monthly kWh usage
   - Animated gauge visualization
   - Personalized energy-saving advice

2. **Water Usage Calculator**
   - Track daily water consumption (buckets or shower time)
   - Compare with average Indian household
   - Animated bar chart visualization

3. **Transport Emissions Calculator**
   - Calculate carbon footprint by transport mode
   - Get greener alternative suggestions
   - Side-by-side comparison cards

### ✍️ Interactive Learning
- Fill-in-the-blanks questions with instant feedback
- India-focused environmental topics
- Progress tracking
- Confetti animations on correct answers

### 🧠 Quizzes
Three quiz modes:
- **Beginner Green Quiz** - Basic environmental knowledge
- **Daily Eco Habits Quiz** - Practical daily actions
- **India Environment Quiz** - India-specific environmental facts

Features:
- 5 questions per quiz
- Instant feedback
- Score badges and personalized messages
- Retake functionality

### 🤖 EcoBuddy Chatbot
- Rule-based interactive chatbot
- Predefined topic chips (no typing required)
- Typewriter effect responses
- Animated avatar
- Topics: Plastic reduction, Electricity saving, Water conservation, Green transport, Composting

### 🇮🇳 Greener India Actions
- **Rural Actions**: Composting, Rainwater harvesting
- **Urban Actions**: Public transport, Tree plantation
- Flip cards with detailed tips
- **Green Pledge**: Interactive checklist with confetti celebration

## 🎨 Design Features

### Theme System
- **Light Theme**: Earthy tones with warm whites and sage greens
- **Dark Theme**: Deep forest tones with green accents
- Smooth theme transitions
- Theme preference saved in localStorage

### Custom Cursor
- 3D animated cursor with lag effect
- Glowing outer ring that follows smoothly
- Inner dot that snaps instantly
- Hover effects on interactive elements
- Click particle burst animations
- Disabled on touch devices

### Animations
- Scroll-triggered animations using IntersectionObserver
- 3D card tilt effects on hover
- Smooth page transitions
- Micro-interactions on all buttons
- Confetti and particle effects

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, Animations
- **Vanilla JavaScript** - No frameworks or dependencies
- **Google Fonts** - Poppins (headings), Inter (body)
- **SVG Icons** - Inline SVG graphics

## 📁 File Structure

```
greener-india/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet with theme system
│   ├── animations.css     # Keyframe animations
│   └── cursor.css         # Custom cursor styles
├── js/
│   ├── app.js             # Main app initialization
│   ├── cursor.js          # Custom cursor logic
│   ├── calculators.js     # All calculator functionality
│   ├── quiz.js            # Quiz system
│   ├── chatbot.js         # EcoBuddy chatbot
│   └── animations.js      # Scroll animations & interactions
└── README.md              # This file
```

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
3. **No build process required** - it's pure HTML/CSS/JS!

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Key Features Implementation

### Performance
- IntersectionObserver for scroll animations (no scroll event listeners)
- CSS transforms for smooth animations
- Efficient particle system
- localStorage for theme and pledge persistence

### Accessibility
- Semantic HTML5 elements
- Keyboard navigation support
- Focus styles on all interactive elements
- Touch device detection for cursor

### Responsive Design
- Mobile-first approach
- Fluid typography using `clamp()`
- Flexible grid layouts
- Touch-friendly button sizes

## 🌱 Environmental Impact

This platform helps users:
- Understand their carbon footprint
- Learn practical eco-friendly habits
- Make informed decisions about energy and water usage
- Commit to sustainable actions through the Green Pledge

## 📝 Notes

- **No Backend**: All calculations are done client-side
- **No Database**: Uses localStorage for minimal persistence
- **No Tracking**: Privacy-focused, no analytics
- **Offline Capable**: Works without internet after initial load

## 🎨 Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --color-primary: #4CAF76;
    --color-accent: #F5C842;
    /* ... */
}
```

### Content
- Quiz questions: Edit `QUIZ_DATA` in `js/quiz.js`
- Learning questions: Edit `LEARN_QUESTIONS` in `js/animations.js`
- Chatbot responses: Edit `RESPONSES` in `js/chatbot.js`

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ for a Greener India** 🌿
