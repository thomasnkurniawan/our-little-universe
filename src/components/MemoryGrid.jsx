/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import MemoryCard from './MemoryCard';
import { memories } from '../data/memories';


const MemoryGrid = () => {
  return (
    <section id="memories" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-blue-900 mb-4">
            The Moments We Cherish
          </h2>
          <p className="text-gray-600 text-lg">
            Every picture tells a story, every story is ours
          </p>
        </motion.div>

        {/* Memory cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {memories.map((memory, index) => (
            <MemoryCard key={memory.id} memory={memory} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemoryGrid;