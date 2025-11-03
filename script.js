// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', currentTheme === 'dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const theme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-500', 'font-semibold');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-blue-500', 'font-semibold');
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section > div').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Timeline Toggle
function toggleTimeline(id) {
    const element = document.getElementById(id);
    const isExpanded = element.style.display === 'block';
    
    // Close all timelines
    document.querySelectorAll('[id^="exp"]').forEach(exp => {
        exp.style.display = 'none';
    });
    
    // Toggle current timeline
    if (!isExpanded) {
        element.style.display = 'block';
        element.style.animation = 'fadeIn 0.3s ease';
    }
}

// Initialize timelines as expanded
document.querySelectorAll('[id^="exp"]').forEach(exp => {
    exp.style.display = 'block';
});

// Project Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    }
});

// ==================== Chat Functionality ====================
// Chat Configuration
const CHAT_API_URL = 'http://localhost:8000';  // Update with your backend URL
let chatHistory = [];
let chatWebSocket = null;
let isConnected = false;

// Chat Toggle
function toggleChat() {
    const chatPanel = document.getElementById('chat-panel');
    const isActive = chatPanel.classList.toggle('active');
    
    if (isActive && !isConnected) {
        initializeChat();
    }
}

// Initialize Chat Connection
function initializeChat() {
    const chatMessages = document.getElementById('chat-messages');
    
    // Add loading message
    chatMessages.innerHTML = `
        <div class="text-center py-4">
            <i class="fas fa-spinner fa-spin text-2xl text-blue-500"></i>
            <p class="text-sm text-gray-500 mt-2">Connecting to AI assistant...</p>
        </div>
    `;
    
    // Try WebSocket first, fallback to HTTP
    try {
        connectWebSocket();
    } catch (error) {
        console.log('WebSocket not available, using HTTP');
        initializeHTTPChat();
    }
}

// WebSocket Connection
function connectWebSocket() {
    const wsUrl = CHAT_API_URL.replace('http', 'ws') + '/ws/chat';
    chatWebSocket = new WebSocket(wsUrl);
    
    chatWebSocket.onopen = () => {
        console.log('WebSocket connected');
        isConnected = true;
    };
    
    chatWebSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'welcome') {
            displayWelcomeMessage(data.message);
        } else if (data.type === 'message') {
            displayAssistantMessage(data.response);
        } else if (data.type === 'error') {
            displayErrorMessage(data.message);
        }
    };
    
    chatWebSocket.onerror = (error) => {
        console.log('WebSocket error, falling back to HTTP');
        initializeHTTPChat();
    };
    
    chatWebSocket.onclose = () => {
        isConnected = false;
        console.log('WebSocket disconnected');
    };
}

// HTTP Chat Fallback
function initializeHTTPChat() {
    isConnected = true;
    displayWelcomeMessage("Hi! I'm Sriharsha's AI assistant. Ask me anything about his professional experience, skills, projects, or education!");
}

// Display Welcome Message
function displayWelcomeMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div class="flex items-start space-x-2">
                <i class="fas fa-robot text-blue-500 mt-1"></i>
                <p class="text-sm">${message}</p>
            </div>
        </div>
    `;
    
    // Enable input
    document.getElementById('chat-input').disabled = false;
    document.getElementById('chat-send-btn').disabled = false;
}

// Display User Message
function displayUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4 ml-8';
    messageDiv.innerHTML = `
        <div class="flex items-start space-x-2 justify-end">
            <p class="text-sm text-right">${escapeHtml(message)}</p>
            <i class="fas fa-user text-blue-500 mt-1"></i>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

// Display Assistant Message
function displayAssistantMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 mr-8';
    messageDiv.innerHTML = `
        <div class="flex items-start space-x-2">
            <i class="fas fa-robot text-blue-500 mt-1"></i>
            <p class="text-sm">${escapeHtml(message)}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

// Display Loading Message
function displayLoadingMessage() {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.id = 'loading-message';
    messageDiv.className = 'bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4';
    messageDiv.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas fa-spinner fa-spin text-blue-500"></i>
            <p class="text-sm text-gray-500">Thinking...</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

// Remove Loading Message
function removeLoadingMessage() {
    const loadingMsg = document.getElementById('loading-message');
    if (loadingMsg) {
        loadingMsg.remove();
    }
}

// Display Error Message
function displayErrorMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'bg-red-50 dark:bg-red-900/20 rounded-lg p-4 mb-4';
    messageDiv.innerHTML = `
        <div class="flex items-start space-x-2">
            <i class="fas fa-exclamation-circle text-red-500 mt-1"></i>
            <p class="text-sm text-red-600 dark:text-red-400">${escapeHtml(message)}</p>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

