import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

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

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { createContext } from 'react';


//theme context
export const ThemeContext = createContext(null);
function App() {
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");

  //Toggle theme
  const toggleTheme = () => {
    console.log('cliocking')
document.body.classList.toggle('dark')
    if(theme=='dark'){
      setTheme('light')
    }else{
      setTheme('dark')
    }
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>

    <div className='container d-flex flex-column min-vh-100'>
      <Router>
        <Navbar />
        <LoadingBar height={3} color="#f11946" progress={progress} />

        <main className="flex-grow-1 container mt-4">
          <Routes>
            <Route exact path="/" element={<Home setProgress={setProgress} />} />
            <Route exact path="/about" element={<About setProgress={setProgress} />} />

            {/* Audio Resource Pages */}
            <Route exact path="/resources/audio" element={<Audio />} />
            <Route exact path="/resources/audio/chanakya" element={<ChanakyaAudio setProgress={setProgress} />} />

            {/* Video Resource Pages */}
            <Route exact path="/resources/video" element={<Video />} />
            <Route exact path="/resources/video/chanakya" element={<ChanakyaVideo setProgress={setProgress} />} />

            {/* Book Resource Pages */}
            <Route exact path="/resources/book" element={<Book />} />
            <Route exact path="/resources/book/chanakya" element={<ChanakyaBook setProgress={setProgress} />} />

            {/* News Resource Pages */}
            <Route exact path="/resources/news" element={<News />} />
            <Route exact path="/resources/news/chanakya" element={<ChanakyaNews setProgress={setProgress} />} />

            {/* Quiz Resource Pages */}
            <Route exact path="/resources/quiz" element={<Quiz />} />
            <Route exact path="/resources/quiz/chanakya" element={<ChanakyaQuiz setProgress={setProgress} />} />

            <Route exact path="/contributor" element={<Contributors setProgress={setProgress} />} >
            </Route>
            <Route path="/contributor/details" element={<ContributorDetail setProgress={setProgress}/>}> </Route>

            {/* Authentication Pages */}
            <Route exact path="/auth/SignIn" element={<SignIn />} />
            <Route exact path="/auth/SignUp" element={<SignUp />} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
