import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, X } from "lucide-react";

interface MusicPlayerProps {
  embedCode: string;
  isMuted?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ embedCode, isMuted = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!embedCode) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 bg-[#0c0c0c] hover:bg-[#1a1a1a] shadow-xl border border-white/10 p-3 rounded-none text-white/50 hover:text-white transition-all duration-300"
        title="Background Music"
      >
        <Music size={16} strokeWidth={1} />
      </button>

      {/* Always render iframe so music can autoplay (unless muted), but toggle ui visibility */}
      <div
        className={`fixed bottom-20 right-6 md:bottom-24 md:right-10 z-50 bg-[#0c0c0c] border border-white/10 shadow-2xl p-0 w-80 max-w-[calc(100vw-3rem)] transition-all duration-500 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible pointer-events-auto"
            : "opacity-0 translate-y-4 invisible pointer-events-none"
        }`}
      >
        <div className="flex justify-between items-center p-3 border-b border-white/5 bg-black/20">
          <div className="flex items-center space-x-2">
            <Music size={12} className="text-white/40" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Atmosphere
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/30 hover:text-white transition-colors"
          >
            <X size={14} strokeWidth={1} />
          </button>
        </div>
        {!isMuted ? (
          <div
            className="w-full opacity-80 hover:opacity-100 transition-opacity bg-black"
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        ) : (
          <div className="w-full h-[166px] flex items-center justify-center bg-black text-white/30 text-[10px] uppercase tracking-widest border-t border-white/5">
            Music Muted
          </div>
        )}
      </div>
    </>
  );
};
