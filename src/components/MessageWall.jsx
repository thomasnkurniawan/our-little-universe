/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Heart, Sparkles } from "lucide-react";
import { loveNotes } from "../data/loveNotes";
import ShareButton from "./ShareButton";
import { useLoveNoteStore } from "../hooks/useLoveNotes";

const MessageWall = () => {
  const sectionRef = useRef(null);
  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [fromName, setFromName] = useState("");

  // Random generator state
  const [currentRandomNote, setCurrentRandomNote] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  // Zustand store
  const { sending, sentNotes, sendLoveNote, fetchSentNotes } =
    useLoveNoteStore();

  // Fetch notes on mount
  useEffect(() => {
    fetchSentNotes();
  }, [fetchSentNotes]);

  // Generate random note
  const generateRandomNote = () => {
    setIsAnimating(true);

    let newNote;
    do {
      newNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    } while (newNote === currentRandomNote && loveNotes.length > 1);

    setTimeout(() => {
      setCurrentRandomNote(newNote);
      setIsAnimating(false);
    }, 300);
  };

  // Handle send note to wall
  const handleSendNote = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please write a message!");
      return;
    }

    const { success } = await sendLoveNote(message, fromName);

    if (success) {
      alert("Love note added to wall! 💙");
      setMessage("");
      setIsFormOpen(false);
    } else {
      alert("Failed to send. Try again!");
    }
  };

  // Random colors for sticky notes
  const colors = [
    "bg-yellow-100 border-yellow-200",
    "bg-pink-100 border-pink-200",
    "bg-blue-100 border-blue-200",
    "bg-green-100 border-green-200",
    "bg-purple-100 border-purple-200",
    "bg-orange-100 border-orange-200",
  ];

  // Random rotation for natural look
  const getRandomRotation = (index) => {
    const rotations = [-2, -1, 0, 1, 2, -3, 3];
    return rotations[index % rotations.length];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-white to-sky-50"
      ref={sectionRef}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-blue-900 mb-4">
            💌 Our Message Wall
          </h2>
          <p className="text-gray-600 mb-8">
            Sweet notes and random thoughts we share
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Random Note Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateRandomNote}
              disabled={isAnimating}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white rounded-full font-medium shadow-lg hover:bg-blue-600 transition-all disabled:opacity-50"
            >
              <motion.div
                animate={isAnimating ? { rotate: 360 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={20} />
              </motion.div>
              Random Note
            </motion.button>

            {/* Add to Wall Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Send size={20} />
              Add to Wall
            </motion.button>
          </div>
        </motion.div>

        {/* Random Note Display */}
        <AnimatePresence mode="wait">
          {currentRandomNote && (
            <motion.div
              key={currentRandomNote}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto mb-12 bg-white rounded-3xl p-8 shadow-xl border-l-4 border-blue-400"
            >
              <Heart className="text-blue-300 mx-auto mb-4" size={40} />
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 leading-relaxed text-center">
                "{currentRandomNote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Divider */}
        {currentRandomNote && sentNotes.length > 0 && (
          <div className="max-w-xs mx-auto mb-12">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-400 text-sm">Our Wall</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>
        )}

        {/* Message Wall Grid */}
        {sentNotes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg">Wall is empty</p>
            <p className="text-gray-400 text-sm mt-2">Add your first note!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sentNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: getRandomRotation(index),
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.2 },
                }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
                className={`relative p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border-2 ${
                  colors[index % colors.length]
                }`}
                style={{
                  minHeight: `${200 + (index % 3) * 20}px`,
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 20px)",
                }}
              >
                {/* Tape decoration */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-gray-200/70 rounded-sm shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #f0f0f0 25%, transparent 25%) -10px 0, linear-gradient(225deg, #f0f0f0 25%, transparent 25%) -10px 0, linear-gradient(315deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, #f0f0f0 25%, transparent 25%)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Message */}
                <p
                  className="text-gray-800 leading-relaxed mb-4"
                  style={{ fontFamily: "Patrick Hand, cursive" }}
                >
                  {note.message}
                </p>

                {/* Footer */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-gray-600">
                  <span className="font-medium">
                    {note.from_name || "Love"}
                  </span>
                  <span>{formatDate(note.created_at)}</span>
                </div>

                {/* Heart decoration */}
                <Heart
                  size={16}
                  className="absolute top-3 right-3 text-red-400 opacity-50"
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Share Button */}
        {sentNotes.length > 0 && (
          <div className="flex justify-center mt-8">
            <ShareButton targetRef={sectionRef} sectionName="message-wall" />
          </div>
        )}
      </div>

      {/* Add Note Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif text-blue-900 flex items-center gap-2">
                    <Sparkles size={24} className="text-yellow-500" />
                    New Note
                  </h3>
                  <button
                    onClick={() => setIsFormOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSendNote} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write something sweet..."
                      rows={6}
                      maxLength={200}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                      style={{ fontSize: "16px" }}
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {message.length}/200
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your name
                    </label>
                    <input
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-base"
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="w-full py-4 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 active:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {sending ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Adding...
                      </span>
                    ) : (
                      "Add to Wall 💙"
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MessageWall;
