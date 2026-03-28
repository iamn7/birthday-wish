import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background hearts/particles stub */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 via-transparent to-transparent"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 drop-shadow-lg">
          Hey Nuzhat❤️, I made something special for you...
        </h1>
        <p className="text-xl text-pink-100/80 mb-12">Choose where you'd like to start.</p>
        
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <SectionCard title="💭 Memory Timeline" path="/timeline" delay={0.2} />
          <SectionCard title="💌 A Letter for you!" path="/letter" delay={0.4} />
          <SectionCard title="🎁 Surprise" path="/surprise" delay={0.6} />
        </div>
      </motion.div>
    </div>
  );
}

function SectionCard({ title, path, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236,72,153,0.5)' }}
      whileTap={{ scale: 0.95 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 w-full max-w-sm cursor-pointer hover:bg-white/20 transition-colors"
    >
      <Link to={path} className="block w-full h-full text-center">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </Link>
    </motion.div>
  );
}
