import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { puzzles } from '../data/puzzles';
import { CheckCircle2, XCircle } from 'lucide-react';

export default function Surprise() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedWrong, setSelectedWrong] = useState(null);

  const handleOptionClick = (index) => {
    const question = puzzles[currentQuestion];
    if (index === question.correctAnswerIndex) {
      setSelectedWrong(null);
      if (currentQuestion < puzzles.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setErrorMsg('');
      } else {
        triggerSuccess();
      }
    } else {
      setSelectedWrong(index);
      setErrorMsg(question.errorMessage || 'Oops, try again! 💕');
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setSelectedWrong(null);
      }, 600);
    }
  };

  const triggerSuccess = () => {
    setIsUnlocked(true);
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 0 };
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 60 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, colors: ['#f472b6', '#a78bfa', '#818cf8', '#fb7185'], origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, colors: ['#f9a8d4', '#c4b5fd', '#fda4af', '#a5b4fc'], origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <div
      className="min-h-screen py-28 px-4 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0521 0%, #180835 40%, #1d1040 70%, #0d0c30 100%)' }}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Stars */}
      {Array.from({ length: 35 }, (_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: `${(i * 8.3 + 4) % 100}%`,
            left: `${(i * 13.1 + 6) % 100}%`,
            width: i % 4 === 0 ? 2.5 : 1.5,
            height: i % 4 === 0 ? 2.5 : 1.5,
            opacity: 0.08 + (i % 5) * 0.06,
            animationName: 'twinkle',
            animationDuration: `${2.5 + (i % 5) * 0.7}s`,
            animationDelay: `${(i * 0.35) % 5}s`,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg relative z-10"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-4"
                style={{
                  background: 'rgba(168,85,247,0.12)',
                  border: '1px solid rgba(168,85,247,0.25)',
                  color: 'rgba(196,181,253,0.85)',
                }}
              >
                ✦ &nbsp; Quiz Time &nbsp; ✦
              </motion.span>
              <h2
                className="text-3xl md:text-4xl font-display font-bold mb-2"
                style={{
                  background: 'linear-gradient(135deg, #f9a8d4, #e879f9, #c4b5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Unlock Your Surprise
              </h2>
              <p className="text-white/35 text-sm font-light">Answer correctly to unlock! 💫</p>

              {/* Progress dots */}
              <div className="flex justify-center gap-2.5 mt-6">
                {puzzles.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{
                      width: idx === currentQuestion ? 28 : 8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2 rounded-full"
                    style={{
                      background: idx < currentQuestion
                        ? 'linear-gradient(90deg, #ec4899, #a855f7)'
                        : idx === currentQuestion
                        ? 'linear-gradient(90deg, #ec4899, #a855f7)'
                        : 'rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
              <p className="text-white/25 text-xs mt-2">{currentQuestion + 1} of {puzzles.length}</p>
            </div>

            {/* Question card */}
            <motion.div
              animate={shake ? { x: [-12, 12, -10, 10, -6, 6, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(15,8,28,0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {/* Top gradient */}
              <div
                className="h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.6), rgba(236,72,153,0.6), transparent)' }}
              />

              <div className="p-8">
                <h3 className="text-xl md:text-2xl font-display text-white font-semibold mb-7 text-center leading-snug">
                  {puzzles[currentQuestion].question}
                </h3>

                <div className="flex flex-col gap-3">
                  {puzzles[currentQuestion].options.map((opt, idx) => (
                    <motion.button
                      key={`${currentQuestion}-${idx}`}
                      onClick={() => handleOptionClick(idx)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-4 px-5 rounded-2xl text-left text-base font-medium transition-all duration-200 flex items-center gap-3"
                      style={{
                        background: selectedWrong === idx
                          ? 'rgba(244,63,94,0.15)'
                          : 'rgba(255,255,255,0.04)',
                        border: selectedWrong === idx
                          ? '1px solid rgba(244,63,94,0.4)'
                          : '1px solid rgba(255,255,255,0.07)',
                        color: selectedWrong === idx ? '#fda4af' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{
                          background: selectedWrong === idx
                            ? 'rgba(244,63,94,0.2)'
                            : 'rgba(168,85,247,0.15)',
                          border: selectedWrong === idx
                            ? '1px solid rgba(244,63,94,0.3)'
                            : '1px solid rgba(168,85,247,0.25)',
                          color: selectedWrong === idx ? '#fda4af' : 'rgba(196,181,253,0.8)',
                        }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-5 flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} className="text-red-400/70" />
                      <p className="text-sm text-red-300/80 font-medium">{errorMsg}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div
                className="h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)' }}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.45, duration: 0.8 }}
            className="text-center z-10 max-w-lg px-4"
          >
            {/* Rotating background glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-30 pointer-events-none"
              style={{ background: 'conic-gradient(from 0deg, #ec4899, #a855f7, #6366f1, #ec4899)', borderRadius: '50%', filter: 'blur(60px)' }}
            />

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="text-6xl md:text-8xl mb-6"
            >
              🎉
            </motion.div>

            <h1
              className="text-5xl md:text-7xl font-display font-bold mb-6 relative z-10"
              style={{
                background: 'linear-gradient(135deg, #f9a8d4 0%, #ffffff 40%, #c4b5fd 80%, #f9a8d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.25))',
              }}
            >
              Happy Birthday!
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl font-light leading-relaxed relative z-10 rounded-3xl p-7"
              style={{
                background: 'rgba(15,8,28,0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(236,72,153,0.2)',
                color: 'rgba(255,230,240,0.9)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              }}
            >
              You mean the entire world to me. Thank you for being the amazing, beautiful soul that you are. 
              I hope today brings you as much joy as you bring me every single day. ❤️
            </motion.p>

            {/* Sparkle icons */}
            {[[-60, -40], [60, -30], [-50, 40], [70, 50]].map(([x, y], i) => (
              <motion.div
                key={i}
                animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                className="absolute text-xl pointer-events-none"
                style={{
                  top: `calc(50% + ${y}px)`,
                  left: `calc(50% + ${x}px)`,
                }}
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-24" />
    </div>
  );
}
