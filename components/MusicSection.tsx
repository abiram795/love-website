"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { loveData } from "@/data/loveData";
import Image from "next/image";

export function MusicSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = loveData.songs;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.src = songs[currentIndex].audioUrl;
      audioRef.current.load();
    }
  }, [currentIndex, songs]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  if (!songs || songs.length === 0) return null;

  const currentSong = songs[currentIndex];

  return (
    <section id="music-section" className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 bg-[var(--color-bg-light)] overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 px-2"
        >
          <span className="inline-block px-3 py-1 bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] text-[10px] sm:text-xs font-semibold uppercase tracking-wider rounded-full mb-2">
            Melodies of Us
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl text-[var(--color-rose-deep)] mb-2 font-bold">
            Our little soundtrack
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)]">
            Songs that remind me of our sweetest memories.
          </p>
        </motion.div>

        <div className="relative w-full max-w-[280px] sm:max-w-sm bg-white p-5 sm:p-6 rounded-3xl shadow-md border border-[var(--color-pink-soft)]">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <button
              onClick={prevSong}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-rose-primary)] active:bg-[var(--color-pink-light)] transition-colors cursor-pointer"
              aria-label="Previous song"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="19 20 9 12 19 4 19 20"></polygon>
                <line x1="5" y1="19" x2="5" y2="5"></line>
              </svg>
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-sm"
              >
                <Image
                  src={currentSong.albumCover}
                  alt={currentSong.title}
                  fill
                  className={`object-cover ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}
                  style={{ borderRadius: isPlaying ? '50%' : '16px', transition: 'border-radius 0.5s ease' }}
                  sizes="(max-width: 640px) 150px, 200px"
                />
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full transition-opacity duration-500 shadow-sm ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
              </motion.div>
            </AnimatePresence>

            <button
              onClick={nextSong}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-rose-primary)] active:bg-[var(--color-pink-light)] transition-colors cursor-pointer"
              aria-label="Next song"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                <line x1="19" y1="5" x2="19" y2="19"></line>
              </svg>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mb-6 sm:mb-8"
            >
              <h3 className="font-[family-name:var(--font-inter)] font-bold text-lg sm:text-xl text-[var(--color-text-main)] mb-0.5 truncate">
                {currentSong.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm text-[var(--color-text-secondary)] truncate">
                {currentSong.artist}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center">
            <button
              onClick={togglePlay}
              className="w-14 h-14 sm:w-16 sm:h-16 bg-[var(--color-rose-primary)] text-white rounded-full flex items-center justify-center hover:bg-[var(--color-rose-deep)] active:bg-[var(--color-rose-deep)] transition-all shadow-md active:scale-95 cursor-pointer"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <audio ref={audioRef} onEnded={nextSong} className="hidden" />
    </section>
  );
}