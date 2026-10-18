"use client";

import { motion } from "framer-motion";
import { loveData } from "@/data/loveData";
import Image from "next/image";

export function MemorySection() {
  return (
    <section id="memories-section" className="py-14 sm:py-20 md:py-24 px-3 sm:px-6 bg-[var(--color-bg-light)] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-14"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl md:text-5xl text-[var(--color-rose-deep)] mb-2 sm:mb-4">
            Our Memories
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-xs sm:text-sm md:text-base text-[var(--color-text-secondary)] max-w-xl mx-auto px-4">
            A small collection of the moments that make us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {loveData.memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--color-pink-light)]">
                <Image
                  src={memory.image}
                  alt={memory.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-[var(--color-accent-pink)] tracking-wider uppercase mb-2 block">
                  {memory.date}
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[var(--color-text-main)] mb-2 font-bold">
                  {memory.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-sm text-[var(--color-text-secondary)] line-clamp-3">
                  {memory.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}