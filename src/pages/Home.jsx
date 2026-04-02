import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Heart, Gift, Sparkles } from 'lucide-react';

const FLOATING_HEARTS = [
  { x: '10%', delay: 0, size: 14 },
  { x: '20%', delay: 1.2, size: 10 },
  { x: '75%', delay: 0.5, size: 18 },
  { x: '85%', delay: 2, size: 12 },
  { x: '50%', delay: 1.8, size: 8 },
  { x: '40%', delay: 0.8, size: 16 },
  { x: '65%', delay: 2.5, size: 10 },
];

const sectionCards = [
  {
    title: 'Memory Timeline',
    emoji: '💭',
    icon: Clock,
    path: '/timeline',
    desc: 'Relive the moments that made us',
    gradient: 'from-blue-500/20 to-indigo-500/20',
    glow: 'rgba(99,102,241,0.3)',
    border: 'rgba(99,102,241,0.25)',
  },
  {
    title: 'A Letter For You',
    emoji: '💌',
    icon: Heart,
    path: '/letter',
    desc: 'Words I wrote just for you',
    gradient: 'from-pink-500/20 to-rose-500/20',
    glow: 'rgba(236,72,153,0.3)',
    border: 'rgba(236,72,153,0.25)',
  },
  {
    title: 'Your Surprise',
    emoji: '🎁',
    icon: Gift,
    path: '/surprise',
    desc: 'Something special waiting inside',
    gradient: 'from-purple-500/20 to-fuchsia-500/20',
    glow: 'rgba(168,85,247,0.3)',
    border: 'rgba(168,85,247,0.25)',
  },
];

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pb-28 pt-12"
      style={{ background: 'linear-gradient(135deg, #0d0521 0%, #1a0533 40%, #1d0a3f 70%, #0d1030 100%)' }}
    >
      {/* Star field */}
      {Array.from({ length: 50 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${(i * 6.7 + 2) % 100}%`,
            left: `${(i * 13.3 + 7) % 100}%`,
            width: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5,
            height: i % 4 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5,
            opacity: 0.15 + (i % 5) * 0.1,
            animationName: 'twinkle',
            animationDuration: `${2.5 + (i % 5) * 0.6}s`,
            animationDelay: `${(i * 0.31) % 4}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Floating hearts */}
      {FLOATING_HEARTS.map((h, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -60, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 5 + i, delay: h.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 pointer-events-none"
          style={{ left: h.x }}
        >
          <Heart size={h.size} className="text-pink-400/60 fill-pink-400/60" />
        </motion.div>
      ))}

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-600/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-3xl w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            background: 'rgba(236,72,153,0.12)',
            border: '1px solid rgba(236,72,153,0.25)',
            color: 'rgba(249,168,212,0.9)',
          }}
        >
          <Sparkles size={14} className="text-pink-300" />
          Made with love, just for you
          <Sparkles size={14} className="text-pink-300" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 leading-tight"
          style={{
            background: 'linear-gradient(135deg, #f9a8d4 0%, #e879f9 35%, #c4b5fd 70%, #f0abfc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.3))',
          }}
        >
          Hey Arzoo ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg text-white/50 mb-14 font-light tracking-wide"
        >
          I made something special for you...
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sectionCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.7 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={card.path}
                  className="block rounded-3xl p-6 text-left group transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))`,
                    border: `1px solid ${card.border}`,
                    boxShadow: `0 4px 24px rgba(0,0,0,0.3)`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 8px 40px ${card.glow}, 0 0 0 1px ${card.border}`;
                    e.currentTarget.style.borderColor = card.border.replace('0.25', '0.5');
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = `0 4px 24px rgba(0,0,0,0.3)`;
                    e.currentTarget.style.borderColor = card.border;
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                    style={{
                      background: `linear-gradient(135deg, ${card.gradient.replace('from-', '').replace('/20 to-', ' ').replace('/20', '')})`,
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))`,
                      border: `1px solid ${card.border}`,
                    }}
                  >
                    <span className="text-2xl">{card.emoji}</span>
                  </div>
                  <h2 className="text-lg font-display font-semibold text-white mb-1.5 group-hover:text-pink-200 transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-sm text-white/40 leading-relaxed">{card.desc}</p>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-white/30 group-hover:text-pink-300 transition-all duration-300 group-hover:gap-2.5">
                    <span>Open</span>
                    <span>→</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
