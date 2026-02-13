/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { RiInstagramFill } from "@remixicon/react";

const ShareButton = ({ targetRef, sectionName = "Section" }) => {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (!targetRef.current) return;

    setIsSharing(true);

    try {
      const wrapper = document.createElement("div");
      wrapper.style.width = "1080px";
      wrapper.style.height = "1920px";
      wrapper.style.background = "linear-gradient(to bottom, #dbeafe, #bfdbfe)";
      wrapper.style.padding = "80px 60px";
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";
      wrapper.style.display = "flex";
      wrapper.style.flexDirection = "column";
      wrapper.style.justifyContent = "center";
      wrapper.style.alignItems = "center";

      const clone = targetRef.current.cloneNode(true);
      clone.style.maxWidth = "960px";
      wrapper.appendChild(clone);

      const watermark = document.createElement("div");
      watermark.style.position = "absolute";
      watermark.style.bottom = "60px";
      watermark.style.fontSize = "32px";
      watermark.style.color = "#1e40af";
      watermark.style.fontFamily = "serif";
      watermark.textContent = "💙 Our Little Universe";
      wrapper.appendChild(watermark);

      document.body.appendChild(wrapper);
      // Capture the section as image
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#ffffff",
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      // Convert to blob
      canvas.toBlob(async (blob) => {
        if (!blob) {
          alert("Failed to generate image");
          setIsSharing(false);
          return;
        }

        // Try Web Share API (works on mobile)
        if (navigator.share && navigator.canShare) {
          const file = new File(
            [blob],
            `our-little-universe-${sectionName}.png`,
            {
              type: "image/png",
            },
          );

          try {
            await navigator.share({
              files: [file],
              title: "Our Little Universe",
              text: `Check out our ${sectionName}! 💙`,
            });
            console.log("Shared successfully");
          } catch (err) {
            if (err.name !== "AbortError") {
              // Fallback to download
              downloadImage(canvas);
            }
          }
        } else {
          // Fallback to download
          downloadImage(canvas);
        }

        setIsSharing(false);
      });
    } catch (err) {
      console.error("Error capturing section:", err);
      alert("Failed to capture section");
      setIsSharing(false);
    }
  };

  const downloadImage = (canvas) => {
    const link = document.createElement("a");
    link.download = `our-little-universe-${sectionName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      disabled={isSharing}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
    >
      {isSharing ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Capturing...
        </>
      ) : (
        <>
          <RiInstagramFill size={20} />
          Share to IG
        </>
      )}
    </motion.button>
  );
};

export default ShareButton;
