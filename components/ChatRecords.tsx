"use client";

import { motion } from "framer-motion";
import { chatRecords } from "@/data/chatStats";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ShieldCheck, Image as ImageIcon, Trash2, Edit3, MessageCircle } from "lucide-react";

export function ChatRecords() {
  const records = [
    {
      title: "Total Messages",
      value: chatRecords.totalMessages,
      icon: MessageCircle,
      desc: "Every single text sent",
      color: "text-[var(--color-rose-deep)]",
      bg: "bg-[var(--color-pink-light)]",
    },
    {
      title: "Media Messages",
      value: chatRecords.mediaMessages,
      icon: ImageIcon,
      desc: "Photos & shared moments",
      color: "text-rose-600",
      bg: "bg-rose-100",
    },
    {
      title: "Deleted Messages",
      value: chatRecords.deletedMessages,
      icon: Trash2,
      desc: "Nothing hidden between us",
      color: "text-amber-700",
      bg: "bg-amber-100",
    },
    {
      title: "Edited Messages",
      value: chatRecords.editedMessages,
      icon: Edit3,
      desc: "Sweet typo fixes",
      color: "text-emerald-700",
      bg: "bg-emerald-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <span className="inline-block px-2.5 py-0.5 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-1">
            Archived Keepsake
          </span>
          <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl text-[var(--color-rose-deep)] font-bold">
            Our Chat Records 📜
          </h3>
        </div>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[var(--color-pink-light)] text-[var(--color-rose-primary)] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        {records.map((rec) => {
          const Icon = rec.icon;
          return (
            <div
              key={rec.title}
              className="p-3 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)] flex flex-col justify-between"
            >
              <div>
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl ${rec.bg} ${rec.color} flex items-center justify-center mb-2`}>
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs font-medium text-[var(--color-text-secondary)] block truncate">
                  {rec.title}
                </span>
                <span className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-rose-deep)] my-0.5 sm:my-1 block tabular-nums">
                  <AnimatedCounter value={rec.value} />
                </span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[9px] sm:text-[11px] text-[var(--color-text-secondary)]/80 mt-1 line-clamp-1">
                {rec.desc}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
