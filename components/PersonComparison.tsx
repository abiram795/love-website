"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { overallChatStats, individualStats, IndividualStat } from "@/data/chatStats";
import { MessageSquare, Type, Sparkles, Smile, Clock, Heart, Award } from "lucide-react";

export function PersonComparison() {
  const [selectedPerson, setSelectedPerson] = useState<"me" | "patti">("me");

  // Dynamic percentage calculations
  const mePercentage = (
    (overallChatStats.meMessages / overallChatStats.totalMessages) *
    100
  ).toFixed(2);
  const pattiPercentage = (
    (overallChatStats.pattiMessages / overallChatStats.totalMessages) *
    100
  ).toFixed(2);

  const activeStat: IndividualStat = individualStats[selectedPerson];

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Visual Comparison Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
      >
        <div className="text-center max-w-lg mx-auto mb-5 sm:mb-6">
          <span className="inline-block px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[11px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-1.5">
            The Balance of Us
          </span>
          <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl text-[var(--color-rose-deep)] font-bold">
            Who Talks More?
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 px-2">
            Proof that our connection is almost an exact 50 / 50 harmony.
          </p>
        </div>

        {/* Mobile-Friendly Vertical / Compact Comparison Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Me Card */}
          <div className="bg-[var(--color-bg-light)]/70 p-3.5 sm:p-4 rounded-2xl border border-[var(--color-pink-light)]/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-[family-name:var(--font-inter)] text-xs sm:text-sm font-semibold text-[var(--color-rose-deep)] flex items-center gap-1.5">
                <span>🌑</span> Me
              </span>
              <span className="text-xs font-bold text-[var(--color-rose-primary)]">
                {mePercentage}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[var(--color-text-main)]">
                {overallChatStats.meMessages.toLocaleString()}
              </span>
              <span className="text-[11px] text-[var(--color-text-secondary)]">messages</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-pink-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${mePercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-accent-pink)] rounded-full"
              />
            </div>
          </div>

          {/* Patti kutti Card */}
          <div className="bg-[var(--color-bg-light)]/70 p-3.5 sm:p-4 rounded-2xl border border-[var(--color-pink-light)]/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-[family-name:var(--font-inter)] text-xs sm:text-sm font-semibold text-[var(--color-rose-deep)] flex items-center gap-1.5">
                <span>🐶</span> Patti kutti
              </span>
              <span className="text-xs font-bold text-[var(--color-rose-primary)]">
                {pattiPercentage}%
              </span>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[var(--color-text-main)]">
                {overallChatStats.pattiMessages.toLocaleString()}
              </span>
              <span className="text-[11px] text-[var(--color-text-secondary)]">messages</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-pink-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pattiPercentage}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-rose-300 to-[var(--color-rose-deep)] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Dual Unified Balance Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full h-6 bg-pink-100 rounded-full overflow-hidden p-0.5 flex shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${mePercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[var(--color-rose-primary)] to-[var(--color-accent-pink)] rounded-l-full flex items-center justify-start pl-2.5 text-white text-[10px] sm:text-[11px] font-bold"
            >
              {mePercentage}%
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${pattiPercentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-rose-300 to-[var(--color-rose-deep)] rounded-r-full flex items-center justify-end pr-2.5 text-white text-[10px] sm:text-[11px] font-bold"
            >
              {pattiPercentage}%
            </motion.div>
          </div>

          <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-[var(--color-text-secondary)] px-1">
            <span>🌑 27,254 msgs</span>
            <span className="font-semibold text-[var(--color-rose-primary)] text-center">
              Only 62 msgs apart! ❤️
            </span>
            <span>🐶 27,316 msgs</span>
          </div>
        </div>
      </motion.div>

      {/* Individual Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl md:text-3xl text-[var(--color-rose-deep)] font-bold">
              Individual Deep Dive
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)]">
              Tap below to inspect personal chat habits.
            </p>
          </div>

          {/* Mobile-Friendly Toggle Buttons (min 44px height) */}
          <div
            className="flex items-center w-full sm:w-auto bg-[var(--color-pink-light)]/70 p-1.5 rounded-2xl border border-[var(--color-pink-soft)]"
            role="tablist"
            aria-label="Individual Chat Analytics"
          >
            <button
              role="tab"
              aria-selected={selectedPerson === "me"}
              onClick={() => setSelectedPerson("me")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedPerson === "me"
                  ? "bg-white text-[var(--color-rose-deep)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]"
              }`}
            >
              <span className="text-base">🌑</span>
              <span>Me</span>
            </button>
            <button
              role="tab"
              aria-selected={selectedPerson === "patti"}
              onClick={() => setSelectedPerson("patti")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedPerson === "patti"
                  ? "bg-white text-[var(--color-rose-deep)] shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)]"
              }`}
            >
              <span className="text-base">🐶</span>
              <span>Patti kutti</span>
            </button>
          </div>
        </div>

        {/* Selected Person Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPerson}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 sm:space-y-4"
          >
            {/* Person Banner */}
            <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[var(--color-pink-light)]/70 to-white border border-[var(--color-pink-soft)]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white flex items-center justify-center text-xl sm:text-2xl shadow-xs border border-[var(--color-pink-light)] shrink-0">
                {activeStat.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <h4 className="font-[family-name:var(--font-playfair)] text-base sm:text-xl font-bold text-[var(--color-rose-deep)] truncate">
                    {activeStat.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[var(--color-rose-primary)] text-white shrink-0">
                    {activeStat.percentage}% share
                  </span>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">
                  Personal chat patterns & sweet moments.
                </p>
              </div>
            </div>

            {/* Grid of Individual Stats (2 columns on mobile, 3 on tablet/desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Total Messages</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block tabular-nums">
                  {activeStat.totalMessages.toLocaleString()}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  {activeStat.percentage}% contribution
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Total Words</span>
                  <Type className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block tabular-nums">
                  {activeStat.totalWords.toLocaleString()}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Typed with care
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Unique Words</span>
                  <Sparkles className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block tabular-nums">
                  {activeStat.uniqueWords.toLocaleString()}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Expressions
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Total Emojis</span>
                  <Smile className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block tabular-nums">
                  {activeStat.totalEmojis.toLocaleString()}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Sent with love
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Top Word</span>
                  <Award className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-[family-name:var(--font-playfair)] text-base sm:text-2xl font-bold text-[var(--color-rose-deep)] truncate">
                    &quot;{activeStat.mostUsedWord.word}&quot;
                  </span>
                  <span className="text-[10px] text-[var(--color-text-secondary)]">
                    ({activeStat.mostUsedWord.count.toLocaleString()})
                  </span>
                </div>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Daily habit
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Top Emoji</span>
                  <Smile className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl">{activeStat.mostUsedEmoji.emoji}</span>
                  <span className="font-[family-name:var(--font-inter)] text-xs sm:text-sm font-semibold text-[var(--color-rose-deep)] tabular-nums">
                    {activeStat.mostUsedEmoji.count.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Kisses & smiles
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Peak Hour</span>
                  <Clock className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block">
                  {activeStat.mostActiveTime}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Nightly talks
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Love Words</span>
                  <Heart className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block tabular-nums">
                  {activeStat.loveWordsUsed.toLocaleString()}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  Sweet nicknames
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)] col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between text-[var(--color-text-secondary)] mb-1">
                  <span className="text-[11px] sm:text-xs font-medium">Avg Msg Length</span>
                  <Type className="w-3.5 h-3.5 text-[var(--color-rose-primary)] shrink-0" />
                </div>
                <span className="font-[family-name:var(--font-playfair)] text-lg sm:text-2xl font-bold text-[var(--color-rose-deep)] block tabular-nums">
                  {activeStat.avgMessageLength}
                </span>
                <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                  words per message
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
