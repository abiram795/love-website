"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { wheelPhotos, WheelPhoto } from "@/data/wheelPhotos";
import { Sparkles, Camera, Heart, ChevronDown, ChevronUp } from "lucide-react";

interface WheelOption {
  id: number;
  line1: string;
  line2: string;
  text: string;
  emoji: string;
  detail: string;
  photoId: number;
}

const options: WheelOption[] = [
  {
    id: 1,
    line1: "One big",
    line2: "hug",
    text: "One big hug",
    emoji: "❤️",
    detail: "A warm, tight embrace whenever you need it most.",
    photoId: 1,
  },
  {
    id: 2,
    line1: "Your favourite",
    line2: "song",
    text: "Your favourite song",
    emoji: "🎵",
    detail: "Let's play our special track and hum along together.",
    photoId: 2,
  },
  {
    id: 3,
    line1: "A sweet",
    line2: "message",
    text: "A sweet message",
    emoji: "💌",
    detail: "A little note to remind you how deeply you are loved.",
    photoId: 3,
  },
  {
    id: 4,
    line1: "A happy",
    line2: "memory",
    text: "A happy memory",
    emoji: "📸",
    detail: "Reliving our brightest smile and purest moment.",
    photoId: 4,
  },
  {
    id: 5,
    line1: "A sweet",
    line2: "surprise",
    text: "A surprise",
    emoji: "🎁",
    detail: "A special promise waiting just for you.",
    photoId: 5,
  },
  {
    id: 6,
    line1: "One more",
    line2: "smile",
    text: "One more smile",
    emoji: "😊",
    detail: "Because your smile is my favorite view in the world.",
    photoId: 6,
  },
];

// Slice colors (harmonious romantic palette)
const sliceColors = [
  "#FFF5F7", // Pale rose blush
  "#FCE7F3", // Pink light
  "#FBCFE8", // Pink soft
  "#FFF0F5", // Lavender blush
  "#FCE7F3", // Pink light
  "#FBCFE8", // Pink soft
];

