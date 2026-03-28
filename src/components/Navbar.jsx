import { Link, useLocation } from 'react-router-dom';
import { Home, Clock, Heart, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/timeline', icon: Clock, label: 'Timeline' },
    { path: '/letter', icon: Heart, label: 'Letter' },
    { path: '/surprise', icon: Gift, label: 'Surprise' },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl safe-area-pb">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center justify-center p-2 rounded-full transition-colors group"
          >
            {isActive && (
              <motion.div
                layoutId="navBlob"
                className="absolute inset-0 bg-pink-500/30 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon 
              size={24} 
              className={`relative z-10 transition-colors ${isActive ? 'text-pink-300' : 'text-gray-400 group-hover:text-pink-200'}`} 
            />
          </Link>
        );
      })}
    </nav>
  );
}
