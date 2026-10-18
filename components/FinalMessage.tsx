"use client";

import { motion } from "framer-motion";
import { loveData } from "@/data/loveData";

export function FinalMessage() {
  return (
    <section className="py-16 sm:py-24 md:py-32 px-4 bg-gradient-to-b from-white to-[var(--color-pink-light)] flex flex-col items-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl px-2"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-[var(--color-rose-primary)] text-3xl sm:text-4xl mb-4 sm:mb-6 inline-block"
        >
          ❤️
        </motion.div>
        
        <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-5xl md:text-6xl text-[var(--color-rose-deep)] font-bold mb-4 sm:mb-6 break-words">
          For you, {loveData.recipientName} ❤️
        </h2>
        
        <p className="font-[family-name:var(--font-inter)] text-sm sm:text-base md:text-xl text-[var(--color-text-main)] whitespace-pre-line leading-relaxed italic max-w-lg mx-auto">
          {loveData.finalMessage}
        </p>
      </motion.div>
    </section>
  );
}