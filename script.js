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

// ==================== HERO SECTION ENHANCEMENTS ====================

// 1. TYPEWRITER EFFECT
function initTypewriter() {
    const roles = ['GenAI Engineer', 'Freelancer', 'YouTuber', 'Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const element = document.getElementById('typewriter-text');
    if (!element) {
        console.error('Typewriter element not found!');
        return;
    }
    
    console.log('Typewriter initialized successfully');
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            element.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentRole.length) {
            speed = 5000; // 5 seconds pause
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    // Start typing after a short delay
    setTimeout(type, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
    initTypewriter();
}

// 2. PARTICLE BACKGROUND
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        this.canvas.addEventListener('mousemove', (e) => this.updateMouse(e));
    }
    
    init() {
        this.resize();
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    updateMouse(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            const isDark = html.classList.contains('dark');
            this.ctx.fillStyle = isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections
            this.particles.slice(i + 1).forEach(particle2 => {
                const dx = particle.x - particle2.x;
                const dy = particle.y - particle2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.3;
                    this.ctx.strokeStyle = isDark 
                        ? `rgba(139, 92, 246, ${opacity})` 
                        : `rgba(59, 130, 246, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(particle2.x, particle2.y);
                    this.ctx.stroke();
                }
            });
            
            // Mouse interaction
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x += (dx / distance) * force * 2;
                particle.y += (dy / distance) * force * 2;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle system
new ParticleSystem();

// 3. ENHANCED PROFILE IMAGE WITH CURSOR MOVEMENT
const profileContainer = document.getElementById('profile-container');

if (profileContainer) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const rect = profileContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Limit movement to 15px
        const maxMove = 15;
        targetX = Math.max(-maxMove, Math.min(maxMove, deltaX / 20));
        targetY = Math.max(-maxMove, Math.min(maxMove, deltaY / 20));
    });
    
    // Smooth animation
    function animateProfile() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        
        profileContainer.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(animateProfile);
    }
    
    animateProfile();
}

// 4. ORBITING SKILLS WITH CURSOR ROTATION CONTROL
class OrbitingSkills {
    constructor() {
        this.container = document.getElementById('skill-orbit');
        this.pills = Array.from(document.querySelectorAll('.skill-pill'));
        this.radius = 220;
        this.rotation = 0;
        this.targetRotation = 0;
        this.isDragging = false;
        this.lastAngle = 0;
        this.autoRotate = true;
        this.autoRotateSpeed = 0.3;
        
        if (this.container && this.pills.length > 0) {
            this.init();
            this.animate();
        }
    }
    
    init() {
        // Position pills initially
        this.pills.forEach((pill, index) => {
            pill.dataset.initialAngle = (360 / this.pills.length) * index;
        });
        
        // Add event listeners
        this.pills.forEach(pill => {
            pill.addEventListener('mousedown', (e) => this.startDrag(e));
            pill.addEventListener('touchstart', (e) => this.startDrag(e));
        });
        
        document.addEventListener('mousemove', (e) => this.onDrag(e));
        document.addEventListener('touchmove', (e) => this.onDrag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        document.addEventListener('touchend', () => this.endDrag());
        
        // Stop auto-rotate on hover
        this.container.addEventListener('mouseenter', () => {
            this.autoRotate = false;
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.autoRotate = true;
        });
    }
    
    startDrag(e) {
        this.isDragging = true;
        this.autoRotate = false;
        
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        this.lastAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    }
    
    onDrag(e) {
        if (!this.isDragging) return;
        
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        const currentAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
        const deltaAngle = currentAngle - this.lastAngle;
        
        this.targetRotation += deltaAngle;
        this.lastAngle = currentAngle;
    }
    
    endDrag() {
        this.isDragging = false;
        setTimeout(() => {
            if (!this.isDragging) {
                this.autoRotate = true;
            }
        }, 2000);
    }
    
    animate() {
        // Auto-rotate when not dragging
        if (this.autoRotate && !this.isDragging) {
            this.targetRotation += this.autoRotateSpeed;
        }
        
        // Smooth rotation
        this.rotation += (this.targetRotation - this.rotation) * 0.1;
        
        // Update pill positions
        this.pills.forEach((pill, index) => {
            const initialAngle = parseFloat(pill.dataset.initialAngle);
            const angle = (initialAngle + this.rotation) * (Math.PI / 180);
            
            const x = Math.cos(angle) * this.radius;
            const y = Math.sin(angle) * this.radius;
            
            pill.style.left = `calc(50% + ${x}px)`;
            pill.style.top = `calc(50% + ${y}px)`;
            pill.style.transform = `translate(-50%, -50%)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize orbiting skills
new OrbitingSkills();

// 5. MAGNETIC BUTTONS
const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ==================== END HERO SECTION ENHANCEMENTS ====================


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
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Observe all sections for animation (except hero which has its own animations)
document.querySelectorAll('section:not(#home) > div').forEach(el => {
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

// ==================== SECTION ENHANCEMENTS ====================

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('active')) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Stop observing after animation
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Animated Stat Cards Counter
function animateCounter(element) {
    const target = parseInt(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = element.parentElement.textContent.includes('+') ? target + '+' : target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.parentElement.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation on scroll
const statCards = document.querySelectorAll('.stat-card');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const numberElement = entry.target.querySelector('.stat-number');
            if (numberElement) {
                animateCounter(numberElement);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statObserver.observe(card);
});

// Skills Progress Bar Animation
const skillProgressBars = document.querySelectorAll('.skill-progress-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const progress = entry.target.dataset.progress;
            setTimeout(() => {
                entry.target.style.width = progress + '%';
                entry.target.dataset.animated = 'true';
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
});

// GitHub Stats Animation
const githubStatCards = document.querySelectorAll('.github-stat-card');
githubStatCards.forEach((card, index) => {
    setTimeout(() => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(card);
    }, index * 100);
});

// Interactive Contact Form Enhancement
const contactFormInputs = document.querySelectorAll('.contact-input');
contactFormInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Smooth Experience Card Expansion
window.toggleTimeline = function(id) {
    const element = document.getElementById(id);
    const card = element.closest('.experience-card');
    
    if (element.style.maxHeight) {
        element.style.maxHeight = null;
        card.style.background = '';
    } else {
        element.style.maxHeight = element.scrollHeight + "px";
    }
};

// Initialize all experience cards as collapsed
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[id^="exp"]').forEach(exp => {
        exp.style.maxHeight = exp.scrollHeight + "px";
        exp.style.transition = 'max-height 0.4s ease-out';
    });
});

// ==================== END SECTION ENHANCEMENTS ====================

// ==================== Chat Functionality ====================
// Chat Configuration - Using centralized config
const chatConfig = window.PORTFOLIO_CONFIG ? window.PORTFOLIO_CONFIG.getConfig() : {
    apiUrl: 'http://127.0.0.1:8000',
    wsUrl: 'ws://127.0.0.1:8000',
    environment: 'development'
};

const CHAT_API_URL = chatConfig.apiUrl;
const CHAT_WS_URL = chatConfig.wsUrl;

console.log(`🚀 Chat running in ${chatConfig.environment} mode`);
console.log(`📡 API URL: ${CHAT_API_URL}`);

let chatHistory = [];
let chatWebSocket = null;
let isConnected = false;
let markdownParser = null;

// Initialize Markdown Parser
function initMarkdownParser() {
    if (typeof markdownit !== 'undefined') {
        markdownParser = window.markdownit({
            html: false,
            linkify: true,
            typographer: true,
            breaks: true
        });
    }
}

// Auto-resize textarea
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    const maxHeight = window.innerWidth <= 640 ? 80 : 100; // Smaller on mobile
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
}

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
    
    // Initialize markdown parser
    initMarkdownParser();
    
    // Add loading message with enhanced styling
    chatMessages.innerHTML = `
        <div class="chat-message text-center py-8">
            <div class="inline-flex items-center space-x-3 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-2xl">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 font-medium">Connecting to AI assistant...</p>
            </div>
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
    const wsUrl = CHAT_WS_URL + '/ws/chat';
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
    displayWelcomeMessage("Hi! I'm Sriharsha's AI assistant. 👋\n\nI can help you learn about:\n• Professional experience & skills\n• Projects & achievements\n• Education & certifications\n• Technical expertise\n\nFeel free to ask me anything!");
}

// Parse and render message content
function parseMessageContent(message) {
    if (markdownParser) {
        // Render markdown
        let html = markdownParser.render(message);
        
        // Make links open in new tab
        html = html.replace(/<a href=/g, '<a target="_blank" rel="noopener noreferrer" href=');
        
        return html;
    } else {
        // Fallback: simple text with link detection
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return escapeHtml(message).replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">$1</a>');
    }
}

// Display Welcome Message
function displayWelcomeMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = `
        <div class="chat-message">
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 mb-3 shadow-sm border border-blue-100 dark:border-blue-800">
                <div class="flex items-start space-x-2">
                    <div class="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <i class="fas fa-robot text-white text-sm"></i>
                    </div>
                    <div class="flex-1 chat-message-content text-sm text-gray-700 dark:text-gray-300">
                        ${parseMessageContent(message)}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Enable input
    document.getElementById('chat-input').disabled = false;
    document.getElementById('chat-send-btn').disabled = false;
    document.getElementById('chat-input').focus();
}

// Display User Message
function displayUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-sm p-3 mb-3 ml-8 sm:ml-12 shadow-md">
            <div class="flex items-start space-x-2 justify-end">
                <div class="flex-1 chat-message-content text-sm text-right">
                    ${parseMessageContent(message)}
                </div>
                <div class="flex-shrink-0 w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-xs"></i>
                </div>
            </div>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollChatToBottom();
}

