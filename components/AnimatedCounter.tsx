"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let animationFrameId: number;

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * (end - start) + start);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
