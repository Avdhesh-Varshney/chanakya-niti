import React, { useContext, useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import VideoButton from "../components/Home/VideoButton";
import Tilt from 'react-parallax-tilt';
import { Context } from '../context/Context';
import { FaAngleDoubleUp } from 'react-icons/fa';

export default function Home() {
  const { isDarkMode } = useContext(Context);
  const [showScroll, setShowScroll] = useState(false);

  // Function to handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    window.addEventListener('scroll', checkScrollTop);
    return () => {
      window.removeEventListener('scroll', checkScrollTop);
    };
  }, [showScroll]);

  return (
    <div className={`d-flex flex-column align-items-center ${isDarkMode ? 'dark-mode' : 'light-mode'}`} style={{ color: isDarkMode ? 'white' : 'black' }}>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100 p-4" style={{ padding: '80px 4px', borderRadius: '15px', backgroundColor: `${isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.035)'}` }}>
        <div className="d-flex flex-column align-items-center justify-content-center w-100">
          <h1 className="font-weight-bold display-4 mb-3">चाणक्य नीति</h1>
          <div className="font-weight-bold">
            <ReactTyped
              strings={[
                "शक्तिशाली मन को कोई नहीं हरा सकता।",
                "मनुष्य कर्म से महान होता है, जन्म से नहीं।",
                "विनम्रता आत्मसंयम का मूल है।",
              ]}
              typeSpeed={100}
              loop
              backSpeed={30}
              cursorChar=">"
              showCursor={true}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center w-100 mt-4 mt-md-0">
          <Tilt>
            <img className="img-fluid" src="/home1.png" alt="" style={{ animation: 'moveUpDown 2s infinite' }} />
          </Tilt>
        </div>
      </div>

      {/* Content Section */}
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-around w-100 my-4 py-4" style={{ gap: '20px', backgroundColor: `${isDarkMode ? 'rgba(52, 91, 57, 0.5)' : 'rgba(52, 91, 57, 0.328)'}`, borderRadius: '20px' }}>
        <div className="card h-100 shadow-sm" style={{ width: '350px', borderRadius: '20px', backgroundColor: `${isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'white'}`, color: isDarkMode ? 'white' : 'black' }}>
          <img src="/e-book.jpeg" className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title font-weight-bold">Dive into the World of Chanakya through E-Books</h5>
            <p className="card-text">
              Discover the profound wisdom of Chanakya with our meticulously
              curated e-books. Each page offers a gateway into the timeless
              teachings of this ancient sage, providing you with insights and
              strategies that remain relevant in today’s world.
            </p>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center gap-3" style={{ color: isDarkMode ? 'white' : 'black' }}>
          <VideoButton />
          <div className="text-center">
            <h4 className="font-weight-bold">MULTIMEDIA CONTENT</h4>
            <p className="font-weight-semibold">
              Audio Files, Books, Videos on Chanakya’s Life
            </p>
          </div>
        </div>
        <div className="card h-100 shadow-sm" style={{ width: '350px', borderRadius: '20px', backgroundColor: `${isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'white'}`, color: isDarkMode ? 'white' : 'black' }}>
          <img src="/video.jpg" className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title font-weight-bold">Video and Audio Experiences</h5>
            <p className="card-text">
              Immerse yourself in the wisdom of Chanakya through our captivating
              blend of video and audio content. Explore his timeless teachings
              with clarity and depth, as every word and gesture comes alive,
              enriching your journey of learning and discovery.
            </p>
          </div>
        </div>
      </div>

      {/* AI-Powered Translation Section */}
      <div className="d-flex flex-column align-items-center justify-content-center my-4 py-4" style={{ backgroundColor: `${isDarkMode ? 'rgba(52, 91, 57, 0.5)' : 'rgba(52, 91, 57, 0.328)'}`, borderRadius: '20px', width: '100%', color: isDarkMode ? 'white' : 'black' }}>
        <div className="d-flex align-items-center gap-2 justify-content-center mb-3">
          <img src="/ai.svg" alt="" style={{ width: '60px', borderRadius: '100%' }} />
          <h5 className="font-weight-bold">AI-Powered Translations</h5>
        </div>
        <p className="text-center">
          Explore the world without boundaries with our AI-powered language
          translation. Break down language barriers effortlessly as our
          advanced technology seamlessly transforms content into your
          preferred language. Whether you're discovering ancient wisdom or
          connecting with global insights, our translation AI ensures every
          word resonates, bridging cultures and uniting minds.
        </p>
      </div>

      {/* Scroll to Top Button */}
      <button
        className="scroll-to-top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '30px',
          display: showScroll ? 'flex' : 'none',
          backgroundColor: `${isDarkMode ? '#333' : '#fff'}`,
          color: `${isDarkMode ? '#fff' : '#333'}`,
          borderRadius: '50%',
          height: '50px',
          width: '50px',
          padding: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <FaAngleDoubleUp />
      </button>
    </div>
  );
}