// Display Assistant Message
function displayAssistantMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm p-3 mb-3 mr-8 sm:mr-12 shadow-md border border-gray-200 dark:border-gray-700">
            <div class="flex items-start space-x-2">
                <div class="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <i class="fas fa-robot text-white text-xs"></i>
                </div>
                <div class="flex-1 chat-message-content text-sm text-gray-800 dark:text-gray-200">
                    ${parseMessageContent(message)}
                </div>
            </div>
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
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
        <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm p-3 mb-3 mr-8 sm:mr-12 shadow-md border border-gray-200 dark:border-gray-700">
            <div class="flex items-start space-x-2">
                <div class="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <i class="fas fa-robot text-white text-xs"></i>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="typing-indicator">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400">Thinking...</p>
                </div>
            </div>
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
    messageDiv.className = 'chat-message';
    messageDiv.innerHTML = `
        <div class="bg-red-50 dark:bg-red-900/20 rounded-2xl rounded-tl-sm p-4 mb-4 shadow-md border border-red-200 dark:border-red-800">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                    <i class="fas fa-exclamation-circle text-white text-sm"></i>
                </div>
                <div class="flex-1">
                    <p class="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">Error</p>
                    <p class="text-sm text-red-600 dark:text-red-400">${escapeHtml(message)}</p>
                </div>
            </div>
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
    
    // Reset textarea height
    input.style.height = 'auto';
    
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

// Scroll chat to bottom with smooth animation
function scrollChatToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
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
                badgeObserver.unobserve(entry.target); // Stop observing after animation
            }
        });
    });
    
    badgeObserver.observe(badge);
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
            labels: ['Python', 'RAG/LLM', 'FastAPI', 'Gemini AI', 'LangChain', 'Vector DBs', 'NLP', 'Cloud/DevOps'],
            datasets: [{
                label: 'Skill Proficiency',
                data: [95, 92, 90, 90, 88, 90, 87, 70],
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    angleLines: {
                        color: gridColor,
                        lineWidth: 2
                    },
                    grid: {
                        color: gridColor,
                        lineWidth: 1
                    },
                    pointLabels: {
                        color: textColor,
                        font: {
                            size: 14,
                            weight: '600',
                            family: "'Poppins', sans-serif"
                        },
                        padding: 10
                    },
                    ticks: {
                        color: textColor,
                        backdropColor: 'transparent',
                        beginAtZero: true,
                        min: 0,
                        max: 100,
                        stepSize: 20,
                        font: {
                            size: 12,
                            weight: '500'
                        },
                        showLabelBackdrop: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: textColor,
                        font: {
                            size: 16,
                            weight: '600',
                            family: "'Poppins', sans-serif"
                        },
                        padding: 20,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                    titleColor: isDark ? '#ffffff' : '#1a1a1a',
                    bodyColor: isDark ? '#ffffff' : '#1a1a1a',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 2,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.r + '%';
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false
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
