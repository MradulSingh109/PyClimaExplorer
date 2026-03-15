import React, { useState, useEffect } from 'react';
import './NewsSection.css';

const NewsSection = ({ searchedCity, searchTrigger }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'f59f3ae7e42e3bcfe6eb86369c141d74';

  useEffect(() => {
    if (!searchedCity || !searchTrigger) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = `("${searchedCity}" AND ("climate" OR "weather" OR "pollution" OR "heatwave" OR "drought" OR "flood" OR "monsoon" OR "AQI" OR "smog" OR "global warming" OR "rainfall"))`;
        const query = encodeURIComponent(queryParams);
        
        const response = await fetch(`https://gnews.io/api/v4/search?q=${query}&in=title,description&lang=en&max=6&apikey=${API_KEY}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching news.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [searchedCity, searchTrigger]);

  if (!searchTrigger) return null;

  return (
    <div id="news" className="news-section">
      <div className="news-container">
        <h2 className="news-title">Local Climate News ({searchedCity})</h2>
        <p className="news-subtitle">Latest environment and climate impact stories for {searchedCity}.</p>
        
        {loading && <div className="news-loading">Fetching global and local news reports...</div>}
        {error && <div className="news-error">{error}</div>}

        {!loading && news.length === 0 && !error && (
          <div className="news-empty">No climate-related news found for this city. Try another location.</div>
        )}

        <div className="news-grid">
          {news.map((article, index) => (
            <a href={article.url} target="_blank" rel="noopener noreferrer" key={index} className="news-card">
              <div className="news-image-container">
                {article.image ? (
                  <img src={article.image} alt={article.title} className="news-image" />
                ) : (
                  <div className="news-image-placeholder">No Image Available</div>
                )}
              </div>
              <div className="news-content">
                <span className="news-source">{article.source.name}</span>
                <h3 className="news-article-title">{article.title}</h3>
                <p className="news-article-desc">{article.description}</p>
                <div className="news-footer">
                  <span className="news-date">{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span className="news-read-more">Read Full Story ↗</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
