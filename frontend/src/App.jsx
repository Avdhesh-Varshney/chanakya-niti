import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import ChanakyaAudio from "./pages/ChanakyaAudio";

import { FaAngleDoubleUp } from "react-icons/fa";
import { ScrollToTop } from "react-simple-scroll-up";

function App() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 300) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 300) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources/audio" element={<ChanakyaAudio />} />
          </Routes>
        </main>

        <Footer />
      </div>

      <ScrollToTop
        className="scroll-to-top"
        symbol={<FaAngleDoubleUp />}
        size={50}
        bgColor={"#dfdfb0"}
        strokeWidth={6}
        strokeFillColor={"#fff"}
        strokeEmptyColor="#505050"
        symbolColor={"#333"}
      />
    </>
  );
}

export default App;
