import { ReactTyped } from "react-typed";
import Tilt from 'react-parallax-tilt';
import QuoteSection from "../components/Quotes";

export default function Home() {

  return (
    <div className={`d-flex flex-column align-items-center ${'light-mode'}`} style={{ color: 'black' }}>
      <div className="flex flex-col md:flex-row items-center justify-center w-full p-4 md:py-20 md:px-4 rounded-[15px] bg-[#FFFFFF06]">
        <style>{`
        @keyframes moveUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-moveUpDown {
          animation: moveUpDown 2s infinite;
        }
      `}</style>

        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl md:text-6xl mb-3 text-center tracking-tight">चाणक्य नीति</h1>

          <div className="text-center text-2xl md:text-4xl font-medium leading-relaxed">
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

        <div className="flex justify-center w-full mt-4 md:mt-0">
          <Tilt>
            <img
              className="w-100 h-100 max-w-md animate-moveUpDown"
              src="/home1.png"
              alt=""
            />
          </Tilt>
        </div>
      </div>

      <QuoteSection />

    </div>
  );
}
