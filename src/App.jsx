import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";

import ChanakyaAudio from "./pages/resources/ChanakyaAudio";
import ChanakyaBook from "./pages/resources/ChanakyaBook";
import ChanakyaNews from "./pages/resources/ChanakyaNews";
import ChanakyaQuiz from "./pages/resources/ChanakyaQuiz";
import ChanakyaVideo from "./pages/resources/ChanakyaVideo";

import Contributors from "./pages/contributor/Contributors";
import ContributorDetail from "./pages/contributor/ContributorDetail";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ChanakyaGpt from "./pages/resources/ChanakyaGpt";
import "./App.css";
import AnimatedCursor from "react-animated-cursor";

import { FaAngleDoubleUp } from "react-icons/fa";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { themeState } from "./atoms/ThemeAtom";
import { toggleThemeSelector } from "./atoms/ThemeAtom";

function App() {
  const { progress} = useContext(Context);
  const isDarkMode = useRecoilValue(themeState); //to use the current theme 
  const toggleTheme = useSetRecoilState(toggleThemeSelector); //to update the state  

  const [showScroll, setShowScroll] = useState(false);

  // Function to handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  // useEffect(() => {
  //   // Add or remove the "dark" class on the body based on isDarkMode
  //   document.body.classList.toggle("dark", isDarkMode);
  // }, [isDarkMode]);

  return (
    <div className={`d-flex flex-column ${isDarkMode ? "dark" : ""}`}>
      <AnimatedCursor
        innerSize={10}
        outerSize={12}
        color="111, 158, 111"
        outerAlpha={0.8}
        innerScale={1.0}
        outerScale={5}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          ".link",
        ]}
      />
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <main className="container flex-grow-1 mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/resources/audio" element={<ChanakyaAudio />} />
            <Route exact path="/resources/book" element={<ChanakyaBook />} />
            <Route exact path="/resources/news" element={<ChanakyaNews />} />
            <Route exact path="/resources/quiz" element={<ChanakyaQuiz />} />
            <Route exact path="/resources/video" element={<ChanakyaVideo />} />
            <Route
              exact
              path="/resources/chanakyagpt"
              element={<ChanakyaGpt />}
            />

            <Route exact path="/contributor" element={<Contributors />} />
            <Route
              path="/contributor/details"
              element={<ContributorDetail />}
            />

            {/* Authentication Pages */}
            <Route exact path="/auth/login" element={<Login />} />
            <Route exact path="/auth/signup" element={<SignUp />} />
          </Routes>
        </main>

        <Footer />
      </Router>
      
      {/* Scroll to Top Button */}
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "30px",
          display: showScroll ? "flex" : "none",
          backgroundColor: isDarkMode ? "#333333" : "#DFDFB0",
          color: isDarkMode ? "#F5FBFA" : "#333",
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          padding: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FaAngleDoubleUp />
      </button>

    </div>
  );
}

export default App;
