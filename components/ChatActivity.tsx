"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { activityStats, ActiveDay, ActiveHour } from "@/data/activityStats";
import { Calendar, Moon, Sparkles, Flame, Heart } from "lucide-react";

export function ChatActivity() {
  const [selectedHour, setSelectedHour] = useState<ActiveHour>(
    activityStats.peakHours[0] || activityStats.allHourlyDistribution[21]
  );

  const maxHourlyCount = Math.max(...activityStats.allHourlyDistribution.map((h) => h.messages));

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      {/* Most Active Days Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
      >
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
            <Calendar className="w-3.5 h-3.5 text-[var(--color-rose-primary)]" />
            Chat Milestones
          </span>
          <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl md:text-4xl text-[var(--color-rose-deep)] font-bold">
            Our Most Active Days 📅
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1">
            Days when our phones never left our hands, laughing and talking endlessly.
          </p>
        </div>

        {/* Most Active Day Hero Card (Responsive on small phones) */}
        <div className="relative overflow-hidden rounded-3xl p-4 sm:p-7 md:p-8 bg-gradient-to-r from-[var(--color-rose-deep)] to-[var(--color-rose-primary)] text-white shadow-md mb-6 sm:mb-8">
          <div className="absolute -right-6 -bottom-6 text-white/10 pointer-events-none">
            <Flame className="w-40 sm:w-48 h-40 sm:h-48 fill-current" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" />
                All-Time Record
              </div>
              <h4 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1">
                {activityStats.mostActiveDay.date}
              </h4>
              <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-rose-100 leading-relaxed">
                {activityStats.mostActiveDay.highlight}
              </p>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-5 py-3 sm:px-6 sm:py-4 border border-white/20 text-center shrink-0 w-full sm:w-auto">
              <span className="block font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl font-black text-white tabular-nums">
                {activityStats.mostActiveDay.messages.toLocaleString()}
              </span>
              <span className="block text-[10px] sm:text-xs uppercase tracking-widest text-rose-200 mt-0.5">
                messages in 24 hours
              </span>
            </div>
          </div>
        </div>

        {/* Top Active Days Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
          {activityStats.topActiveDays.map((day: ActiveDay, idx: number) => {
            return (
              <div
                key={day.date}
                className="p-3.5 sm:p-4 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-[var(--color-accent-pink)] uppercase tracking-wider">
                      #{idx + 1} High Volume
                    </span>
                    <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">
                      {day.day}
                    </span>
                  </div>
                  <h5 className="font-[family-name:var(--font-playfair)] text-base sm:text-lg font-bold text-[var(--color-rose-deep)] mb-0.5">
                    {day.date}
                  </h5>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] sm:text-xs text-[var(--color-text-secondary)] mb-2.5 line-clamp-2">
                    {day.highlight}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-pink-light)]/60">
                  <span className="text-[10px] text-[var(--color-text-secondary)] font-medium">
                    Count
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-xs sm:text-sm font-bold text-[var(--color-rose-primary)] tabular-nums">
                    {day.messages.toLocaleString()} msgs
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Hourly Timeline - Our Favourite Time To Talk 🌙 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-md rounded-3xl p-4 sm:p-7 md:p-8 border border-[var(--color-pink-soft)] shadow-xs"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 sm:gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
              <Moon className="w-3 h-3 text-[var(--color-rose-primary)]" />
              Midnight Connection
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl text-[var(--color-rose-deep)] font-bold">
              Our Favourite Time To Talk 🌙
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mt-0.5">
              Hourly distribution across all 24 hours. Tap any bar to inspect.
            </p>
          </div>

          {/* Peak Hour Badge */}
          <div className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-2xl bg-[var(--color-pink-light)]/70 border border-[var(--color-pink-soft)] shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--color-rose-primary)] text-white flex items-center justify-center text-base shrink-0">
              🌙
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-[var(--color-rose-deep)] tracking-wider block">
                Peak Time
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-sm sm:text-base font-bold text-[var(--color-rose-deep)]">
                9 PM — 9,621 msgs
              </span>
            </div>
          </div>
        </div>

        {/* Top 4 Peak Hours */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {activityStats.peakHours.map((h, i) => (
            <button
              key={h.displayHour}
              onClick={() => setSelectedHour(h)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                selectedHour.displayHour === h.displayHour
                  ? "bg-gradient-to-b from-[var(--color-pink-light)] to-white border-[var(--color-rose-primary)] shadow-xs ring-1 ring-[var(--color-rose-primary)]"
                  : "bg-[var(--color-bg-light)]/60 border-[var(--color-pink-light)] hover:bg-white"
              }`}
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-accent-pink)] block">
                {i === 0 ? "👑 Peak" : `#${i + 1} Active`}
              </span>
              <span className="block font-[family-name:var(--font-playfair)] text-xl font-bold text-[var(--color-rose-deep)] my-0.5">
                {h.displayHour}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-semibold text-[var(--color-text-main)] block tabular-nums">
                {h.messages.toLocaleString()} msgs
              </span>
            </button>
          ))}
        </div>

        {/* Selected Hour Active Feedback Card (NO HOVER DEPENDENCY!) */}
        <div className="mb-4 p-3 rounded-2xl bg-[var(--color-pink-light)]/50 border border-[var(--color-pink-soft)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 fill-current text-[var(--color-rose-primary)]" />
            <span className="font-[family-name:var(--font-inter)] text-xs font-semibold text-[var(--color-text-main)]">
              {selectedHour.displayHour}:{" "}
              <strong className="text-[var(--color-rose-deep)]">
                {selectedHour.messages.toLocaleString()} messages
              </strong>
            </span>
          </div>
          <span className="text-[10px] text-[var(--color-rose-primary)] font-medium">
            {selectedHour.isPeak ? "✨ Our Peak Talking Hour!" : "Tap bars below"}
          </span>
        </div>

        {/* 24-Hour Visual Bar Chart (Responsive width 100%, touchable bars) */}
        <div className="w-full overflow-hidden">
          <div className="h-40 sm:h-48 w-full flex items-end justify-between gap-1 sm:gap-1.5 pt-4 pb-2 border-b border-[var(--color-pink-soft)]">
            {activityStats.allHourlyDistribution.map((item: ActiveHour) => {
              const heightPercent = Math.max(10, (item.messages / maxHourlyCount) * 100);
              const isSelected = selectedHour.displayHour === item.displayHour;
              const isPeak = item.isPeak;

              return (
                <button
                  key={item.hour}
                  onClick={() => setSelectedHour(item)}
                  aria-label={`${item.displayHour}: ${item.messages} messages`}
                  className="flex-1 h-full flex flex-col items-center justify-end group cursor-pointer focus:outline-none"
                >
                  {/* Visual Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${heightPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`w-full rounded-t-md transition-all ${
                      isSelected
                        ? "bg-[var(--color-rose-deep)] ring-2 ring-[var(--color-rose-primary)] shadow-xs"
                        : isPeak
                        ? "bg-gradient-to-t from-[var(--color-rose-primary)] to-[var(--color-accent-pink)]"
                        : "bg-[var(--color-pink-soft)]/80 hover:bg-[var(--color-accent-pink)]/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Simplified Responsive X-Axis Labels */}
          <div className="flex justify-between text-[8px] sm:text-[10px] md:text-xs text-[var(--color-text-secondary)] font-medium pt-1.5 px-0.5">
            <span>12 AM</span>
            <span>4 AM</span>
            <span>8 AM</span>
            <span>12 PM</span>
            <span>4 PM</span>
            <span className="font-bold text-[var(--color-rose-primary)]">9 PM 🌙</span>
            <span>11 PM</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
