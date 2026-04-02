import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Star particle positions fixed for consistent rendering
const stars = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${(i * 7.3 + 3) % 100}%`,
  left: `${(i * 11.7 + 5) % 100}%`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  delay: (i * 0.23) % 4,
  dur: 2.5 + (i % 4) * 0.7,
}));

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0722 0%, #1a0533 35%, #200834 60%, #0f0c2e 100%)' }}
    >
      {/* Star field */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white/70"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationName: 'twinkle',
            animationDuration: `${star.dur}s`,
            animationDelay: `${star.delay}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-600/15 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-[80px]" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Orbiting rings + heart */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-pink-500/30"
            style={{ borderTopColor: 'rgba(236,72,153,0.8)', borderRightColor: 'rgba(236,72,153,0.3)' }}
          />
          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border border-purple-500/30"
            style={{ borderTopColor: 'rgba(168,85,247,0.7)' }}
          />
          {/* Inner glow */}
          <motion.div
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-6 rounded-full bg-gradient-to-tr from-pink-500/40 to-purple-500/40 blur-sm"
          />
          {/* Heart */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10"
          >
            <Heart size={36} className="text-pink-400 fill-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-gradient-pink">
            Preparing something special
          </h2>
          {/* Animated dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-pink-400"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
