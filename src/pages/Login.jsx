import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { login } from '../auth/auth';
import AuthLoader from '../components/AuthLoader';

// Decorative petals for the background
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 5) % 100}%`,
  delay: (i * 0.4) % 5,
  duration: 6 + (i % 5),
  size: 8 + (i % 4) * 3,
}));

const Login = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      triggerError();
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = login(name, date);

      if (result.success) {
        try {
          const audio = new Audio('/success-chime.mp3');
          audio.volume = 0.5;
          audio.play().catch(() => {});
        } catch (e) {}

        setTimeout(() => {
          navigate('/home', { replace: true });
        }, 1200);
      } else {
        setLoading(false);
        if (result.lockedOut) {
          navigate('/birthday', { replace: true });
        } else {
          triggerError();
        }
      }
    }, 1500);
  };

  const triggerError = () => {
    setError(true);
    setTimeout(() => setError(false), 800);
  };

  if (loading) {
    return <AuthLoader message="Access Granted ✨" />;
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0521 0%, #1a0533 40%, #0d1030 100%)' }}
    >
      {/* Star field */}
      {Array.from({ length: 55 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: `${(i * 6.1 + 1) % 100}%`,
            left: `${(i * 11.9 + 3) % 100}%`,
            width: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5,
            height: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 2 : 1.5,
            opacity: 0.1 + (i % 6) * 0.08,
            animationName: 'twinkle',
            animationDuration: `${2.5 + (i % 6) * 0.5}s`,
            animationDelay: `${(i * 0.27) % 5}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      {/* Floating petals */}
      {PETALS.map(p => (
        <motion.div
          key={p.id}
          animate={{ y: [0, -80, 0], x: [0, (p.id % 2 === 0 ? 20 : -20), 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 pointer-events-none text-pink-400/40"
          style={{ left: p.left, fontSize: p.size }}
        >
          🌸
        </motion.div>
      ))}

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[55vw] h-[55vw] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 right-0 w-[55vw] h-[55vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/4 translate-y-1/4" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={error ? { x: [-12, 12, -10, 10, -6, 6, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(15, 10, 30, 0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: error
              ? '1px solid rgba(244,63,94,0.4)'
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {/* Top gradient accent bar */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.6), rgba(168,85,247,0.6), transparent)' }}
          />

          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-9">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 14 }}
                className="relative w-20 h-20 mx-auto mb-5"
              >
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full animate-pulse-glow"
                  style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.25), transparent 70%)' }}
                />
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(236,72,153,0.9), rgba(168,85,247,0.9))',
                    boxShadow: '0 0 30px rgba(236,72,153,0.4)',
                  }}
                >
                  <Heart className="w-9 h-9 text-white fill-white animate-heart-beat" />
                </div>
                {/* Sparkle dots */}
                {[[-16, -8], [16, -12], [-10, 18], [18, 12]].map(([x, y], i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.3, 0.9, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    className="absolute w-1.5 h-1.5 bg-pink-300 rounded-full"
                    style={{ top: `calc(50% + ${y}px)`, left: `calc(50% + ${x}px)` }}
                  />
                ))}
              </motion.div>

              <h1
                className="text-3xl font-display font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #f9a8d4, #e879f9, #c4b5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Secret Access
              </h1>
              <p className="text-white/35 text-sm font-light tracking-wide">Only you would know this...</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <Heart size={10} className="text-pink-400 fill-pink-400" />
                  Your Name
                  <span className="normal-case font-normal opacity-70">(as I call you)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Heart className={`h-4 w-4 transition-colors ${error ? 'text-red-400' : 'text-pink-400/60'}`} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={e => { setName(e.target.value); if (error) setError(false); }}
                    className="w-full pl-11 pr-4 py-3.5 text-white placeholder-white/20 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: error ? '1px solid rgba(244,63,94,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    placeholder="e.g. lovely"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Date field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-widest ml-1 flex items-center gap-1.5">
                  <Lock size={10} className="text-purple-400" />
                  A Special Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-4 w-4 transition-colors ${error ? 'text-red-400' : 'text-purple-400/60'}`} />
                  </div>
                  <input
                    type="text"
                    value={date}
                    onChange={e => { setDate(e.target.value); if (error) setError(false); }}
                    className="w-full pl-11 pr-4 py-3.5 text-white placeholder-white/20 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: error ? '1px solid rgba(244,63,94,0.5)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                    placeholder="DD/MM/YYYY"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Error */}
              <motion.div
                initial={false}
                animate={{ height: error ? 'auto' : 0, opacity: error ? 1 : 0 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-red-400/80 text-center font-medium py-1">
                  ✦ That doesn't seem right, try again ✦
                </p>
              </motion.div>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="relative w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-semibold text-white overflow-hidden mt-2 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ec4899, #a855f7)',
                  boxShadow: '0 0 24px rgba(236,72,153,0.3), 0 4px 16px rgba(0,0,0,0.3)',
                }}
              >
                {/* Shimmer */}
                <span
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                />
                <span className="relative z-10 font-display tracking-wide">Unlock Memories</span>
                <ArrowRight className="relative z-10 w-4 h-4" />
              </motion.button>
            </form>

            {/* Footer hint */}
            <p className="text-center text-white/20 text-xs mt-6 font-light">
              ✦ &nbsp; some things are meant only for you &nbsp; ✦
            </p>
          </div>

          {/* Bottom gradient bar */}
          <div
            className="h-px w-full"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(236,72,153,0.4), transparent)' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
