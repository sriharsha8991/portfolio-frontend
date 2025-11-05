/**
 * Portfolio Configuration File
 * Centralized configuration for easy deployment and environment management
 */

const CONFIG = {
    // Environment Configuration
    environments: {
        development: {
            apiUrl: 'http://127.0.0.1:8000',
            wsUrl: 'ws://127.0.0.1:8000',
            description: 'Local development server'
        },
        production: {
            apiUrl: 'https://portfolio-frontend-otua.onrender.com',
            wsUrl: 'wss://portfolio-frontend-otua.onrender.com',
            description: 'Production deployment on Render.com'
        }
    },
    
    // GitHub Configuration
    github: {
        username: 'sriharsha8991',
        repositoriesPerPage: 6
    },
    
    // EmailJS Configuration
    emailjs: {
        publicKey: 'ylZh_JF2YufHh1fS6',
        serviceId: 'service_fde9oj5',
        templateId: 'template_vwuhvzc'
    },
    
    // Feature Flags
    features: {
        chatEnabled: true,
        emailEnabled: true,
        githubIntegration: true,
        analyticsEnabled: false
    },
    
    // Auto-detect environment based on hostname
    getCurrentEnvironment() {
        const hostname = window.location.hostname;
        
        // Check if running locally
        if (hostname === 'localhost' || 
            hostname === '127.0.0.1' || 
            hostname.startsWith('192.168.') ||
            hostname.startsWith('10.')) {
            return 'development';
        }
        
        return 'production';
    },
    
    // Get current configuration
    getConfig() {
        const env = this.getCurrentEnvironment();
        return {
            environment: env,
            ...this.environments[env],
            github: this.github,
            emailjs: this.emailjs,
            features: this.features
        };
    }
};

// Make config globally available
window.PORTFOLIO_CONFIG = CONFIG;

// Log current configuration (useful for debugging)
console.log('📋 Portfolio Configuration Loaded:', CONFIG.getCurrentEnvironment());
