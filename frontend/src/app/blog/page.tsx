"use client";

import { ScrambleText } from "@/components/ui/scramble-text";

export default function Blog() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">
        <ScrambleText text="Signal Intercepted" />
      </h1>
      <p className="text-gray-400 font-mono">Transmission incoming...</p>
    </main>
  );
}
