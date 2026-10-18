"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Compatibility() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("Mithra");
  const [score, setScore] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;

    setIsCalculating(true);
    setScore(null);

    const combined = (name1.trim().toLowerCase() + name2.trim().toLowerCase()).replace(/\s/g, "");
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = combined.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const calculatedScore = 85 + (Math.abs(hash) % 16);

    setTimeout(() => {
      setScore(calculatedScore);
      setIsCalculating(false);
    }, 1200);
  };

  return (
    <section id="compatibility" className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 flex justify-center bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--color-pink-light)_0%,_transparent_70%)] opacity-30 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 px-2"
        >
          <span className="inline-block px-3 py-1 bg-[var(--color-pink-soft)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full mb-2">
            Just for fun
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[var(--color-text-main)] mb-1.5 font-bold">
            Are we meant to be?
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)]">
            (Spoiler: The answer is always 100% yes ❤️)
          </p>
        </motion.div>

        <form onSubmit={calculateCompatibility} className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-1.5">
            <input
              type="text"
              placeholder="Your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[var(--color-pink-light)] focus:border-[var(--color-accent-pink)] focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-text-secondary)]/50"
              required
            />
          </div>
          <div className="flex justify-center text-[var(--color-rose-primary)]">
            <motion.div
              animate={isCalculating ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] } : {}}
              transition={{ repeat: isCalculating ? Infinity : 0, duration: 0.5 }}
              className="text-xl"
            >
              ❤️
            </motion.div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full min-h-[48px] px-4 py-3 rounded-xl border-2 border-[var(--color-pink-light)] focus:border-[var(--color-accent-pink)] focus:outline-none transition-colors font-[family-name:var(--font-inter)] text-sm text-[var(--color-text-main)]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isCalculating || !name1.trim() || !name2.trim()}
            className="w-full min-h-[48px] mt-3 py-3.5 bg-[var(--color-text-main)] text-white rounded-xl text-xs sm:text-sm font-bold tracking-wider hover:bg-[var(--color-rose-deep)] active:bg-[var(--color-rose-deep)] transition-colors disabled:opacity-50 cursor-pointer active:scale-98"
          >
            {isCalculating ? "CALCULATING OUR LOVE..." : "CALCULATE COMPATIBILITY"}
          </button>
        </form>

        <AnimatePresence>
          {score !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="text-center bg-[var(--color-bg-light)] p-6 sm:p-8 rounded-2xl border border-[var(--color-pink-soft)] shadow-xs"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3 sm:mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--color-pink-light)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--color-rose-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    initial={{ strokeDashoffset: 251.2 }}
                    animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-bold text-[var(--color-rose-deep)] tabular-nums">
                    {score}%
                  </span>
                </div>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-sm sm:text-base text-[var(--color-text-main)] font-semibold">
                {score >= 95 ? "A match made in heaven ✨" : score >= 90 ? "Pretty magical ✨" : "Perfect soulmates ❤️"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}