"use client";

import { ScrambleText } from "@/components/ui/scramble-text";

export default function Hire() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-3xl mx-auto flex flex-col justify-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-12">
        <ScrambleText text="Establish Uplink" />
      </h1>

      <div className="p-8 rounded-xl border border-white/10 bg-black/50 font-mono">
        <div className="flex gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-500 text-xs mb-2">root@user:~/identity$</label>
            <input 
              type="text" 
              placeholder="Enter Name"
              className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-accent-cyan text-white placeholder-gray-700"
            />
          </div>
          
          <div>
            <label className="block text-gray-500 text-xs mb-2">root@user:~/contact$</label>
            <input 
              type="email" 
              placeholder="Enter Email"
              className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-accent-cyan text-white placeholder-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-xs mb-2">root@user:~/message$</label>
            <textarea 
              rows={4}
              placeholder="Enter Message Payload..."
              className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-accent-cyan text-white placeholder-gray-700 resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-white/10 hover:bg-accent-indigo/20 border border-white/10 hover:border-accent-indigo text-white transition-all mt-8 group flex items-center justify-center gap-2"
          >
            <span className="text-accent-cyan">&gt;</span> Push to Production
            <span className="animate-pulse">_</span>
          </button>
        </form>
      </div>
    </main>
  );
}
