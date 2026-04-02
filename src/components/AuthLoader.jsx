import React from 'react';
import { motion } from 'framer-motion';

const AuthLoader = ({ message = 'Verifying...' }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0f0722 0%, #1a0533 50%, #0f0c2e 100%)' }}
    >
      {/* Ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-600/20 rounded-full blur-[80px]"
      />
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-600/20 rounded-full blur-[80px]"
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Double-ring spinner */}
        <div className="w-20 h-20 relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#ec4899',
              borderRightColor: 'rgba(236,72,153,0.3)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-2.5 rounded-full"
            style={{
              border: '2px solid transparent',
              borderBottomColor: '#a855f7',
              borderLeftColor: 'rgba(168,85,247,0.3)',
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-5 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.6), rgba(168,85,247,0.4))' }}
          />
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gradient-pink">
            {message}
          </p>
          <div className="flex gap-1.5">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: i * 0.18, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-pink-400"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLoader;
