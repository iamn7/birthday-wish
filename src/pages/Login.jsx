import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Heart, ArrowRight } from 'lucide-react';
import { login } from '../auth/auth';
import AuthLoader from '../components/AuthLoader';

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

    // Simulate a slight delay for a mysterious, processing feel
    setTimeout(() => {
      const result = login(name, date);

      if (result.success) {
        // Optional success sound cue
        try {
          const audio = new Audio('/success-chime.mp3'); // We'll assume they might add this file later or we can omit
          audio.volume = 0.5;
          audio.play().catch(() => {});
        } catch (e) {}

        // Allow some time for loader to show "Access Granted"
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
    return <AuthLoader message={error ? "Verifying..." : "Access Granted"} />;
  }

  return (
    <div className="relative min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-indigo-600/20 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
        >
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/30"
            >
              <Heart className="w-8 h-8 text-white" fill="currentColor" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-purple-200">
              Secret Access
            </h1>
            <p className="text-slate-400 text-sm mt-2">Only you would know this...</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">
                Your Name <span className="opacity-70 lowercase">(as I call you)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Heart className="h-4 w-4 text-pink-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all`}
                  placeholder="e.g. lovely"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-300 uppercase tracking-wider ml-1">
                A Special Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-purple-400" />
                </div>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    if (error) setError(false);
                  }}
                  className={`w-full pl-11 pr-4 py-3 bg-black/20 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                  placeholder="DD/MM/YYYY"
                  autoComplete="off"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(236,72,153,0.4)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all shadow-lg"
            >
              <span>Unlock Memories</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
