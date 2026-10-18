"use client";

import { motion } from "framer-motion";
import { loveData } from "@/data/loveData";
import { ChevronDown, Heart } from "lucide-react";

export function Hero() {
  const scrollToFirst = () => {
    const section = document.getElementById("scratch-card");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[92dvh] sm:min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 py-16 sm:py-24 text-center"
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--color-bg-light)] via-[var(--color-pink-light)]/40 to-[var(--color-bg-light)] opacity-70 pointer-events-none" />

      {/* Subtle ambient light blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-[var(--color-pink-soft)]/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="z-10 flex flex-col items-center max-w-2xl w-full"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="mb-3 sm:mb-5 text-[var(--color-rose-primary)]"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/80 shadow-xs flex items-center justify-center border border-[var(--color-pink-soft)]">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 fill-current text-[var(--color-rose-primary)] animate-pulse" />
          </div>
        </motion.div>

        {/* Responsive Heading */}
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--color-rose-deep)] mb-3 sm:mb-4 drop-shadow-xs break-words max-w-full">
          {loveData.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl md:text-3xl italic text-[var(--color-text-main)] mb-3 sm:mb-5 max-w-lg px-2">
          &quot;{loveData.hero.subtitle}&quot;
        </p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)] font-normal max-w-md mx-auto mb-8 sm:mb-10 px-4 leading-relaxed"
        >
          {loveData.hero.description}
        </motion.p>

        {/* Mobile-friendly Touch Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToFirst}
          className="inline-flex items-center gap-2 min-h-[48px] px-6 sm:px-8 py-3 rounded-full bg-[var(--color-rose-primary)] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-md hover:bg-[var(--color-rose-deep)] active:bg-[var(--color-rose-deep)] transition-all cursor-pointer"
          aria-label="Begin our story"
        >
          <span>Begin Our Story</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </motion.div>
    </section>
  );
}