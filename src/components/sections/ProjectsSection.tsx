"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "SMART-RESUME",
    description: "AI-powered resume generation platform with job description analysis and skill gap identification.",
    longDescription: "Built an intelligent system that analyzes job descriptions and automatically generates tailored resumes from candidate profiles, including skill gap analysis and interview preparation guidance.",
    image: "/api/placeholder/400/250",
    technologies: ["Python", "LangChain", "OpenAI", "Streamlit", "MongoDB", "FastAPI"],
    liveUrl: "#",
    githubUrl: "https://github.com/sriharsha8991/SMART-RESUME",
    featured: true,
    impact: "85% reduction in resume creation time"
  },
  {
    id: 2,
    title: "Healthcare AI Assistant",
    description: "Multimodal RAG-based healthcare chatbot with appointment booking and medical document analysis.",
    longDescription: "End-to-end healthcare assistant capable of symptom checking, appointment booking, lab result interpretation, emergency guidance, and lifestyle coaching using Gemini API.",
    image: "/api/placeholder/400/250",
    technologies: ["Gemini API", "Streamlit", "LangChain", "FastAPI", "MongoDB"],
    liveUrl: "#",
    githubUrl: "https://github.com/sriharsha8991/Health_care_assistant",
    featured: true,
    impact: "HIPAA-compliant AI infrastructure"
  },
  {
    id: 3,
    title: "FAISS-RAG-BOT",
    description: "Document intelligence system using FAISS for efficient similarity search and retrieval.",
    longDescription: "Advanced RAG system for document processing with FAISS vector database, enabling intelligent document search and analysis for enterprise applications.",
    image: "/api/placeholder/400/250",
    technologies: ["Python", "FAISS", "LangChain", "OpenAI", "Streamlit"],
    liveUrl: "#",
    githubUrl: "https://github.com/sriharsha8991/FAISS-RAG-BOT",
    featured: true,
    impact: "10,000+ daily queries processed"
  },
  {
    id: 4,
    title: "Brain Tumor Detection",
    description: "Medical AI system for automated brain tumor detection using computer vision.",
    longDescription: "Deep learning model for medical imaging analysis, specifically designed for brain tumor detection with high accuracy and clinical-grade performance.",
    image: "/api/placeholder/400/250",
    technologies: ["Python", "TensorFlow", "OpenCV", "Medical Imaging"],
    liveUrl: "#",
    githubUrl: "https://github.com/sriharsha8991/Brain_tumor_detection",
    featured: false,
    impact: "95% accuracy in detection"
  }
]

export default function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Real-world AI applications that solve business problems and deliver measurable impact
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full glass-card hover:shadow-xl hover:shadow-portfolio-purple/10 transition-all duration-300 group">
                  {/* Project Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-portfolio-purple/20 to-portfolio-cyan/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-6xl opacity-20">🚀</div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-heading group-hover:text-portfolio-purple transition-colors">
                        {project.title}
                      </CardTitle>
                      {project.featured && (
                        <Badge variant="secondary" className="bg-portfolio-purple/10 text-portfolio-purple">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>

                    {/* Impact */}
                    <p className="text-sm text-portfolio-cyan font-medium">
                      💡 {project.impact}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* View All Projects Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Button 
              size="lg" 
              variant="outline"
              className="border-portfolio-purple/20 hover:border-portfolio-purple/40 hover:bg-portfolio-purple/5"
            >
              View All Projects on GitHub
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}