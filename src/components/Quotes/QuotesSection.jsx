import React, { useEffect, useState } from 'react';
import quotes from './quotes.json';
import './QuoteSection.css';  // Import the CSS file

const QuoteSection = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetchDailyQuote();
  }, []);

  const fetchDailyQuote = async () => {
    try {
      const response = await fetch('https://api.yourquoteapi.com/quotes?author=Chanakya', {
        headers: {
          'Authorization': `4fe303f4bamshb97ef5b1dd575e0p1ccc51jsnd9644d3c587b`
        }
      });
      const data = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0].quote);
      } else {
        setFallbackQuote();
      }
    } catch (error) {
      console.error('Error fetching the quote:', error);
      setFallbackQuote();
    }
  };

  const setFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].quote);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="d-flex flex-column flex-md-row align-items-center">
        <div className="text-center text-md-start">
          <p className="quote-text">"{quote}"</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
