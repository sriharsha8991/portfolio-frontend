/**
 * Portfolio Configuration
 * Centralized configuration for deployment and environment management
 */

export interface EnvironmentConfig {
  apiUrl: string;
  wsUrl: string;
  description: string;
}

export interface GitHubConfig {
  username: string;
  token?: string;
  reposPerPage: number;
}

export interface EmailJSConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

export interface FeatureFlags {
  chatEnabled: boolean;
  emailEnabled: boolean;
  githubStatsEnabled: boolean;
  analyticsEnabled: boolean;
}

export interface AppConfig {
  environment: 'development' | 'production';
  apiUrl: string;
  wsUrl: string;
  description: string;
  github: GitHubConfig;
  emailjs: EmailJSConfig;
  features: FeatureFlags;
}

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
    token: undefined,
    reposPerPage: 6
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
    githubStatsEnabled: true,
    analyticsEnabled: false
  },
  
  // Auto-detect environment based on hostname
  getCurrentEnvironment(): 'development' | 'production' {
    if (typeof window === 'undefined') {
      return 'development';
    }
    
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
  getConfig(): AppConfig {
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

// Log current configuration (useful for debugging)
if (typeof window !== 'undefined') {
  console.log('📋 Portfolio Configuration Loaded:', CONFIG.getCurrentEnvironment());
}

export default CONFIG;