// Send Chat Message
async function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Display user message
    displayUserMessage(message);
    input.value = '';
    
    // Disable input while processing
    input.disabled = true;
    document.getElementById('chat-send-btn').disabled = true;
    
    // Show loading
    displayLoadingMessage();
    
    try {
        if (chatWebSocket && chatWebSocket.readyState === WebSocket.OPEN) {
            // Send via WebSocket
            chatWebSocket.send(JSON.stringify({ message: message }));
            removeLoadingMessage();
        } else {
            // Send via HTTP
            const response = await fetch(`${CHAT_API_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversation_history: chatHistory
                })
            });
            
            if (!response.ok) {
                throw new Error('Failed to get response');
            }
            
            const data = await response.json();
            removeLoadingMessage();
            displayAssistantMessage(data.response);
            
            // Update history
            chatHistory.push({
                user: message,
                assistant: data.response
            });
        }
    } catch (error) {
        removeLoadingMessage();
        displayErrorMessage('Failed to connect to the chat service. Please make sure the backend is running.');
        console.error('Chat error:', error);
    } finally {
        // Re-enable input
        input.disabled = false;
        document.getElementById('chat-send-btn').disabled = false;
        input.focus();
    }
}

// Scroll chat to bottom
function scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
});

// Typing Effect for Hero Section (Optional Enhancement)
const heroTitle = document.querySelector('#home h1');
const text = heroTitle.textContent;
let index = 0;

function typeWriter() {
    if (index < text.length) {
        heroTitle.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, 50);
    }
}

// Uncomment to enable typing effect
// heroTitle.textContent = '';
// typeWriter();

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('#home');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Skill Badge Animations
const skillBadges = document.querySelectorAll('.skill-badge');
skillBadges.forEach((badge, index) => {
    badge.style.opacity = '0';
    badge.style.transform = 'translateY(10px)';
    badge.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
    
    const badgeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    badgeObserver.observe(badge);
});

// Project Card Animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    cardObserver.observe(card);
});

// Navbar Background on Scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        if (html.classList.contains('dark')) {
            nav.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.8)';
        if (html.classList.contains('dark')) {
            nav.style.background = 'rgba(26, 26, 26, 0.8)';
        }
    }
});

// Lazy Load Images (if images are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Contact Form Animation (for future integration)
const contactInputs = document.querySelectorAll('#contact input, #contact textarea');
contactInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Performance Optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
    // Your scroll functions here
}));

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console Message for Developers
console.log('%cHey there! 👋', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cLooking at the code? Feel free to reach out if you want to collaborate!', 'color: #8b5cf6; font-size: 14px;');
console.log('%cEmail: srih8991@gmail.com', 'color: #6b7280; font-size: 12px;');

// Prevent right-click on images (optional security)
// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('contextmenu', e => e.preventDefault());
// });

// Add smooth reveal for accomplishments
const accomplishments = document.querySelectorAll('#education .space-y-4 > div');
accomplishments.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
    
    const accomplishmentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    });
    
    accomplishmentObserver.observe(item);
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Print Page Analytics (optional)
window.addEventListener('beforeprint', () => {
    console.log('User is printing the portfolio');
});

// Copy email to clipboard
document.querySelectorAll('a[href^="mailto"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                alert('Email copied to clipboard!');
            });
        }
    });
});

// Initialize all animations on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Add entrance animations
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translate(0, 0)';
        }, index * 100);
    });
    
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize Skills Animations
    initSkillsAnimations();
    
    // Initialize Skills Radar Chart
    initSkillsRadarChart();
    
    // Load GitHub Data
    loadGitHubData();
});

// ==================== EmailJS Integration ====================
function initEmailJS() {
    // Initialize EmailJS with your public key
    // Sign up at https://www.emailjs.com/ to get your keys
    emailjs.init("ylZh_JF2YufHh1fS6"); // Replace with your EmailJS public key
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        
        // Send email using EmailJS
        // Create a service and template at emailjs.com
        emailjs.sendForm('service_fde9oj5', 'template_vwuhvzc', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                formMessage.className = 'block text-center p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
                formMessage.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Message sent successfully! I\'ll get back to you soon.';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.className = 'hidden';
                }, 5000);
            }, function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                formMessage.className = 'block text-center p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
                formMessage.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Failed to send message. Please try again or email directly.';
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send Message</span>';
            });
    });
}

// ==================== Skills Animations ====================
function initSkillsAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 1.5s ease';
                    entry.target.style.width = progress + '%';
                }, 100);
                skillObserver.unobserve(entry.target);
            }
        });
    });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ==================== Skills View Toggle ====================
function switchSkillView(view) {
    const barsView = document.getElementById('skills-bars');
    const chartView = document.getElementById('skills-chart');
    const barsBtn = document.getElementById('btn-bars');
    const chartBtn = document.getElementById('btn-chart');
    
    if (view === 'bars') {
        barsView.classList.remove('hidden');
        chartView.classList.add('hidden');
        barsBtn.classList.add('bg-blue-500', 'text-white');
        barsBtn.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-800');
        chartBtn.classList.remove('bg-blue-500', 'text-white');
        chartBtn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-800');
    } else {
        barsView.classList.add('hidden');
        chartView.classList.remove('hidden');
        chartBtn.classList.add('bg-blue-500', 'text-white');
        chartBtn.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-800');
        barsBtn.classList.remove('bg-blue-500', 'text-white');
        barsBtn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-800');
    }
}

// ==================== Skills Radar Chart ====================
let skillsChart = null;

function initSkillsRadarChart() {
    const ctx = document.getElementById('skillsRadarChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#ffffff' : '#1a1a1a';
    const gridColor = isDark ? '#404040' : '#e5e5e5';
    
    skillsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Python', 'RAG/LLM', 'FastAPI', 'Cloud/Azure', 'Docker/DevOps', 'Vector DBs', 'NLP', 'LangChain'],
            datasets: [{
                label: 'Skill Proficiency',
                data: [95, 92, 90, 88, 85, 90, 87, 88],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        color: gridColor
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: textColor,
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        color: textColor,
                        backdropColor: 'transparent',
                        beginAtZero: true,
                        max: 100,
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}

// Update chart on theme change
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    setTimeout(() => {
        if (skillsChart) {
            const isDark = document.documentElement.classList.contains('dark');
            const textColor = isDark ? '#ffffff' : '#1a1a1a';
            const gridColor = isDark ? '#404040' : '#e5e5e5';
            
            skillsChart.options.scales.r.angleLines.color = gridColor;
            skillsChart.options.scales.r.grid.color = gridColor;
            skillsChart.options.scales.r.pointLabels.color = textColor;
            skillsChart.options.scales.r.ticks.color = textColor;
            skillsChart.options.plugins.legend.labels.color = textColor;
            skillsChart.update();
        }
    }, 100);
});

// ==================== GitHub Integration ====================
async function loadGitHubData() {
    const username = 'sriharsha8991';
    
    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();
        
        // Update stats
        document.getElementById('github-repos').textContent = userData.public_repos || 0;
        document.getElementById('github-followers').textContent = userData.followers || 0;
        document.getElementById('github-following').textContent = userData.following || 0;
        document.getElementById('github-gists').textContent = userData.public_gists || 0;
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();
        
        // Display repositories
        displayRepositories(reposData);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        document.getElementById('github-repos-list').innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i class="fas fa-exclamation-circle text-3xl mb-2"></i>
                <p>Unable to load GitHub data</p>
            </div>
        `;
    }
}

function displayRepositories(repos) {
    const container = document.getElementById('github-repos-list');
    
    if (!repos || repos.length === 0) {
        container.innerHTML = '<p class="text-center text-gray-500">No repositories found</p>';
        return;
    }
    
    container.innerHTML = repos.map(repo => `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <div class="flex items-start justify-between">
                <div class="flex-1">
                    <a href="${repo.html_url}" target="_blank" class="text-lg font-bold text-blue-500 hover:underline">
                        <i class="fab fa-github mr-2"></i>${repo.name}
                    </a>
                    <p class="text-gray-600 dark:text-gray-400 mt-2 text-sm">${repo.description || 'No description available'}</p>
                    
                    <div class="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                        ${repo.language ? `
                            <span class="flex items-center">
                                <span class="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                        <span class="flex items-center">
                            <i class="fas fa-star mr-1"></i>
                            ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center">
                            <i class="fas fa-code-branch mr-1"></i>
                            ${repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}
