import React, { useState } from "react";
import { Writing } from "../types";
import { motion } from "motion/react";
import { X, Type, Minus, Plus } from "lucide-react";
import { useStore } from "../hooks/useStore";

interface WritingViewProps {
  writing: Writing;
  onClose: () => void;
}

export const WritingView: React.FC<WritingViewProps> = ({
  writing,
  onClose,
}) => {
  const { subscribeNewsletter } = useStore();
  const [textSizeIndex, setTextSizeIndex] = useState(1);

  const textSizes = [
    "text-base md:text-lg",
    "text-lg md:text-xl",
    "text-xl md:text-2xl",
  ];

  const firstLetterSizes = [
    "first-letter:text-5xl",
    "first-letter:text-6xl",
    "first-letter:text-7xl",
  ];

  const currentSizeClass = textSizes[textSizeIndex];
  const currentFirstLetterClass = firstLetterSizes[textSizeIndex];

  const handleDecreaseSize = () =>
    setTextSizeIndex((prev) => Math.max(0, prev - 1));
  const handleIncreaseSize = () =>
    setTextSizeIndex((prev) => Math.min(textSizes.length - 1, prev + 1));

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !subscribing) {
      setSubscribing(true);
      await subscribeNewsletter(email);
      setSubscribed(true);
      setSubscribing(false);
      setEmail("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 flex flex-col relative w-full h-full min-h-max"
    >
      {/* Active Writing Header Background */}
      {writing.backgroundImageUrl && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div
            className="w-full h-full bg-cover bg-center absolute inset-0 opacity-40"
            style={{ backgroundImage: `url(${writing.backgroundImageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]/60"></div>
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col p-8 md:p-16 lg:p-20 max-w-4xl mx-auto w-full">
        <header className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <span className="px-2 py-0.5 border border-white/20 text-[10px] tracking-widest uppercase text-white/50">
                Fragment
              </span>
              <span className="text-[10px] tracking-widest uppercase text-white/20">
                {new Date(writing.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center space-x-4 md:space-x-8">
              {/* Accessibility Controls */}
              <div className="flex items-center space-x-1 sm:space-x-2 border border-white/5 bg-[#0a0a0a] rounded-full px-2 sm:px-3 py-1 shadow-lg">
                <button
                  onClick={handleDecreaseSize}
                  disabled={textSizeIndex === 0}
                  className="text-white/40 hover:text-white disabled:opacity-30 disabled:hover:text-white/40 transition-colors p-1"
                >
                  <Minus size={12} strokeWidth={2} />
                </button>
                <div
                  className="flex items-center justify-center w-6"
                  title="Text Size"
                >
                  <Type size={12} className="text-white/30" />
                </div>
                <button
                  onClick={handleIncreaseSize}
                  disabled={textSizeIndex === textSizes.length - 1}
                  className="text-white/40 hover:text-white disabled:opacity-30 disabled:hover:text-white/40 transition-colors p-1"
                >
                  <Plus size={12} strokeWidth={2} />
                </button>
              </div>

              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors bg-white/5 p-2 rounded-full border border-white/5"
              >
                <X size={16} strokeWidth={1} />
              </button>
            </div>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight"
          >
            {writing.title}
          </motion.h2>
        </header>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex-1 pb-16"
        >
          {writing.content.split("\n").map((line, i) => (
            <p
              key={i}
              className={`font-serif leading-relaxed text-white/80 ${currentSizeClass} ${i === 0 ? `${currentFirstLetterClass} first-letter:float-left first-letter:mr-4 first-letter:font-bold` : ""} ${line.trim() === "" ? "h-6 md:h-8" : "mb-8 md:mb-10 text-justify"}`}
            >
              {line}
            </p>
          ))}
        </motion.article>

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-white/5 text-center flex flex-col items-center"
        >
          <h3 className="font-serif text-2xl text-white mb-3">Silent Echoes</h3>
          <p className="text-sm text-white/40 mb-8 max-w-sm font-sans leading-relaxed">
            Leave your email to receive occasional updates whenever a new
            fragment is written and shared.
          </p>

          {subscribed ? (
            <p className="px-6 py-3 border border-white/10 text-white/60 bg-white/5 text-sm uppercase tracking-widest">
              You are now listening.
            </p>
          ) : (
            <form
              className="flex w-full max-w-sm space-x-2"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#0a0a0a] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 font-sans transition-colors rounded-none placeholder:text-white/20"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="bg-white/10 border border-white/10 px-6 py-3 text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors font-sans rounded-none font-medium disabled:opacity-50"
              >
                {subscribing ? "Wait..." : "Inscribe"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
