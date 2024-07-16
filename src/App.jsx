import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Context } from "./context/Context";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

import Home from "./pages/Home";
import About from "./pages/About";

import Audio from "./pages/resources/Audio";
import ChanakyaAudio from "./pages/resources/audio/ChanakyaAudio";
import Video from "./pages/resources/Video";
import ChanakyaVideo from "./pages/resources/video/ChanakyaVideo";
import Book from "./pages/resources/Book";
import ChanakyaBook from "./pages/resources/book/ChanakyaBook";
import News from "./pages/resources/News";
import ChanakyaNews from "./pages/resources/news/ChanakyaNews";
import Quiz from "./pages/resources/Quiz";
import ChanakyaQuiz from "./pages/resources/quiz/ChanakyaQuiz";

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

        <main className="flex-grow-1 mt-4">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />

            {/* Audio Resource Pages */}
            <Route exact path="/resources/audio" element={<Audio />} />
            <Route exact path="/resources/audio/chanakya" element={<ChanakyaAudio />} />

            {/* Video Resource Pages */}
            <Route exact path="/resources/video" element={<Video />} />
            <Route exact path="/resources/video/chanakya" element={<ChanakyaVideo />} />

            {/* Book Resource Pages */}
            <Route exact path="/resources/book" element={<Book />} />
            <Route exact path="/resources/book/chanakya" element={<ChanakyaBook />} />

            {/* News Resource Pages */}
            <Route exact path="/resources/news" element={<News />} />
            <Route exact path="/resources/news/chanakya" element={<ChanakyaNews />} />

            {/* Quiz Resource Pages */}
            <Route exact path="/resources/quiz" element={<Quiz />} />
            <Route exact path="/resources/quiz/chanakya" element={<ChanakyaQuiz />} />

            <Route exact path="/contributor" element={<Contributors />} >
            </Route>
            <Route path="/contributor/details" element={<ContributorDetail />}> </Route>

            {/* Authentication Pages */}
            <Route exact path="/auth/login" element={<Login />} />
            <Route exact path="/auth/SignUp" element={<SignUp />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
