import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/News.css';

const ChanakyaNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const rss2jsonEndpoint = 'https://api.rss2json.com/v1/api.json';
      const googleNewsRSS = 'https://news.google.com/rss/search?q=archaryachanakya+OR+Arthashastra+OR+kautilya&hl=en-IN&gl=IN&ceid=IN:en';
      
      const response = await axios.get(rss2jsonEndpoint, {
        params: {
          rss_url: googleNewsRSS,
          api_key: 'jno3gnujlhgh2diontk4z2au4d7qrd6nsc7rtacf', // Replace with your API key or remove if using the free tier
          count: 60 // Number of items to fetch
        }
      });

      const newsItems = response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: item.description
      }));

      const categorizedNews = categorizeNews(newsItems);
      setNews(categorizedNews);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      setLoading(false);
    }
  };

  const categorizeNews = (newsItems) => {
    const categoryKeywords = {
      economics: ['economy', 'finance', 'wealth', 'arthashastra', 'economic'],
      politics: ['governance', 'leadership', 'strategy', 'political'],
      history: ['history', 'ancient', 'mauryan', 'empire', 'historical'],
      teachings: ['wisdom', 'teachings', 'philosophy', 'quotes'],
    };

    return newsItems.map(item => {
      const content = (item.title + ' ' + item.description).toLowerCase();
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => content.includes(keyword))) {
          return { ...item, category };
        }
      }
      return null; // Exclude items that don't match any category
    }).filter(item => item !== null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="chanakya-news">
      <h1>Latest News on Acharya Chanakya</h1>
      <div className="news-grid">
        {news.map((item, index) => (
          <div key={index} className="news-item">
            <h2>{item.title}</h2><br />
            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
            <span className="category-tag">{item.category}</span>
            <p className="pub-date">Published: {new Date(item.pubDate).toLocaleDateString()}</p>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="read-more">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChanakyaNews;