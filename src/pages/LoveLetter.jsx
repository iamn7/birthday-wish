import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shayari } from '../data/shayari';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';

export default function LoveLetter() {
  const fullText = `My dearest Arzoo,\n\nI don't know where to begin… maybe with how much I've been missing you lately. It's strange how silence can still carry someone's presence, and somehow, you're still everywhere — in the little things, in the quiet moments, in memories that refuse to fade.\n\nYou were always so effortlessly beautiful… not just in the way you looked, but in the way you smiled, the way you spoke, the way you made everything feel a little softer, a little better. There was something about you that made ordinary days feel special.\n\nI still find myself going back to those days we spent together — the laughs, the silly arguments, the random conversations that meant more than they should have. At the time, they felt normal… but now I realize, they were everything.\n\nI don't know how time passed so quickly, but I do know this — those moments, and you, will always stay with me.\n\nAnd today… even if things are different, even if we're not where we used to be, I just want to say—\n\nHappy Birthday, Arzoo. ❤️\n\nI hope life gives you all the happiness you deserve, the kind you always gave so easily to others.\n\n— Always wishing the best for you`;

  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentShayari, setCurrentShayari] = useState(null);
  const [shayariKey, setShayariKey] = useState(0);

  useEffect(() => {
    let i = 0;
    // Faster typing speed: 25ms instead of 40ms
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 25);
    return () => clearInterval(typingInterval);
  }, []);

  const getRandomShayari = () => {
    const randomIdx = Math.floor(Math.random() * shayari.length);
    setCurrentShayari(shayari[randomIdx].text);
    setShayariKey(k => k + 1);
  };

  return (
    <div
      className="min-h-screen py-28 px-4 flex flex-col items-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0520 0%, #0d0521 40%, #120830 70%, #0d1030 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-pink-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-rose-600/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8 text-center"
      >
        <span
          className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(236,72,153,0.1)',
            border: '1px solid rgba(236,72,153,0.2)',
            color: 'rgba(249,168,212,0.8)',
          }}
        >
          ✦ &nbsp; Written with love &nbsp; ✦
        </span>
      </motion.div>

      {/* Main letter card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(15,8,28,0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top accent */}
        <div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.7), rgba(168,85,247,0.7), transparent)' }}
        />

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(236,72,153,0.8), rgba(168,85,247,0.8))',
                boxShadow: '0 0 16px rgba(236,72,153,0.35)',
              }}
            >
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1
                className="text-2xl font-display italic font-semibold"
                style={{
                  background: 'linear-gradient(135deg, #f9a8d4, #e879f9)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                A letter for you...
              </h1>
              <p className="text-white/30 text-xs font-light tracking-wide mt-0.5">Just read slowly 🌸</p>
            </div>

            {/* Decorative heart */}
            <div className="ml-auto opacity-10">
              <Heart size={72} className="text-pink-400 fill-pink-400" />
            </div>
          </div>

          {/* Letter text */}
          <div
            className="text-base md:text-lg leading-[1.95] font-serif whitespace-pre-wrap min-h-[280px]"
            style={{ color: 'rgba(255,240,245,0.85)' }}
          >
            {displayedText}
            {!isTypingComplete && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-5 bg-pink-400 ml-0.5 align-middle"
              />
            )}
          </div>

          {/* Typing progress */}
          {!isTypingComplete && (
            <div className="mt-6">
              <div
                className="h-0.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #ec4899, #a855f7)' }}
                  animate={{ width: `${(displayedText.length / fullText.length) * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div
          className="h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)' }}
        />
      </motion.div>

      {/* Shayari section */}
      <AnimatePresence>
        {isTypingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-12 flex flex-col items-center text-center max-w-xl w-full"
          >
            {/* CTA button */}
            <motion.button
              onClick={getRandomShayari}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-2.5 py-3.5 px-8 rounded-2xl font-semibold text-white overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                boxShadow: '0 0 30px rgba(236,72,153,0.35), 0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              {currentShayari ? (
                <>
                  <RefreshCw size={16} className="text-white/80" />
                  <span>Another one 💖</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Click me cutie 💖</span>
                </>
              )}
            </motion.button>

            {/* Shayari display */}
            <AnimatePresence mode="wait">
              {currentShayari && (
                <motion.div
                  key={shayariKey}
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{ duration: 0.45 }}
                  className="mt-8 w-full rounded-3xl overflow-hidden"
                  style={{
                    background: 'rgba(15,8,28,0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(236,72,153,0.2)',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Top accent */}
                  <div
                    className="h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5), transparent)' }}
                  />
                  <div className="p-7 md:p-9">
                    <div className="mb-4 text-2xl">✨</div>
                    <p className="text-lg md:text-xl font-serif italic leading-relaxed whitespace-pre-line"
                      style={{ color: 'rgba(253,220,230,0.9)' }}>
                      "{currentShayari}"
                    </p>
                  </div>
                  <div
                    className="h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.35), transparent)' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom spacer for navbar */}
      <div className="h-24" />
    </div>
  );
}
