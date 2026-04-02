import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import beethovenAudio from '../assets/audio/Beethoven.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(beethovenAudio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const handleForcePause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        wasPlayingRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        wasPlayingRef.current = false;
      }
    };

    const handleForceResume = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        setIsPlaying(true);
        wasPlayingRef.current = false;
      }
    };

    window.addEventListener('bg-music-pause', handleForcePause);
    window.addEventListener('bg-music-resume', handleForceResume);

    return () => {
      window.removeEventListener('bg-music-pause', handleForcePause);
      window.removeEventListener('bg-music-resume', handleForceResume);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    wasPlayingRef.current = false;
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className="fixed top-5 right-5 z-50 group"
      aria-label="Toggle background music"
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <div
        className="relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3))'
            : 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: isPlaying
            ? '1px solid rgba(236,72,153,0.4)'
            : '1px solid rgba(255,255,255,0.12)',
          boxShadow: isPlaying
            ? '0 0 20px rgba(236,72,153,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
            : '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07)',
        }}
      >
        {isPlaying ? (
          <Volume2 size={18} className="text-pink-300 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX size={18} className="text-white/50 group-hover:text-white/80 group-hover:scale-110 transition-all" />
        )}

        {/* Pulse ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border border-pink-500/40 animate-ping" />
        )}
      </div>
    </button>
  );
}
