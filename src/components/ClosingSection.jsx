/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const ClosingSection = () => {
  return (
    <section className="bg-blue-900 text-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Top hearts decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-4 mb-8"
        >
          <Heart
            size={24}
            fill="currentColor"
            className="text-blue-300 opacity-50"
          />
          <Heart size={24} fill="currentColor" className="text-blue-200" />
          <Heart
            size={24}
            fill="currentColor"
            className="text-blue-300 opacity-50"
          />
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-6">
            This is just a tiny glimpse into our universe.
          </p>
          <p className="text-2xl md:text-3xl font-serif leading-relaxed mb-6">
            Every moment with you adds another star to our sky.
          </p>
          <p className="text-2xl md:text-3xl font-serif leading-relaxed">
            Here's to infinity more memories together.
          </p>
        </motion.div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-3"
        >
          <div className="w-24 h-px bg-blue-300 mx-auto mb-4"></div>
          <p className="text-blue-200 text-sm italic">With all my love,</p>
          <p className="text-xl font-serif">Your Name</p>
          <p className="text-blue-300 text-sm mt-2">Valentine's Day 2025</p>
        </motion.div>

        {/* Bottom hearts decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center gap-4 mt-8"
        >
          <Heart
            size={20}
            fill="currentColor"
            className="text-blue-300 opacity-50"
          />
          <Heart size={20} fill="currentColor" className="text-blue-200" />
          <Heart
            size={20}
            fill="currentColor"
            className="text-blue-300 opacity-50"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSection;
