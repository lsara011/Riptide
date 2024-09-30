
import React, { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Automatically hide the menu when screen size exceeds 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);  // Close the menu on larger screens
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      <nav>
        <div className="title-bars">
          <div className="logo">
            <h1>RipTide</h1>
          </div>
          <div className="ham">
            <i className="fas fa-bars" onClick={toggleMenu}></i>
          </div>
        </div>
        
        {/* Toggle the class based on isMenuOpen state */}
        <ul className={`links ${isMenuOpen ? 'show' : 'hide'}`}>
          <li><a href="#">Main Screen</a></li>
          <li><a href="#">Behind The Project</a></li>
          <li><a href="https://luisfsaravia.com" target="_blank" rel="noopener noreferrer">About The Dev</a></li>
          <li><a href="#">Tools Used</a></li>
        </ul>
      </nav>
    </header>
  );
}

