"use client";

import { motion } from "framer-motion";
import { loveData } from "@/data/loveData";

export function LoveReasons() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60 } },
  };

  return (
    <section id="love-reasons" className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-14 px-2"
        >
          <span className="inline-block px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
            Endless Adoration
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl text-[var(--color-rose-deep)] mb-2 sm:mb-3 font-bold">
            Little things I love about you
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)]">
            Every little quirk, habit, and smile that stole my heart.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 md:gap-6"
        >
          {loveData.loveReasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              className="p-4 sm:p-6 md:p-8 bg-[var(--color-pink-light)]/40 rounded-2xl border border-[var(--color-pink-light)] flex items-start gap-3 sm:gap-4 hover:bg-[var(--color-pink-light)]/80 transition-colors"
            >
              <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl text-[var(--color-accent-pink)] font-bold italic opacity-60 shrink-0">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <p className="font-[family-name:var(--font-inter)] text-[var(--color-text-main)] text-sm sm:text-base md:text-lg pt-0.5 leading-relaxed">
                {reason}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}