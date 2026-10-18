"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { loveData } from "@/data/loveData";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes,
} from "date-fns";

interface TimeUnits {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeDiff(startDate: Date, now: Date): TimeUnits {
  if (now < startDate) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  // Calendar-aware step down calculation
  const years = differenceInYears(now, startDate);
  let cur = addYears(startDate, years);

  const months = differenceInMonths(now, cur);
  cur = addMonths(cur, months);

  const days = differenceInDays(now, cur);
  cur = addDays(cur, days);

  const hours = differenceInHours(now, cur);
  cur = addHours(cur, hours);

  const minutes = differenceInMinutes(now, cur);
  cur = addMinutes(cur, minutes);

  const seconds = differenceInSeconds(now, cur);

  return { years, months, days, hours, minutes, seconds };
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

const defaultSnapshot = JSON.stringify({
  years: 0,
  months: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

function getSnapshot(): string {
  if (!loveData.relationshipStartDate) return defaultSnapshot;
  const startDate = new Date(loveData.relationshipStartDate);
  if (isNaN(startDate.getTime())) return defaultSnapshot;
  return JSON.stringify(getTimeDiff(startDate, new Date()));
}

function getServerSnapshot(): string {
  return defaultSnapshot;
}

export function RelationshipTimer() {
  const timeJson = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const timePassed: TimeUnits = JSON.parse(timeJson);

  const timeBlocks = [
    { label: "Years", value: timePassed.years },
    { label: "Months", value: timePassed.months },
    { label: "Days", value: timePassed.days },
    { label: "Hours", value: timePassed.hours },
    { label: "Minutes", value: timePassed.minutes },
    { label: "Seconds", value: timePassed.seconds },
  ];

  return (
    <section
      id="relationship-timer"
      className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 bg-[var(--color-pink-light)]/30 flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-12 max-w-xl mx-auto px-2"
      >
        <span className="inline-block px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
          Forever & Always
        </span>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl text-[var(--color-rose-deep)] mb-2 sm:mb-3">
          Every second with you
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)]">
          Counting the beautiful moments since we began.
        </p>
      </motion.div>

      {/* Mobile-First 3-column layout:
          Row 1: Years | Months | Days
          Row 2: Hours | Minutes | Seconds
      */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3.5 md:gap-6 max-w-sm sm:max-w-md md:max-w-3xl w-full px-1 sm:px-4">
        {timeBlocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, type: "spring" }}
            className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-xs rounded-2xl shadow-xs border border-[var(--color-pink-soft)] py-3 sm:py-4 md:py-6 px-1.5 sm:px-3 text-center transition-transform hover:scale-102"
          >
            <span className="font-[family-name:var(--font-inter)] text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--color-rose-primary)] mb-0.5 sm:mb-1 tabular-nums">
              {block.value.toString().padStart(2, "0")}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[10px] sm:text-xs md:text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wider sm:tracking-widest">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}