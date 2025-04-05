import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
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
  const { isDarkMode } = useContext(Context); // Assuming isDarkMode is provided in your context
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
      <SignUp />
    </GoogleOAuthProvider>
  );

  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/resources/audio" element={<ChanakyaAudio />} />
            <Route path="/resources/book" element={<ChanakyaBook />} />
            <Route path="/resources/news" element={<ChanakyaNews />} />
            <Route path="/resources/quiz" element={<ChanakyaQuiz />} />
            <Route path="/resources/video" element={<ChanakyaVideo />} />
            <Route path="/resources/chanakyagpt" element={<ChanakyaGpt />} />
            <Route path="/auth/login" element={<GoogleLoginWrapper />} />
            <Route path="/auth/signup" element={<GoogleSignUpWrapper />} />
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
