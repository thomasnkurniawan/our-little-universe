import "./App.css";
import ClosingSection from "./components/ClosingSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LoveNoteGenerator from "./components/LoveNoteGenerator";
import MemoryGrid from "./components/MemoryGrid";

function App() {
  const handleEnter = () => {
    // Smooth scroll to memories section
    setTimeout(() => {
      document.getElementById("memories")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };
  return (
    <div className="min-h-screen">
      <HeroSection onEnter={handleEnter} />

      {/* Content sections - always rendered but user scrolls to them */}
      <MemoryGrid />
      <LoveNoteGenerator />
      <ClosingSection />
      <Footer />
    </div>
  );
}

export default App;
