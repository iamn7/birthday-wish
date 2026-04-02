import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { shayari } from '../data/shayari';
import { Heart } from 'lucide-react';

export default function LoveLetter() {
  const fullText = "My dearest Arzoo, \
I don’t know where to begin… maybe with how much I’ve been missing you lately. It’s strange how silence can still carry someone’s presence, and somehow, you’re still everywhere — in the little things, in the quiet moments, in memories that refuse to fade.\
You were always so effortlessly beautiful… not just in the way you looked, but in the way you smiled, the way you spoke, the way you made everything feel a little softer, a little better. There was something about you that made ordinary days feel special.\
I still find myself going back to those days we spent together — the laughs, the silly arguments, the random conversations that meant more than they should have. At the time, they felt normal… but now I realize, they were everything.\
I don’t know how time passed so quickly, but I do know this — those moments, and you, will always stay with me.\
And today… even if things are different, even if we’re not where we used to be, I just want to say—\
Happy Birthday, Arzoo. ❤️\
I hope life gives you all the happiness you deserve, the kind you always gave so easily to others.\
— Always wishing the best for you";
  
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [currentShayari, setCurrentShayari] = useState(null);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  const getRandomShayari = () => {
    const randomIdx = Math.floor(Math.random() * shayari.length);
    setCurrentShayari(shayari[randomIdx].text);
  };

  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-br from-pink-900 to-indigo-900 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full bg-white/5 backdrop-blur-sm border border-pink-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Heart size={120} className="text-pink-500" />
        </div>
        
        <h1 className="text-3xl text-pink-200 mb-8 font-serif italic">A letter for you...</h1>
        
        <div className="text-lg md:text-xl text-pink-50/90 leading-relaxed font-serif whitespace-pre-wrap min-h-[300px]">
          {displayedText}
          {!isTypingComplete && <span className="animate-pulse">|</span>}
        </div>
      </motion.div>

      <AnimatePresence>
        {isTypingComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center text-center max-w-xl"
          >
            <button 
              onClick={getRandomShayari}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
            >
              Click me cutie 💖
            </button>
            
            <AnimatePresence mode="wait">
              {currentShayari && (
                <motion.div 
                  key={currentShayari}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mt-8 bg-white/10 backdrop-blur-md border border-pink-300/30 p-6 rounded-2xl"
                >
                  <p className="text-xl text-pink-100 italic whitespace-pre-line">"{currentShayari}"</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
