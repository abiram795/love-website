"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveData } from "@/data/loveData";

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  // Generate pseudo-random values once to avoid hydration and purity errors
  const hearts = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: ((i * 17) % 100) + "vw",
      scale: ((i * 0.3) % 1) + 0.5,
      duration: ((i * 2) % 5) + 10,
    }));
  }, []);

  return (
    <section id="love-letter" className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 flex justify-center items-center bg-white min-h-[70dvh] sm:min-h-[80vh] overflow-hidden relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {/* Simple floating shapes behind the letter */}
            {hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-[var(--color-pink-soft)] opacity-30"
                initial={{ 
                  y: "100vh", 
                  x: heart.x,
                  scale: heart.scale
                }}
                animate={{ 
                  y: "-20vh",
                  rotate: 360
                }}
                transition={{ 
                  duration: heart.duration,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                ❤️
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
        {!isOpen ? (
          <motion.div 
            className="relative cursor-pointer group w-full max-w-[300px] aspect-[4/3] bg-[var(--color-pink-light)] rounded-lg shadow-lg border border-[var(--color-pink-soft)] flex items-center justify-center transition-transform hover:scale-105"
            onClick={() => setIsOpen(true)}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            {/* Envelope flap visual */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--color-pink-soft)] origin-top rounded-t-lg transition-transform duration-500 group-hover:rotate-x-12" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
            
            <div className="z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
                <span className="text-[var(--color-rose-primary)] text-xl">💌</span>
              </div>
              <span className="font-[family-name:var(--font-inter)] text-sm font-medium text-[var(--color-rose-deep)] bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm">
                Open this
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full bg-[#FFFBF9] rounded-xl shadow-xl p-8 md:p-12 border border-[var(--color-pink-soft)] relative"
          >
            <div className="absolute top-4 right-4 text-xs text-[var(--color-text-secondary)]/50 font-serif">
              Special Delivery
            </div>
            
            <div className="prose prose-pink max-w-none">
              <p className="font-[family-name:var(--font-inter)] text-base md:text-lg text-[var(--color-text-main)] whitespace-pre-line leading-loose">
                {loveData.letter}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-[var(--color-pink-light)] flex justify-end">
              <span className="font-[family-name:var(--font-playfair)] italic text-xl text-[var(--color-rose-primary)]">
                Yours, always.
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}