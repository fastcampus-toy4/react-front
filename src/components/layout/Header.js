import React from 'react';
import { Link } from 'react-router-dom';
// import logoImage from 'assets/images/logo.png'; // 이미지 대신 텍스트 로고 사용
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <Link to="/" className="header-logo">
        {/* 이미지 로고 대신, global.css의 Anton 폰트를 사용하는 텍스트 로고로 변경 */}
        <h1>점메추봇</h1>
      </Link>
    </header>
  );
}

export default Header;
