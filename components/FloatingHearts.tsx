"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FloatingHearts() {
  const shouldReduceMotion = useReducedMotion();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClient(true);
      setIsMobile(window.innerWidth < 768);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  const hearts = useMemo(() => {
    // 6 hearts on mobile for optimal performance, 12 on desktop
    const numHearts = shouldReduceMotion ? 0 : isMobile ? 6 : 12;

    return Array.from({ length: numHearts }).map((_, i) => ({
      id: i,
      // Keep strictly within 5% to 88% width so animations never cause horizontal overflow
      x: ((i * 17) % 80) + 6,
      size: ((i * 23) % 14) + 12,
      delay: ((i * 31) % 4),
      duration: ((i * 13) % 8) + 14,
    }));
  }, [shouldReduceMotion, isMobile]);

  if (!isClient || shouldReduceMotion || hearts.length === 0) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden max-w-full"
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-5%] text-[var(--color-pink-soft)] opacity-35 mix-blend-multiply"
          initial={{
            left: `${heart.x}%`,
            y: "0%",
            rotate: 0,
            scale: 0,
          }}
          animate={{
            y: "-110vh",
            x: ["0px", "-12px", "12px", "0px"],
            rotate: [0, -12, 12, 0],
            scale: [0, 1, 1, 0.4],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{ width: heart.size, height: heart.size }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}