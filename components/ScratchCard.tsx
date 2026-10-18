"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveData } from "@/data/loveData";
import Image from "next/image";
import { PointerIcon } from "lucide-react";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  // Use a callback to avoid stale closure issues if needed, though simple state here is fine.
  const handleReveal = useCallback(() => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Resize canvas to match container
    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      // Fill with a soft pink cover
      ctx.fillStyle = "#FCE7F3"; // var(--color-pink-light)
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add text on top
      ctx.font = "20px var(--font-inter), sans-serif";
      ctx.fillStyle = "#881337"; // var(--color-rose-deep)
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Scratch here", canvas.width / 2, canvas.height / 2);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Scratch logic
    let isDrawing = false;
    let lastPoint = { x: 0, y: 0 };

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      setIsScratching(true);
      lastPoint = getMousePos(e);
      // prevent default to stop scrolling on mobile while scratching
      if (e.cancelable) {
        // e.preventDefault(); // Sometimes problematic in React 18 passive events, handled via CSS touch-action
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      if (e.cancelable) {
        e.preventDefault(); // Important for touch devices to avoid scrolling when scratching
      }
      
      const currentPoint = getMousePos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = 40; // Brush size

      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();

      lastPoint = currentPoint;
      checkReveal();
    };

    const handleEnd = () => {
      isDrawing = false;
      setIsScratching(false);
    };

    const checkReveal = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      
      // Check every 4th byte (alpha channel)
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalPixels = pixels.length / 4;
      const transparentPercentage = (transparentPixels / totalPixels) * 100;

      // Reveal threshold 55%
      if (transparentPercentage > 55) {
        handleReveal();
      }
    };

    // Use passive: false for touchmove to allow preventDefault
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleEnd);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
    };
  }, [isRevealed, handleReveal]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("memories-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="scratch-card" className="relative flex min-h-[90dvh] sm:min-h-screen w-full flex-col items-center justify-center py-14 sm:py-20 px-3 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-2xl w-full flex flex-col items-center text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-[var(--color-rose-deep)] mb-4 sm:mb-8 px-2 break-words">
          {loveData.scratchCard.heading}
        </h2>

        {!isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 sm:mb-8 p-4 sm:p-6 bg-[var(--color-bg-light)] rounded-2xl shadow-xs border border-[var(--color-pink-soft)]/50 max-w-lg w-full"
          >
            <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-main)] whitespace-pre-line leading-relaxed">
              {loveData.scratchCard.initialMessage}
            </p>
          </motion.div>
        )}

        <div 
          ref={containerRef}
          className="relative w-full max-w-[260px] sm:max-w-[290px] md:max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-4 border-white mb-6 sm:mb-8 mx-auto"
        >
          {/* Underlayer (The Memory) */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={loveData.scratchCard.image}
              alt="Memory"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </div>

          {/* Canvas overlayer */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.canvas
                ref={canvasRef}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
                style={{ touchAction: "none" }} // Important for mobile
              />
            )}
          </AnimatePresence>
          
          {/* Scratch Icon hint */}
          {!isRevealed && !isScratching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none text-[var(--color-rose-primary)]"
            >
              <PointerIcon size={32} />
            </motion.div>
          )}
        </div>

        {/* Revealed Content */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col items-center w-full"
            >
              <div className="mb-8 p-6 bg-[var(--color-pink-light)] rounded-xl shadow-sm w-full max-w-md">
                <p className="font-[family-name:var(--font-inter)] text-sm md:text-base text-[var(--color-text-main)] whitespace-pre-line leading-relaxed">
                  {loveData.scratchCard.revealedMessage}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToNext}
                className="flex items-center gap-2 px-8 py-4 bg-[var(--color-rose-primary)] text-white rounded-full font-medium tracking-wide shadow-md hover:bg-[var(--color-rose-deep)] transition-colors"
              >
                NEXT
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}