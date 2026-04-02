import { motion } from 'framer-motion';
import { memories } from '../data/memories';
import { useState, useRef } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import humMilengeAudio from '../assets/audio/Bohat.mp3';

export default function Timeline() {
  return (
    <div
      className="min-h-screen py-28 px-4 relative"
      style={{ background: 'linear-gradient(180deg, #0d0521 0%, #1a0533 30%, #1d0838 60%, #0d1030 100%)' }}
    >
      {/* Ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-64 bg-pink-600/8 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: 'rgba(236,72,153,0.1)',
              border: '1px solid rgba(236,72,153,0.2)',
              color: 'rgba(249,168,212,0.8)',
            }}
          >
            ✦ &nbsp; Our Story &nbsp; ✦
          </span>
          <h1
            className="text-4xl md:text-5xl font-display font-bold"
            style={{
              background: 'linear-gradient(135deg, #f9a8d4 0%, #e879f9 50%, #c4b5fd 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(236,72,153,0.3))',
            }}
          >
            Our Beautiful Journey
          </h1>
        </motion.div>

        <div className="relative">
          {/* Central line */}
          <div
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-px h-full"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(236,72,153,0.3) 10%, rgba(168,85,247,0.3) 50%, rgba(236,72,153,0.3) 90%, transparent)' }}
          />

          {memories.map((mem, index) => (
            <TimelineItem key={mem.id} memory={mem} index={index} />
          ))}
        </div>

        <TimelineMusicPlayer />
      </div>
    </div>
  );
}

function TimelineItem({ memory, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className={`relative flex flex-col md:flex-row items-center w-full my-14 ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Mobile date */}
      <div className="md:hidden mb-3">
        <span
          className="text-sm font-semibold px-4 py-1.5 rounded-full"
          style={{
            background: 'rgba(236,72,153,0.12)',
            border: '1px solid rgba(236,72,153,0.25)',
            color: 'rgba(249,168,212,0.85)',
          }}
        >
          {memory.date}
        </span>
      </div>

      {/* Card */}
      <div className="w-full md:w-1/2 px-2 md:px-5">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
          className={`relative group overflow-hidden rounded-3xl ${isEven ? 'md:ml-10' : 'md:mr-10'}`}
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Cinematic blurred backdrop */}
          <div className="absolute inset-0 z-0 bg-black/50">
            <img
              src={memory.image}
              className="w-full h-full object-cover blur-2xl scale-125 opacity-50 mix-blend-screen"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Main Image */}
          <div className="relative z-10 w-full h-[55vh] md:h-[70vh] flex items-center justify-center">
            <motion.img
              initial={{ scale: 0.97, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-contain p-3 md:p-5 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Text overlay */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="absolute bottom-0 inset-x-0 z-20 p-6 pt-28"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)' }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 drop-shadow-lg tracking-wide">
              {memory.title}
            </h2>
            <p className="text-pink-100/85 leading-relaxed text-sm md:text-base">
              {memory.caption}
            </p>
          </motion.div>

          {/* Hover glow border */}
          <div
            className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(236,72,153,0.25)' }}
          />
        </motion.div>
      </div>

      {/* Center dot (desktop) */}
      <div
        className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-9 h-9 rounded-full z-10"
        style={{
          background: 'linear-gradient(135deg, #ec4899, #a855f7)',
          boxShadow: '0 0 20px rgba(236,72,153,0.7), 0 0 0 4px rgba(15,10,30,1)',
        }}
      />

      {/* Desktop date badge */}
      <div className={`hidden md:flex w-1/2 ${isEven ? 'justify-start pl-14' : 'justify-end pr-14'}`}>
        <span
          className="text-sm font-semibold px-5 py-2 rounded-full backdrop-blur-md"
          style={{
            background: 'rgba(10,5,25,0.7)',
            border: '1px solid rgba(236,72,153,0.25)',
            color: 'rgba(249,168,212,0.9)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {memory.date}
        </span>
      </div>
    </motion.div>
  );
}

function TimelineMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      window.dispatchEvent(new CustomEvent('bg-music-resume'));
    } else {
      audioRef.current.play();
      window.dispatchEvent(new CustomEvent('bg-music-pause'));
    }
    setIsPlaying(!isPlaying);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    window.dispatchEvent(new CustomEvent('bg-music-resume'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 max-w-xs mx-auto rounded-3xl overflow-hidden"
      style={{
        background: 'rgba(15,10,30,0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(236,72,153,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Top accent */}
      <div
        className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.6), rgba(168,85,247,0.6), transparent)' }}
      />

      <div className="p-8 flex flex-col items-center">
        {/* Vinyl disc */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
          className="w-20 h-20 rounded-full mb-5 flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #a855f7)',
            boxShadow: isPlaying ? '0 0 30px rgba(236,72,153,0.5)' : '0 0 20px rgba(0,0,0,0.4)',
          }}
        >
          <Music className="w-9 h-9 text-white/90" />
          <div className="absolute inset-7 rounded-full bg-slate-900/50 border border-white/10" />
        </motion.div>

        <h3 className="text-lg font-display font-semibold text-white mb-1">A Message For You</h3>
        <p className="text-pink-200/50 text-sm mb-7 text-center leading-relaxed">
          Hit play for something{' '}
          <span className="text-pink-300/80 font-medium italic">special</span>
        </p>

        <audio ref={audioRef} src={humMilengeAudio} loop={false} onEnded={handleEnded} />

        {/* Play button */}
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3))'
              : 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15))',
            border: '1px solid rgba(236,72,153,0.3)',
            boxShadow: isPlaying ? '0 0 24px rgba(236,72,153,0.4)' : 'none',
          }}
        >
          {isPlaying ? (
            <Pause className="text-pink-300 fill-pink-300 w-6 h-6" />
          ) : (
            <Play className="text-pink-300 fill-pink-300 ml-1 w-6 h-6" />
          )}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full border border-pink-500/40 animate-ping" />
          )}
        </motion.button>
      </div>

      {/* Bottom accent */}
      <div
        className="h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)' }}
      />
    </motion.div>
  );
}
