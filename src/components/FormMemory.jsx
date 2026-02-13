/* eslint-disable no-unused-vars */

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Upload, X } from "lucide-react";
import { useState } from "react";
import { useMemories } from "../hooks/useMemories";

const FormMemory = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [quote, setQuote] = useState("");
  const [date, setDate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  const { addMemory, uploadPhoto } = useMemories();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    if (!file || !quote || !date) {
      alert("Please fill in all fields");
      return;
    }
    setUploading(true);
    const {
      success: uploadSuccess,
      publicUrl: url,
      error: uploadError,
    } = await uploadPhoto(file);

    if (uploadError) {
      console.error("uploadError", uploadError);
      setUploading(false);
      return;
    }

    console.log("uploadError", uploadError);
    console.log("uploadSuccess", uploadSuccess);
    console.log("url", url);

    const { success: addSuccess, error: addError } = await addMemory({
      image_url: url,
      quote,
      date,
    });

    if (addSuccess) {
      alert("Memory added! 💙");
      setFile(null);
      setPreview(null);
      setQuote("");
      setDate("");
      setIsOpen(false);
    } else {
      alert(`Failed to add memory: ${addError}`);
    }
    setUploading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="h-14 md:h-14 w-auto bg-blue-500 text-white rounded-full shadow-2xl px-4 active:bg-blue-600 flex items-center gap-2 justify-center"
        style={{
          // Safe area for iPhone notch
          bottom: "calc(1.5rem + env(safe-area-inset-bottom))",
        }}
        whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Heart size={24} strokeWidth={2.5} />
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
          className="text-xl"
        >
          Add Memory
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 150 || velocity.y > 500) {
                  handleClose();
                }
              }}
              className="fixed inset-x-0 bottom-0 md:inset-0 z-50 flex md:items-center md:justify-center"
              style={{
                // Safe area for iPhone
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif text-blue-900">
                    Add Memory
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photo
                    </label>
                    {preview ? (
                      <div className="relative">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full aspect-square object-cover rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setPreview(null);
                          }}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                        <Upload size={40} className="text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">
                          Click to upload
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Quote */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quote / Memory
                    </label>
                    <textarea
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="A beautiful moment we shared..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Jan 15, 2024"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-4 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? "Adding Memory..." : "Add Memory 💙"}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FormMemory;
