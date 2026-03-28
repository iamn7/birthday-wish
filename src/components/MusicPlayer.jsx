import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import beethovenAudio from '../assets/audio/Beethoven.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Using HTML5 audio API
  const audioRef = useRef(null);

  useEffect(() => {
    // This uses a generic royalty-free lofi/romantic track placeholder
    // In a real scenario, this would be imported locally from assets/audio/
    audioRef.current = new Audio(beethovenAudio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      audioRef.current.pause();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
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
