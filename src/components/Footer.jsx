/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-blue-950 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back to top button */}
        <div className="flex justify-center mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="p-2 rounded-full bg-blue-900 text-blue-200 hover:bg-blue-800 transition-colors"
            aria-label="Back to top"
          >
            <ChevronUp size={24} />
          </motion.button>
        </div>

        {/* Footer text */}
        <p className="text-blue-200 text-sm text-center">
          Made with ❤️ for Itung
        </p>

        <p className="text-blue-300 text-xs text-center mt-2 opacity-60">
          Valentine's Day 2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
