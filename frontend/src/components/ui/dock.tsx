"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Brain, Cpu, User, Briefcase, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const DOCK_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "Intelligence", href: "/about", icon: Brain },
  { name: "Cortex", href: "/projects", icon: Cpu },
  { name: "Personal", href: "/life", icon: User },
  { name: "Services", href: "/freelance", icon: Briefcase },
  { name: "Contact", href: "/hire", icon: Mail },
];

export const Dock = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      >
        {DOCK_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative group">
              <motion.div
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-3 rounded-xl transition-colors duration-300",
                  isActive ? "bg-white/10 text-accent-cyan" : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={24} />
                {isActive && (
                  <motion.div
                    layoutId="dock-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-cyan"
                  />
                )}
              </motion.div>
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                {item.name}
              </span>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
};
