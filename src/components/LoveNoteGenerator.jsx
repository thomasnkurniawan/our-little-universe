/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { loveNotes } from '../data/loveNotes';


const LoveNoteGenerator = () => {
  const [currentNote, setCurrentNote] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const generateNote = () => {
    setIsAnimating(true);
    
    // Get random note (avoid immediate repeat if possible)
    let newNote;
    do {
      newNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    } while (newNote === currentNote && loveNotes.length > 1);
    
    // Add slight delay for animation effect
    setTimeout(() => {
      setCurrentNote(newNote);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-blue-900 mb-3">
            A Little Something Random
          </h2>
          <p className="text-gray-600">
            Click to generate a random love note just for you
          </p>
        </motion.div>

        {/* Generate button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateNote}
          disabled={isAnimating}
          className="inline-flex items-center gap-3 bg-blue-500 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          <motion.div
            animate={isAnimating ? { rotate: 360 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={24} />
          </motion.div>
          Generate Love Note
        </motion.button>

        {/* Display area */}
        <AnimatePresence mode="wait">
          {currentNote && (
            <motion.div
              key={currentNote}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-white rounded-3xl p-8 shadow-xl border-l-4 border-blue-400"
            >
              <Heart className="text-blue-300 mx-auto mb-4" size={40} />
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed">
                "{currentNote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LoveNoteGenerator;