export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  icon: string;
  impact: string;
  githubUrl?: string;
  demoUrl?: string;
  category: 'rag' | 'healthcare' | 'cv' | 'nlp' | 'multimodal';
  featured: boolean;
  size: 'large' | 'medium' | 'small'; // For Bento Grid
}

export const projects: Project[] = [
  {
    id: 'smart-resume',
    title: 'SMART-RESUME',
    description: 'AI-powered resume generation with job description analysis and skill gap identification',
    longDescription: 'An intelligent resume builder that analyzes job descriptions, identifies skill gaps, and generates ATS-optimized resumes tailored to specific roles. Uses advanced NLP and prompt engineering.',
    technologies: ['Python', 'LangChain', 'OpenAI', 'Streamlit', 'PDF Generation'],
    icon: '🤖',
    impact: '85% reduction in resume creation time',
    githubUrl: 'https://github.com/sriharsha8991/SMART-RESUME',
    category: 'nlp',
    featured: true,
    size: 'large'
  },
  {
    id: 'healthcare-assistant',
    title: 'Healthcare AI Assistant',
    description: 'HIPAA-compliant multimodal healthcare chatbot with appointment booking and medical document analysis',
    longDescription: 'A comprehensive healthcare virtual assistant that handles patient interactions, appointment scheduling, medical record analysis, and provides intelligent health recommendations using multimodal AI.',
    technologies: ['Gemini API', 'Streamlit', 'MongoDB', 'RAG', 'Multimodal AI'],
    icon: '🏥',
    impact: 'HIPAA-compliant AI infrastructure',
    githubUrl: 'https://github.com/sriharsha8991',
    category: 'healthcare',
    featured: true,
    size: 'large'
  },
  {
    id: 'faiss-rag-bot',
    title: 'FAISS-RAG-BOT',
    description: 'High-performance document intelligence system using FAISS for efficient similarity search',
    longDescription: 'A production-ready RAG system leveraging FAISS vector database for lightning-fast semantic search across massive document collections. Handles 10K+ daily queries with sub-second response times.',
    technologies: ['Python', 'FAISS', 'LangChain', 'Embeddings', 'FastAPI'],
    icon: '📚',
    impact: '10,000+ daily queries processed',
    githubUrl: 'https://github.com/sriharsha8991/FAISS-RAG-BOT',
    category: 'rag',
    featured: true,
    size: 'medium'
  },
  {
    id: 'object-detection',
    title: 'Real-time Object Detection',
    description: 'Computer vision system for real-time object detection and tracking',
    longDescription: 'High-performance object detection pipeline using state-of-the-art models for real-time video analysis, security monitoring, and automated surveillance systems.',
    technologies: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow', 'Computer Vision'],
    icon: '👁️',
    impact: '30 FPS real-time detection',
    githubUrl: 'https://github.com/sriharsha8991',
    category: 'cv',
    featured: true,
    size: 'medium'
  }
];

export const featuredProjects = projects.filter(p => p.featured);
