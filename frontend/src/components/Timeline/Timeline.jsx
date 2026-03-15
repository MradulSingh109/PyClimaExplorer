import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    year: '1880',
    title: 'The Pre-Industrial Baseline',
    desc: 'Widespread reliable temperature records begin. Global temperatures are relatively stable, establishing the standard baseline against which modern warming is measured.',
    anomaly: -0.16,
    color: '#3B82F6', // Blue
    position: 'left',
    image: '/1880.png'
  },
  {
    year: '1930',
    title: 'The Dust Bowl Era',
    desc: 'Severe drought and poor farming practices lead to massive dust storms in the US. A stark early warning of how human activity can catastrophically impact local climates.',
    anomaly: -0.14,
    color: '#60A5FA', // Light blue
    position: 'right',
    image: '/dustbowl.webp'
  },
  {
    year: '1988',
    title: 'The Modern Era of Warming',
    desc: 'After decades of slight cooling due to aerosol pollution, regulations clean the air. Unmasked greenhouse gases begin driving a steep, unwavering upward trend in global temperatures.',
    anomaly: +0.06,
    color: '#fbbf24', // Yellow
    position: 'left',
    image: '/hansenagainsttheworld.webp'
  },
  {
    year: '1998',
    title: 'The First Major Spike',
    desc: 'A massive El Niño event combines with underlying global warming to shatter previous temperature records, stunning the scientific community.',
    anomaly: +0.61,
    color: '#f59e0b', // Orange
    position: 'right',
    image: '/elnino.webp'
  },
  {
    year: '2012',
    title: 'Record Heat & Ice Loss',
    desc: 'Global temperatures pass 1°C above pre-industrial levels. Arctic sea ice hits record lows, and massive coral bleaching events devastate the Great Barrier Reef.',
    anomaly: +1.01,
    color: '#ef4444', // Red
    position: 'left',
    image: '/artic ice.webp'
  },
  {
    year: '2023',
    title: 'Uncharted Territory',
    desc: 'The hottest year in recorded human history by a massive margin. Global oceans reach boiling point anomalies, and the 1.5°C threshold is briefly breached.',
    anomaly: +1.48,
    color: '#b91c1c', // Dark Red
    position: 'right',
    image: '/uncharted.png'
  }
];

const TimelineSection = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const [activeYear, setActiveYear] = useState(timelineData[0].year);
  const [activeAnomaly, setActiveAnomaly] = useState(timelineData[0].anomaly);

  useGSAP(() => {
    // 1. Animate the central glowing line strictly downwards
    gsap.fromTo(lineRef.current, 
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 0.5,
        }
      }
    );

    // 2. Animate each era as it comes into view
    const items = gsap.utils.toArray('.timeline-item');
    items.forEach((item, i) => {
      const data = timelineData[i];
      
      ScrollTrigger.create({
        trigger: item,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          setActiveYear(data.year);
          setActiveAnomaly(data.anomaly);
        },
        onEnterBack: () => {
          setActiveYear(data.year);
          setActiveAnomaly(data.anomaly);
        }
      });

      // Simple fade up and in for the content boxes
      gsap.fromTo(item.querySelector('.timeline-content'),
        { 
          y: 50, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div id="data" className="timeline-section" ref={containerRef}>
      
      {/* Sticky UI: Displaying the Ghost Year */}
      <div className="sticky-ui">
        <div className="ghost-year">{activeYear}</div>
      </div>

      <div className="timeline-container">
        <h2 className="timeline-main-title">A History of Heat</h2>
        <p className="timeline-main-subtitle">Scroll to trace the timeline of global temperature anomalies</p>

        {/* The central spine track */}
        <div className="timeline-track">
          <div className="timeline-line-glow" ref={lineRef}></div>
        </div>

        {/* The Timeline Elements */}
        {timelineData.map((data, index) => (
          <div key={index} className={`timeline-item ${data.position}`}>
            
            <div className="timeline-content">
              <div className="timeline-year-label" style={{ color: data.color }}>{data.year}</div>
              <h3 className="timeline-title">{data.title}</h3>
              <p className="timeline-desc">{data.desc}</p>
              
              <div className="timeline-image-container">
                <img src={data.image} alt={data.title} className="timeline-image" />
              </div>
            </div>

            {/* The dot on the timeline */}
            <div className="timeline-dot" style={{ backgroundColor: data.color, boxShadow: `0 0 15px ${data.color}` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelineSection;
