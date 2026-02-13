/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

const SendMeLoveNotes = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [loveNote, setLoveNote] = useState("");


  const handleSubmitNote = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    console.log("Add love note", loveNote);
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
            Do you want to send me a love note?
          </h2>
          <p className="text-gray-600">Click to send a love note to me</p>
        </motion.div>

        <textarea
          placeholder="Write your love note here..."
          value={loveNote}
          onChange={(e) => setLoveNote(e.target.value)}
          className="w-full h-40 rounded-2xl border border-gray-200 p-4 mt-6 mb-4"
        />

        {/* Generate button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmitNote}
          className="inline-flex items-center gap-3 bg-blue-500 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
        >
          <motion.div
            animate={isAnimating ? { rotate: 360 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={24} />
          </motion.div>
          Send Love Note
        </motion.button>
      </div>
    </section>
  );
};

export default SendMeLoveNotes;
