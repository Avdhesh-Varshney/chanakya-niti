import { ReactTyped } from "react-typed";
import VideoButton from "../components/Home/VideoButton";
import Tilt from 'react-parallax-tilt';

export default function Home() {

  return (
    <div className={`d-flex flex-column align-items-center ${'light-mode'}`} style={{ color: 'black' }}>
      
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center w-100 p-4" style={{ padding: '80px 4px', borderRadius: '15px', backgroundColor: `${'rgba(255, 255, 255, 0.035)'}` }}>
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

      {/* AI-Powered Translations Section */}
      <div className="d-flex flex-column align-items-center justify-content-center my-4 py-4" style={{ backgroundColor: `${'rgba(52, 91, 57, 0.328)'}`, borderRadius: '20px', width: '100%', color: 'black' }}>
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
