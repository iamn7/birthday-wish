import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { puzzles } from '../data/puzzles';

export default function Surprise() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleOptionClick = (index) => {
    const question = puzzles[currentQuestion];
    if (index === question.correctAnswerIndex) {
      if (currentQuestion < puzzles.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setErrorMsg("");
      } else {
        triggerSuccess();
      }
    } else {
      setErrorMsg(question.errorMessage || "Oops, try again! 💕");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const triggerSuccess = () => {
    setIsUnlocked(true);
    // Trigger intense confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-tr from-purple-900 via-indigo-900 to-pink-900 flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div 
            key="puzzle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -30 }}
            className="w-full max-w-lg"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-pink-200 mb-2">Unlock Your Surprise</h2>
              <p className="text-pink-100/70">Answer correctly to proceed!</p>
              <div className="flex justify-center gap-2 mt-4">
                {puzzles.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 w-8 rounded-full ${idx <= currentQuestion ? 'bg-pink-500' : 'bg-white/20'}`} 
                  />
                ))}
              </div>
            </div>

            <motion.div 
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
            >
              <h3 className="text-2xl text-white font-medium mb-6 text-center">
                {puzzles[currentQuestion].question}
              </h3>
              
              <div className="flex flex-col gap-4">
                {puzzles[currentQuestion].options.map((opt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleOptionClick(idx)}
                    className="w-full py-4 px-6 bg-white/5 hover:bg-pink-500/30 border border-white/10 rounded-xl text-left text-pink-50 text-lg transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {errorMsg && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 text-center text-red-300 font-medium"
                >
                  {errorMsg}
                </motion.p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="text-center z-10"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 mx-auto bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
            />
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] relative z-10 mb-6 font-serif">
              Happy Birthday! ❤️
            </h1>
            <p className="text-2xl text-pink-100 max-w-xl mx-auto relative z-10 leading-relaxed shadow-sm p-6 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-md">
              You mean the entire world to me. Thank you for being the amazing, beautiful soul that you are. I hope today brings you as much joy as you bring me every single day.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
