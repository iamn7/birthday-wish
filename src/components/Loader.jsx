import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 bg-gradient-to-br from-indigo-900 to-pink-900 text-white">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-pink-400 mb-6"
      >
        <Heart size={64} fill="currentColor" />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-2xl md:text-3xl font-light text-pink-100"
      >
        Preparing something special... ❤️
      </motion.h2>
    </div>
  );
}
