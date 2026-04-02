import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const BirthdayOnly = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0d0521 0%, #1a0533 40%, #0d1030 100%)' }}
    >
      {/* Star field */}
      {Array.from({ length: 60 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: `${(i * 5.7 + 2) % 100}%`,
            left: `${(i * 12.3 + 4) % 100}%`,
            width: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
            height: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
            opacity: 0.1 + (i % 6) * 0.08,
            animationName: 'twinkle',
            animationDuration: `${2.5 + (i % 5) * 0.6}s`,
            animationDelay: `${(i * 0.24) % 5}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Ambient orbs */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{ background: '#ec4899' }}
      />
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.06, 0.15, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full blur-[120px] pointer-events-none"
        style={{ background: '#a855f7' }}
      />

      {/* Center content */}
      <div className="relative z-10 text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="space-y-8"
        >
          {/* Icon */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex justify-center"
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(236,72,153,0.9), rgba(168,85,247,0.9))',
                boxShadow: '0 0 40px rgba(236,72,153,0.4)',
              }}
            >
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
          </motion.div>

          {/* Birthday text */}
          <div>
            <motion.div
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <h1
                className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-3"
                style={{
                  background: 'linear-gradient(135deg, #f9a8d4 0%, #ffffff 40%, #e879f9 70%, #c4b5fd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 24px rgba(236,72,153,0.4))',
                }}
              >
                Happy Birthday
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(236,72,153,0.4))' }} />
                <span className="text-2xl">🎉</span>
                <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(168,85,247,0.4))' }} />
              </div>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles size={16} className="text-pink-400/60 mx-auto mb-3" />
            <p
              className="text-base font-light leading-relaxed font-serif italic"
              style={{ color: 'rgba(255,220,235,0.55)' }}
            >
              "Some secrets are only meant for the one they belong to..."
            </p>
            <p className="text-white/25 text-xs mt-3 tracking-widest uppercase">
              ✦ &nbsp; You'll know if this is for you &nbsp; ✦
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BirthdayOnly;
