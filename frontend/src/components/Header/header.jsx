import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <nav className="header-nav">

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
