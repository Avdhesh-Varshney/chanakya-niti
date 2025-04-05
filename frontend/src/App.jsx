import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";

import ChanakyaAudio from "./pages/ChanakyaAudio";

import { FaAngleDoubleUp } from "react-icons/fa";
import { ScrollToTop } from "react-simple-scroll-up";

function App() {
  const { isDarkMode } = useContext(Context); // Assuming isDarkMode is provided in your context
  const [showScroll, setShowScroll] = useState(false);

  // Function to check the scroll position
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

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

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
        bgColor={isDarkMode ? "#2C2A2A" : "#dfdfb0"}
        strokeWidth={6}
        strokeFillColor={isDarkMode ? "#fff" : "rgb(0, 0, 0)"}
        strokeEmptyColor="#505050"
        symbolColor={isDarkMode ? "#F5FBFA" : "#333"}
      />
    </>
  );
}

export default App;
