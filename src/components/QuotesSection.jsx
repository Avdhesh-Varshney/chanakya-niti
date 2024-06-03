import React, { useEffect, useState } from 'react';
import quotes from '../quotes.json';
import Border from '../assets/Border.png';
import Chanakya from '../assets/Chanakya.png';

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
    <div className="d-flex align-items-center justify-content-center ">
      <div
        className="position-relative p-4"
        style={{
          backgroundImage: `url(${Border})`,
          backgroundSize: 'cover',
          border: '20px solid transparent',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center'
        }}
      >
       
        <div className="d-flex flex-column flex-md-row align-items-center p-4 mt-5">
          <img src={Chanakya} alt="Chanakya" className="rounded-circle mb-4 mb-md-0 me-md-4" style={{ width: '120px', height: '120px' }} />
          <div className="text-center text-md-start">
            <p className="fs-4 fst-italic text-warning">"{quote}"</p>
            <h2 className="fs-5 text-decoration-underline text-warning">~Chanakya</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSection;
