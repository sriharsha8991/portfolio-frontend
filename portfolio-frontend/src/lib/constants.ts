// Brand Colors - Purple Primary Theme
export const COLORS = {
  primary: '#9B5DE5',
  secondary: '#00BBF9',
  accent: '#FEE440',
  background: {
    primary: '#0a0a0a',
    secondary: '#111111',
    tertiary: '#1a1a1a',
  },
  text: {
    primary: '#ffffff',
    secondary: '#e5e5e5',
    muted: '#a0a0a0',
  }
} as const;

// Personal Information
export const PERSONAL_INFO = {
  name: 'Sriharsha Velicheti',
  title: 'AI Engineer & Agentic Systems Developer',
  tagline: 'Building intelligent systems that bridge cutting-edge AI research with real-world applications',
  email: 'srih8991@gmail.com',
  phone: '+91 8309012139',
  location: 'India',
  github: 'https://github.com/sriharsha8991',
  linkedin: 'https://linkedin.com/in/sriharsha-velicheti-0794351b2',
  kaggle: 'https://kaggle.com/sriharsha8991',
} as const;

// Stats for Hero Section
export const STATS = [
  { label: '64+ AI Projects', value: '64+' },
  { label: '3 Kaggle Medals', value: '3' },
  { label: 'Healthcare AI Specialist', value: '🏥' },
  { label: '200+ LeetCode Solved', value: '200+' }
] as const;

// Bio Text
export const BIO = {
  short: "I'm an AI Engineer passionate about building intelligent systems that solve real-world problems. With expertise in RAG systems, multimodal AI, and agentic architectures, I transform complex AI research into production-ready applications.",
  full: [
    "My work spans healthcare AI, document intelligence, and conversational systems. I believe in building AI that's not just powerful, but also ethical, secure, and user-friendly.",
    "Beyond coding, I'm an active contributor to the AI community through open-source projects, Kaggle competitions, and technical writing. I love exploring cutting-edge papers and translating them into practical implementations."
  ]
} as const;

// Animation Timings
export const ANIMATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  verySlow: 0.8,
} as const;
