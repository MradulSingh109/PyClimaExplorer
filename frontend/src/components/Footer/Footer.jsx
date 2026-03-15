import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="connect" className="footer-section">
      <div className="footer-content">
        <div className="newsletter-container">
          <h2 className="footer-title">Join Our Newsletter</h2>
          <p className="footer-subtitle">
            Stay updated with the latest climate change data, research, and environmental news directly in your inbox.
          </p>
          
          {subscribed ? (
            <div className="success-message">
              <span className="success-icon">✓</span> Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          )}
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} AtmoStream. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
