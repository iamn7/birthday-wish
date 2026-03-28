import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import beethovenAudio from '../assets/audio/Beethoven.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    // This uses a generic royalty-free lofi/romantic track placeholder
    audioRef.current = new Audio(beethovenAudio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    const handleForcePause = () => {
      // Check if it's currently actually playing
      if (audioRef.current && !audioRef.current.paused) {
        wasPlayingRef.current = true;
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        wasPlayingRef.current = false;
      }
    };

    const handleForceResume = () => {
      // Only resume if it was forcefully paused while playing
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
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
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    // Manual toggle resets the automatic resume condition
    wasPlayingRef.current = false;
    setIsPlaying(!isPlaying);
  };

  return (
    <button 
      onClick={togglePlay}
      className="fixed top-6 right-6 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all text-white shadow-lg"
      aria-label="Toggle background music"
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </button>
  );
}
