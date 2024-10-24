import React from 'react';
import GitHubRepoButton from "./GithubRepoButton";
import '../shared/Visitors.css';

const Visitors = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tertiary">
      <div className="portfolio-container">
        {/* Scroll Icon and Visitor Count */}
        <div className="visitor-info">
          {/* Scroll to top button */}
          <div onClick={scrollToTop} className="portfolio-link" style={{ cursor: 'pointer' }}>
            <div className="icon-container">
              <div className="icon-inner"></div>
            </div>
          </div>
                                    
          {/* External visit counter from hitwebcounter.com */}
          <a href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://hitwebcounter.com/counter/counter.php?page=17007703&style=0006&nbdigits=5&type=page&initCount=1000" 
              title="Counter Widget"
              alt="Visit counter For Websites"
              className="counter-widget"
              border="0"
            />
          </a>
        </div>

        {/* Visitor count text */}
        <p className="sectionSubText">Visitors Count</p>

        {/* GitHub Star Button */}
        <div className="githubstar">
          <GitHubRepoButton />
        </div> 
      </div>
    </div>
  );
};

export default Visitors;
