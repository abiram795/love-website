"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { emojiStats, mostUsedEmojiHighlight, EmojiStat } from "@/data/emojiStats";
import { EmojiDetailModal } from "@/components/EmojiDetailModal";
import { Trophy } from "lucide-react";

export function EmojiStats() {
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiStat | null>(null);

  // Helper for clean mobile-friendly count display
  const formatCount = (count: number) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "K";
    }
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count.toLocaleString();
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Top #1 Emoji Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative overflow-hidden bg-gradient-to-br from-white via-[var(--color-pink-light)]/50 to-white rounded-3xl p-5 sm:p-8 md:p-10 border-2 border-[var(--color-rose-primary)]/30 shadow-md text-center"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-rose-primary)] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs mb-3">
          <Trophy className="w-3.5 h-3.5 text-amber-300 fill-current" />
          <span>Our #1 Most Used Emoji</span>
        </div>

        <motion.div
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-6xl sm:text-7xl md:text-8xl my-2 inline-block drop-shadow-xs select-none cursor-pointer"
          onClick={() => setSelectedEmoji(mostUsedEmojiHighlight)}
          title="Tap to view details"
        >
          {mostUsedEmojiHighlight.emoji}
        </motion.div>

        <h3 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-rose-deep)] mb-1.5 sm:mb-2 tabular-nums">
          {mostUsedEmojiHighlight.total.toLocaleString()} times
        </h3>

        <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)] mb-5 max-w-md mx-auto leading-relaxed px-2">
          Over 21,000 kisses sealed our days, midnight conversations, and morning texts.
        </p>

        {/* Person breakdown chips */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 max-w-md mx-auto">
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-[var(--color-pink-soft)] shadow-2xs">
            <span className="text-base">🌑</span>
            <span className="font-[family-name:var(--font-inter)] text-xs font-semibold text-[var(--color-text-main)]">
              Me:{" "}
              <strong className="text-[var(--color-rose-primary)]">
                {mostUsedEmojiHighlight.me.toLocaleString()}
              </strong>{" "}
              ({((mostUsedEmojiHighlight.me / mostUsedEmojiHighlight.total) * 100).toFixed(1)}%)
            </span>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-[var(--color-pink-soft)] shadow-2xs">
            <span className="text-base">🐶</span>
            <span className="font-[family-name:var(--font-inter)] text-xs font-semibold text-[var(--color-text-main)]">
              Patti:{" "}
              <strong className="text-[var(--color-rose-primary)]">
                {mostUsedEmojiHighlight.patti.toLocaleString()}
              </strong>{" "}
              ({((mostUsedEmojiHighlight.patti / mostUsedEmojiHighlight.total) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>

        <button
          onClick={() => setSelectedEmoji(mostUsedEmojiHighlight)}
          className="mt-4 min-h-[44px] text-xs text-[var(--color-rose-primary)] hover:text-[var(--color-rose-deep)] font-semibold underline underline-offset-4 cursor-pointer inline-flex items-center justify-center"
        >
          Tap for full percentage breakdown
        </button>
      </motion.div>

      {/* Complete Hall of Fame Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
      >
        <div className="mb-4 sm:mb-6">
          <span className="inline-block px-2.5 py-0.5 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-1.5">
            All Detected Emojis
          </span>
          <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl text-[var(--color-rose-deep)] font-bold">
            Emoji Hall of Fame 😘
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5">
            All {emojiStats.length} emojis detected (40,219 total). Tap any emoji to see who sent more!
          </p>
        </div>

        {/* Responsive Mobile-First Grid: 2 cols on 320px, 3 cols on 360px+, 4 on md, 5 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {emojiStats.map((item) => {
            return (
              <motion.button
                key={item.emoji}
                onClick={() => setSelectedEmoji(item)}
                whileTap={{ scale: 0.94 }}
                className="flex flex-col items-center justify-center min-h-[5rem] sm:min-h-[6rem] p-2.5 sm:p-3.5 rounded-2xl bg-[var(--color-bg-light)]/60 hover:bg-white active:bg-white border border-[var(--color-pink-light)] hover:border-[var(--color-accent-pink)]/60 shadow-2xs transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-rose-primary)]/40"
                aria-label={`View stats for emoji ${item.emoji}, total used ${item.total}`}
              >
                <span className="text-3xl sm:text-4xl mb-1 select-none">
                  {item.emoji}
                </span>

                <span className="font-[family-name:var(--font-playfair)] text-sm sm:text-base font-bold text-[var(--color-rose-deep)] tabular-nums">
                  {item.total.toLocaleString()}
                </span>

                <span className="text-[10px] text-[var(--color-text-secondary)] font-medium mt-0.5 sm:hidden">
                  {formatCount(item.total)} total
                </span>

                <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[var(--color-text-secondary)] mt-0.5 w-full justify-center">
                  <span>🌑 {formatCount(item.me)}</span>
                  <span>•</span>
                  <span>🐶 {formatCount(item.patti)}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Modal for detail view */}
      <EmojiDetailModal
        emoji={selectedEmoji}
        onClose={() => setSelectedEmoji(null)}
      />
    </div>
  );
}
