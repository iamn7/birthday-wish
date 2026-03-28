import { motion } from "framer-motion";
import { memories } from "../data/memories";

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20 text-2xl text-pink-200 italic"
        >
          " Hum milenge baagh mein, gaon mein, dhoop mein, chhaon mein, ret
          mein, dasht mein,
          <br />
          Shehar mein, masjidon mein, kaleeson mein, mandir mein, mehrab mein,
          church mein,
          <br />
          Moosalaadhar baarish mein, bazaar mein, khwaab mein, aag mein, gehre
          paani mein,
          <br />
          Galiyon mein, jungle mein aur aasmanon mein
          <br />
          <br />
          Kono makaan se pare, gair-aabaad sayyara-e-aarzoo mein sadiyon se
          khaali padi bench par
          <br />
          Jahan maut bhi hum se dast-o-garebaan hogi,
          <br />
          To bas ek do din ki mehmaan hogi";
        </motion.div>
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
