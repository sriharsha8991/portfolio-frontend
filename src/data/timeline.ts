export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: string;
  color: string;
  achievements?: string[];
}

export const timeline: TimelineItem[] = [
  {
    id: 'datasmith',
    title: 'AI Engineer',
    organization: 'Datasmith AI Solutions',
    period: '2024 - Present',
    description: 'Building production RAG systems, multimodal AI applications, and agentic workflows. Leading healthcare AI initiatives and mentoring junior developers.',
    icon: '🚀',
    color: '#9B5DE5',
    achievements: [
      'Built 5+ production RAG systems',
      'Led healthcare AI project team',
      'Reduced inference time by 60%'
    ]
  },
  {
    id: 'research',
    title: 'AI/ML Research & Development',
    organization: 'Independent Projects',
    period: '2023 - 2024',
    description: 'Developed 64+ AI projects including RAG systems, computer vision applications, and NLP solutions. Achieved 3 Kaggle medals through competitive ML.',
    icon: '🧠',
    color: '#00BBF9',
    achievements: [
      '64+ AI projects completed',
      '3 Kaggle medals earned',
      'Published technical articles'
    ]
  },
  {
    id: 'education',
    title: 'Computer Science Engineering',
    organization: 'B.Tech',
    period: '2019 - 2023',
    description: 'Built strong foundations in algorithms, data structures, and ML. Solved 200+ LeetCode problems and completed multiple AI certifications.',
    icon: '🎓',
    color: '#FEE440',
    achievements: [
      '200+ LeetCode problems solved',
      'Multiple AI certifications',
      'Strong DSA foundation'
    ]
  }
];

export const quickFacts = [
  { icon: '🎓', text: 'B.Tech in Computer Science & Engineering' },
  { icon: '💼', text: 'AI Engineer at Datasmith AI Solutions' },
  { icon: '🏆', text: '3 Kaggle Medals (Bronze, Bronze, Silver)' },
  { icon: '📍', text: 'Based in India, Working Globally' }
];
