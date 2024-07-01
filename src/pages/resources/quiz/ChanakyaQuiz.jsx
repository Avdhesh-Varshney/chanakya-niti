import React from 'react';

const ChanakyaQuiz = () => {
  return (
    <div className="chanakya-quiz-container">
      <h1>Chanakya Quiz</h1>
      <iframe 
        src="https://embed.quizgecko.com/quiz/chanakya-life-and-legacy-xvrvaq/play" 
        frameborder="0" 
        allow="fullscreen" 
        webkitallowfullscreen="true" 
        mozallowfullscreen="true" 
        referrerpolicy="no-referrer-when-downgrade" 
        style={{ width: '100%', height: '600px', overflow: 'hidden', marginTop: '4px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s ease' }}
      ></iframe>
    </div>
  );
};

export default ChanakyaQuiz;
