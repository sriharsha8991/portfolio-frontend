"use client";

import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    title: "TenderGenie",
    desc: "A production-grade Document Intelligence Application that reduced tender review time by 10x. Features a retrieval-based RAG conversational assistant capable of complex datasheet extraction and summarization.",
    tech: ["Python", "Gemini AI", "Qdrant", "FastAPI", "Azure"],
    stats: { label: "Accuracy", value: "89.77%" },
    code: `async def process_tender(doc_id):
  # Extract text & tables
  content = await parser.extract(doc_id)
  
  # Generate embeddings
  vectors = embedding_model.encode(content)
  await qdrant.upsert(collection="tenders", points=vectors)
  
  # RAG Retrieval
  context = await qdrant.search(query, limit=5)
  return llm.generate(query, context)`
  },
  {
    title: "Multimodal RAG System",
    desc: "Research-driven RAG architecture for Siemens, capable of ingesting PDFs, extracting structured data, and integrating PID diagrams into knowledge graphs using Graph-RAG concepts.",
    tech: ["Python", "RAGAS", "SQL", "Graph-RAG", "Poetry"],
    stats: { label: "Innovation", value: "Graph-RAG" },
    code: `def build_knowledge_graph(pid_diagrams):
  # Extract entities from P&ID
  entities = extract_entities(pid_diagrams)
  
  # Create graph nodes & edges
  graph = nx.Graph()
  for entity in entities:
    graph.add_node(entity.id, type=entity.type)
    
  # Link to textual knowledge
  return integrate_with_vector_store(graph)`
  },
  {
    title: "Resume Filtering System",
    desc: "Agentic HR system for automated candidate ranking. Uses NLP for skill extraction and technical proficiency scoring, with an LLM acting as a judge for qualitative assessment.",
    tech: ["Python", "Streamlit", "spaCy", "Qdrant", "Groq AI"],
    stats: { label: "Efficiency", value: "100x" },
    code: `def rank_candidates(job_desc, resumes):
  jd_embedding = model.encode(job_desc)
  
  scores = []
  for resume in resumes:
    res_embedding = model.encode(resume.text)
    similarity = cosine_similarity(jd_embedding, res_embedding)
    scores.append((resume.id, similarity))
    
    return sorted(scores, key=lambda x: x[1], reverse=True)`
  },
  {
    title: "AI Interviewer & Analytics",
    desc: "A suite of AI tools including an automated interview question generator based on job descriptions and a market salary analysis tool with accessibility features.",
    tech: ["Python", "Streamlit", "LLMs", "Pandas"],
    stats: { label: "Tools", value: "2+" },
    code: `def generate_questions(role, experience):
  prompt = f"Generate 5 technical questions for a {role} with {experience} years exp."
  response = llm.predict(prompt)
  return parse_questions(response)

def analyze_salary(data):
  df = pd.DataFrame(data)
  return df.groupby('role')['salary'].mean()`
  }
];export default function Projects() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <ScrambleText text="Selected Works" />
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          A collection of high-fidelity AI systems, RAG architectures, and agentic solutions designed to solve complex data challenges.
        </p>
      </div>

      <div className="space-y-24">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 transition-all"
          >
            {/* Content */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">{project.title}</h2>
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-accent-cyan" />
                </div>
                <p className="text-gray-400 text-lg mb-8">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t, i) => (
                    <span 
                      key={t} 
                      className="px-3 py-1 rounded-full border border-white/10 bg-black/20 text-xs font-mono text-gray-400 group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-colors"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold font-mono text-white mb-1">{project.stats.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{project.stats.label}</div>
              </div>
            </div>

            {/* Code Block */}
            <div className="relative rounded-xl overflow-hidden bg-black/50 border border-white/5 font-mono text-sm p-4 group-hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-0 left-0 w-full h-8 bg-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <pre className="mt-8 text-gray-300 overflow-x-auto">
                <code>{project.code}</code>
              </pre>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
