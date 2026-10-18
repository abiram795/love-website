"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Clock, MessageSquareHeart, Sparkles, Music, Camera, Gift } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "#hero", icon: Heart },
    { label: "Secret Memory", href: "#scratch-card", icon: Gift },
    { label: "Memories", href: "#memories-section", icon: Camera },
    { label: "Our Timer", href: "#relationship-timer", icon: Clock },
    { label: "Our Chat Story", href: "#chat-story", icon: MessageSquareHeart },
    { label: "Little Games", href: "#wheel-game", icon: Sparkles },
    { label: "Soundtrack", href: "#music-section", icon: Music },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand / Title Pill */}
        <a
          href="#hero"
          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 border ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md border-[var(--color-pink-soft)] shadow-sm"
              : "bg-white/70 backdrop-blur-sm border-white/60 shadow-xs"
          }`}
        >
          <span className="text-[var(--color-rose-primary)] flex items-center justify-center">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </span>
          <span className="font-[family-name:var(--font-playfair)] text-sm sm:text-base font-bold text-[var(--color-rose-deep)] tracking-wide">
            MITHRA
          </span>
        </a>

        {/* Desktop / Tablet Links (Hidden on mobile) */}
        <nav
          className={`hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md border-[var(--color-pink-soft)] shadow-sm"
              : "bg-white/70 backdrop-blur-sm border-white/60 shadow-xs"
          }`}
          aria-label="Desktop navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-rose-deep)] hover:bg-[var(--color-pink-light)]/60 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-[var(--color-pink-soft)] text-[var(--color-rose-deep)] shadow-sm active:scale-95 transition-transform"
          aria-label={isOpen ? "Close menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden pointer-events-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-xs"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full bg-gradient-to-b from-white via-[var(--color-bg-light)] to-white rounded-b-3xl shadow-2xl border-b border-[var(--color-pink-soft)] p-6 pt-safe max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--color-pink-light)] mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-current text-[var(--color-rose-primary)]" />
                  <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-[var(--color-rose-deep)]">
                    Our Little World
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-[var(--color-pink-light)] text-[var(--color-rose-deep)] flex items-center justify-center active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links with large touch targets (min 48px) */}
              <div className="flex flex-col space-y-1.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleLinkClick(link.href)}
                      className="flex items-center gap-3.5 w-full min-h-[48px] px-4 py-3 rounded-2xl text-left text-sm font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-pink-light)] active:bg-[var(--color-pink-soft)] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[var(--color-pink-light)] text-[var(--color-rose-primary)] flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-[family-name:var(--font-inter)]">{link.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-pink-light)] text-center">
                <p className="font-[family-name:var(--font-playfair)] italic text-xs text-[var(--color-text-secondary)]">
                  Every second with you is my favourite ❤️
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
