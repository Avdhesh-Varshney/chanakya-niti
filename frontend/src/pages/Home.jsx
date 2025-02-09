import React, { useContext } from "react";
import { ReactTyped } from "react-typed";
import VideoButton from "../components/Home/VideoButton";
import Tilt from 'react-parallax-tilt';
import { Context } from '../context/Context';

export default function Home() {
  const { isDarkMode } = useContext(Context);

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
            <img className="img-fluid" src="/home1.png" alt="Chanakya Wisdom" style={{ animation: 'moveUpDown 2s infinite' }} />
          </Tilt>
        </div>
      </div>

      {/* One wrapper div for the cards and multimedia content */}
      <div 
        className="d-flex flex-column flex-md-row align-items-center justify-content-around w-100 my-4 py-4" 
        style={{ 
          gap: '20px', 
          backgroundColor: `${isDarkMode ? 'rgba(52, 91, 57, 0.5)' : 'rgba(52, 91, 57, 0.328)'}`, 
          borderRadius: '20px'
        }}
      >
        {/* E-Book Card */}
        <div 
          className="card h-100 shadow-sm" 
          style={{ 
            width: '350px', 
            borderRadius: '20px', 
            backgroundColor: `${isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'white'}`
          }}
        >
          <img src="/e-book.jpeg" className="card-img-top" alt="E-book on Chanakya" />
          <div className="card-body">
            <h5 className="card-title font-weight-bold" style={{ color: 'black' }}>Dive into the World of Chanakya through E-Books</h5>
            <p className="card-text" style={{ color: 'black' }}>
              Discover the profound wisdom of Chanakya with our meticulously curated e-books. Each page offers a gateway into the timeless teachings of this ancient sage, providing you with insights and strategies that remain relevant in today's world.
            </p>
          </div>
        </div>

        {/* Video Button Section */}
        <div 
          className="d-flex flex-column align-items-center justify-content-center gap-3" 
          style={{ color: isDarkMode ? 'white' : 'black' }}
        >
          <VideoButton />
          <div className="text-center">
            <h4 className="font-weight-bold">MULTIMEDIA CONTENT</h4>
            <p className="font-weight-semibold">
              Audio Files, Books, Videos on Chanakya's Life
            </p>
          </div>
        </div>

        {/* Video and Audio Card */}
        <div 
          className="card h-100 shadow-sm" 
          style={{ 
            width: '350px', 
            borderRadius: '20px', 
            backgroundColor: `${isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'white'}`
          }}
        >
          <img src="/video.jpg" className="card-img-top" alt="Video and Audio Experiences" />
          <div className="card-body">
            <h5 className="card-title font-weight-bold" style={{ color: 'black' }}>Video and Audio Experiences</h5>
            <p className="card-text" style={{ color: 'black' }}>
              Immerse yourself in the wisdom of Chanakya through our captivating blend of video and audio content. Explore his timeless teachings with clarity and depth, as every word and gesture comes alive, enriching your journey of learning and discovery.
            </p>
          </div>
        </div>
      </div>

      {/* AI-Powered Translations Section */}
      <div className="d-flex flex-column align-items-center justify-content-center my-4 py-4" style={{ backgroundColor: `${isDarkMode ? 'rgba(52, 91, 57, 0.5)' : 'rgba(52, 91, 57, 0.328)'}`, borderRadius: '20px', width: '100%', color: isDarkMode ? 'white' : 'black' }}>
        <div className="d-flex align-items-center gap-2 center mb-3">
          <img src="/ai.svg" alt="AI Translations" style={{ width: '60px', borderRadius: '100%' }} />
          <h5 className="font-weight-bold">AI-Powered Translations</h5>
        </div>
        <p className="text-center">
          Explore the world without boundaries with our AI-powered language translation. Break down language barriers effortlessly as our advanced technology seamlessly transforms content into your preferred language. Whether you're discovering ancient wisdom or connecting with global insights, our translation AI ensures every word resonates, bridging cultures and uniting minds.
        </p>
      </div>
    </div>
  );
}
