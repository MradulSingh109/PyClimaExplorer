import React, { useState } from 'react';
import './ChartsSection.css';

const ChartsSection = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [charts, setCharts] = useState([]);
  const [locationName, setLocationName] = useState(null);

  const API = import.meta.env.VITE_API_URL || '/api';

  const fetchCharts = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setError(null);
    setCharts([]);
    setLocationName(null);
    
    if (onSearch) {
      onSearch(city);
    }

    try {
      // Point this to the FastAPI backend
      const response = await fetch(`${API}/climate/${city}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("City not found in our database. Please check your spelling.");
        }
        throw new Error("Failed to fetch historical data.");
      }

      const data = await response.json();
      setLocationName(data.city + ", " + data.country);
      setCharts(data.charts);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="charts-section" id="data">
      <div className="charts-header">
        <h2 className="charts-title">Explore Historical Data</h2>
        <p className="charts-subtitle">
          Search for a city across the globe to dynamically generate Historical Time-Series, 
          Anomalous Heatmaps, and Correlation structures.
        </p>

        <form className="search-form" onSubmit={fetchCharts}>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search a city..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? "Processing..." : "Analyze"}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>

      {charts.length > 0 && (
        <div className="charts-dashboard">
          <h3 className="location-heading">Analysis for {locationName}</h3>
          
          <div className="charts-grid">
            {charts.map((c, index) => (
              <div key={index} className="chart-card">
                <iframe 
                  srcDoc={c.html} 
                  title={`chart-${index}`}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartsSection;
