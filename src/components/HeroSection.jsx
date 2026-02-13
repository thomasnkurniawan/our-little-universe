/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const HeroSection = ({ onEnter }) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
      {/* Floating hearts decoration */}
      <motion.div
        className="absolute top-20 left-20 text-blue-200"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Heart size={32} fill="currentColor" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-32 right-32"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Heart size={24} fill="currentColor" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20 text-blue-100"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <Heart size={20} fill="currentColor" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center px-6 max-w-3xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold text-blue-900 mb-6"
        >
          Our Little Universe
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-xl text-blue-600 font-light italic mb-12 max-w-md mx-auto"
        >
          Two souls, infinite moments
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-8 py-4 bg-blue-500 text-white rounded-full text-lg font-medium hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl"
        >
          Enter Our World
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;