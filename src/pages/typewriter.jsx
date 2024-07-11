import React from 'react';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button onClick={scrollToTop} className="scroll-button">
      <img src='src/assets/scroll.png'></img>
    </button>
  );
};

export default ScrollToTopButton;
