"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

export function MoonPhase() {
  const [phaseName, setPhaseName] = useState("calculating...");
  const [phaseEmoji, setPhaseEmoji] = useState("🌕");

  useEffect(() => {
    const getMoonPhase = () => {
      const now = new Date();
      const knownNewMoon = new Date("2024-01-11T11:57:00Z");
      const msPerDay = 1000 * 60 * 60 * 24;
      const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / msPerDay;
      const lunarCycle = 29.53058770576;
      
      const currentPhaseInCycle = daysSinceNewMoon % lunarCycle;
      const normalizedPhase = currentPhaseInCycle / lunarCycle;

      if (normalizedPhase < 0.03 || normalizedPhase > 0.97) {
        setPhaseName("New Moon");
        setPhaseEmoji("🌑");
      } else if (normalizedPhase < 0.22) {
        setPhaseName("Waxing Crescent");
        setPhaseEmoji("🌒");
      } else if (normalizedPhase < 0.28) {
        setPhaseName("First Quarter");
        setPhaseEmoji("🌓");
      } else if (normalizedPhase < 0.47) {
        setPhaseName("Waxing Gibbous");
        setPhaseEmoji("🌔");
      } else if (normalizedPhase < 0.53) {
        setPhaseName("Full Moon");
        setPhaseEmoji("🌕");
      } else if (normalizedPhase < 0.72) {
        setPhaseName("Waning Gibbous");
        setPhaseEmoji("🌖");
      } else if (normalizedPhase < 0.78) {
        setPhaseName("Last Quarter");
        setPhaseEmoji("🌗");
      } else {
        setPhaseName("Waning Crescent");
        setPhaseEmoji("🌘");
      }
    };

    getMoonPhase();
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      width: ((i * 3) % 3) + 1 + "px",
      height: ((i * 3) % 3) + 1 + "px",
      top: ((i * 17) % 100) + "%",
      left: ((i * 23) % 100) + "%",
      duration: ((i * 2) % 3) + 2 + "s",
      delay: ((i * 1.5) % 2) + "s",
      opacity: ((i * 0.1) % 0.5) + 0.3,
    }));
  }, []);

  return (
    <section id="moon-phase" className="py-14 sm:py-20 px-4 bg-[#1A1A2E] text-white flex justify-center relative overflow-hidden">
      {/* Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
              animationDuration: star.duration,
              animationDelay: star.delay,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center flex flex-col items-center px-2"
      >
        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-[var(--color-pink-light)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
          Our Shared Sky
        </span>
        <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl md:text-3xl text-[var(--color-pink-light)] mb-5 font-bold">
          Under the same moon 🌙
        </h2>
        
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)] select-none"
        >
          {phaseEmoji}
        </motion.div>

        <p className="font-[family-name:var(--font-inter)] text-[var(--color-pink-soft)] text-sm sm:text-base md:text-lg max-w-sm mx-auto leading-relaxed">
          Tonight, the moon is in its <strong className="text-white font-semibold">{phaseName}</strong> phase.
        </p>
      </motion.div>
    </section>
  );
}