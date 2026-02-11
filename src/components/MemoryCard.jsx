/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const MemoryCard = ({ memory, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image container with aspect ratio */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={memory.image}
          alt={`Memory ${index + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image doesn't load
            e.target.src = `https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=800&fit=crop`;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-base leading-relaxed text-gray-700 font-serif italic mb-3">
          "{memory.quote}"
        </p>
        <p className="text-xs text-blue-400 uppercase tracking-wide font-sans font-medium">
          {memory.date}
        </p>
      </div>
    </motion.div>
  );
};

export default MemoryCard;