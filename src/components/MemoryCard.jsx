/* eslint-disable no-unused-vars */
// MemoryCard.jsx - Add share button per card
import { useRef } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import html2canvas from "html2canvas";

const MemoryCard = ({ memory, index }) => {
  const cardRef = useRef(null);

  const handleShareCard = async (e) => {
    e.stopPropagation();

    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        onclone: (doc) => {
          const clonedCard = doc.querySelector("[data-card='memory-card']");
          if (!clonedCard) return;

          // matiin semua transform/animation framer motion
          clonedCard.style.transform = "none";
          clonedCard.style.transition = "none";

          const imgs = clonedCard.querySelectorAll("img");
          imgs.forEach((img) => {
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.display = "block";
          });
        },
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        if (navigator.share && navigator.canShare) {
          const file = new File([blob], `memory-${memory.id}.png`, {
            type: "image/png",
          });

          try {
            await navigator.share({
              files: [file],
              title: "Our Memory",
              text: memory.quote,
            });
          } catch (err) {
            if (err.name !== "AbortError") {
              // Fallback download
              const link = document.createElement("a");
              link.download = `memory-${memory.id}.png`;
              link.href = canvas.toDataURL("image/png");
              link.click();
            }
          }
        } else {
          // Download
          const link = document.createElement("a");
          link.download = `memory-${memory.id}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
        }
      });
    } catch (err) {
      console.error("Error sharing card:", err);
    }
  };

  return (
    <motion.div
      data-card="memory-card"
      ref={cardRef} // ← Add ref
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
    >
      {/* Share Button - appears on hover */}
      <button
        onClick={handleShareCard}
        className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Share2 size={18} className="text-blue-500" />
      </button>

      {/* Image container */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden bg-gray-100">
        <img
          src={memory.image_url}
          alt={`Memory ${index + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
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
