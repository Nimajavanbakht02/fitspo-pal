import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/HamburgerMenu.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='hamburger-menu'>
      <button className='hamburger-icon' onClick={toggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className='hamburger-links'>
          <Link to='/' onClick={toggleMenu}>Home</Link>
          <Link to='/workouts' onClick={toggleMenu}>Workouts</Link>
          <Link to='/friends' onClick={toggleMenu}>Friends</Link>
          <Link to='/profile' onClick={toggleMenu}>Profile</Link>
            <Link to='/goals' onClick={toggleMenu}>Goals</Link>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
