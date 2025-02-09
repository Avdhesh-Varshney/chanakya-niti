import { useState, useEffect } from "react";
import "./Progressbar.css";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Update progress bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.pageYOffset;
      const scrollPercentage = (scrollPosition / totalHeight) * 100;
      setScrollProgress(scrollPercentage);
    };

    
    window.addEventListener("scroll", handleScroll);
    return () =>{ window.removeEventListener("scroll", handleScroll); }

    
  }, []);

  return (
    <div className="progress-bar-container">
      {/* Glowing Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
