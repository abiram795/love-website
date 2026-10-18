"use client";

import { motion } from "framer-motion";
import { overallChatStats } from "@/data/chatStats";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import {
  MessageCircle,
  FileText,
  Smile,
  Image as ImageIcon,
  Trash2,
  Edit3,
  Sparkles,
} from "lucide-react";

export function ChatStats() {
  const cards = [
    {
      label: "Total Messages",
      value: overallChatStats.totalMessages,
      icon: MessageCircle,
      suffix: "",
      highlight: true,
      description: "Words of love, laughs & forever",
    },
    {
      label: "🌑 Me Messages",
      value: overallChatStats.meMessages,
      icon: MessageCircle,
      suffix: "",
      description: "49.94% of our messages",
    },
    {
      label: "🐶 Patti Messages",
      value: overallChatStats.pattiMessages,
      icon: MessageCircle,
      suffix: "",
      description: "50.06% of our messages",
    },
    {
      label: "Unique Words",
      value: overallChatStats.uniqueWords,
      icon: Sparkles,
      suffix: "",
      description: "Our distinct shared vocabulary",
    },
    {
      label: "Analyzed Words",
      value: overallChatStats.analyzedWords,
      icon: FileText,
      suffix: "+",
      description: "Every sentence counted",
    },
    {
      label: "Total Emojis",
      value: overallChatStats.totalEmojis,
      icon: Smile,
      suffix: "+",
      description: "Endless kisses & giggles",
    },
    {
      label: "Media Messages",
      value: overallChatStats.mediaMessages,
      icon: ImageIcon,
      suffix: "",
      description: "Photos, audio & memories",
    },
    {
      label: "Deleted Messages",
      value: overallChatStats.deletedMessages,
      icon: Trash2,
      suffix: "",
      description: "Kept to an absolute minimum",
    },
    {
      label: "Edited Messages",
      value: overallChatStats.editedMessages,
      icon: Edit3,
      suffix: "",
      description: "Fixing sweet typos",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-5"
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-2xl p-3.5 sm:p-5 md:p-6 transition-all border ${
                card.highlight
                  ? "col-span-2 md:col-span-1 bg-gradient-to-br from-white via-[var(--color-pink-light)]/40 to-white border-[var(--color-rose-primary)]/40 shadow-sm ring-1 ring-[var(--color-rose-primary)]/20"
                  : "bg-white/85 backdrop-blur-xs border-[var(--color-pink-soft)]/60 shadow-2xs hover:border-[var(--color-accent-pink)]/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <span className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs md:text-sm font-medium text-[var(--color-text-secondary)] truncate mr-1">
                  {card.label}
                </span>
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${
                    card.highlight
                      ? "bg-[var(--color-rose-primary)] text-white"
                      : "bg-[var(--color-pink-light)] text-[var(--color-rose-primary)]"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>

              <div className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl md:text-4xl font-bold text-[var(--color-rose-deep)] tracking-tight mb-0.5 sm:mb-1 tabular-nums">
                <AnimatedCounter value={card.value} suffix={card.suffix} />
              </div>

              <p className="font-[family-name:var(--font-inter)] text-[10px] sm:text-xs text-[var(--color-text-secondary)]/80 line-clamp-1">
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
