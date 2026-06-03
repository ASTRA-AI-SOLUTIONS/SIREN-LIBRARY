import React from "react";
import { Writing } from "../types";
import { motion } from "motion/react";

interface HomeViewProps {
  writings: Writing[];
  onSelect: (writing: Writing) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ writings, onSelect }) => {
  return (
    <div className="relative z-10 flex flex-col p-8 md:p-12 lg:p-20 w-full mx-auto max-w-4xl">
      <header className="mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 leading-tight">
          Library
        </h2>
        <p className="text-white/40 font-serif max-w-xl text-md md:text-lg">
          A collection of scattered thoughts, memories, and observations. Select
          a fragment to read.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {writings.map((writing, index) => (
          <motion.div
            key={writing.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => onSelect(writing)}
            className="group relative cursor-pointer border-t border-white/5 pt-8 hover:border-white/20 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-4">
              <h2 className="font-serif text-2xl md:text-3xl text-white/90 group-hover:text-white transition-colors tracking-wide">
                {writing.title}
              </h2>
              <span className="text-[10px] tracking-widest uppercase text-white/20">
                {new Date(writing.createdAt).toLocaleDateString()}
              </span>
            </div>

            {writing.backgroundImageUrl && (
              <div className="w-full h-40 md:h-64 mt-6 mb-6 overflow-hidden bg-white/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-1000"
                  style={{
                    backgroundImage: `url(${writing.backgroundImageUrl})`,
                  }}
                />
              </div>
            )}

            <p className="font-serif text-sm md:text-base text-white/50 line-clamp-3 leading-relaxed max-w-2xl">
              {writing.content.split("\n")[0]}...
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
