import React from 'react';
import './Cards.css';

const climateData = [
  {
    id: 'temp',
    position: 'top-left',
    // icon: '🌡️',
    label: 'Avg Temperature',
    value: '+1.2°C',
    sub: 'above pre-industrial baseline',
    desc: "Earth's surface is now warmer than at any point in the last 100,000 years",
    badgeLabel: 'Rising Fast',
    badgeColor: '#ff4d4d' // Red
  },
  {
    id: 'ice',
    position: 'top-right',
    // icon: '🧊',
    label: 'Arctic Ice Loss',
    value: '-13.1%',
    sub: 'per decade',
    desc: 'The Arctic is warming 4x faster than the rest of the planet',
    badgeLabel: 'Accelerating',
    badgeColor: '#ff4d4d' 
  },
  {
    id: 'sea',
    position: 'mid-left',
    // icon: '🌊',
    label: 'Sea Level Rise',
    value: '3.7mm',
    sub: 'per year since 1993',
    desc: 'Driven by melting ice sheets and thermal expansion of warming oceans',
    badgeLabel: 'Monitoring',
    badgeColor: '#ffd700' // Yellow
  },
  {
    id: 'co2',
    position: 'mid-right',
    // icon: '💨',
    label: 'CO₂ Levels',
    value: '421 ppm',
    sub: 'atmospheric concentration',
    desc: 'Highest carbon dioxide level in 800,000 years of ice core records',
    badgeLabel: 'Record High',
    badgeColor: '#ff4d4d'
  },
  {
    id: 'rain',
    position: 'bot-left',
    // icon: '🌧️',
    label: 'Extreme Rain',
    value: '+7%',
    sub: 'intensity per °C of warming',
    desc: 'Warmer air holds more moisture — storms hit harder and flood faster',
    badgeLabel: 'Intensifying',
    badgeColor: '#ffd700'
  },
  {
    id: 'heat',
    position: 'bot-right',
    // icon: '☀️',
    label: 'Heat Wave Days',
    value: '+16 days',
    sub: 'extra per year vs 1980',
    desc: 'Regions that saw 5 extreme heat days now see 21 — a 4x increase',
    badgeLabel: 'Increasing',
    badgeColor: '#ff4d4d'
  }
];

const ClimateCards = () => {
  return (
    <div className="cards-container">
      {climateData.map((data) => (
        <div key={data.id} className={`climate-card ${data.position}`}>
          <div className="card-header">
            <h3 className="card-label">{data.label}</h3>
            <span className="card-badge" style={{ backgroundColor: `${data.badgeColor}20`, color: data.badgeColor, border: `1px solid ${data.badgeColor}50` }}>
              <span className="badge-dot" style={{ backgroundColor: data.badgeColor }}></span>
              {data.badgeLabel}
            </span>
          </div>
          <div className="card-body">
            <div className="card-metrics">
              <span className="card-value">{data.value}</span>
              <span className="card-sub">{data.sub}</span>
            </div>
            <p className="card-desc">{data.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClimateCards;
