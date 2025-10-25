'use client';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';
import { Bot, MessageSquare } from 'lucide-react';

export function ChatSection() {
  return (
    <section id="chat" className="py-24 px-4 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] bg-clip-text text-transparent mb-4">
              Chat with Sriharsha.AI
            </h2>
            <p className="text-xl text-gray-400">
              Ask me anything about my work, skills, or journey
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="glass p-8 rounded-2xl relative border-2 border-[#9B5DE5]/20">
            {/* Floating Bot Icon */}
            <motion.div
              className="absolute -top-6 -right-6 bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] p-4 rounded-2xl shadow-xl"
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="w-8 h-8" />
            </motion.div>

            {/* Mock Chat Interface */}
            <div className="space-y-4 mb-6 h-80 overflow-y-auto pr-2">
              {/* User Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-end"
              >
                <div className="bg-[#9B5DE5]/20 backdrop-blur-sm rounded-2xl rounded-tr-none px-6 py-4 max-w-md">
                  <p className="text-sm">What technologies do you specialize in?</p>
                </div>
              </motion.div>

              {/* AI Response */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-start"
              >
                <div className="glass rounded-2xl rounded-tl-none px-6 py-4 max-w-md border border-white/10">
                  <p className="text-sm mb-2">I specialize in building production-ready AI systems! My core expertise includes:</p>
                  <ul className="text-sm space-y-1 text-gray-300">
                    <li>• RAG Systems (LangChain, FAISS, Pinecone)</li>
                    <li>• Multimodal AI (Vision + Text)</li>
                    <li>• Healthcare AI Applications</li>
                    <li>• Agentic Systems & LLM Orchestration</li>
                  </ul>
                </div>
              </motion.div>

              {/* User Message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-end"
              >
                <div className="bg-[#00BBF9]/20 backdrop-blur-sm rounded-2xl rounded-tr-none px-6 py-4 max-w-xs">
                  <p className="text-sm">Tell me about your healthcare AI work</p>
                </div>
              </motion.div>

              {/* AI Response */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex justify-start"
              >
                <div className="glass rounded-2xl rounded-tl-none px-6 py-4 max-w-md border border-white/10">
                  <p className="text-sm">
                    I've built HIPAA-compliant healthcare AI systems that handle appointment booking, 
                    medical document analysis, and multimodal patient interactions. These systems use 
                    advanced RAG pipelines with secure data handling! 🏥
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Mock Input */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="This chatbot will be functional soon..."
                disabled
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
              />
              <button
                disabled
                className="bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] px-6 py-3 rounded-xl font-semibold opacity-50 cursor-not-allowed flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Send
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              🚧 Coming Soon: Fully functional AI chatbot powered by LangChain
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
