"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { wordStats, WordStat } from "@/data/wordStats";
import { Search, ChevronDown, ChevronUp, Sparkles } from "lucide-react";

export function MostUsedWords() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const maxCount = wordStats[0]?.count || 1;

  // Filter based on search if typed
  const filteredWords = wordStats.filter((w) =>
    w.word.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // If not expanded and not searching, show top 12 on mobile, 15 on larger screens
  const displayedWords =
    searchQuery.trim().length > 0
      ? filteredWords
      : isExpanded
      ? wordStats
      : wordStats.slice(0, 12);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
            <span className="inline-block px-2.5 py-0.5 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full">
              Vocabulary Analysis
            </span>
            <span className="text-[11px] sm:text-xs text-[var(--color-text-secondary)] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[var(--color-accent-pink)]" />
              Casual chat words
            </span>
          </div>
          <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl text-[var(--color-rose-deep)] font-bold">
            Most Used Words 💬
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5">
            Our daily phrases and texting habits. Love words are reserved in their own romantic section below!
          </p>
        </div>

        {/* Search input with 44px min touch height */}
        <div className="relative w-full md:w-60 mt-1 sm:mt-0">
          <Search className="w-4 h-4 text-[var(--color-text-secondary)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search word..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-[var(--color-pink-soft)] focus:border-[var(--color-accent-pink)] focus:outline-none bg-[var(--color-bg-light)]/40 text-[var(--color-text-main)] placeholder:text-[var(--color-text-secondary)]/60 transition-colors"
          />
        </div>
      </div>

      {/* Responsive Word List Container (scrolls internally when expanded to keep mobile tidy) */}
      <div
        className={
          isExpanded && !searchQuery
            ? "max-h-[26rem] sm:max-h-[32rem] overflow-y-auto pr-1 scrollbar-thin"
            : ""
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {displayedWords.map((item: WordStat) => {
            const rank = wordStats.findIndex((w) => w.word === item.word) + 1;
            const percentage = ((item.count / maxCount) * 100).toFixed(0);

            return (
              <motion.div
                key={item.word}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden flex items-center justify-between p-3 sm:p-3.5 rounded-2xl bg-[var(--color-bg-light)]/50 border border-[var(--color-pink-light)] hover:border-[var(--color-accent-pink)]/40 hover:bg-white transition-all group"
              >
                {/* Background progress indicator */}
                <div
                  className="absolute left-0 top-0 bottom-0 bg-[var(--color-pink-light)]/40 -z-0 rounded-l-2xl transition-all group-hover:bg-[var(--color-pink-soft)]/40"
                  style={{ width: `${percentage}%` }}
                />

                <div className="relative z-10 flex items-center gap-2.5">
                  <span className="font-[family-name:var(--font-inter)] text-[10px] sm:text-[11px] font-bold text-[var(--color-accent-pink)] w-6 text-center shrink-0">
                    #{rank.toString().padStart(2, "0")}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-sm sm:text-base font-semibold text-[var(--color-rose-deep)] truncate max-w-[140px] sm:max-w-none">
                    {item.word}
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 shrink-0">
                  <span className="font-[family-name:var(--font-inter)] text-xs font-bold text-[var(--color-text-main)] bg-white/95 px-2.5 py-1 rounded-full border border-[var(--color-pink-soft)] shadow-2xs tabular-nums">
                    {item.count.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-8 text-[var(--color-text-secondary)] text-xs sm:text-sm">
          No words found matching &quot;{searchQuery}&quot;.
        </div>
      )}

      {/* View All / Collapse Button with 48px touch target */}
      {!searchQuery && (
        <div className="mt-6 sm:mt-8 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-white border border-[var(--color-rose-primary)]/30 text-[var(--color-rose-deep)] hover:bg-[var(--color-pink-light)] active:bg-[var(--color-pink-soft)] transition-all shadow-xs cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? "Show Top 12 Words" : `View All Words (${wordStats.length})`}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[var(--color-rose-primary)]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[var(--color-rose-primary)]" />
            )}
          </button>
        </div>
      )}
    </motion.div>
  );
}
