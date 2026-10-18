"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EmojiStat } from "@/data/emojiStats";
import { X, Sparkles } from "lucide-react";

interface EmojiDetailModalProps {
  emoji: EmojiStat | null;
  onClose: () => void;
}

export function EmojiDetailModal({ emoji, onClose }: EmojiDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (emoji) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [emoji, onClose]);

  if (!emoji) return null;

  // Dynamic calculations
  const mePercent = emoji.total > 0 ? ((emoji.me / emoji.total) * 100).toFixed(2) : "0.00";
  const pattiPercent = emoji.total > 0 ? ((emoji.patti / emoji.total) * 100).toFixed(2) : "0.00";

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="emoji-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border-t sm:border border-[var(--color-pink-soft)] overflow-y-auto max-h-[88dvh] pb-safe"
        >
          {/* Mobile Bottom-Sheet Pull Handle */}
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-3 sm:hidden" />

          {/* Large Touch Close Button (44px min target) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[var(--color-pink-light)]/80 hover:bg-[var(--color-pink-light)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] flex items-center justify-center transition-colors active:scale-95 cursor-pointer z-10"
            aria-label="Close emoji details"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Decorative ambient background blur */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-[var(--color-pink-light)]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Modal Header */}
          <div className="text-center mb-5 sm:mb-6 pt-1 sm:pt-0">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="text-5xl sm:text-7xl mb-2 sm:mb-3 drop-shadow-xs inline-block select-none"
            >
              {emoji.emoji}
            </motion.div>
            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[var(--color-rose-primary)] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Emoji Details</span>
            </div>
            <h3
              id="emoji-modal-title"
              className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[var(--color-rose-deep)]"
            >
              Used {emoji.total.toLocaleString()} Times
            </h3>
          </div>

          {/* Person Breakdown Cards */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
            <div className="p-3.5 rounded-2xl bg-[var(--color-bg-light)] border border-[var(--color-pink-light)] flex flex-col items-center text-center">
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-text-secondary)] flex items-center gap-1">
                <span>🌑</span> Me
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] mt-1 tabular-nums">
                {emoji.me.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[var(--color-rose-primary)] mt-0.5">
                {mePercent}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--color-bg-light)] border border-[var(--color-pink-light)] flex flex-col items-center text-center">
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--color-text-secondary)] flex items-center gap-1">
                <span>🐶</span> Patti kutti
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] mt-1 tabular-nums">
                {emoji.patti.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[var(--color-rose-primary)] mt-0.5">
                {pattiPercent}%
              </span>
            </div>
          </div>

          {/* Visual Share Bar */}
          <div className="space-y-1.5 mb-6">
            <div className="flex justify-between text-[10px] sm:text-[11px] text-[var(--color-text-secondary)] font-medium">
              <span>🌑 Me ({mePercent}%)</span>
              <span>🐶 Patti ({pattiPercent}%)</span>
            </div>
            <div className="w-full h-3.5 bg-pink-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-accent-pink)] transition-all duration-500"
                style={{ width: `${mePercent}%` }}
              />
              <div
                className="h-full bg-gradient-to-r from-rose-300 to-[var(--color-rose-deep)] transition-all duration-500"
                style={{ width: `${pattiPercent}%` }}
              />
            </div>
          </div>

          {/* Action Close Button (min 48px height) */}
          <button
            onClick={onClose}
            className="w-full min-h-[48px] py-3 bg-[var(--color-rose-primary)] text-white rounded-2xl text-xs sm:text-sm font-semibold hover:bg-[var(--color-rose-deep)] active:bg-[var(--color-rose-deep)] transition-colors shadow-xs cursor-pointer"
          >
            Close Details
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
