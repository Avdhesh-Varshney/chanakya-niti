import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help"
import Error from "./pages/Error"

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
import AnimatedCursor from "react-animated-cursor"

function App() {
  const { progress, isDarkMode } = useContext(Context); // Assuming isDarkMode is provided in your context

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`d-flex flex-column ${isDarkMode ? 'dark' : ''}`}>
          <AnimatedCursor
      innerSize={10}
      outerSize={12}
      color='111, 158, 111'
      outerAlpha={0.8}
      innerScale={1.0}
      outerScale={5}
      clickables={[
        'a',
        'input[type="text"]',
        'input[type="email"]',
        'input[type="number"]',
        'input[type="submit"]',
        'input[type="image"]',
        'label[for]',
        'select',
        'textarea',
        'button',
        '.link'
      ]}
    />
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <main className="container flex-grow-1 mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/resources/audio" element={<ChanakyaAudio />} />
            <Route exact path="/resources/book" element={<ChanakyaBook />} />
            <Route exact path="/resources/news" element={<ChanakyaNews />} />
            <Route exact path="/resources/quiz" element={<ChanakyaQuiz />} />
            <Route exact path="/resources/video" element={<ChanakyaVideo />} />
            <Route exact path="/resources/chanakyagpt" element={<ChanakyaGpt />} />

            <Route exact path="/contributor" element={<Contributors />} />
            <Route path="/contributor/details" element={<ContributorDetail />} />

            {/* Authentication Pages */}
            <Route exact path="/auth/login" element={<Login />} />
            <Route exact path="/auth/signup" element={<SignUp />} />
            <Route exact path="/*" element={<Error/>} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
