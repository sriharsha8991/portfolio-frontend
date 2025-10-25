export interface SkillCategory {
  title: string;
  icon: string;
  color: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: '🤖',
    color: '#9B5DE5',
    skills: [
      'Python',
      'LangChain',
      'OpenAI',
      'Gemini',
      'FAISS',
      'Pinecone',
      'RAG Systems',
      'LlamaIndex',
      'HuggingFace',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn'
    ]
  },
  {
    title: 'Frameworks & Tools',
    icon: '⚡',
    color: '#00BBF9',
    skills: [
      'Streamlit',
      'FastAPI',
      'Next.js',
      'React',
      'Tailwind CSS',
      'MongoDB',
      'PostgreSQL',
      'Docker',
      'Git',
      'AWS',
      'Vercel',
      'Redis'
    ]
  },
  {
    title: 'Specializations',
    icon: '🎯',
    color: '#FEE440',
    skills: [
      'RAG Systems',
      'Healthcare AI',
      'Agentic Systems',
      'Multimodal AI',
      'Computer Vision',
      'NLP',
      'Prompt Engineering',
      'Vector Databases'
    ]
  }
];

export const topSkills = [
  'Python',
  'LangChain',
  'RAG Systems',
  'OpenAI',
  'Streamlit',
  'FastAPI'
];
