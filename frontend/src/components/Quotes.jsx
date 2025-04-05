import React, { useEffect, useState } from "react";
import quotes from "/database/quotes.json";

const QuoteSection = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setFallbackQuote();
  }, []);

  const setFallbackQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex].quote);
  };

  return (
    <div className="w-full text-center py-6 px-4 rounded-lg" style={{ backgroundColor: "#345B3953" }}>
      <p className="text-lg font-gelasio italic">"{quote}"</p>
    </div>
  );
};

export default QuoteSection;
