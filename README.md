# Portfolio Website - Sriharsha Velicheti

A minimalistic, professional portfolio website showcasing expertise in Generative AI Engineering, RAG applications, and LLM orchestration.

## ✨ Features

- **Single-Page Scrolling**: Smooth navigation through all sections
- **Dark/Light Theme**: Toggle between monochrome light and dark black themes
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Scroll-based reveals and interactions
- **Interactive Timeline**: Clickable experience items with detailed information
- **Project Modals**: Expandable project cards with comprehensive details
- **Interactive Skills Visualization**: Toggle between progress bars and radar chart
- **GitHub Integration**: Live stats, contribution graph, and top repositories
- **Contact Form**: EmailJS integration for direct messaging
- **Resume Download**: One-click PDF download
- **Chat Integration**: Floating button placeholder for future FastAPI integration
- **Fast Loading**: Optimized with Tailwind CSS CDN and Chart.js
- **Clean Code**: Well-structured HTML, CSS, and JavaScript

## 🎨 Design

- **Typography**: Inter (body) and Poppins (headings)
- **Color Scheme**: 
  - Light Theme: Clean monochrome with blue accents
  - Dark Theme: Deep black (#0a0a0a) with subtle grays
- **Layout**: Grid-based responsive design
- **Animations**: Fade-in, slide-in, and hover effects

## 🚀 Quick Start

1. **Clone or Download** this repository
2. **Setup EmailJS** (optional - for contact form):
   - Follow instructions in `EMAILJS_SETUP.md`
   - Or use direct email links (already functional)
3. **Add Your Photo** (optional):
   - Replace the placeholder in hero section with your image
   - Path: Update `src` in line ~165 of `index.html`
4. **Open `index.html`** in your browser
5. That's it! No build process required.

## 📁 File Structure

```
Portfolio/
├── index.html          # Main HTML file with all content
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🔧 Future Enhancements

### Chat Integration (FastAPI Backend)

The floating chat button is ready for integration. To connect with FastAPI:

1. **Create FastAPI backend**:
```python
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        # Process with LLM/RAG
        response = process_message(data)
        await websocket.send_text(response)
```

2. **Update JavaScript** in `script.js`:
```javascript
const ws = new WebSocket('ws://localhost:8000/ws/chat');

ws.onmessage = (event) => {
    displayMessage(event.data);
};

function sendMessage(message) {
    ws.send(message);
}
```

### Adding Your Photo

Replace the placeholder in the hero section:

```html
<!-- Find this section in index.html (around line 165) -->
<div class="w-full h-full rounded-full bg-white dark:bg-dark-surface flex items-center justify-center overflow-hidden">
    <!-- Replace the placeholder div with your image -->
    <img src="path/to/your/photo.jpg" alt="Sriharsha Velicheti" class="w-full h-full object-cover">
</div>
```

## 🎯 Sections

1. **Hero**: Introduction with photo, name, and key links + Resume download
2. **About**: Professional summary and stats
3. **Experience**: Interactive timeline with work history
4. **Projects**: Grid layout with expandable modals
5. **Skills**: Interactive visualizations (progress bars & radar chart)
6. **GitHub**: Live activity, stats, and top repositories
7. **Education**: Degree details and accomplishments
8. **Contact**: Contact form with EmailJS + direct contact methods

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ⚡ Performance

- **Fast Loading**: CDN-based assets
- **Optimized Animations**: GPU-accelerated transforms
- **Lazy Loading**: Ready for image optimization
- **Debounced Scroll**: Efficient event handling

## 🎨 Customization

### Colors
Edit the Tailwind config in `index.html` (around line 19):
```javascript
colors: {
    'light-bg': '#FFFFFF',
    'dark-bg': '#0a0a0a',
    // ... customize colors
}
```

### Content
All content is directly in `index.html` for easy editing.

### Animations
Modify animation timings in `<style>` section or `script.js`.

## 📧 Contact

- **Email**: srih8991@gmail.com
- **Phone**: +91 8309012139
- **GitHub**: [@sriharsha8991](https://github.com/sriharsha8991)
- **LinkedIn**: [Sriharsha Velicheti](https://www.linkedin.com/in/sriharsha-velicheti)

## 📄 License

Personal portfolio - All rights reserved.

## 🙏 Acknowledgments

- Built with Tailwind CSS
- Icons by Font Awesome
- Fonts from Google Fonts

---

**Built with passion and precision** 🚀