export function WheelGame() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedResult, setSelectedResult] = useState<WheelOption | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [showGallery, setShowGallery] = useState(false);

  const handleImageError = (src: string) => {
    setImageErrors((prev) => ({ ...prev, [src]: true }));
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedResult(null);

    // Pick random target slice (0 to 5)
    const targetSegment = Math.floor(Math.random() * options.length);

    // Target rotation math:
    // Slice 0 is centered at 0° (12 o'clock).
    // Each clockwise rotation brings slices in reverse order (5, 4, 3, 2, 1) to 12 o'clock.
    // Base angle required for target segment to be at top:
    const baseTargetRot = (360 - (targetSegment * 60)) % 360;

    // Spin forward from current rotation by at least 5 full turns (1800 deg)
    const extraSpins = 5 * 360;
    const currentRot = rotation;
    const currentNormalized = currentRot % 360;
    let forwardDiff = (baseTargetRot - currentNormalized + 360) % 360;
    if (forwardDiff === 0) forwardDiff = 360;

    // Add a slight natural offset (-12° to +12°) well inside the ±30° slice wedge
    const randomSubOffset = Math.floor(Math.random() * 24) - 12;

    const totalRotation = currentRot + extraSpins + forwardDiff + randomSubOffset;
    setRotation(totalRotation);

    // Calculate result after rotation completes (4.5s)
    setTimeout(() => {
      setIsSpinning(false);
      // Determine winning segment at 12 o'clock
      const normalized = (360 - (totalRotation % 360)) % 360;
      const winningIndex = Math.floor(((normalized + 30) % 360) / 60) % options.length;
      setSelectedResult(options[winningIndex]);
    }, 4500);
  };

  // Helper to generate SVG pie sector path
  const getSectorPath = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const x1 = cx + r * Math.sin(toRad(startAngle));
    const y1 = cy - r * Math.cos(toRad(startAngle));
    const x2 = cx + r * Math.sin(toRad(endAngle));
    const y2 = cy - r * Math.cos(toRad(endAngle));
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${x1.toFixed(3)} ${y1.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(3)} ${y2.toFixed(3)} Z`;
  };

  const activePhoto = selectedResult
    ? wheelPhotos.find((p) => p.id === selectedResult.photoId) || wheelPhotos[0]
    : null;

  return (
    <section
      id="wheel-game"
      className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 bg-[var(--color-bg-light)] overflow-hidden flex flex-col items-center relative"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-[var(--color-pink-soft)]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6 sm:mb-8 px-2 relative z-10 max-w-xl mx-auto"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-2.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-rose-primary)]" />
          Playful Moments
        </span>
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl text-[var(--color-rose-deep)] mb-2 sm:mb-3 font-bold">
          A little surprise for you
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)]">
          Spin our wheel of sweet surprises and memories.
        </p>
      </motion.div>

      {/* Responsive Wheel Assembly Container */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-md mx-auto z-10 pt-10 sm:pt-12">
        
        {/* The Circular Wheel Box:
            - position: relative
            - perfectly square with aspect-ratio: 1 / 1
            - centered horizontally
            - responsive width across mobile (320px+), tablet, and desktop
        */}
        <div className="relative w-[min(86vw,340px)] sm:w-[380px] md:w-[420px] aspect-square flex items-center justify-center mx-auto">
          
          {/* Exact 12 O'Clock Pointer:
              - Placed directly ABOVE the wheel
              - Points to 12 o'clock / top center
              - Needle tip meets the outer edge of the wheel (y = +2px)
              - Horizontally centered: left-1/2 with -translate-x-1/2
              - Stationary: does not rotate with the wheel
          */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[38px] z-30 pointer-events-none drop-shadow-md"
            aria-hidden="true"
          >
            <svg width="34" height="42" viewBox="0 0 34 42" fill="none">
              <path
                d="M17 40 L3 8 C1.5 5 3.5 2 7 2 H27 C30.5 2 32.5 5 31 8 L17 40 Z"
                fill="#9F1239"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="17" cy="13" r="3.5" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Rotating Wheel Container:
              - Rotates around exact center (transform-origin: center center)
              - Mathematically perfect circle (rounded-full)
          */}
          <motion.div
            className="w-full h-full rounded-full shadow-xl border-4 sm:border-[6px] border-white overflow-hidden relative select-none"
            style={{ transformOrigin: "center center" }}
            animate={{ rotate: rotation }}
            transition={{
              duration: 4.5,
              type: "tween",
              ease: [0.15, 0.9, 0.25, 1], // Smooth deceleration curve
            }}
          >
            {/* SVG Wheel Graphics:
                - Constant viewBox 0 0 400 400
                - Center at (200, 200)
                - Vector crispness at all resolutions
            */}
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full block"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="hub-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#881337" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* Outer wheel rim background */}
              <circle cx="200" cy="200" r="198" fill="#FFFFFF" />
              <circle cx="200" cy="200" r="192" fill="#FCE7F3" />

              {/* 6 Equal Pie Slices (60° each) */}
              {options.map((opt, i) => {
                const midAngle = i * 60;
                const startAngle = midAngle - 30;
                const endAngle = midAngle + 30;
                const pathData = getSectorPath(200, 200, 190, startAngle, endAngle);

                return (
                  <g key={opt.id}>
                    {/* Wedge Slice */}
                    <path
                      d={pathData}
                      fill={sliceColors[i % sliceColors.length]}
                      stroke="#FFFFFF"
                      strokeWidth="3"
                    />

                    {/* Centered Segment Label:
                        - Rotated by midAngle around wheel center (200, 200)
                        - Balanced two-line typography that never crosses boundaries
                        - Clean spacing and consistent font size
                    */}
                    <g transform={`rotate(${midAngle} 200 200)`}>
                      {/* Emoji */}
                      <text
                        x="200"
                        y="64"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="22"
                        className="select-none"
                      >
                        {opt.emoji}
                      </text>

                      {/* Text Line 1 */}
                      <text
                        x="200"
                        y="90"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#881337"
                        fontSize="11.5"
                        fontWeight="700"
                        fontFamily="var(--font-inter), sans-serif"
                        letterSpacing="0.2px"
                        className="select-none"
                      >
                        {opt.line1}
                      </text>

                      {/* Text Line 2 */}
                      <text
                        x="200"
                        y="105"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#881337"
                        fontSize="11.5"
                        fontWeight="700"
                        fontFamily="var(--font-inter), sans-serif"
                        letterSpacing="0.2px"
                        className="select-none"
                      >
                        {opt.line2}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Decorative Perimeter Dots (36 pearls around the rim) */}
              {Array.from({ length: 36 }).map((_, idx) => {
                const dotAngle = idx * 10;
                const rad = (dotAngle * Math.PI) / 180;
                const dx = 200 + 185 * Math.sin(rad);
                const dy = 200 - 185 * Math.cos(rad);
                return (
                  <circle
                    key={idx}
                    cx={dx}
                    cy={dy}
                    r={idx % 6 === 0 ? "3" : "1.8"}
                    fill={idx % 6 === 0 ? "#9F1239" : "#FB7185"}
                    opacity="0.85"
                  />
                );
              })}

              {/* Mathematically Centered Hub in SVG at exactly (200, 200) */}
              <circle
                cx="200"
                cy="200"
                r="42"
                fill="#FFFFFF"
                stroke="#FBCFE8"
                strokeWidth="4"
                filter="url(#hub-shadow)"
              />
              <circle cx="200" cy="200" r="32" fill="#FFF5F7" />
              <circle cx="200" cy="200" r="15" fill="#9F1239" />
              <circle cx="200" cy="200" r="5" fill="#FFFFFF" />
            </svg>
          </motion.div>

          {/* Center Hub Clickable Button (Centered at exact 50% x 50%) */}
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center cursor-pointer active:scale-95 z-20 focus:outline-none"
            aria-label="Spin the wheel center button"
          >
            <div className="sr-only">Spin</div>
          </button>
        </div>

        {/* Responsive Spin Button:
            - Full/near-full width on mobile with safe side padding
            - Elegant compact button on tablet/desktop
            - Positioned with comfortable spacing below the wheel
        */}
        <div className="w-full sm:w-auto mt-8 sm:mt-10 px-4 sm:px-0 flex justify-center">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full sm:w-auto min-h-[50px] px-8 sm:px-10 py-3.5 sm:py-4 bg-[var(--color-rose-primary)] text-white rounded-full text-xs sm:text-sm font-bold tracking-widest hover:bg-[var(--color-rose-deep)] active:bg-[var(--color-rose-deep)] transition-all disabled:opacity-50 shadow-md cursor-pointer active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{isSpinning ? "SPINNING OUR WORLD..." : "SPIN THE WHEEL"}</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Result Card with Paired Memory Photo */}
        <div className="min-h-[14rem] mt-6 w-full flex items-center justify-center px-2">
          <AnimatePresence mode="wait">
            {selectedResult && activePhoto && (
              <motion.div
                key={selectedResult.id}
                initial={{ opacity: 0, scale: 0.88, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-[var(--color-pink-soft)] text-center"
              >
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] font-bold uppercase tracking-wider mb-2">
                  <span>Surprise Unlocked!</span>
                  <span>{selectedResult.emoji}</span>
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-bold text-[var(--color-rose-deep)] mb-1">
                  {selectedResult.text}
                </h3>

                <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                  {selectedResult.detail}
                </p>

                {/* Paired Photo with Graceful Placeholder Fallback */}
                <div className="relative w-full max-w-[240px] aspect-[4/3] rounded-2xl overflow-hidden shadow-xs mx-auto bg-[var(--color-pink-light)]/40 border border-[var(--color-pink-soft)]">
                  {!imageErrors[activePhoto.src] ? (
                    <Image
                      src={activePhoto.src}
                      alt={activePhoto.alt}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(activePhoto.src)}
                      sizes="(max-width: 640px) 240px, 300px"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center">
                      <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[var(--color-rose-primary)] shadow-2xs mb-1.5">
                        <Camera className="w-4 h-4" />
                      </div>
                      <span className="font-[family-name:var(--font-playfair)] text-xs font-bold text-[var(--color-rose-deep)]">
                        {activePhoto.caption || "Special Memory"}
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                        {activePhoto.src.replace("/images/wheel/", "")}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expandable Memory Album Preview (All 10 Photo Slots from data/wheelPhotos.ts) */}
        <div className="w-full mt-4 flex flex-col items-center">
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-xs font-semibold text-[var(--color-rose-deep)] hover:text-[var(--color-rose-primary)] transition-colors cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-[var(--color-accent-pink)]" />
            <span>{showGallery ? "Hide Photo Album" : `View Memory Album (${wheelPhotos.length} Photos)`}</span>
            {showGallery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {showGallery && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full overflow-hidden mt-4"
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-[var(--color-pink-soft)] shadow-xs">
                  <div className="text-center mb-4">
                    <span className="text-[10px] uppercase font-bold text-[var(--color-accent-pink)] tracking-wider block">
                      Our Keepsake Collection
                    </span>
                    <h4 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl font-bold text-[var(--color-rose-deep)]">
                      Surprise Memory Photos
                    </h4>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                      Photos stored in /public/images/wheel/ (photo-01.jpg to photo-10.jpg).
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
                    {wheelPhotos.map((photo: WheelPhoto) => (
                      <div
                        key={photo.id}
                        className="flex flex-col items-center p-2 rounded-2xl bg-[var(--color-bg-light)]/60 border border-[var(--color-pink-light)]"
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-[var(--color-pink-light)]/50 border border-[var(--color-pink-soft)]/60 mb-1.5">
                          {!imageErrors[photo.src] ? (
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              fill
                              className="object-cover"
                              onError={() => handleImageError(photo.src)}
                              sizes="(max-width: 640px) 120px, 160px"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                              <Heart className="w-4 h-4 text-[var(--color-accent-pink)] mb-1" />
                              <span className="text-[9px] font-bold text-[var(--color-rose-deep)]">
                                #{photo.id}
                              </span>
                            </div>
                          )}
                        </div>
                        <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium text-[var(--color-text-main)] truncate max-w-full text-center">
                          photo-0{photo.id}.jpg
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}