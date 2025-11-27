"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrambleText } from "@/components/ui/scramble-text";
import { Check } from "lucide-react";

const TIERS = [
  {
    name: "Starter",
    price: "$5k",
    features: ["MVP Development", "Basic RAG Pipeline", "1 Month Support"],
  },
  {
    name: "Pro",
    price: "$15k",
    features: ["Full Scale Application", "Advanced LLM Agents", "3 Months Support", "Custom Fine-tuning"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: ["On-premise Deployment", "SLA Guarantee", "24/7 Priority Support", "Dedicated Team"],
  },
];

export default function Freelance() {
  const [hours, setHours] = useState(10);
  const rate = 150; // Hourly rate assumption for ROI
  const savings = hours * rate * 52; // Annual savings

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-6xl font-bold mb-16 text-center">
        <ScrambleText text="Engagement Protocols" />
      </h1>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {TIERS.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-8 rounded-3xl border ${tier.highlight ? 'border-accent-indigo bg-accent-indigo/5' : 'border-white/10 bg-white/5'} backdrop-blur-md flex flex-col`}
          >
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-indigo text-white text-xs font-bold rounded-full">
                RECOMMENDED
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="text-4xl font-mono font-bold mb-8">{tier.price}</div>
            <ul className="space-y-4 flex-1">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-sm text-gray-400">
                  <Check size={16} className="text-accent-cyan" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className={`mt-8 w-full py-3 rounded-xl font-medium transition-colors ${tier.highlight ? 'bg-accent-indigo text-white hover:bg-accent-indigo/80' : 'bg-white/10 hover:bg-white/20'}`}>
              Initiate
            </button>
          </motion.div>
        ))}
      </div>

      {/* ROI Calculator */}
      <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-8 text-center">ROI Estimator</h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <label className="block text-sm text-gray-400 mb-4">Hours Saved per Week by AI Automation</label>
            <input
              type="range"
              min="1"
              max="100"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent-cyan"
            />
            <div className="mt-2 text-right font-mono text-accent-cyan">{hours} hours</div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="text-sm text-gray-400 mb-1">Estimated Annual Savings</div>
            <div className="text-5xl font-bold font-mono text-green-400">
              ${savings.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
