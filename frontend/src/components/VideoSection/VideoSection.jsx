import React from 'react';
import './VideoSection.css';

const VideoSection = () => {
  return (
    <div className="timeline-video-section">
      <h2 className="timeline-main-title timeline-video-title">Global Temperature Anomalies from 1880 to 2024</h2>
      <div className="timeline-video-container">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="timeline-video"
        >
          <source src="/2024GISTEMP_Map4K.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoSection;
