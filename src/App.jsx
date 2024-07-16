import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import About from "./pages/About";

import ChanakyaAudio from "./pages/resources/ChanakyaAudio";
import ChanakyaBook from "./pages/resources/ChanakyaBook";
import ChanakyaNews from "./pages/resources/ChanakyaNews";
import ChanakyaQuiz from "./pages/resources/ChanakyaQuiz";
import ChanakyaVideo from "./pages/resources/ChanakyaVideo";

import Contributors from "./pages/contributor/Contributors";
import ContributorDetail from "./pages/contributor/ContributorDetail";

import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

function App() {
  const { progress } = useContext(Context);

  return (
    <div className='d-flex flex-column'>
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <main className="container flex-grow-1 mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />

            <Route exact path="/resources/audio" element={<ChanakyaAudio />} />
            <Route exact path="/resources/book" element={<ChanakyaBook />} />
            <Route exact path="/resources/news" element={<ChanakyaNews />} />
            <Route exact path="/resources/quiz" element={<ChanakyaQuiz />} />
            <Route exact path="/resources/video" element={<ChanakyaVideo />} />

            <Route exact path="/contributor" element={<Contributors />} >
            </Route>
            <Route path="/contributor/details" element={<ContributorDetail />}> </Route>

            {/* Authentication Pages */}
            <Route exact path="/auth/login" element={<Login />} />
            <Route exact path="/auth/signup" element={<SignUp />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
