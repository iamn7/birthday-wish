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
      className={`relative flex flex-col md:flex-row items-center w-full my-12 ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      {/* Date badge on small screens */}
      <div className="md:hidden text-pink-300 font-medium mb-2">
        {memory.date}
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 p-4">
        <div
          className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl ${isEven ? "md:ml-8" : "md:mr-8"}`}
        >
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h2 className="text-2xl font-semibold text-white mb-2">
            {memory.title}
          </h2>
          <p className="text-pink-100/90 leading-relaxed">{memory.caption}</p>
        </div>
      </div>

      {/* Center dot for desktop */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-8 h-8 rounded-full bg-pink-500 border-4 border-slate-900 z-10" />

      {/* Date badge for desktop */}
      <div
        className={`hidden md:flex w-1/2 justify-${isEven ? "start" : "end"} px-8`}
      >
        <span className="text-pink-300 font-medium text-lg bg-slate-900/50 px-4 py-1 rounded-full border border-pink-500/30">
          {memory.date}
        </span>
      </div>
    </motion.div>
  );
}
