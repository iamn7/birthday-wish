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
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-3 py-2 rounded-full safe-area-pb"
      style={{
        background: 'rgba(15, 10, 30, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-2.5 rounded-full transition-all duration-300 group"
          >
            {isActive && (
              <motion.div
                layoutId="navBlob"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.35), rgba(168,85,247,0.25))',
                  boxShadow: '0 0 20px rgba(236,72,153,0.2)',
                  border: '1px solid rgba(236,72,153,0.2)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <Icon
              size={20}
              className={`relative z-10 transition-all duration-300 ${
                isActive
                  ? 'text-pink-300 drop-shadow-[0_0_6px_rgba(236,72,153,0.7)]'
                  : 'text-white/40 group-hover:text-pink-200 group-hover:scale-110'
              }`}
              {...(item.icon === Heart && isActive ? { fill: 'currentColor' } : {})}
            />
            <span
              className={`relative z-10 text-[10px] font-medium tracking-wide transition-all duration-300 ${
                isActive ? 'text-pink-300 opacity-100' : 'text-white/30 group-hover:text-white/60'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
