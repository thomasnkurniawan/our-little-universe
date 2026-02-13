/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import MemoryCard from "./MemoryCard";
import { useMemories } from "../hooks/useMemories";
import { useEffect, useRef } from "react";
import FormMemory from "./FormMemory";
import ShareButton from "./ShareButton";

const MemoryGrid = () => {
  const sectionRef = useRef(null); // ← Add ref
  const { memories, fetchMemories, subscribe, loading, error } = useMemories();

  useEffect(() => {
    fetchMemories();

    const subscription = subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchMemories, subscribe]);

  return (
    <section id="memories" className="py-20 px-4 bg-white" ref={sectionRef}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex justify-center"
        >
          <FormMemory />
        </motion.div>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">
              Failed to load memories: {error}
            </p>
            <button
              onClick={fetchMemories}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && memories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No memories yet. Add your first one! 💙
            </p>
          </div>
        )}

        {/* Memory cards grid */}
        {!loading && !error && memories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memories.map((memory, index) => (
              <MemoryCard key={memory.id} memory={memory} index={index} />
            ))}
          </div>
        )}

        {memories.length > 0 && (
          <div className="flex justify-center mt-8">
            <ShareButton targetRef={sectionRef} sectionName="memories" />
          </div>
        )}
      </div>
    </section>
  );
};

export default MemoryGrid;
