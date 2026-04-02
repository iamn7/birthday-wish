import { motion } from "framer-motion";
import { memories } from "../data/memories";
import { useState, useRef } from "react";
import { Play, Pause, Music } from "lucide-react";
import humMilengeAudio from '../assets/audio/Bohat.mp3';

export default function Timeline() {
  return (
    <div className="min-h-screen py-24 px-4 bg-gradient-to-b from-indigo-900 to-pink-900 relative">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-16 drop-shadow-md"
        >
          Our Beautiful Journey
        </motion.h1>

        <div className="relative">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-pink-500/30 h-full rounded-full" />

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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`relative flex flex-col md:flex-row items-center w-full my-16 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Date badge on small screens */}
      <div className="md:hidden text-pink-300 font-medium mb-3 text-lg drop-shadow-md">
        {memory.date}
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 px-2 md:px-4">
        <div
          className={`relative group overflow-hidden rounded-2xl border border-white/20 shadow-[-10px_10px_30px_rgba(0,0,0,0.5)] ${isEven ? "md:ml-8" : "md:mr-8"}`}
        >
          {/* Blurred cinematic backdrop */}
          <div className="absolute inset-0 z-0 bg-black/40">
            <img 
              src={memory.image} 
              className="w-full h-full object-cover blur-2xl scale-125 opacity-60 mix-blend-screen" 
              alt=""
            />
          </div>
          
          {/* Main Image Container */}
          <div className="relative z-10 w-full h-[60vh] md:h-[75vh] flex items-center justify-center bg-transparent">
            <motion.img
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              src={memory.image}
              alt={memory.title}
              className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-2 md:p-4"
            />
          </div>

          {/* Text Overlay (The Emotional Layer) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 pt-32"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-lg tracking-wide">
              {memory.title}
            </h2>
            <p className="text-pink-100/95 leading-relaxed text-base md:text-lg drop-shadow-md">
              {memory.caption}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Center dot for desktop */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-pink-500 border-4 border-slate-900 z-10 shadow-[0_0_15px_rgba(236,72,153,0.8)]" />

      {/* Date badge for desktop */}
      <div
        className={`hidden md:flex w-1/2 justify-${isEven ? "start" : "end"} px-12`}
      >
        <span className="text-pink-200 font-semibold text-xl bg-slate-900/60 px-6 py-2 rounded-full border border-pink-500/40 shadow-lg backdrop-blur-md">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 max-w-sm mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl flex flex-col items-center relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 z-0"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(236,72,153,0.5)]">
          <Music className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 tracking-wide text-center drop-shadow-md">Play it!</h3>
        <p className="text-pink-200/80 text-sm mb-8 text-center px-4">
          A special <code className="bg-black/30 px-2 py-1 rounded text-xs">Message</code>  For you !!
        </p>
        
        {/* The Audio Element */}
        <audio 
          ref={audioRef} 
          src={humMilengeAudio} 
          loop={false}
          onEnded={handleEnded}
        />

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-pink-500/50 group shadow-lg backdrop-blur-md"
        >
          {isPlaying ? (
            <Pause className="text-white fill-white w-7 h-7 group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="text-white fill-white ml-2 w-8 h-8 group-hover:scale-110 transition-transform" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
