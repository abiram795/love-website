"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { loveWords, LoveWordStat } from "@/data/loveWords";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";

export function LoveWords() {
  const [showAll, setShowAll] = useState(false);

  // Initially show top 8 words on mobile (thangoo, luv, love, miss, sorry, kiss, uyire, baby)
  const displayedLoveWords = showAll ? loveWords : loveWords.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-white via-[var(--color-pink-light)]/30 to-white backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-rose-primary)]/30 shadow-xs relative overflow-hidden"
    >
      {/* Decorative heart watermark */}
      <div className="absolute -right-8 -bottom-8 opacity-5 text-[var(--color-rose-primary)] pointer-events-none">
        <Heart className="w-56 h-56 fill-current" />
      </div>

      <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 relative z-10 px-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-rose-primary)] text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-2.5 shadow-2xs">
          <Heart className="w-3 h-3 fill-current" />
          Pure Romance
        </span>
        <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl md:text-4xl text-[var(--color-rose-deep)] font-bold">
          Our Favourite Love Words ❤️
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
          The sweetest words, nicknames, and promises we typed across 54,570 messages.
        </p>
      </div>

      {/* Responsive Grid: 1 column on small mobile, 2 columns on 640px+, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 relative z-10">
        {displayedLoveWords.map((item: LoveWordStat, index: number) => {
          return (
            <motion.div
              key={item.word}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/95 border border-[var(--color-pink-soft)] hover:border-[var(--color-rose-primary)]/50 shadow-2xs transition-all"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-pink-light)] flex items-center justify-center text-[var(--color-rose-primary)] shrink-0">
                  <Heart className="w-4 h-4 fill-current" />
                </div>
                <div className="min-w-0">
                  <span className="font-[family-name:var(--font-playfair)] text-base sm:text-lg font-bold text-[var(--color-rose-deep)] block capitalize truncate">
                    {item.word}
                  </span>
                  {item.description && (
                    <span className="font-[family-name:var(--font-inter)] text-[10px] sm:text-[11px] text-[var(--color-text-secondary)] block truncate">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="font-[family-name:var(--font-inter)] text-sm sm:text-base font-bold text-[var(--color-rose-primary)] tabular-nums">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-[9px] text-[var(--color-text-secondary)] uppercase tracking-wider">
                  times
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Toggle with min 48px touch target */}
      <div className="mt-6 sm:mt-8 flex justify-center relative z-10">
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[var(--color-rose-primary)] text-white hover:bg-[var(--color-rose-deep)] active:bg-[var(--color-rose-deep)] transition-all shadow-xs cursor-pointer"
          aria-expanded={showAll}
        >
          <span>{showAll ? "Show Top Love Words" : `View All Love Words (${loveWords.length})`}</span>
          {showAll ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
