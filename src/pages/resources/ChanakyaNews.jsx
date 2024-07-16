import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          api_key: import.meta.env.VITE_NEWS_API_KEY,
          count: 60,
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
    <div className="container">
      <h1 className="mb-4 text-center">Latest News on Aacharya Chanakya</h1>
      <div className="row">
        {news.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card w-full h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <span className="badge bg-secondary mb-2 align-self-start">{item.category}</span>
                <p className="text-muted mb-2">Published: {new Date(item.pubDate).toLocaleDateString()}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">Read more</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChanakyaNews;