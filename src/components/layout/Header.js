import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from 'assets/images/logo.png';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="header-logo">
        <img src={logoImage} alt="점메추봇 로고" />
      </Link>
    </header>
  );
}

export default Header;