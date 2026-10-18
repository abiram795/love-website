"use client";

import { motion } from "framer-motion";
import { ChatStats } from "@/components/ChatStats";
import { PersonComparison } from "@/components/PersonComparison";
import { MostUsedWords } from "@/components/MostUsedWords";
import { LoveWords } from "@/components/LoveWords";
import { EmojiStats } from "@/components/EmojiStats";
import { ChatActivity } from "@/components/ChatActivity";
import { ChatRecords } from "@/components/ChatRecords";
import { Heart, Sparkles, MessageSquareHeart } from "lucide-react";

export function ChatAnalytics() {
  return (
    <section
      id="chat-story"
      className="relative py-14 sm:py-20 md:py-24 px-3 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--color-pink-light)]/20 via-white to-[var(--color-bg-light)] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient glow circles constrained within section */}
      <div className="absolute top-1/4 -left-32 sm:-left-48 w-64 sm:w-96 h-64 sm:h-96 bg-[var(--color-pink-light)]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 sm:-right-48 w-64 sm:w-96 h-64 sm:h-96 bg-[var(--color-pink-light)]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl w-full mx-auto space-y-8 sm:space-y-12 md:space-y-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto px-2"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[var(--color-pink-light)] border border-[var(--color-pink-soft)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-2xs mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5 text-[var(--color-rose-primary)]" />
            <span>Our WhatsApp Story</span>
          </div>

          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl text-[var(--color-rose-deep)] font-bold tracking-tight mb-2 sm:mb-3">
            Us, In Numbers ❤️
          </h2>

          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
            Every text, midnight laugh, favorite emoji, and whispered sweet nothing — analyzed and preserved just for us.
          </p>
        </motion.div>

        {/* 1. Overall Statistics Cards */}
        <ChatStats />

        {/* 2. Person Comparison & Individual Deep Dive */}
        <PersonComparison />

        {/* 3. Most Used Casual Words (Love words filtered out) */}
        <MostUsedWords />

        {/* 4. Love / Relationship Words */}
        <LoveWords />

        {/* 5. Complete Emoji Hall of Fame & Modal */}
        <EmojiStats />

        {/* 6. Chat Activity & Favourite Time to Talk */}
        <ChatActivity />

        {/* 7. Chat Records */}
        <ChatRecords />

        {/* Romantic Ending Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-5 sm:py-6 px-4 bg-[var(--color-pink-light)]/30 rounded-2xl border border-[var(--color-pink-soft)]/50"
        >
          <p className="font-[family-name:var(--font-playfair)] text-xs sm:text-base md:text-lg italic text-[var(--color-text-main)] flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            <Heart className="w-4 h-4 fill-current text-[var(--color-rose-primary)] shrink-0" />
            <span>54,570 messages and counting... my favorite notification is always you.</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
