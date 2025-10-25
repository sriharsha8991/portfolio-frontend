'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, MessageSquare } from 'lucide-react';

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] p-4 rounded-full shadow-2xl hover:shadow-[#9B5DE5]/50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <Bot className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-8 z-40 w-96 max-w-[calc(100vw-4rem)]"
          >
            <div className="glass border-2 border-[#9B5DE5]/30 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#9B5DE5] to-[#00BBF9] p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Chat with Sriharsha.AI</h3>
                    <p className="text-xs text-white/80">Ask me anything!</p>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <div className="p-4 h-96 overflow-y-auto space-y-4 bg-[#0a0a0a]/95">
                {/* AI Message */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start"
                >
                  <div className="glass rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] border border-white/10">
                    <p className="text-sm mb-2">👋 Hi! I'm Sriharsha's AI assistant. I can tell you about:</p>
                    <ul className="text-sm space-y-1 text-gray-300">
                      <li>• RAG Systems & AI Projects</li>
                      <li>• Healthcare AI Experience</li>
                      <li>• Technical Skills & Tools</li>
                      <li>• Professional Journey</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Sample User Message */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-end"
                >
                  <div className="bg-[#9B5DE5]/20 backdrop-blur-sm rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%]">
                    <p className="text-sm">What technologies do you use?</p>
                  </div>
                </motion.div>

                {/* AI Response */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-start"
                >
                  <div className="glass rounded-2xl rounded-tl-none px-4 py-3 max-w-[85%] border border-white/10">
                    <p className="text-sm">I specialize in Python, LangChain, FAISS, OpenAI, Gemini, FastAPI, Next.js, and more! Check out the Skills section for the full list 🚀</p>
                  </div>
                </motion.div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/10 bg-[#0a0a0a]/95">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coming soon: Fully functional AI chat..."
                    disabled
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400 cursor-not-allowed"
                  />
                  <button
                    disabled
                    className="bg-[#9B5DE5]/50 p-3 rounded-xl cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  🔧 AI chat powered by LangChain coming soon
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
