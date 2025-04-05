import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Feedback from "./pages/Feedback";

import ChanakyaAudio from "./pages/resources/ChanakyaAudio";
import ChanakyaBook from "./pages/resources/ChanakyaBook";
import ChanakyaNews from "./pages/resources/ChanakyaNews";
import ChanakyaQuiz from "./pages/resources/ChanakyaQuiz";
import ChanakyaVideo from "./pages/resources/ChanakyaVideo";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ChanakyaGpt from "./pages/resources/ChanakyaGpt";

import { FaAngleDoubleUp } from "react-icons/fa";
import { ScrollToTop } from "react-simple-scroll-up";

//for handling oauths
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
const google_client_id =
  import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


function App() {
  const {isDarkMode } = useContext(Context); // Assuming isDarkMode is provided in your context
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



//Google oauth only works if we wrap the components with google oauth provider
 const GoogleLoginWrapper = () => (
   <GoogleOAuthProvider clientId={google_client_id}>
     <Login />
   </GoogleOAuthProvider>
 );
 const GoogleSignUpWrapper = () => (
   <GoogleOAuthProvider clientId={google_client_id}>
    <SignUp/>
   </GoogleOAuthProvider>
 );

  return (
    <div className={`d-flex flex-column ${isDarkMode ? "dark" : ""}`}>
      <Router>
        <Navbar />
        <main className="container flex-grow-1 mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/feedback" element={<Feedback />} />
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

            {/* Authentication Pages */}
            <Route exact path="/auth/login" element={<GoogleLoginWrapper/>} />
            <Route exact path="/auth/signup" element={<GoogleSignUpWrapper />} />
          </Routes>
        </main>

        <Footer />
      </Router>

      {/* Scroll to Top Button */}
      {/* <button
        className="scroll-to-top"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "50px",
          right: "30px",
          display: showScroll ? "flex" : "none",
          backgroundColor: isDarkMode ? "#6f9e6f" : "#DFDFB0",
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
      </button> */}
      <ScrollToTop
        className="scroll-to-top"
        symbol={<FaAngleDoubleUp />}
        size={90}
        bgColor={isDarkMode ? "#2C2A2A" : "#dfdfb0"}
        strokeWidth={6}
        strokeFillColor={isDarkMode?"#fff":"rgb(0, 0, 0)"}
        strokeEmptyColor="#505050"
        symbolColor={isDarkMode ? "#F5FBFA" : "#333"}
      />
    </div>
  );
}

export default App;
