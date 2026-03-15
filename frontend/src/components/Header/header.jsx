import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide header if scrolling down and we've scrolled past the top 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`header-nav ${isVisible ? '' : 'header-hidden'}`}>
      <ul className="header-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#data">Data Visualisation</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#connect" className="connect-btn">Newsletter</a></li>
      </ul>
    </nav>
  );
};

export default Header;
